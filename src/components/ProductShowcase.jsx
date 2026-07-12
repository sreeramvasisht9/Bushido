import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, SIZES, COLORS } from "../data/products";
import { useCart } from "../context/CartContext";

const SHOWCASE_ITEMS = PRODUCTS.filter((p) => p.category === "Apparel").slice(0, 2);

export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedId, setExpandedId] = useState(null);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState(COLORS[0].name);
  const { addToCart } = useCart();

  const expandedProduct = SHOWCASE_ITEMS.find((p) => p.id === expandedId);

  const expand = (id) => {
    setActiveIndex(SHOWCASE_ITEMS.findIndex((p) => p.id === id));
    setExpandedId(id);
  };
  const collapse = () => setExpandedId(null);

  const handleAdd = () => {
    if (!expandedProduct) return;
    addToCart({ ...expandedProduct, id: `${expandedProduct.id}-${size}-${color}` });
  };

  return (
    <div className="ps-wrap">
      <AnimatePresence mode="popLayout">
        {!expandedId ? (
          <motion.div key="carousel" className="ps-carousel" exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {SHOWCASE_ITEMS.map((p, i) => {
              const isActive = i === activeIndex;
              return (
                <motion.div
                  key={p.id}
                  layoutId={`card-${p.id}`}
                  onClick={() => (isActive ? expand(p.id) : setActiveIndex(i))}
                  animate={{ scale: isActive ? 1 : 0.82, opacity: isActive ? 1 : 0.45 }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className={`ps-card ${isActive ? "ps-card--active" : ""}`}
                >
                  <img src={p.image} alt={p.name} className="ps-card-img" />
                  <div className="ps-card-info">
                    <p className="ps-card-name">{p.name}</p>
                    <div className="ps-card-row">
                      <span className="ps-card-price">₹{p.price}</span>
                      {isActive && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            expand(p.id);
                          }}
                          aria-label={`Expand ${p.name}`}
                          className="ps-plus-btn"
                        >
                          +
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div key="detail" className="ps-detail">
            <motion.div
              layoutId={`card-${expandedProduct.id}`}
              className="ps-detail-left"
              transition={{ type: "spring", stiffness: 220, damping: 30 }}
            >
              <img src={expandedProduct.image} alt={expandedProduct.name} className="ps-detail-img" />
              <button onClick={collapse} className="ps-back-btn">
                <span aria-hidden="true">←</span> Back
              </button>
            </motion.div>

            <motion.div
              className="ps-detail-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <h2 className="ps-detail-title">{expandedProduct.name}</h2>
              <p className="ps-detail-price">₹{expandedProduct.price}</p>

              <div className="ps-option-group">
                <p className="ps-option-label">Size</p>
                <div className="ps-size-row">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`ps-size-btn ${size === s ? "ps-active" : ""}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="ps-option-group">
                <p className="ps-option-label">Color — {color}</p>
                <div className="ps-color-row">
                  {COLORS.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setColor(c.name)}
                      aria-label={c.name}
                      className={`ps-color-swatch ${color === c.name ? "ps-active" : ""}`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              <button className="ps-add-btn" onClick={handleAdd}>
                Add to Cart
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}