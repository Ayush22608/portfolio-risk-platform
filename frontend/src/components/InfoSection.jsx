import { useState } from "react";

export default function InfoSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-blue-100/50 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-gray-900">
            How this prediction works
          </h3>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-6 pb-5 pt-2 space-y-4 text-sm text-gray-700 animate-fadeIn">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Machine Learning Model
            </h4>
            <p className="leading-relaxed pl-3.5">
              This application uses a <strong>Random Forest Regressor</strong>{" "}
              trained on historical market data from the NIFTY index. Random
              Forest is an ensemble learning method that combines multiple
              decision trees to make accurate predictions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Features & Data Processing
            </h4>
            <p className="leading-relaxed pl-3.5 mb-2">
              The model analyzes several key financial indicators:
            </p>
            <ul className="space-y-1.5 pl-3.5">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  <strong>Investment Horizon:</strong> Time period for
                  investment (short-term vs long-term)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  <strong>Risk Appetite:</strong> Investor's tolerance for
                  market fluctuations
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  <strong>Market Volatility:</strong> Historical price variation
                  and standard deviation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  <strong>Momentum Indicators:</strong> Rate of price changes
                  and trend strength
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>
                  <strong>Moving Averages:</strong> Trend analysis using 50-day
                  and 200-day averages
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Prediction Output
            </h4>
            <p className="leading-relaxed pl-3.5">
              The model outputs an <strong>estimated annual return
              percentage</strong> and classifies the portfolio into risk
              categories (Low, Medium, High) based on historical patterns and
              market behavior.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-blue-200">
            <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <svg
                className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-xs text-amber-900">
                <strong className="font-semibold">Educational Purpose:</strong>{" "}
                This tool is a demonstration project showcasing machine learning
                and full-stack development skills. It is not intended as
                financial advice. Always consult a certified financial advisor
                for investment decisions.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
