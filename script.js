//object default values - defining an object named claculator
const calculator = {
    displayValue: '0',
    firstOperator: null,
    waitingSecondOperator: false,
    operator: null,
};

// display update to the value from the object calculator
const updateDisplay = () =>{
    const display = document.querySelector('.screen') // class screen from html
    display.value = calculator.displayValue;
};
updateDisplay();

//Pressing the keys
const keys = document.querySelector('.keys') //selecting the keys from the html
keys.addEventListener('click', (event)=>{ //adding an event for the click in the keys function
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) { //targeting the class operator from html
        handleOperator(target.value)
        updateDisplay()
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        resteCalculator();
        updateDisplay();
        return;
    }

    inputDigit(target.value); //not yet created the inputDigit function
    updateDisplay();
});

//input digit

const inputDigit = (digit) => {
    const {displayValue, waitingSecondOperator} = calculator;

    if (waitingSecondOperator === true) {
        calculator.displayValue = digit;
        calculator.waitingSecondOperator = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue +digit;
    }
};

//input decinal

const inputDecimal = (dot) => {
    if (calculator.waitingSecondOperator === true) {
        calculator.displayValue = '0.';
        calculator.waitingSecondOperator = false;
        return;
    }
    if (!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
}

//handle operators 

const handleOperator = (nextOperator) => {
    const { firstOperator, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue)

    if (operator && calculator.waitingSecondOperator){
        calculator.operator = nextOperator;
        return;
    }
    if (firstOperator == null && !isNaN(inputValue)){
        calculator.firstOperator = inputValue;
    }else if(operator){
    const result= calculate(firstOperator, inputValue, operator)
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`
    calculator.firstOperator = result;
}
calculator.waitingSecondOperator = true;
calculator.operator = nextOperator;
};


//math behind the calculator the logic

const calculate = (firstOperand, seconOperand, operator) => {
    if (operator === '+'){
        return firstOperand + seconOperand;
    }  else if (operator === '-') {
        return firstOperand - seconOperand;
    }  else if (operator === '*') {
        return firstOperand * seconOperand;
    }  else if (operator === '/') {
        return firstOperand / seconOperand;
    } 
    return seconOperand;
}

//All Clear button

const resteCalculator = () => {
    calculator.displayValue = '0';
    calculator.firstOperator = null;
    calculator.waitingSecondOperator = false;
    calculator.operator = null;
};