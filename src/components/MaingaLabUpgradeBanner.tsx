"use client";

import { useState } from "react";
import { Sparkles, Wand2, ImageIcon, Zap, Shield, Crown, Check } from "lucide-react";
import Head from "next/head";

interface PricingTier {
  name: string;
  tagline: string;
  subtext?: string;
  monthlyUsd: string;
  yearlyUsd: string;
  monthlyVnd: string;
  yearlyVnd: string;
  features: string[];
  cta: string;
  popular?: boolean;
  exclusive?: boolean;
  badge?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "STARTER",
    tagline: "Thử tạo nhân vật đầu tiên — không cam kết gì cả.",
    subtext: "Không cần thẻ tín dụng • 1 click là xong",
    monthlyUsd: "$1.99",
    yearlyUsd: "$1.59",
    monthlyVnd: "49,000đ",
    yearlyVnd: "39,000đ",
    cta: "Dùng thử miễn phí →",
    features: [
      "Tạo ảnh manga cơ bản bằng AI",
      "Không cần kỹ năng vẽ",
      "Thử trước, upgrade sau",
    ],
  },
  {
    name: "PRO",
    tagline: "Đây là lúc nhân vật của bạn thật sự là của bạn.",
    subtext: "Bước ngoặt từ thử chơi sang thật sự viết truyện",
    monthlyUsd: "$4.99",
    yearlyUsd: "$3.99",
    monthlyVnd: "129,000đ",
    yearlyVnd: "99,000đ",
    popular: true,
    badge: "⭐ Phổ biến nhất",
    cta: "Trở thành creator ngay →",
    features: [
      "Tạo Character AI từ mô tả",
      "Upload ảnh → AI học look của nhân vật",
      "Generate consistent qua 10, 20, 50 scene",
      "Bảo tồn identity — mắt, tóc, phong cách y hệt",
    ],
  },
  {
    name: "MAX",
    tagline: "Nếu bạn nghiêm túc với việc viết manga — đây là gear của pro.",
    subtext: "Cho những ai không chỉ thích đọc manga",
    monthlyUsd: "$9.99",
    yearlyUsd: "$7.99",
    monthlyVnd: "259,000đ",
    yearlyVnd: "199,000đ",
    exclusive: true,
    badge: "👑 Exclusive",
    cta: "All-in với manga của bạn →",
    features: [
      "Mainga Lab không giới hạn",
      "Tất cả tính năng Pro",
      "Priority processing",
      "Exclusive AI models sắp ra",
    ],
  },
];

const features = [
  { icon: Wand2, text: "Tạo Character AI từ mô tả" },
  { icon: ImageIcon, text: "Upload ảnh → AI học look của nhân vật" },
  { icon: Zap, text: "Generate consistent qua 10, 20, 50 scene" },
  { icon: Shield, text: "Bảo tồn identity — mắt, tóc, phong cách y hệt" },
];

export default function MaingaLabUpgradeBanner() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        style={{
          background: "linear-gradient(180deg, rgba(20,18,12,0.98), rgba(12,10,6,0.99))",
          borderRadius: 20,
          padding: "40px 32px",
          maxWidth: 1000,
          margin: "0 auto",
          border: "1px solid rgba(201,168,76,0.15)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,168,76,0.08)",
        }}
      >
        {/* Headline & Subtext */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
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
              margin: "0 auto 24px",
            }}
          >
            <Sparkles size={32} color="#c9a84c" strokeWidth={1.5} />
          </div>

          <h2
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 24,
              fontWeight: 700,
              color: "#f0e6d0",
              marginBottom: 14,
              letterSpacing: "0.04em",
              lineHeight: 1.3,
            }}
          >
            Câu chuyện của bạn. Nhân vật của bạn. Giờ bạn là tác giả.
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: "rgba(240,230,208,0.55)",
              lineHeight: 1.6,
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Tạo nhân vật, giữ họ consistent, viết chapter tiếp. Không cần biết vẽ.
          </p>
        </div>

        {/* Feature Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
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
                gap: 10,
                padding: "14px 12px",
                background: "rgba(201,168,76,0.03)",
                borderRadius: 10,
                border: "1px solid rgba(201,168,76,0.08)",
                minHeight: 52,
              }}
            >
              <feature.icon size={18} color="#c9a84c" strokeWidth={1.5} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "rgba(240,230,208,0.8)",
                  fontWeight: 400,
                  lineHeight: 1.4,
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
              background: isYearly
                ? "linear-gradient(135deg, #c9a84c, #a08030)"
                : "rgba(255,255,255,0.08)",
              border:
                "1px solid " +
                (isYearly ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.1)"),
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
                  ? "linear-gradient(180deg, #1a1600 0%, #111111 100%)"
                  : "rgba(255,255,255,0.015)",
                border: tier.popular
                  ? "2px solid #c9a84c"
                  : "1px solid rgba(201,168,76,0.1)",
                borderRadius: 16,
                padding: "24px 20px",
                paddingTop: tier.popular || tier.exclusive ? 32 : 24,
                position: "relative",
                overflow: "visible",
                display: "flex",
                flexDirection: "column",
                boxShadow: tier.popular
                  ? "0 0 30px rgba(201, 168, 76, 0.2)"
                  : "none",
                transform: tier.popular ? "scale(1.02)" : "scale(1)",
              }}
            >
              {/* Badge - Positioned absolutely */}
              {(tier.popular || tier.exclusive) && tier.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    right: 16,
                    transform: "rotate(-2deg)",
                    zIndex: 10,
                  }}
                >
                  <span
                    style={{
                      background: tier.exclusive
                        ? "linear-gradient(135deg, #8b5cf6, #6d28d9)"
                        : "linear-gradient(135deg, #c9a84c, #a08030)",
                      color: tier.exclusive ? "#fff" : "#0a0806",
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "5px 12px",
                      borderRadius: 4,
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: "0.04em",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      boxShadow:
                        "0 2px 8px rgba(139, 92, 246, 0.3)",
                    }}
                  >
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Tier Name */}
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 16,
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
                  fontSize: 13,
                  color: "rgba(240,230,208,0.55)",
                  lineHeight: 1.5,
                  marginBottom: 12,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {tier.tagline}
              </div>

              {/* Price - VNĐ Primary */}
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
                      fontSize: 28,
                      fontWeight: 800,
                      color: "#ffffff",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {isYearly ? tier.yearlyVnd : tier.monthlyVnd}
                  </span>
                </div>
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
                      fontSize: 14,
                      color: "#888888",
                    }}
                  >
                    {isYearly ? tier.yearlyUsd : tier.monthlyUsd}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      color: "rgba(240,230,208,0.4)",
                    }}
                  >
                    /tháng
                  </span>
                </div>
              </div>

              {/* Yearly Discount */}
              {isYearly && tier.popular && (
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

              {/* Features */}
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
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (tier.popular) {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(201,168,76,0.3)";
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

              {/* Subtext */}
              {tier.subtext && (
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: "rgba(240,230,208,0.35)",
                    textAlign: "center",
                    marginTop: 10,
                    lineHeight: 1.4,
                  }}
                >
                  {tier.subtext}
                </div>
              )}
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
    </>
  );
}
