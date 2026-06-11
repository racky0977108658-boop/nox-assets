import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

/* ---------- Spotlight (aceternity-style, pure SVG) ---------- */
function Spotlight({ className = "", fill = "white" }) {
  return (
    <svg
      className={className}
      style={{
        position: "absolute",
        pointerEvents: "none",
        zIndex: 1,
        height: "169%",
        width: "138%",
        opacity: 0,
        animation: "spotlightIn 1.4s ease 0.4s forwards",
      }}
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#spot-blur)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="spot-blur"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}

/* ---------- Three.js scene: gold particle knot, cursor-tracked ---------- */
function ParticleScene({ className = "" }) {
  const mountRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 7;

    /* particles sampled along a torus knot */
    const COUNT = 9000;
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const p = 2, q = 3, R = 1.55, tube = 0.52;
    for (let i = 0; i < COUNT; i++) {
      const t = Math.random() * Math.PI * 2;
      const ang = Math.random() * Math.PI * 2;
      const rad = tube * Math.sqrt(Math.random());
      const cx = (R + Math.cos(q * t) * 0.55) * Math.cos(p * t);
      const cy = (R + Math.cos(q * t) * 0.55) * Math.sin(p * t);
      const cz = Math.sin(q * t) * 0.55;
      positions[i * 3] = cx + Math.cos(ang) * rad;
      positions[i * 3 + 1] = cy + Math.sin(ang) * rad;
      positions[i * 3 + 2] = cz + (Math.random() - 0.5) * rad;
      seeds[i] = Math.random() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float seed;
        uniform float uTime;
        varying float vGlow;
        void main() {
          vec3 pos = position;
          float breath = sin(uTime * 0.8 + seed) * 0.04;
          pos += normalize(pos) * breath;
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mv;
          float tw = 0.6 + 0.4 * sin(uTime * 2.0 + seed * 7.0);
          vGlow = tw;
          gl_PointSize = (2.6 * tw) * (300.0 / -mv.z) * 0.01 + 1.4;
        }
      `,
      fragmentShader: `
        varying float vGlow;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.0, d);
          vec3 gold = mix(vec3(0.83, 0.69, 0.22), vec3(0.98, 0.93, 0.78), vGlow);
          gl_FragColor = vec4(gold, a * 0.85 * vGlow);
        }
      `,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* faint inner wireframe for structure */
    const wire = new THREE.Mesh(
      new THREE.TorusKnotGeometry(R, 0.42, 140, 18, p, q),
      new THREE.MeshBasicMaterial({
        color: 0x8a6d1f,
        wireframe: true,
        transparent: true,
        opacity: 0.07,
      })
    );
    scene.add(wire);

    /* cursor tracking — object turns toward pointer like the Spline robot */
    const target = { x: 0, y: 0 };
    const onPointer = (e) => {
      const rect = mount.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mat.uniforms.uTime.value = t;

      const idle = reduced ? 0 : t * 0.12;
      const rx = target.y * 0.45;
      const ry = target.x * 0.7 + idle;
      points.rotation.x += (rx - points.rotation.x) * 0.06;
      points.rotation.y += (ry - points.rotation.y) * 0.06;
      wire.rotation.copy(points.rotation);

      renderer.render(scene, camera);
    };
    animate();
    setReady(true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      mat.dispose();
      wire.geometry.dispose();
      wire.material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: "100%",
          opacity: ready ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      />
      {!ready && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              border: "2px solid rgba(212,175,55,0.25)",
              borderTopColor: "#D4AF37",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ---------- Demo: the hero card ---------- */
export default function InteractiveHero() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily:
          "'Helvetica Neue', -apple-system, 'PingFang TC', 'Noto Sans TC', sans-serif",
      }}
    >
      <style>{`
        @keyframes spotlightIn {
          from { opacity: 0; transform: translate(-72%, -62%) scale(0.5); }
          to   { opacity: 1; transform: translate(-50%, -40%) scale(1); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01s !important; }
        }
        .hero-card { flex-direction: row; }
        @media (max-width: 720px) {
          .hero-card { flex-direction: column; }
          .hero-card .pane { min-height: 260px; }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1080,
          height: 520,
          borderRadius: 18,
          overflow: "hidden",
          background: "rgba(0,0,0,0.96)",
          border: "1px solid rgba(212,175,55,0.14)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
        }}
      >
        <Spotlight fill="#f5e6c4" />

        <div className="hero-card" style={{ display: "flex", height: "100%" }}>
          {/* Left content */}
          <div
            className="pane"
            style={{
              flex: 1,
              padding: "48px 40px",
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.32em",
                color: "#D4AF37",
                margin: "0 0 16px",
                animation: "riseIn 0.8s ease 0.2s both",
              }}
            >
              NOX · INTERACTIVE
            </p>
            <h1
              style={{
                fontSize: "clamp(34px, 5vw, 52px)",
                fontWeight: 700,
                lineHeight: 1.08,
                margin: 0,
                background: "linear-gradient(180deg, #fdfaf2 0%, #cdb572 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                animation: "riseIn 0.8s ease 0.35s both",
              }}
            >
              Interactive 3D
            </h1>
            <p
              style={{
                marginTop: 18,
                maxWidth: 420,
                color: "#a3a3a3",
                fontSize: 15,
                lineHeight: 1.7,
                animation: "riseIn 0.8s ease 0.5s both",
              }}
            >
              Bring your UI to life with beautiful 3D scenes. Create immersive
              experiences that capture attention and enhance your design.
            </p>
          </div>

          {/* Right content — cursor-tracked particle object */}
          <div className="pane" style={{ flex: 1, position: "relative" }}>
            <ParticleScene className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
