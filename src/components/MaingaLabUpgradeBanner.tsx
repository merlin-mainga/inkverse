"use client";

import { useState } from "react";
import { Sparkles, Wand2, Shield, Zap, Crown, Check } from "lucide-react";

interface PricingTier {
  name: string;
  tagline: string;
  monthlyUsd: string;
  yearlyUsd: string;
  monthlyVnd: string;
  yearlyVnd: string;
  features: string[];
  cta: string;
  popular?: boolean;
  exclusive?: boolean;
  mana: number;
  hasMaingaLab?: boolean;
  maxCharacters?: number;
  isYearlyDiscount?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    tagline: "Bắt đầu câu chuyện của chính bạn — không cần vẽ giỏi.",
    monthlyUsd: "$1.99",
    yearlyUsd: "$1.59",
    monthlyVnd: "~49,000đ",
    yearlyVnd: "~39,000đ",
    mana: 100,
    cta: "Bắt đầu thử nghiệm →",
    features: [
      "100 Mana/tháng",
      "Tạo ảnh manga cơ bản bằng AI",
      "Không cần kỹ năng vẽ",
      "Thử trước, upgrade sau",
    ],
  },
  {
    name: "Pro",
    tagline: "Từ 'thử chơi' sang thật sự là creator — đây là bước ngoặt.",
    monthlyUsd: "$4.99",
    yearlyUsd: "$3.99",
    monthlyVnd: "~129,000đ",
    yearlyVnd: "~99,000đ",
    mana: 300,
    popular: true,
    hasMaingaLab: true,
    maxCharacters: 5,
    cta: "Trở thành creator ngay →",
    isYearlyDiscount: true,
    features: [
      "Mainga Lab — Character AI consistent",
      "Tối đa 5 nhân vật",
      "300 Mana/tháng",
      "Bước qua ranh giới 'vẽ được'",
    ],
  },
  {
    name: "Max",
    tagline: "Cho những ai không chỉ thích đọc manga — mà muốn viết ra chúng.",
    monthlyUsd: "$9.99",
    yearlyUsd: "$7.99",
    monthlyVnd: "~259,000đ",
    yearlyVnd: "~199,000đ",
    mana: 800,
    exclusive: true,
    hasMaingaLab: true,
    cta: "Đi all-in với manga của bạn →",
    isYearlyDiscount: true,
    features: [
      "Mainga Lab không giới hạn",
      "800 Mana/tháng",
      "Priority processing",
      "Exclusive AI models sắp ra",
    ],
  },
];

const features = [
  { icon: Wand2, text: "Tạo Character AI từ mô tả" },
  { icon: Sparkles, text: "Upload ảnh làm ref nhân vật" },
  { icon: Shield, text: "Bảo tồn identity nhân vật" },
  { icon: Zap, text: "Generate consistent qua nhiều scene" },
];

