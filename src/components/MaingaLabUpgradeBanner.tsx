"use client";

interface PricingTier {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
  mana: number;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$1.99",
    mana: 100,
    features: [
      "100 Mana/tháng",
      "Không giới hạn generate cơ bản",
    ],
  },
  {
    name: "Pro",
    price: "$4.99",
    mana: 300,
    popular: true,
    features: [
      "300 Mana/tháng",
      "Mainga Lab - Tạo Character AI",
      "Generate ảnh consistent",
      "Bảo tồn đặc điểm nhân vật",
    ],
  },
  {
    name: "Max",
    price: "$9.99",
    mana: 800,
    features: [
      "800 Mana/tháng",
      "Tất cả tính năng Pro",
      "Ưu tiên xử lý",
      "Không giới hạn Mainga Lab",
    ],
  },
];

export default function MaingaLabUpgradeBanner() {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, rgba(20,18,12,0.98), rgba(12,10,6,0.99))",
        borderRadius: 20,
        padding: "40px 32px",
        maxWidth: 900,
        margin: "0 auto",
        border: "1px solid rgba(201,168,76,0.15)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,168,76,0.08)",
      }}
    >
      {/* Icon & Title */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        {/* Magic wand icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
            border: "1px solid rgba(201,168,76,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c9a84c"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3l1.5 4.5H18l-3.75 2.7L15.75 15 12 12.3 8.25 15l1.5-4.8L6 7.5h4.5L12 3z" />
            <path d="M5 19l2-2m12-4l2 2" />
            <circle cx="19" cy="5" r="2" fill="#c9a84c" stroke="none" />
            <circle cx="5" cy="19" r="1.5" fill="#c9a84c" stroke="none" />
          </svg>
        </div>

        <h2
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 26,
            fontWeight: 700,
            color: "#f0e6d0",
            marginBottom: 12,
            letterSpacing: "0.04em",
          }}
        >
          Nâng cấp lên Pro để dùng Mainga Lab
        </h2>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            color: "rgba(240,230,208,0.6)",
            lineHeight: 1.6,
            maxWidth: 500,
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
          gap: 16,
          marginBottom: 32,
        }}
      >
        {[
          { icon: "✨", text: "Tạo Character AI từ mô tả" },
          { icon: "🎭", text: "Upload ảnh làm ref nhân vật" },
          { icon: "🔄", text: "Generate consistent qua nhiều scene" },
          { icon: "🛡️", text: "Bảo tồn identity nhân vật" },
        ].map((feature, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 16px",
              background: "rgba(201,168,76,0.04)",
              borderRadius: 12,
              border: "1px solid rgba(201,168,76,0.08)",
            }}
          >
            <span style={{ fontSize: 20 }}>{feature.icon}</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "rgba(240,230,208,0.8)",
              }}
            >
              {feature.text}
            </span>
          </div>
        ))}
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
                ? "linear-gradient(180deg, rgba(201,168,76,0.12), rgba(201,168,76,0.06))"
                : "rgba(255,255,255,0.02)",
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
                  right: -32,
                  background: "linear-gradient(135deg, #c9a84c, #a08030)",
                  color: "#0a0806",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "4px 40px",
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
                fontSize: 16,
                fontWeight: 600,
                color: tier.popular ? "#c9a84c" : "#f0e6d0",
                marginBottom: 8,
              }}
            >
              {tier.name}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 4,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#f0e6d0",
                }}
              >
                {tier.price}
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
                    color: "rgba(240,230,208,0.7)",
                    marginBottom: 8,
                    paddingLeft: 16,
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      color: "rgba(201,168,76,0.6)",
                    }}
                  >
                    •
                  </span>
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
            padding: "14px 48px",
            background: "linear-gradient(135deg, #c9a84c, #a08030)",
            borderRadius: 10,
            color: "#0a0806",
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            fontWeight: 600,
            textDecoration: "none",
            letterSpacing: "0.02em",
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
            fontSize: 12,
            color: "rgba(240,230,208,0.4)",
            marginTop: 16,
          }}
        >
          Đăng ký hàng tháng • Hủy bất cứ lúc nào
        </p>
      </div>
    </div>
  );
}
