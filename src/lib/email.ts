import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, name: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}`;
  
  await resend.emails.send({
    from: "MAINGA <onboarding@resend.dev>",
    to: email,
    subject: "✦ Xác nhận tài khoản MAINGA",
    html: `
      <div style="background:#080808;padding:40px;font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;border:1px solid rgba(201,168,76,0.2);border-radius:16px">
        <div style="text-align:center;margin-bottom:32px">
          <h1 style="font-family:serif;color:#c9a84c;font-size:28px;letter-spacing:0.1em">MAINGA</h1>
          <p style="color:rgba(240,230,208,0.4);font-size:12px;letter-spacing:0.3em">AI MANGA PLATFORM</p>
        </div>
        <h2 style="color:#f0e6d0;font-size:20px;margin-bottom:12px">Xin chào ${name}! 👋</h2>
        <p style="color:rgba(240,230,208,0.6);line-height:1.8;margin-bottom:32px">
          Cảm ơn bạn đã đăng ký tài khoản MAINGA. Click vào nút bên dưới để xác nhận email và bắt đầu khám phá thế giới manga!
        </p>
        <div style="text-align:center;margin-bottom:32px">
          <a href="${url}" style="background:linear-gradient(135deg,#c9a84c,#8b6914);color:#080808;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:0.1em">✦ XÁC NHẬN TÀI KHOẢN</a>
        </div>
        <p style="color:rgba(240,230,208,0.3);font-size:12px;text-align:center">Link có hiệu lực trong 24 giờ. Nếu bạn không đăng ký, hãy bỏ qua email này.</p>
      </div>
    `,
  });
}