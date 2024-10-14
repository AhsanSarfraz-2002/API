import React, { createContext, useState, useContext } from 'react';

const CalculatorContext = createContext();

const CalculatorProvider = ({ children }) => {
  const [result, setResult] = useState(0);
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('');

  const calculate = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    let res;

    switch (operation) {
      case 'add': res = n1 + n2; break;
      case 'subtract': res = n1 - n2; break;
      case 'multiply': res = n1 * n2; break;
      case 'divide': res = n2 !== 0 ? n1 / n2 : 'Error'; break;
      default: res = 'Select operation';
    }
    setResult(res);
  };

  return (
    <CalculatorContext.Provider value={{ num1, setNum1, num2, setNum2, operation, setOperation, result, calculate }}>
      {children}
    </CalculatorContext.Provider>
  );
};

const Calculator = () => {
  const { num1, setNum1, num2, setNum2, operation, setOperation, result, calculate } = useContext(CalculatorContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">DMAS Calculator</h1>
      <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} className="border p-2 mb-2 w-64" placeholder="First Number" />
      <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} className="border p-2 mb-2 w-64" placeholder="Second Number" />
      <div className="flex space-x-2 mb-4">
        {['add', 'subtract', 'multiply', 'divide'].map((op) => (
          <button key={op} onClick={() => setOperation(op)} className={`px-4 py-2 border rounded ${operation === op ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>
            {op.charAt(0).toUpperCase() + op.slice(1)}
          </button>
        ))}
      </div>
      <button onClick={calculate} className="bg-blue-500 text-white px-4 py-2 rounded">Calculate</button>
      <h2 className="mt-4 text-lg">Result: {result}</h2>
    </div>
  );
};

const App = () => (
  <CalculatorProvider>
    <Calculator />
  </CalculatorProvider>
);

export default App;
