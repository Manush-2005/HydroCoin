import React from "react";

function AboutUs() {
  return (
    <section className="px-6 py-20 bg-hyfrogen-bg">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">
          How do <span className="text-hydrogen-neon">we work?</span>
        </h2>
        <p className="text-hydrogen-muted mt-3 max-w-2xl mx-auto">
          From liquid hydrogen production to blockchain-based trading,
          our process ensures trust, transparency, and real-world benefits.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {/* Step 1: Production */}
        <div className="bg-hydrogen-card p-5 rounded-xl border border-hydrogen-neon/40 shadow-[0_0_6px_#39ff14aa] hover:shadow-[0_0_10px_#39ff14cc] transition min-h-[250px]">
          <h3 className="text-lg font-bold text-hydrogen-neon">1. Production</h3>
          <p className="mt-2 text-sm text-hydrogen-text leading-relaxed">
            Liquid hydrogen (H₂) is produced from renewable sources.
            It is a clean, efficient, and highly useful form of energy.
            This becomes the foundation of our green hydrogen ecosystem.
          </p>
        </div>

        {/* Step 2: Request */}
        <div className="bg-hydrogen-card p-5 rounded-xl border border-hydrogen-neon/40 shadow-[0_0_6px_#39ff14aa] hover:shadow-[0_0_10px_#39ff14cc] transition min-h-[250px]">
          <h3 className="text-lg font-bold text-hydrogen-neon">2. Request</h3>
          <p className="mt-2 text-sm text-hydrogen-text leading-relaxed">
            Producers sell hydrogen to government or registered customers.
            A digital request is generated on the blockchain platform
            to initiate the verification and approval process.
          </p>
        </div>

        {/* Step 3: Verification */}
        <div className="bg-hydrogen-card p-5 rounded-xl border border-hydrogen-neon/40 shadow-[0_0_6px_#39ff14aa] hover:shadow-[0_0_10px_#39ff14cc] transition min-h-[250px]">
          <h3 className="text-lg font-bold text-hydrogen-neon">3. Verification</h3>
          <p className="mt-2 text-sm text-hydrogen-text leading-relaxed">
            The request undergoes strict verification.
            Certificates, legal documents, and compliance records
            are checked to ensure authenticity and trust.
          </p>
        </div>

        {/* Step 4: Approval & Benefits */}
        <div className="bg-hydrogen-card p-5 rounded-xl border border-hydrogen-neon/40 shadow-[0_0_6px_#39ff14aa] hover:shadow-[0_0_10px_#39ff14cc] transition min-h-[250px]">
          <h3 className="text-lg font-bold text-hydrogen-neon">
            4. Approval & Benefits
          </h3>
          <p className="mt-2 text-sm text-hydrogen-text leading-relaxed">
            Once approved, HydroCoins are credited to producers.
            They can access subsidies, rewards, and market benefits,
            making green hydrogen both profitable and sustainable.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
