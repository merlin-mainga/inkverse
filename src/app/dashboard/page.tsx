"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CoverImage from "@/components/CoverImage";
import CoverEditor from "@/components/CoverEditor";
import CharacterDetailModal from "@/components/CharacterDetailModal";
import UpgradeModal from "@/components/UpgradeModal";

const GENRES = [
  "Action",
  "Adventure",
  "Drama",
  "Fantasy",
  "Romance",
  "School Life",
  "Slice of Life",
  "Comedy",
  "Mystery",
  "Horror",
  "Sci-Fi",
];

type MangaItem = {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  coverPositionX?: number;
  coverPositionY?: number;
  genre?: string[];
  status?: string;
  views?: number;
  avgRating?: number;
  _count?: {
    chapters?: number;
  };
};

type CharacterProfile = {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  sourceType: string;
  primaryImageUrl: string;
  galleryJson: unknown;
  canonSummary: string;
  appearanceNotes: string;
  mustPreserve: string;
  avoidDrift: string | null;
  styleAffinity: string | null;
  colorMode: string;
  createdAt: string;
  updatedAt: string;
};

type OutputIntent =
  | "cover"
  | "illustration"
  | "portrait"
  | "full-body"
  | "action-scene"
  | "dialogue-scene"
  | "environment";

type RejectReason =
  | "hand-anatomy"
  | "weapon-grip"
  | "pose-readability"
  | "face-consistency"
  | "composition";

function DashboardMenuIcon({
  type,
  active,
}: {
  type: "overview" | "mangas" | "ai-manga" | "mainga-lab";
  active: boolean;
}) {
  const stroke = active ? "#080808" : "#c9a84c";

  if (type === "overview") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="3.5" width="7" height="7" rx="2" stroke={stroke} strokeWidth="1.8" />
        <rect x="13.5" y="3.5" width="7" height="4.5" rx="2" stroke={stroke} strokeWidth="1.8" />
        <rect x="13.5" y="10.5" width="7" height="10" rx="2" stroke={stroke} strokeWidth="1.8" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="2" stroke={stroke} strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "mangas") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 4.5H15.5C17.433 4.5 19 6.067 19 8V18.5H8.5C7.119 18.5 6 17.381 6 16V4.5Z"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M6 6.5H5.5C4.119 6.5 3 7.619 3 9V16C3 18.209 4.791 20 7 20H19"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 8.5H15" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 11.5H15" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "ai-manga") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="16" height="14" rx="3" stroke={stroke} strokeWidth="1.8" />
        <path
          d="M12 3.8L12.8 6.2L15.2 7L12.8 7.8L12 10.2L11.2 7.8L8.8 7L11.2 6.2L12 3.8Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M8 15L10 13L11.5 14.5L15.5 10.5L17 12"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 4.5H15L18.5 10.5L12 19.5L5.5 10.5L9 4.5Z"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9 4.5L12 10.5L15 4.5" stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M5.5 10.5H18.5" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Refs for Mainga Lab upgrade modal logic
  const labUpgradeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const labUpgradeShownRef = useRef<boolean>(false);
  const labUserHasTypedRef = useRef<boolean>(false);

  // Check if user is Pro/Max
  const isProOrMax = (session?.user as any)?.subscriptionTier === "PRO" || (session?.user as any)?.subscriptionTier === "MAX";

  // Helper: Show upgrade modal with per-session limit
  const tryShowLabUpgradeModal = useCallback(() => {
    if (labUpgradeShownRef.current || isProOrMax) return;
    labUpgradeShownRef.current = true;
    setShowUpgradeModal(true);
  }, [isProOrMax]);

  // Cancel 30s timer (called when user starts typing)
  const cancelLabUpgradeTimer = useCallback(() => {
    if (labUserHasTypedRef.current) return; // Already cancelled
    labUserHasTypedRef.current = true;
    if (labUpgradeTimerRef.current) {
      clearTimeout(labUpgradeTimerRef.current);
      labUpgradeTimerRef.current = null;
    }
  }, []);

  // Start 30s timer when entering Mainga Lab
  const startLabUpgradeTimer = useCallback(() => {
    // Reset refs when entering
    labUpgradeShownRef.current = false;
    labUserHasTypedRef.current = false;
    // Clear any existing timer
    if (labUpgradeTimerRef.current) {
      clearTimeout(labUpgradeTimerRef.current);
    }
    // Don't start timer for Pro/Max users
    if (isProOrMax) return;
    // Start 30s countdown
    labUpgradeTimerRef.current = setTimeout(() => {
      tryShowLabUpgradeModal();
    }, 30000); // 30 seconds
  }, [isProOrMax, tryShowLabUpgradeModal]);

  // Trigger modal immediately on button click (higher intent)
  const triggerLabUpgradeOnAction = useCallback(() => {
    // Cancel timer first
    if (labUpgradeTimerRef.current) {
      clearTimeout(labUpgradeTimerRef.current);
      labUpgradeTimerRef.current = null;
    }
    // Show modal
    tryShowLabUpgradeModal();
  }, [tryShowLabUpgradeModal]);

  const [mangas, setMangas] = useState<MangaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "mangas" | "ai-manga" | "mainga-lab">("overview");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [labCharacters, setLabCharacters] = useState<CharacterProfile[]>([]);
  const [labLoading, setLabLoading] = useState(false);
  const [labError, setLabError] = useState("");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterProfile | null>(null);
  const [showCreateCharacterCanon, setShowCreateCharacterCanon] = useState(false);
const [characterCanonCreateMode, setCharacterCanonCreateMode] = useState<"text" | "image">("text");
const [characterCanonTextForm, setCharacterCanonTextForm] = useState({
  name: "",
  canonSummary: "",
  appearanceNotes: "",
  mustPreserve: "",
  avoidDrift: "",
  colorMode: "unspecified" as "monochrome" | "color" | "unspecified",
});

// Wrapper to cancel upgrade timer when user starts typing
const updateCharacterCanonTextForm = useCallback((updater: (prev: typeof characterCanonTextForm) => typeof characterCanonTextForm) => {
  cancelLabUpgradeTimer(); // Cancel timer when user starts typing
  setCharacterCanonTextForm(updater);
}, [cancelLabUpgradeTimer]);

const [savingCharacterCanon, setSavingCharacterCanon] = useState(false);
const [characterCanonSaveError, setCharacterCanonSaveError] = useState("");
const [characterImageName, setCharacterImageName] = useState("");
const [characterImageFile, setCharacterImageFile] = useState<File | null>(null);
const [characterImagePreview, setCharacterImagePreview] = useState("");
const [characterImageColorMode, setCharacterImageColorMode] = useState<
  "monochrome" | "color" | "unspecified"
>("unspecified");
const [savingCharacterFromImage, setSavingCharacterFromImage] = useState(false);
const [characterImageSaveError, setCharacterImageSaveError] = useState("");

// Preview generation state (for Create from Text form)
const [characterPreviewUrl, setCharacterPreviewUrl] = useState("");
const [generatingPreview, setGeneratingPreview] = useState(false);
const [characterPreviewError, setCharacterPreviewError] = useState("");

// Per-card preview state (for Saved Character cards)
const [cardPreviews, setCardPreviews] = useState<Record<string, { generating: boolean; previewUrl: string; error: string }>>({});
const [cardSavingImage, setCardSavingImage] = useState<Record<string, boolean>>({});

async function handleGenerateCharacterPreview() {
  if (generatingPreview) return;
  const { name, canonSummary, appearanceNotes, mustPreserve, colorMode } = characterCanonTextForm;
  if (!name || !appearanceNotes) {
    setCharacterPreviewError("Cần nhập tên và appearance notes trước.");
    return;
  }
  setGeneratingPreview(true);
  setCharacterPreviewError("");
  try {
    const res = await fetch("/api/mainga-lab/preview-character", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, canonSummary, appearanceNotes, mustPreserve, colorMode }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setCharacterPreviewError(data?.error || "Lỗi generate preview.");
    } else {
      setCharacterPreviewUrl(data.imageUrl);
    }
  } catch {
    setCharacterPreviewError("Lỗi kết nối khi generate preview.");
  }
  setGeneratingPreview(false);
}

function resetCharacterCanonTextForm() {
  setCharacterCanonTextForm({
    name: "",
    canonSummary: "",
    appearanceNotes: "",
    mustPreserve: "",
    avoidDrift: "",
    colorMode: "unspecified",
  });
  setCharacterCanonSaveError("");
  setCharacterPreviewUrl("");
  setCharacterPreviewError("");
}

function resetCharacterCanonImageForm() {
  setCharacterImageName("");
  setCharacterImagePreview("");
  setCharacterImageFile(null);
  setCharacterImageColorMode("unspecified");
  setCharacterImageSaveError("");
}

async function handleCardGeneratePreview(character: CharacterProfile) {
  const id = character.id;
  setCardPreviews(prev => ({ ...prev, [id]: { generating: true, previewUrl: prev[id]?.previewUrl || "", error: "" } }));
  try {
    const res = await fetch("/api/mainga-lab/preview-character", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: character.name,
        canonSummary: character.canonSummary || "",
        appearanceNotes: character.appearanceNotes || "",
        mustPreserve: character.mustPreserve || "",
        colorMode: character.colorMode || "unspecified",
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setCardPreviews(prev => ({ ...prev, [id]: { generating: false, previewUrl: prev[id]?.previewUrl || "", error: data?.error || "Lỗi generate." } }));
    } else {
      setCardPreviews(prev => ({ ...prev, [id]: { generating: false, previewUrl: data.imageUrl, error: "" } }));
    }
  } catch {
    setCardPreviews(prev => ({ ...prev, [id]: { generating: false, previewUrl: prev[id]?.previewUrl || "", error: "Lỗi kết nối." } }));
  }
}

