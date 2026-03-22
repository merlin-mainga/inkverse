"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";

interface QuestData {
  id: string;
  type: string;
  key: string;
  title: string;
  description: string;
  mana: number;
  resetPeriod: string | null;
  bonusUrl: string | null;
  isActive: boolean;
  completed: boolean;
  startedAt: string | null;
}

interface QuestsResponse {
  quests: QuestData[];
  todayMana: number;
  totalMana?: number;
}

const BONUS_MESSAGES = [
  "Đang kết nối với mạng xã hội...",
  "Đang kiểm tra tài khoản...",
  "Đang xác nhận hành động...",
];

function getResetCountdown() {
  const now = new Date();
  const midnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  const diff = midnight.getTime() - now.getTime();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const GROUPS: { key: string; label: string; types: string[]; hasReset?: "daily" | "weekly" }[] = [
  { key: "daily",     label: "Hàng Ngày",     types: ["daily"],       hasReset: "daily" },
  { key: "start",     label: "Bắt Đầu",       types: ["onboarding"] },
  { key: "weekly",    label: "Nhiệm Vụ Tuần", types: ["weekly"],      hasReset: "weekly" },
  { key: "milestone", label: "Dấu Mốc",       types: ["milestone"] },
  { key: "bonus",     label: "Kiếm Thêm",     types: ["bonus"] },
];

export default function ManaPanel() {
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";

  const [data, setData] = useState<QuestsResponse | null>(null);
  const [currentMana, setCurrentMana] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(getResetCountdown());

  // which groups are expanded
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ daily: true });
  // which groups show full list (beyond 2 items)
  const [showAll, setShowAll] = useState<Record<string, boolean>>({});

  // Bonus flow
  const [bonusModal, setBonusModal] = useState<{ key: string; title: string; mana: number; url: string } | null>(null);
  const [bonusProgress, setBonusProgress] = useState(0);
  const [bonusMessage, setBonusMessage] = useState("");
  const [bonusResult, setBonusResult] = useState<{ mana: number } | null>(null);
  const bonusTimerRef = useRef<NodeJS.Timeout | null>(null);
  const bonusStartTimeRef = useRef<number>(0);

  const [adminSaving, setAdminSaving] = useState<string | null>(null);

  const fetchQuests = useCallback(async () => {
    try {
      const res = await fetch("/api/quests");
      if (res.ok) setData(await res.json());
    } catch {}
    setLoading(false);
  }, []);

  const fetchMana = useCallback(async () => {
    try {
      const res = await fetch("/api/mana/status");
      if (res.ok) {
        const d = await res.json();
        setCurrentMana(d.mana ?? null);
      }
    } catch {}
  }, []);

  useEffect(() => { fetchQuests(); fetchMana(); }, [fetchQuests, fetchMana]);

  useEffect(() => {
    const t = setInterval(() => setCountdown(getResetCountdown()), 1000);
    return () => clearInterval(t);
  }, []);

  function toggleGroup(key: string) {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function handleComplete(questKey: string) {
    const res = await fetch("/api/quests/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questKey }),
    });
    if (res.ok) { await fetchQuests(); fetchMana(); }
  }

  async function handleBonusStart(q: QuestData) {
    if (!q.bonusUrl) return;
    window.open(q.bonusUrl, "_blank");
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
    setBonusModal({ key: q.key, title: q.title, mana: q.mana, url: q.bonusUrl });
    setBonusProgress(0);
    setBonusResult(null);
    setBonusMessage(BONUS_MESSAGES[0]);
    bonusStartTimeRef.current = Date.now();
    if (bonusTimerRef.current) clearInterval(bonusTimerRef.current);
    bonusTimerRef.current = setInterval(async () => {
      const elapsed = Date.now() - bonusStartTimeRef.current;
      const pct = Math.min(100, Math.round((elapsed / 60000) * 100));
      setBonusProgress(pct);
      setBonusMessage(BONUS_MESSAGES[Math.min(2, Math.floor((elapsed / 60000) * 3))]);
      if (elapsed >= 60000) {
        clearInterval(bonusTimerRef.current!);
        const vRes = await fetch("/api/quests/bonus-verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questKey: q.key }),
        });
        const vData = await vRes.json();
        if (vRes.ok) { setBonusResult({ mana: vData.manaEarned }); await fetchQuests(); fetchMana(); }
      }
    }, 500);
  }

  function closeBonusModal() {
    if (bonusTimerRef.current) clearInterval(bonusTimerRef.current);
    setBonusModal(null);
    setBonusResult(null);
    setBonusProgress(0);
  }

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

  if (loading) {
    return (
      <div style={{
        position: "fixed",
        right: 16,
        top: 80,
        width: 260,
        zIndex: 40,
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(201,168,76,0.1)",
        borderRadius: 18,
        padding: 20,
        textAlign: "center",
        color: "rgba(240,230,208,0.3)",
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
      }}>
        Đang tải...
      </div>
    );
  }

  if (!data) return null;

  const questMap: Record<string, QuestData[]> = {};
  for (const q of data.quests) {
    if (!questMap[q.type]) questMap[q.type] = [];
    questMap[q.type].push(q);
  }

  const totalMana = data.totalMana ?? 0;

  return (
    <>
      <div style={{
        position: "fixed",
        right: 16,
        top: 80,
        width: 260,
        maxHeight: "calc(100vh - 100px)",
        overflowY: "auto",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}>
        {/* Header card */}
        <div style={{
          background: "linear-gradient(135deg, rgba(201,168,76,0.14) 0%, rgba(139,105,20,0.10) 100%)",
          border: "1px solid rgba(201,168,76,0.22)",
          borderRadius: 16,
          padding: "16px 20px",
          marginBottom: 10,
        }}>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 10,
            letterSpacing: "0.22em",
            color: "#c9a84c",
            textTransform: "uppercase",
            marginBottom: 10,
          }}>
            ⚡ Kiếm Mana
          </div>

          {/* Total mana */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginBottom: 6 }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: "#c9a84c",
              lineHeight: 1,
            }}>
              {currentMana !== null ? currentMana.toLocaleString() : "—"}
            </span>
            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 11,
              color: "rgba(201,168,76,0.6)",
            }}>
              ✦ Mana
            </span>
          </div>

          {/* Today earned + reset */}
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            color: "rgba(240,230,208,0.4)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
            <span style={{ color: data.todayMana > 0 ? "#a8d88a" : "rgba(240,230,208,0.35)" }}>
              +{data.todayMana} hôm nay
            </span>
            <span style={{ color: "rgba(240,230,208,0.2)" }}>·</span>
            <span>reset {countdown}</span>
          </div>
        </div>

        {/* Quest groups */}
        <div style={{
          background: "rgba(255,255,255,0.022)",
          border: "1px solid rgba(201,168,76,0.09)",
          borderRadius: 16,
          overflow: "hidden",
        }}>
          {GROUPS.map((group, gi) => {
            const quests = group.types.flatMap((t) => questMap[t] ?? [])
              .filter((q) => {
                // For bonus: only show active ones
                if (q.type === "bonus" && !q.isActive) return false;
                return true;
              });

            if (quests.length === 0) return null;

            const isOpen = !!expanded[group.key];
            const visibleQuests = showAll[group.key] ? quests : quests.slice(0, 2);
            const hiddenCount = quests.length - 2;

            return (
              <div key={group.key} style={{ borderBottom: gi < GROUPS.length - 1 ? "1px solid rgba(240,230,208,0.06)" : "none" }}>
                {/* Group header */}
                <button
                  onClick={() => toggleGroup(group.key)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "13px 16px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(240,230,208,0.8)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: isOpen ? "#c9a84c" : "rgba(240,230,208,0.65)",
                      letterSpacing: "0.02em",
                    }}>
                      {group.label}
                    </span>
                    {group.hasReset && isOpen && (
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 10,
                        color: "rgba(240,230,208,0.28)",
                      }}>
                        {countdown}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10,
                      color: "rgba(240,230,208,0.28)",
                    }}>
                      {quests.filter((q) => q.completed).length}/{quests.length}
                    </span>
                    <span style={{
                      fontSize: 9,
                      color: isOpen ? "#c9a84c" : "rgba(240,230,208,0.3)",
                      transition: "transform 0.2s",
                      display: "inline-block",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}>
                      ▼
                    </span>
                  </div>
                </button>

                {/* Quest list */}
                {isOpen && (
                  <div style={{ padding: "0 10px 10px" }}>
                    {visibleQuests.map((q) => (
                      <QuestRow
                        key={q.key}
                        quest={q}
                        isAdmin={isAdmin}
                        adminSaving={adminSaving === q.key}
                        onComplete={() => handleComplete(q.key)}
                        onBonusStart={() => handleBonusStart(q)}
                        onAdminToggle={() => handleAdminToggle(q.key, q.isActive)}
                      />
                    ))}

                    {!showAll[group.key] && hiddenCount > 0 && (
                      <button
                        onClick={() => setShowAll((p) => ({ ...p, [group.key]: true }))}
                        style={{
                          width: "100%",
                          padding: "7px 12px",
                          background: "transparent",
                          border: "1px dashed rgba(201,168,76,0.2)",
                          borderRadius: 8,
                          color: "rgba(201,168,76,0.6)",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 11,
                          cursor: "pointer",
                          marginTop: 4,
                        }}
                      >
                        + Xem thêm {hiddenCount} nhiệm vụ
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bonus verification modal */}
      {bonusModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget && bonusResult) closeBonusModal(); }}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.88)",
            zIndex: 400,
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(8px)", padding: 20,
          }}
        >
          <div style={{
            background: "linear-gradient(180deg, #1a1600 0%, #111111 100%)",
            borderRadius: 20, padding: "36px 28px", maxWidth: 360, width: "100%",
            border: "2px solid #c9a84c",
            boxShadow: "0 0 40px rgba(201,168,76,0.2)",
            textAlign: "center",
          }}>
            {bonusResult ? (
              <>
                <div style={{ fontSize: 44, marginBottom: 12 }}>🎉</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 17, color: "#c9a84c", marginBottom: 8 }}>
                  Hoàn thành!
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 26, fontWeight: 700, color: "#c9a84c", marginBottom: 20 }}>
                  +{bonusResult.mana} Mana
                </div>
                <button onClick={closeBonusModal} style={{
                  padding: "11px 28px", borderRadius: 10,
                  background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
                  border: "none", color: "#080808",
                  fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer",
                }}>
                  Đóng
                </button>
              </>
            ) : (
              <>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 14, color: "#c9a84c", marginBottom: 8 }}>
                  Đang xác minh...
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(240,230,208,0.55)", marginBottom: 18 }}>
                  {bonusMessage}
                </div>
                <div style={{ height: 5, background: "rgba(201,168,76,0.15)", borderRadius: 999, overflow: "hidden", marginBottom: 10 }}>
                  <div style={{
                    height: "100%", width: `${bonusProgress}%`,
                    background: "linear-gradient(90deg, #c9a84c, #e8c96a)",
                    transition: "width 0.5s linear", borderRadius: 999,
                  }} />
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(240,230,208,0.3)" }}>
                  {bonusProgress}% · {Math.ceil((100 - bonusProgress) * 0.6)}s còn lại
                </div>
                <div style={{ marginTop: 16, fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(240,230,208,0.45)" }}>
                  Phần thưởng: <span style={{ color: "#c9a84c", fontWeight: 700 }}>+{bonusModal.mana} Mana</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function QuestRow({
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
  const done = quest.completed;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "9px 10px",
      borderRadius: 10,
      background: done ? "rgba(201,168,76,0.04)" : "rgba(255,255,255,0.03)",
      border: `1px solid ${done ? "rgba(201,168,76,0.15)" : "rgba(240,230,208,0.06)"}`,
      marginBottom: 5,
      opacity: done ? 0.72 : 1,
    }}>
      {/* Mana badge */}
      <div style={{
        minWidth: 38, textAlign: "center",
        fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700,
        color: done ? "rgba(201,168,76,0.45)" : "#c9a84c",
      }}>
        +{quest.mana}
        <div style={{ fontSize: 9, fontWeight: 400, color: "rgba(240,230,208,0.28)", lineHeight: 1 }}>M</div>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
          color: done ? "rgba(240,230,208,0.45)" : "rgba(240,230,208,0.88)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {quest.title}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
        {isAdmin && (
          <button
            onClick={onAdminToggle}
            disabled={adminSaving}
            style={{
              padding: "3px 7px", borderRadius: 5,
              background: "rgba(240,230,208,0.07)", border: "1px solid rgba(240,230,208,0.12)",
              color: "rgba(240,230,208,0.5)", fontFamily: "'Inter', sans-serif", fontSize: 9, cursor: "pointer",
            }}
          >
            {adminSaving ? "..." : quest.isActive ? "on" : "off"}
          </button>
        )}

        {done ? (
          <div style={{
            padding: "4px 8px", borderRadius: 6,
            background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.18)",
            fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#c9a84c",
            whiteSpace: "nowrap",
          }}>
            ✅
          </div>
        ) : isBonus ? (
          <button onClick={onBonusStart} style={{
            padding: "5px 10px", borderRadius: 7,
            background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
            border: "none", color: "#080808",
            fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, cursor: "pointer",
            whiteSpace: "nowrap",
          }}>
            ⚡ Nhận
          </button>
        ) : (
          <button onClick={onComplete} style={{
            padding: "5px 10px", borderRadius: 7,
            background: "rgba(201,168,76,0.14)", border: "1px solid rgba(201,168,76,0.28)",
            color: "#c9a84c",
            fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, cursor: "pointer",
            whiteSpace: "nowrap",
          }}>
            Nhận
          </button>
        )}
      </div>
    </div>
  );
}
