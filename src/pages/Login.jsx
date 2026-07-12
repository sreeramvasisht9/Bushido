import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); 
  };

  return (
    <section className="bh-page-content" style={{ maxWidth: 380 }}>
      <h1 className="bh-section-title">Log In</h1>
      <p>Access your orders, wishlist, and saved details.</p>

      {submitted ? (
        <p style={{ marginTop: 24, color: "#111111" }}>Thanks — that would sign you in once auth is wired up.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            type="email"
            placeholder="Email"
            required
            style={{ padding: "12px 0", border: "none", borderBottom: "1px solid rgba(17,17,17,0.15)", fontSize: "0.9rem", background: "none" }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            style={{ padding: "12px 0", border: "none", borderBottom: "1px solid rgba(17,17,17,0.15)", fontSize: "0.9rem", background: "none" }}
          />
          <button className="bh-add-btn" type="submit" style={{ marginTop: 10 }}>
            Log In
          </button>
        </form>
      )}

      <p style={{ marginTop: 24, fontSize: "0.82rem" }}>
        New here? <Link to="/contact" style={{ color: "#e0221a" }}>Get in touch</Link> to set up an account.
      </p>
    </section>
  );
}
