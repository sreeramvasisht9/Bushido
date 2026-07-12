import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PRODUCTS, FILTERS } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Shop() {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loadedImages, setLoadedImages] = useState({});

  const activeFilter = searchParams.get("category") || "All";
  const searchQuery = searchParams.get("search") || "";
  const filtered = PRODUCTS.filter((p) => {
    const matchesCategory = activeFilter === "All" || p.category === activeFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const setFilter = (f) => {
    const next = {};
    if (f !== "All") next.category = f;
    if (searchQuery) next.search = searchQuery;
    setSearchParams(next);
  };

  const markLoaded = (id) => setLoadedImages((prev) => ({ ...prev, [id]: true }));

  return (
    <section className="bh-page-content">
      <h1 className="bh-section-title">
        {searchQuery ? `Results for "${searchQuery}"` : activeFilter === "All" ? "Shop All" : activeFilter}
      </h1>
      <p>{filtered.length} item{filtered.length === 1 ? "" : "s"}{searchQuery ? "" : " in this collection"}.</p>

      <div className="bh-filter-bar" style={{ marginTop: 20 }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`bh-filter-chip ${activeFilter === f ? "bh-active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bh-product-grid" style={{ marginTop: 30 }}>
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

        {filtered.length === 0 && (
          <p className="bh-empty">{searchQuery ? `No pieces match "${searchQuery}".` : "No items in this category yet."}</p>
        )}
      </div>
    </section>
  );
}