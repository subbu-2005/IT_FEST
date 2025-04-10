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
    return <div className="text-white text-center mt-10 text-2xl">Event not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-5xl font-bold text-red-500 mb-6">{event.title}</h1>

      <Image
        src={event.image}
        alt={event.title}
        width={800}
        height={320}
        className="w-full max-w-2xl h-80 object-cover rounded-lg shadow-lg mb-6"
      />

      <p className="text-lg text-gray-300 text-center max-w-2xl">{event.description}</p>

      <div className="mt-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-red-400 mb-3">Rules:</h2>
        <ul className="list-disc list-inside text-gray-300">
          {event.rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-red-400 mb-3">Organizers:</h2>
        {event.organizers.map((organizer, index) => (
          <p key={index} className="text-gray-300">
            {organizer.name} - <span className="text-red-400">{organizer.contact}</span>
          </p>
        ))}
      </div>

      <Link href={`/register/${eventId}`}>
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg">
          Register Now
        </button>
      </Link>
    </div>
  );
}
