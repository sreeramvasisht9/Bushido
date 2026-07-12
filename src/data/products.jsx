import denimJacket from "../assets/images/Denim Jacket.jpeg";
import denim from "../assets/images/Denim.jpeg";
import leatherBelt from "../assets/images/Leather Belt.jpeg";
import linenShirt from "../assets/images/Lenin Shirt.jpeg";
import ogBoots from "../assets/images/OG Boots.jpeg";
import oversize from "../assets/images/Oversize.jpeg";
import trousers from "../assets/images/Trousers.jpeg";
import warriorShoes from "../assets/images/Warrior Shoes.jpeg";
import cap from "../assets/images/cap.jpeg";

export const SIZES = ["S", "M", "L", "XL"];
export const COLORS = [
  { name: "Black", hex: "#111111" },
  { name: "Ivory", hex: "#f4f1ea" },
  { name: "Charcoal", hex: "#4b4b4b" },
];

export const PRODUCTS = [
  {
    id: 1,
    name: "Iaido Denim Jacket",
    price: 1599,
    category: "Apparel",
    image: denimJacket,
    badge: "New",
    description:
      "A rigid selvedge denim jacket built for movement — reinforced shoulder seams and a cut wide enough for a full draw. Breaks in the way a good blade wears: slowly, and better with use.",
  },
  {
    id: 2,
    name: "Ronin Overshirt",
    price: 1199,
    category: "Apparel",
    image: oversize,
    badge: "New",
    description:
      "An oversized brushed-cotton overshirt meant to layer. Boxy through the body, tapered at the cuff, with a single chest pocket — equally at home over a tee or worn open as a light jacket.",
  },
  {
    id: 3,
    name: "Linen Shirt",
    price: 1299,
    category: "Apparel",
    image: linenShirt,
    description:
      "Mid-weight linen, garment-washed for drape from the first wear. A relaxed collar and dropped shoulder keep it easy in heat — the kind of shirt you reach for without thinking.",
  },
  {
    id: 4,
    name: "Hakama Wide Trouser",
    price: 1799,
    category: "Apparel",
    image: trousers,
    description:
      "Wide-leg trousers inspired by the traditional hakama, modernized with a tapered ankle and a flat waistband. Full range of motion without the volume getting in your way.",
  },
  {
    id: 5,
    name: "Selvedge Denim Jeans",
    price: 1999,
    category: "Apparel",
    image: denim,
    description:
      "14oz selvedge denim, straight through the leg, cut with just enough room to move. Unwashed for a break-in that's entirely yours — every crease earned, not printed on.",
  },
  {
    id: 6,
    name: "Obi Leather Belt",
    price: 399,
    category: "Accessories",
    image: leatherBelt,
    description:
      "Full-grain leather belt, hand-cut and edge-burnished, with a solid brass buckle that darkens with age. Built to outlast the jeans it's holding up.",
  },
  {
    id: 9,
    name: "Ronin Cap",
    price: 499,
    category: "Accessories",
    image: cap,
    badge: "New",
    description:
      "A structured six-panel cap in brushed cotton twill, with a low profile and a subtly curved brim. Understated enough for every day, sturdy enough to hold its shape for years.",
  },
  {
    id: 7,
    name: "Tabi OG Boots",
    price: 4999,
    category: "Footwear",
    image: ogBoots,
    description:
      "Split-toe leather boots with a hand-finished sole and a low profile built for long days. Structured enough to hold shape, supple enough to move like they've always been yours.",
  },
  {
    id: 8,
    name: "Warrior Shoes",
    price: 2999,
    category: "Footwear",
    image: warriorShoes,
    description:
      "A low-profile leather trainer built on a single-piece sole for quiet movement. Minimal branding, maximum durability — made for everyday wear, not the shelf.",
  },
];

export const FILTERS = ["All", "Apparel", "Accessories", "Footwear"];