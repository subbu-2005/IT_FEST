"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import * as THREE from "three";

const events = [
  { id: 1, title: "Hackathon", image: "/images/events/hack.jpeg", description: "Code and compete!" },
  { id: 2, title: "AI Workshop", image: "/images/events/aiwork.jpeg", description: "Learn AI & ML." },
  { id: 3, title: "BGMI", image: "/images/events/bgmi.jpg", description: "Defend the web." },
  { id: 4, title: "Web Dev Sprint", image: "/images/events/web.jpg", description: "Build & Deploy." },
  { id: 5, title: "Quiz", image: "/images/events/quiz.avif", description: "Create fun games." },
  { id: 6, title: "Treasure Hunt", image: "/images/events/hunt.jpeg", description: "Experience the future." },
  { id: 7, title: "Debate", image: "/images/events/debate.jpeg", description: "Smart solutions." },
  { id: 8, title: "Code Battle", image: "/images/events/code.avif", description: "Decentralize everything!" },
  { id: 9, title: "Photography", image: "/images/events/photography.jpeg", description: "Capture the moment." },
  { id: 10, title: "Reel Making", image: "/images/events/reelmaking.jpeg", description: "Create engaging reels." }
];


export default function EventsPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, document.body.scrollHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "-1";

    const currentMountRef = mountRef.current; // Copy mountRef.current to a variable
    if (currentMountRef) {
      currentMountRef.appendChild(renderer.domElement);
    }

    const light = new THREE.AmbientLight(0xff0000, 1);
    scene.add(light);

    const torusGeometry = new THREE.TorusGeometry(3.5, 0.5, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, wireframe: true });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({ color: 0xff0000, size: 0.07 });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 6;

    const animate = () => {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.008;
      torus.rotation.y += 0.008;
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleScroll = () => {
      camera.position.y = window.scrollY * 0.005;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      scene.clear();
      renderer.dispose();
      currentMountRef?.removeChild(renderer.domElement); // Use the copied variable
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />

      <motion.h1 className="relative z-10 text-5xl font-bold text-red-500 text-center mt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}>
        ALL EVENTS
      </motion.h1>

      <div className="relative z-10 flex flex-wrap justify-center items-center gap-6 pt-10 px-4">
        {events.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`} passHref>
            <motion.div
              className="relative w-64 h-80 bg-gray-900 rounded-lg shadow-lg overflow-hidden cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.08, rotateY: 10, rotateX: 5 }}
              transition={{ duration: 0.5, delay: event.id * 0.1, ease: "easeInOut" }}
              onMouseEnter={() => setHoveredId(event.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
                animate={{ opacity: hoveredId === event.id ? 0.5 : 1 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === event.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-red-500">{event.title}</h3>
                <p className="text-sm text-gray-300 px-4 text-center">{event.description}</p>
                <span className="mt-4 text-white border border-red-500 px-4 py-2 rounded-md hover:bg-red-500 transition">
                  View Details
                </span>
              </motion.div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
