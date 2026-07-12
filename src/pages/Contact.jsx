import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true); 
  };

  return (
    <section className="bh-page-content" style={{ maxWidth: 480 }}>
      <h1 className="bh-section-title">Contact Us</h1>
      <p>Questions about an order, a piece, or a collaboration — we read everything.</p>

      {sent ? (
        <p style={{ marginTop: 24, color: "#111111" }}>Thank you — we'll be in touch shortly.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            type="text"
            placeholder="Name"
            required
            style={{ padding: "12px 14px", border: "1px solid rgba(17,17,17,0.12)", fontSize: "0.9rem" }}
          />
          <input
            type="email"
            placeholder="Email"
            required
            style={{ padding: "12px 14px", border: "1px solid rgba(17,17,17,0.12)", fontSize: "0.9rem" }}
          />
          <textarea
            placeholder="Message"
            required
            rows={5}
            style={{ padding: "12px 14px", border: "1px solid rgba(17,17,17,0.12)", fontSize: "0.9rem", resize: "vertical" }}
          />
          <button className="bh-add-btn" type="submit" style={{ marginTop: 6 }}>
            Send Message
          </button>
        </form>
      )}
    </section>
  );
}