export default function MaingaLabUpgradeBanner() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div
      style={{
        background: "linear-gradient(180deg, rgba(20,18,12,0.98), rgba(12,10,6,0.99))",
        borderRadius: 20,
        padding: "40px 32px",
        maxWidth: 960,
        margin: "0 auto",
        border: "1px solid rgba(201,168,76,0.15)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,168,76,0.08)",
      }}
    >
      {/* Icon & Title */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        {/* Sparkles Icon */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
            border: "1px solid rgba(201,168,76,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <Sparkles size={32} color="#c9a84c" strokeWidth={1.5} />
        </div>

        <h2
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 22,
            fontWeight: 700,
            color: "#f0e6d0",
            marginBottom: 10,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Nâng cấp lên Pro để dùng Mainga Lab
        </h2>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: "rgba(240,230,208,0.55)",
            lineHeight: 1.65,
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          Tạo Character AI của riêng bạn với Mainga Lab. Bảo tồn đặc điểm nhân vật 
          qua nhiều bức ảnh, generate hình ảnh consistent cho manga của bạn.
        </p>
      </div>

      {/* Features Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 12,
          marginBottom: 32,
        }}
      >
        {features.map((feature, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              background: "rgba(201,168,76,0.03)",
              borderRadius: 10,
              border: "1px solid rgba(201,168,76,0.08)",
            }}
          >
            <feature.icon size={18} color="#c9a84c" strokeWidth={1.5} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "rgba(240,230,208,0.75)",
                fontWeight: 400,
              }}
            >
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      {/* Billing Toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: !isYearly ? "#f0e6d0" : "rgba(240,230,208,0.45)",
            fontWeight: !isYearly ? 600 : 400,
            transition: "all 0.2s ease",
          }}
        >
          Monthly
        </span>

        <button
          onClick={() => setIsYearly(!isYearly)}
          style={{
            width: 48,
            height: 26,
            borderRadius: 13,
            background: isYearly ? "linear-gradient(135deg, #c9a84c, #a08030)" : "rgba(255,255,255,0.08)",
            border: "1px solid " + (isYearly ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.1)"),
            cursor: "pointer",
            position: "relative",
            transition: "all 0.2s ease",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: isYearly ? "#0a0806" : "rgba(255,255,255,0.6)",
              position: "absolute",
              top: 2,
              left: isYearly ? 26 : 3,
              transition: "all 0.2s ease",
            }}
          />
        </button>

        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: isYearly ? "#f0e6d0" : "rgba(240,230,208,0.45)",
            fontWeight: isYearly ? 600 : 400,
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          Yearly
          <span
            style={{
              background: "rgba(201,168,76,0.15)",
              color: "#c9a84c",
              fontSize: 11,
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: 4,
              letterSpacing: "0.02em",
            }}
          >
            -20%
          </span>
        </span>
      </div>

      {/* Pricing Tiers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: 32,
        }}
      >
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            style={{
              background: tier.popular
                ? "linear-gradient(180deg, rgba(201,168,76,0.1), rgba(201,168,76,0.04))"
                : "rgba(255,255,255,0.015)",
              border: tier.popular
                ? "1px solid rgba(201,168,76,0.35)"
                : "1px solid rgba(201,168,76,0.1)",
              borderRadius: 16,
              padding: "24px 20px",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Badges */}
            <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
              {tier.popular && (
                <span
                  style={{
                    background: "linear-gradient(135deg, #c9a84c, #a08030)",
                    color: "#0a0806",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 4,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Phổ biến nhất
                </span>
              )}
              {tier.exclusive && (
                <span
                  style={{
                    background: "rgba(168,85,247,0.15)",
                    color: "#c084fc",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 4,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Crown size={10} strokeWidth={2} />
                  Exclusive
                </span>
              )}
            </div>

            {/* Tier Name */}
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 15,
                fontWeight: 600,
                color: tier.popular ? "#c9a84c" : "#f0e6d0",
                marginBottom: 8,
                letterSpacing: "0.04em",
              }}
            >
              {tier.name}
            </div>

            {/* Tagline */}
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: "rgba(240,230,208,0.5)",
                lineHeight: 1.5,
                marginBottom: 16,
                fontStyle: "italic",
              }}
            >
              {tier.tagline}
            </div>

            {/* Mainga Lab Badge */}
            {tier.hasMaingaLab && (
              <div
                style={{
                  background: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: 6,
                  padding: "8px 12px",
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Sparkles size={14} color="#c9a84c" strokeWidth={1.5} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "#c9a84c",
                    fontWeight: 600,
                  }}
                >
                  Mainga Lab
                </span>
                {tier.maxCharacters && (
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: "rgba(240,230,208,0.5)",
                    }}
                  >
                    • {tier.maxCharacters} nhân vật
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#f0e6d0",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {isYearly ? tier.yearlyUsd : tier.monthlyUsd}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "rgba(240,230,208,0.45)",
                  }}
                >
                  /tháng
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "rgba(240,230,208,0.4)",
                }}
              >
                {isYearly ? tier.yearlyVnd : tier.monthlyVnd}
              </span>
            </div>

            {/* Yearly Discount */}
            {isYearly && tier.isYearlyDiscount && (
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: "#4ade80",
                  marginBottom: 8,
                  fontWeight: 500,
                }}
              >
                Tiết kiệm 20%
              </div>
            )}

            {/* Mana */}
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "#c9a84c",
                marginBottom: 12,
                fontWeight: 500,
              }}
            >
              {tier.mana} Mana
            </div>

            {/* Features */}
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                flex: 1,
              }}
            >
              {tier.features.map((feature, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "rgba(240,230,208,0.65)",
                    marginBottom: 8,
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

            {/* CTA Button */}
            <a
              href="/pricing"
              style={{
                display: "block",
                textAlign: "center",
                padding: "12px 16px",
                background: tier.popular
                  ? "linear-gradient(135deg, #c9a84c, #a08030)"
                  : "transparent",
                border: tier.popular
                  ? "none"
                  : "1px solid rgba(201,168,76,0.3)",
                borderRadius: 8,
                color: tier.popular ? "#0a0806" : "#c9a84c",
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "0.02em",
                marginTop: 16,
                transition: "all 0.2s ease",
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
              {tier.cta}
            </a>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            color: "rgba(240,230,208,0.35)",
            letterSpacing: "0.02em",
          }}
        >
          Đăng ký hàng tháng • Hủy bất cứ lúc nào
        </p>
      </div>
    </div>
  );
}
