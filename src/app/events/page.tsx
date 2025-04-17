"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import * as THREE from "three";

const events = [
  { id: 1, title: "KGF(KODE GEEK FORCE)", image: "/images/events/kgf.jpg", description: "Code and compete!" },
  { id: 2, title: "INVICTUS(soft interview)", image: "/images/events/web.jpg", description: "Unleash your skills." },
  { id: 3, title: "Death Race", image: "/images/events/bgmi.jpg", description: "Chikken Dinner." },
  { id: 4, title: "Inception(Power Point presentation)", image: "/images/events/inception.jpg", description: "Be confident." },
  { id: 5, title: "The Matrix", image: "/images/events/quiz.jpg", description: "Unlock your memory." },
  { id: 6, title: "Ready Player One", image: "/images/events/ready.png", description: "Welcome to the jungle." },
  { id: 7, title: "Fight Club", image: "/images/events/ff.jpg", description: "We can't talk about it." },
  { id: 8, title: "Furiosa(gaming Girls)", image: "/images/events/fur.jpg", description: "The new saga." },
  { id: 9, title: "Shutter island(photography)", image: "/images/events/Shut.jpg", description: "Capture the moment." },
  { id: 10, title: "Bladerunner(video editing)", image: "/images/events/video.jpg", description: "Use creative editing skills." },
  { id: 11, title: "Rangitaranga", image: "/images/events/Dark.png", description: "Festival of colours." }
];

export default function EventsPage() {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const cards = container.querySelectorAll(".event-card");
      let closestIndex = 0;
      let minDistance = Infinity;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const distance = Math.abs(viewportCenter - cardCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      // Special case: top of page
      if (window.scrollY === 0) {
        setVisibleIndex(0);
        return;
      }

      // Special case: bottom of page
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollBottom >= docHeight - 5) {
        setVisibleIndex(events.length - 1);
        return;
      }

      setVisibleIndex(closestIndex);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, document.body.scrollHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "-1";

    const currentMountRef = mountRef.current;
    currentMountRef?.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x00ffff, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ffff, 2, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(3.5, 0.5, 16, 100),
      new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x0099ff,
        emissiveIntensity: 0.8,
        wireframe: true
      })
    );
    scene.add(torus);

    const squaresGroup = new THREE.Group();
    const squareGeometry = new THREE.PlaneGeometry(0.5, 0.5);
    const squareMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });

    for (let i = 0; i < 200; i++) {
      const square = new THREE.Mesh(squareGeometry, squareMaterial);
      square.position.set((Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80);
      square.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      squaresGroup.add(square);
    }
    scene.add(squaresGroup);

    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(300 * 3);
    for (let i = 0; i < 900; i++) starPositions[i] = (Math.random() - 0.5) * 100;
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, transparent: true, opacity: 0.8 })
    );
    scene.add(stars);

    const animate = () => {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      stars.rotation.y += 0.0005;
      squaresGroup.rotation.y += 0.001;
      squaresGroup.rotation.x += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("scroll", () => {
      camera.position.y = window.scrollY * 0.005;
    });

    return () => {
      scene.clear();
      renderer.dispose();
      window.removeEventListener("scroll", () => {});
      currentMountRef?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden pb-20">
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />

      <motion.h1
        className="relative z-10 text-5xl font-extrabold text-cyan-400 text-center mt-8 drop-shadow-[0_0_15px_#00ffff]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        ALL EVENTS
      </motion.h1>

      <div className="relative z-10 text-center mt-4">
        <Link href="/" passHref>
          <motion.button
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full text-lg shadow-xl hover:scale-105 transition"
            whileHover={{ scale: 1.1 }}
          >
            Back to Home
          </motion.button>
        </Link>
      </div>

      <div ref={containerRef} className="relative z-10 flex flex-col items-center gap-12 pt-10">
        {events.map((event, index) => {
          const isVisible = index === visibleIndex;
          return (
            <Link key={event.id} href={`/events/${event.id}`} passHref>
              <div className="event-card w-72 h-96 rounded-2xl shadow-lg relative [perspective:1000px] cursor-pointer">
                <div
                  className={`w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                    isVisible ? "" : "rotate-y-180"
                  }`}
                >
                  <div className="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden">
                    <img src="/images/events/card.png" alt="Card Back" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}