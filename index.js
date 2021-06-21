const numPad = document.querySelectorAll(".num");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");
const clearAll = document.querySelector(".ac");

function add(array){
    return display.innerHTML = array.reduce((a, b), () => a + b);
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

    store number as variable to be used in operate()  
        a = display.innerHTML;
    store sign as variable
        sign = sign.innerHTML;
    store next number as variable
        b = display.innerHTML;
    equal sign finishes calculations and shows final number
    
*/
let numArray = []


function clear(){
    display.innerHTML = "0";
    numArray = [];
}


clearAll.addEventListener("click", clear);

operators.forEach(sign => {
    sign.addEventListener("click", () => {
        if (numArray.length === 3){
            operate(numArray);
        } else if (sign === "=" && numArray.length === 3) {
            operate(numArray);
        }else{
            numArray.push(parseFloat(display.innerHTML));
            numArray.push(sign.innerHTML);
            display.innerHTML = "0";
            console.log(numArray);
        };
    });
});

numPad.forEach(num => {
    num.addEventListener("click", () => {
        if (display.innerHTML === "0"){
            display.innerHTML = num.innerHTML; 
        } else {
            display.innerHTML = display.innerHTML + num.innerHTML;
        };
    });
});

function operate([...args], calculate){
    // display.innerHTML = calculate(args);
    
    switch (args[1]) {
        case "+":
            args.splice(1, 1);
           operate(args, add);
            break;
        case "-":
             subtract(args);
            break;
        case "/":
             divide(args);
            break;
        case "X":
            multiply(args);
            break;
        default:
            alert("Wrong input");
            break;
    };
};