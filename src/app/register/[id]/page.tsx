"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Participant = {
  name: string;
  class: string;
  contact: string;
};

const teams = [
  "Code crusaders", "Barbarian  Codes", "IT wizards", "Technosphere", "Nvidia", 
  "Techtronix", "Beyond Infinity", "Pixelites", "Data Pirates", "Tech Titans"
];

const eventDetails: Record<string, number> = {
  "Ready Player One": 4,
  "Rangitaranaga": 2,
  "The Matrix": 2,
  "KGF(KODE GEEK FORCE)": 2,
  "Shutter island": 1,
  "Blade Runner 2049": 1,
  "Inception": 1,
  "Furiosa": 2,
  "Fight Club": 2,
  "Death Race": 2,
  "Invictus": 1,
};

export default function RegisterPage() {
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [participantData, setParticipantData] = useState<Participant[]>([]);

  const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEvent = event.target.value;
    setSelectedEvent(selectedEvent);
    const count = eventDetails[selectedEvent] || 0;
    setParticipantData(Array(count).fill({ name: "", class: "", contact: "" }));
  };

  const handleParticipantChange = (
    index: number,
    field: keyof Participant,
    value: string
  ) => {
    const updatedParticipants = [...participantData];
    updatedParticipants[index] = { ...updatedParticipants[index], [field]: value };
    setParticipantData(updatedParticipants);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeam || !selectedEvent) {
      alert("Please select both a team and an event.");
      return;
    }

    const formData = {
      team: selectedTeam,
      event: selectedEvent,
      participants: participantData,
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("🎉 Registration Successful!", { position: "top-right", autoClose: 3000 });
        setSelectedTeam("");
        setSelectedEvent("");
        setParticipantData([]);
      } else {
        toast.error("❌ Registration failed. Try again.", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("⚠️ An error occurred. Please try again.", { position: "top-right" });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-6 overflow-hidden font-sans">
      <ToastContainer />

      {/* Animated Stars Background */}
      <Canvas className="absolute top-0 left-0 w-full h-full -z-10">
        <Stars radius={100} depth={50} count={7000} factor={4} fade speed={2} />
        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* Glowing Registration Card */}
      <div className="p-1 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-500/30 to-purple-700/30 shadow-[0_0_40px_rgba(0,200,255,0.6)] backdrop-blur-md transition-all duration-300">
        <div className="bg-black bg-opacity-80 p-8 rounded-2xl w-full max-w-xl border border-blue-500 shadow-[0_0_30px_rgba(0,200,255,0.3)] hover:shadow-[0_0_60px_rgba(0,200,255,0.6)] transition">
          <h1 className="text-3xl font-extrabold text-center text-cyan-400 mb-6 animate-pulse drop-shadow-[0_0_5px_cyan]">
            Event Registration
          </h1>

          {/* Team Selection */}
          <label className="block mb-2 text-cyan-300 font-medium">Select Your Team:</label>
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="w-full p-2 bg-gray-900 border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          >
            <option value="">-- Select Team --</option>
            {teams.map((team, index) => (
              <option key={index} value={team}>{team}</option>
            ))}
          </select>

          {/* Event Selection */}
          <label className="block mt-4 mb-2 text-cyan-300 font-medium">Select Event:</label>
          <select
            value={selectedEvent}
            onChange={handleEventChange}
            className="w-full p-2 bg-gray-900 border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          >
            <option value="">-- Select Event --</option>
            {Object.keys(eventDetails).map((event, index) => (
              <option key={index} value={event}>{event}</option>
            ))}
          </select>

          {/* Participant Info */}
          {selectedEvent && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">👥 Participant Details</h2>
              {participantData.map((participant, index) => (
                <div
                  key={index}
                  className="mb-5 p-4 bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-cyan-400 rounded-xl shadow-inner transition duration-300 hover:scale-[1.01]"
                >
                  <h3 className="text-cyan-400 font-bold mb-2">Participant {index + 1}</h3>
                  <input
                    type="text"
                    placeholder="Name"
                    value={participant.name}
                    onChange={(e) => handleParticipantChange(index, "name", e.target.value)}
                    className="w-full mb-2 p-2 bg-black border border-cyan-600 rounded-md text-white placeholder:text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Class"
                    value={participant.class}
                    onChange={(e) => handleParticipantChange(index, "class", e.target.value)}
                    className="w-full mb-2 p-2 bg-black border border-cyan-600 rounded-md text-white placeholder:text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Contact"
                    value={participant.contact}
                    onChange={(e) => handleParticipantChange(index, "contact", e.target.value)}
                    className="w-full p-2 bg-black border border-cyan-600 rounded-md text-white placeholder:text-gray-400"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-800 text-white p-3 rounded-xl font-bold tracking-wide shadow-md hover:shadow-cyan-500/50 transition-all duration-300"
          >
            🚀 Register Now
          </button>
        </div>
      </div>
    </div>
  );
}
