import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { StateCard } from "./StateCard";
import { motion } from "framer-motion";
import { Currency, Package } from "lucide-react";
import HydroCoinCandlestickChart from "./HydroCoinCandlestickChart";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "@/Context/AuthContext";

function TradeDashboard() {
    const [showForm, setShowForm] = useState(false);
    const [hydroCoinValue, setHydroCoinValue] = useState(125.75); // ₹125.75 per HC
    const [userHydroCoins, setUserHydroCoins] = useState(300); // user has 300 HC
    const { producer } = useAuthContext();

    // Form inputs
    const [pricePerCoin, setPricePerCoin] = useState("");
    const [coinsToSell, setCoinsToSell] = useState("");

    const handleSell = async(e) => {
        e.preventDefault();
        console.log("Selling HydroCoins:", {
            pricePerCoin,
            coinsToSell,
        });
        // Example: subtract from user's coins (basic simulation)
        if(coinsToSell <= 0) {
            toast.error("Coins to sell should be greater than 0");
        }
        else if (coinsToSell <= userHydroCoins) {
            setUserHydroCoins(userHydroCoins - coinsToSell);
            try {
                const res = await axios.post(`http://localhost:8000/submit-trade`, {
                    producer_wallet_id: producer.walletId,
                    producer_name: producer.name,
                    coins_to_sell : coinsToSell,
                    prize_of_coin : pricePerCoin
                });
                console.log(res);
                toast.success(`${coinsToSell} HydroCoins listed at ₹${pricePerCoin} each`);
            }
            catch(err) {
                console.log(err);
                toast.error(err.response.data.message);
            }
            
            setShowForm(false);
            setPricePerCoin("");
            setCoinsToSell("");
        } else {
            toast.error("You don't have enough HydroCoins!");
        }
    };

    return (
        <div className="flex h-screen bg-[#]">
            {/* Main content */}
            <div className="flex-1 h-full overflow-auto relative z-10 bg-[#121a14]">
                <header className="flex justify-between items-center bg-[#0a0f0d] bg-opacity-50 backdrop-blur-md shadow-lg border-b border-[#0a0f0d] py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold text-[#e6ffe6]">
                        Hydrocoin Market-Space
                    </h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 rounded-xl bg-[#39ff14] text-black font-semibold shadow-md hover:bg-[#2ecc71] transition"
                    >
                        Sell HydroCoin
                    </button>
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
                        value={`₹${hydroCoinValue}`}
                        color="#39ff14"
                        className="w-full"
                    />

                    {/* 2nd Card: User's HydroCoin Balance */}
                    <StateCard
                        name="Your HydroCoins"
                        icon={Package}
                        value={`${userHydroCoins} HC`}
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

                {/* Sell HydroCoin Dashboard (Modal) */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="bg-[#1b2420] p-6 rounded-2xl shadow-lg w-full max-w-md text-[#e6ffe6]"
                        >
                            <h2 className="text-xl font-semibold mb-4">
                                Sell Your HydroCoins
                            </h2>
                            <form onSubmit={handleSell} className="space-y-4">
                                <div>
                                    <label className="block mb-1">Price per HydroCoin (₹)</label>
                                    <input
                                        type="number"
                                        value={pricePerCoin}
                                        onChange={(e) => setPricePerCoin(e.target.value)}
                                        className="w-full p-2 rounded-md bg-[#0a0f0d] text-[#e6ffe6] border border-gray-600"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Number of Coins to Sell</label>
                                    <input
                                        type="number"
                                        value={coinsToSell}
                                        onChange={(e) => setCoinsToSell(e.target.value)}
                                        className="w-full p-2 rounded-md bg-[#0a0f0d] text-[#e6ffe6] border border-gray-600"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded-lg bg-[#39ff14] text-black font-semibold shadow-md hover:bg-[#2ecc71] transition"
                                    >
                                        Confirm Sell
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TradeDashboard;
