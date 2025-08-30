// Trade.jsx
import React from "react";
import { MarketTable } from "./Table";
import { Sidebar } from "./Sidebar";
import { useNavigate } from "react-router-dom";

function Trade() {
  const navigate = useNavigate();

  // Handle purchase click
  const handlePurchase = (price) => {
    // pass selected price to purchase page using state
    navigate("/trade/purchase", { state: { coinPrice: price } });
  };

  return (
    <div className="flex h-screen bg-[#]">

      <div className="flex-1 h-full overflow-auto relative z-10 bg-[#121a14]">
        <header className="bg-[#0a0f0d] bg-opacity-50 backdrop-blur-md shadow-lg border-b border-[#0a0f0d] py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-[#e6ffe6]">Producer History</h1>
        </header>

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 bg-[#121a14]">
          <MarketTable onPurchase={handlePurchase} />
        </main>
      </div>
    </div>
  );
}

export default Trade;
