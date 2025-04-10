"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-red-900 bg-opacity-90 backdrop-blur-lg z-50">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex-shrink-0 text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
          <Link href="/">SPECTROPHIA</Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-white">
          <li>
            <Link href="/events" className="hover:text-yellow-400 hover:drop-shadow-lg transition-all duration-300">
              Events
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-yellow-400 hover:drop-shadow-lg transition-all duration-300">
              About
            </Link>
          </li>
         
          <li>
            <Link href="/adminlogin" className="hover:text-yellow-400 hover:drop-shadow-lg transition-all duration-300 font-semibold">
              Admin Login
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Sliding Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }} 
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-64 h-full bg-red-800 bg-opacity-95 backdrop-blur-md shadow-lg"
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setIsOpen(false)} className="text-white">
                <X size={28} />
              </button>
            </div>
            <ul className="flex flex-col items-center justify-center space-y-6 h-full text-white">
              <li>
                <Link href="/events" onClick={() => setIsOpen(false)} className="text-lg font-semibold hover:text-yellow-400 transition-all duration-300">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setIsOpen(false)} className="text-lg font-semibold hover:text-yellow-400 transition-all duration-300">
                  About
                </Link>
              </li>
             
              <li>
                <Link href="/adminlogin" onClick={() => setIsOpen(false)} className="text-lg font-semibold hover:text-yellow-400 transition-all duration-300">
                  Admin Login
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