async function handleCardSaveImage(characterId: string, imageUrl: string) {
  setCardSavingImage(prev => ({ ...prev, [characterId]: true }));
  try {
    const res = await fetch(`/api/mainga-lab/characters/${characterId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ primaryImageUrl: imageUrl }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.character) {
      setLabCharacters(prev => prev.map(c => c.id === characterId ? { ...c, primaryImageUrl: imageUrl } : c));
      setCardPreviews(prev => { const next = { ...prev }; delete next[characterId]; return next; });
    }
  } catch {}
  setCardSavingImage(prev => ({ ...prev, [characterId]: false }));
}

  const [mangaAiPrompt, setMangaAiPrompt] = useState("");
  const [mangaAiStyle, setMangaAiStyle] = useState("");
  const [mangaAiMode, setMangaAiMode] = useState<"preview" | "hq">("hq");
  const [mangaAiLoading, setMangaAiLoading] = useState(false);
  const [mangaAiProgress, setMangaAiProgress] = useState(0);
  const [mangaAiError, setMangaAiError] = useState("");
  const [mangaAiImages, setMangaAiImages] = useState<string[]>([]);
  const [selectedDraftIndex, setSelectedDraftIndex] = useState<number | null>(null);
  const [mangaAiOutputImage, setMangaAiOutputImage] = useState("");
  const [mangaAiOutputLabel, setMangaAiOutputLabel] = useState("SELECTED OUTPUT");
  
const [mangaAiFinalPromptPreview, setMangaAiFinalPromptPreview] = useState("");

  const [mangaAiCompiledPrompt, setMangaAiCompiledPrompt] = useState("");
  const [mangaAiNegativePrompt, setMangaAiNegativePrompt] = useState("");
  const [mangaAiVariationBasePrompt, setMangaAiVariationBasePrompt] = useState("");
  const [mangaAiPolishPrompt, setMangaAiPolishPrompt] = useState("");
  const [mangaAiHandFixPrompt, setMangaAiHandFixPrompt] = useState("");
  const [mangaAiGripFixPrompt, setMangaAiGripFixPrompt] = useState("");
  const [mangaAiBaseSeed, setMangaAiBaseSeed] = useState<number | null>(null);
  const [mangaAiRegenerating, setMangaAiRegenerating] = useState(false);
  const [mangaAiPolishing, setMangaAiPolishing] = useState(false);
  const [mangaAiOutputIntent, setMangaAiOutputIntent] = useState<OutputIntent>("illustration");
  const [mangaAiSelectedCharacter, setMangaAiSelectedCharacter] = useState<CharacterProfile | null>(null);
  const [mangaAiUseCharacterReference, setMangaAiUseCharacterReference] = useState(false);

  const [showCreateManga, setShowCreateManga] = useState(false);
  const [creatingManga, setCreatingManga] = useState(false);
  const [createProgress, setCreateProgress] = useState(0);
  const [createMsg, setCreateMsg] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    status: "ongoing",
    genre: [] as string[],
    coverPositionX: 50,
    coverPositionY: 50,
  });

  const [showEditManga, setShowEditManga] = useState<MangaItem | null>(null);
  const [editingManga, setEditingManga] = useState(false);
  const [editProgress, setEditProgress] = useState(0);
  const [editMsg, setEditMsg] = useState("");
  const [editCoverFile, setEditCoverFile] = useState<File | null>(null);
  const [editCoverPreview, setEditCoverPreview] = useState("");
  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    description: "",
    status: "ongoing",
    genre: [] as string[],
    coverImage: "",
    coverPositionX: 50,
    coverPositionY: 50,
  });

  const [showAddChapter, setShowAddChapter] = useState<MangaItem | null>(null);
  const [chapterNum, setChapterNum] = useState(1);
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterPages, setChapterPages] = useState<File[]>([]);
  const [chapterDragOver, setChapterDragOver] = useState(false);
  const [uploadingChapter, setUploadingChapter] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }
    fetchMyMangas();
  }, [status, router]);

useEffect(() => {
  if (activeTab === "mainga-lab") {
    fetchLabCharacters();
    startLabUpgradeTimer(); // Start 30s upgrade modal timer
  }
}, [activeTab]);
  
  async function fetchMyMangas() {
    setLoading(true);
    try {
      const res = await fetch("/api/manga?mine=true", { cache: "no-store" });
      const data = await res.json();
      setMangas(Array.isArray(data.mangas) ? data.mangas : []);
    } catch {
      setMangas([]);
    }
    setLoading(false);
  }
async function fetchLabCharacters() {
  setLabLoading(true);
  setLabError("");
  setShowUpgradeModal(false);

  try {
    const res = await fetch("/api/mainga-lab/characters", {
      cache: "no-store",
      credentials: "include", // Ensure cookies are sent
    });

    const data = await res.json().catch(() => ({}));

    if (res.status === 402) {
      setLabCharacters([]);
      // Don't show modal immediately - wait for user action or 30s timer
      setLabLoading(false);
      return;
    }

    if (!res.ok) {
      setLabCharacters([]);
      setLabError(data?.error || "Không thể tải Mainga Lab.");
      setLabLoading(false);
      return;
    }

    setLabCharacters(Array.isArray(data?.characters) ? data.characters : []);
  } catch {
    setLabCharacters([]);
    setLabError("Lỗi kết nối khi tải Mainga Lab.");
  }

  setLabLoading(false);
}

async function handleSaveCharacterCanonText() {
  if (savingCharacterCanon) return;

  const name = characterCanonTextForm.name.trim();
  const canonSummary = characterCanonTextForm.canonSummary.trim();
  const appearanceNotes = characterCanonTextForm.appearanceNotes.trim();
  const mustPreserve = characterCanonTextForm.mustPreserve.trim();
  const avoidDrift = characterCanonTextForm.avoidDrift.trim();

  if (!name) {
    setCharacterCanonSaveError("Vui lòng nhập tên nhân vật.");
    return;
  }

  if (!canonSummary) {
    setCharacterCanonSaveError("Vui lòng nhập canon summary.");
    return;
  }

  if (!appearanceNotes) {
    setCharacterCanonSaveError("Vui lòng nhập appearance notes.");
    return;
  }

  if (!mustPreserve) {
    setCharacterCanonSaveError("Vui lòng nhập must preserve.");
    return;
  }

  setSavingCharacterCanon(true);
  setCharacterCanonSaveError("");

  try {
    const res = await fetch("/api/mainga-lab/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensure cookies are sent
      body: JSON.stringify({
        name,
        canonSummary,
        appearanceNotes,
        mustPreserve,
        avoidDrift,
        colorMode: characterCanonTextForm.colorMode,
        sourceType: "generated",
        primaryImageUrl: characterPreviewUrl || undefined,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setCharacterCanonSaveError(data?.error || "Không thể lưu character canon.");
      setSavingCharacterCanon(false);
      return;
    }

    if (res.status === 402) {
      triggerLabUpgradeOnAction(); // Show modal on action (user clicked save button)
      setCharacterCanonSaveError("");
      setSavingCharacterCanon(false);
      return;
    }

    await fetchLabCharacters();
    resetCharacterCanonTextForm();
    setShowCreateCharacterCanon(false);
  } catch {
    setCharacterCanonSaveError("Lỗi kết nối khi lưu character canon.");
  }

  setSavingCharacterCanon(false);
}

async function handleSaveCharacterFromImage() {
  if (savingCharacterFromImage) return;

  if (!characterImageFile) {
    setCharacterImageSaveError("Vui lòng chọn ảnh nhân vật.");
    return;
  }

  setSavingCharacterFromImage(true);
  setCharacterImageSaveError("");

  try {
    const uploadedImageUrl = await uploadImageToCloudinary(characterImageFile);

    const res = await fetch("/api/mainga-lab/characters/from-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensure cookies are sent
      body: JSON.stringify({
        imageUrl: uploadedImageUrl,
        name: characterImageName.trim(),
        colorMode: characterImageColorMode,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setCharacterImageSaveError(data?.error || "Không thể tạo character từ image.");
      setSavingCharacterFromImage(false);
      return;
    }

    if (res.status === 402) {
      triggerLabUpgradeOnAction(); // Show modal on action (user clicked create button)
      setCharacterImageSaveError("");
      setSavingCharacterFromImage(false);
      return;
    }

    await fetchLabCharacters();
    resetCharacterCanonImageForm();
    setShowCreateCharacterCanon(false);
  } catch {
    setCharacterImageSaveError("Lỗi kết nối khi tạo character từ image.");
  }

  setSavingCharacterFromImage(false);
}

  async function uploadImageToCloudinary(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset");

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadData = await uploadRes.json();
    if (!uploadRes.ok || !uploadData.secure_url) {
      throw new Error("Upload ảnh thất bại");
    }

    return uploadData.secure_url as string;
  }

  function resetCreateForm() {
    setCreateForm({
      title: "",
      description: "",
      status: "ongoing",
      genre: [],
      coverPositionX: 50,
      coverPositionY: 50,
    });
    setCoverFile(null);
    setCoverPreview("");
    setCreateProgress(0);
    setCreateMsg("");
  }

  function openCreateManga() {
    resetCreateForm();
    setShowCreateManga(true);
  }

  function toggleCreateGenre(genre: string) {
    setCreateForm((prev) => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter((g) => g !== genre)
        : [...prev.genre, genre],
    }));
  }

  function toggleEditGenre(genre: string) {
    setEditForm((prev) => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter((g) => g !== genre)
        : [...prev.genre, genre],
    }));
  }

  async function handleCreateManga() {
    if (!createForm.title.trim()) {
      setCreateMsg("Vui lòng nhập tên manga.");
      return;
    }

    setCreatingManga(true);
    setCreateMsg("");
    setCreateProgress(10);

    try {
      let coverImage = "";

      if (coverFile) {
        coverImage = await uploadImageToCloudinary(coverFile);
        setCreateProgress(65);
      }

      const res = await fetch("/api/manga", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: createForm.title.trim(),
          description: createForm.description.trim(),
          status: createForm.status,
          genre: createForm.genre,
          coverImage,
          coverPositionX: createForm.coverPositionX,
          coverPositionY: createForm.coverPositionY,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setCreateMsg(data.error || "Tạo manga thất bại.");
        setCreatingManga(false);
        return;
      }

      setCreateProgress(100);
      setShowCreateManga(false);
      resetCreateForm();
      await fetchMyMangas();
      alert("Đã tạo manga thành công.");
    } catch {
      setCreateMsg("Lỗi kết nối hoặc upload ảnh bìa.");
    }

    setCreatingManga(false);
  }

  function openEditManga(manga: MangaItem) {
    setEditForm({
      id: manga.id,
      title: manga.title || "",
      description: manga.description || "",
      status: manga.status || "ongoing",
      genre: Array.isArray(manga.genre) ? manga.genre : [],
      coverImage: manga.coverImage || "",
      coverPositionX: manga.coverPositionX ?? 50,
      coverPositionY: manga.coverPositionY ?? 50,
    });
    setEditCoverFile(null);
    setEditCoverPreview(manga.coverImage || "");
    setEditProgress(0);
    setEditMsg("");
    setShowEditManga(manga);
  }

  async function handleEditManga() {
    if (!editForm.title.trim()) {
      setEditMsg("Vui lòng nhập tên manga.");
      return;
    }

    setEditingManga(true);
    setEditMsg("");
    setEditProgress(10);

    try {
      let nextCover = editForm.coverImage || "";

      if (editCoverFile) {
        nextCover = await uploadImageToCloudinary(editCoverFile);
        setEditProgress(64);
      }

      const res = await fetch(`/api/manga/${editForm.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editForm.title.trim(),
          description: editForm.description.trim(),
          status: editForm.status,
          genre: editForm.genre,
          coverImage: nextCover,
          coverPositionX: editForm.coverPositionX,
          coverPositionY: editForm.coverPositionY,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setEditMsg(data.error || data.message || "Cập nhật manga thất bại.");
        setEditingManga(false);
        return;
      }

      setEditProgress(100);
      setShowEditManga(null);
      await fetchMyMangas();
      alert("Đã cập nhật manga thành công.");
    } catch {
      setEditMsg("Cập nhật manga thất bại.");
    }

    setEditingManga(false);
  }

  async function deleteManga(id: string) {
    await fetch(`/api/manga/${id}`, { method: "DELETE" });
    setMangas((prev) => prev.filter((m) => m.id !== id));
    setShowDeleteConfirm(null);
  }

  function openAddChapter(manga: MangaItem) {
    const nextNum = (manga._count?.chapters || 0) + 1;
    setChapterNum(nextNum);
    setChapterTitle("");
    setChapterPages([]);
    setUploadProgress(0);
    setShowAddChapter(manga);
  }

  async function handleAddChapter() {
    if (chapterPages.length === 0) {
      alert("Vui lòng tải ít nhất 1 trang.");
      return;
    }

    setUploadingChapter(true);
    setUploadProgress(0);

    try {
      const pageUrls: string[] = [];

      for (let i = 0; i < chapterPages.length; i++) {
        const url = await uploadImageToCloudinary(chapterPages[i]);
        pageUrls.push(url);
        setUploadProgress(Math.round(((i + 1) / chapterPages.length) * 100));
      }

      const res = await fetch(`/api/manga/${showAddChapter?.id}/chapters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapterNum,
          title: chapterTitle || `Chapter ${chapterNum}`,
          pages: pageUrls,
        }),
      });

      if (!res.ok) {
        alert("Lỗi tạo chapter.");
        setUploadingChapter(false);
        return;
      }

      setShowAddChapter(null);
      await fetchMyMangas();
      alert(`Đã thêm Chapter ${chapterNum} thành công.`);
    } catch {
      alert("Lỗi kết nối.");
    }

    setUploadingChapter(false);
  }

  function resetAiState() {
  setMangaAiError("");
  setMangaAiImages([]);
  setSelectedDraftIndex(null);
  setMangaAiOutputImage("");
  setMangaAiOutputLabel("SELECTED OUTPUT");
  setMangaAiCompiledPrompt("");
  setMangaAiNegativePrompt("");
  setMangaAiVariationBasePrompt("");
  setMangaAiPolishPrompt("");
  setMangaAiHandFixPrompt("");
  setMangaAiGripFixPrompt("");
  setMangaAiBaseSeed(null);
  setMangaAiFinalPromptPreview("");
}

  async function handleGenerateMangaAi() {
  if (!mangaAiPrompt.trim()) {
    setMangaAiError("Vui lòng nhập mô tả ảnh manga.");
    return;
  }

  setMangaAiLoading(true);
  resetAiState();
  setMangaAiProgress(5);

  const progressTimer = setInterval(() => {
    setMangaAiProgress((prev) => {
      if (prev >= 90) return prev;
      if (prev < 30) return prev + 7;
      if (prev < 60) return prev + 4;
      if (prev < 80) return prev + 2;
      return prev + 1;
    });
  }, 700);

  try {
    const originalPrompt = mangaAiPrompt.trim();
    const originalStyle = mangaAiStyle.trim();
    const nextSeed = Math.floor(Math.random() * 1000000000) + 1;

    // Build character canon injection if character is selected
    const charCanon = mangaAiSelectedCharacter
      ? `\n\n[CHARACTER CANON - MUST PRESERVE IDENTITY]\n` +
        `Character Name: ${mangaAiSelectedCharacter.name}\n` +
        `Canon Summary: ${mangaAiSelectedCharacter.canonSummary}\n` +
        `Appearance Notes: ${mangaAiSelectedCharacter.appearanceNotes}\n` +
        `Must Preserve: ${mangaAiSelectedCharacter.mustPreserve}` +
        (mangaAiSelectedCharacter.avoidDrift ? `\nAvoid Drift: ${mangaAiSelectedCharacter.avoidDrift}` : "") +
        (mangaAiSelectedCharacter.colorMode !== "unspecified" ? `\nColor Mode: ${mangaAiSelectedCharacter.colorMode}` : "")
      : "";

    const [sceneRes, styleRes] = await Promise.all([
      fetch("/api/analyze-scene", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: originalPrompt + charCanon,
          output_intent: mangaAiOutputIntent,
          character_canon: mangaAiSelectedCharacter ? {
            name: mangaAiSelectedCharacter.name,
            canonSummary: mangaAiSelectedCharacter.canonSummary,
            appearanceNotes: mangaAiSelectedCharacter.appearanceNotes,
            mustPreserve: mangaAiSelectedCharacter.mustPreserve,
            avoidDrift: mangaAiSelectedCharacter.avoidDrift,
            colorMode: mangaAiSelectedCharacter.colorMode,
            primaryImageUrl: mangaAiSelectedCharacter.primaryImageUrl,
          } : null,
        }),
      }),
      fetch("/api/analyze-style", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          style: originalStyle,
        }),
      }),
    ]);

    const [sceneData, styleData] = await Promise.all([
      sceneRes.json(),
      styleRes.json(),
    ]);

    if (!sceneRes.ok) {
      clearInterval(progressTimer);
      setMangaAiProgress(0);
      setMangaAiError(sceneData?.error || "Scene analysis thất bại.");
      setMangaAiLoading(false);
      return;
    }

    if (!styleRes.ok) {
      clearInterval(progressTimer);
      setMangaAiProgress(0);
      setMangaAiError(styleData?.error || "Style analysis thất bại.");
      setMangaAiLoading(false);
      return;
    }

    const compileRes = await fetch("/api/compile-manga-prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scene: sceneData.scene,
        style: styleData.style,
        prompt_mode: "fidelity",
        output_intent: sceneData?.output_intent || mangaAiOutputIntent,
        character_canon: mangaAiSelectedCharacter ? {
          name: mangaAiSelectedCharacter.name,
          canonSummary: mangaAiSelectedCharacter.canonSummary,
          appearanceNotes: mangaAiSelectedCharacter.appearanceNotes,
          mustPreserve: mangaAiSelectedCharacter.mustPreserve,
          avoidDrift: mangaAiSelectedCharacter.avoidDrift,
          colorMode: mangaAiSelectedCharacter.colorMode,
          primaryImageUrl: mangaAiSelectedCharacter.primaryImageUrl,
        } : null,
      }),
    });

    const compileData = await compileRes.json();

    if (!compileRes.ok || !compileData?.compiled?.final_prompt) {
      clearInterval(progressTimer);
      setMangaAiProgress(0);
      setMangaAiError(compileData?.error || "Prompt compile thất bại.");
      setMangaAiLoading(false);
      return;
    }

    const compiled = compileData.compiled;

    setMangaAiCompiledPrompt(compiled.final_prompt || "");
    setMangaAiNegativePrompt(compiled.negative_prompt || "");
    setMangaAiVariationBasePrompt(compiled.variation_base_prompt || compiled.final_prompt || "");
    setMangaAiPolishPrompt(compiled.polish_prompt || compiled.final_prompt || "");
    setMangaAiHandFixPrompt(compiled.hand_fix_prompt || compiled.final_prompt || "");
    setMangaAiGripFixPrompt(compiled.grip_fix_prompt || compiled.final_prompt || "");
    setMangaAiBaseSeed(nextSeed);
    setMangaAiFinalPromptPreview(compiled.final_prompt || "");

    // Decide generation method: IP-Adapter or CF Workers
    const useIPAdapter = mangaAiUseCharacterReference &&
      mangaAiSelectedCharacter?.primaryImageUrl &&
      mangaAiSelectedCharacter.primaryImageUrl.length > 0;

    let images: string[] = [];

    if (useIPAdapter) {
      // Use IP-Adapter for character-consistent generation
      setMangaAiError("");

      const imageRes = await fetch("/api/generate-with-character", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: compiled.final_prompt || originalPrompt,
          characterImageUrl: mangaAiSelectedCharacter!.primaryImageUrl,
          negativePrompt: compiled.negative_prompt || "low quality, blurry, bad anatomy",
          width: 768,
          height: 1024,
          steps: 25,
          cfgScale: 5,
          seed: nextSeed,
        }),
      });

      const imageData = await imageRes.json();

      if (!imageRes.ok) {
        clearInterval(progressTimer);
        setMangaAiProgress(0);
        setMangaAiError(imageData?.error || "IP-Adapter generation failed.");
        setMangaAiLoading(false);
        return;
      }

      // IP-Adapter returns image as array
      const ipAdapterOutput = Array.isArray(imageData?.image) ? imageData.image : [imageData?.image];
      images = ipAdapterOutput.filter(Boolean);

      if (images.length === 0) {
        clearInterval(progressTimer);
        setMangaAiProgress(0);
        setMangaAiError("No image returned from IP-Adapter.");
        setMangaAiLoading(false);
        return;
      }
    } else {
      // Use Fal.ai flux/dev → Cloudinary (HQ generation)
      const imageRes = await fetch("/api/generate-manga-cf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: originalPrompt,
          analyzedPrompt: compiled.final_prompt,
          negative_prompt: compiled.negative_prompt,
          mode: "hq",
          seed: nextSeed,
          count: 1,
        }),
      });

      const imageData = await imageRes.json();
      console.log("[MangaAI] generate-manga-cf response:", JSON.stringify(imageData).slice(0, 300));

      if (!imageRes.ok) {
        clearInterval(progressTimer);
        setMangaAiProgress(0);
        setMangaAiError(imageData?.error || "Tạo ảnh thất bại.");
        setMangaAiLoading(false);
        return;
      }

      images = Array.isArray(imageData?.images) ? imageData.images : [];
      console.log("[MangaAI] images array:", images);

      if (images.length === 0) {
        clearInterval(progressTimer);
        setMangaAiProgress(0);
        setMangaAiError("Không nhận được ảnh từ AI.");
        setMangaAiLoading(false);
        return;
      }
    }

    clearInterval(progressTimer);
    setMangaAiProgress(100);
    setMangaAiImages(images);
  } catch {
    clearInterval(progressTimer);
    setMangaAiProgress(0);
    setMangaAiError("Lỗi kết nối khi tạo ảnh.");
  }

  setTimeout(() => {
    setMangaAiLoading(false);
    setMangaAiProgress(0);
  }, 300);
}

  async function handleRegenerateVariation(reason: RejectReason) {
    if (!mangaAiVariationBasePrompt.trim()) {
      setMangaAiError("Thiếu variation base prompt.");
      return;
    }

    const variationPrompt =
      reason === "hand-anatomy"
        ? mangaAiHandFixPrompt
        : reason === "weapon-grip"
        ? mangaAiGripFixPrompt
        : "";

    if (!variationPrompt.trim()) {
      setMangaAiError("Thiếu prompt sửa variation.");
      return;
    }

    setMangaAiRegenerating(true);
    setMangaAiError("");
    setMangaAiOutputImage("");
    setMangaAiOutputLabel("SELECTED OUTPUT");

    try {
      const regenSeed = (mangaAiBaseSeed || Math.floor(Math.random() * 1000000000) + 1) + Date.now() % 1000;

      const res = await fetch("/api/generate-manga-cf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          generation_intent: "variation",
          variation_base_prompt: mangaAiVariationBasePrompt,
          variation_prompt: variationPrompt,
          negative_prompt: mangaAiNegativePrompt,
          reject_reason: reason,
          seed: regenSeed,
          seed_strategy: "close",
          count: 2,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMangaAiError(data?.error || "Regenerate HQ variation thất bại.");
        setMangaAiRegenerating(false);
        return;
      }

      const images = Array.isArray(data?.images) ? data.images : [];
      console.log("[MangaAI] variation images array:", images);

      if (images.length === 0) {
        setMangaAiError("Không nhận được variation nào.");
        setMangaAiRegenerating(false);
        return;
      }

      setMangaAiImages(images);
      setSelectedDraftIndex(null);
      setMangaAiBaseSeed(typeof data?.base_seed === "number" ? data.base_seed : regenSeed);
    } catch {
      setMangaAiError("Lỗi kết nối khi regenerate variation.");
    }

    setMangaAiRegenerating(false);
  }

  async function handleRepairSelectedAnatomy() {
  if (selectedDraftIndex === null || !mangaAiImages[selectedDraftIndex]) {
    setMangaAiError("Vui lòng chọn 1 draft trước.");
    return;
  }

  setMangaAiPolishing(true);
  setMangaAiError("");

  try {
    const res = await fetch("/api/enhance-manga-cf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt:
          mangaAiHandFixPrompt ||
          mangaAiVariationBasePrompt ||
          mangaAiCompiledPrompt ||
          mangaAiPrompt.trim(),
        image: mangaAiImages[selectedDraftIndex],
        mode: "repair-anatomy",
      }),
    });

    const data = await res.json();

    if (!res.ok || !data?.image) {
      setMangaAiError(data?.error || "Sửa giải phẫu thất bại.");
      setMangaAiPolishing(false);
      return;
    }

    setMangaAiOutputLabel("ANATOMY FIX OUTPUT");
    setMangaAiOutputImage(data.image);
  } catch {
    setMangaAiError("Lỗi kết nối khi sửa giải phẫu ảnh.");
  }

  setMangaAiPolishing(false);
}


  const totalViews = mangas.reduce((sum, m) => sum + (m.views || 0), 0);
  const totalChapters = mangas.reduce((sum, m) => sum + (m._count?.chapters || 0), 0);
  const avgRating =
    mangas.length > 0
      ? (mangas.reduce((sum, m) => sum + (m.avgRating || 0), 0) / mangas.length).toFixed(1)
      : "0.0";

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#f0e6d0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .tab-btn { transition: all 0.2s; cursor: pointer; border: none; }
        .tab-btn:hover { opacity: 0.96; }

        .manga-card { transition: all 0.25s ease; }
        .manga-card:hover { transform: translateY(-2px); }

        .action-btn { transition: all 0.2s ease; cursor: pointer; border: none; }
        .action-btn:hover { transform: translateY(-1px); opacity: 0.96; }

        .gold-btn {
          background: linear-gradient(135deg, #c9a84c, #8b6914);
          transition: all 0.25s ease;
          cursor: pointer;
          border: none;
        }
        .gold-btn:hover {
          opacity: 0.96;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(201,168,76,0.28);
        }
        .gold-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        @keyframes fadeUp {
          from { transform: translateY(16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .fade-up { animation: fadeUp 0.35s ease; }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .float { animation: float 3s ease-in-out infinite; }

        .input-field {
          width: 100%;
          padding: 11px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 8px;
          color: #f0e6d0;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border 0.2s;
        }
        .input-field:focus { border-color: #c9a84c; }
        .input-field::placeholder { color: rgba(240,230,208,0.25); }

        .modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.88);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
}

@keyframes dragonFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes dragonWingLeft {
  0%, 100% { transform: rotate(-18deg); }
  50% { transform: rotate(-34deg); }
}

@keyframes dragonWingRight {
  0%, 100% { transform: rotate(18deg); }
  50% { transform: rotate(34deg); }
}

@keyframes dragonTail {
  0%, 100% { transform: rotate(-8deg); }
  50% { transform: rotate(8deg); }
}

@keyframes dragonBlink {
  0%, 46%, 100% { transform: scaleY(1); }
  48%, 50% { transform: scaleY(0.15); }
}

@keyframes dragonFlame {
  0%, 100% { transform: scale(1) translateX(0); opacity: 0.85; }
  50% { transform: scale(1.15) translateX(3px); opacity: 1; }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

      `}</style>

      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(8,8,8,0.95)",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
          backdropFilter: "blur(20px)",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <div
          onClick={() => router.push("/")}
          style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
        >
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: 34, height: 34, borderRadius: 8, objectFit: "contain" }}
          />
          <div
            style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: "0.1em",
            }}
          >
            M<span style={{ color: "#c9a84c" }}>AI</span>NGA
          </div>
        </div>

        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 13,
            color: "rgba(240,230,208,0.5)",
            letterSpacing: "0.12em",
          }}
        >
          AUTHOR DASHBOARD
        </div>

        <button
          onClick={() => router.push("/")}
          style={{
            background: "transparent",
            border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: 6,
            padding: "7px 16px",
            color: "rgba(240,230,208,0.5)",
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Trang chủ
        </button>
      </nav>
<div
  style={{
    width: "100%",
    maxWidth: 1500,
    margin: "0 auto",
    padding: "40px 32px 40px 20px",
  }}
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "260px minmax(0, 1fr)",
      gap: 32,
      alignItems: "start",
      width: "100%",
    }}
  >
    <div
      style={{
        position: "sticky",
        top: 88,
        alignSelf: "start",
      }}
    >
      <div
        style={{
          width: "100%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.015))",
          border: "1px solid rgba(201,168,76,0.1)",
          borderRadius: 18,
          padding: 14,
          boxShadow: "0 10px 32px rgba(0,0,0,0.22)",
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(240,230,208,0.32)",
            marginBottom: 12,
            padding: "0 6px",
          }}
        >
          Dashboard Menu
        </div>

        {[
          ["overview", "Tổng Quan", "Stats và hiệu suất"],
          ["mangas", "Manga Của Tôi", "Quản lý manga và chapter"],
          ["ai-manga", "AI Manga Generator", "Tạo ảnh manga fidelity"],
          ["mainga-lab", "Mainga Lab", "Character canon và tools"],
        ].map(([tab, label, hint]) => {
          const active = activeTab === tab;
          const tabKey = tab as "overview" | "mangas" | "ai-manga" | "mainga-lab";

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tabKey)}
              className="tab-btn"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left",
                padding: "12px 12px",
                borderRadius: 14,
                marginBottom: 8,
                border: active ? "1px solid rgba(201,168,76,0.28)" : "1px solid transparent",
                background: active
                  ? "linear-gradient(135deg, rgba(201,168,76,0.18), rgba(139,105,20,0.14))"
                  : "transparent",
                color: active ? "#f5eedf" : "rgba(240,230,208,0.56)",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background: active
                    ? "linear-gradient(135deg, #c9a84c, #8b6914)"
                    : "rgba(255,255,255,0.035)",
                  color: active ? "#080808" : "#c9a84c",
                  boxShadow: active ? "0 6px 18px rgba(201,168,76,0.18)" : "none",
                }}
              >
                <DashboardMenuIcon type={tabKey} active={active} />
              </div>

              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: active ? "#f5eedf" : "#f0e6d0",
                    marginBottom: 3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {label}
                </div>

                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: active ? "rgba(240,230,208,0.72)" : "rgba(240,230,208,0.32)",
                    lineHeight: 1.4,
                  }}
                >
                  {hint}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>

    <div
      style={{
        minWidth: 0,
        width: "100%",
      }}
    >
      <div style={{ marginBottom: 40 }}>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            letterSpacing: "0.28em",
            color: "#c9a84c",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Chào mừng trở lại
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(24px, 4vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#f5eedf",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {session?.user?.name || "Tác Giả"}
          </h1>
          {(session?.user as any)?.subscriptionTier && (session?.user as any)?.subscriptionTier !== "FREE" && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: "linear-gradient(135deg, #c9a84c, #a08030)",
                color: "#0a0806",
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "0.08em",
                padding: "5px 12px",
                borderRadius: 8,
                boxShadow: "0 2px 12px rgba(201,168,76,0.35)",
                whiteSpace: "nowrap",
              }}
            >
              ✦ {(session?.user as any)?.subscriptionTier}
            </span>
          )}
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="fade-up">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 16,
              marginBottom: 40,
            }}
          >
            {[
              ["Tổng Manga", mangas.length],
              ["Lượt Xem", totalViews.toLocaleString()],
              ["Tổng Chapter", totalChapters],
              ["Rating TB", avgRating],
            ].map(([label, val]) => (
              <div
                key={label as string}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  borderRadius: 12,
                  padding: 24,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 28,
                    color: "#c9a84c",
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  {val}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: "rgba(240,230,208,0.3)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  {label as string}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(201,168,76,0.1)",
              borderRadius: 12,
              padding: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                marginBottom: 24,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 15,
                  color: "#c9a84c",
                  letterSpacing: "0.08em",
                }}
              >
                Manga Nổi Bật
              </div>

              <button
                className="gold-btn"
                onClick={openCreateManga}
                style={{
                  padding: "10px 18px",
                  borderRadius: 8,
                  color: "#080808",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Đăng Manga Mới
              </button>
            </div>

            {mangas.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div
                  className="float"
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 999,
                    margin: "0 auto 16px",
                    border: "1px solid rgba(201,168,76,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#c9a84c",
                    fontFamily: "'Cinzel', serif",
                    fontSize: 22,
                  }}
                >
                  M
                </div>

                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: "rgba(240,230,208,0.3)",
                    marginBottom: 20,
                  }}
                >
                  Bạn chưa có manga nào
                </div>

                <button
                  className="gold-btn"
                  onClick={openCreateManga}
                  style={{
                    padding: "12px 28px",
                    borderRadius: 8,
                    color: "#080808",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Đăng Manga Đầu Tiên
                </button>
              </div>
            ) : (
              [...mangas]
                .sort((a, b) => (b.views || 0) - (a.views || 0))
                .slice(0, 5)
                .map((m, i) => (
                  <div
                    key={m.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "14px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: 18,
                        color: i < 3 ? "#c9a84c" : "rgba(240,230,208,0.2)",
                        minWidth: 32,
                        textAlign: "center",
                      }}
                    >
                      #{i + 1}
                    </div>

                    <div style={{ width: 44, flexShrink: 0 }}>
                      <CoverImage
                        src={m.coverImage}
                        alt={m.title}
                        positionX={m.coverPositionX ?? 50}
                        positionY={m.coverPositionY ?? 50}
                        aspectRatio="3 / 4"
                        borderRadius={8}
                      />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 15,
                          color: "#f5eedf",
                          marginBottom: 4,
                          fontWeight: 800,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {m.title}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          color: "rgba(240,230,208,0.3)",
                        }}
                      >
                        {m._count?.chapters || 0} chapters · Rating {m.avgRating?.toFixed(1) || "0.0"}
                      </div>
                    </div>

                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        color: "#c9a84c",
                      }}
                    >
                      {m.views || 0}
                    </div>

                    <button
                      className="action-btn"
                      onClick={() => openAddChapter(m)}
                      style={{
                        padding: "6px 14px",
                        background: "linear-gradient(135deg,#c9a84c,#8b6914)",
                        borderRadius: 6,
                        color: "#080808",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      Thêm Chapter
                    </button>
                  </div>
                ))
            )}
          </div>
        </div>
      )}
        {activeTab === "mangas" && (
          <div className="fade-up">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "rgba(240,230,208,0.4)",
                }}
              >
                {mangas.length} manga
              </div>

              <button
                className="gold-btn"
                onClick={openCreateManga}
                style={{
                  padding: "9px 20px",
                  borderRadius: 8,
                  color: "#080808",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Đăng Manga Mới
              </button>
            </div>

            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 0",
                  color: "rgba(240,230,208,0.3)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Đang tải...
              </div>
            ) : mangas.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div
                  className="float"
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 999,
                    margin: "0 auto 20px",
                    border: "1px solid rgba(201,168,76,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#c9a84c",
                    fontFamily: "'Cinzel', serif",
                    fontSize: 24,
                  }}
                >
                  M
                </div>

                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15,
                    color: "rgba(240,230,208,0.3)",
                    marginBottom: 24,
                  }}
                >
                  Chưa có manga nào
                </div>

                <button
                  className="gold-btn"
                  onClick={openCreateManga}
                  style={{
                    padding: "12px 28px",
                    borderRadius: 8,
                    color: "#080808",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Đăng Manga Đầu Tiên
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {mangas.map((m) => (
                  <div
                    key={m.id}
                    className="manga-card"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(201,168,76,0.1)",
                      borderRadius: 12,
                      overflow: "hidden",
                      display: "flex",
                      gap: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 116,
                        minHeight: 156,
                        flexShrink: 0,
                        background: "rgba(201,168,76,0.03)",
                        padding: 10,
                      }}
                    >
                      <CoverImage
                        src={m.coverImage}
                        alt={m.title}
                        positionX={m.coverPositionX ?? 50}
                        positionY={m.coverPositionY ?? 50}
                        aspectRatio="3 / 4"
                        borderRadius={12}
                      />
                    </div>

                    <div
                      style={{
                        flex: 1,
                        padding: "18px 22px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 16,
                            color: "#f5eedf",
                            marginBottom: 8,
                            fontWeight: 800,
                            lineHeight: 1.3,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {m.title}
                        </div>

                        {Array.isArray(m.genre) && m.genre.length > 0 && (
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                            {m.genre.slice(0, 6).map((g: string) => (
                              <span
                                key={g}
                                style={{
                                  padding: "5px 10px",
                                  borderRadius: 999,
                                  border: "1px solid rgba(201,168,76,0.18)",
                                  background: "rgba(201,168,76,0.08)",
                                  color: "#c9a84c",
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: 11,
                                  fontWeight: 600,
                                }}
                              >
                                {g}
                              </span>
                            ))}
                          </div>
                        )}

                        <div style={{ display: "flex", gap: 16, marginBottom: 10, flexWrap: "wrap" }}>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 12,
                              color: "rgba(240,230,208,0.4)",
                            }}
                          >
                            {m._count?.chapters || 0} chapters
                          </span>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 12,
                              color: "rgba(240,230,208,0.4)",
                            }}
                          >
                            {m.views || 0} lượt xem
                          </span>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 12,
                              color: "rgba(240,230,208,0.4)",
                            }}
                          >
                            Rating {m.avgRating?.toFixed(1) || "0.0"}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 12,
                              color: "#c9a84c",
                            }}
                          >
                            {m.status === "completed" ? "Hoàn thành" : "Đang tiến hành"}
                          </span>
                        </div>

                        {m.description && (
                          <div
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 13,
                              color: "rgba(240,230,208,0.34)",
                              lineHeight: 1.55,
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              maxWidth: 840,
                            } as any}
                          >
                            {m.description}
                          </div>
                        )}
                      </div>

                      <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                        <button
                          className="action-btn gold-btn"
                          onClick={() => openAddChapter(m)}
                          style={{
                            padding: "8px 18px",
                            borderRadius: 7,
                            color: "#080808",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          Thêm Chapter
                        </button>

                        <button
                          className="action-btn"
                          onClick={() => openEditManga(m)}
                          style={{
                            padding: "8px 16px",
                            background: "rgba(201,168,76,0.08)",
                            border: "1px solid rgba(201,168,76,0.2)",
                            borderRadius: 7,
                            color: "#c9a84c",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          Sửa Manga
                        </button>

                        <button
                          className="action-btn"
                          onClick={() => router.push(`/manga/${m.id}`)}
                          style={{
                            padding: "8px 16px",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.10)",
                            borderRadius: 7,
                            color: "#f0e6d0",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 13,
                          }}
                        >
                          Xem
                        </button>

                        <button
                          className="action-btn"
                          onClick={() => setShowDeleteConfirm(m.id)}
                          style={{
                            padding: "8px 12px",
                            background: "rgba(255,60,60,0.06)",
                            border: "1px solid rgba(255,60,60,0.15)",
                            borderRadius: 7,
                            color: "#ff5050",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 13,
                          }}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "ai-manga" && (
          <div className="fade-up">
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(201,168,76,0.1)",
                borderRadius: 12,
                padding: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 24,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 15,
                      color: "#c9a84c",
                      letterSpacing: "0.08em",
                      marginBottom: 6,
                    }}
                  >
                    AI MANGA GENERATOR
                  </div>

                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: "rgba(240,230,208,0.4)",
                    }}
                  >
                    "Fidelity mode: giữ prompt gần intent gốc, chỉ compile nhẹ để tạo ảnh ổn định hơn"
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 18 }}>
                <textarea
                  className="input-field"
                  rows={5}
                  placeholder="Ví dụ: kiếm sĩ trẻ chiến đấu với ác quỷ dưới mưa, phong cách manga trắng đen, góc máy động..."
                  value={mangaAiPrompt}
                  onChange={(e) => setMangaAiPrompt(e.target.value)}
                  disabled={mangaAiLoading || mangaAiRegenerating || mangaAiPolishing}
                  style={{ resize: "vertical", minHeight: 140 }}
                />

                <textarea
                  className="input-field"
                  rows={3}
                  placeholder="Style (tùy chọn) — ví dụ: dark fantasy manga, high contrast ink, dramatic lighting..."
                  value={mangaAiStyle}
                  onChange={(e) => setMangaAiStyle(e.target.value)}
                  disabled={mangaAiLoading || mangaAiRegenerating || mangaAiPolishing}
                  style={{ resize: "vertical", minHeight: 80 }}
                />
