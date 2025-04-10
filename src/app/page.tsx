"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  Points,
  PointMaterial,
  Ring,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import {
  EffectComposer,
  Bloom,
  Noise,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import Navbar from "@/components/Navbar";

// ✨ Swirling Particles
function SwirlingParticles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 1000; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 5 + 2;
      const y = (Math.random() - 0.5) * 5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      arr.push(x, y, z);
    }
    return new Float32Array(arr);
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Points ref={ref} positions={positions} frustumCulled={false}>
      <PointMaterial size={0.1} color="#ff0066" transparent opacity={0.9} />
    </Points>
  );
}

// 🔴 Floating Red Dots
function FloatingRedDots() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  const dots = useMemo(() => {
    const dotsArray = [];
    for (let i = 0; i < 1500; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      dotsArray.push(x, y, z);
    }
    return new Float32Array(dotsArray);
  }, []);

  return (
    <Points ref={pointsRef} positions={dots} frustumCulled={false}>
      <PointMaterial size={0.08} color="#FF0000" transparent opacity={0.9} />
    </Points>
  );
}

// 🌀 Glowing Vortex Ring
function VortexRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <Ring
      ref={ringRef}
      args={[2, 2.5, 64]}
      position={[0, 0, -2]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshBasicMaterial
        color="#ff0044"
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
      />
    </Ring>
  );
}

// 🎬 Main Component
export default function Home() {
  return (
    <main className="relative h-screen w-full bg-black overflow-hidden">
      <Navbar />

      <Canvas className="absolute inset-0 z-0">
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={3} color="#FF00CC" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade />
        <FloatingRedDots />
        <SwirlingParticles />
        <VortexRing />
        <EffectComposer>
          <Bloom intensity={3.5} luminanceThreshold={0.1} luminanceSmoothing={0.7} />
          <Noise opacity={0.25} />
          <ChromaticAberration offset={[0.003, 0.004]} />
          <Vignette eskil={false} offset={0.3} darkness={1.1} />
        </EffectComposer>
      </Canvas>

      {/* Center Text with Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient">
          <span className="animate-glow-white">SPECTROPHIA</span>
          <span className="animate-glow-red text-red-500">'25</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mt-4 text-gray-300">
          Unleash the Spectrum of Innovation
        </p>
      </div>

      {/* Advanced Animations */}
      <style jsx>{`
        @keyframes glow-white {
          0% {
            text-shadow: 0 0 20px #ffffff, 0 0 40px #aaaaaa;
          }
          50% {
            text-shadow: 0 0 40px #ffffff, 0 0 60px #ffffff;
          }
          100% {
            text-shadow: 0 0 20px #ffffff, 0 0 40px #aaaaaa;
          }
        }
        @keyframes glow-red {
          0% {
            text-shadow: 0 0 25px #ff0000, 0 0 40px #880000;
          }
          50% {
            text-shadow: 0 0 50px #ff0000, 0 0 60px #ff4444;
          }
          100% {
            text-shadow: 0 0 25px #ff0000, 0 0 40px #880000;
          }
        }
        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-glow-white {
          animation: glow-white 1.5s infinite alternate;
          color: white;
        }
        .animate-glow-red {
          animation: glow-red 1.5s infinite alternate;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-move 4s ease infinite;
        }
      `}</style>
    </main>
  );
}
