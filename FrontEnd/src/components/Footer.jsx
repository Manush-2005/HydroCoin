export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-green-500 mb-2">HydroCoin</h2>
          <p className="text-gray-400">Green Hydrogen Powered by Blockchain</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-green-500">Home</a></li>
            <li><a href="#how-it-works" className="hover:text-green-500">How It Works</a></li>
            <li><a href="#dashboard" className="hover:text-green-500">Dashboard</a></li>
            <li><a href="#faq" className="hover:text-green-500">FAQ</a></li>
          </ul>
        </div>

        {/* Resources / Social */}
        <div>
          <h3 className="font-semibold mb-2">Resources</h3>
          <ul className="space-y-1">
            <li><a href="https://github.com" target="_blank" className="hover:text-green-500">GitHub</a></li>
            <li><a href="https://twitter.com" target="_blank" className="hover:text-green-500">Twitter</a></li>
            <li><a href="https://linkedin.com" target="_blank" className="hover:text-green-500">LinkedIn</a></li>
            <li><a href="https://medium.com" target="_blank" className="hover:text-green-500">Docs / Blog</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>Email: <a href="mailto:support@hydrocoin.io" className="hover:text-green-500">support@hydrocoin.io</a></p>
          <p>Telegram: <a href="#" className="hover:text-green-500">@HydroCoinSupport</a></p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500 text-sm">
        © 2025 HydroCoin. All rights reserved. Hackathon Demo.
      </div>
    </footer>
  );
}
