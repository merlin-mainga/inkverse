"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface QuestData {
  id: string;
  type: string;
  key: string;
  title: string;
  description: string;
  mana: number;
  resetPeriod: string | null;
  bonusUrl: string | null;
  completed: boolean;
  startedAt: string | null;
}

interface QuestsResponse {
  quests: QuestData[];
  todayMana: number;
}

// ── Admin props (optional) ──────────────────────────────────────────────────
interface QuestTabProps {
  isAdmin?: boolean;
}

// ── Helpers ────────────────────────────────────────────────────────────────
function getResetCountdown() {
  const now = new Date();
  const midnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  const diff = midnight.getTime() - now.getTime();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const TYPE_ORDER = ["onboarding", "daily", "weekly", "milestone", "bonus"];
const TYPE_LABELS: Record<string, string> = {
  onboarding: "Bắt đầu",
  daily: "Hàng ngày",
  weekly: "Hàng tuần",
  milestone: "Cột mốc",
  bonus: "Bonus",
};
const TYPE_ICONS: Record<string, string> = {
  onboarding: "🌱",
  daily: "🔄",
  weekly: "📅",
  milestone: "🏆",
  bonus: "⚡",
};

const BONUS_MESSAGES = [
  "Đang kết nối với mạng xã hội...",
  "Đang kiểm tra tài khoản...",
  "Đang xác nhận hành động...",
];

// ── Component ──────────────────────────────────────────────────────────────
export default function QuestTab({ isAdmin = false }: QuestTabProps) {
  const [data, setData] = useState<QuestsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(getResetCountdown());

  // Bonus verification state
  const [bonusModal, setBonusModal] = useState<{ key: string; title: string; mana: number; url: string } | null>(null);
  const [bonusProgress, setBonusProgress] = useState(0);
  const [bonusMessage, setBonusMessage] = useState("");
  const [bonusResult, setBonusResult] = useState<{ mana: number } | null>(null);
  const bonusTimerRef = useRef<NodeJS.Timeout | null>(null);
  const bonusStartTimeRef = useRef<number>(0);

  // Admin state
  const [adminSaving, setAdminSaving] = useState<string | null>(null);

  const fetchQuests = useCallback(async () => {
    try {
      const res = await fetch("/api/quests");
      if (res.ok) setData(await res.json());
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchQuests();
  }, [fetchQuests]);

  // Daily reset countdown
  useEffect(() => {
    const t = setInterval(() => setCountdown(getResetCountdown()), 1000);
    return () => clearInterval(t);
  }, []);

  // ── Manual complete (for quests user tự bấm) ────────────────────────────
  async function handleComplete(questKey: string) {
    const res = await fetch("/api/quests/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questKey }),
    });
    if (res.ok) await fetchQuests();
  }

  // ── Bonus Quest flow ────────────────────────────────────────────────────
  async function handleBonusStart(q: QuestData) {
    if (!q.bonusUrl) return;

    // Open external link
    window.open(q.bonusUrl, "_blank");

    // Call bonus-start API
    const res = await fetch("/api/quests/bonus-start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questKey: q.key }),
    });
    if (!res.ok) {
      const d = await res.json();
      if (d?.error === "Đã hoàn thành quest này") await fetchQuests();
      return;
    }

    // Show verification modal
    setBonusModal({ key: q.key, title: q.title, mana: q.mana, url: q.bonusUrl });
    setBonusProgress(0);
    setBonusResult(null);
    setBonusMessage(BONUS_MESSAGES[0]);
    bonusStartTimeRef.current = Date.now();

    // 60-second progress animation
    if (bonusTimerRef.current) clearInterval(bonusTimerRef.current);
    bonusTimerRef.current = setInterval(async () => {
      const elapsed = Date.now() - bonusStartTimeRef.current;
      const pct = Math.min(100, Math.round((elapsed / 60000) * 100));
      setBonusProgress(pct);
      setBonusMessage(BONUS_MESSAGES[Math.min(2, Math.floor((elapsed / 60000) * 3))]);

      if (elapsed >= 60000) {
        clearInterval(bonusTimerRef.current!);
        // Verify on server
        const vRes = await fetch("/api/quests/bonus-verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questKey: q.key }),
        });
        const vData = await vRes.json();
        if (vRes.ok) {
          setBonusResult({ mana: vData.manaEarned });
          await fetchQuests();
        }
      }
    }, 500);
  }

  function closeBonusModal() {
    if (bonusTimerRef.current) clearInterval(bonusTimerRef.current);
    setBonusModal(null);
    setBonusResult(null);
    setBonusProgress(0);
  }

  // ── Admin toggle isActive ───────────────────────────────────────────────
  async function handleAdminToggle(questKey: string, currentActive: boolean) {
    setAdminSaving(questKey);
    await fetch("/api/quests/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questKey, isActive: !currentActive }),
    });
    await fetchQuests();
    setAdminSaving(null);
  }

  // ── Render ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(240,230,208,0.4)", fontFamily: "'Inter', sans-serif" }}>
        Đang tải nhiệm vụ...
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0", color: "#ff6b6b", fontFamily: "'Inter', sans-serif" }}>
        Không tải được dữ liệu.
      </div>
    );
  }

  const grouped: Record<string, QuestData[]> = {};
  for (const q of data.quests) {
    if (!grouped[q.type]) grouped[q.type] = [];
    grouped[q.type].push(q);
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 0 40px" }}>
      {/* Today's Mana Badge */}
      <div style={{
        background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
        border: "1px solid rgba(201,168,76,0.3)",
        borderRadius: 12,
        padding: "16px 24px",
        marginBottom: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: "#c9a84c", letterSpacing: "0.08em" }}>
            MANA KIẾM HÔM NAY
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 700, color: "#c9a84c" }}>
            +{data.todayMana} <span style={{ fontSize: 14, opacity: 0.7 }}>Mana</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.4)", marginBottom: 4 }}>
            Daily reset trong
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 600, color: "rgba(240,230,208,0.7)", letterSpacing: "0.04em" }}>
            {countdown}
          </div>
        </div>
      </div>

      {/* Quest Groups */}
      {TYPE_ORDER.filter((t) => grouped[t]?.length).map((type) => (
        <div key={type} style={{ marginBottom: 28 }}>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 13,
            color: "#c9a84c",
            letterSpacing: "0.1em",
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <span>{TYPE_ICONS[type]}</span>
            <span>{TYPE_LABELS[type]}</span>
            {type === "daily" && (
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.35)", letterSpacing: 0, marginLeft: 4 }}>
                · reset {countdown}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {grouped[type].map((q) => (
              <QuestCard
                key={q.key}
                quest={q}
                isAdmin={isAdmin}
                adminSaving={adminSaving === q.key}
                onComplete={() => handleComplete(q.key)}
                onBonusStart={() => handleBonusStart(q)}
                onAdminToggle={() => handleAdminToggle(q.key, (data.quests.find(x => x.key === q.key) as any)?.isActive ?? true)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Bonus Verification Modal */}
      {bonusModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget && bonusResult) closeBonusModal(); }}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
            zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(8px)", padding: 20,
          }}
        >
          <div style={{
            background: "linear-gradient(180deg, #1a1600 0%, #111111 100%)",
            borderRadius: 20, padding: "36px 28px", maxWidth: 380, width: "100%",
            border: "2px solid #c9a84c",
            boxShadow: "0 0 40px rgba(201,168,76,0.2)",
            textAlign: "center",
          }}>
            {bonusResult ? (
              /* Success state */
              <>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: "#c9a84c", marginBottom: 8 }}>
                  Hoàn thành!
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, fontWeight: 700, color: "#c9a84c", marginBottom: 20 }}>
                  +{bonusResult.mana} Mana
                </div>
                <button onClick={closeBonusModal} style={{
                  padding: "12px 32px", borderRadius: 10,
                  background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
                  border: "none", color: "#080808",
                  fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer",
                }}>
                  Đóng
                </button>
              </>
            ) : (
              /* Verifying state */
              <>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 15, color: "#c9a84c", marginBottom: 8 }}>
                  Đang xác minh...
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.6)", marginBottom: 20 }}>
                  {bonusMessage}
                </div>
                {/* Progress bar */}
                <div style={{ height: 6, background: "rgba(201,168,76,0.15)", borderRadius: 999, overflow: "hidden", marginBottom: 12 }}>
                  <div style={{
                    height: "100%", width: `${bonusProgress}%`,
                    background: "linear-gradient(90deg, #c9a84c, #e8c96a)",
                    transition: "width 0.5s linear", borderRadius: 999,
                  }} />
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(240,230,208,0.35)" }}>
                  {bonusProgress}% · {Math.ceil((100 - bonusProgress) * 0.6)}s còn lại
                </div>
                <div style={{ marginTop: 20, fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(240,230,208,0.5)" }}>
                  Phần thưởng: <span style={{ color: "#c9a84c", fontWeight: 700 }}>+{bonusModal.mana} Mana</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Quest Card ─────────────────────────────────────────────────────────────
function QuestCard({
  quest,
  isAdmin,
  adminSaving,
  onComplete,
  onBonusStart,
  onAdminToggle,
}: {
  quest: QuestData;
  isAdmin: boolean;
  adminSaving: boolean;
  onComplete: () => void;
  onBonusStart: () => void;
  onAdminToggle: () => void;
}) {
  const isBonus = quest.type === "bonus";
  const isCompleted = quest.completed;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      background: isCompleted ? "rgba(201,168,76,0.05)" : "rgba(240,230,208,0.04)",
      border: `1px solid ${isCompleted ? "rgba(201,168,76,0.25)" : "rgba(240,230,208,0.08)"}`,
      borderRadius: 12,
      padding: "14px 18px",
      opacity: isCompleted ? 0.7 : 1,
    }}>
      {/* Mana Badge */}
      <div style={{
        minWidth: 52, textAlign: "center",
        fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700,
        color: isCompleted ? "rgba(201,168,76,0.5)" : "#c9a84c",
      }}>
        +{quest.mana}
        <div style={{ fontSize: 10, fontWeight: 400, color: "rgba(240,230,208,0.3)" }}>Mana</div>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
          color: isCompleted ? "rgba(240,230,208,0.5)" : "rgba(240,230,208,0.9)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {quest.title}
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif", fontSize: 11,
          color: "rgba(240,230,208,0.35)", marginTop: 2,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {quest.description}
        </div>
      </div>

      {/* Action */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {isAdmin && (
          <button
            onClick={onAdminToggle}
            disabled={adminSaving}
            style={{
              padding: "5px 10px", borderRadius: 6,
              background: "rgba(240,230,208,0.08)", border: "1px solid rgba(240,230,208,0.15)",
              color: "rgba(240,230,208,0.6)", fontFamily: "'Inter', sans-serif", fontSize: 11, cursor: "pointer",
            }}
          >
            {adminSaving ? "..." : "Toggle"}
          </button>
        )}

        {isCompleted ? (
          <div style={{
            padding: "6px 14px", borderRadius: 8,
            background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)",
            fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#c9a84c",
          }}>
            ✅ Đã xong
          </div>
        ) : isBonus ? (
          <button onClick={onBonusStart} style={{
            padding: "7px 14px", borderRadius: 8,
            background: "linear-gradient(135deg, rgba(201,168,76,0.9), rgba(232,201,106,0.9))",
            border: "none", color: "#080808",
            fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer",
            whiteSpace: "nowrap",
          }}>
            Bắt đầu ⚡
          </button>
        ) : (
          <button onClick={onComplete} style={{
            padding: "7px 14px", borderRadius: 8,
            background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)",
            color: "#c9a84c",
            fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer",
            whiteSpace: "nowrap",
          }}>
            Hoàn thành
          </button>
        )}
      </div>
    </div>
  );
}
