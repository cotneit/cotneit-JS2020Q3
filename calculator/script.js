class Calculator {
  constructor(accumulator, expression) {
    this.accumulator = accumulator;
    this.expression = expression;
    this.unaryOperators = ['√', '+-'];
    this.clear();
  }

  clear() {
    this.equalsPressed = false;
    this.previousOperand = '';
    this.currentOperand = '0';
    this.unaryOperator = '';
    this.operator = '';
    this.updateScreen();
  }

  delete() {
    this.equalsPressed = false;
    if (this.currentOperand.length === 0) {
      this.unaryOperator = '';
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }

    this.updateScreen();
  }

  appendNumber(number) {
    if (this.equalsPressed) {
      this.clear();
      this.equalsPressed = false;
    }

    if (number === '.' && this.currentOperand.includes('.')) {
      return;
    }

    // If the input is empty and '.' is pressed, append zero before appending dot
    if (number === '.' && this.currentOperand === '') {
      this.currentOperand = '0';
    }

    if (this.currentOperand === '0') {
      if (number === '0') {
        return;
      }
      if (number !== '.') {
        this.currentOperand = number;
        this.updateScreen();
        return;
      }
    }

    this.currentOperand += number; // string concatenation
    this.updateScreen();
  }

  setOperator(operator) {
    this.equalsPressed = false;

    if (this.unaryOperators.includes(operator)) {
      let unaryOperator;

      if (operator === '+-') {
        unaryOperator = '-';
      } else {
        unaryOperator = operator;
      }

      if (this.unaryOperator === unaryOperator) {
        this.unaryOperator = '';
      } else {
        this.unaryOperator = unaryOperator;
      }

      this.updateScreen();
      return;
    }

    if (this.currentOperand) {
      this.previousOperand = this.evaluate();
      // Handle possible error message
      if (this.previousOperand === 'Cannot divide by zero') {
        this.currentOperand = '';
        this.equals();
        return;
      }

      // If there is an unary operator, it was added by this.evaluate() after the calculations.
      // The only operator here is supposed to be minus (-).
      if (this.unaryOperator) {
        this.previousOperand = this.unaryOperator + this.previousOperand;
        this.unaryOperator = '';
      }
    }

    if (!this.previousOperand) {
      this.previousOperand = '0';
    }

    this.operator = operator;
    this.currentOperand = '';
    this.updateScreen();
  }

  evaluate() {
    const previous = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);
    let result = current;

    switch (this.unaryOperator) {
      case '√':
        result = Math.sqrt(current);
        current = result;
        break;
      case '-':
        result = -current;
        current = result;
        break;
      default:
        break;
    }

    this.unaryOperator = '';

    if (this.operator) {
    // Floating point math workaround. Far from perfect, but it's something.
    // Using correction factors
    // (multiply by a suitable power of 10 so that the arithmetic happens between integers)
    // See https://0.30000000000000004.com/ to learn more about the problem
      let decimalIndex;

      decimalIndex = previous.toString().indexOf('.');
      let previousFactor = 1;
      if (decimalIndex !== -1) {
        previousFactor = 10 ** (previous.toString().length - decimalIndex - 1);
      }

      decimalIndex = current.toString().indexOf('.');
      let currentFactor = 1;
      if (decimalIndex !== -1) {
        currentFactor = 10 ** (current.toString().length - decimalIndex - 1);
      }

      const largestFactor = currentFactor >= previousFactor ? currentFactor : previousFactor;

      switch (this.operator) {
        case '+':
          result = (largestFactor * previous + largestFactor * current) / largestFactor;
          break;
        case '-':
          result = (largestFactor * previous - largestFactor * current) / largestFactor;
          break;
        case '*':
          result = ((largestFactor * previous) * (largestFactor * current)) / largestFactor ** 2;
          break;
        case '÷':
          result = current === 0 ? 'Cannot divide by zero' : (largestFactor * previous) / (largestFactor * current);
          break;
        case '^':
          result = (previousFactor * previous) ** current / (previousFactor ** current);
          break;
        default:
          break;
      }
    }

    this.operator = '';

    result = result.toString();

    if (result[0] === '-') {
      result = result.slice(1);
      this.unaryOperator = '-';
    }

    // NaN appears when equals() is invoked and currentOperand is empty ('').
    // Asssign result to previousOperand since it will always be either ''
    // or an operand that should become the result if currentOperand is empty.
    // previousOperand can also contain an error message,
    // which is handled before being displayed in setOperator() method
    if (result === 'NaN') {
      result = this.previousOperand;
    }

    return result;
  }

  equals() {
    const result = this.evaluate();
    this.currentOperand = result;
    this.previousOperand = '';
    this.updateScreen();
    this.equalsPressed = true;
  }

  static normalize(number) {
    const splitNumber = number.toString().split('.');
    const integerPart = parseInt(splitNumber[0], 10);
    if (integerPart) {
      // Split decimal part with dividers (commas in this case)
      splitNumber[0] = integerPart.toLocaleString('en-US');
    }
    return splitNumber.join('.');
  }

  updateScreen() {
    this.accumulator.innerText = `${Calculator.normalize(this.previousOperand)} ${this.operator}`;
    this.expression.innerText = `${this.unaryOperator}${Calculator.normalize(this.currentOperand)}`;
  }
}

const numberButtons = document.querySelectorAll('.calculator__number');
const operatorButtons = document.querySelectorAll('.calculator__operator');
const equalsButton = document.querySelector('.calculator__equals');
const deleteButton = document.querySelector('.calculator__delete');
const clearAllButton = document.querySelector('.calculator__clear-all');
const accumulator = document.querySelector('.calculator__accumulator');
const expression = document.querySelector('.calculator__expression');

const calculator = new Calculator(accumulator, expression);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.setOperator(button.innerText);
  });
});

clearAllButton.addEventListener('click', () => {
  calculator.clear();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
});

equalsButton.addEventListener('click', () => {
  calculator.equals();
});

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '.':
      calculator.appendNumber(event.key);
      break;
    case '+':
    case '-':
    case '*':
    case '^':
      calculator.setOperator(event.key);
      break;
    case '/':
      calculator.setOperator('÷');
      break;
    case 'Enter':
      event.preventDefault();
      calculator.equals();
      break;
    case 'Backspace':
      calculator.delete();
      break;
    case 'Escape':
      calculator.clear();
      break;
    case 'm':
      calculator.setOperator('+-');
      break;
    case 'r':
      calculator.setOperator('√');
      break;
    default:
      break;
  }
});
