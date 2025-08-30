// src/pages/ProducerDashboard.jsx
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { requests } from "@/Data/Request";

export default function Form({ onClose }) {
  const [localRequests, setLocalRequests] = useState(requests);
  const [form, setForm] = useState({
    producerName: "",
    buyerName: "",
    quantity: "",
    date: "",
    renewable_resource: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = { id: uuidv4(), ...form, status: "Pending" };
    requests.push(newRequest); // Mock global array
    setLocalRequests([...localRequests, newRequest]);
    setForm({ producerName: "", buyerName: "", quantity: "", date: "", renewable_resource: "" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="w-full max-w-2xl p-6 bg-[#0a0f0d] rounded-2xl shadow-2xl border border-[#121a14]">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm text-[#00ff9d] border border-[#00ff9d] rounded-lg hover:bg-[#39ff14] hover:text-black transition-colors"
          >
            Close
          </button>
        </div>

        {/* Form Header */}
        <h1 className="text-2xl font-bold text-[#00ff9d] mb-6 text-center">
          Create New Request
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Buyer Name Dropdown */}
          <select
            className="w-full px-4 py-2 rounded-lg border border-[#00ff9d] bg-black bg-opacity-20 text-[#e6ffe6] focus:outline-none focus:ring-2 focus:ring-[#39ff14] transition-all
              focus:text-white"
            value={form.buyerName}
            onChange={(e) => setForm({ ...form, buyerName: e.target.value })}
            required
          >
            <option value="" disabled>Select Buyer</option>
            {["Green Energy Corp", "Solar Solutions", "EcoPower Ltd", "HydroTech", "BlueWave Energy"].map((buyer) => (
              <option
                key={buyer}
                value={buyer}
                className="bg-black text-[#e6ffe6] hover:bg-[#39ff14] hover:text-black"
              >
                {buyer}
              </option>
            ))}
          </select>


          {/* Quantity Input */}
          <input
            className="w-full px-4 py-2 rounded-lg border border-[#00ff9d] bg-black bg-opacity-20 text-[#e6ffe6] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#39ff14] transition-all"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            required
          />

          {/* Renewable Resource Input */}
          <input
            className="w-full px-4 py-2 rounded-lg border border-[#00ff9d] bg-black bg-opacity-20 text-[#e6ffe6] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#39ff14] transition-all"
            placeholder="Renewable Resource"
            value={form.renewable_resource}
            onChange={(e) => setForm({ ...form, renewable_resource: e.target.value })}
            required
          />

          {/* Date Input */}
          <input
            type="date"
            className="w-full px-4 py-2 rounded-lg border border-[#00ff9d] bg-black bg-opacity-20 text-[#e6ffe6] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#39ff14] transition-all"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-2 text-black font-semibold bg-[#00ff9d] rounded-lg hover:bg-[#39ff14] transition-colors"
          >
            Submit Request
          </button>
        </form>

      </div>
    </div>

  );
}
