import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PRODUCTS, SIZES, COLORS } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./ProductDetails.css";

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
    <section className="pd-section">
      <div className="pd-image-wrap">
        {!imgLoaded && <div className="pd-image-shimmer" />}
        <motion.img
          layoutId={`product-image-${product.id}`}
          className="pd-image"
          src={product.image}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: imgLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="pd-info"
      >
        <div className="pd-header-row">
          <h1 className="pd-name">{product.name}</h1>
          <button
            type="button"
            className="pd-wishlist-btn"
            onClick={() => toggleWishlist(product)}
            aria-label="Toggle wishlist"
            style={{ color: isWishlisted(product.id) ? "#e0221a" : "#c9c9c9" }}
          >
            ♥
          </button>
        </div>

        <p className="pd-price">₹{product.price}</p>
        <p className="pd-desc">{product.description}</p>

        <div className="pd-option-group">
          <p className="pd-option-label">Size</p>
          <div className="pd-size-row">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`pd-size-btn ${size === s ? "pd-active" : ""}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="pd-option-group">
          <p className="pd-option-label">Color — {color}</p>
          <div className="pd-color-row">
            {COLORS.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColor(c.name)}
                aria-label={c.name}
                className={`pd-color-swatch ${color === c.name ? "pd-active" : ""}`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        <div className="pd-qty-row">
          <div className="pd-qty-box">
            <button
              type="button"
              className="pd-qty-btn"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="pd-qty-value">{qty}</span>
            <button
              type="button"
              className="pd-qty-btn"
              onClick={() => setQty((q) => q + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <button className="bh-add-btn pd-add-btn" onClick={handleAdd}>
          {justAdded ? "Added ✓" : "Add to Cart"}
        </button>
      </motion.div>
    </section>
  );
}