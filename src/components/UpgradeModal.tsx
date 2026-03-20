"use client";

import { X, Check } from "lucide-react";
import Link from "next/link";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.88)",
        zIndex: 200,
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
          padding: "32px 28px",
          maxWidth: 420,
          width: "100%",
          border: "2px solid #c9a84c",
          boxShadow: "0 0 40px rgba(201,168,76,0.2), 0 8px 32px rgba(0,0,0,0.5)",
          position: "relative",
        }}
      >
        {/* Soft Exit - Để sau */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "transparent",
            border: "none",
            color: "rgba(240,230,208,0.4)",
            fontSize: 12,
            fontFamily: "'Inter', sans-serif",
            cursor: "pointer",
            padding: "4px 8px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#f0e6d0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(240,230,208,0.4)";
          }}
        >
          Để sau
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: "#f0e6d0",
              marginBottom: 8,
            }}
          >
            Đừng dừng lại ở đây
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "rgba(240,230,208,0.6)",
              lineHeight: 1.5,
            }}
          >
            Nhân vật của bạn đang chờ được hoàn thiện
          </p>
        </div>

        {/* Pro Card */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: 14,
            padding: "20px",
            marginBottom: 20,
            border: "1px solid rgba(201,168,76,0.3)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #c9a84c, #a08030)",
                color: "#0a0806",
                fontSize: 10,
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: 4,
                letterSpacing: "0.04em",
              }}
            >
              PRO
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: "rgba(240,230,208,0.5)",
              }}
            >
              Recommended
            </span>
          </div>

          <div style={{ marginBottom: 16 }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 28,
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              129.000đ
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "rgba(240,230,208,0.5)",
              }}
            >
              /tháng
            </span>
          </div>

          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              marginBottom: 8,
            }}
          >
            {[
              "MAINGA Lab đầy đủ",
              "Tạo manga bằng AI",
              "Hỗ trợ ưu tiên",
            ].map((feature, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "rgba(240,230,208,0.8)",
                  marginBottom: 8,
                  paddingLeft: 20,
                  position: "relative",
                }}
              >
                <Check
                  size={14}
                  color="#c9a84c"
                  strokeWidth={2.5}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 1,
                  }}
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button - Full Width */}
        <a
          href="/pricing"
          style={{
            display: "block",
            width: "100%",
            padding: "14px 20px",
            background: "linear-gradient(135deg, #c9a84c, #a08030)",
            borderRadius: 10,
            color: "#0a0806",
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            textDecoration: "none",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(201,168,76,0.3)",
            transition: "all 0.2s",
            marginBottom: 16,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(201,168,76,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,168,76,0.3)";
          }}
        >
          Thử 7 ngày - Không cần thẻ →
        </a>

        {/* Secondary Link */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/pricing"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: "rgba(240,230,208,0.5)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#c9a84c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(240,230,208,0.5)";
            }}
          >
            Xem pricing đầy đủ →
          </Link>
        </div>

        {/* Trust Line */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            color: "rgba(240,230,208,0.35)",
            textAlign: "center",
            marginTop: 20,
            marginBottom: 0,
          }}
        >
          Không hài lòng? Hoàn tiền trong 30 ngày.
        </p>
      </div>
    </div>
  );
}
