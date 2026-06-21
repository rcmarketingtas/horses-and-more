interface EnquiryEmailProps {
  enquiry: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    message: string;
    createdAt: Date;
  };
  productName?: string | null;
}

export async function sendEnquiryEmail({ enquiry, productName }: EnquiryEmailProps) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.STORE_OWNER_EMAIL ?? "owner@horsesandmore.com.au";

  const subject = productName
    ? `New Enquiry: ${productName} — from ${enquiry.name}`
    : `New General Enquiry — from ${enquiry.name}`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 12px;">${subject}</h2>
      ${productName ? `<p><strong>Product:</strong> ${productName}</p>` : ""}
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; font-weight: bold; width: 120px;">Name</td><td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${enquiry.name}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;"><a href="mailto:${enquiry.email}">${enquiry.email}</a></td></tr>
        ${enquiry.phone ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; font-weight: bold;">Phone</td><td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5;">${enquiry.phone}</td></tr>` : ""}
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; font-weight: bold; vertical-align: top;">Message</td><td style="padding: 8px 0; border-bottom: 1px solid #e5e5e5; white-space: pre-wrap;">${enquiry.message}</td></tr>
      </table>
      <p style="color: #888; font-size: 12px;">Received: ${new Date(enquiry.createdAt).toLocaleString("en-AU")}</p>
      <p style="color: #888; font-size: 12px;">Enquiry ID: ${enquiry.id}</p>
      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
      <p style="color: #888; font-size: 11px;">Horses and More — 42 Paddock Lane, Camden NSW 2570</p>
    </div>
  `;

  if (!apiKey) {
    // Dev fallback — log to console
    console.log("\n📧 [DEV] Enquiry email (Resend key not set):", {
      to: toEmail,
      subject,
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      message: enquiry.message,
    });
    return;
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Horses and More <noreply@horsesandmore.com.au>",
      to: toEmail,
      replyTo: enquiry.email,
      subject,
      html,
    });
  } catch (err) {
    console.error("Failed to send email:", err);
    // Don't re-throw — email failure shouldn't fail the enquiry submission
  }
}
