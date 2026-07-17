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
    "#F59E0B",
    "#16A34A",
    "#EF4444",
  ];

  const total = pending + approved + rejected;

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
          innerRadius={60}
          outerRadius={85}
          paddingAngle={3}
          label={false}
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

        <text
          x="50%"
          y="46%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: "14px",
            fill: "#6b7280",
            fontWeight: 500,
          }}
        >
          Total
        </text>
        <text
          x="50%"
          y="56%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: "24px",
            fill: "var(--text-color, #111827)",
            fontWeight: 700,
          }}
        >
          {total}
        </text>

      </PieChart>
    </ResponsiveContainer>
  );
}