<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
  <div
    style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: 12,
      color: "rgba(240,230,208,0.45)",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    }}
  >
    Output Intent
  </div>

  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
    {[
      ["illustration", "Illustration"],
      ["cover", "Cover"],
      ["portrait", "Portrait"],
      ["full-body", "Full Body"],
      ["action-scene", "Action Scene"],
      ["dialogue-scene", "Dialogue Scene"],
      ["environment", "Environment"],
    ].map(([value, label]) => {
      const active = mangaAiOutputIntent === value;

      return (
        <button
          key={value}
          type="button"
          onClick={() => setMangaAiOutputIntent(value as OutputIntent)}
          disabled={mangaAiLoading || mangaAiRegenerating || mangaAiPolishing}
          style={{
            padding: "8px 12px",
            borderRadius: 999,
            border: active ? "none" : "1px solid rgba(201,168,76,0.16)",
            background: active
              ? "linear-gradient(135deg,#c9a84c,#8b6914)"
              : "rgba(255,255,255,0.03)",
            color: active ? "#080808" : "#f0e6d0",
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: active ? 700 : 500,
            cursor:
              mangaAiLoading || mangaAiRegenerating || mangaAiPolishing
                ? "not-allowed"
                : "pointer",
          }}
        >
          {label}
        </button>
      );
    })}
  </div>
