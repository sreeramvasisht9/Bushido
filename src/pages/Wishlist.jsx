import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <section className="bh-page-content">
        <h1 className="bh-section-title">Your Wishlist</h1>
        <p>Nothing saved yet — tap the heart on any piece to keep it here.</p>
        <Link to="/shop" className="bh-add-btn" style={{ display: "inline-block", marginTop: 20, textDecoration: "none" }}>
          Browse the Shop
        </Link>
      </section>
    );
  }

  return (
    <section className="bh-page-content">
      <h1 className="bh-section-title">Your Wishlist</h1>
      <p>{items.length} item{items.length === 1 ? "" : "s"} saved.</p>

      <div className="bh-product-grid" style={{ marginTop: 30 }}>
        {items.map((item) => (
          <article className="bh-product-card" key={item.id}>
            <button
              className="bh-wishlist-btn bh-active"
              type="button"
              aria-label={`Remove ${item.name} from wishlist`}
              onClick={() => removeFromWishlist(item.id)}
            >
              ♥
            </button>
            <Link className="bh-product-img-wrap" to={`/product/${item.id}`}>
              <img className="bh-img-a" src={item.image} alt={item.name} />
            </Link>
            <div className="bh-product-info">
              <h3>{item.name}</h3>
              <span className="bh-price">₹{item.price}</span>
            </div>
            <button className="bh-add-btn" style={{ marginTop: 10 }} onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}