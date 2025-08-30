import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const ApprovedRequests = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("producer_wallet_id");

  async function fetchApprovedRequests() {
    try {
      const res = await axios.get(
        `http://localhost:8000/gov/68b23f2fbdc017bbae3150e6/approved-productions`
      );
      setApprovedRequests(res.data.productions);
    } catch (err) {
      console.log(err);
    }
  }

  async function approveRequest(id) {
    try {
      const res = await axios.get(
        `http://localhost:8000/gov/68b23f2fbdc017bbae3150e6/pro/${id}/approve`
      );
      setApprovedRequests(res.data.productions);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchApprovedRequests();
  }, []);

  // Filter and sort data
  const filteredRequests = approvedRequests
    .filter((req) =>
      req[sortField]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-8 space-y-6">
      <h2 className="text-2xl font-bold text-green-400">Approved Requests</h2>

      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Input
          placeholder={`Search by ${sortField}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-900 border border-green-400/30 text-gray-100 placeholder-gray-400"
        />
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="bg-gray-900 border border-green-400/30 text-gray-100 rounded-lg px-3 py-2"
        >
          <option value="producer_wallet_id">Wallet ID</option>
          <option value="quantity">Quantity</option>
          <option value="date_time">Date</option>
          <option value="renewable_resource">Resource</option>
        </select>
      </div>

      {/* Table */}
      <Card className="bg-gray-900 border border-green-400/30 shadow-lg rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-green-300">
                <th className="p-3">Wallet ID</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Resource</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => {
                  return (
                    <tr
                      key={req._id}
                      className="border-b border-green-400/20 hover:bg-gray-800 transition"
                    >
                      <td className="p-3">{req.producer_wallet_id}</td>
                      <td className="p-3">{req.quantity} kWh</td>
                      <td className="p-3">{req.date_time.split("T")[0]}</td>
                      <td className="p-3">{req.date_time.split("T")[1]}</td>
                      <td className="p-3">{req.renewable_resource}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="p-4 text-center text-gray-400 italic"
                  >
                    No approved requests
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ApprovedRequests;
