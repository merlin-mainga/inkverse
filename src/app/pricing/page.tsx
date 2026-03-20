"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Wand2, ImageIcon, Zap, Shield, Check, CreditCard, RefreshCw, Headphones, ChevronDown } from "lucide-react";
import PaymentModal from "@/components/PaymentModal";

interface PricingTier {
  name: string;
  tierKey: "FREE" | "STARTER" | "PRO" | "MAX";
  tagline: string;
  subtext?: string;
  monthlyUsd: string;
  yearlyUsd: string;
  monthlyVnd: string;
  yearlyVnd: string;
  monthlyAmount: number;
  yearlyAmount: number;
  features: string[];
  cta: string;
  popular?: boolean;
  exclusive?: boolean;
  badge?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "FREE",
    tierKey: "FREE",
    tagline: "Dành cho người mới bắt đầu khám phá.",
    subtext: "50 Mana mỗi tháng • Không cần thẻ",
    monthlyUsd: "Miễn phí",
    yearlyUsd: "Miễn phí",
    monthlyVnd: "0đ",
    yearlyVnd: "0đ",
    monthlyAmount: 0,
    yearlyAmount: 0,
    cta: "Bắt Đầu Miễn Phí",
    features: [
      "50 Mana mỗi tháng",
      "Đọc manga cơ bản",
      "Thử nghiệm AI trước khi upgrade",
    ],
  },
  {
    name: "STARTER",
    tierKey: "STARTER",
    tagline: "Thử tạo nhân vật đầu tiên — không cam kết gì cả.",
    subtext: "Không cần thẻ tín dụng • 1 click là xong",
    monthlyUsd: "$1.59",
    yearlyUsd: "$1.29",
    monthlyVnd: "39,000đ",
    yearlyVnd: "31,000đ",
    monthlyAmount: 39000,
    yearlyAmount: 31000,
    cta: "Dùng Thử Miễn Phí →",
    features: [
      "Tạo ảnh manga cơ bản bằng AI",
      "Không cần kỹ năng vẽ",
      "Thử trước, upgrade sau",
    ],
  },
  {
    name: "PRO",
    tierKey: "PRO",
    tagline: "Đây là lúc nhân vật của bạn thật sự là của bạn.",
    subtext: "Bước ngoặt từ thử chơi sang thật sự viết truyện",
    monthlyUsd: "$3.99",
    yearlyUsd: "$3.19",
    monthlyVnd: "99,000đ",
    yearlyVnd: "79,000đ",
    monthlyAmount: 99000,
    yearlyAmount: 79000,
    popular: true,
    badge: "Phổ biến nhất",
    cta: "Bắt Đầu Sáng Tạo →",
    features: [
      "Tạo Character AI từ mô tả",
      "Upload ảnh → AI học look của nhân vật",
      "Generate consistent qua 10, 20, 50 scene",
      "Bảo tồn identity — mắt, tóc, phong cách y hệt",
    ],
  },
  {
    name: "MAX",
    tierKey: "MAX",
    tagline: "Nếu bạn nghiêm túc với việc viết manga — đây là gear của pro.",
    subtext: "Cho những ai không chỉ thích đọc manga",
    monthlyUsd: "$7.99",
    yearlyUsd: "$6.39",
    monthlyVnd: "199,000đ",
    yearlyVnd: "159,000đ",
    monthlyAmount: 199000,
    yearlyAmount: 159000,
    exclusive: true,
    badge: "Exclusive",
    cta: "Lên Pro Ngay →",
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

const faqs = [
  {
    question: "Tôi chưa biết vẽ — có dùng được không?",
    answer: "Hoàn toàn được. MAINGA được thiết kế cho người không cần kỹ năng vẽ. Bạn chỉ cần mô tả nhân vật bằng lời, AI sẽ tạo hình. Hơn 5,000 creator đã dùng mà không biết cầm bút.",
  },
  {
    question: "Tôi có thể hủy khi không dùng nữa không?",
    answer: "Có, hủy bất cứ lúc nào trong 1 click. Không phí hủy, không câu hỏi. Nếu hủy trong 7 ngày đầu, bạn được hoàn tiền đầy đủ.",
  },
  {
    question: "Thanh toán bằng gì?",
    answer: "Chuyển khoản ngân hàng, quét mã QR qua SePay. An toàn, nhanh chóng, không cần thẻ.",
  },
  {
    question: "Generate hình mất bao lâu?",
    answer: "15-30 giây cho mỗi hình. Plan PRO trở lên được ưu tiên xử lý — thường dưới 15 giây.",
  },
];

const trustSignals = [
  {
    icon: Shield,
    title: "Thanh toán bảo mật",
    description: "Mã hóa 256-bit • SePay",
  },
  {
    icon: RefreshCw,
    title: "Hủy bất cứ lúc nào",
    description: "Không phí hủy • Hoàn tiền 7 ngày",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    description: "Phản hồi trong 2 giờ",
  },
];

export default function PricingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<"STARTER" | "PRO" | "MAX">("PRO");
  const [selectedAmount, setSelectedAmount] = useState(99000);

  const handleCTAClick = (tier: PricingTier) => {
    // Free tier - redirect to register/login
    if (tier.tierKey === "FREE") {
      if (!session) {
        router.push("/login");
      } else {
        router.push("/dashboard");
      }
      return;
    }

    // Paid tiers - open payment modal
    const amount = isYearly ? tier.yearlyAmount : tier.monthlyAmount;
    setSelectedTier(tier.tierKey as "STARTER" | "PRO" | "MAX");
    setSelectedAmount(amount);
    setShowPaymentModal(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0a0806 0%, #111111 100%)",
        padding: "60px 20px 100px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Headline */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h1
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 40,
              fontWeight: 800,
              color: "#f0e6d0",
              marginBottom: 20,
              lineHeight: 1.2,
              letterSpacing: "0.02em",
            }}
          >
            Tạo Manga Không Cần Vẽ.{" "}
            <span style={{ color: "#c9a84c" }}>Bắt Đầu Từ Hôm Nay.</span>
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: "rgba(240,230,208,0.55)",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.6,
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
            marginBottom: 40,
          }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 14px",
                background: "rgba(201,168,76,0.03)",
                borderRadius: 12,
                border: "1px solid rgba(201,168,76,0.08)",
              }}
            >
              <feature.icon size={20} color="#c9a84c" strokeWidth={1.5} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "rgba(240,230,208,0.8)",
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
            marginBottom: 32,
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
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
            marginBottom: 60,
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
                borderRadius: 20,
                padding: "28px 24px",
                paddingTop: tier.popular || tier.exclusive ? 36 : 28,
                position: "relative",
                overflow: "visible",
                display: "flex",
                flexDirection: "column",
                boxShadow: tier.popular
                  ? "0 0 40px rgba(201, 168, 76, 0.15)"
                  : "none",
              }}
            >
              {/* Badge */}
              {(tier.popular || tier.exclusive) && tier.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    right: 20,
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
                    }}
                  >
                    {tier.popular ? "⭐ " : "👑 "}
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Tier Name */}
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 18,
                  fontWeight: 600,
                  color: tier.popular ? "#c9a84c" : "#f0e6d0",
                  marginBottom: 8,
                  letterSpacing: "0.06em",
                }}
              >
                {tier.name}
              </div>

              {/* Tagline */}
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "rgba(240,230,208,0.55)",
                  lineHeight: 1.5,
                  marginBottom: 16,
                }}
              >
                {tier.tagline}
              </div>

              {/* Price */}
              <div style={{ marginBottom: 8 }}>
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
                      fontSize: 32,
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
                    marginTop: 4,
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
                    fontSize: 12,
                    color: "#4ade80",
                    marginBottom: 12,
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
                  marginBottom: 20,
                }}
              >
                {tier.features.map((feature, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: "rgba(240,230,208,0.7)",
                      marginBottom: 10,
                      paddingLeft: 18,
                      position: "relative",
                      lineHeight: 1.4,
                    }}
                  >
                    <Check
                      size={14}
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
              <button
                onClick={() => handleCTAClick(tier)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  padding: "14px 20px",
                  background: tier.popular
                    ? "linear-gradient(135deg, #c9a84c, #a08030)"
                    : "transparent",
                  border: tier.popular
                    ? "none"
                    : "1px solid rgba(201,168,76,0.3)",
                  borderRadius: 10,
                  color: tier.popular ? "#0a0806" : "#c9a84c",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (tier.popular) {
                    (e.target as HTMLElement).style.transform = "translateY(-2px)";
                    (e.target as HTMLElement).style.boxShadow =
                      "0 6px 20px rgba(201,168,76,0.35)";
                  } else {
                    (e.target as HTMLElement).style.background = "rgba(201,168,76,0.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (tier.popular) {
                    (e.target as HTMLElement).style.transform = "translateY(0)";
                    (e.target as HTMLElement).style.boxShadow = "none";
                  } else {
                    (e.target as HTMLElement).style.background = "transparent";
                  }
                }}
              >
                {tier.cta}
              </button>

              {/* Subtext */}
              {tier.subtext && (
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: "rgba(240,230,208,0.35)",
                    textAlign: "center",
                    marginTop: 12,
                    lineHeight: 1.4,
                  }}
                >
                  {tier.subtext}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 80,
          }}
        >
          {trustSignals.map((signal, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "20px 18px",
                background: "rgba(255,255,255,0.02)",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "rgba(201,168,76,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <signal.icon size={20} color="#c9a84c" strokeWidth={1.5} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#f0e6d0",
                    marginBottom: 2,
                  }}
                >
                  {signal.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "rgba(240,230,208,0.45)",
                  }}
                >
                  {signal.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: 24,
              fontWeight: 700,
              color: "#f0e6d0",
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            Câu hỏi thường gặp
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.05)",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "18px 20px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 15,
                      fontWeight: 500,
                      color: "#f0e6d0",
                      paddingRight: 16,
                    }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    color="rgba(240,230,208,0.5)"
                    style={{
                      transition: "transform 0.2s ease",
                      transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                      flexShrink: 0,
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div
                    style={{
                      padding: "0 20px 18px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: "rgba(240,230,208,0.6)",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 60 }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: "rgba(240,230,208,0.35)",
              letterSpacing: "0.02em",
            }}
          >
            Đăng ký hàng tháng • Hủy bất cứ lúc nào
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        tier={selectedTier}
        amount={selectedAmount}
      />
    </div>
  );
}
