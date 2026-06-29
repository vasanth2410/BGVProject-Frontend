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
      height={300}
    >
      <BarChart data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="candidates"
          fill="#3b82f6"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}