import { useState } from "react";
import Header from "./components/Header";
import PredictionForm from "./components/PredictionForm";
import ResultCard from "./components/ResultCard";
import Charts from "./components/Charts";
import InfoSection from "./components/InfoSection";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleResult = (data) => {
    setResult(data);
    setError(null);
  };

  const handleError = (err) => {
    setError(err);
    setResult(null);
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
    if (isLoading) setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PredictionForm
            onResult={handleResult}
            onLoading={handleLoading}
            onError={handleError}
          />
          <ResultCard result={result} loading={loading} error={error} />
        </div>

        <Charts result={result} />

        <div className="mt-8">
          <InfoSection />
        </div>
      </main>
    </div>
  );
}

export default App;
