import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const HQ_MODEL = "@cf/black-forest-labs/flux-2-dev";

type RejectReason =
  | "hand-anatomy"
  | "weapon-grip"
  | "pose-readability"
  | "face-consistency"
  | "composition";

type GenerationIntent = "initial" | "variation";
type PromptMode = "assist" | "fidelity";

function sanitizePrompt(prompt: string) {
  return prompt
    .replace(/\b(cleavage|breasts?|nude|naked|sexy|sensual|seductive|lingerie)\b/gi, "")
    .replace(/\b(gore|bloody|blood splatter|dismembered|severed)\b/gi, "dramatic")
    .replace(/\s+,/g, ",")
    .replace(/,+/g, ",")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function softenModerationRisk(prompt: string) {
  return sanitizePrompt(
    prompt
      .replace(/\bbattlefield\b/gi, "ancient ruins")
      .replace(/\bwar\b/gi, "conflict")
      .replace(/\bslaughter\b/gi, "dramatic scene")
      .replace(/\bdemon\b/gi, "enemy")
      .replace(/\bdevil\b/gi, "enemy")
      .replace(/\bmonster\b/gi, "enemy")
      .replace(/\bkill\b/gi, "defeat")
      .replace(/\bviolent\b/gi, "dramatic")
      .replace(/\bviolence\b/gi, "dramatic action")
      .replace(/\bfight(ing)?\b/gi, "dramatic confrontation")
      .replace(/\bcombat\b/gi, "dramatic confrontation")
      .replace(/\battack\b/gi, "dynamic action")
  );
}

function sanitizeNegativePrompt(negative: string) {
  return negative
    .replace(/\b(nsfw|nude|naked|sexy|sensual|seductive|lingerie)\b/gi, "")
    .replace(/\b(gore|bloody|blood splatter|dismembered|severed)\b/gi, "")
    .replace(/\b(demon|devil|monster|kill|slaughter|war|battlefield)\b/gi, "")
    .replace(/\s+,/g, ",")
    .replace(/,+/g, ",")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function getErrorMessage(data: any) {
  return data?.errors?.[0]?.message || data?.result?.error || "";
}

function isFlaggedError(data: any) {
  return getErrorMessage(data).includes("flagged");
}

function isNsfwError(data: any) {
  return getErrorMessage(data).includes("NSFW");
}

function isFlaggedLikeError(data: any) {
  return isFlaggedError(data) || isNsfwError(data);
}

function normalizeRejectReason(value: unknown): RejectReason | null {
  if (
    value === "hand-anatomy" ||
    value === "weapon-grip" ||
    value === "pose-readability" ||
    value === "face-consistency" ||
    value === "composition"
  ) {
    return value;
  }

  return null;
}

function resolveGenerationIntent(body: any): GenerationIntent {
  if (
    body?.generation_intent === "variation" ||
    body?.variationMode ||
    body?.variation_prompt ||
    body?.variation_base_prompt ||
    body?.reject_reason
  ) {
    return "variation";
  }

  return "initial";
}

function resolvePromptMode(body: any): PromptMode {
  return body?.prompt_mode === "fidelity" ? "fidelity" : "assist";
}

function joinPromptParts(parts: Array<string | undefined | null | false>) {
  return parts
    .map((part) => (typeof part === "string" ? part.trim() : ""))
    .filter(Boolean)
    .join(", ");
}

function buildInitialPrompt(rawPrompt: string, promptMode: PromptMode) {
  const userPrompt = rawPrompt.trim();

  if (promptMode === "fidelity") {
    return userPrompt;
  }

  return joinPromptParts([
    userPrompt,
    "readable body framing",
    "natural hand placement consistent with the pose",
    "hands visible only when compositionally appropriate",
    "relaxed fingers unless interacting with an object",
    "correct hand anatomy",
    "no forced open palm pose",
    "natural body proportions",
    "clear limb separation",
    "stable object interaction",
    "balanced composition",
    "strong silhouette",
    "highly detailed manga illustration",
    "clean lineart",
    "sharp focus",
  ]);
}

function buildVariationReasonLayer(reason: RejectReason | null) {
  if (reason === "hand-anatomy") {
    return joinPromptParts([
      "preserve the same scene intent",
      "preserve the same character identity",
      "preserve the same camera intent",
      "preserve the same mood and color treatment",
      "prioritize anatomically correct hands",
      "correct finger count",
      "readable palm orientation",
      "natural wrist angle",
      "stable object interaction",
      "no fused fingers",
      "no duplicated fingers",
      "no missing fingers",
    ]);
  }

  if (reason === "weapon-grip") {
    return joinPromptParts([
      "preserve the same scene intent",
      "preserve the same character identity",
      "preserve the same camera intent",
      "preserve the same mood and color treatment",
      "prioritize believable weapon grip",
      "fingers wrap naturally around the handle",
      "clear hand to weapon contact",
      "natural wrist and forearm alignment",
      "stable object interaction",
      "no floating weapon",
      "no broken grip logic",
    ]);
  }

  if (reason === "pose-readability") {
    return joinPromptParts([
      "preserve the same scene intent",
      "preserve the same character identity",
      "preserve the same mood and color treatment",
      "improve pose readability",
      "clean silhouette",
      "clear limb separation",
      "balanced staging",
      "readable action line",
    ]);
  }

  if (reason === "face-consistency") {
    return joinPromptParts([
      "preserve the same scene intent",
      "preserve the same camera intent",
      "preserve the same mood and color treatment",
      "preserve facial identity",
      "improve facial consistency",
      "stable facial proportions",
      "clean eye alignment",
    ]);
  }

  if (reason === "composition") {
    return joinPromptParts([
      "preserve the same scene intent",
      "preserve the same character identity",
      "preserve the same mood and color treatment",
      "improve composition balance",
      "clear focal hierarchy",
      "strong silhouette",
      "readable framing",
    ]);
  }

  return "";
}

function buildVariationPrompt(body: any) {
  const base =
    typeof body?.variation_base_prompt === "string" && body.variation_base_prompt.trim()
      ? body.variation_base_prompt.trim()
      : typeof body?.analyzedPrompt === "string" && body.analyzedPrompt.trim()
      ? body.analyzedPrompt.trim()
      : typeof body?.prompt === "string" && body.prompt.trim()
      ? body.prompt.trim()
      : "";

  const variationPrompt =
    typeof body?.variation_prompt === "string" && body.variation_prompt.trim()
      ? body.variation_prompt.trim()
      : typeof body?.correction_prompt === "string" && body.correction_prompt.trim()
      ? body.correction_prompt.trim()
      : "";

  const variationNote =
    typeof body?.variation_note === "string" && body.variation_note.trim()
      ? body.variation_note.trim()
      : "";

  const rejectReason = normalizeRejectReason(body?.reject_reason);
  const autoReasonLayer = buildVariationReasonLayer(rejectReason);

  return joinPromptParts([
    base,
    variationPrompt,
    autoReasonLayer,
    variationNote,
    "HQ variation regeneration",
    "keep the composition close unless structural correction is needed",
    "clean lineart",
    "sharp focus",
  ]);
}

function buildNegative(userNegative?: string, rejectReason?: RejectReason | null) {
  const base = [
    "extra fingers",
    "missing fingers",
    "fused fingers",
    "deformed hands",
    "bad anatomy",
    "extra limbs",
    "distorted body",
    "broken weapon grip",
    "floating weapon",
    "blurry",
  ];

  if (rejectReason === "hand-anatomy") {
    base.push("duplicated fingers", "twisted wrist", "broken palm structure");
  }

  if (rejectReason === "weapon-grip") {
    base.push("bad hand placement", "incorrect finger placement", "bent weapon");
  }

  if (userNegative && typeof userNegative === "string" && userNegative.trim()) {
    base.push(userNegative.trim());
  }

  return Array.from(new Set(base)).join(", ");
}

function buildFlagSafePromptVariants(
  prompt: string,
  generationIntent: GenerationIntent,
  rejectReason: RejectReason | null
) {
  const variants = [prompt];

  const softened = softenModerationRisk(prompt);
  if (softened && softened !== prompt) variants.push(softened);

  if (generationIntent === "variation") {
    const saferVariation = joinPromptParts([
      softened,
      rejectReason === "hand-anatomy"
        ? "prioritize anatomically correct hands, correct finger count, natural wrist angle"
        : rejectReason === "weapon-grip"
        ? "prioritize believable hand placement, natural grip, stable handle contact"
        : "preserve scene intent, improve structural clarity",
      "heroic fantasy manga illustration",
      "non-graphic",
      "clean lineart",
      "sharp focus",
    ]);

    if (saferVariation && !variants.includes(saferVariation)) variants.push(saferVariation);
  } else {
    const saferInitial = joinPromptParts([
      softened,
      "heroic fantasy manga illustration",
      "non-graphic dramatic action",
      "clean lineart",
      "sharp focus",
    ]);

    if (saferInitial && !variants.includes(saferInitial)) variants.push(saferInitial);
  }

  return variants;
}

function resolveSeedStrategy(body: any) {
  return body?.seed_strategy === "wide"
    ? "wide"
    : body?.seed_strategy === "close"
    ? "close"
    : "close";
}

function resolveBaseSeed(seed: unknown) {
  return typeof seed === "number" && Number.isFinite(seed)
    ? seed
    : Math.floor(Math.random() * 1000000000) + 1;
}

function getSeedStep(seedStrategy: "close" | "wide") {
  return seedStrategy === "wide" ? 97 : 1;
}

function resolveRequestedCount(body: any, generationIntent: GenerationIntent) {
  const value = Number(body?.count);
  if (Number.isFinite(value) && value >= 1 && value <= 4) {
    return Math.floor(value);
  }
  return generationIntent === "initial" ? 1 : 2;
}

async function runHQFlux(prompt: string, negative: string, seed: number) {
  const form = new FormData();
  form.append("prompt", prompt);
  form.append("negative_prompt", negative);
  form.append("seed", String(seed));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 35000);

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${HQ_MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
        body: form,
        signal: controller.signal,
      }
    );

    const data = await res.json();
    return { res, data };
  } finally {
    clearTimeout(timeout);
  }
}

