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

function PlatformIcon({ url, size = 28 }: { url: string | null; size?: number }) {
  const s = { width: size, height: size, flexShrink: 0 } as React.CSSProperties;

  if (url?.includes("tiktok.com")) return (
    <svg style={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.79 1.54V6.85a4.85 4.85 0 01-1.02-.16z" fill="#fff"/>
    </svg>
  );

  if (url?.includes("youtube.com") || url?.includes("youtu.be")) return (
    <svg style={s} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 002.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81z" fill="#FF0000"/>
      <path d="M9.75 15.02V8.98L15.5 12l-5.75 3.02z" fill="#fff"/>
    </svg>
  );

  if (url?.includes("facebook.com") || url?.includes("fb.com")) return (
    <svg style={s} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" fill="#1877F2"/>
      <path d="M16.671 15.563l.532-3.49h-3.328V9.804c0-.956.465-1.887 1.956-1.887h1.513V4.948s-1.374-.235-2.686-.235c-2.741 0-4.533 1.672-4.533 4.697v2.663H7.078v3.49h3.047V24a12.12 12.12 0 003.75 0v-8.437h2.796z" fill="#fff"/>
    </svg>
  );

  if (url?.includes("instagram.com")) return (
    <svg style={s} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ig-g1" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497"/>
          <stop offset="10%" stopColor="#fdf497"/>
          <stop offset="50%" stopColor="#fd5949"/>
          <stop offset="68%" stopColor="#d6249f"/>
          <stop offset="100%" stopColor="#285AEB"/>
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-g1)"/>
      <circle cx="12" cy="12" r="4.5" fill="none" stroke="#fff" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="#fff"/>
    </svg>
  );

  if (url?.includes("twitter.com") || url?.includes("x.com")) return (
    <svg style={s} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#000"/>
      <path d="M13.14 10.94L18.96 4h-1.38l-5.06 5.88L8.24 4H4l6.1 8.88L4 20h1.38l5.33-6.2L15.76 20H20l-6.86-9.06zm-1.89 2.2l-.62-.88-4.92-7.04h2.12l3.97 5.68.62.88 5.16 7.38h-2.12l-4.21-6.02z" fill="#fff"/>
    </svg>
  );

  return (
    <svg style={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5"/>
      <path d="M12 7v5l3 3" stroke="rgba(201,168,76,0.7)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

const GROUPS: { key: string; label: string; types: string[]; hasReset?: "daily" | "weekly" }[] = [
  { key: "daily",     label: "Hàng Ngày",     types: ["daily"],       hasReset: "daily" },
  { key: "start",     label: "Bắt Đầu",       types: ["onboarding"] },
  { key: "weekly",    label: "Nhiệm Vụ Tuần", types: ["weekly"],      hasReset: "weekly" },
  { key: "milestone", label: "Dấu Mốc",       types: ["milestone"] },
];

export default function ManaPanel() {
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";

  const [data, setData] = useState<QuestsResponse | null>(null);
  const [currentMana, setCurrentMana] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(getResetCountdown());

  const [expanded, setExpanded] = useState<Record<string, boolean>>({ daily: true });
  const [showAll, setShowAll] = useState<Record<string, boolean>>({});

  // Bonus flow
  const [bonusModal, setBonusModal] = useState<{ key: string; title: string; mana: number; url: string } | null>(null);
  const [bonusProgress, setBonusProgress] = useState(0);
  const [bonusMessage, setBonusMessage] = useState("");
  const [bonusResult, setBonusResult] = useState<{ mana: number } | null>(null);
  const [bonusError, setBonusError] = useState<string | null>(null);
  const bonusTimerRef = useRef<NodeJS.Timeout | null>(null);
  const bonusStartTimeRef = useRef<number>(0);

  // Admin
  const [adminSaving, setAdminSaving] = useState<string | null>(null);
  const [adminUrlEdits, setAdminUrlEdits] = useState<Record<string, string>>({});
  const [adminUrlSaving, setAdminUrlSaving] = useState<string | null>(null);

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
    setBonusError(null);
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
        if (vRes.ok) {
          setBonusResult({ mana: vData.manaEarned });
          await fetchQuests();
          fetchMana();
        } else {
          setBonusError(vData?.error ?? "Xác minh thất bại. Vui lòng thử lại.");
        }
      }
    }, 500);
  }

  function closeBonusModal() {
    if (bonusTimerRef.current) clearInterval(bonusTimerRef.current);
    setBonusModal(null);
    setBonusResult(null);
    setBonusError(null);
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

  async function handleAdminUrlSave(questKey: string) {
    const url = adminUrlEdits[questKey];
    if (!url) return;
    setAdminUrlSaving(questKey);
    await fetch("/api/quests/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questKey, bonusUrl: url }),
    });
    await fetchQuests();
    setAdminUrlSaving(null);
    setAdminUrlEdits((prev) => { const n = { ...prev }; delete n[questKey]; return n; });
  }

  if (loading) {
    return (
      <div style={{
        position: "fixed",
        right: 24,
        top: 72,
        width: 280,
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

  const allBonusQuests = questMap["bonus"] ?? [];
  const visibleBonusQuests = isAdmin ? allBonusQuests : allBonusQuests.filter((q) => q.isActive);
  const showBonusSection = isAdmin || visibleBonusQuests.length > 0;

  return (
    <>
      <div style={{
        position: "fixed",
        right: 24,
        top: 72,
        width: 280,
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

        {/* Regular quest groups */}
        <div style={{
          background: "rgba(255,255,255,0.022)",
          border: "1px solid rgba(201,168,76,0.09)",
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: showBonusSection ? 10 : 0,
        }}>
          {GROUPS.map((group, gi) => {
            const quests = group.types.flatMap((t) => questMap[t] ?? []);
            if (quests.length === 0) return null;

            const isOpen = !!expanded[group.key];
            const visibleQuests = showAll[group.key] ? quests : quests.slice(0, 2);
            const hiddenCount = quests.length - 2;

            return (
              <div key={group.key} style={{ borderBottom: gi < GROUPS.length - 1 ? "1px solid rgba(240,230,208,0.06)" : "none" }}>
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

        {/* Kiếm Thêm section */}
        {showBonusSection && (
          <div style={{
            background: "rgba(255,255,255,0.022)",
            border: "1px solid rgba(201,168,76,0.09)",
            borderRadius: 16,
            overflow: "hidden",
          }}>
            {/* Section header */}
            <div style={{
              padding: "13px 16px 10px",
              borderBottom: "1px solid rgba(240,230,208,0.06)",
            }}>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: "#c9a84c",
                letterSpacing: "0.02em",
              }}>
                ⚡ Kiếm Thêm
              </div>
              {isAdmin && (
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10,
                  color: "rgba(240,230,208,0.3)",
                  marginTop: 2,
                }}>
                  Admin — {allBonusQuests.filter((q) => q.isActive).length}/{allBonusQuests.length} active
                </div>
              )}
            </div>

            {/* Bonus quest cards */}
            <div style={{ padding: "8px 10px 10px" }}>
              {visibleBonusQuests.length === 0 && isAdmin && (
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: "rgba(240,230,208,0.3)",
                  textAlign: "center",
                  padding: "12px 0",
                }}>
                  Chưa có bonus quest nào
                </div>
              )}

              {visibleBonusQuests.map((q) => {
                const urlEditVal = adminUrlEdits[q.key] ?? q.bonusUrl ?? "";
                const isEditing = q.key in adminUrlEdits;

                return (
                  <div key={q.key} style={{
                    borderRadius: 12,
                    background: q.isActive
                      ? "linear-gradient(135deg, rgba(201,168,76,0.07), rgba(201,168,76,0.03))"
                      : "rgba(255,255,255,0.02)",
                    border: `1px solid ${q.isActive ? "rgba(201,168,76,0.18)" : "rgba(240,230,208,0.06)"}`,
                    padding: "12px 12px 10px",
                    marginBottom: 6,
                    opacity: isAdmin && !q.isActive ? 0.6 : 1,
                  }}>
                    {/* Top row: icon + title + mana */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <PlatformIcon url={q.bonusUrl} size={28} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 12,
                          fontWeight: 600,
                          color: "rgba(240,230,208,0.9)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                          {q.title}
                        </div>
                        <div style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 11,
                          color: "#c9a84c",
                          fontWeight: 700,
                          marginTop: 1,
                        }}>
                          +{q.mana} Mana
                        </div>
                      </div>
                    </div>

                    {/* Action button */}
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      {q.completed ? (
                        <div style={{
                          flex: 1,
                          padding: "7px 10px",
                          borderRadius: 8,
                          background: "rgba(201,168,76,0.08)",
                          border: "1px solid rgba(201,168,76,0.18)",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 11,
                          color: "#c9a84c",
                          textAlign: "center",
                        }}>
                          ✅ Đã xong
                        </div>
                      ) : (
                        <button
                          onClick={() => handleBonusStart(q)}
                          disabled={!q.bonusUrl}
                          style={{
                            flex: 1,
                            padding: "7px 10px",
                            borderRadius: 8,
                            background: q.bonusUrl
                              ? "linear-gradient(135deg, #c9a84c, #e8c96a)"
                              : "rgba(240,230,208,0.08)",
                            border: "none",
                            color: q.bonusUrl ? "#080808" : "rgba(240,230,208,0.3)",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: q.bonusUrl ? "pointer" : "default",
                          }}
                        >
                          ⚡ Thực Hiện
                        </button>
                      )}

                      {/* Admin toggle */}
                      {isAdmin && (
                        <button
                          onClick={() => handleAdminToggle(q.key, q.isActive)}
                          disabled={adminSaving === q.key}
                          style={{
                            padding: "6px 10px",
                            borderRadius: 7,
                            background: q.isActive ? "rgba(168,216,138,0.15)" : "rgba(240,230,208,0.07)",
                            border: `1px solid ${q.isActive ? "rgba(168,216,138,0.3)" : "rgba(240,230,208,0.12)"}`,
                            color: q.isActive ? "#a8d88a" : "rgba(240,230,208,0.4)",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 10,
                            cursor: "pointer",
                            flexShrink: 0,
                          }}
                        >
                          {adminSaving === q.key ? "..." : q.isActive ? "on" : "off"}
                        </button>
                      )}
                    </div>

                    {/* Admin URL editor */}
                    {isAdmin && (
                      <div style={{ marginTop: 8 }}>
                        <input
                          value={urlEditVal}
                          onChange={(e) => setAdminUrlEdits((prev) => ({ ...prev, [q.key]: e.target.value }))}
                          placeholder="https://..."
                          style={{
                            width: "100%",
                            padding: "5px 8px",
                            borderRadius: 6,
                            background: "rgba(255,255,255,0.06)",
                            border: `1px solid ${isEditing ? "rgba(201,168,76,0.4)" : "rgba(240,230,208,0.1)"}`,
                            color: "rgba(240,230,208,0.8)",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 10,
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                        {isEditing && (
                          <button
                            onClick={() => handleAdminUrlSave(q.key)}
                            disabled={adminUrlSaving === q.key}
                            style={{
                              marginTop: 4,
                              width: "100%",
                              padding: "4px 8px",
                              borderRadius: 6,
                              background: "rgba(201,168,76,0.2)",
                              border: "1px solid rgba(201,168,76,0.35)",
                              color: "#c9a84c",
                              fontFamily: "'Inter', sans-serif",
                              fontSize: 10,
                              cursor: "pointer",
                            }}
                          >
                            {adminUrlSaving === q.key ? "Đang lưu..." : "💾 Lưu URL"}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bonus verification modal */}
      {bonusModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget && (bonusResult || bonusError)) closeBonusModal(); }}
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
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 26, fontWeight: 700, color: "#c9a84c", marginBottom: 4 }}>
                  +{bonusResult.mana} Mana
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#a8d88a", marginBottom: 20 }}>
                  ✅ Xác minh thành công
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
            ) : bonusError ? (
              <>
                <div style={{ fontSize: 44, marginBottom: 12 }}>❌</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 16, color: "#c9a84c", marginBottom: 10 }}>
                  Xác minh thất bại
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(240,230,208,0.55)", marginBottom: 20 }}>
                  {bonusError}
                </div>
                <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                  <button onClick={closeBonusModal} style={{
                    padding: "10px 20px", borderRadius: 10,
                    background: "rgba(240,230,208,0.08)", border: "1px solid rgba(240,230,208,0.15)",
                    color: "rgba(240,230,208,0.6)",
                    fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: "pointer",
                  }}>
                    Đóng
                  </button>
                  <button
                    onClick={() => {
                      closeBonusModal();
                      const q = data?.quests.find((q) => q.key === bonusModal.key);
                      if (q) handleBonusStart(q);
                    }}
                    style={{
                      padding: "10px 20px", borderRadius: 10,
                      background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
                      border: "none", color: "#080808",
                      fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer",
                    }}
                  >
                    Thử lại
                  </button>
                </div>
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
      <div style={{
        minWidth: 38, textAlign: "center",
        fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700,
        color: done ? "rgba(201,168,76,0.45)" : "#c9a84c",
      }}>
        +{quest.mana}
        <div style={{ fontSize: 9, fontWeight: 400, color: "rgba(240,230,208,0.28)", lineHeight: 1 }}>M</div>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
          color: done ? "rgba(240,230,208,0.45)" : "rgba(240,230,208,0.88)",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {quest.title}
        </div>
      </div>

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
            ⚡ Thực Hiện
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
