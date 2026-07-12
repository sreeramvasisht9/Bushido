import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";

const COLLECTIONS = ["Apparel", "Accessories", "Footwear"];

export default function Collections() {
  return (
    <section className="bh-page-content">
      <h1 className="bh-section-title">Collections</h1>
      <p>Browse Bushido by category.</p>

      <div className="bh-cat-grid" style={{ marginTop: 30, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {COLLECTIONS.map((c) => {
          const cover = PRODUCTS.find((p) => p.category === c);
          return (
            <Link
              key={c}
              to={`/shop?category=${c}`}
              style={{
                display: "block",
                aspectRatio: "3 / 4",
                border: "1px solid var(--line, rgba(17,17,17,0.12))",
                overflow: "hidden",
                textDecoration: "none",
              }}
            >
              <img
                src={cover.image}
                alt={c}
                style={{ width: "100%", height: "85%", objectFit: "cover", filter: "grayscale(1)" }}
              />
              <span
                style={{
                  display: "block",
                  padding: "10px 12px",
                  fontFamily: "'Shippori Mincho', serif",
                  color: "#111111",
                }}
              >
                {c}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
