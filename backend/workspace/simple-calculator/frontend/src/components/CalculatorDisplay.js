import React from 'react';

/**
 * CalculatorDisplay component to show the result of calculations.
 */
const CalculatorDisplay = ({ result }) => {
  return (
    <div className="calculator-display">
      {result}
    </div>
  );
};

export default CalculatorDisplay;
```

This component receives a `result` prop and displays it. The CSS class `calculator-display` can be styled further to fit the design of your calculator application.