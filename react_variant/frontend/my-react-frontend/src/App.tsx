import { useState, type FormEvent } from 'react';
import './App.css'; 

interface FormData {
  feature1: number;
  feature2: number;
  feature3: number;
  feature4: number;
}

interface PredictionResult {
  prediction: number;
  probability_class_0: number;
  probability_class_1: number;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    feature1: 2.5,
    feature2: -1.5,
    feature3: 0.5,
    feature4: 1.0,
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value), 
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setResult(null);
    setError(null);
    setIsLoading(true);

    try {
      const API_URL = "http://127.0.0.1:8000/predict";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: PredictionResult = await response.json();
      setResult(data);

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ML Model Prediction</h1>
        <p>Enter the features to get a prediction from the backend.</p>
        
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div className="form-group" key={key}>
              <label htmlFor={key}>{key}</label>
              <input
                type="number"
                id={key}
                name={key}
                value={formData[key as keyof FormData]}
                onChange={handleInputChange}
                step="0.01"
                required
              />
            </div>
          ))}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Getting Prediction..." : "Get Prediction"}
          </button>
        </form>

        {isLoading && <p>Loading...</p>}
        
        {error && (
            <div className="error">
                <h3>Error</h3>
                <p>{error}</p>
            </div>
        )}

        {result && (
          <div className="result">
            <h3>Prediction Result</h3>
            <p>Predicted Class: <span>{result.prediction}</span></p>
            <p>Confidence: <span>{Math.max(result.probability_class_0, result.probability_class_1).toFixed(4)}</span></p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;