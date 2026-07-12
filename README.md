<div align="center">

# 道 BUSHIDO

**A Japanese-inspired streetwear storefront — built as a hands-on React learning project.**

</div>

---

## About

Bushido is a front-end e-commerce storefront covering Apparel, Footwear, and Accessories, designed around a dark, oxblood-accented, editorial aesthetic. It's a portfolio/learning project focused on visual polish, animation fidelity, and a cohesive brand feel — not a production storefront with a real backend.

## Features

- **Animated homepage showcase** — three full-viewport, scroll-snapped panels, each with a distinct interaction:
  - **Clothing** — a manually-rotated 3D ring of garment photos, built with Three.js, with true-color unlit materials and a soft vignette blend into the dark backdrop
  - **Footwear** — an auto-advancing thumbnail strip with a large detail panel
  - **Accessories** — a CSS keyframe reveal with the same thumbnail/detail pattern
- **Shop page** — category filtering and live search (`?category=`, `?search=` query params)
- **Product detail page** — size/color selectors, quantity stepper, shared-element image transition from the grid (Framer Motion `layoutId`)
- **Cart & Wishlist** — persisted to `localStorage`, global state via React Context
- **Checkout flow** — order summary + shipping form (demo only — no real payment processing)
- **Fully responsive** — custom breakpoints down to 420px

## Tech Stack

| Tool | Purpose |
|---|---|
| [React](https://react.dev) + [Vite](https://vitejs.dev) | UI + build tooling |
| [React Router](https://reactrouter.com) | Client-side routing |
| [Framer Motion](https://www.framer.com/motion/) | Page transitions, shared-element animations |
| [GSAP](https://gsap.com) + ScrollTrigger | Scroll-driven reveals |
| [Three.js](https://threejs.org) | 3D intro animation and the Clothing showcase ring |
| React Context + `localStorage` | Cart & wishlist state/persistence |

## Getting Started

```bash
# clone the repo
git clone https://github.com/YOUR-USERNAME/bushido.git
cd bushido

# install dependencies
npm install

# start the dev server
npm run dev
```

The app will be running at `http://localhost:5173`.

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Project Structure

```
src/
├── assets/            # images, fonts, logo
├── components/        # Layout, Sidebar, showcases, shared UI
├── context/           # CartContext, WishlistContext
├── data/               products.js — product catalog, sizes, colors, filters
├── pages/              Home, Shop, ProductDetails, Cart, Wishlist, Checkout, etc.
└── router/             AppRouter.jsx — all route definitions
```

## Known Limitations

- **No backend** — the product catalog is a static array in `src/data/products.js`. Search/filtering happens entirely client-side.
- **No real authentication** — the Login page is UI-only; cart/wishlist are tied to the browser (`localStorage`), not a user account.
- **No real payment processing** — Checkout's "Place Order" clears the cart and shows a confirmation message; nothing is actually charged or persisted server-side.

## License

This is a personal learning/portfolio project. Feel free to explore the code, but product photography and the Bushido name/branding are not licensed for reuse.
# Bushido
# Bushido
