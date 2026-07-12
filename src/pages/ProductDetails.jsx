import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PRODUCTS, SIZES, COLORS } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => String(p.id) === id);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState(COLORS[0].name);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    return (
      <section className="bh-page-content">
        <h1 className="bh-section-title">Product not found</h1>
        <p>We couldn't find that item — it may have been removed.</p>
      </section>
    );
  }

  const handleAdd = () => {
    addToCart({ ...product, id: `${product.id}-${size}-${color}` }, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "70vh",
      }}
    >
      <div style={{ position: "relative", background: "#f4f4f2" }}>
        {!imgLoaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #f4f4f2 25%, #e9e9e6 37%, #f4f4f2 63%)",
              backgroundSize: "400% 100%",
              animation: "bhShimmer 1.4s ease infinite",
            }}
          />
        )}
        <motion.img
          layoutId={`product-image-${product.id}`}
          src={product.image}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        style={{ padding: "60px clamp(24px, 4vw, 64px)", display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <h1 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "2rem", margin: 0 }}>{product.name}</h1>
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label="Toggle wishlist"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.4rem",
              color: isWishlisted(product.id) ? "#e0221a" : "#c9c9c9",
              lineHeight: 1,
            }}
          >
            ♥
          </button>
        </div>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "#e0221a", marginTop: 10 }}>
          ₹{product.price}
        </p>
        <p style={{ color: "#6e6e6e", marginTop: 20, maxWidth: 420, lineHeight: 1.6 }}>{product.description}</p>

        <div style={{ marginTop: 30 }}>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8a8a", marginBottom: 10 }}>
            Size
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                style={{
                  width: 42,
                  height: 42,
                  border: `1px solid ${size === s ? "#111111" : "rgba(17,17,17,0.18)"}`,
                  background: size === s ? "#111111" : "none",
                  color: size === s ? "#ffffff" : "#111111",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 26 }}>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8a8a", marginBottom: 10 }}>
            Color — {color}
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            {COLORS.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColor(c.name)}
                aria-label={c.name}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: c.hex,
                  border: color === c.name ? "2px solid #e0221a" : "2px solid rgba(17,17,17,0.15)",
                  cursor: "pointer",
                  transform: color === c.name ? "scale(1.12)" : "scale(1)",
                  transition: "all 0.2s ease",
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 30 }}>
          <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(17,17,17,0.15)" }}>
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              style={{ width: 36, height: 36, background: "none", border: "none", cursor: "pointer", fontSize: "1rem" }}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span style={{ width: 30, textAlign: "center", fontSize: "0.9rem" }}>{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              style={{ width: 36, height: 36, background: "none", border: "none", cursor: "pointer", fontSize: "1rem" }}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <button className="bh-add-btn" style={{ marginTop: 20, width: 220 }} onClick={handleAdd}>
          {justAdded ? "Added ✓" : "Add to Cart"}
        </button>
      </motion.div>
    </section>
  );
}