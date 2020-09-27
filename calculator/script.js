class Calculator {
  constructor(accumulator, expression) {
    this.accumulator = accumulator;
    this.expression = expression;
    this.unaryOperators = ['√'];
    this.unaryOperator = '';
    this.clear();
  }

  clear() {
    this.equalsPressed = false;
    this.previousOperand = '';
    this.currentOperand = '';
    this.unaryOperator = '';
    this.operator = undefined;
    this.updateScreen();
  }

  delete() {
    this.equalsPressed = false;
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
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
    this.currentOperand += number;
    this.updateScreen();
  }

  setOperator(operator) {
    this.equalsPressed = false;

    if (this.unaryOperators.includes(operator)) {
      this.unaryOperator = operator;
      this.updateScreen();
      return;
    }

    this.previousOperand = this.evaluate();

    this.operator = operator;
    this.currentOperand = '';
    this.updateScreen();
  }

  evaluate() {
    const previous = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);
    let result = this.currentOperand;

    switch (this.unaryOperator) {
      case '√':
        result = Math.sqrt(current);
        current = result;
        this.currentOperand = current;
        break;
      default:
        break;
    }

    this.unaryOperator = '';

    switch (this.operator) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '*':
        result = previous * current;
        break;
      case '÷':
        result = previous / current;
        break;
      case '^':
        result = previous ** current;
        break;
      default:
        break;
    }

    this.operator = '';

    return result;
  }

  equals() {
    const result = this.evaluate();
    this.currentOperand = result;
    this.previousOperand = '';
    this.unaryOperator = '';
    this.updateScreen();
    this.equalsPressed = true;
  }

  updateScreen() {
    this.accumulator.innerText = this.previousOperand
      ? `${this.previousOperand} ${this.operator || ''}` : '';

    this.expression.innerText = `${this.unaryOperator}${this.currentOperand}`;
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
