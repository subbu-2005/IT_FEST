"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Stars } from "@react-three/drei";
import * as THREE from "three";
import React, { Suspense, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";

// 🎵 Dancing Model Component
function Model({ modelPath, position }: { modelPath: string; position: [number, number, number] }) {
  const { scene } = useGLTF(modelPath);
  const ref = useRef<THREE.Group>(null);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    // Restore original materials and color
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).metalness !== undefined) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          material.metalness = 0.5;
          material.roughness = 0.3;
          material.emissive = new THREE.Color(0x222222);
          material.emissiveIntensity = 0.2;
        }
      }
    });
  }, [scene]);

  useFrame(() => {
    const t = clockRef.current.getElapsedTime();
    if (ref.current) {
      // 💃 Dancing motions
      ref.current.rotation.y = Math.sin(t * 2) * 0.3; // Left-right groove
      ref.current.rotation.x = Math.sin(t) * 0.1; // Head nod
      ref.current.position.y = position[1] + Math.abs(Math.sin(t * 2)) * 0.15; // Bounce
    }
  });

  return (
    <group ref={ref}>
      <primitive object={scene} position={position} scale={[0.23, 0.23, 0.23]} />
    </group>
  );
}

// 🏠 Main Home Page
export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      <Navbar />

      <Canvas className="absolute inset-0 z-0" camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Stars
            radius={100}
            depth={80}
            count={1000}
            factor={6}
            saturation={0}
            fade
            speed={1}
          />
          <OrbitControls enableZoom={false} enableRotate={true} />
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
          <Environment preset="sunset" />
          <Model modelPath="/models/model7.glb" position={[0, -0.5, 0]} />
        </Suspense>
      </Canvas>

      {/* Title & Tagline */}
      <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-600 animate-gradient">
          <span className="animate-glow-white">SPECTROPHIA</span>
          <span className="animate-glow-red text-red-500">&apos;25</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mt-4 text-gray-200">
          Unleash the Spectrum of Innovation
        </p>
      </div>

      {/* Animations */}
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

      <style jsx global>{`
        body {
          background: #000000;
          transition: background 0.5s ease-in-out;
        }
      `}</style>
    </main>
  );
}