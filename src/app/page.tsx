"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { EffectComposer, Bloom, Noise, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import Navbar from "@/components/Navbar"; // Import Navbar

// Floating Red Dots (Optimized)
function FloatingRedDots() {
  const pointsRef = useRef(null);

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

// Home Component
export default function Home() {
  return (
    <main className="relative h-screen w-full bg-black">
      {/* Navbar - Always on top */}
      <Navbar />

      {/* Three.js Background */}
      <Canvas className="absolute inset-0 z-0">
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={3} color="#FF0000" />
        <FloatingRedDots />
        <EffectComposer>
          <Bloom intensity={2.5} luminanceThreshold={0.1} luminanceSmoothing={0.6} />
          <Noise opacity={0.15} />
          <ChromaticAberration offset={[0.002, 0.003]} />
          <Vignette eskil={false} offset={0.3} darkness={0.8} />
        </EffectComposer>
      </Canvas>

      {/* Centered Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-wide">
          <span className="animate-glow-white">IT_FEST</span>
          <span className="animate-glow-red text-red-500">'25</span>
        </h1>
        <p className="text-2xl md:text-3xl mt-4 text-gray-300">
          DIVE INTO EXCITING INNOVATIONS
        </p>
      </div>

      {/* Glow Animations */}
      <style jsx>{`
        @keyframes glow-white {
          0% { text-shadow: 0 0 20px #ffffff, 0 0 40px #aaaaaa; }
          50% { text-shadow: 0 0 30px #ffffff, 0 0 50px #dddddd; }
          100% { text-shadow: 0 0 20px #ffffff, 0 0 40px #aaaaaa; }
        }
        @keyframes glow-red {
          0% { text-shadow: 0 0 25px #FF0000, 0 0 40px #880000; }
          50% { text-shadow: 0 0 40px #880000, 0 0 50px #FF0000; }
          100% { text-shadow: 0 0 25px #880000, 0 0 40px #FF0000; }
        }
        .animate-glow-white {
          animation: glow-white 1.5s infinite alternate;
          color: white;
        }
        .animate-glow-red {
          animation: glow-red 1.5s infinite alternate;
        }
      `}</style>
    </main>
  );
}
