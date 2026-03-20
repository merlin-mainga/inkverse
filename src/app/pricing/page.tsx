"use client";

import { useState } from "react";
import { Check, X, CreditCard, Smartphone, QrCode, ArrowLeft, Copy, CheckCircle } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  notIncluded: string[];
  popular?: boolean;
};

type PaymentMethod = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
};

const plans: Plan[] = [
  {
    id: "free",
    name: "Miễn Phí",
    price: 0,
    description: "Dành cho người mới bắt đầu",
    features: [
      "3 manga miễn phí mỗi tháng",
      "Đọc manga cơ bản",
      "Tạo tài khoản dễ dàng",
      "Hỗ trợ cộng đồng",
    ],
    notIncluded: [
      "Tạo manga bằng AI",
      "MAINGA Lab",
      "Không giới hạn",
      "Ưu tiên xử lý",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: 49000,
    description: "Dành cho người muốn trải nghiệm",
    features: [
      "15 manga mỗi tháng",
      "Tạo manga bằng AI",
      "Chất lượng ảnh cao",
      "MAINGA Lab cơ bản",
      "Hỗ trợ ưu tiên",
    ],
    notIncluded: [
      "Không giới hạn",
      "API access",
      "Team collaboration",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 129000,
    description: "Dành cho creator nghiêm túc",
    features: [
      "60 manga mỗi tháng",
      "Tạo manga bằng AI",
      "Chất lượng 4K",
      "MAINGA Lab đầy đủ",
      "API access",
      "Hỗ trợ 24/7",
    ],
    notIncluded: [
      "Không giới hạn",
      "Team collaboration",
    ],
    popular: true,
  },
  {
    id: "max",
    name: "Max",
    price: 259000,
    description: "Không giới hạn - Ultimate",
    features: [
      "Không giới hạn manga",
      "Tạo manga bằng AI",
      "Chất lượng 4K+",
      "MAINGA Lab đầy đủ",
      "API access không giới hạn",
      "Team collaboration",
      "Hỗ trợ ưu tiên cao cấp",
      "Early access features",
    ],
    notIncluded: [],
  },
];

const paymentMethods: PaymentMethod[] = [
  {
    id: "qr",
    name: "Chuyển khoản QR",
    icon: <QrCode className="w-6 h-6" />,
    description: "Quét mã QR tại ngân hàng hoặc app",
  },
  {
    id: "momo",
    name: "Ví MoMo",
    icon: <Smartphone className="w-6 h-6" />,
    description: "Thanh toán qua ứng dụng MoMo",
  },
  {
    id: "vnpay",
    name: "VNPay",
    icon: <CreditCard className="w-6 h-6" />,
    description: "Thanh toán qua thẻ ATM/Ngân hàng",
  },
];

const bankInfo = {
  bankName: "Vietcombank",
  accountNumber: "1234567890",
  accountName: "CONG TY TNHH MAINGA",
  branch: "Chi nhánh TP.HCM",
};

const momoInfo = {
  phone: "0912 345 678",
  name: "MAINGA Official",
};

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    if (plan.id === "free") {
      // Free plan - redirect to register
      window.location.href = "/login";
    } else {
      setStep(2);
    }
  };

  const handleSelectPayment = (payment: PaymentMethod) => {
    setSelectedPayment(payment);
    setStep(3);
  };

  const handleBack = () => {
    if (step === 3) {
      setSelectedPayment(null);
      setStep(2);
    } else if (step === 2) {
      setSelectedPlan(null);
      setStep(1);
    }
  };

  const handleCopy = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleContactForPayment = () => {
    // Placeholder - sẽ mở cửa sổ chat hoặc email
    window.open("mailto:support@mainga.vn?subject=Thanh toán gói " + selectedPlan?.name);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#f0e6d0]">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#c9a84c]/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#c9a84c] to-[#8b6914] bg-clip-text text-transparent">
            Bảng Giá
          </h1>
          <p className="text-lg text-[#f0e6d0]/70 max-w-2xl mx-auto">
            Chọn gói phù hợp với nhu cầu sáng tạo manga của bạn
          </p>
        </div>

        {/* Progress Steps */}
        {selectedPlan && selectedPlan.id !== "free" && (
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-[#c9a84c]" : "text-[#f0e6d0]/40"}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 1 ? "bg-[#c9a84c] text-[#080808]" : "bg-[#f0e6d0]/20"
              }`}>1</span>
              <span className="hidden sm:inline">Chọn gói</span>
            </div>
            <div className={`w-12 h-px ${step >= 2 ? "bg-[#c9a84c]" : "bg-[#f0e6d0]/20"}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-[#c9a84c]" : "text-[#f0e6d0]/40"}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 2 ? "bg-[#c9a84c] text-[#080808]" : "bg-[#f0e6d0]/20"
              }`}>2</span>
              <span className="hidden sm:inline">Thanh toán</span>
            </div>
            <div className={`w-12 h-px ${step >= 3 ? "bg-[#c9a84c]" : "bg-[#f0e6d0]/20"}`} />
            <div className={`flex items-center gap-2 ${step >= 3 ? "text-[#c9a84c]" : "text-[#f0e6d0]/40"}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 3 ? "bg-[#c9a84c] text-[#080808]" : "bg-[#f0e6d0]/20"
              }`}>3</span>
              <span className="hidden sm:inline">Hoàn tất</span>
            </div>
          </div>
        )}

        {/* Step 1: Choose Plan */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer group ${
                  plan.popular
                    ? "bg-gradient-to-b from-[#c9a84c]/20 to-[#8b6914]/10 border-2 border-[#c9a84c]"
                    : "bg-[#1a1a1a] border border-[#f0e6d0]/10 hover:border-[#c9a84c]/50"
                }`}
                onClick={() => handleSelectPlan(plan)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#c9a84c] text-[#080808] text-sm font-bold rounded-full">
                    PHỔ BIẾN NHẤT
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-[#f0e6d0]/60">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold">{formatPrice(plan.price)}</span>
                  <span className="text-[#f0e6d0]/60">/tháng</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#c9a84c] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <li key={`not-${i}`} className="flex items-start gap-2 text-sm text-[#f0e6d0]/40">
                      <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                    plan.popular
                      ? "bg-[#c9a84c] text-[#080808] hover:bg-[#d4b65c]"
                      : "bg-[#f0e6d0]/10 hover:bg-[#f0e6d0]/20"
                  }`}
                >
                  {plan.id === "free" ? "Bắt đầu miễn phí" : `Chọn ${plan.name}`}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Step 2: Choose Payment Method */}
        {step === 2 && selectedPlan && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-[#f0e6d0]/60 hover:text-[#c9a84c] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại chọn gói
            </button>

            <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#f0e6d0]/10">
              <div className="text-center mb-8">
                <p className="text-[#f0e6d0]/60 mb-2">Bạn đã chọn gói</p>
                <h2 className="text-2xl font-bold text-[#c9a84c]">{selectedPlan.name}</h2>
                <p className="text-3xl font-bold mt-2">{formatPrice(selectedPlan.price)}/tháng</p>
              </div>

              <h3 className="text-lg font-bold mb-4 text-center">Chọn hình thức thanh toán</h3>
              
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handleSelectPayment(method)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#0a0a0a] border border-[#f0e6d0]/10 hover:border-[#c9a84c]/50 transition-all text-left"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c]">
                      {method.icon}
                    </div>
                    <div>
                      <p className="font-bold">{method.name}</p>
                      <p className="text-sm text-[#f0e6d0]/60">{method.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment Details */}
        {step === 3 && selectedPlan && selectedPayment && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-[#f0e6d0]/60 hover:text-[#c9a84c] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại chọn thanh toán
            </button>

            <div className="bg-[#1a1a1a] rounded-2xl border border-[#f0e6d0]/10 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#c9a84c]/20 to-[#8b6914]/10 p-6 text-center">
                <p className="text-[#f0e6d0]/60 mb-1">Thanh toán gói</p>
                <h2 className="text-2xl font-bold text-[#c9a84c]">{selectedPlan.name}</h2>
                <p className="text-3xl font-bold mt-2">{formatPrice(selectedPlan.price)}</p>
              </div>

              {/* Payment Info */}
              <div className="p-6">
                {selectedPayment.id === "qr" && (
                  <div className="text-center">
                    <div className="bg-white rounded-xl p-6 inline-block mb-6">
                      {/* Placeholder QR Code */}
                      <div className="w-48 h-48 bg-[#f0e6d0] rounded-lg flex items-center justify-center">
                        <QrCode className="w-32 h-32 text-[#080808]" />
                      </div>
                    </div>
                    
                    <div className="bg-[#0a0a0a] rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[#f0e6d0]/60">Ngân hàng:</span>
                        <span className="font-bold">{bankInfo.bankName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#f0e6d0]/60">Số tài khoản:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold font-mono">{bankInfo.accountNumber}</span>
                          <button
                            onClick={() => handleCopy(bankInfo.accountNumber, "bank")}
                            className="p-1 hover:text-[#c9a84c] transition-colors"
                          >
                            {copied === "bank" ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#f0e6d0]/60">Tên tài khoản:</span>
                        <span className="font-bold">{bankInfo.accountName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#f0e6d0]/60">Chi nhánh:</span>
                        <span className="font-bold">{bankInfo.branch}</span>
                      </div>
                    </div>

                    <p className="text-sm text-[#f0e6d0]/60 mt-4">
                      Nội dung chuyển khoản: <span className="text-[#c9a84c] font-bold">MAINGA {selectedPlan.name.toUpperCase()} [email của bạn]</span>
                    </p>
                  </div>
                )}

                {selectedPayment.id === "momo" && (
                  <div className="text-center">
                    <div className="bg-[#a50064] rounded-xl p-6 inline-block mb-6">
                      <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
                        <Smartphone className="w-32 h-32 text-[#a50064]" />
                      </div>
                    </div>
                    
                    <div className="bg-[#0a0a0a] rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[#f0e6d0]/60">Số điện thoại:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{momoInfo.phone}</span>
                          <button
                            onClick={() => handleCopy(momoInfo.phone, "momo")}
                            className="p-1 hover:text-[#c9a84c] transition-colors"
                          >
                            {copied === "momo" ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#f0e6d0]/60">Tên:</span>
                        <span className="font-bold">{momoInfo.name}</span>
                      </div>
                    </div>

                    <a
                      href="https://momo.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-6 py-3 bg-[#a50064] text-white font-bold rounded-lg hover:bg-[#bf0064] transition-colors"
                    >
                      Mở ứng dụng MoMo
                    </a>
                  </div>
                )}

                {selectedPayment.id === "vnpay" && (
                  <div className="text-center">
                    <div className="bg-[#004b8d] rounded-xl p-6 inline-block mb-6">
                      <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
                        <CreditCard className="w-32 h-32 text-[#004b8d]" />
                      </div>
                    </div>
                    
                    <p className="text-[#f0e6d0]/70 mb-6">
                      Thanh toán qua cổng VNPay với thẻ ATM hoặc ngân hàng
                    </p>

                    <a
                      href="#"
                      className="inline-block px-8 py-3 bg-[#004b8d] text-white font-bold rounded-lg hover:bg-[#005aa3] transition-colors"
                    >
                      Thanh toán qua VNPay
                    </a>
                  </div>
                )}

                {/* Note */}
                <div className="mt-8 p-4 bg-[#c9a84c]/10 rounded-xl border border-[#c9a84c]/20">
                  <p className="text-sm text-[#f0e6d0]/80">
                    <span className="text-[#c9a84c] font-bold">Lưu ý:</span> Sau khi thanh toán, vui lòng gửi email xác nhận đến{" "}
                    <button
                      onClick={handleContactForPayment}
                      className="text-[#c9a84c] hover:underline"
                    >
                      support@mainga.vn
                    </button>{" "}
                    hoặc liên hệ fanpage để kích hoạt gói dịch vụ trong vòng 24 giờ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-8">Câu hỏi thường gặp</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#f0e6d0]/10">
              <h3 className="font-bold mb-2">Thanh toán có an toàn không?</h3>
              <p className="text-sm text-[#f0e6d0]/60">
                Tất cả các phương thức thanh toán đều được bảo mật. Chúng tôi không lưu trữ thông tin thẻ của bạn.
              </p>
            </div>
            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#f0e6d0]/10">
              <h3 className="font-bold mb-2">Tôi có thể hủy gói không?</h3>
              <p className="text-sm text-[#f0e6d0]/60">
                Bạn có thể hủy gói bất kỳ lúc nào. Gói sẽ được duy trì đến cuối chu kỳ thanh toán.
              </p>
            </div>
            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#f0e6d0]/10">
              <h3 className="font-bold mb-2">Làm sao để được hoàn tiền?</h3>
              <p className="text-sm text-[#f0e6d0]/60">
                Liên hệ support@mainga.vn trong vòng 7 ngày nếu bạn không hài lòng với dịch vụ.
              </p>
            </div>
            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#f0e6d0]/10">
              <h3 className="font-bold mb-2">Có gói theo năm không?</h3>
              <p className="text-sm text-[#f0e6d0]/60">
                Có, chúng tôi cung cấp giảm giá 20% cho các gói trả trước theo năm. Liên hệ để biết thêm chi tiết.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
