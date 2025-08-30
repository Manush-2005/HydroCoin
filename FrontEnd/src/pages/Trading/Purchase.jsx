import React, { useState } from "react";
import QRCode from "react-qr-code";

function PurchaseModal({ isOpen, onClose, coinPrice }) {
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState("input"); // "input" | "confirm" | "qr"

  if (!isOpen) return null; // ✅ Render nothing when closed

  const totalAmount = (coinPrice * quantity).toFixed(2);

  const handleNext = () => {
    setStep("confirm");
  };

  const handleConfirm = () => {
    setStep("qr");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-[#121a14] text-white rounded-2xl shadow-lg p-6 w-[400px]">
        <h2 className="text-xl font-bold mb-4">Purchase HydroCoin</h2>

        {/* Step 1: Enter Quantity */}
        {step === "input" && (
          <>
            <p className="mb-2">1 HydroCoin Price: ₹{coinPrice}</p>
            <label className="block mb-2 text-gray-300">Enter Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-2 rounded-lg bg-[#0a0f0d] border border-gray-600 text-white"
            />
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

        {/* Step 2: Confirm Purchase */}
        {step === "confirm" && (
          <>
            <p className="text-lg">
              You are buying{" "}
              <span className="font-bold text-green-400">{quantity}</span> coins
              for a total of{" "}
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

        {/* Step 3: Show QR */}
        {step === "qr" && (
          <div className="text-center">
            <p className="mb-4">
              Scan this QR to pay <br />
              <span className="font-bold text-green-400">₹{totalAmount}</span>
            </p>
            <div className="flex justify-center">
              <QRCode value={`pay-hydrocoin:${totalAmount}`} size={150} />
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={onClose}
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

export default PurchaseModal;
