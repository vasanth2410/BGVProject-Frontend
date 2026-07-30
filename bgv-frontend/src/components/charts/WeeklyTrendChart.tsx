import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
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
  return (
    <ResponsiveContainer
      width="100%"
      height={220}
    >
      <BarChart data={data}>
        <XAxis
          dataKey="day"
          stroke="var(--text-color, #6b7280)"
          tick={{ fill: "var(--text-color, #6b7280)", fontSize: 12 }}
        />
        <YAxis
          stroke="var(--text-color, #6b7280)"
          tick={{ fill: "var(--text-color, #6b7280)", fontSize: 12 }}
        />
        <Tooltip
          cursor={{ fill: "rgba(148, 163, 184, 0.12)", rx: 6 }}
          contentStyle={{
            backgroundColor: "var(--appbar-bg, #ffffff)",
            borderColor: "rgba(148, 163, 184, 0.25)",
            color: "var(--text-color, #0f172a)",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            fontSize: "11px",
            padding: "4px 8px",
            lineHeight: "1.2"
          }}
          labelStyle={{
            color: "var(--text-color, #475569)",
            fontWeight: 700,
            marginBottom: "1px",
            fontSize: "11px"
          }}
          itemStyle={{
            color: "#2563eb",
            fontWeight: 600,
            padding: 0,
            margin: 0,
            fontSize: "11px"
          }}
        />

        <Bar
          dataKey="candidates"
          fill="#2563EB"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}