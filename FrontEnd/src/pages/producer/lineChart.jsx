import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const GreenHydrogenChart = ({ data }) => {
  return (
    <motion.div
      className="bg-[#0a0f0d] bg-opacity-60 backdrop-blur-md shadow-lg rounded-xl p-3 md:p-6 border border-[#121a14] w-[18rem] md:w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-[#e6ffe6] mb-4">
        Monthly Green Hydrogen Production
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2920" />
            <XAxis dataKey="month" stroke="#ADD8E6" /> {/* light pink */}
            <YAxis stroke="#ADD8E6" /> {/* light blue */}
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #FFB6C1",
                borderRadius: "0.5rem",
              }}
              itemStyle={{ color: "#4CC9F0", fontWeight: "bold" }}
            />
            <Legend wrapperStyle={{ color: "#F5DEB3", fontWeight: "bold" }} />
            
            {/* Multiple lines */}
            <Line
              type="monotone"
              dataKey="production"
              stroke="#FFB6C1" // pink
              strokeWidth={3}
              dot={{ r: 4, stroke: "#FFB6C1", strokeWidth: 2, fill: "#FFB6C1" }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="export"
              stroke="#ADD8E6" // blue
              strokeWidth={3}
              dot={{ r: 4, stroke: "#ADD8E6", strokeWidth: 2, fill: "#ADD8E6" }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="consumption"
              stroke="#90EE90" // green
              strokeWidth={3}
              dot={{ r: 4, stroke: "#90EE90", strokeWidth: 2, fill: "#90EE90" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
