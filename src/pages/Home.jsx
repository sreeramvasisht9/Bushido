import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";
import CategoryShowcase from "../components/CategoryShowcase";
import { PRODUCTS, FILTERS } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const NEW_IN_FILTERS = FILTERS.filter((f) => f !== "All");

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("Apparel");
  const [loadedImages, setLoadedImages] = useState({});
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const filtered = PRODUCTS.filter(
    (p) => p.category === activeFilter && p.name !== "Selvedge Denim Jeans"
  );

  const markLoaded = (id) => setLoadedImages((prev) => ({ ...prev, [id]: true }));

  return (
    <>
      <CategoryShowcase />

      <section className="bh-products" id="new">
        <div className="bh-products-head">
          <h2 className="bh-section-title">New In</h2>
          <span className="bh-products-count">{filtered.length} items</span>
        </div>

        <div className="bh-filter-bar">
          {NEW_IN_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`bh-filter-chip ${activeFilter === f ? "bh-active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="bh-product-grid">
          {filtered.map((p) => (
            <article className="bh-product-card" key={p.id}>
              {p.badge && <span className="bh-badge">{p.badge}</span>}
              <button
                className={`bh-wishlist-btn ${isWishlisted(p.id) ? "bh-active" : ""}`}
                type="button"
                aria-label="Add to wishlist"
                onClick={() => toggleWishlist(p)}
              >
                ♥
              </button>

              <Link className="bh-product-img-wrap" to={`/product/${p.id}`}>
                <motion.img
                  layoutId={`product-image-${p.id}`}
                  className={`bh-img-a bh-img-fade ${loadedImages[p.id] ? "" : "bh-loading"}`}
                  src={p.image}
                  alt={p.name}
                  onLoad={() => markLoaded(p.id)}
                />
                <button
                  className="bh-quickadd-btn"
                  type="button"
                  aria-label={`Add ${p.name} to bag`}
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(p);
                  }}
                >
                  +
                </button>
              </Link>

              <div className="bh-product-info">
                <h3>{p.name}</h3>
                <span className="bh-price">₹{p.price}</span>
              </div>
            </article>
          ))}

          {filtered.length === 0 && <p className="bh-empty">No pieces in this category yet.</p>}
        </div>
      </section>

      <section className="bh-editorial">
        <img src="https://picsum.photos/seed/bushido-dojo-editorial/1600/900" alt="" />
        <div className="bh-editorial-text">
          <span className="bh-hero-eyebrow">THE JOURNAL</span>
          <p>敏 — cut from discipline, worn as modern form.</p>
          <Link to="/about">Read the Story →</Link>
        </div>
      </section>
    </>
  );
}