// App.jsx
export default function App() {
  return (
    <div className="bg-hydrogen-bg text-hydrogen-text min-h-screen font-futuristic">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-[#0f1411]">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl text-white">
            ⚡ HYDROGEN<span className="text-hydrogen-neon">CHAIN</span>
          </span>
        </div>
        <ul className="flex space-x-8">
          <li><a href="#" className="hover:text-hydrogen-neon">Home</a></li>
          <li><a href="#" className="hover:text-hydrogen-neon">What's new</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl font-extrabold leading-tight max-w-3xl">
          <span className="text-hydrogen-neon">Green Hydrogen</span>{" "}
          powered <br /> by <span className="text-white">Blockchain</span>
        </h1>
        <p className="text-lg text-hydrogen-muted mt-6 max-w-2xl">
          The state-funded research project "Blockchain-Based Hydrogen Market – BBH2"
          also known as HydrogenChain, supports the development of an european hydrogen
          market through the use of blockchain technology.
        </p>
        <button className="mt-8 px-6 py-3 bg-hydrogen-neon text-hydrogen-bg rounded-lg font-bold shadow-neon hover:bg-hydrogen-neonSoft transition">
          Learn more
        </button>
      </section>

      {/* How Do We Work Section */}
      <section className="px-6 py-20 bg-[#121a14]">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            How do <span className="text-hydrogen-neon">we work?</span>
          </h2>
          <p className="text-hydrogen-muted mt-4 max-w-2xl mx-auto">
            Our process ensures transparency, sustainability, and innovation by 
            leveraging blockchain for green hydrogen production and trading.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div className="bg-hydrogen-card p-6 rounded-xl border border-hydrogen-neon shadow-neon hover:shadow-neonHover transition">
            <h3 className="text-xl font-bold text-hydrogen-neon">1. Production</h3>
            <p className="mt-3 text-hydrogen-text">
              Green hydrogen is produced from renewable sources using clean energy.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-hydrogen-card p-6 rounded-xl border border-hydrogen-neon shadow-neon hover:shadow-neonHover transition">
            <h3 className="text-xl font-bold text-hydrogen-neon">2. Verification</h3>
            <p className="mt-3 text-hydrogen-text">
              Each unit of hydrogen is tracked and verified on the blockchain for transparency.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-hydrogen-card p-6 rounded-xl border border-hydrogen-neon shadow-neon hover:shadow-neonHover transition">
            <h3 className="text-xl font-bold text-hydrogen-neon">3. Trading</h3>
            <p className="mt-3 text-hydrogen-text">
              Tokens representing hydrogen can be traded securely in the market.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