async function generateOne(
  prompt: string,
  negative: string,
  seed: number,
  generationIntent: GenerationIntent,
  rejectReason: RejectReason | null
) {
  const promptVariants = buildFlagSafePromptVariants(prompt, generationIntent, rejectReason);
  const negativeVariants = Array.from(
    new Set([negative, sanitizeNegativePrompt(negative)].filter(Boolean))
  );

  let lastError = "Cloudflare generate failed.";

  for (const promptVariant of promptVariants) {
    for (const negativeVariant of negativeVariants) {
      const { res, data } = await runHQFlux(promptVariant, negativeVariant, seed);

      if (res.ok) {
        const image = data?.result?.image || data?.image || null;
        if (!image) throw new Error("Không nhận được ảnh từ AI.");
        return image as string;
      }

      lastError = getErrorMessage(data) || lastError;

      if (!isFlaggedLikeError(data)) {
        throw new Error(lastError);
      }
    }
  }

  throw new Error(lastError);
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const generationIntent = resolveGenerationIntent(body);
    const promptMode = resolvePromptMode(body);
    const rejectReason = normalizeRejectReason(body?.reject_reason);

    const sourcePrompt =
      generationIntent === "variation"
        ? buildVariationPrompt(body)
        : typeof body?.analyzedPrompt === "string" && body.analyzedPrompt.trim()
        ? body.analyzedPrompt.trim()
        : typeof body?.prompt === "string" && body.prompt.trim()
        ? body.prompt.trim()
        : "";

    if (!sourcePrompt.trim()) {
      return NextResponse.json({ error: "Prompt không hợp lệ." }, { status: 400 });
    }

    // Deduct mana before generation
    const manaRes = await fetch(req.url.replace("/api/generate-manga-cf", "/api/mana/deduct"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") || "",
      },
      body: JSON.stringify({ amount: 1 }),
    });

    if (!manaRes.ok) {
      const manaError = await manaRes.json();
      return NextResponse.json(
        {
          error: manaError.error || "Không đủ Mana",
          code: manaError.code || "INSUFFICIENT_MANA",
          currentMana: manaError.currentMana,
          tier: manaError.tier,
        },
        { status: 403 }
      );
    }

    const manaData = await manaRes.json();

    const cleanPrompt = sanitizePrompt(sourcePrompt);
    const finalPrompt =
      generationIntent === "variation"
        ? cleanPrompt
        : buildInitialPrompt(cleanPrompt, promptMode);

    const negative = sanitizeNegativePrompt(buildNegative(body?.negative_prompt, rejectReason));
    const baseSeed = resolveBaseSeed(body?.seed);
    const seedStrategy = resolveSeedStrategy(body);
    const seedStep = getSeedStep(seedStrategy);
    const requestedCount = resolveRequestedCount(body, generationIntent);

    const images: string[] = [];
    const usedSeeds: number[] = [];

    let currentSeed = baseSeed;
    let attempts = 0;
    const maxAttempts =
      generationIntent === "initial"
        ? 2
        : Math.max(requestedCount * 2, 4);

    while (images.length < requestedCount && attempts < maxAttempts) {
      try {
        const img = await generateOne(
          finalPrompt,
          negative,
          currentSeed,
          generationIntent,
          rejectReason
        );
        images.push(img);
        usedSeeds.push(currentSeed);

        if (generationIntent === "initial" && images.length >= 1) {
          break;
        }
      } catch (err) {
        console.error(`generate failed for seed ${currentSeed}:`, err);
      }

      currentSeed += seedStep;
      attempts += 1;
    }

    if (images.length === 0) {
      return NextResponse.json(
        {
          error:
            generationIntent === "variation"
              ? "Không regenerate được HQ variation nào."
              : "Không tạo được ảnh HQ nào.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      images,
      finalPrompt,
      negative_prompt: negative,
      mode: "hq",
      prompt_mode: promptMode,
      generation_intent: generationIntent,
      reject_reason: rejectReason,
      used_seeds: usedSeeds,
      base_seed: baseSeed,
      seed_strategy: seedStrategy,
    });
  } catch (error: any) {
    console.error("cf generate error:", error?.message || error);

    return NextResponse.json(
      { error: error?.message || "generation failed" },
      { status: 500 }
    );
  }
}