"use client";
import { useState } from "react";
import { SectionHeader } from "@/components/Cards";
import { T, SITE } from "@/lib/config";

export default function ContactContent({ contact }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { setStatus("fill"); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "a05fc258-490b-4ee2-9afa-0c3a7775bd03",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: "New message from " + form.name + " — YasirCodes Portfolio",
          from_name: "YasirCodes Portfolio",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus(""), 4000);
  };

  const inp = { width: "100%", padding: "14px 18px", background: T.s2, border: `1px solid ${T.border}`, color: T.white, fontFamily: "'Outfit',sans-serif", fontSize: 14, outline: "none", borderRadius: 8, transition: "border 0.3s" };

  return (
    <section style={{ padding: "140px 40px 100px", maxWidth: 700, margin: "0 auto" }} className="mobile-pad">
      <SectionHeader label="05" title="Contact" />
      <p style={{ color: T.gray, fontSize: 16, marginTop: 12, marginBottom: 40 }}>Have a project idea or just want to say hello? Drop me a message.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="mobile-col">
          <input style={inp} placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = T.border} />
          <input style={inp} placeholder="Your email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = T.border} />
        </div>
        <textarea style={{ ...inp, resize: "vertical", minHeight: 150 }} placeholder="Tell me about your project..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = T.border} />
        <button className="btn-primary" onClick={handleSubmit} disabled={status === "sending"} style={{ alignSelf: "flex-start", background: status === "sent" ? T.green : status === "fill" || status === "error" ? T.red : T.accent, opacity: status === "sending" ? 0.6 : 1 }}>
          {status === "sending" ? "Sending..." : status === "sent" ? "✓ Sent!" : status === "fill" ? "Fill all fields" : status === "error" ? "Failed — retry" : "Send message →"}
        </button>
      </div>
      <div style={{ marginTop: 60, padding: "32px 0", borderTop: `1px solid ${T.border}` }}>
        <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Or reach me directly</h4>
        <div className="contact-links" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { label: "Email", value: contact.email, url: `mailto:${contact.email}` },
            { label: "GitHub", value: "@codesyasir", url: contact.github },
            { label: "LinkedIn", value: SITE.name, url: contact.linkedin },
            { label: "Twitter", value: "@yasirmalik", url: contact.twitter },
          ].map((c, i) => (
            <a key={`cl-${i}`} href={c.url} target="_blank" rel="noopener noreferrer" className="card-hover" style={{ padding: "14px 20px", background: T.s2, border: `1px solid ${T.border}`, borderRadius: 10, flex: "1 1 200px" }}>
              <div className="mono" style={{ fontSize: 10, color: T.gray, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>{c.label}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: T.accent }}>{c.value}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}