// src/pages/ProducerDashboard.jsx
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { requests } from "@/Data/Request";

export default function Form() {
  const [localRequests, setLocalRequests] = useState(requests);
  const [form, setForm] = useState({
    producerName: "",
    buyerName:"",
    quantity:"",
    date: "",
    renewable_resource:""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = { id: uuidv4(), ...form, status: "Pending" };
    requests.push(newRequest); // Mock global array
    setLocalRequests([...localRequests, newRequest]);
    setForm({ producerName: "", producerOrgId: "", buyerOrgId: "", documentUrl: "" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Producer Dashboard</h1>

      {/* Create Request Form */}
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-xl mb-8 space-y-4">
        <input
          className="border p-2 w-full rounded"
          placeholder="Producer Name"
          value={form.producerName}
          onChange={(e) => setForm({ ...form, producerName: e.target.value })}
          required
        />
        
        <input
          className="border p-2 w-full rounded"
          placeholder="Buyer Name"
          value={form.buyerName}
          onChange={(e) => setForm({ ...form, buyerName: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full rounded"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <input
            type="Date"
          className="border p-2 w-full rounded text-slate-400"
          placeholder="Date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full rounded"
          placeholder="Renewable-Resource"
          value={form.renewable_resource}
          onChange={(e) => setForm({ ...form, renewable_resource: e.target.value })}
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Submit Request
        </button>
      </form>

      {/* Requests Table */}
      <h2 className="text-xl font-semibold mb-4">Your Requests</h2>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Request ID</th>
            <th className="p-2">Buyer Org</th>
            <th className="p-2">Document</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {localRequests.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="p-2">{r.id}</td>
              <td className="p-2">{r.buyerOrgId}</td>
              <td className="p-2">
                <a href={r.documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  View
                </a>
              </td>
              <td className="p-2 font-semibold">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
