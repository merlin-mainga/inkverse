"use client";

import { X, Check } from "lucide-react";

type PricingTier = {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
};

const tiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: 49000,
    features: [
      "15 manga mỗi tháng",
      "Tạo manga bằng AI",
      "Chất lượng ảnh cao",
      "MAINGA Lab cơ bản",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 129000,
    popular: true,
    features: [
      "60 manga mỗi tháng",
      "Tạo manga bằng AI",
      "Chất lượng 4K",
      "MAINGA Lab đầy đủ",
      "API access",
      "Hỗ trợ 24/7",
    ],
  },
  {
    id: "max",
    name: "Max",
    price: 259000,
    features: [
      "Không giới hạn manga",
      "Tất cả tính năng Pro",
      "API access không giới hạn",
      "Team collaboration",
      "Hỗ trợ ưu tiên cao cấp",
    ],
  },
];

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="upgrade-modal-overlay"
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
          background: "linear-gradient(180deg, #14120c 0%, #0c0a06 100%)",
          borderRadius: 20,
          padding: "32px 28px",
          maxWidth: 800,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          border: "1px solid rgba(201,168,76,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,168,76,0.08)",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(240,230,208,0.6)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(201,168,76,0.1)";
            e.currentTarget.style.color = "#c9a84c";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "rgba(240,230,208,0.6)";
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              fontSize: 32,
              marginBottom: 16,
            }}
          >
            🎨
          </div>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: "#f0e6d0",
              marginBottom: 8,
            }}
          >
            Ồ, đây là tính năng dành cho tác giả trả phí
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "rgba(240,230,208,0.55)",
              lineHeight: 1.6,
            }}
          >
            Nâng cấp gói dịch vụ để mở khóa Mainga Lab và tất cả tính năng AI
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 24,
          }}
        >
          {tiers.map((tier) => (
            <div
              key={tier.id}
              style={{
                background: tier.popular
                  ? "linear-gradient(180deg, #1a1600 0%, #111111 100%)"
                  : "rgba(255,255,255,0.015)",
                border: tier.popular
                  ? "2px solid #c9a84c"
                  : "1px solid rgba(201,168,76,0.1)",
                borderRadius: 14,
                padding: tier.popular ? "24px 18px" : "20px 18px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {tier.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: -10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #c9a84c, #a08030)",
                    color: "#0a0806",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 4,
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                  }}
                >
                  ⭐ PHỔ BIẾN NHẤT
                </div>
              )}

              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: tier.popular ? "#c9a84c" : "#f0e6d0",
                  marginBottom: 8,
                  letterSpacing: "0.04em",
                  marginTop: tier.popular ? 4 : 0,
                }}
              >
                {tier.name}
              </div>

              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: 4,
                }}
              >
                {formatPrice(tier.price)}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "rgba(240,230,208,0.4)",
                  marginBottom: 16,
                }}
              >
                /tháng
              </div>

              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  flex: 1,
                  marginBottom: 16,
                }}
              >
                {tier.features.map((feature, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      color: "rgba(240,230,208,0.65)",
                      marginBottom: 6,
                      paddingLeft: 16,
                      position: "relative",
                      lineHeight: 1.4,
                    }}
                  >
                    <Check
                      size={12}
                      color="#c9a84c"
                      strokeWidth={2}
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 2,
                      }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="/pricing"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "10px 14px",
                  background: tier.popular
                    ? "linear-gradient(135deg, #c9a84c, #a08030)"
                    : "transparent",
                  border: tier.popular ? "none" : "1px solid rgba(201,168,76,0.3)",
                  borderRadius: 8,
                  color: tier.popular ? "#0a0806" : "#c9a84c",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (tier.popular) {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(201,168,76,0.3)";
                  } else {
                    e.currentTarget.style.background = "rgba(201,168,76,0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (tier.popular) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  } else {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                Chọn {tier.name}
              </a>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center" }}>
          <a
            href="/pricing"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              background: "linear-gradient(135deg, #c9a84c, #a08030)",
              borderRadius: 10,
              color: "#0a0806",
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.02em",
              boxShadow: "0 4px 20px rgba(201,168,76,0.25)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(201,168,76,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(201,168,76,0.25)";
            }}
          >
            Nâng cấp ngay →
          </a>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: "rgba(240,230,208,0.3)",
              marginTop: 12,
            }}
          >
            Đăng ký hàng tháng • Hủy bất cứ lúc nào
          </p>
        </div>
      </div>
    </div>
  );
}
