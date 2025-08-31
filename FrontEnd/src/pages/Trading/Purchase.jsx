import React, { useState, useEffect } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import Checkout from "@/components/PaymentCom";

function PurchaseModal({ isOpen, onClose, coinPrice }) {
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState("input");
  const [cashfree, setCashfree] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [paymentSessionId, setPaymentSessionId] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");

  useEffect(() => {
    const initializeSDK = async () => {
      const cashfreeInstance = await load({ mode: "sandbox" });
      setCashfree(cashfreeInstance);
    };
    initializeSDK();
  }, []);

  if (!isOpen) return null;

  const totalAmount = (coinPrice * quantity).toFixed(2);

  const handleNext = () => {
    setStep("confirm");
  };

  const getSessionId = async () => {
    try {
      let res = await axios.post("http://localhost:8000/payment", {
        amount: totalAmount,
        quantity: quantity,
      });
      if (res.data && res.data.payment_session_id) {
        setOrderId(res.data.order_id);
        return res.data.payment_session_id;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyPayment = async () => {
    try {
      let res = await axios.post("http://localhost:8000/verify", {
        orderId: orderId,
      });
      if (res && res.data) {
        alert("Payment is done!");
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePay = async () => {
    let sessionId = await getSessionId();
    console.log(
      "Payment session ID:",
      sessionId
    );

    setPaymentSessionId(sessionId);
    setStep("checkout");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-[#121a14] text-white rounded-2xl shadow-lg p-6 w-[400px]">
        <h2 className="text-xl font-bold mb-4">Purchase HydroCoin</h2>
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

            <h1> Destination Wallet address</h1>
             <input
              type="walletaddress"
              min="1"
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
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
                onClick={handlePay}
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-black font-semibold"
              >
                Pay Now
              </button>
            </div>
          </>
        )}
        {step === "checkout" && (
          <Checkout
            paymentSessionId={paymentSessionId}
            amount={totalAmount}
            onClose={onClose}
            walletAddress={destinationAddress}
            
          />
        )}
      </div>
    </div>
  );
}
export default PurchaseModal;