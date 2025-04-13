'use client';

import Image from "next/image";
import { FaGithub,  FaInstagram } from "react-icons/fa";
import { useEffect } from "react";

export default function AboutPage() {
  const organizers = [
    "Mahaveer",
    "Adithya Veerendra",
    "Ashwath Prabhu",
    "Prathiksha Devadiga",
    "Muhammed Ashiq",
    "Abdul Rahib",
    "Nishanth T Shettigar",
    "Shravan Acharya",
    "Vion Macqueen Mathias",
    "Rimoona Machado",
    "Swathi",
    "Shreya Shetty",
    "Anvith S Salian",
    "Smitha Acharya",
    "Jiya Poojary",
    "Navya",
    "Devika Shetty",
    "Tarannum Sheikh",
    "Shravya Sonika",
    "Bhavith Poojary",
    "Akash Acharya",
    "Manoli Mahaveer",
  ];

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes popGlow {
        0% {
          transform: scale(0.95);
          text-shadow: 0 0 0px #3b82f6;
        }
        50% {
          transform: scale(1.05);
          text-shadow: 0 0 12px #3b82f6, 0 0 24px #3b82f6;
        }
        100% {
          transform: scale(1);
          text-shadow: 0 0 6px #3b82f6;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen w-full font-sans overflow-x-hidden">
      {/* Glowing Background Animations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute w-72 h-72 bg-blue-500 rounded-full opacity-47k animate-ping top-10 left-1/2 -translate-x-1/2"></div>
        <div className="absolute w-52 h-52 bg-blue-400 rounded-full opacity-20 animate-pulse bottom-10 right-10"></div>
        <div className="absolute w-32 h-32 bg-blue-300 rounded-full opacity-20 animate-bounce top-20 left-10"></div>
      </div>

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10 text-blue-400">
          Spectrophia 2025
        </h1>

        {/* College Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-800 rounded-2xl p-6 shadow-xl mb-12">
          <Image
            src="/images/events/marys.jpg"
            alt="College"
            width={600}
            height={400}
            className="rounded-lg object-cover w-full md:w-1/2 border-4 border-blue-500 shadow-lg"
          />
          <p className="text-lg leading-relaxed text-gray-300">
          St Mary&apos;s College Shirva
            <br />
            Welcome to <span className="text-blue-400 font-semibold">Spectrophia</span> – the annual IT Fest of the <strong>BCA Department</strong>. Join us for a celebration of innovation, creativity, and technology, organized by the minds shaping tomorrow.
          </p>
        </div>

        {/* Principal, HOD, President */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
          {[
            { name: "Dr. Herald Ivan Monis", title: "Principal", img: "/images/events/principal.png" },
            { name: "K Praveen Kumar", title: "Head of Department", img: "/images/events/praveen[1].png" },
            { name: "Godwill Diyol", title: "IT Club President", img: "/images/events/itp.jpg" },
          ].map((person) => (
            <div key={person.name} className="flex flex-col items-center">
              <Image
                src={person.img}
                alt={person.title}
                width={150}
                height={150}
                className="rounded-full border-4 border-blue-500 shadow-lg hover:scale-110 transition duration-300"
              />
              <h3 className="text-xl font-semibold text-blue-300 mt-4">
                {person.name}
              </h3>
              <p className="text-gray-400">{person.title}</p>
            </div>
          ))}
        </div>

        {/* Organizers */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6 text-blue-300">
            Organizers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center text-gray-200">
            {organizers.map((name, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-blue-950 shadow-md border border-blue-500 animate-[popGlow_2s_ease-in-out_infinite]"
              >
                <span className="text-blue-300 font-semibold">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Info */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-800 p-6 rounded-2xl shadow-xl mb-12">
          <div className="flex items-center gap-4">
            <Image
              src="/images/events/subbu.jpg"
              alt="Developer"
              width={80}
              height={80}
              className="rounded-full border-4 border-blue-500 shadow-lg"
            />
            <div>
              <h3 className="text-xl text-blue-400">developer - Subramanya G Prabhu</h3>
              <a
                href="https://github.com/subbu-2005"
                className="text-sm text-blue-300 flex items-center gap-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
                github.com/subbu-2005
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        
        <footer className="border-t border-gray-900 pt-6 text-center text-xl text-blue-200 space-x-6">
          <center>
          <a
            href="https://www.instagram.com/stmaryscollegeshirva?igsh=OWNyaG82eDN6OGd5"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaInstagram />
          </a>
          </center>
          <br />
            <p>Best College we got ❤️❤️..</p>
        
        
        </footer>

      </div>
    </div>
  );
}
