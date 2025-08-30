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
      <h2 className="text-xl font-semibold text-[#39ff14] mb-4">Monthly Green Hydrogen Production</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2920" />
            <XAxis dataKey="month" stroke="#8aff80" />
            <YAxis stroke="#8aff80" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(18, 26, 20, 0.9)",
                borderColor: "#39ff14",
              }}
              itemStyle={{ color: "#39ff14" }}
            />
            <Legend wrapperStyle={{ color: "#8aff80" }} />
            <Line
              type="monotone"
              dataKey="production"
              stroke="#00ff9d"
              strokeWidth={3}
              dot={{ r: 4, stroke: "#39ff14", strokeWidth: 2, fill: "#00ff9d" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
