import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";
import "./AccessoriesShowcase.css";

const ACCESSORIES = PRODUCTS.filter((p) => p.category === "Accessories");

export default function AccessoriesShowcase() {
  const [active, setActive] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % ACCESSORIES.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const item = ACCESSORIES[active];

  return (
    <section className="acc-panel">
      <div className="acc-head">
        <span className="acc-eyebrow">03 — Collection</span>
        <h2 className="acc-title">Accessories</h2>
      </div>

      <div className="acc-strip">
        {ACCESSORIES.map((a, i) => (
          <button
            key={a.id}
            type="button"
            className={`acc-thumb ${i === active ? "acc-active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={a.name}
          >
            <img src={a.image} alt="" />
          </button>
        ))}
      </div>

      <div className="acc-detail">
        <div className="acc-detail-img-wrap">
          <img key={item.id} className="acc-detail-img" src={item.image} alt={item.name} />
        </div>
        <div className="acc-detail-info">
          <span className="acc-detail-eyebrow">Accessories</span>
          <h3 className="acc-detail-name">{item.name}</h3>
          <p className="acc-detail-price">₹{item.price}</p>
          <p className="acc-detail-copy">{item.description}</p>
          <button className="bh-add-btn" type="button" onClick={() => addToCart(item)}>
            Add to Bag
          </button>
          <Link className="acc-shop-link" to="/shop?category=Accessories">
            Shop All Accessories →
          </Link>
        </div>
      </div>
    </section>
  );
}