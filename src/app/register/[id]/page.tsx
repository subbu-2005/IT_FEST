"use client";

import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const teams = [
  "Team Alpha", "Team Beta", "Team Gamma", "Team Delta", "Team Epsilon", 
  "Team Zeta", "Team Eta", "Team Theta", "Team Iota", "Team Kappa"
];

const eventDetails = {
  "Treasure Hunt": 4,
  "IT Brand Rangoli": 2,
  "Quiz": 2,
  "Coding": 2,
  "Photo Edits": 1,
  "Video Edits": 1,
  "Soft Interview": 1,
  "Gaming Girls (Militia)": 2,
  "Free Fire": 2,
  "BGMI": 2,
  "PPT Presentation": 1,
};

export default function RegisterPage() {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [participants, setParticipants] = useState(0);
  const [participantData, setParticipantData] = useState([]);
  const canvasRef = useRef(null);

  const handleEventChange = (event) => {
    const selectedEvent = event.target.value;
    setSelectedEvent(selectedEvent);
    setParticipants(eventDetails[selectedEvent] || 0);
    setParticipantData(Array(eventDetails[selectedEvent]).fill({ name: "", class: "", contact: "" }));
  };

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...participantData];
    updatedParticipants[index] = { ...updatedParticipants[index], [field]: value };
    setParticipantData(updatedParticipants);
  };

  const handleSubmit = async (e) => {
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
        
        // Reset fields after success
        setSelectedTeam("");
        setSelectedEvent("");
        setParticipants(0);
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
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 overflow-hidden">
      <ToastContainer /> {/* Toast container for notifications */}

      <Canvas className="absolute top-0 left-0 w-full h-full -z-10">
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={2} />
        <OrbitControls enableZoom={false} />
      </Canvas>

      <div className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-lg relative z-10 border-2 border-red-500 animate-glow">
        <h1 className="text-3xl font-bold mb-4 text-red-500">Event Registration</h1>
        
        <label className="block mb-2">Select Your Team:</label>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-red-500 rounded-md focus:ring-red-500 focus:border-red-500"
        >
          <option value="">-- Select Team --</option>
          {teams.map((team, index) => (
            <option key={index} value={team}>{team}</option>
          ))}
        </select>
        
        <label className="block mt-4 mb-2">Select Event:</label>
        <select
          value={selectedEvent}
          onChange={handleEventChange}
          className="w-full p-2 bg-gray-800 border border-red-500 rounded-md focus:ring-red-500 focus:border-red-500"
        >
          <option value="">-- Select Event --</option>
          {Object.keys(eventDetails).map((event, index) => (
            <option key={index} value={event}>{event}</option>
          ))}
        </select>

        {selectedEvent && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Enter Participant Details</h2>
            {participantData.map((participant, index) => (
              <div key={index} className="mb-4 p-2 border border-red-500 rounded-md">
                <h3 className="text-red-500 font-semibold">Participant {index + 1}</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={participant.name}
                  onChange={(e) => handleParticipantChange(index, "name", e.target.value)}
                  className="w-full p-2 mt-2 bg-gray-800 border border-red-500 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Class"
                  value={participant.class}
                  onChange={(e) => handleParticipantChange(index, "class", e.target.value)}
                  className="w-full p-2 mt-2 bg-gray-800 border border-red-500 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Contact"
                  value={participant.contact}
                  onChange={(e) => handleParticipantChange(index, "contact", e.target.value)}
                  className="w-full p-2 mt-2 bg-gray-800 border border-red-500 rounded-md"
                />
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={handleSubmit} 
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-md transition duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
