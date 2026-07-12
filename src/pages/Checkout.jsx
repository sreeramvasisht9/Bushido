import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    clearCart();
    setPlaced(true);
  };

  if (placed) {
    return (
      <section className="bh-page-content">
        <h1 className="bh-section-title">Order Placed</h1>
        <p>Thank you — a confirmation would normally be sent to your email. This is a demo checkout, so nothing was actually charged.</p>
        <Link to="/shop" className="bh-add-btn" style={{ display: "inline-block", marginTop: 20, textDecoration: "none" }}>
          Continue Shopping
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="bh-page-content">
        <h1 className="bh-section-title">Checkout</h1>
        <p>Your bag is empty — add something before checking out.</p>
        <Link to="/shop" className="bh-add-btn" style={{ display: "inline-block", marginTop: 20, textDecoration: "none" }}>
          Browse the Shop
        </Link>
      </section>
    );
  }

  return (
    <section className="bh-page-content" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, maxWidth: 1000 }}>
      <div>
        <h1 className="bh-section-title">Checkout</h1>

        <form onSubmit={handlePlaceOrder} style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8a8a", marginTop: 10 }}>
            Contact
          </p>
          <input type="email" placeholder="Email" required style={inputStyle} />

          <p style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8a8a", marginTop: 10 }}>
            Shipping Address
          </p>
          <input type="text" placeholder="Full name" required style={inputStyle} />
          <input type="text" placeholder="Address" required style={inputStyle} />
          <div style={{ display: "flex", gap: 14 }}>
            <input type="text" placeholder="City" required style={inputStyle} />
            <input type="text" placeholder="ZIP / Postal code" required style={inputStyle} />
          </div>
          <input type="text" placeholder="Country" required style={inputStyle} />

          <button className="bh-add-btn" type="submit" style={{ marginTop: 20 }}>
            Place Order — ₹{cartTotal.toFixed(2)}
          </button>
        </form>
      </div>

      <div>
        <p style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8a8a", marginBottom: 16 }}>
          Order Summary
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {items.map((item) => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem" }}>
              <span>
                {item.name} <span style={{ color: "#8a8a8a" }}>× {item.qty}</span>
              </span>
              <span>₹{(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: "1px solid rgba(17,17,17,0.12)",
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.3rem",
          }}
        >
          <span>Total</span>
          <span>₹{cartTotal.toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
}

const inputStyle = {
  padding: "12px 0",
  border: "none",
  borderBottom: "1px solid rgba(17,17,17,0.15)",
  fontSize: "0.9rem",
  background: "none",
  width: "100%",
};