import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import "./BushidoIntro.css";


const TARGET_HORIZONTAL_FOV_DEG = 63;

function verticalFovForAspect(aspect) {
  const hFovRad = THREE.MathUtils.degToRad(TARGET_HORIZONTAL_FOV_DEG);
  const vFovRad = 2 * Math.atan(Math.tan(hFovRad / 2) / aspect);
  return THREE.MathUtils.radToDeg(vFovRad);
}

export default function BushidoIntro({ onComplete }) {
  const mountRef = useRef(null);
  const skipRef = useRef(null);
  const wordmarkRef = useRef(null);
  const taglineRef = useRef(null);
  const enterBtnRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    let width = mount.clientWidth;
    let height = mount.clientHeight;
    let aspect = width / height;

    // -Scene setup-
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.06);

    const camera = new THREE.PerspectiveCamera(verticalFovForAspect(aspect), aspect, 0.1, 100);
    camera.position.set(0, 0.4, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // -Lighting-
    const ambient = new THREE.AmbientLight(0x2b3040, 1.1);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xdfe6f0, 2.1);
    key.position.set(3, 5, 4);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x7a1f1f, 0.6); // oxblood fill
    fill.position.set(-4, -1, 2);
    scene.add(fill);

    const glint = new THREE.PointLight(0xffe6b8, 3, 12, 2);
    glint.position.set(1.2, 1.5, 3);
    scene.add(glint);

    // -Build the katana-
    const swordGroup = new THREE.Group();

    const bladeShape = new THREE.Shape();
    const L = 3.4;
    const W = 0.16;
    bladeShape.moveTo(0, 0);
    bladeShape.lineTo(0, L * 0.88);
    bladeShape.quadraticCurveTo(0, L * 0.97, W * 0.18, L);
    bladeShape.lineTo(-W * 0.85, L * 0.9);
    bladeShape.quadraticCurveTo(-W * 1.05, L * 0.4, -W * 0.7, 0.04);
    bladeShape.lineTo(0, 0);

    const bladeGeo = new THREE.ExtrudeGeometry(bladeShape, {
      depth: 0.035,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.008,
      bevelSegments: 2,
      curveSegments: 24,
    });
    bladeGeo.center();
    bladeGeo.translate(0, L / 2, 0);

    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0xc7cdd6,
      metalness: 0.92,
      roughness: 0.22,
      emissive: 0x1a0d08,
      emissiveIntensity: 0.4,
    });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    swordGroup.add(blade);

    const habaki = new THREE.Mesh(
      new THREE.CylinderGeometry(0.11, 0.12, 0.13, 16),
      new THREE.MeshStandardMaterial({ color: 0xb08d3e, metalness: 0.85, roughness: 0.3 })
    );
    habaki.position.y = 0.03;
    swordGroup.add(habaki);

    const tsuba = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.045, 24),
      new THREE.MeshStandardMaterial({ color: 0x1b1f27, metalness: 0.6, roughness: 0.45 })
    );
    tsuba.position.y = -0.06;
    swordGroup.add(tsuba);

    const wrapCanvas = document.createElement("canvas");
    wrapCanvas.width = wrapCanvas.height = 128;
    const wctx = wrapCanvas.getContext("2d");
    wctx.fillStyle = "#1c2740";
    wctx.fillRect(0, 0, 128, 128);
    wctx.strokeStyle = "#d8cdb0";
    wctx.lineWidth = 5;
    for (let i = -128; i < 256; i += 32) {
      wctx.beginPath();
      wctx.moveTo(i, 0);
      wctx.lineTo(i + 128, 128);
      wctx.stroke();
      wctx.beginPath();
      wctx.moveTo(i, 128);
      wctx.lineTo(i + 128, 0);
      wctx.stroke();
    }
    const wrapTexture = new THREE.CanvasTexture(wrapCanvas);
    wrapTexture.wrapS = wrapTexture.wrapT = THREE.RepeatWrapping;
    wrapTexture.repeat.set(3, 6);

    const hilt = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.045, 0.95, 16),
      new THREE.MeshStandardMaterial({ map: wrapTexture, metalness: 0.1, roughness: 0.8 })
    );
    hilt.position.y = -0.06 - 0.475;
    swordGroup.add(hilt);

    const pommel = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xb08d3e, metalness: 0.85, roughness: 0.3 })
    );
    pommel.position.y = -0.06 - 0.95;
    swordGroup.add(pommel);

    const BASE_ROTATION = -Math.PI / 2;
    const TILT = THREE.MathUtils.degToRad(15);
    swordGroup.rotation.z = BASE_ROTATION + TILT;
    swordGroup.rotation.x = THREE.MathUtils.degToRad(-2);

    swordGroup.position.set(-13, 0.1, 0);
    swordGroup.scale.setScalar(0.85);
    scene.add(swordGroup);

    // -Render loop-
    let rafId;
    const renderLoop = () => {
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    // -Resize handling-
    const handleResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      aspect = width / height;
      camera.aspect = aspect;
      camera.fov = verticalFovForAspect(aspect);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // -Letter reveal setup-
    const letters = wordmarkRef.current
      ? Array.from(wordmarkRef.current.querySelectorAll(".bushido-letter"))
      : [];
    gsap.set(letters, { opacity: 0, x: -24 });
    gsap.set(taglineRef.current, { opacity: 0, y: 10 });
    gsap.set(enterBtnRef.current, { opacity: 0, y: 10, pointerEvents: "none" });

    // -Timeline-
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(swordGroup.position, { x: -0.4, duration: 1.15, ease: "back.out(1.4)" }, 0);
    tl.to(swordGroup.scale, { x: 1, y: 1, z: 1, duration: 1.15, ease: "back.out(1.4)" }, 0);

    tl.to(glint, { intensity: 6.5, duration: 0.12, yoyo: true, repeat: 1 }, 1.05);

    tl.to(swordGroup.position, { x: 2.0, duration: 1.3, ease: "power2.inOut" }, 1.45);
    tl.to(swordGroup.position, { y: 0.5, duration: 1.3, ease: "power2.inOut" }, 1.45);
    tl.to(
      letters,
      { opacity: 1, x: 0, duration: 0.85, ease: "power2.out", stagger: 0.055 },
      1.6
    );

    tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.7 }, 3.0);
    tl.to(enterBtnRef.current, { opacity: 1, y: 0, duration: 0.7, pointerEvents: "auto" }, 3.2);

    // -Skip control-
    let hasFinished = false;
    const finish = () => {
      if (hasFinished) return;
      hasFinished = true;
      gsap.to(wrapRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power1.inOut",
        onComplete: () => onComplete?.(),
      });
    };

    const handleSkip = () => {
      tl.progress(1);
      finish();
    };
    skipRef.current?.addEventListener("click", handleSkip);
    enterBtnRef.current?.addEventListener("click", finish);

    tl.call(finish, null, 4.2);

    // -Cleanup-
    return () => {
      window.removeEventListener("resize", handleResize);
      skipRef.current?.removeEventListener("click", handleSkip);
      enterBtnRef.current?.removeEventListener("click", finish);
      cancelAnimationFrame(rafId);
      tl.kill();
      bladeGeo.dispose();
      bladeMat.dispose();
      swordGroup.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [onComplete]);

  const word = "BUSHIDO".split("");

  return (
    <div className="bushido-wrap" ref={wrapRef}>
      <div className="bushido-canvas" ref={mountRef} />

      <button className="bushido-skip" ref={skipRef} type="button">
        Skip
      </button>

      <div className="bushido-overlay">
        <h1 className="bushido-wordmark" ref={wordmarkRef}>
          {word.map((ch, i) => (
            <span className="bushido-letter" key={i}>
              {ch}
            </span>
          ))}
        </h1>
        <p className="bushido-tagline" ref={taglineRef}>
          Built. Different!
        </p>
      </div>
    </div>
  );
}