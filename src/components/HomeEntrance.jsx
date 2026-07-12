import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import "./HomeEntrance.css";

export default function HomeEntrance() {
  const mountRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const uniforms = {
      uProgress: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uProgress;
        uniform vec2 uResolution;

        void main() {
          float aspect = uResolution.x / uResolution.y;
          vec2 uv = vUv;
          uv.x *= aspect;

          // diagonal sweep, top-right to bottom-left
          float diagonal = (uv.x + (1.0 - uv.y)) / (aspect + 1.0);

          float edge = smoothstep(uProgress - 0.02, uProgress + 0.02, diagonal);
          float glow = smoothstep(uProgress - 0.08, uProgress, diagonal)
                     - smoothstep(uProgress, uProgress + 0.08, diagonal);

          vec3 base = vec3(0.043, 0.047, 0.055);   // near-black
          vec3 glowColor = vec3(0.878, 0.133, 0.102); // oxblood red

          vec3 color = mix(base, glowColor, glow * 1.6);
          float alpha = 1.0 - edge; // fully opaque before the edge, transparent after

          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let rafId;
    const renderLoop = () => {
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    const handleResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);
    };
    window.addEventListener("resize", handleResize);

    const tl = gsap.timeline();
    tl.fromTo(
      uniforms.uProgress,
      { value: 0 },
      { value: 1.35, duration: 1.0, ease: "power2.inOut" }
    );
    tl.to(
      wrapRef.current,
      {
        opacity: 0,
        duration: 0.35,
        ease: "power1.out",
        onComplete: () => {
          if (wrapRef.current) wrapRef.current.style.display = "none";
        },
      },
      "-=0.1"
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
      tl.kill();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="home-entrance-wrap" ref={wrapRef}>
      <div className="home-entrance-canvas" ref={mountRef} />
    </div>
  );
}