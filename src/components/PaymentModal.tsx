"use client";

import { useState, useEffect, useCallback } from "react";
import { X, QrCode, Copy, Check, Loader2, AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: "STARTER" | "PRO" | "MAX";
  amount: number; // Amount in VND
}

interface OrderData {
  id: string;
  sepay_order_id: string;
  tier: string;
  amount: number;
  description: string;
  qr_url?: string;
  status: string;
}

const TIER_INFO: Record<string, { name: string; mana: string }> = {
  STARTER: { name: "STARTER", mana: "500 Mana" },
  PRO: { name: "PRO", mana: "1.500 Mana" },
  MAX: { name: "MAX", mana: "3.500 Mana" },
};

const COUNTDOWN_MINUTES = 15;

export default function PaymentModal({ isOpen, onClose, tier, amount }: PaymentModalProps) {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "checking" | "paid">("pending");
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_MINUTES * 60); // seconds

  const tierInfo = TIER_INFO[tier];

  // Reset state when modal opens with new tier
  useEffect(() => {
    if (!isOpen) return;
    // Wait for session to be confirmed before creating order
    if (status === "loading") return;
    if (status === "unauthenticated") {
      onClose();
      router.push("/");
      return;
    }
    setOrder(null);
    setError(null);
    setPaymentStatus("pending");
    setTimeLeft(COUNTDOWN_MINUTES * 60);
    setLoading(true);
    createOrder();
  }, [isOpen, tier, status]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || paymentStatus === "paid" || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, paymentStatus, timeLeft]);

  // Poll for payment status
  useEffect(() => {
    if (!order || paymentStatus !== "pending") return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/payment/status?orderId=${order.id}`, {
          credentials: "include",
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.status === "completed") {
            setPaymentStatus("paid");
            clearInterval(pollInterval);
          }
        }
      } catch (err) {
        console.error("Poll error:", err);
      }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(pollInterval);
  }, [order, paymentStatus]);

  const createOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      // Verify session is still valid before hitting API
      const { getSession } = await import("next-auth/react");
      const currentSession = await getSession();
      if (!currentSession) {
        onClose();
        router.push("/");
        return;
      }

      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ tier }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          onClose();
          router.push("/");
          return;
        }
        throw new Error(data.error || "Failed to create order");
      }

      setOrder(data.order);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyDescription = useCallback(() => {
    if (!order) return;
    navigator.clipboard.writeText(order.description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [order]);

  const formatAmount = (amt: number) => {
    return new Intl.NumberFormat("vi-VN").format(amt);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSuccess = async () => {
    // Reload session to get updated subscription tier
    await update();
    onClose();
    router.refresh();
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && paymentStatus !== "paid") {
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
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={paymentStatus === "paid"}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "transparent",
            border: "none",
            color: "rgba(240,230,208,0.4)",
            fontSize: 12,
            fontFamily: "'Inter', sans-serif",
            cursor: paymentStatus === "paid" ? "default" : "pointer",
            padding: "4px 8px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            if (paymentStatus !== "paid") {
              e.currentTarget.style.color = "#f0e6d0";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(240,230,208,0.4)";
          }}
        >
          Đóng
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
            Thanh toán {tierInfo.name}
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "rgba(240,230,208,0.6)",
              lineHeight: 1.5,
            }}
          >
            Quét mã QR để thanh toán
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Loader2 
              size={40} 
              color="#c9a84c" 
              style={{ animation: "spin 1s linear infinite" }}
            />
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "rgba(240,230,208,0.6)",
                marginTop: 16,
              }}
            >
              Đang tạo mã thanh toán...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 12,
              padding: 16,
              marginBottom: 20,
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
            }}
          >
            <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "#ef4444",
                  marginBottom: 8,
                }}
              >
                {error}
              </p>
              <button
                onClick={createOrder}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(239,68,68,0.5)",
                  borderRadius: 8,
                  padding: "8px 16px",
                  color: "#ef4444",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Thử lại
              </button>
            </div>
          </div>
        )}

        {/* Payment Content */}
        {order && !loading && !error && paymentStatus !== "paid" && timeLeft > 0 && (
          <>
            {/* Countdown Timer */}
            <div
              style={{
                textAlign: "center",
                marginBottom: 16,
                padding: "8px 16px",
                background: timeLeft < 300 ? "rgba(239,68,68,0.1)" : "rgba(201,168,76,0.05)",
                borderRadius: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: timeLeft < 300 ? "#ef4444" : "rgba(240,230,208,0.6)",
                }}
              >
                Mã thanh toán hết hạn sau:{" "}
                <strong style={{ color: timeLeft < 300 ? "#ef4444" : "#c9a84c" }}>
                  {formatTime(timeLeft)}
                </strong>
              </span>
            </div>

            {/* Order Summary */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 14,
                padding: 20,
                marginBottom: 20,
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "rgba(240,230,208,0.6)",
                  }}
                >
                  Gói {tierInfo.name}
                </span>
                <span
                  style={{
                    background: "linear-gradient(135deg, #c9a84c, #a08030)",
                    color: "#0a0806",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 4,
                  }}
                >
                  {tierInfo.mana}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "rgba(240,230,208,0.6)",
                  }}
                >
                  Số tiền
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  {formatAmount(order.amount)}đ
                </span>
              </div>
            </div>

            {/* QR Code */}
            {order.qr_url && (
              <div
                style={{
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    background: "#ffffff",
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 8,
                  }}
                >
                  <img
                    src={order.qr_url}
                    alt="Payment QR Code"
                    style={{
                      width: 200,
                      height: 200,
                      display: "block",
                    }}
                  />
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "rgba(240,230,208,0.5)",
                    margin: 0,
                  }}
                >
                  Quét mã QR bằng app ngân hàng hoặc Ví điện tử
                </p>
              </div>
            )}

            {/* Transfer Instructions */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "rgba(240,230,208,0.5)",
                  marginBottom: 12,
                }}
              >
                Hoặc chuyển khoản với nội dung:
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(201,168,76,0.1)",
                  borderRadius: 8,
                  padding: "12px 16px",
                }}
              >
                <QrCode size={18} color="#c9a84c" />
                <code
                  style={{
                    flex: 1,
                    fontFamily: "monospace",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#c9a84c",
                    letterSpacing: "0.05em",
                  }}
                >
                  {order.description}
                </code>
                <button
                  onClick={copyDescription}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 4,
                    color: copied ? "#4ade80" : "rgba(240,230,208,0.5)",
                    transition: "color 0.2s",
                  }}
                  title="Copy"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: "rgba(240,230,208,0.4)",
                  marginTop: 8,
                  marginBottom: 0,
                }}
              >
                Copy và paste chính xác nội dung này khi chuyển khoản
              </p>
            </div>

            {/* Manual Transfer Info */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "rgba(240,230,208,0.5)",
                  marginBottom: 12,
                  fontWeight: 600,
                }}
              >
                Hoặc chuyển khoản thủ công:
              </p>
              {[
                { label: "Ngân hàng", value: "BIDV" },
                { label: "Số tài khoản", value: "96247MAINGA" },
                { label: "Chủ tài khoản", value: "CA VAN THANH" },
                { label: "Nội dung", value: order.description },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "6px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      color: "rgba(240,230,208,0.45)",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: label === "Nội dung" ? "monospace" : "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: label === "Nội dung" ? "#c9a84c" : "#f0e6d0",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Payment Status */}
            <div
              style={{
                textAlign: "center",
                padding: "12px 16px",
                background: "rgba(201,168,76,0.05)",
                borderRadius: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#c9a84c",
                    animation: "pulse 2s infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "rgba(240,230,208,0.7)",
                  }}
                >
                  Đang chờ thanh toán...
                </span>
                {status === "loading" && (
                  <Loader2 size={14} color="#c9a84c" style={{ animation: "spin 1s linear infinite" }} />
                )}
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: "rgba(240,230,208,0.4)",
                  marginTop: 4,
                  marginBottom: 0,
                }}
              >
                Subscription sẽ được kích hoạt sau khi thanh toán được xác nhận
              </p>
            </div>
          </>
        )}

        {/* Expired State */}
        {timeLeft === 0 && paymentStatus !== "paid" && !loading && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <AlertCircle size={48} color="#ef4444" style={{ marginBottom: 16 }} />
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: "#ef4444",
                marginBottom: 8,
              }}
            >
              Mã thanh toán đã hết hạn
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "rgba(240,230,208,0.6)",
                marginBottom: 24,
              }}
            >
              Vui lòng tạo mã mới
            </p>
            <button
              onClick={createOrder}
              style={{
                background: "linear-gradient(135deg, #c9a84c, #a08030)",
                border: "none",
                borderRadius: 10,
                padding: "12px 24px",
                color: "#0a0806",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Tạo mã mới
            </button>
          </div>
        )}

        {/* Paid Status */}
        {paymentStatus === "paid" && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(74,222,128,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <Check size={32} color="#4ade80" strokeWidth={3} />
            </div>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#4ade80",
                marginBottom: 8,
              }}
            >
              Thanh toán thành công!
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "rgba(240,230,208,0.6)",
                marginBottom: 24,
              }}
            >
              Cảm ơn bạn đã tin tưởng MAINGA
            </p>
            <button
              onClick={handleSuccess}
              style={{
                background: "linear-gradient(135deg, #c9a84c, #a08030)",
                border: "none",
                borderRadius: 10,
                padding: "14px 32px",
                color: "#0a0806",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(201,168,76,0.3)",
              }}
            >
              Bắt đầu sáng tạo →
            </button>
          </div>
        )}

        {/* CSS Animations */}
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>

        {/* Footer */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            color: "rgba(240,230,208,0.35)",
            textAlign: "center",
            marginTop: 16,
            marginBottom: 0,
          }}
        >
          Thanh toán qua SePay • Bảo mật 256-bit
        </p>
      </div>
    </div>
  );
}
