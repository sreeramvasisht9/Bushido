import { useState } from "react";
import { useOutlet, useLocation, useNavigate, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import BackButton from "./BackButton";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "../pages/Home.css";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const outlet = useOutlet();
  const isHome = location.pathname === "/";
  const { cartCount } = useCart();
  const { items: wishlistItems } = useWishlist();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
  };

  return (
    <div className="bh-page">
      <Sidebar open={menuOpen} setOpen={setMenuOpen} />

      {/* ---------- Utility bar ---------- */}
      <div className="bh-utility">
        <span>FIND A STORE</span>
        <span>EN · ₹ INR</span>
      </div>

      {/* ---------- Main nav ---------- */}
      <header className="bh-nav">
        <button className="bh-nav-icon-btn" onClick={() => setMenuOpen(true)} aria-label="Menu">
          ☰
        </button>

        <div className="bh-nav-left">
          <span className="bh-seal">道</span>
          <span className="bh-wordmark">BUSHIDO</span>
        </div>

        <div className="bh-nav-right">
          <button className="bh-nav-text-link" type="button" onClick={() => setSearchOpen((v) => !v)}>
            Search
          </button>
          <Link className="bh-nav-text-link" to="/wishlist">
            Wishlist <span className="bh-nav-count">{wishlistItems.length}</span>
          </Link>
          <Link className="bh-nav-text-link" to="/cart">
            Bag <span className="bh-nav-count">{cartCount}</span>
          </Link>
          <Link className="bh-nav-text-link" to="/login">
            Log In
          </Link>
        </div>

        {searchOpen && (
          <form className="bh-search-bar" onSubmit={handleSearchSubmit}>
            <input
              autoFocus
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search products"
            />
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">
              ✕
            </button>
          </form>
        )}
      </header>

      {!isHome && <BackButton />}

      <main>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="bh-footer" id="journal">
        <div className="bh-newsletter-row">
          <div>
            <span className="bh-seal bh-seal-dark">道</span>
            <span className="bh-wordmark">BUSHIDO</span>
          </div>
          <div className="bh-newsletter">
            <p>Join the dojo. Get early access to new drops.</p>
            <div className="bh-newsletter-input">
              <input type="email" placeholder="you@email.com" />
              <button type="button">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="bh-footer-links">
          <div>
            <h4>Customer Service</h4>
            <Link to="/contact">Contact Us</Link>
          </div>
          <div>
            <h4>Information</h4>
            <Link to="/about">About Bushido</Link>
          </div>
          <div>
            <h4>Shop</h4>
            <Link to="/collections">Collections</Link>
          </div>
          <div>
            <h4>Follow</h4>
            <a href="#">Instagram</a>
          </div>
        </div>

        <div className="bh-footer-region">
          <span>United States · English</span>
          <span>© {new Date().getFullYear()} Bushido. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
