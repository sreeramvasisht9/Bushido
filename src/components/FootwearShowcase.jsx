import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";
import "./FootwearShowcase.css";

const SHOES = PRODUCTS.filter((p) => p.category === "Footwear");

export default function FootwearShowcase() {
  const [active, setActive] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SHOES.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const shoe = SHOES[active];

  return (
    <section className="fs-panel">
      <div className="fs-head">
        <span className="fs-eyebrow">02 — Collection</span>
        <h2 className="fs-title">Footwear</h2>
      </div>

      <div className="fs-strip">
        {SHOES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`fs-thumb ${i === active ? "fs-active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={s.name}
          >
            <img src={s.image} alt="" />
          </button>
        ))}
      </div>

      <div className="fs-detail">
        <div className="fs-detail-img-wrap">
          <img key={shoe.id} className="fs-detail-img" src={shoe.image} alt={shoe.name} />
        </div>
        <div className="fs-detail-info">
          <span className="fs-detail-eyebrow">Footwear</span>
          <h3 className="fs-detail-name">{shoe.name}</h3>
          <p className="fs-detail-price">₹{shoe.price}</p>
          <p className="fs-detail-copy">
            Full-grain leather, hand-finished sole. Cut from the same discipline as everything else we make.
          </p>
          <button className="bh-add-btn" type="button" onClick={() => addToCart(shoe)}>
            Add to Bag
          </button>
          <Link className="fs-shop-link" to="/shop?category=Footwear">
            Shop All Footwear →
          </Link>
        </div>
      </div>
    </section>
  );
}