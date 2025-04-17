"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Orbitron } from "next/font/google";
const orbitron = Orbitron({ subsets: ["latin"], weight: "700" });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-900 bg-opacity-90 z-50">
      <nav className="relative flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="relative flex items-center space-x-3">
          <Link href="/" className="relative w-14 h-13 md:w-10 md:h-12">
            <Image
              src="/logo.png"
              alt="Spectrophia Logo"
              fill
              className="object-contain scale-[1.8] -translate-x-3"
              priority
            />
          </Link>
          <Link href="/">
            <motion.span
              className={`text-white text-sm md:text-2xl tracking-wide hover:text-yellow-400 transition duration-300 ${orbitron.className}`}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              ST MARY&apos;S SHIRVA
            </motion.span>
          </Link>
          <div className="relative w-14 h-12 md:w-10 md:h-10">
            <Image
              src="/images/events/logo.png"
              alt="Secondary Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-white">
          <li>
            <Link
              href="/events"
              className="hover:text-yellow-400 hover:drop-shadow-lg transition-all duration-300"
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-yellow-400 hover:drop-shadow-lg transition-all duration-300"
            >
              About
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Sidebar - Fully Transparent and Narrower */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-14 right-0 w-48 h-[calc(100%-3.5rem)] bg-transparent flex flex-col items-start px-6 py-8 z-40"
          >
            <ul className="flex flex-col space-y-6 text-white">
              <li>
                <Link
                  href="/events"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold hover:text-yellow-400 transition-all duration-300"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold hover:text-yellow-400 transition-all duration-300"
                >
                  About
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
