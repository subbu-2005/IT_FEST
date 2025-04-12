"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import * as THREE from "three";

const events = [
  { id: 1, title: "KGF(KODE GEEK FORCE)", image: "/images/events/screenshot.png", description: "Code and compete!" },
  { id: 2, title: "INVICTUS(soft interview)", image: "/images/events/web.jpg", description: "Unleash your skills." },
  { id: 3, title: "Death Race", image: "/images/events/bgmi.jpg", description: "Chikken Dinner." },
  { id: 4, title: "Inception(Power Point presentation)", image: "/images/events/inception.jpg", description: "Be confident." },
  { id: 5, title: "The Matrix", image: "/images/events/quiz.jpg", description: "Unlock your memory." },
  { id: 6, title: "Ready Player One", image: "/images/events/ready.png", description: "Welcome to the jungle." },
  { id: 7, title: "Fight Club", image: "/images/events/ff.jpg", description: "We can't talk about it." },
  { id: 8, title: "Furiosa(gaming Girls)", image: "/images/events/fur.jpg", description: "The new saga." },
  { id: 9, title: "Shutter island(photography)", image: "/images/events/shut.jpg", description: "Capture the moment." },
  { id: 10, title: "Bladerunner(video editing)", image: "/images/events/video.jpg", description: "Use creative editing skills." },
  { id: 11, title: "Rangitaranga", image: "/images/events/dark.png", description: "Festival of colours." }
];

export default function EventsPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, document.body.scrollHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = "-1";

    const currentMountRef = mountRef.current;
    if (currentMountRef) {
      currentMountRef.appendChild(renderer.domElement);
    }

    const ambientLight = new THREE.AmbientLight(0x00ffff, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ffff, 2, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Torus
    const torusGeometry = new THREE.TorusGeometry(3.5, 0.5, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x0099ff,
      emissiveIntensity: 0.8,
      wireframe: true,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    // Glowing Aqua-blue Square Particles
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
      square.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80
      );
      square.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      squaresGroup.add(square);
    }

    scene.add(squaresGroup);

    // Stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 300;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 100;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, transparent: true, opacity: 0.8 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Sphere
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff, emissive: 0x0033ff, wireframe: true });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-10, 0, -10);
    scene.add(sphere);

    // Pyramid
    const pyramidGeometry = new THREE.ConeGeometry(2, 4, 4);
    const pyramidMaterial = new THREE.MeshStandardMaterial({ color: 0x5500ff, emissive: 0x2200ff, wireframe: true });
    const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
    pyramid.position.set(10, 5, -15);
    scene.add(pyramid);

    camera.position.z = 6;

    const animate = () => {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      stars.rotation.y += 0.0005;
      sphere.rotation.y += 0.005;
      sphere.rotation.x += 0.005;
      pyramid.rotation.y -= 0.004;
      squaresGroup.rotation.y += 0.001;
      squaresGroup.rotation.x += 0.001;
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
      currentMountRef?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />

      <motion.h1
        className="relative z-10 text-5xl font-extrabold text-cyan-400 text-center mt-8 drop-shadow-[0_0_15px_#00ffff]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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

      <div className="relative z-10 flex flex-wrap justify-center items-center gap-6 pt-10 px-4">
        {events.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`} passHref>
            <motion.div
              className="relative w-64 h-80 bg-gray-900 rounded-2xl border-4 border-cyan-400 shadow-2xl overflow-hidden cursor-pointer card-spin"
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
                className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === event.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-cyan-400 drop-shadow-[0_0_10px_#00ffff]">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-300 px-4 text-center">{event.description}</p>
                <span className="mt-4 text-white border border-cyan-400 px-4 py-2 rounded-md hover:bg-cyan-500 transition">
                  View Details
                </span>
              </motion.div>
            </motion.div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .card-spin {
          animation: spinCard 10s linear infinite;
        }

        @keyframes spinCard {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
}
