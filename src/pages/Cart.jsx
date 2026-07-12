import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, increaseQty, decreaseQty, removeFromCart, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <section className="bh-page-content">
        <h1 className="bh-section-title">Your Bag</h1>
        <p>Your bag is empty.</p>
        <Link to="/shop" className="bh-add-btn" style={{ display: "inline-block", marginTop: 20, textDecoration: "none" }}>
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="bh-page-content">
      <h1 className="bh-section-title">Your Bag</h1>

      <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 22, maxWidth: 640 }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              borderBottom: "1px solid rgba(17,17,17,0.12)",
              paddingBottom: 18,
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontFamily: "'Shippori Mincho', serif", fontSize: "1.05rem" }}>{item.name}</h3>
              <p style={{ margin: "6px 0 0", color: "#6e6e6e", fontSize: "0.85rem" }}>₹{item.price} each</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(17,17,17,0.15)" }}>
                <button
                  type="button"
                  onClick={() => decreaseQty(item.id)}
                  aria-label={`Decrease quantity of ${item.name}`}
                  style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", fontSize: "1rem" }}
                >
                  −
                </button>
                <span style={{ width: 26, textAlign: "center", fontSize: "0.88rem" }}>{item.qty}</span>
                <button
                  type="button"
                  onClick={() => increaseQty(item.id)}
                  aria-label={`Increase quantity of ${item.name}`}
                  style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", fontSize: "1rem" }}
                >
                  +
                </button>
              </div>

              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", minWidth: 56, textAlign: "right" }}>
                ₹{(item.price * item.qty).toFixed(2)}
              </span>

              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name} from bag`}
                style={{ background: "none", border: "none", color: "#6e6e6e", cursor: "pointer", fontSize: "0.8rem", letterSpacing: "0.05em", textTransform: "uppercase" }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 30, maxWidth: 640, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: "0.9rem", color: "#6e6e6e", textTransform: "uppercase", letterSpacing: "0.08em" }}>Total</span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem" }}>₹{cartTotal.toFixed(2)}</span>
      </div>

      <Link className="bh-add-btn" to="/checkout" style={{ marginTop: 26, width: 240, display: "inline-block", textAlign: "center", textDecoration: "none" }}>
        Checkout
      </Link>
    </section>
  );
}