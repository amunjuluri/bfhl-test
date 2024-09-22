import React, { useState } from 'react';

const BFHLComponent = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(input);
      const res = await fetch('http://localhost:3000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });
      const data = await res.json();
      setResponse(data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input or API error');
      setResponse(null);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    const filteredResponse = {};
    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return (
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold">Filtered Response:</h3>
        <pre className="bg-gray-200 p-2 rounded">{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl  mb-4">BFHL API Tester!</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter API Input"
        rows={5}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <br />
      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Submit
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {response && (
        <div className="mt-6">
          <h3 className="text-lg mb-2">Filter Options:</h3>
          {['Alphabets', 'Numbers', 'Highest lowercase alphabet'].map((option) => (
            <label key={option} className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>{option}</span>
            </label>
          ))}
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
};

export default BFHLComponent;
