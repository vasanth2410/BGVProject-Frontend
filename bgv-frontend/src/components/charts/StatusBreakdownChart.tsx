import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const data = [
    {
      name: "Approved",
      value: approved,
      color: "#16A34A",
    },
    {
      name: "Pending",
      value: pending,
      color: "#F59E0B",
    },
    {
      name: "Rejected",
      value: rejected,
      color: "#EF4444",
    },
  ];

  const total = pending + approved + rejected;
  const isAllZero = total === 0;
  const chartData = isAllZero
    ? [{ name: "No Data", value: 1, color: "rgba(255, 255, 255, 0.12)" }]
    : data;

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius - 2}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          style={{
            filter: `drop-shadow(0px 0px 10px ${fill}aa)`,
            transition: "all 0.2s ease-in-out"
          }}
        />
      </g>
    );
  };

  const PieComponent = Pie as any;
  const activeItem = activeIndex !== null && !isAllZero ? data[activeIndex] : null;
  const activePct = activeItem && total > 0 ? Math.round((activeItem.value / total) * 100) : 0;

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <ResponsiveContainer width="100%" height={185}>
        <PieChart>
          <PieComponent
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={65}
            paddingAngle={isAllZero ? 0 : 3}
            label={false}
            activeIndex={activeIndex !== null && !isAllZero ? activeIndex : undefined}
            activeShape={isAllZero ? undefined : renderActiveShape}
            onMouseEnter={isAllZero ? undefined : (_: any, index: number) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {chartData.map((entry, index) => {
              const isHovered = activeIndex === index;
              const isAnyHovered = activeIndex !== null;
              const opacity = isAnyHovered ? (isHovered ? 1 : 0.25) : 1;

              return (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  opacity={opacity}
                  style={{
                    transition: "opacity 0.25s ease-in-out",
                    cursor: isAllZero ? "default" : "pointer"
                  }}
                />
              );
            })}
          </PieComponent>

          <Tooltip
            formatter={(val: any, name: any) => [
              `${val} (${total > 0 ? Math.round((Number(val) / total) * 100) : 0}%)`,
              name
            ]}
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
            itemStyle={{
              color: "var(--text-color, #0f172a)",
              fontSize: "11px",
              padding: 0,
              margin: 0
            }}
            labelStyle={{
              color: "var(--text-color, #0f172a)",
              fontSize: "11px"
            }}
          />

          {/* Dynamic Center Text */}
          <text
            x="50%"
            y={activeItem ? "36%" : "42%"}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: "11px",
              fill: activeItem ? activeItem.color : "#6b7280",
              fontWeight: 700,
              letterSpacing: "0.5px",
              pointerEvents: "none",
              transition: "all 0.2s ease-in-out"
            }}
          >
            {activeItem ? activeItem.name : "Total"}
          </text>
          <text
            x="50%"
            y={activeItem ? "50%" : "55%"}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: "20px",
              fill: activeItem ? activeItem.color : "var(--text-color, #111827)",
              fontWeight: 800,
              pointerEvents: "none",
              transition: "all 0.2s ease-in-out"
            }}
          >
            {activeItem ? activeItem.value : total}
          </text>
          {activeItem && (
            <text
              x="50%"
              y="63%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "11px",
                fill: activeItem.color,
                fontWeight: 700,
                pointerEvents: "none",
                transition: "all 0.2s ease-in-out"
              }}
            >
              ({activePct}%)
            </text>
          )}
        </PieChart>
      </ResponsiveContainer>

      {/* Interactive Legend with Live Counts */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "18px",
          marginTop: "10px",
          flexWrap: "wrap"
        }}
      >
        {data.map((entry, index) => {
          const isHovered = activeIndex === index;
          const isAnyHovered = activeIndex !== null;
          const opacity = isAnyHovered ? (isHovered ? 1 : 0.3) : 1;

          return (
            <div
              key={entry.name}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                opacity,
                transform: isHovered ? "scale(1.08)" : "scale(1)",
                transition: "all 0.2s ease-in-out",
                userSelect: "none"
              }}
            >
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: entry.color,
                  borderRadius: "3px",
                  display: "inline-block",
                  boxShadow: isHovered ? `0 0 10px ${entry.color}` : "none",
                  transition: "all 0.2s ease-in-out"
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: isHovered ? 700 : 500,
                  color: isHovered ? entry.color : "var(--text-color, #374151)",
                  transition: "all 0.2s ease-in-out"
                }}
              >
                {entry.name} <span style={{ opacity: 0.85, fontWeight: isHovered ? 800 : 600 }}>({entry.value})</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}