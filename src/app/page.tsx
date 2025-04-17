"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  Stars,
  Sparkles,
  Float,
  PointMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import React, { Suspense, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";

// Firework particles
function Fireworks() {
  const points = useRef<THREE.Points>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.y = t * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[
            new Float32Array(
              Array.from({ length: 500 * 3 }, () => (Math.random() - 0.5) * 20)
            ),
            3,
          ]}
        />
      </bufferGeometry>
      <PointMaterial
        color="#ffcc00"
        size={0.2}
        sizeAttenuation
        depthWrite={false}
        transparent
      />
    </points>
  );
}

// Model Animation
function Model({
  modelPath,
  position,
}: {
  modelPath: string;
  position: [number, number, number];
}) {
  const { scene } = useGLTF(modelPath);
  const ref = useRef<THREE.Group>(null);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (
          mesh.material &&
          (mesh.material as THREE.MeshStandardMaterial).metalness !== undefined
        ) {
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
      ref.current.rotation.y = Math.sin(t * 2) * 0.3;
      ref.current.position.y = position[1] + Math.abs(Math.sin(t * 2)) * 0.15;
    }
  });

  return (
    <group ref={ref}>
      <primitive object={scene} position={position} scale={[0.23, 0.23, 0.23]} />
    </group>
  );
}

// Main Home Page
export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      <Navbar />

      {/* Department Title Section */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 mt-8 px-4 font-extrabold text-center space-y-1 z-20">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-metal font-title whitespace-nowrap">
          DEPARTMENT OF COMPUTER SCIENCE
        </p>
        <p className="text-md sm:text-lg md:text-xl lg:text-2xl text-metal font-title animate-glow-white">
          (IT-CLUB)
        </p>
        {/* Small Logo */}
        <div className="relative w-20 h-20 mx-auto mt-2">
          <img
            src="/images/events/iic.jpg"
            alt="Small Logo"
            className="object-contain"
          />
        </div>
      </div>

      {/* 3D Canvas Section */}
      <Canvas className="absolute inset-0 z-0" camera={{ position: [0, 0, 6], fov: 50 }}>
        <Suspense fallback={null}>
          <Stars
            radius={200}
            depth={100}
            count={3000}
            factor={10}
            fade
            speed={1.5}
          />
          <Sparkles
            count={100}
            speed={0.4}
            size={4}
            scale={[5, 5, 5]}
            color="#FF6347"
            noise={1}
          />
          <Fireworks />
          <OrbitControls enableZoom={false} enableRotate={true} />
          <ambientLight intensity={0.8} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
          <Environment preset="sunset" />
          <Float speed={3} rotationIntensity={1}>
            <Model modelPath="/models/model7.glb" position={[0, -0.5, 0]} />
          </Float>
        </Suspense>
      </Canvas>

      {/* Title Section */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-600 animate-gradient">
          <span className="animate-glow-white">SPECTROPHIA</span>
          <span className="animate-glow-red text-blue-500">&apos;25</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mt-4 text-gray-200">
          Unleash the Spectrum of Innovation
        </p>
      </div>

      {/* Custom Styles */}
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

        .text-metal {
          background: linear-gradient(to right, #c0c0c0, #ffffff, #b0b0b0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
        }

        .font-title {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 1px;
        }
      `}</style>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

        body {
          background: #000000;
          margin: 0;
          padding: 0;
        }

        canvas {
          display: block;
        }
      `}</style>
    </main>
  );
}