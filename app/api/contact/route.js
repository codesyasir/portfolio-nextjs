// app/api/contact/route.js
// This is the Next.js version of mailer.php
// It receives form data and sends you an email using Web3Forms (free)

import { STRAPI_URL } from "@/lib/config";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate
    if (!name || !email || !message) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    // 1) Send email via Web3Forms (FREE — 250 emails/month)
    // Get your key at https://web3forms.com
    const emailResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY, // Set this in Vercel env variables
        name: name,
        email: email,
        message: message,
        subject: `New message from ${name} — YasirCodes Portfolio`,
        from_name: "YasirCodes Portfolio",
      }),
    });

    const emailResult = await emailResponse.json();

    // 2) Also save to Strapi as backup
    try {
      await fetch(`${STRAPI_URL}/api/contact-messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { name, email, message } }),
      });
    } catch {
      // Strapi save is optional, don't fail if it doesn't work
    }

    if (emailResult.success) {
      return Response.json({ success: true, message: "Email sent!" });
    } else {
      return Response.json({ success: true, message: "Message saved (email service unavailable)" });
    }
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}