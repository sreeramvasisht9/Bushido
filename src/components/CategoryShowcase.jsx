import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClothingShowcase from "./ClothingShowcase";
import FootwearShowcase from "./FootwearShowcase";
import AccessoriesShowcase from "./AccessoriesShowcase";
import "./CategoryShowcase.css";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { id: "01", name: "Clothing" },
  { id: "02", name: "Footwear" },
  { id: "03", name: "Accessories" },
];

export default function CategoryShowcase() {
  const wrapRef = useRef(null);
  const panelRefs = useRef([]);
  const [activePanel, setActivePanel] = useState(0);

  useEffect(() => {
    const scroller = wrapRef.current;
    const triggers = [];

    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      const dotTrigger = ScrollTrigger.create({
        trigger: panel,
        scroller,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive) setActivePanel(i);
        },
      });
      triggers.push(dotTrigger);
    });

    return () => triggers.forEach((st) => st.kill());
  }, []);

  const scrollTo = (i) => {
    panelRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="cs-wrap" ref={wrapRef}>
      <div className="cs-dots">
        {CATEGORIES.map((c, i) => (
          <button
            key={c.id}
            type="button"
            aria-label={`Go to ${c.name}`}
            onClick={() => scrollTo(i)}
            className={`cs-dot ${activePanel === i ? "cs-dot-active" : ""}`}
          />
        ))}
      </div>

      {CATEGORIES.map((c, i) => (
        <div key={c.id} className="cs-slide" ref={(el) => (panelRefs.current[i] = el)}>
          {c.name === "Clothing" ? (
            <ClothingShowcase />
          ) : c.name === "Footwear" ? (
            <FootwearShowcase />
          ) : (
            <AccessoriesShowcase />
          )}
        </div>
      ))}
    </div>
  );
}