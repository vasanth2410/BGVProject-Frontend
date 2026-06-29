import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  pending: number;
  approved: number;
  rejected: number;
}

export default function StatusBreakdownChart({
  pending,
  approved,
  rejected,
}: Props) {

  const data = [
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "Approved",
      value: approved,
    },
    {
      name: "Rejected",
      value: rejected,
    },
  ];

  const COLORS = [
    "#f59e0b",
    "#10b981",
    "#ef4444",
  ];

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <PieChart>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>
    </ResponsiveContainer>
  );
}