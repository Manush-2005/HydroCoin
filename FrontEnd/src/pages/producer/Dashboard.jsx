import React, { useState } from "react";
import { Table } from "./Table";
import { Sidebar } from "./Sidebar";
import { LastPendingRequest } from "./Request";
import { LineChart } from "recharts";
import monthlyProductionData from "@/Data/monthlyproduction";
import Form from "./Form";
import { MonthlyLiquidH2SalesChart } from "./PieChart";
import salesData from "@/Data/monthlySell";
import { GreenHydrogenChart } from "./lineChart";

function Dashboard() {
  const [showForm, setShowForm] = new useState(false);
  return (
    <div className="flex h-screen bg-[#]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 h-full overflow-auto relative z-10 bg-[#121a14]">
        <header className="flex bg-[#0a0f0d] bg-opacity-50 backdrop-blur-md shadow-lg border-b border-[#0a0f0d] py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-[#e6ffe6]">
            Producer Dashboard
          </h1>

          <button
            onClick={() => setShowForm(true)} // open form state
            className="ml-auto px-4 py-2 text-[#39ff14] font-medium border-2 border-[#39ff14] rounded-lg bg-black bg-opacity-20 hover:bg-[#39ff14] hover:text-black transition-colors duration-300"
            >
            Create Request
          </button>
        </header>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-full max-w-3xl p-6 bg-[#0a0f0d] rounded-xl shadow-lg border border-[#121a14]">
              <Form onClose={() => setShowForm(false)} />
            </div>
          </div>
        )}
        
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 bg-[#121a14]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GreenHydrogenChart data={monthlyProductionData} />
            <MonthlyLiquidH2SalesChart data={salesData} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