</div>

                {/* Character Selector */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: "rgba(240,230,208,0.45)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      Character from Mainga Lab
                    </div>
                    {mangaAiSelectedCharacter && (
                      <button
                        type="button"
                        onClick={() => setMangaAiSelectedCharacter(null)}
                        disabled={mangaAiLoading || mangaAiRegenerating || mangaAiPolishing}
                        style={{
                          padding: "4px 10px",
                          borderRadius: 6,
                          border: "1px solid rgba(255,100,100,0.2)",
                          background: "rgba(255,80,80,0.08)",
                          color: "rgba(255,100,100,0.7)",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 11,
                          cursor: "pointer",
                        }}
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {labCharacters.length === 0 ? (
                    <div
                      style={{
                        padding: "14px 16px",
                        borderRadius: 10,
                        border: "1px dashed rgba(201,168,76,0.15)",
                        background: "rgba(255,255,255,0.01)",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: "rgba(240,230,208,0.35)",
                        textAlign: "center",
                      }}
                    >
                      No characters saved in Mainga Lab yet.
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        flexWrap: "wrap",
                        maxHeight: 160,
                        overflowY: "auto",
                        padding: "4px 0",
                      }}
                    >
                      {labCharacters.map((char) => {
                        const isSelected = mangaAiSelectedCharacter?.id === char.id;
                        return (
                          <div
                            key={char.id}
                            onClick={() => {
                              if (!mangaAiLoading && !mangaAiRegenerating && !mangaAiPolishing) {
                                setMangaAiSelectedCharacter(isSelected ? null : char);
                              }
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              padding: "8px 12px",
                              borderRadius: 10,
                              border: isSelected
                                ? "2px solid #c9a84c"
                                : "1px solid rgba(201,168,76,0.18)",
                              background: isSelected
                                ? "rgba(201,168,76,0.1)"
                                : "rgba(255,255,255,0.02)",
                              cursor: mangaAiLoading || mangaAiRegenerating || mangaAiPolishing
                                ? "not-allowed"
                                : "pointer",
                              opacity: mangaAiLoading || mangaAiRegenerating || mangaAiPolishing ? 0.5 : 1,
                              transition: "all 0.2s",
                              minWidth: 120,
                              maxWidth: 200,
                            }}
                          >
                            {char.primaryImageUrl ? (
                              <img
                                src={char.primaryImageUrl}
                                alt={char.name}
                                style={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: 8,
                                  objectFit: "cover",
                                  flexShrink: 0,
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: 8,
                                  background: "rgba(201,168,76,0.08)",
                                  border: "1px solid rgba(201,168,76,0.15)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontFamily: "'Cinzel', serif",
                                  fontSize: 14,
                                  color: "#c9a84c",
                                  flexShrink: 0,
                                }}
                              >
                                {char.name.charAt(0)}
                              </div>
                            )}
                            <div style={{ minWidth: 0 }}>
                              <div
                                style={{
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: 12,
                                  fontWeight: 600,
                                  color: "#f5eedf",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {char.name}
                              </div>
                              <div
                                style={{
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: 10,
                                  color: "rgba(240,230,208,0.4)",
                                  textTransform: "capitalize",
                                }}
                              >
                                {char.colorMode}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {mangaAiSelectedCharacter && (
                    <div
                      style={{
                        marginTop: 8,
                        padding: "10px 14px",
                        borderRadius: 10,
                        border: "1px solid rgba(201,168,76,0.12)",
                        background: "rgba(201,168,76,0.04)",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        color: "rgba(240,230,208,0.6)",
                        lineHeight: 1.6,
                      }}
                    >
                      <div style={{ color: "#c9a84c", marginBottom: 4, fontWeight: 600 }}>
                        Canon: {mangaAiSelectedCharacter.canonSummary.slice(0, 100)}
                        {mangaAiSelectedCharacter.canonSummary.length > 100 ? "..." : ""}
                      </div>
                      <div style={{ color: "rgba(240,230,208,0.4)" }}>
                        {mangaAiSelectedCharacter.appearanceNotes.slice(0, 80)}
                        {mangaAiSelectedCharacter.appearanceNotes.length > 80 ? "..." : ""}
                      </div>
                    </div>
                  )}

                  {/* IP-Adapter Toggle */}
                  {mangaAiSelectedCharacter && mangaAiSelectedCharacter.primaryImageUrl && (
                    <div
                      style={{
                        marginTop: 12,
                        padding: "12px 16px",
                        borderRadius: 10,
                        border: mangaAiUseCharacterReference
                          ? "1px solid #c9a84c"
                          : "1px solid rgba(201,168,76,0.15)",
                        background: mangaAiUseCharacterReference
                          ? "rgba(201,168,76,0.08)"
                          : "rgba(255,255,255,0.02)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#f5eedf",
                            marginBottom: 4,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                          </svg>
                          Use Character Reference (IP-Adapter)
                        </div>
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 11,
                            color: "rgba(240,230,208,0.45)",
                            lineHeight: 1.5,
                          }}
                        >
                          Inject reference image for stronger character consistency. Uses Replicate IP-Adapter.
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setMangaAiUseCharacterReference(!mangaAiUseCharacterReference)}
                        disabled={mangaAiLoading || mangaAiRegenerating || mangaAiPolishing}
                        style={{
                          width: 48,
                          height: 26,
                          borderRadius: 13,
                          border: "none",
                          background: mangaAiUseCharacterReference
                            ? "linear-gradient(135deg, #c9a84c, #8b6914)"
                            : "rgba(255,255,255,0.1)",
                          cursor: mangaAiLoading || mangaAiRegenerating || mangaAiPolishing
                            ? "not-allowed"
                            : "pointer",
                          position: "relative",
                          transition: "background 0.2s",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background: "#fff",
                            position: "absolute",
                            top: 3,
                            left: mangaAiUseCharacterReference ? 25 : 3,
                            transition: "left 0.2s",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                          }}
                        />
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[
                    "samurai fighting demon in rain",
                    "anime girl in school uniform, manga style",
                    "dark fantasy swordsman, black and white manga panel",
                    "romantic manga couple under cherry blossom",
                  ].map((sample) => (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => !mangaAiLoading && !mangaAiRegenerating && !mangaAiPolishing && setMangaAiPrompt(sample)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 999,
                        border: "1px solid rgba(201,168,76,0.16)",
                        background: "rgba(255,255,255,0.03)",
                        color: "#f0e6d0",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        cursor: mangaAiLoading || mangaAiRegenerating || mangaAiPolishing ? "not-allowed" : "pointer",
                      }}
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>

              {mangaAiError && (
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#ff6b6b",
                    marginBottom: 16,
                  }}
                >
                  {mangaAiError}
                </div>
              )}
{mangaAiFinalPromptPreview && (
  <div
    style={{
      marginBottom: 24,
      borderRadius: 12,
      border: "1px solid rgba(201,168,76,0.12)",
      background: "rgba(255,255,255,0.02)",
      padding: 16,
    }}
  >
    <div
      style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 13,
        color: "#c9a84c",
        letterSpacing: "0.08em",
        marginBottom: 10,
      }}
    >
      FINAL PROMPT PREVIEW
    </div>

    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        color: "rgba(240,230,208,0.82)",
        lineHeight: 1.7,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {mangaAiFinalPromptPreview}
    </div>

    <div style={{ marginTop: 12 }}>
      <button
        onClick={() => navigator.clipboard.writeText(mangaAiFinalPromptPreview)}
        style={{
          padding: "10px 16px",
          borderRadius: 8,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#f0e6d0",
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        Copy final prompt
      </button>
    </div>
  </div>
)}

<div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>

   

  <div
  style={{
    display: "flex",
    gap: 8,
    padding: 4,
    borderRadius: 10,
    border: "1px solid rgba(201,168,76,0.12)",
    background: "rgba(255,255,255,0.02)",
  }}
>
  <button
    type="button"
    disabled
    style={{
      padding: "10px 14px",
      borderRadius: 8,
      border: "none",
      background: "linear-gradient(135deg,#c9a84c,#8b6914)",
      color: "#080808",
      fontFamily: "'Inter', sans-serif",
      fontSize: 12,
      fontWeight: 700,
      cursor: "default",
    }}
  >
    FIDELITY · HQ
  </button>
</div>

  <button
    className="gold-btn"
    onClick={handleGenerateMangaAi}
    disabled={mangaAiLoading || mangaAiRegenerating || mangaAiPolishing}
    style={{
      padding: "12px 22px",
      borderRadius: 8,
      color: "#080808",
      fontFamily: "'Inter', sans-serif",
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: "0.05em",
    }}
  >
    {mangaAiLoading ? "ĐANG TẠO ẢNH HQ..." : "TẠO ẢNH HQ"}
  </button>

  <button
    onClick={() => {
      setMangaAiPrompt("");
      setMangaAiStyle("");
      setMangaAiOutputIntent("illustration");
      setMangaAiMode("hq");
      resetAiState();
    }}
    disabled={mangaAiLoading || mangaAiRegenerating || mangaAiPolishing}
    style={{
      padding: "12px 18px",
      background: "transparent",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 8,
      color: "rgba(240,230,208,0.4)",
      fontFamily: "'Inter', sans-serif",
      fontSize: 13,
      cursor:
        mangaAiLoading || mangaAiRegenerating || mangaAiPolishing
          ? "not-allowed"
          : "pointer",
    }}
  >
    Xóa
  </button>
</div>
              

              <div
                style={{
                  minHeight: 320,
                  borderRadius: 14,
                  border: "1px solid rgba(201,168,76,0.12)",
                  background: "rgba(255,255,255,0.015)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  padding: 18,
                }}
              >
                {mangaAiLoading || mangaAiRegenerating ? (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 18,
      width: "100%",
      minHeight: 320,
      textAlign: "center",
    }}
  >
    <div
      className="float"
      style={{
        width: 120,
        height: 120,
        borderRadius: 999,
        border: "1px solid rgba(201,168,76,0.22)",
        background: "rgba(201,168,76,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 30px rgba(201,168,76,0.14)",
        animation: "float 3s ease-in-out infinite",
      }}
    >
      <svg
        width="88"
        height="88"
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0;0 -2;0 0"
            dur="2.2s"
            repeatCount="indefinite"
          />

          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 41 65;7 41 65;0 41 65"
              dur="1.6s"
              repeatCount="indefinite"
            />
            <path
              d="M41 65L22 50L29 74L41 65Z"
              fill="rgba(201,168,76,0.35)"
              stroke="#8B6914"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </g>

          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 91 65;7 91 65;0 91 65"
              dur="1.6s"
              begin="0.12s"
              repeatCount="indefinite"
            />
            <path
              d="M91 65L108 50L102 74L91 65Z"
              fill="rgba(201,168,76,0.35)"
              stroke="#8B6914"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </g>

          <path
            d="M35 78C35 58 49 44 66 44C85 44 97 58 97 76C97 95 84 108 66 108C48 108 35 96 35 78Z"
            fill="#C9A84C"
            stroke="#8B6914"
            strokeWidth="4"
          />

          <path
            d="M53 47L44 30L57 37L53 47Z"
            fill="#E8D28A"
            stroke="#8B6914"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M78 47L88 30L74 37L78 47Z"
            fill="#E8D28A"
            stroke="#8B6914"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          <circle cx="55" cy="69" r="4.5" fill="#111111" />

          <ellipse cx="77" cy="69" rx="4.5" ry="4.5" fill="#111111">
            <animate
              attributeName="ry"
              values="4.5;4.5;0.6;4.5;4.5"
              keyTimes="0;0.44;0.46;0.48;1"
              dur="3.4s"
              repeatCount="indefinite"
            />
          </ellipse>

          <path
            d="M57 84C60 88 72 88 75 84"
            stroke="#111111"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M63 55L66 50L69 55"
            stroke="#8B6914"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M49 93L44 102"
            stroke="#8B6914"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M82 93L87 102"
            stroke="#8B6914"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-6 96 94;8 96 94;-6 96 94"
              dur="1.8s"
              repeatCount="indefinite"
            />
            <path
              d="M96 88C107 90 112 98 109 107C103 104 97 101 93 95"
              fill="#C9A84C"
              stroke="#8B6914"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    </div>

    <div
      style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 18,
        color: "#c9a84c",
        letterSpacing: "0.04em",
      }}
    >
      {mangaAiRegenerating ? "Rồng con đang sửa variation" : "Rồng con đang luyện ảnh"}
    </div>

    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 14,
        color: "rgba(240,230,208,0.52)",
        maxWidth: 420,
        lineHeight: 1.6,
      }}
    >
      {mangaAiRegenerating
        ? "Đang tạo variation mới từ draft bị lỗi..."
        : "Đang dùng Mana cook ra 1 ảnh..."}
    </div>

    {mangaAiLoading && (
      <div
        style={{
          width: "100%",
          maxWidth: 320,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: "#c9a84c",
            fontWeight: 700,
          }}
        >
          <span>Đang tạo HQ</span>
          <span>{mangaAiProgress}%</span>
        </div>

        <div
          style={{
            width: "100%",
            height: 8,
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            overflow: "hidden",
            border: "1px solid rgba(201,168,76,0.1)",
          }}
        >
          <div
            style={{
              width: `${mangaAiProgress}%`,
              height: "100%",
              background: "linear-gradient(90deg,#c9a84c,#8b6914)",
              borderRadius: 999,
              transition: "width 0.35s ease",
            }}
          />
        </div>
      </div>
    )}
  </div>
) : mangaAiImages.length > 0 ? (

                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: 16,
                      }}
                    >
                      {mangaAiImages.map((image, index) => {
                        const imgSrc = image.startsWith("http") ? image : `data:image/jpeg;base64,${image}`;
                        console.log(`[MangaAI] Draft ${index + 1} src:`, imgSrc.slice(0, 80));
                        return (
                        <div
                          key={index}
                          style={{
                            border: "1px solid rgba(201,168,76,0.12)",
                            borderRadius: 12,
                            overflow: "hidden",
                            background: "rgba(255,255,255,0.02)",
                            padding: 10,
                          }}
                        >
                          <img
                            src={imgSrc}
                            alt={`AI Manga Draft ${index + 1}`}
                            style={{
                              width: "100%",
                              aspectRatio: "1 / 1",
                              objectFit: "cover",
                              borderRadius: 10,
                              display: "block",
                            }}
                          />

                          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                            <button
                              onClick={() => {
  setSelectedDraftIndex(index);
  setMangaAiError("");
  setMangaAiOutputLabel("SELECTED OUTPUT");
  setMangaAiOutputImage(image);
}}
                              style={{
                                flex: 1,
                                padding: "9px 12px",
                                borderRadius: 8,
                                border:
                                  selectedDraftIndex === index
                                    ? "1px solid rgba(201,168,76,0.6)"
                                    : "1px solid rgba(255,255,255,0.1)",
                                background:
                                  selectedDraftIndex === index
                                    ? "rgba(201,168,76,0.14)"
                                    : "rgba(255,255,255,0.04)",
                                color: selectedDraftIndex === index ? "#c9a84c" : "#f0e6d0",
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 12,
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              {selectedDraftIndex === index ? "Đã chọn" : "Chọn ảnh này"}
                            </button>

                            <a
                              href={image.startsWith("http") ? image : `data:image/jpeg;base64,${image}`}
                              download={`mainga-ai-draft-${index + 1}.jpg`}
                              style={{
                                flex: 1,
                                padding: "9px 12px",
                                borderRadius: 8,
                                background: "linear-gradient(135deg,#c9a84c,#8b6914)",
                                color: "#080808",
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 12,
                                fontWeight: 700,
                                textDecoration: "none",
                                textAlign: "center",
                              }}
                            >
                              Tải ảnh
                            </a>
                          </div>
                        </div>
                        );
                      })}
                    </div>

                    <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
  <button
    className="gold-btn"
    onClick={handleRepairSelectedAnatomy}
    disabled={selectedDraftIndex === null || mangaAiRegenerating || mangaAiPolishing}
    style={{
      padding: "12px 18px",
      borderRadius: 8,
      color: "#080808",
      fontFamily: "'Inter', sans-serif",
      fontSize: 13,
      fontWeight: 700,
      cursor:
        selectedDraftIndex === null || mangaAiRegenerating || mangaAiPolishing
          ? "not-allowed"
          : "pointer",
    }}
  >
    {mangaAiPolishing
      ? "ĐANG SỬA ĐỦ NGÓN / GIẢI PHẪU..."
      : "SỬA ĐỦ NGÓN / GIẢI PHẪU"}
  </button>
</div>

                    {selectedDraftIndex !== null && (
                      <div
                        style={{
                          marginTop: 12,
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "0 12px",
                          height: 34,
                          borderRadius: 8,
                          border: "1px solid rgba(201,168,76,0.16)",
                          background: "rgba(201,168,76,0.06)",
                          color: "#c9a84c",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        Draft đang chọn: #{selectedDraftIndex + 1}
                      </div>
                    )}

                    {mangaAiOutputImage && (
                      <div style={{ marginTop: 22 }}>
                        <div
                          style={{
                            fontFamily: "'Cinzel', serif",
                            fontSize: 14,
                            color: "#c9a84c",
                            letterSpacing: "0.08em",
                            marginBottom: 12,
                          }}
                        >
                          {mangaAiOutputLabel}
                        </div>

                        <div
                          style={{
                            border: "1px solid rgba(201,168,76,0.14)",
                            borderRadius: 14,
                            overflow: "hidden",
                            background: "rgba(255,255,255,0.02)",
                            padding: 12,
                          }}
                        >
                          <img
                            src={mangaAiOutputImage.startsWith("http") ? mangaAiOutputImage : `data:image/jpeg;base64,${mangaAiOutputImage}`}
                            alt="AI Manga Output"
                            style={{
                              width: "100%",
                              maxHeight: 1000,
                              objectFit: "contain",
                              borderRadius: 12,
                              display: "block",
                            }}
                          />

                          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                            <a
                              href={mangaAiOutputImage.startsWith("http") ? mangaAiOutputImage : `data:image/jpeg;base64,${mangaAiOutputImage}`}
                              download="mainga-ai-output.png"
                              style={{
                                padding: "10px 16px",
                                borderRadius: 8,
                                background: "linear-gradient(135deg,#c9a84c,#8b6914)",
                                color: "#080808",
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 13,
                                fontWeight: 700,
                                textDecoration: "none",
                              }}
                            >
                              Tải ảnh output
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: 62,
                        height: 62,
                        borderRadius: 999,
                        margin: "0 auto 14px",
                        border: "1px solid rgba(201,168,76,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#c9a84c",
                        fontFamily: "'Cinzel', serif",
                        fontSize: 26,
                      }}
                    >
                      AI
                    </div>

                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: "rgba(240,230,208,0.38)",
                        marginBottom: 6,
                      }}
                    >
                      Chưa có ảnh nào được tạo
                    </div>

                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: "rgba(240,230,208,0.24)",
                      }}
                    >
                      Nhập prompt và bấm tạo ảnh manga
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      {activeTab === "mainga-lab" && (
  <div className="fade-up">
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(201,168,76,0.1)",
          borderRadius: 16,
          padding: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 760 }}>
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 15,
                color: "#c9a84c",
                letterSpacing: "0.08em",
                marginBottom: 8,
              }}
            >
              MAINGA LAB · TIER S
            </div>

            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 28,
                fontWeight: 800,
                color: "#f5eedf",
                letterSpacing: "-0.02em",
                marginBottom: 10,
              }}
            >
              Character Canon
            </div>

            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "rgba(240,230,208,0.52)",
                lineHeight: 1.7,
                maxWidth: 760,
              }}
            >
              Build reusable canon packages for stable character generation. A character in Mainga Lab is not just a reference image — it is an AI-readable canon package for identity consistency.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              className="gold-btn"
              type="button"
              onClick={() => {
                setCharacterCanonCreateMode("text");
                setShowCreateCharacterCanon(true);
              }}
              style={{
                padding: "10px 18px",
                borderRadius: 8,
                color: "#080808",
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              Create from Text
            </button>

            <button
              type="button"
              onClick={() => {
                setCharacterCanonCreateMode("image");
                setShowCreateCharacterCanon(true);
              }}
              style={{
                padding: "10px 18px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,168,76,0.16)",
                color: "#f0e6d0",
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Create from Image
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            marginTop: 20,
          }}
        >
          {[
            ["Primary Image", "Main visual anchor for consistent generation"],
            ["Canon Summary", "Compact identity package for prompt injection"],
            ["Appearance Notes", "Readable visual breakdown of the character"],
            ["Must Preserve", "Traits that cannot drift"],
            ["Avoid Drift", "Known failure modes to suppress"],
            ["Color Mode", "Monochrome or controlled color intent"],
          ].map(([label, desc]) => (
            <div
              key={label}
              style={{
                border: "1px solid rgba(201,168,76,0.12)",
                borderRadius: 12,
                background: "rgba(255,255,255,0.015)",
                padding: 14,
              }}
            >
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: "#c9a84c",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  fontWeight: 700,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "rgba(240,230,208,0.42)",
                  lineHeight: 1.6,
                }}
              >
                {desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreateCharacterCanon && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 16,
          }}
        >
          {characterCanonCreateMode === "text" ? (
            <>
              <div
                style={{
                  border: "1px solid rgba(201,168,76,0.12)",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.015)",
                  padding: 18,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: "#c9a84c",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                    fontWeight: 700,
                  }}
                >
                  Character Canon Input
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: "rgba(240,230,208,0.48)",
                        marginBottom: 8,
                      }}
                    >
                      Character Name
                    </div>
                    <input
                      className="input-field"
                      placeholder="Ví dụ: Akira Kurose"
                      value={characterCanonTextForm.name}
                      onChange={(e) =>
                        updateCharacterCanonTextForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: "rgba(240,230,208,0.48)",
                        marginBottom: 8,
                      }}
                    >
                      Canon Summary
                    </div>
                    <textarea
                      className="input-field"
                      rows={4}
                      placeholder="Tóm tắt ngắn nhưng rõ bản sắc nhân vật, dùng được cho prompt injection."
                      value={characterCanonTextForm.canonSummary}
                      onChange={(e) =>
                        updateCharacterCanonTextForm((prev) => ({
                          ...prev,
                          canonSummary: e.target.value,
                        }))
                      }
                      style={{ resize: "vertical", minHeight: 110 }}
                    />
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: "rgba(240,230,208,0.48)",
                        marginBottom: 8,
                      }}
                    >
                      Appearance Notes
                    </div>
                    <textarea
                      className="input-field"
                      rows={5}
                      placeholder="Mô tả tóc, mắt, khuôn mặt, silhouette, trang phục, vibe hình thể..."
                      value={characterCanonTextForm.appearanceNotes}
                      onChange={(e) =>
                        updateCharacterCanonTextForm((prev) => ({
                          ...prev,
                          appearanceNotes: e.target.value,
                        }))
                      }
                      style={{ resize: "vertical", minHeight: 130 }}
                    />
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: "rgba(240,230,208,0.48)",
                        marginBottom: 8,
                      }}
                    >
                      Must Preserve
                    </div>
                    <textarea
                      className="input-field"
                      rows={3}
                      placeholder="Các trait không được drift: kiểu tóc, mắt, dấu nhận diện, outfit core..."
                      value={characterCanonTextForm.mustPreserve}
                      onChange={(e) =>
                        updateCharacterCanonTextForm((prev) => ({
                          ...prev,
                          mustPreserve: e.target.value,
                        }))
                      }
                      style={{ resize: "vertical", minHeight: 90 }}
                    />
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: "rgba(240,230,208,0.48)",
                        marginBottom: 8,
                      }}
                    >
                      Avoid Drift
                    </div>
                    <textarea
                      className="input-field"
                      rows={3}
                      placeholder="Những lỗi model hay trôi: đổi màu tóc, sai tuổi, lệch khí chất, sai outfit..."
                      value={characterCanonTextForm.avoidDrift}
                      onChange={(e) =>
                        updateCharacterCanonTextForm((prev) => ({
                          ...prev,
                          avoidDrift: e.target.value,
                        }))
                      }
                      style={{ resize: "vertical", minHeight: 90 }}
                    />
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: "rgba(240,230,208,0.48)",
                        marginBottom: 8,
                      }}
                    >
                      Color Mode
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {[
                        ["unspecified", "Unspecified"],
                        ["monochrome", "Monochrome"],
                        ["color", "Color"],
                      ].map(([value, label]) => {
                        const active = characterCanonTextForm.colorMode === value;

                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() =>
                              updateCharacterCanonTextForm((prev) => ({
                                ...prev,
                                colorMode: value as "monochrome" | "color" | "unspecified",
                              }))
                            }
                            style={{
                              padding: "8px 12px",
                              borderRadius: 999,
                              border: active ? "none" : "1px solid rgba(201,168,76,0.16)",
                              background: active
                                ? "linear-gradient(135deg,#c9a84c,#8b6914)"
                                : "rgba(255,255,255,0.03)",
                              color: active ? "#080808" : "#f0e6d0",
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 12,
                              fontWeight: active ? 700 : 500,
                              cursor: "pointer",
                            }}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {characterCanonSaveError && (
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        color: "#ff6b6b",
                        lineHeight: 1.6,
                      }}
                    >
                      {characterCanonSaveError}
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 10, marginTop: 4, flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className="gold-btn"
                      onClick={handleSaveCharacterCanonText}
                      disabled={savingCharacterCanon}
                      style={{
                        padding: "11px 18px",
                        borderRadius: 8,
                        color: "#080808",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: savingCharacterCanon ? "not-allowed" : "pointer",
                        opacity: savingCharacterCanon ? 0.7 : 1,
                      }}
                    >
                      {savingCharacterCanon ? "Đang lưu..." : characterPreviewUrl ? "Lưu nhân vật ✓" : "Lưu nhân vật"}
                    </button>

                    <button
                      type="button"
                      onClick={resetCharacterCanonTextForm}
                      disabled={savingCharacterCanon}
                      style={{
                        padding: "11px 16px",
                        borderRadius: 8,
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(240,230,208,0.5)",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        cursor: savingCharacterCanon ? "not-allowed" : "pointer",
                        opacity: savingCharacterCanon ? 0.7 : 1,
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              <div
                style={{
                  border: "1px solid rgba(201,168,76,0.12)",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.015)",
                  padding: 18,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: "#c9a84c",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                    fontWeight: 700,
                  }}
                >
                  Canon Package Preview
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div
                    style={{
                      border: "1px dashed rgba(201,168,76,0.18)",
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.01)",
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        color: "#c9a84c",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 10,
                        fontWeight: 700,
                      }}
                    >
                      Primary Image
                    </div>

                    {/* Preview image */}
                    {characterPreviewUrl ? (
                      <div>
                        <img
                          src={characterPreviewUrl}
                          alt="Character preview"
                          style={{
                            width: "100%",
                            borderRadius: 8,
                            display: "block",
                            marginBottom: 10,
                            border: "1px solid rgba(201,168,76,0.2)",
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleGenerateCharacterPreview}
                          disabled={generatingPreview}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            borderRadius: 8,
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(201,168,76,0.2)",
                            color: generatingPreview ? "rgba(240,230,208,0.4)" : "#c9a84c",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: generatingPreview ? "not-allowed" : "pointer",
                          }}
                        >
                          {generatingPreview ? "Đang tạo lại..." : "↺ Tạo lại"}
                        </button>
                        {characterPreviewError && (
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#ff6b6b", marginTop: 6 }}>
                            {characterPreviewError}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div
                          style={{
                            width: "100%",
                            aspectRatio: "3/4",
                            background: "rgba(255,255,255,0.02)",
                            border: "1px dashed rgba(201,168,76,0.15)",
                            borderRadius: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            marginBottom: 10,
                            color: "rgba(240,230,208,0.3)",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 12,
                          }}
                        >
                          {generatingPreview ? (
                            <>
                              <div style={{ fontSize: 24 }}>⏳</div>
                              <span>Đang generate...</span>
                            </>
                          ) : (
                            <>
                              <div style={{ fontSize: 24 }}>🎨</div>
                              <span>Chưa có ảnh preview</span>
                            </>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={handleGenerateCharacterPreview}
                          disabled={generatingPreview}
                          style={{
                            width: "100%",
                            padding: "9px 12px",
                            borderRadius: 8,
                            background: generatingPreview
                              ? "rgba(201,168,76,0.1)"
                              : "linear-gradient(135deg,#c9a84c,#8b6914)",
                            border: "none",
                            color: generatingPreview ? "rgba(240,230,208,0.4)" : "#080808",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: generatingPreview ? "not-allowed" : "pointer",
                          }}
                        >
                          {generatingPreview ? "Đang generate..." : "✦ Generate Preview"}
                        </button>
                        {characterPreviewError && (
                          <div
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 11,
                              color: "#ff6b6b",
                              marginTop: 8,
                              lineHeight: 1.5,
                            }}
                          >
                            {characterPreviewError}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {[
                    ["Name", characterCanonTextForm.name || "—"],
                    ["Canon Summary", characterCanonTextForm.canonSummary || "—"],
                    ["Appearance Notes", characterCanonTextForm.appearanceNotes || "—"],
                    ["Must Preserve", characterCanonTextForm.mustPreserve || "—"],
                    ["Avoid Drift", characterCanonTextForm.avoidDrift || "—"],
                    ["Color Mode", characterCanonTextForm.colorMode || "unspecified"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      style={{
                        border: "1px solid rgba(201,168,76,0.1)",
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.01)",
                        padding: 14,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 11,
                          color: "#c9a84c",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: 6,
                          fontWeight: 700,
                        }}
                      >
                        {label}
                      </div>

                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          color: "rgba(240,230,208,0.68)",
                          lineHeight: 1.7,
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
  <div
    style={{
      border: "1px solid rgba(201,168,76,0.12)",
      borderRadius: 12,
      background: "rgba(255,255,255,0.015)",
      padding: 18,
    }}
  >
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 11,
        color: "#c9a84c",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        marginBottom: 14,
        fontWeight: 700,
      }}
    >
      Image Input
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: "rgba(240,230,208,0.48)",
            marginBottom: 8,
          }}
        >
          Character Name (optional)
        </div>
        <input
          className="input-field"
          placeholder="Ví dụ: Akira Kurose"
          value={characterImageName}
          onChange={(e) => setCharacterImageName(e.target.value)}
          disabled={savingCharacterFromImage}
        />
      </div>

      <div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: "rgba(240,230,208,0.48)",
            marginBottom: 8,
          }}
        >
          Upload Character Image
        </div>

        <div
          onClick={() => {
            if (!savingCharacterFromImage) {
              document.getElementById("character-image-input")?.click();
            }
          }}
          style={{
            border: "1px dashed rgba(201,168,76,0.18)",
            borderRadius: 12,
            background: "rgba(255,255,255,0.01)",
            padding: characterImagePreview ? 12 : 28,
            textAlign: "center",
            cursor: savingCharacterFromImage ? "not-allowed" : "pointer",
          }}
        >
          {characterImagePreview ? (
            <div>
              <img
                src={characterImagePreview}
                alt="Character Preview"
                style={{
                  width: "100%",
                  maxHeight: 360,
                  objectFit: "contain",
                  borderRadius: 10,
                  display: "block",
                  marginBottom: 12,
                }}
              />
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "#c9a84c",
                }}
              >
                Bấm để đổi ảnh
              </div>
            </div>
          ) : (
            <div>
              <div
                style={{
                  width: 58,
                  height: 58,
                  margin: "0 auto 12px",
                  borderRadius: 999,
                  border: "1px solid rgba(201,168,76,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#c9a84c",
                  fontFamily: "'Cinzel', serif",
                  fontSize: 22,
                }}
              >
                I
              </div>

              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "#f5eedf",
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                Upload ảnh nhân vật 2D hoặc 3D
              </div>

              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "rgba(240,230,208,0.38)",
                  lineHeight: 1.7,
                }}
              >
                Hệ thống sẽ đọc ảnh, trích xuất canon package, rồi lưu character để dùng tiếp.
              </div>
            </div>
          )}

          <input
            id="character-image-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setCharacterImageFile(file);
              setCharacterImageSaveError("");

              if (file) {
                setCharacterImagePreview(URL.createObjectURL(file));
              } else {
                setCharacterImagePreview("");
              }
            }}
          />
        </div>
      </div>

      <div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: "rgba(240,230,208,0.48)",
            marginBottom: 8,
          }}
        >
          Color Mode
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            ["unspecified", "Unspecified"],
            ["monochrome", "Monochrome"],
            ["color", "Color"],
          ].map(([value, label]) => {
            const active = characterImageColorMode === value;

            return (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setCharacterImageColorMode(value as "monochrome" | "color" | "unspecified")
                }
                disabled={savingCharacterFromImage}
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  border: active ? "none" : "1px solid rgba(201,168,76,0.16)",
                  background: active
                    ? "linear-gradient(135deg,#c9a84c,#8b6914)"
                    : "rgba(255,255,255,0.03)",
                  color: active ? "#080808" : "#f0e6d0",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: active ? 700 : 500,
                  cursor: savingCharacterFromImage ? "not-allowed" : "pointer",
                  opacity: savingCharacterFromImage ? 0.7 : 1,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {characterImageSaveError && (
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: "#ff6b6b",
            lineHeight: 1.6,
          }}
        >
          {characterImageSaveError}
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 4, flexWrap: "wrap" }}>
        <button
          type="button"
          className="gold-btn"
          onClick={handleSaveCharacterFromImage}
          disabled={savingCharacterFromImage}
          style={{
            padding: "11px 18px",
            borderRadius: 8,
            color: "#080808",
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            cursor: savingCharacterFromImage ? "not-allowed" : "pointer",
            opacity: savingCharacterFromImage ? 0.7 : 1,
          }}
        >
          {savingCharacterFromImage ? "Đang phân tích ảnh..." : "Create from Image"}
        </button>

        <button
          type="button"
          onClick={resetCharacterCanonImageForm}
          disabled={savingCharacterFromImage}
          style={{
            padding: "11px 16px",
            borderRadius: 8,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(240,230,208,0.5)",
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            cursor: savingCharacterFromImage ? "not-allowed" : "pointer",
            opacity: savingCharacterFromImage ? 0.7 : 1,
          }}
        >
          Reset
        </button>
      </div>
    </div>
  </div>

  <div
    style={{
      border: "1px solid rgba(201,168,76,0.12)",
      borderRadius: 12,
      background: "rgba(255,255,255,0.015)",
      padding: 18,
    }}
  >
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 11,
        color: "#c9a84c",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        marginBottom: 14,
        fontWeight: 700,
      }}
    >
      Canon Package Output
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        style={{
          border: "1px dashed rgba(201,168,76,0.18)",
          borderRadius: 12,
          background: "rgba(255,255,255,0.01)",
          padding: 16,
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            color: "#c9a84c",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 6,
            fontWeight: 700,
          }}
        >
          Expected Output
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: "rgba(240,230,208,0.42)",
            lineHeight: 1.8,
          }}
        >
          AI sẽ tự tạo:
          <br />
          • canonSummary
          <br />
          • appearanceNotes
          <br />
          • mustPreserve
          <br />
          • avoidDrift
          <br />
          • colorMode
          <br />
          và lưu ảnh upload làm primaryImageUrl
        </div>
      </div>

      {characterImagePreview ? (
        <div
          style={{
            border: "1px solid rgba(201,168,76,0.1)",
            borderRadius: 12,
            background: "rgba(255,255,255,0.01)",
            padding: 14,
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: "#c9a84c",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 6,
              fontWeight: 700,
            }}
          >
            Current Image Preview
          </div>

          <img
            src={characterImagePreview}
            alt="Current character upload"
            style={{
              width: "100%",
              maxHeight: 380,
              objectFit: "contain",
              borderRadius: 10,
              display: "block",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            border: "1px solid rgba(201,168,76,0.1)",
            borderRadius: 12,
            background: "rgba(255,255,255,0.01)",
            padding: 14,
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: "#c9a84c",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 6,
              fontWeight: 700,
            }}
          >
            Current Image Preview
          </div>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: "rgba(240,230,208,0.42)",
              lineHeight: 1.7,
            }}
          >
            Chưa có ảnh nào được chọn.
          </div>
        </div>
      )}
    </div>
  </div>
