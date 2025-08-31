import React, { useEffect, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";

function Checkout({ paymentSessionId, amount, onClose,walletAddress }) {
  const [cashfree, setCashfree] = useState(null);

  useEffect(() => {
    const initializeSDK = async () => {
      const cashfreeInstance = await load({ mode: "sandbox" });
      setCashfree(cashfreeInstance);
    };
    initializeSDK();
  }, []);

  const doPayment = async () => {
    if (!cashfree) return;
    let checkoutOptions = {
      paymentSessionId,
      redirectTarget: "_self",
    };


    try {

      const res = await axios.post("http://localhost:8000/mint-tokens",

        {
  "producer": walletAddress,
  "amount": amount/100,
  "ipfsHash": "QmXyz123456789abcdef..."
}

      );
      console.log("minting response:", res.data);
    }
    catch(error){
      console.error("Error during payment:", error);
    }


    cashfree.checkout(checkoutOptions);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <p className="mb-2">Amount to Pay: <span className="font-bold">₹{amount}</span></p>
      <button
        type="button"
        className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-black font-semibold"
        onClick={doPayment}
      >
        Pay Now
      </button>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
      >
        Cancel
      </button>
    </div>
  );
}

export default Checkout;