"use client";
import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Label
} from "recharts";

// Dummy candlestick data
const data = [
  { date: "2025-08-20", open: 120, close: 135, high: 140, low: 115 },
  { date: "2025-08-21", open: 135, close: 128, high: 138, low: 125 },
  { date: "2025-08-22", open: 128, close: 145, high: 150, low: 125 },
  { date: "2025-08-23", open: 145, close: 140, high: 155, low: 138 },
  { date: "2025-08-24", open: 140, close: 150, high: 155, low: 135 },
];

// Custom candlestick renderer
const Candle = (props) => {
  const { x, width, payload, yScale } = props;
  const color = payload.close > payload.open ? "#10B981" : "#EF4444"; // green/red
  const mid = x + width / 2;

  return (
    <g>
      {/* Wick */}
      <line
        x1={mid}
        x2={mid}
        y1={yScale(payload.high)}
        y2={yScale(payload.low)}
        stroke={color}
        strokeWidth={2}
      />
      {/* Body */}
      <rect
        x={x + width * 0.25}
        y={Math.min(yScale(payload.open), yScale(payload.close))}
        width={width * 0.5}
        height={Math.abs(yScale(payload.open) - yScale(payload.close))}
        fill={color}
      />
    </g>
  );
};

const HydroCoinCandlestickChart = () => {
  // Extract month & year from first data point
  const firstDate = new Date(data[0].date);
  const monthYear = firstDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-black rounded-2xl p-4 shadow-md w-full max-w-5xl mx-auto relative">
      {/* Chart Title */}
      <h2 className="text-xl font-semibold mb-2 text-center text-gray-200 dark:text-gray-100">
        HydroCoin Daily Prediction
      </h2>

      {/* Month-Year top right */}
      <div className="absolute top-3 right-6 text-gray-400 text-sm font-medium">
        {monthYear}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          {/* X Axis shows only numeric day */}
          <XAxis
            dataKey="date"
            tickFormatter={(d) => new Date(d).getDate()} // only day
          >
            <Label value="Day" offset={-5} position="insideBottom" />
          </XAxis>

          {/* Y Axis */}
          <YAxis domain={[100, 160]}>
            <Label
              value="Price (₹)"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>

          <Tooltip />
          <Bar
            dataKey="close"
            fill="#8884d8"
            shape={<Candle yScale={(v) => 400 - (v / 160) * 350} />}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HydroCoinCandlestickChart;
