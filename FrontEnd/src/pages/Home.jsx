import Navbar from "@/components/Navbar";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-hydrogen-bg text-hydrogen-text font-futuristic">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="max-w-3xl text-5xl font-extrabold leading-tight">
          <span className="text-hydrogen-neon">Green Hydrogen</span> powered{" "}
          <br /> by <span className="text-white">Blockchain</span>
        </h1>
        <p className="max-w-2xl mt-6 text-lg text-hydrogen-muted">
          The state-funded research project "Blockchain-Based Hydrogen Market –
          BBH2" also known as HydrogenChain, supports the development of an
          european hydrogen market through the use of blockchain technology.
        </p>
        <button className="px-6 py-3 mt-8 font-bold transition rounded-lg bg-hydrogen-neon text-hydrogen-bg shadow-neon hover:bg-hydrogen-neonSoft">
          Learn more
        </button>
      </section>

      {/* How Do We Work Section */}
      {/* How Do We Work Section */}
      <section className="px-6 py-20 bg-[#121a14]">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">
            How do <span className="text-hydrogen-neon">we work?</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-hydrogen-muted">
            Our process ensures transparency, sustainability, and innovation by
            leveraging blockchain for green hydrogen production and trading.
          </p>
        </div>

        {/* Cards */}
        <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-4">
          {/* Step 1 */}
          <div className="flex flex-col justify-between bg-hydrogen-card p-6 rounded-xl border border-hydrogen-neon/40 shadow-[0_0_8px_#39ff14aa] hover:shadow-[0_0_12px_#39ff14cc] transition min-h-[250px]">
            <h3 className="text-xl font-bold text-hydrogen-neon">
              1. Production
            </h3>
            <p className="mt-3 text-hydrogen-text">
              Green hydrogen is produced from renewable energy sources ensuring
              sustainability.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col justify-between bg-hydrogen-card p-6 rounded-xl border border-hydrogen-neon/40 shadow-[0_0_8px_#39ff14aa] hover:shadow-[0_0_12px_#39ff14cc] transition min-h-[250px]">
            <h3 className="text-xl font-bold text-hydrogen-neon">
              2. Verification
            </h3>
            <p className="mt-3 text-hydrogen-text">
              Every unit of hydrogen is tracked and verified using blockchain to
              ensure transparency.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col justify-between bg-hydrogen-card p-6 rounded-xl border border-hydrogen-neon/40 shadow-[0_0_8px_#39ff14aa] hover:shadow-[0_0_12px_#39ff14cc] transition min-h-[250px]">
            <h3 className="text-xl font-bold text-hydrogen-neon">
              3. Approval
            </h3>
            <p className="mt-3 text-hydrogen-text">
              Verified hydrogen goes through regulatory and quality approvals
              before entering the market.
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col justify-between bg-hydrogen-card p-6 rounded-xl border border-hydrogen-neon/40 shadow-[0_0_8px_#39ff14aa] hover:shadow-[0_0_12px_#39ff14cc] transition min-h-[250px]">
            <h3 className="text-xl font-bold text-hydrogen-neon">
              4. Benefits
            </h3>
            <p className="mt-3 text-hydrogen-text">
              Producers, traders, and consumers gain secure trading,
              transparency, and sustainable energy usage.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