</>
          )}
        </div>
      )}

      {labError && (
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: "#ff6b6b",
          }}
        >
          {labError}
        </div>
      )}

      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(201,168,76,0.1)",
          borderRadius: 16,
          padding: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 18,
          }}
        >
          <div
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 15,
              color: "#c9a84c",
              letterSpacing: "0.08em",
            }}
          >
            SAVED CHARACTER CANON
          </div>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: "rgba(240,230,208,0.35)",
            }}
          >
            {labCharacters.length} {labCharacters.length === 1 ? "character" : "characters"}
          </div>
        </div>

        {labLoading ? (
          <div
            style={{
              border: "1px solid rgba(201,168,76,0.12)",
              borderRadius: 12,
              background: "rgba(255,255,255,0.015)",
              padding: 24,
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: "rgba(240,230,208,0.38)",
            }}
          >
            Đang tải characters...
          </div>
        ) : labCharacters.length === 0 ? (
          <div
            style={{
              border: "1px dashed rgba(201,168,76,0.18)",
              borderRadius: 12,
              background: "rgba(255,255,255,0.015)",
              padding: 24,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                color: "#f5eedf",
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              Chưa có character canon nào
            </div>

            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "rgba(240,230,208,0.38)",
                lineHeight: 1.7,
                maxWidth: 680,
                margin: "0 auto",
              }}
            >
              Bắt đầu bằng một character canon ổn định trước khi đi tiếp sang pose study và pose control.
            </div>

            {!showCreateCharacterCanon && (
              <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
                <button
                  className="gold-btn"
                  type="button"
                  onClick={() => {
                    setCharacterCanonCreateMode("text");
                    setShowCreateCharacterCanon(true);
                  }}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 8,
                    color: "#080808",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Create from Text
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCharacterCanonCreateMode("image");
                    setShowCreateCharacterCanon(true);
                  }}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(201,168,76,0.16)",
                    color: "#f0e6d0",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Create from Image
                </button>
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {labCharacters.map((character) => (
              <div
                key={character.id}
                onClick={() => setSelectedCharacter(character)}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(201,168,76,0.28)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(201,168,76,0.12)";
                  el.style.transform = "translateY(0)";
                }}
                style={{
                  border: "1px solid rgba(201,168,76,0.12)",
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.015)",
                  cursor: "pointer",
                  transition: "border-color 0.2s, transform 0.15s",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    background: "rgba(201,168,76,0.03)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "1px solid rgba(201,168,76,0.08)",
                  }}
                >
                  {character.primaryImageUrl ? (
                    <img
                      src={character.primaryImageUrl}
                      alt={character.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : cardPreviews[character.id]?.generating ? (
                    <div style={{ padding: 20, textAlign: "center" }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          border: "2.5px solid #c9a84c",
                          borderTopColor: "transparent",
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                          margin: "0 auto 12px",
                        }}
                      />
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(240,230,208,0.5)" }}>
                        Đang generate...
                      </div>
                    </div>
                  ) : cardPreviews[character.id]?.previewUrl ? (
                    <div style={{ position: "relative", width: "100%", height: "100%" }}>
                      <img
                        src={cardPreviews[character.id].previewUrl}
                        alt={character.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          display: "flex",
                          gap: 6,
                          padding: 8,
                          background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                        }}
                        onClick={e => e.stopPropagation()}
                      >
                        <button
                          onClick={(e) => { e.stopPropagation(); handleCardGeneratePreview(character); }}
                          style={{
                            flex: 1,
                            padding: "6px 8px",
                            background: "rgba(0,0,0,0.5)",
                            border: "1px solid rgba(201,168,76,0.35)",
                            borderRadius: 6,
                            color: "#c9a84c",
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: "pointer",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          ↺ Tạo lại
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleCardSaveImage(character.id, cardPreviews[character.id].previewUrl); }}
                          disabled={!!cardSavingImage[character.id]}
                          style={{
                            flex: 1,
                            padding: "6px 8px",
                            background: cardSavingImage[character.id] ? "rgba(201,168,76,0.5)" : "#c9a84c",
                            border: "none",
                            borderRadius: 6,
                            color: "#080808",
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: cardSavingImage[character.id] ? "not-allowed" : "pointer",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {cardSavingImage[character.id] ? "Đang lưu..." : "Lưu ảnh này"}
                        </button>
                      </div>
                      {cardPreviews[character.id]?.error && (
                        <div style={{ position: "absolute", top: 6, left: 6, right: 6, background: "rgba(200,50,50,0.85)", color: "#fff", fontSize: 11, padding: "4px 8px", borderRadius: 6, textAlign: "center" }}>
                          {cardPreviews[character.id].error}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      style={{ padding: 20, textAlign: "center" }}
                      onClick={e => e.stopPropagation()}
                    >
                      <div
                        style={{
                          width: 58,
                          height: 58,
                          margin: "0 auto 12px",
                          borderRadius: 999,
                          border: "1px solid rgba(201,168,76,0.18)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#c9a84c",
                          fontFamily: "'Cinzel', serif",
                          fontSize: 20,
                        }}
                      >
                        C
                      </div>

                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 13,
                          color: "#f5eedf",
                          fontWeight: 700,
                          marginBottom: 6,
                        }}
                      >
                        Chưa có primary image
                      </div>

                      <button
                        className="gold-btn"
                        onClick={(e) => { e.stopPropagation(); handleCardGeneratePreview(character); }}
                        style={{
                          marginTop: 10,
                          padding: "7px 14px",
                          borderRadius: 7,
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#080808",
                          cursor: "pointer",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        ✦ Generate Preview
                      </button>

                      {cardPreviews[character.id]?.error && (
                        <div style={{ marginTop: 6, color: "#e55", fontSize: 11, fontFamily: "'Inter', sans-serif" }}>
                          {cardPreviews[character.id].error}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div style={{ padding: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 10,
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 15,
                        color: "#f5eedf",
                        fontWeight: 800,
                        lineHeight: 1.35,
                      }}
                    >
                      {character.name}
                    </div>

                    <div
                      style={{
                        padding: "5px 9px",
                        borderRadius: 999,
                        background: "rgba(201,168,76,0.1)",
                        border: "1px solid rgba(201,168,76,0.16)",
                        color: "#c9a84c",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {character.colorMode}
                    </div>
                  </div>

                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      color: "rgba(240,230,208,0.34)",
                      marginBottom: 10,
                    }}
                  >
                    {character.sourceType}
                  </div>

                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      color: "rgba(240,230,208,0.7)",
                      lineHeight: 1.65,
                      marginBottom: 12,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    } as any}
                  >
                    {character.canonSummary}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 11,
                          color: "#c9a84c",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: 4,
                          fontWeight: 700,
                        }}
                      >
                        Must Preserve
                      </div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          color: "rgba(240,230,208,0.42)",
                          lineHeight: 1.6,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        } as any}
                      >
                        {character.mustPreserve || "—"}
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 11,
                          color: "#c9a84c",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: 4,
                          fontWeight: 700,
                        }}
                      >
                        Avoid Drift
                      </div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          color: "rgba(240,230,208,0.42)",
                          lineHeight: 1.6,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        } as any}
                      >
                        {character.avoidDrift || "—"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
)}

