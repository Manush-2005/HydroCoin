// src/pages/MarketTable.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import QRCode from "react-qr-code";
import axios from "axios";
import Loader from "@/components/Loader";

function PurchaseModal({ isOpen, onClose, coinPrice, availableCoins }) {
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState("input"); // input | confirm | qr
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState(null);

  if (!isOpen) return null;

  const totalAmount = (coinPrice * quantity).toFixed(2);

  const handleNext = () => {
    if (quantity > availableCoins) {
      setError(`Only ${availableCoins} coins available.`);
      return;
    }
    setError("");
    setStep("confirm");
  };

  const handleConfirm = () => {
    // generate unique transaction id on confirm
    const id = uuidv4();
    setTransactionId(id);
    setStep("qr");
  };

  const qrValue = transactionId
    ? JSON.stringify({
        transactionId,
        amount: totalAmount,
        quantity,
        coinPrice,
      })
    : "";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-[#121a14] text-white rounded-2xl shadow-lg p-6 w-[400px]">
        <h2 className="text-xl font-bold mb-4">Purchase HydroCoin</h2>

        {/* Step 1: Enter Quantity */}
        {step === "input" && (
          <>
            <p className="mb-2">1 HydroCoin Price: ₹{coinPrice}</p>
            <p className="mb-2 text-sm text-gray-400">
              Available: {availableCoins} coins
            </p>
            <label className="block mb-2 text-gray-300">Enter Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-[#0a0f0d] border border-gray-600 text-white"
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-black font-semibold"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 2: Confirm */}
        {step === "confirm" && (
          <>
            <p className="text-lg">
              You are buying{" "}
              <span className="font-bold text-green-400">{quantity}</span> coins
              for{" "}
              <span className="font-bold text-green-400">₹{totalAmount}</span>
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setStep("input")}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-black font-semibold"
              >
                Confirm Purchase
              </button>
            </div>
          </>
        )}

        {/* Step 3: QR Code */}
        {step === "qr" && (
          <div className="text-center">
            <p className="mb-4">
              Scan this QR to pay{" "}
              <span className="font-bold text-green-400">₹{totalAmount}</span>
            </p>
            <div className="flex justify-center">
              <QRCode value={qrValue} size={150} />
            </div>
            <p className="mt-3 text-xs text-gray-400">
              Transaction ID: {transactionId}
            </p>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => {onClose(); setStep("input");}}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const MarketTable = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(null); // for modal
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 8;
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = tableData.slice(startIndex, endIndex);

  async function fetchAllTrades() {
    try {
      const res = await axios.get(`http://localhost:8000/trades`);
      setTableData(res.data.trades);
      console.log(res.data.trades);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAllTrades();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <motion.div
        className="bg-[#0a0f0d] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-[#0a0f0d] mb-8 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-gray-100 mb-6">
          HydroCoin Marketplace
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Seller Wallet ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Price Of One HydroCoin(₹)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Available Coins
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {tableData.map((seller) => (
                <motion.tr
                  key={seller.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {seller.producer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {seller.producer_wallet_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-semibold">
                    ₹{seller.prize_of_coin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 font-semibold">
                    {seller.coins_to_sell}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() =>
                        setSelectedPrice({
                          price: seller.prize_of_coin,
                          coins: seller.coins_to_sell,
                        })
                      }
                      className="px-3 py-1 bg-green-500 text-black rounded-lg hover:bg-green-400"
                    >
                      Purchase
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-gray-300">
            <div className="text-sm">
              Showing {startIndex + 1} to {Math.min(endIndex, tableData.length)}{" "}
              of {tableData.length} sellers
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
              >
                <ChevronLeft size={20} />
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <PurchaseModal
        isOpen={!!selectedPrice}
        onClose={() => setSelectedPrice(null)}
        coinPrice={selectedPrice?.price}
        availableCoins={selectedPrice?.coins}
      />
    </>
  );
};

export default MarketTable;
