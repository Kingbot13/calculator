function add(a, b){
    return a + b;
};

function subtract(a, b){
    return a - b;
};

function multiply(a, b){
    return a * b;
};

function divide(a, b){
    return a / b;
};

/* 

    grab nodes for operators
    add event listeners
    store number as variable to be used in operate()  
        a = display.innerHTML;
    store sign as variable
        sign = sign.innerHTML;
    store next number as variable
        b = display.innerHTML;
    equal sign finishes calculations and shows final number
    
 
*/

const numPad = document.querySelectorAll(".num");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");

operators.forEach(sign => {
    sign.addEventListener("click", () => {

    });
});

numPad.forEach(num => {
    num.addEventListener("click", () => {
        display.innerHTML = num.innerHTML; 
    });
});

function operate(a, sign, b){
    switch (sign) {
        case "+":
            add(a, b);
            break;
        case "-":
             subtract(a, b);
            break;
        case "/":
             divide(a, b);
            break;
        case "X":
            multiply(a, b);
            break;
        default:
            alert("Wrong input");
            break;
    };
};