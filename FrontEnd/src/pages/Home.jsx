import AboutUs from "./AboutUs";
import Guidance from "./Guidance";
import PurchaseModal from "./Trading/Purchase";

// App.jsx
export default function LandingPage() {
  return (
    <div className="bg-hydrogen-bg text-hydrogen-text min-h-screen font-futuristic">





      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl font-extrabold leading-tight max-w-3xl">
          <span className="text-hydrogen-neon">Green Hydrogen</span>{" "}
          powered <br /> by <span className="text-white">Blockchain</span>
        </h1>
        <p className="text-lg text-hydrogen-muted mt-6 max-w-2xl">
          HydroCoin creates a transparent, tokenized hydrogen economy, where every kilogram of green hydrogen is certified and traded on blockchain. Producers, governments, and industries can verify, trade, and incentivize clean hydrogen production seamlessly.
        </p>
        <button className="mt-8 px-6 py-3 bg-hydrogen-neon text-hydrogen-bg rounded-lg font-bold shadow-neon hover:bg-hydrogen-neonSoft transition">
          Learn more
        </button>

         {/* <PurchaseModal isOpen={true} onClose={() => {}} coinPrice={100} /> */}
      </section>

     <AboutUs/>
     <Guidance />

    </div>
  );
}

