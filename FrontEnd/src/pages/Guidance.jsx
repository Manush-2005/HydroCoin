import React from 'react'

function Guidance() {
    const steps = [
        { title: "1. Install MetaMask", desc: "Install extension or mobile app.", img: "/screenshots/install.png" },
        { title: "2. Create Wallet", desc: "Set password to create wallet.", img: "/screenshots/create_wallet.png" },
        { title: "3. Save Seed Phrase", desc: "Write down your 12-word phrase.", img: "/screenshots/seed.png" },
        { title: "4. Confirm Seed Phrase", desc: "Confirm the phrase to finish setup.", img: "/screenshots/confirm.png" },
        { title: "5. Copy Address", desc: "Copy your wallet address (0x...).", img: "/screenshots/copy_address.png" },
        { title: "6. Connect to HydroCoin", desc: "Click connect & sign to register.", img: "/screenshots/connect.png" },
    ];

    return (
        <div className="max-w-6xl mx-auto py-16 px-4 ">
            <h2 className="text-3xl font-bold text-center mb-4">How to Get Started with HydroCoin</h2>
            <p className="text-center text-gray-600 mb-12 ">
                Follow these simple steps to create a MetaMask wallet and register on our platform.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, idx) => (
                    <div key={idx} className="bg-hydrogen-card p-5 rounded-xl border border-hydrogen-neon/40 shadow-[0_0_6px_#39ff14aa] hover:shadow-[0_0_10px_#39ff14cc] transition min-h-[20px]">
                        
                        <h3 className="font-semibold text-xl mb-2 text-center text-hydrogen-neon">{step.title}</h3>
                        <p className="text--500 text-center">{step.desc}</p>
                    </div>
                ))}
            </div>
            <div className="text-center mt-12">
                <button className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-green-700">
                    Connect Wallet Now
                </button>
            </div>
        </div>

    )
}

export default Guidance