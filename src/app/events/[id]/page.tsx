"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { eventsData } from "@/data/eventsData";
import Link from "next/link";
import Image from "next/image";

type EventType = {
  id: number;
  title: string;
  description: string;
  image: string;
  rules: string[];
  organizers: { name: string; contact: string }[];
};

export default function EventDetailPage() {
  const params = useParams();
  const [eventId, setEventId] = useState<string | null>(null);
  const [event, setEvent] = useState<EventType | null>(null);

  useEffect(() => {
    if (params?.id) {
      setEventId(params.id as string);
    }
  }, [params]);

  useEffect(() => {
    if (eventId) {
      const foundEvent = eventsData.find((e) => e.id === Number(eventId));
      setEvent(foundEvent || null);
    }
  }, [eventId]);

  if (!event) {
    return (
      <div className="text-cyan-300 text-center mt-10 text-2xl">
        Event not found
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-950 via-black to-blue-900 text-white flex flex-col items-center py-10 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 sparkle-layer" />
      <div className="absolute inset-0 pointer-events-none z-0 star-layer" />

      <div className="bg-gradient-to-br from-blue-800/30 to-cyan-900/30 p-6 rounded-3xl border-[2px] border-cyan-300/40 card-glow z-10 max-w-3xl w-full animate-float transition-all duration-700 ease-in-out hover:scale-[1.02]">
        <h1 className="text-5xl font-bold text-cyan-300 mb-6 drop-shadow-lg animate-pulse text-center">
          {event.title}
        </h1>

        <Image
          src={event.image}
          alt={event.title}
          width={800}
          height={320}
          className="w-full h-80 object-cover rounded-xl border border-cyan-400 shadow-2xl mb-6 shimmer"
        />

        <p className="text-lg text-blue-100 text-center mb-4">{event.description}</p>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-2">Rules:</h2>
          <ul className="list-disc list-inside text-blue-100 space-y-1">
            {event.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-2">Organizers:</h2>
          {event.organizers.map((organizer, index) => (
            <p key={index} className="text-blue-100">
              {organizer.name} -{" "}
              <span className="text-cyan-300">{organizer.contact}</span>
            </p>
          ))}
        </div>

        <div className="text-center">
          <Link href={`/register/${eventId}`}>
            <button className="mt-8 px-8 py-3 bg-cyan-400 text-blue-900 font-semibold rounded-full shadow-lg transition transform hover:scale-110 focus:outline-none">
              Register Now
            </button>
          </Link>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .card-glow {
          box-shadow: 0 0 25px rgba(0, 255, 255, 0.3),
                      0 0 50px rgba(0, 255, 255, 0.2),
                      0 0 100px rgba(0, 255, 255, 0.15);
          transition: box-shadow 0.6s ease-in-out;
        }

        .card-glow:hover {
          box-shadow: 0 0 40px rgba(0, 255, 255, 0.5),
                      0 0 80px rgba(0, 255, 255, 0.3),
                      0 0 120px rgba(0, 255, 255, 0.2);
        }

        .animate-float {
          animation: floaty 6s ease-in-out infinite;
        }

        @keyframes floaty {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .sparkle-layer::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(circle, rgba(0, 255, 255, 0.2) 2px, transparent 2px);
          background-size: 30px 30px;
          animation: sparkleMove 6s linear infinite alternate;
          opacity: 0.25;
        }

        .star-layer::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("https://www.transparenttextures.com/patterns/stardust.png");
          opacity: 0.1;
          animation: starTwinkle 12s ease-in-out infinite;
        }

        @keyframes sparkleMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 40px;
          }
        }

        @keyframes starTwinkle {
          0% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            opacity: 0.1;
          }
        }

        .shimmer {
          position: relative;
          overflow: hidden;
        }

        .shimmer::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
