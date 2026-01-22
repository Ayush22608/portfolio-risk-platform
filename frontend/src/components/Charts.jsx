import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Professional color palette for fintech
const COLORS = {
  conservative: "#94a3b8", // Muted slate
  balanced: "#94a3b8",     // Muted slate
  aggressive: "#94a3b8",   // Muted slate
  yourPortfolio: "#2563eb", // Vibrant blue
};

// Baseline benchmarks for comparison
const BASELINE_RETURNS = {
  conservative: 7.5,
  balanced: 12.0,
  aggressive: 18.0,
};

export default function Charts({ result }) {
  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Portfolio comparison
        </h2>
        <div className="h-[280px] flex items-center justify-center text-gray-400 text-sm">
          Run an analysis to compare your portfolio with market benchmarks.
        </div>
      </div>
    );
  }

  const userReturn =
    typeof result.expected_return === "number"
      ? result.expected_return
      : parseFloat(result.expected_return) || 0;

  const data = [
    {
      name: "Conservative",
      return: BASELINE_RETURNS.conservative,
      fill: COLORS.conservative,
      isUserPortfolio: false,
    },
    {
      name: "Balanced",
      return: BASELINE_RETURNS.balanced,
      fill: COLORS.balanced,
      isUserPortfolio: false,
    },
    {
      name: "Aggressive",
      return: BASELINE_RETURNS.aggressive,
      fill: COLORS.aggressive,
      isUserPortfolio: false,
    },
    {
      name: "Your Portfolio",
      return: userReturn,
      fill: COLORS.yourPortfolio,
      isUserPortfolio: true,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Portfolio comparison
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Expected annual return vs market benchmarks
        </p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            unit="%"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            width={40}
            domain={[0, 'auto']}
          />
          <Tooltip
            formatter={(val) => [`${val}%`, "Expected return"]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              fontSize: "12px",
            }}
            cursor={{ fill: "#f3f4f6" }}
          />
          <Bar dataKey="return" radius={[6, 6, 0, 0]} maxBarSize={80}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.fill}
                opacity={entry.isUserPortfolio ? 1 : 0.6}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-gray-400 opacity-60"></div>
          <span>Market benchmarks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
          <span>Your portfolio</span>
        </div>
      </div>
    </div>
  );
}
