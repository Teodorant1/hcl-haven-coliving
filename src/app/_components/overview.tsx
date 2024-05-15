"use client";

import {
  Bar,
  BarChart,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    total: 10,
    // total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: 11,
    // total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: 12,
    // total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: 15,
    // total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: 18,
    // total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: 5,
    // total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: 0,
    // total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: 1,
    // total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: 7,
    // total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: 20,
    // total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: 30,
    // total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: 9,
    // total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          // fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          // fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
          label={{ position: "top", fill: "black" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
