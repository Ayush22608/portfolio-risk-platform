import { useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/predict/";

export default function PredictionForm({ onResult, onLoading, onError }) {
  const [form, setForm] = useState({
    investment_horizon: 5,
    risk_appetite: "medium",
    investment_amount: 100000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numeric = ["investment_horizon", "investment_amount"];
    setForm((prev) => ({
      ...prev,
      [name]: numeric.includes(name) ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onLoading(true);
    try {
      const { data } = await axios.post(API_URL, {
        investment_horizon: Number(form.investment_horizon),
        risk_appetite: form.risk_appetite,
        investment_amount: Number(form.investment_amount),
      });
      onResult(data);
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Request failed. Ensure the backend is running at http://127.0.0.1:8000.";
      onError(message);
    } finally {
      onLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
      <h2 className="text-lg font-semibold text-gray-900 mb-5">
        Investment inputs
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="investment_horizon"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Investment horizon (years)
          </label>
          <input
            id="investment_horizon"
            type="number"
            name="investment_horizon"
            min={1}
            max={50}
            value={form.investment_horizon}
            onChange={handleChange}
            className="w-full px-3 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label
            htmlFor="risk_appetite"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Risk appetite
          </label>
          <select
            id="risk_appetite"
            name="risk_appetite"
            value={form.risk_appetite}
            onChange={handleChange}
            className="w-full px-3 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="investment_amount"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Investment amount
          </label>
          <input
            id="investment_amount"
            type="number"
            name="investment_amount"
            min={0}
            step={1000}
            value={form.investment_amount}
            onChange={handleChange}
            className="w-full px-3 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 px-4 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        >
          Analyze portfolio
        </button>
      </form>
    </div>
  );
}
