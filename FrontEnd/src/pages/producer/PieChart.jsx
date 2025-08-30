import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#39ff14", "#00ff9d", "#8aff80", "#10B981", "#F59E0B"];

export const MonthlyLiquidH2SalesChart = ({ data }) => {
  return (
    <motion.div
      className="bg-[#121a14] bg-opacity-60 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-[#39ff14]/40 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-[#e6ffe6] text-center">
        Monthly Liquid Hydrogen Sales
      </h2>
      {/* IMPORTANT: Set fixed height for chart container */}
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#0a0f0d"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#0a0f0d",
                border: "1px solid #39ff14",
                borderRadius: "0.5rem",
              }}
              itemStyle={{ color: "#e6ffe6" }}
            />
            <Legend
              wrapperStyle={{
                color: "#8aff80",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
