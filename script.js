const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;


// a function that displays number on screen
const displayNumber = (number)=>{
    if(awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else{
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number
    }
}
// function that adds decimal
const addDecimal = () =>{
    // if operator pressed , dont add decimal
    if(awaitingNextValue){
        return;
    }
    // check if it includes decimal
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`

    } 
    
}
// calculate first and second values depending on operator
const calculate = {
'/' : (firstNumber,secondNumber) => firstNumber / secondNumber,
'*' : (firstNumber,secondNumber) => firstNumber * secondNumber,
'+' : (firstNumber,secondNumber) => firstNumber + secondNumber,
'-' : (firstNumber,secondNumber) => firstNumber - secondNumber,
'=' : (firstNumber,secondNumber) => secondNumber,


}




function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    // prevent multiple operators
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return};
    // assign first value if no value
    if(!firstValue){
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;

    }
    // ready for next value store
    awaitingNextValue = true;
    operatorValue = operator;
    
}


// add event listeners for num , operators, decimal

inputBtns.forEach((inputBtn) =>{

    if(inputBtn.classList.length ===0){
        inputBtn.addEventListener('click',() => displayNumber(inputBtn.value))
    }else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click',() => useOperator(inputBtn.value))

    } else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click',() => addDecimal())

    } 
})

// reset display;
const resetDisplay = () =>{
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
calculatorDisplay.textContent = '0';
}

// event listener for resetting console;
clearBtn.addEventListener('click',resetDisplay);