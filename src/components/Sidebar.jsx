import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      <div
        className={`sidebar-overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        <h2>BUSHIDO</h2>

        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/collections" onClick={() => setOpen(false)}>Collections</Link>
        <Link to="/wishlist" onClick={() => setOpen(false)}>Wishlist</Link>
        <Link to="/cart" onClick={() => setOpen(false)}>Bag</Link>
        <Link to="/about" onClick={() => setOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
      </aside>
    </>
  );
}