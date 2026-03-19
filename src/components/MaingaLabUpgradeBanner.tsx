"use client";

import { useState } from "react";
import { Sparkles, ImageIcon, Shield, Layers, Wand2, Check } from "lucide-react";

interface PricingTier {
  name: string;
  monthlyUsd: string;
  yearlyUsd: string;
  monthlyVnd: string;
  yearlyVnd: string;
  features: string[];
  popular?: boolean;
  mana: number;
  hasMaingaLab?: boolean;
  isYearlyDiscount?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    monthlyUsd: "$1.99",
    yearlyUsd: "$1.59",
    monthlyVnd: "~49,000đ",
    yearlyVnd: "~39,000đ",
    mana: 100,
    features: ["100 Mana/tháng", "Không giới hạn generate cơ bản"],
  },
  {
    name: "Pro",
    monthlyUsd: "$4.99",
    yearlyUsd: "$3.99",
    monthlyVnd: "~129,000đ",
    yearlyVnd: "~99,000đ",
    mana: 300,
    popular: true,
    hasMaingaLab: true,
    isYearlyDiscount: true,
    features: [
      "300 Mana/tháng",
      "Mainga Lab - Tạo Character AI",
      "Generate ảnh consistent",
      "Bảo tồn đặc điểm nhân vật",
    ],
  },
  {
    name: "Max",
    monthlyUsd: "$9.99",
    yearlyUsd: "$7.99",
    monthlyVnd: "~259,000đ",
    yearlyVnd: "~199,000đ",
    mana: 800,
    hasMaingaLab: true,
    isYearlyDiscount: true,
    features: [
      "800 Mana/tháng",
      "Tất cả tính năng Pro",
      "Ưu tiên xử lý",
      "Không giới hạn Mainga Lab",
    ],
  },
];

const features = [
  { icon: Wand2, text: "Tạo Character AI từ mô tả" },
  { icon: ImageIcon, text: "Upload ảnh làm ref nhân vật" },
  { icon: Layers, text: "Generate consistent qua nhiều scene" },
  { icon: Shield, text: "Bảo tồn identity nhân vật" },
];

export default function MaingaLabUpgradeBanner() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div
      style={{
        background: "linear-gradient(180deg, rgba(20,18,12,0.98), rgba(12,10,6,0.99))",
        borderRadius: 20,
        padding: "40px 32px",
        maxWidth: 920,
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
            }}
          >
            {tier.popular && (
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  right: -30,
                  background: "linear-gradient(135deg, #c9a84c, #a08030)",
                  color: "#0a0806",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "4px 44px",
                  transform: "rotate(45deg)",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                POPULAR
              </div>
            )}

            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 15,
                fontWeight: 600,
                color: tier.popular ? "#c9a84c" : "#f0e6d0",
                marginBottom: 12,
                letterSpacing: "0.04em",
              }}
            >
              {tier.name}
            </div>

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

            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
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
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div style={{ textAlign: "center" }}>
        <a
          href="/pricing"
          style={{
            display: "inline-block",
            padding: "14px 52px",
            background: "linear-gradient(135deg, #c9a84c, #a08030)",
            borderRadius: 8,
            color: "#0a0806",
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            letterSpacing: "0.03em",
            boxShadow: "0 4px 16px rgba(201,168,76,0.25)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(201,168,76,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(201,168,76,0.25)";
          }}
        >
          Nâng cấp ngay
        </a>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            color: "rgba(240,230,208,0.35)",
            marginTop: 14,
            letterSpacing: "0.02em",
          }}
        >
          Đăng ký hàng tháng • Hủy bất cứ lúc nào
        </p>
      </div>
    </div>
  );
}
