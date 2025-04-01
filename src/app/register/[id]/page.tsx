"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const RegistrationPage = () => {
  const { id } = useParams(); // ✅ Correct way to access id
  const router = useRouter();

  // State to store the event ID
  const [eventId, setEventId] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setEventId(id as string);
    }
  }, [id]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData, "for event", eventId);
    alert(`Successfully registered for Event ${eventId}!`);
    router.push(`/events/${eventId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Register for Event {eventId}</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="block w-full px-4 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="block w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
