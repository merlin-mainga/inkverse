"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface AuthorGateModalProps {
  open: boolean;
  onClose: () => void;
  onSnooze: () => void; // close + show again after 60s
  onBecameAuthor: () => void; // called after successful role upgrade
}

export default function AuthorGateModal({
  open,
  onClose,
  onSnooze,
  onBecameAuthor,
}: AuthorGateModalProps) {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const role = (session?.user as any)?.role;
  const isAuthor = role === "author" || role === "admin";

  async function handleStart() {
    if (!session?.user) {
      router.push("/login");
      return;
    }

    if (isAuthor) {
      onClose();
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/become-author", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Có lỗi xảy ra. Vui lòng thử lại.");
        setLoading(false);
        return;
      }
      // Refresh session so role updates client-side
      await updateSession();
      onBecameAuthor();
      onClose();
    } catch {
      setError("Lỗi kết nối. Vui lòng thử lại.");
    }
    setLoading(false);
  }

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onSnooze(); }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.88)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "linear-gradient(180deg, #1a1600 0%, #111111 100%)",
          borderRadius: 20,
          padding: "40px 32px 32px",
          maxWidth: 420,
          width: "100%",
          border: "2px solid #c9a84c",
          boxShadow: "0 0 40px rgba(201,168,76,0.2), 0 8px 32px rgba(0,0,0,0.5)",
          position: "relative",
          textAlign: "center",
        }}
      >
        {/* Decorative top glow */}
        <div
          style={{
            position: "absolute",
            top: -1,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 2,
            background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
          }}
        />

        {/* Icon */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(201,168,76,0.12)",
            border: "1.5px solid rgba(201,168,76,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: 24,
          }}
        >
          ✦
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 18,
            fontWeight: 700,
            color: "#c9a84c",
            letterSpacing: "0.04em",
            marginBottom: 14,
            lineHeight: 1.4,
          }}
        >
          Bạn muốn viết nên câu chuyện của mình?
        </div>

        {/* Body */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: "rgba(240,230,208,0.75)",
            lineHeight: 1.65,
            marginBottom: 28,
          }}
        >
          Hàng nghìn tác giả đang dùng MAINGA để tạo manga mà không cần biết vẽ.
          Bắt đầu miễn phí.
        </div>

        {error && (
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: "#ff6b6b",
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        {/* Primary CTA */}
        <button
          onClick={handleStart}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px 24px",
            borderRadius: 10,
            background: loading
              ? "rgba(201,168,76,0.5)"
              : "linear-gradient(135deg, #c9a84c 0%, #e8c96a 100%)",
            border: "none",
            color: "#080808",
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: 12,
            letterSpacing: "0.02em",
          }}
        >
          {loading ? "Đang xử lý..." : "Bắt Đầu Sáng Tác →"}
        </button>

        {/* Secondary CTA */}
        <button
          onClick={onSnooze}
          style={{
            width: "100%",
            padding: "11px 24px",
            borderRadius: 10,
            background: "transparent",
            border: "1px solid rgba(201,168,76,0.3)",
            color: "rgba(240,230,208,0.55)",
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Xem thêm
        </button>
      </div>
    </div>
  );
}
