function RiskBadge({ riskLevel }) {
  const r = (riskLevel || "").toLowerCase();
  const isLow = r.includes("low");
  const isHigh = r.includes("high");
  const isMedium = !isLow && !isHigh;

  const styles = isLow
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : isHigh
      ? "bg-red-50 text-red-700 border-red-200"
      : "bg-amber-50 text-amber-700 border-amber-200";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium border ${styles}`}
    >
      {riskLevel || "—"}
    </span>
  );
}

// Format number with Indian rupee formatting
function formatCurrency(value) {
  if (!value) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ResultCard({ result, loading, error }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          Prediction summary
        </h2>
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
        <p className="mt-4 text-sm text-gray-500">Fetching prediction…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          Prediction summary
        </h2>
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm font-medium text-red-800">Request failed</p>
          <p className="mt-1 text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          Prediction summary
        </h2>
        <p className="text-sm text-gray-500">
          Submit investment inputs to see risk and return predictions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
      <h2 className="text-lg font-semibold text-gray-900 mb-5">
        Prediction summary
      </h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Risk level</p>
          <RiskBadge riskLevel={result.risk_level} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">
            Expected return
          </p>
          <p className="text-xl font-semibold text-gray-900">
            {typeof result.expected_return === "number"
              ? `${result.expected_return}%`
              : result.expected_return}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">
            Projected value
          </p>
          <p className="text-lg font-medium text-gray-700">
            {formatCurrency(result.projected_value)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Model</p>
          <p className="text-gray-900">{result.model_used || "—"}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Confidence</p>
          <p className="text-gray-900">{result.confidence || "—"}</p>
        </div>
      </div>
    </div>
  );
}
