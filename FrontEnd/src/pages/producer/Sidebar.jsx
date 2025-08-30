import { BarChart2, NotebookTabs, LogOut, TrendingUp, History } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
// import { getAuth, signOut } from "firebase/auth";
// import { app } from "../../config/firebase";

const SIDEBAR_ITEMS = [

  { name: "Dashboard", icon: BarChart2, color: "6366f1", href: "/producer/dashboard" },
  { name: "History", icon: NotebookTabs, color: "#00ff9d", href: "/producer/history" },
  { name: "Trends", icon: TrendingUp, color: "#1e00ffff", href: "/producer/trading/dashboard" },
  { name: "Trading", icon: History, color: "#ff00d0ff", href: "/producer/trading/trade" },
  { name: "Logout", icon: LogOut, color: "#ff0233", href: "/login" },

];

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 bg-[$0a0f0d] ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-[#0a0f0d] bg-opacity-100 backdrop-blur-md p-4 flex flex-col border-r border-[#0a0f0d]">
        <motion.menu
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-[#121a14] transition-colors max-w-fit"
        >
          <Menu size={24} color="#39ff14" />
        </motion.menu>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div
                className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#121a14] transition-colors mb-2 cursor-pointer"
              >
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap text-[#e6ffe6]"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};
