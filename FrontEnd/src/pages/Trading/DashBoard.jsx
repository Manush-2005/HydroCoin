import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { StateCard } from "./StateCard";
import { motion } from "framer-motion";
import { Currency, Package } from "lucide-react";
import HydroCoinCandlestickChart from "./HydroCoinCandlestickChart";
function TradeDashboard() {
    const [showForm, setShowForm] = new useState(false);
    const [hydroCoinValue, setHydroCoinValue] = useState(125.75); // ₹125.75 per HC
    const [userHydroCoins, setUserHydroCoins] = useState(300); // user has 300 HC
    return (
        <div className="flex h-screen bg-[#]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 h-full overflow-auto relative z-10 bg-[#121a14]">
                <header className="flex bg-[#0a0f0d] bg-opacity-50 backdrop-blur-md shadow-lg border-b border-[#0a0f0d] py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold text-[#e6ffe6]">
                        Hydrocoin Market-Space
                    </h1>
                </header>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5 w-full max-w-5xl mx-auto px-4 mt-7"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* 1st Card: Real-time HydroCoin Value */}
                    <StateCard
                        name="HydroCoin Value"
                        icon={Currency}
                        value={`₹${hydroCoinValue}`} // e.g. 120.50
                        color="#39ff14"
                        className="w-full"
                    />

                    {/* 2nd Card: User's HydroCoin Balance */}
                    <StateCard
                        name="Your HydroCoins"
                        icon={Package}
                        value={`${userHydroCoins} HC`} // e.g. 250 HC
                        color="#10B981"
                        className="w-full"
                    />
                </motion.div>
                <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 bg-[#121a14]">
                    <div className="flex justify-center">
                        <div className="w-full max-w-4xl">
                            <HydroCoinCandlestickChart />
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
}

export default TradeDashboard;
