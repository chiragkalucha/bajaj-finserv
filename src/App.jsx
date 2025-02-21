import { useState } from "react";
import axios from "axios";

export default function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState("");

  const backendURL = "https://bajaj-finserv-1-4y1u.onrender.com"; // Replace with your backend URL

  const handleSubmit = async () => {
    try {
      setError("");
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format. Ensure it contains a 'data' array.");
      }
      const res = await axios.post(backendURL, parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError("Invalid JSON or Server Error");
    }
  };

  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    setSelectedFilters(checked
      ? [...selectedFilters, value]
      : selectedFilters.filter(f => f !== value));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-xl font-bold">Bajaj Finserv Health Task</h1>
      <textarea
        className="border p-2 mt-4 w-96 h-24"
        placeholder='{"data": ["A", "1", "B", "3"]}'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        onClick={handleSubmit}
      >Submit</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {response && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Select Data to Display</h2>
          <div>
            {['alphabets', 'numbers', 'highest_alphabet'].map((filter) => (
              <label key={filter} className="block">
                <input
                  type="checkbox"
                  value={filter}
                  onChange={handleFilterChange}
                /> {filter}
              </label>
            ))}
          </div>

          <div className="mt-4 bg-white p-4 rounded shadow">
            {selectedFilters.map((filter) => (
              <p key={filter} className="font-semibold">
                {filter}: {JSON.stringify(response[filter])}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
