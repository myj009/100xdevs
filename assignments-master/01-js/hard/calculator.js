/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

function divide(a, b) {
  if (b == 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(a) {
    this.result += a;
  }

  subtract(a) {
    this.result -= a;
  }

  multiply(a) {
    this.result *= a;
  }

  divide(a) {
    if (a == 0) {
      throw new Error("Division by zero");
    }
    this.result /= a;
  }

  getResult() {
    return this.result;
  }

  clear() {
    this.result = 0;
  }

  calculate(expr) {
    // Remove continuous spaces and check for invalid characters
    const sanitizedExpr = expr.replace(/\s+/g, "");
    if (!/^[0-9+\-*/().]+$/.test(sanitizedExpr)) {
      throw new Error("Invalid expression");
    }

    // Use a simple recursive descent parser to evaluate the expression
    const tokens = sanitizedExpr.match(/(\d+(\.\d+)?|\+|\-|\*|\/|\(|\))/g);

    if (!tokens) {
      throw new Error("Invalid expression");
    }

    let index = 0;

    const parseExpression = () => {
      let leftOperand = parseTerm();

      while (index < tokens.length) {
        const operator = tokens[index];
        if (operator === "+" || operator === "-") {
          index++;
          const rightOperand = parseTerm();
          leftOperand =
            operator === "+"
              ? leftOperand + rightOperand
              : leftOperand - rightOperand;
        } else {
          break;
        }
      }

      return leftOperand;
    };

    const parseTerm = () => {
      let leftOperand = parseFactor();

      while (index < tokens.length) {
        const operator = tokens[index];
        if (operator === "*" || operator === "/") {
          index++;
          const rightOperand = parseFactor();
          leftOperand =
            operator === "*"
              ? leftOperand * rightOperand
              : divide(leftOperand, rightOperand);
        } else {
          break;
        }
      }

      return leftOperand;
    };

    const parseFactor = () => {
      const token = tokens[index++];

      if (token === "(") {
        const result = parseExpression();
        if (tokens[index++] !== ")") {
          throw new Error("Mismatched parentheses");
        }
        return result;
      } else {
        const number = parseFloat(token);
        if (isNaN(number)) {
          throw new Error("Invalid number");
        }
        return number;
      }
    };

    this.result = parseExpression();

    if (index !== tokens.length) {
      throw new Error("Invalid expression");
    }
  }
}

module.exports = Calculator;
