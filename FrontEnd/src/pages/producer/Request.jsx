import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const LastPendingRequest = () => {
  const [request, setRequest] = useState(null);

  useEffect(() => {
    // Simulate backend data with mock last pending request
    const mockRequest = {
      buyer_name: "Green Energy Corp",
      date: "2025-08-25",
      quantity: "150 kg",
    };

    // Simulate API delay
    setTimeout(() => {
      setRequest(mockRequest);
    }, 500);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-[#0a0f0d] bg-opacity-60 backdrop-blur-md shadow-lg rounded-xl p-6 border border-[#121a14] select-none"
    >
      <h2 className="text-xl font-semibold text-[#39ff14] mb-4">
        Last Pending Request
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="box bg-[#121a14] overflow-hidden shadow-lg rounded-xl border border-[#0a0f0d] p-4">
          <h1 className="text-lg text-[#39ff14]">Buyer Name</h1>
          <p className="text-gray-200 mt-2">{request?.buyer_name ?? "Loading..."}</p>
        </div>
        <div className="box bg-[#121a14] overflow-hidden shadow-lg rounded-xl border border-[#0a0f0d] p-4">
          <h1 className="text-lg text-[#39ff14]">Date</h1>
          <p className="text-gray-200 mt-2">{request?.date ?? "Loading..."}</p>
        </div>
        <div className="box bg-[#121a14] overflow-hidden shadow-lg rounded-xl border border-[#0a0f0d] p-4">
          <h1 className="text-lg text-[#39ff14]">Quantity</h1>
          <p className="text-gray-200 mt-2">{request?.quantity ?? "Loading..."}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default LastPendingRequest;