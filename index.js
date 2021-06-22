const numPad = document.querySelectorAll(".num");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");
const clearAll = document.querySelector(".ac");

function add([...args]){
    console.log(args);
    let results = args[0] + args[1];
    // results = args.reduce((a, b), () => a += b);
    display.innerHTML = results;
    return results;
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


let numArray = [];


function clear(){
    display.innerHTML = "0";
    numArray = [];
};

clearAll.addEventListener("click", clear); // set display to zero and reset numArray

operators.forEach(sign => {
    sign.addEventListener("click", () => {
        let numSlice;
        if (numArray.length >= 3){
            numSlice = numArray.slice(0, 3);
            console.log(numSlice);
            operate(numSlice);
        } else if (sign === "=" && numArray.length >= 3) {
            numSlice = numArray.slice(0, 3);

           operate(numSlice);
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

function operate([...args]){
    
    switch (args[1]) {
        case "+":
            args.splice(1, 1);
           add(args);
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

    // return args;
};