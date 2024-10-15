import React, { useState } from 'react';
const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);
  const [operation, setOperation] = useState('add');
  const [error, setError] = useState('');
  const calculate = (num1, num2, operation) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    if (isNaN(n1) || isNaN(n2)) return 'Invalid input';
    switch (operation) {
      case 'add':
        return n1 + n2;
      case 'subtract':
        return n1 - n2;
      case 'multiply':
        return n1 * n2;
      case 'divide':
        return n2 !== 0 ? n1 / n2 : 'Cannot divide by zero';
      default:
        return 'Unknown operation';
    }
  };
  const handleCalculate = () => {
    const res = calculate(num1, num2, operation);
    if (typeof res === 'string' && res.includes('Invalid input')) {
      setError('Please enter valid numbers.');
      setResult(null);
    } else {
      setError('');
      setResult(res);
    }
  };
  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (!value || !isNaN(value)) {
      setter(value);
      setError('');
    } else {
      setError('Please enter a valid number.');
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Calculator</h2>
      <div className="mb-4">
        <input
          type="text" value={num1} onChange={handleInputChange(setNum1)} placeholder="First number" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      <div className="mb-4">
        <input
            type="text" value={num2} onChange={handleInputChange(setNum2)} placeholder="Second number" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex space-x-2 mb-4">
        <button onClick={() => setOperation('add')} className="flex-1 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">Add</button>
        <button onClick={() => setOperation('subtract')} className="flex-1 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">Subtract</button>
        <button onClick={() => setOperation('multiply')} className="flex-1 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">Multiply</button>
        <button onClick={() => setOperation('divide')} className="flex-1 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">Divide</button>
      </div>
      <button onClick={handleCalculate} className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition">Calculate</button>
      <h3 className="text-xl font-semibold text-center mt-4">Result: {result}</h3>
    </div>
  );
};
export default Calculator;