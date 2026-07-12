import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import gsap from "gsap";
import { PRODUCTS } from "../data/products";
import "./ClothingShowcase.css";

const APPAREL = PRODUCTS.filter((p) => p.category === "Apparel");

export default function ClothingShowcase() {
  const mountRef = useRef(null);
  const groupRef = useRef(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const hintRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // -Scene-
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // -Soft white glow 
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = glowCanvas.height = 512;
    const gctx = glowCanvas.getContext("2d");
    const grad = gctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    grad.addColorStop(0, "rgb(255, 255, 255)");
    grad.addColorStop(1, "rgb(255, 255, 255)");
    gctx.fillStyle = grad;
    gctx.fillRect(0, 0, 512, 512);
    const glowTexture = new THREE.CanvasTexture(glowCanvas);

    const glowSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: glowTexture, transparent: true, depthWrite: false })
    );
    glowSprite.scale.set(11, 11, 1);
    glowSprite.position.set(0, 0, -3);
    scene.add(glowSprite);

    // -Vignette alpha map: white center → transparent edges -
    const vigW = 512;
    const vigH = 682;
    const vigCanvas = document.createElement("canvas");
    vigCanvas.width = vigW;
    vigCanvas.height = vigH;
    const vctx = vigCanvas.getContext("2d");
    const cx = vigW / 2;
    const cy = vigH / 2;
    const cornerDist = Math.sqrt(cx * cx + cy * cy);
    const vgrad = vctx.createRadialGradient(cx, cy, 0, cx, cy, cornerDist);
    vgrad.addColorStop(0, "rgba(255,255,255,1)");
    vgrad.addColorStop(0.45, "rgba(255,255,255,1)");
    vgrad.addColorStop(1, "rgba(255,255,255,0)");
    vctx.fillStyle = vgrad;
    vctx.fillRect(0, 0, vigW, vigH);
    const vignetteTexture = new THREE.CanvasTexture(vigCanvas);

    // -Ring of shirts -
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    const loader = new THREE.TextureLoader();
    const radius = 4.2;
    const count = APPAREL.length;
    const planes = [];

    APPAREL.forEach((product, i) => {
      const texture = loader.load(product.image);
      texture.colorSpace = THREE.SRGBColorSpace;

      const geo = new THREE.PlaneGeometry(2.6, 3.5);
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        alphaMap: vignetteTexture,
        transparent: true,
        opacity: 0,
        toneMapped: false,
      });
      const mesh = new THREE.Mesh(geo, mat);

      const angle = (i / count) * Math.PI * 2;
      mesh.position.set(Math.sin(angle) * radius, 0, Math.cos(angle) * radius);
      mesh.lookAt(0, 0, 0);
      mesh.rotateY(Math.PI);
      mesh.scale.setScalar(0.001);

      group.add(mesh);
      planes.push({ mesh, mat });
    });

    planes.forEach(({ mesh, mat }, i) => {
      gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.9, delay: 0.15 * i, ease: "back.out(1.6)" });
      gsap.to(mat, { opacity: 1, duration: 0.9, delay: 0.15 * i, ease: "power2.out" });
    });

    gsap.to(group.position, {
      y: 0.08,
      duration: 2.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // -Visibility render loop-
    const visibleRef = { current: true };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(mount);

    let rafId;
    const renderLoop = () => {
      if (visibleRef.current) renderer.render(scene, camera);
      rafId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    // -Scroll hint-
    const hideHint = () => {
      gsap.to(hintRef.current, { opacity: 0, duration: 0.4, ease: "power1.out" });
      window.removeEventListener("wheel", hideHint);
      window.removeEventListener("touchmove", hideHint);
    };
    window.addEventListener("wheel", hideHint, { once: true, passive: true });
    window.addEventListener("touchmove", hideHint, { once: true, passive: true });

    // -Resize-
    const handleResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // -Cleanup-
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", hideHint);
      window.removeEventListener("touchmove", hideHint);
      observer.disconnect();
      cancelAnimationFrame(rafId);
      gsap.killTweensOf(group.position);
      glowTexture.dispose();
      glowSprite.material.dispose();
      vignetteTexture.dispose();
      planes.forEach(({ mesh, mat }) => {
        mesh.geometry.dispose();
        mat.map?.dispose();
        mat.dispose();
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  const rotateTo = (nextIndex) => {
    const count = APPAREL.length;
    const wrapped = (nextIndex + count) % count;
    const group = groupRef.current;
    if (!group) return;

    const targetAngle = -(wrapped / count) * Math.PI * 2;
    const current = group.rotation.y;
    let delta = targetAngle - current;
    delta = ((delta + Math.PI) % (Math.PI * 2)) - Math.PI;
    const target = current + delta;

    gsap.to(group.rotation, { y: target, duration: 0.9, ease: "power3.inOut" });

    activeIndexRef.current = wrapped;
    setActiveIndex(wrapped);
  };

  const handlePrev = () => rotateTo(activeIndexRef.current - 1);
  const handleNext = () => rotateTo(activeIndexRef.current + 1);

  const active = APPAREL[activeIndex];

  return (
    <section className="clo-panel">
      <div className="clo-top">
        <span className="clo-meta">01 — Collection</span>
        <h2 className="clo-title">Clothing</h2>
      </div>

      <div className="clo-body">
        <div className="clo-side-info">
          <p className="clo-active-name">
          {active.name} <span className="clo-active-price">₹{active.price}</span>
        </p>
          <Link className="clo-link" to="/shop?category=Apparel">
            Shop Clothing →
          </Link>
        </div>

        <div className="clo-stage">
          <div className="clo-canvas" ref={mountRef} />

          <button className="clo-arrow clo-arrow-left" type="button" onClick={handlePrev} aria-label="Previous item">
            ‹
          </button>
          <button className="clo-arrow clo-arrow-right" type="button" onClick={handleNext} aria-label="Next item">
            ›
          </button>

          <div className="clo-scroll-hint" ref={hintRef}>
            <span className="clo-scroll-chevron">⌄</span>
            <span>Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}