import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const data = [
  { day: "Mon", candidates: 4 },
  { day: "Tue", candidates: 7 },
  { day: "Wed", candidates: 5 },
  { day: "Thu", candidates: 9 },
  { day: "Fri", candidates: 6 },
  { day: "Sat", candidates: 8 },
  { day: "Sun", candidates: 3 },
];

export default function WeeklyTrendChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <ResponsiveContainer width="100%" height={230}>
      <BarChart
        data={data}
        onMouseLeave={() => setActiveIndex(null)}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          {/* Main Cyan to Azure Gradient */}
          <linearGradient id="cyanAzureGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity={1} />
            <stop offset="100%" stopColor="#2563EB" stopOpacity={1} />
          </linearGradient>

          {/* Active Hover Glow Gradient */}
          <linearGradient id="activeBarGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity={1} />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity={1} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="day"
          stroke="var(--text-color, #6b7280)"
          tick={{ fill: "var(--text-color, #94a3b8)", fontSize: 12, fontWeight: 500 }}
          axisLine={{ stroke: "rgba(148, 163, 184, 0.2)" }}
          tickLine={false}
        />
        <YAxis
          stroke="var(--text-color, #6b7280)"
          tick={{ fill: "var(--text-color, #94a3b8)", fontSize: 12 }}
          axisLine={{ stroke: "rgba(148, 163, 184, 0.2)" }}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(0, 240, 255, 0.06)", rx: 8 }}
          contentStyle={{
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            borderColor: "rgba(0, 240, 255, 0.4)",
            color: "#f8fafc",
            borderRadius: "8px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 0 12px rgba(0, 240, 255, 0.2)",
            fontSize: "12px",
            padding: "6px 12px",
            backdropFilter: "blur(8px)",
          }}
          labelStyle={{
            color: "#38bdf8",
            fontWeight: 700,
            marginBottom: "2px",
          }}
          itemStyle={{
            color: "#00f0ff",
            fontWeight: 600,
          }}
        />

        <Bar
          dataKey="candidates"
          radius={[8, 8, 0, 0]}
          isAnimationActive={true}
          animationDuration={1200}
          animationEasing="ease-out"
        >
          {data.map((_, index) => {
            const isActive = activeIndex === index;
            const isAnyActive = activeIndex !== null;
            return (
              <Cell
                key={`cell-${index}`}
                fill={isActive ? "url(#activeBarGradient)" : "url(#cyanAzureGradient)"}
                opacity={isAnyActive ? (isActive ? 1 : 0.35) : 1}
                style={{
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  filter: isActive
                    ? "drop-shadow(0 0 10px rgba(0, 240, 255, 0.85)) drop-shadow(0 0 20px rgba(37, 99, 235, 0.5))"
                    : "none",
                }}
                onMouseEnter={() => setActiveIndex(index)}
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}