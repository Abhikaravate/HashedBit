import React, { useState } from 'react';
import './App.css'; // Make sure to import the CSS file

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculation = (operator) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setResult('Enter numbers');
      return;
    }

    switch (operator) {
      case '+': setResult(n1 + n2); break;
      case '-': setResult(n1 - n2); break;
      case '*': setResult(n1 * n2); break;
      case '/': 
        setResult(n2 === 0 ? 'Error' : (n1 / n2).toFixed(2)); 
        break;
      default: setResult(null);
    }
  };

  return (
    <div className="App">
      <div className="calculator-card">
        <h3>Calculator</h3>
        
        <div className="input-group">
          <input
            className="calc-input"
            type="number"
            placeholder="0"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
          />
          <input
            className="calc-input"
            type="number"
            placeholder="0"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button className="calc-btn btn-add" onClick={() => handleCalculation('+')}>+</button>
          <button className="calc-btn btn-sub" onClick={() => handleCalculation('-')}>-</button>
          <button className="calc-btn btn-mul" onClick={() => handleCalculation('*')}>×</button>
          <button className="calc-btn btn-div" onClick={() => handleCalculation('/')}>÷</button>
        </div>

        <div className="result-box">
          <span className="result-label">Result</span>
          <span className="result-value">
            {result !== null ? result : '--'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;