{showCreateManga && (
          <div
            className="modal-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget && !creatingManga) setShowCreateManga(false);
            }}
          >
            <div
              style={{
                background: "#111",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: 16,
                padding: 36,
                width: "100%",
                maxWidth: 620,
                maxHeight: "90vh",
                overflowY: "auto",
                animation: "fadeUp 0.3s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div>
                  <div
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 18,
                      color: "#f0e6d0",
                      letterSpacing: "0.08em",
                    }}
                  >
                    ĐĂNG MANGA MỚI
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      color: "#c9a84c",
                      marginTop: 4,
                    }}
                  >
                    Tạo manga mới ngay trong dashboard
                  </div>
                </div>

                {!creatingManga && (
                  <button
                    onClick={() => setShowCreateManga(false)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "rgba(240,230,208,0.3)",
                      fontSize: 20,
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
                <input
                  className="input-field"
                  placeholder="Tên manga *"
                  value={createForm.title}
                  onChange={(e) => setCreateForm((prev) => ({ ...prev, title: e.target.value }))}
                  disabled={creatingManga}
                />

                <textarea
                  className="input-field"
                  rows={5}
                  placeholder="Mô tả ngắn về manga..."
                  value={createForm.description}
                  onChange={(e) => setCreateForm((prev) => ({ ...prev, description: e.target.value }))}
                  disabled={creatingManga}
                  style={{ resize: "vertical", minHeight: 120 }}
                />

                <select
                  className="input-field"
                  value={createForm.status}
                  onChange={(e) => setCreateForm((prev) => ({ ...prev, status: e.target.value }))}
                  disabled={creatingManga}
                  style={{ cursor: "pointer" }}
                >
                  <option value="ongoing" style={{ background: "#111" }}>
                    Đang tiến hành
                  </option>
                  <option value="completed" style={{ background: "#111" }}>
                    Hoàn thành
                  </option>
                </select>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "rgba(240,230,208,0.45)",
                    marginBottom: 10,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Thể loại
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {GENRES.map((genre) => {
                    const selected = createForm.genre.includes(genre);
                    return (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => !creatingManga && toggleCreateGenre(genre)}
                        style={{
                          padding: "8px 12px",
                          borderRadius: 999,
                          border: selected ? "none" : "1px solid rgba(201,168,76,0.16)",
                          background: selected
                            ? "linear-gradient(135deg,#c9a84c,#8b6914)"
                            : "rgba(255,255,255,0.03)",
                          color: selected ? "#080808" : "#f0e6d0",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          fontWeight: selected ? 700 : 500,
                          cursor: creatingManga ? "not-allowed" : "pointer",
                        }}
                      >
                        {genre}
                      </button>
                    );
                  })}
                </div>
              </div>

              <CoverEditor
                value={coverPreview}
                positionX={createForm.coverPositionX}
                positionY={createForm.coverPositionY}
                onPositionChange={(x, y) =>
                  setCreateForm((prev) => ({
                    ...prev,
                    coverPositionX: x,
                    coverPositionY: y,
                  }))
                }
                onFileChange={(file, previewUrl) => {
                  setCoverFile(file);
                  setCoverPreview(previewUrl);
                }}
                disabled={creatingManga}
                label="Ảnh bìa manga"
              />

              {createMsg && (
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    marginTop: 16,
                    color: "#ff6b6b",
                  }}
                >
                  {createMsg}
                </div>
              )}

              {creatingManga && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        color: "rgba(240,230,208,0.5)",
                      }}
                    >
                      Đang tạo manga...
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        color: "#c9a84c",
                        fontWeight: 600,
                      }}
                    >
                      {createProgress}%
                    </span>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: 6,
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${createProgress}%`,
                        background: "linear-gradient(90deg,#c9a84c,#8b6914)",
                        borderRadius: 4,
                        transition: "width 0.3s",
                      }}
                    />
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                {!creatingManga && (
                  <button
                    onClick={() => setShowCreateManga(false)}
                    style={{
                      flex: 1,
                      padding: 12,
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 8,
                      color: "rgba(240,230,208,0.4)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    Hủy
                  </button>
                )}

                <button
                  className="gold-btn"
                  onClick={handleCreateManga}
                  disabled={creatingManga}
                  style={{
                    flex: 2,
                    padding: 12,
                    borderRadius: 8,
                    color: "#080808",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                  }}
                >
                  {creatingManga ? `Đang tạo... ${createProgress}%` : "TẠO MANGA"}
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditManga && (
          <div
            className="modal-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget && !editingManga) setShowEditManga(null);
            }}
          >
            <div
              style={{
                background: "#111",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: 16,
                padding: 36,
                width: "100%",
                maxWidth: 620,
                maxHeight: "90vh",
                overflowY: "auto",
                animation: "fadeUp 0.3s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div>
                  <div
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 18,
                      color: "#f0e6d0",
                      letterSpacing: "0.08em",
                    }}
                  >
                    SỬA MANGA
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      color: "#c9a84c",
                      marginTop: 4,
                    }}
                  >
                    Cập nhật ảnh bìa, mô tả, thể loại, trạng thái
                  </div>
                </div>

                {!editingManga && (
                  <button
                    onClick={() => setShowEditManga(null)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "rgba(240,230,208,0.3)",
                      fontSize: 20,
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
                <input
                  className="input-field"
                  placeholder="Tên manga *"
                  value={editForm.title}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                  disabled={editingManga}
                />

                <textarea
                  className="input-field"
                  rows={5}
                  placeholder="Mô tả ngắn về manga..."
                  value={editForm.description}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
                  disabled={editingManga}
                  style={{ resize: "vertical", minHeight: 120 }}
                />

                <select
                  className="input-field"
                  value={editForm.status}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, status: e.target.value }))}
                  disabled={editingManga}
                  style={{ cursor: "pointer" }}
                >
                  <option value="ongoing" style={{ background: "#111" }}>
                    Đang tiến hành
                  </option>
                  <option value="completed" style={{ background: "#111" }}>
                    Hoàn thành
                  </option>
                </select>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "rgba(240,230,208,0.45)",
                    marginBottom: 10,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Thể loại
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {GENRES.map((genre) => {
                    const selected = editForm.genre.includes(genre);
                    return (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => !editingManga && toggleEditGenre(genre)}
                        style={{
                          padding: "8px 12px",
                          borderRadius: 999,
                          border: selected ? "none" : "1px solid rgba(201,168,76,0.16)",
                          background: selected
                            ? "linear-gradient(135deg,#c9a84c,#8b6914)"
                            : "rgba(255,255,255,0.03)",
                          color: selected ? "#080808" : "#f0e6d0",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          fontWeight: selected ? 700 : 500,
                          cursor: editingManga ? "not-allowed" : "pointer",
                        }}
                      >
                        {genre}
                      </button>
                    );
                  })}
                </div>
              </div>

              <CoverEditor
                value={editCoverPreview}
                positionX={editForm.coverPositionX}
                positionY={editForm.coverPositionY}
                onPositionChange={(x, y) =>
                  setEditForm((prev) => ({
                    ...prev,
                    coverPositionX: x,
                    coverPositionY: y,
                  }))
                }
                onFileChange={(file, previewUrl) => {
                  setEditCoverFile(file);
                  setEditCoverPreview(previewUrl);
                }}
                disabled={editingManga}
                label="Ảnh bìa manga"
              />

              {editMsg && (
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    marginTop: 16,
                    color: "#ff6b6b",
                  }}
                >
                  {editMsg}
                </div>
              )}

              {editingManga && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        color: "rgba(240,230,208,0.5)",
                      }}
                    >
                      Đang cập nhật manga...
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        color: "#c9a84c",
                        fontWeight: 600,
                      }}
                    >
                      {editProgress}%
                    </span>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: 6,
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${editProgress}%`,
                        background: "linear-gradient(90deg,#c9a84c,#8b6914)",
                        borderRadius: 4,
                        transition: "width 0.3s",
                      }}
                    />
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                {!editingManga && (
                  <button
                    onClick={() => setShowEditManga(null)}
                    style={{
                      flex: 1,
                      padding: 12,
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 8,
                      color: "rgba(240,230,208,0.4)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    Hủy
                  </button>
                )}

                <button
                  className="gold-btn"
                  onClick={handleEditManga}
                  disabled={editingManga}
                  style={{
                    flex: 2,
                    padding: 12,
                    borderRadius: 8,
                    color: "#080808",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                  }}
                >
                  {editingManga ? `Đang cập nhật... ${editProgress}%` : "LƯU THAY ĐỔI"}
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddChapter && (
          <div
            className="modal-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget && !uploadingChapter) setShowAddChapter(null);
            }}
          >
            <div
              style={{
                background: "#111",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: 16,
                padding: 36,
                width: "100%",
                maxWidth: 500,
                maxHeight: "90vh",
                overflowY: "auto",
                animation: "fadeUp 0.3s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div>
                  <div
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 18,
                      color: "#f0e6d0",
                      letterSpacing: "0.08em",
                    }}
                  >
                    THÊM CHAPTER MỚI
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      color: "#c9a84c",
                      marginTop: 4,
                    }}
                  >
                    {showAddChapter.title}
                  </div>
                </div>

                {!uploadingChapter && (
                  <button
                    onClick={() => setShowAddChapter(null)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "rgba(240,230,208,0.3)",
                      fontSize: 20,
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>

              <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                <input
                  className="input-field"
                  style={{ flex: 1 }}
                  type="number"
                  min={1}
                  placeholder="Số chapter *"
                  value={chapterNum}
                  onChange={(e) => setChapterNum(parseInt(e.target.value) || 1)}
                  disabled={uploadingChapter}
                />

                <input
                  className="input-field"
                  style={{ flex: 2 }}
                  placeholder="Tên chapter (tùy chọn)"
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                  disabled={uploadingChapter}
                />
              </div>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setChapterDragOver(true);
                }}
                onDragLeave={() => setChapterDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setChapterDragOver(false);
                  const files = Array.from(e.dataTransfer.files).filter((f) =>
                    f.type.startsWith("image/")
                  );
                  setChapterPages((prev) => [...prev, ...files].slice(0, 50));
                }}
                onClick={() => !uploadingChapter && document.getElementById("chapter-pages-input")?.click()}
                style={{
                  border: `1px dashed ${
                    chapterDragOver
                      ? "#c9a84c"
                      : chapterPages.length > 0
                      ? "#c9a84c"
                      : "rgba(201,168,76,0.2)"
                  }`,
                  borderRadius: 10,
                  padding: chapterPages.length > 0 ? "16px" : "40px 20px",
                  textAlign: "center",
                  cursor: uploadingChapter ? "not-allowed" : "pointer",
                  transition: "all 0.3s",
                  background: chapterDragOver ? "rgba(201,168,76,0.04)" : "transparent",
                  marginBottom: 16,
                }}
              >
                {chapterPages.length > 0 ? (
                  <div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: "#c9a84c",
                        marginBottom: 10,
                      }}
                    >
                      {chapterPages.length} trang đã chọn
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        justifyContent: "center",
                        marginBottom: 8,
                      }}
                    >
                      {chapterPages.slice(0, 8).map((f, i) => (
                        <div
                          key={i}
                          style={{
                            width: 52,
                            height: 70,
                            borderRadius: 4,
                            overflow: "hidden",
                            border: "1px solid rgba(201,168,76,0.2)",
                          }}
                        >
                          <img
                            src={URL.createObjectURL(f)}
                            alt={`page-${i + 1}`}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      ))}

                      {chapterPages.length > 8 && (
                        <div
                          style={{
                            width: 52,
                            height: 70,
                            borderRadius: 4,
                            background: "rgba(201,168,76,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#c9a84c",
                            fontSize: 12,
                          }}
                        >
                          +{chapterPages.length - 8}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        margin: "0 auto 12px",
                        borderRadius: 999,
                        border: "1px solid rgba(201,168,76,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#c9a84c",
                        fontFamily: "'Cinzel', serif",
                        fontSize: 24,
                      }}
                    >
                      C
                    </div>

                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: "rgba(240,230,208,0.4)",
                        marginBottom: 6,
                      }}
                    >
                      Kéo thả hoặc chọn ảnh chapter
                    </div>

                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: "#c9a84c",
                      }}
                    >
                      JPG · PNG · WEBP — tối đa 50 trang
                    </div>
                  </>
                )}

                <input
                  id="chapter-pages-input"
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []).filter((f) =>
                      f.type.startsWith("image/")
                    );
                    setChapterPages((prev) => [...prev, ...files].slice(0, 50));
                  }}
                />
              </div>

              {chapterPages.length > 0 && !uploadingChapter && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      color: "rgba(240,230,208,0.4)",
                    }}
                  >
                    {chapterPages.length} trang
                  </span>

                  <button
                    onClick={() => setChapterPages([])}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#ff5050",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    Xóa tất cả
                  </button>
                </div>
              )}

              {uploadingChapter && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        color: "rgba(240,230,208,0.5)",
                      }}
                    >
                      Đang tải lên...
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        color: "#c9a84c",
                        fontWeight: 600,
                      }}
                    >
                      {uploadProgress}%
                    </span>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: 6,
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${uploadProgress}%`,
                        background: "linear-gradient(90deg,#c9a84c,#8b6914)",
                        borderRadius: 4,
                        transition: "width 0.3s",
                      }}
                    />
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: 10 }}>
                {!uploadingChapter && (
                  <button
                    onClick={() => setShowAddChapter(null)}
                    style={{
                      flex: 1,
                      padding: 12,
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 8,
                      color: "rgba(240,230,208,0.4)",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    Hủy
                  </button>
                )}

                <button
                  className="gold-btn"
                  onClick={handleAddChapter}
                  disabled={uploadingChapter || chapterPages.length === 0}
                  style={{
                    flex: 2,
                    padding: 12,
                    borderRadius: 8,
                    color: "#080808",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                  }}
                >
                  {uploadingChapter ? `Đang tải... ${uploadProgress}%` : `ĐĂNG CHAPTER ${chapterNum}`}
                </button>
              </div>
            </div>
          </div>
        )}

                {showDeleteConfirm && (
          <div className="modal-overlay">
            <div
              style={{
                background: "#111",
                border: "1px solid rgba(255,60,60,0.2)",
                borderRadius: 16,
                padding: 40,
                maxWidth: 400,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  margin: "0 auto 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,60,60,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ff5050",
                  fontFamily: "'Cinzel', serif",
                  fontSize: 24,
                }}
              >
                !
              </div>

              <h3
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 18,
                  color: "#f0e6d0",
                  marginBottom: 12,
                }}
              >
                Xóa Manga?
              </h3>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "rgba(240,230,208,0.4)",
                  marginBottom: 28,
                  lineHeight: 1.6,
                }}
              >
                Hành động này không thể hoàn tác. Tất cả chapter và dữ liệu sẽ bị xóa vĩnh viễn.
              </p>

              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  style={{
                    flex: 1,
                    padding: 12,
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    color: "rgba(240,230,208,0.5)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Hủy
                </button>

                <button
                  onClick={() => deleteManga(showDeleteConfirm)}
                  style={{
                    flex: 1,
                    padding: 12,
                    background: "rgba(255,60,60,0.15)",
                    border: "1px solid rgba(255,60,60,0.3)",
                    borderRadius: 8,
                    color: "#ff5050",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Xóa Vĩnh Viễn
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  {selectedCharacter && (
    <CharacterDetailModal
      character={selectedCharacter as CharacterProfile}
      onClose={() => setSelectedCharacter(null)}
      onSave={(updated) => {
        setLabCharacters((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c))
        );
        setSelectedCharacter(null);
      }}
      onDelete={(id) => {
        setLabCharacters((prev) => prev.filter((c) => c.id !== id));
        setSelectedCharacter(null);
      }}
    />
  )}
</div>
);
}
