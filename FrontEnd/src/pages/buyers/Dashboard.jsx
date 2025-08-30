// src/pages/BuyerDashboard.jsx
import React, { useState } from "react";
import { requests } from "@/Data/Request";

export default function BuyerDashboard() {
  const [localRequests, setLocalRequests] = useState(requests);

  const handleApprove = (id) => {
    const updated = localRequests.map((r) =>
      r.id === id ? { ...r, status: "Approved" } : r
    );
    setLocalRequests(updated);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Buyer Dashboard</h1>

      <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Request ID</th>
            <th className="p-2">Producer Name</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Date</th>
            <th className="p-2">Resource</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {localRequests
            .filter((r) => r.status === "Pending")
            .map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.id}</td>
                <td className="p-2">{r.producerName}</td>
                <td className="p-2">{r.quantity}</td>
                <td className="p-2">{r.date}</td>
                <td className="p-2">{r.renewable_resource}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleApprove(r.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-8 mb-4">Approved Requests</h2>
      <ul className="list-disc ml-6">
        {localRequests
          .filter((r) => r.status === "Approved")
          .map((r) => (
            <li key={r.id}>
              {r.producerName} - {r.quantity} ({r.date}, {r.renewable_resource})
            </li>
          ))}
      </ul>
    </div>
  );
}
