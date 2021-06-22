const numPad = document.querySelectorAll(".num-btn");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".oper-btn");
const clearAll = document.querySelector(".ac");
const decimal = document.querySelector("#decimal");
let numArray = [];

function hasDecimal(){
    if (display.innerHTML - Math.floor(display.innerHTML) !== 0 || display.innerHTML - Math.floor(display.innerHTML) !== "0"){
        decimal.disabled = true;
    } else {
        decimal.disabled = false;
    };
};

function clear(){
    display.innerHTML = "0";
    numArray = [];
};

function add([...args]){
    console.log(args);
    let results = args[0] + args[1];
    display.innerHTML = results;
    return results;
};

function subtract([...args]){
    let results = args[0] - args[1];
    display.innerHTML = results;
    return results;
};

function multiply([...args]){
    let results = args[0] * args[1];
    display.innerHTML = results;
    return results;
};

function divide([...args]){
    let results;
    args[1] === 0 ? alert("Tsk tsk tsk. You thought you were clever trying to divide by zero!")
    :
    results = args[0] / args[1];
    display.innerHTML = results;
    return results;
};


clearAll.addEventListener("click", clear); // set display to zero and reset numArray


operators.forEach(sign => {
    sign.addEventListener("click", () => {
        let numSlice;
        numArray.push(parseFloat(display.innerHTML));
        numArray.push(sign.innerHTML);
        display.innerHTML = "0";
        if (numArray.length >= 3){
            numSlice = numArray.slice(0, 3);
            console.log("slice:",numSlice);
            operate(numSlice);
        } else if (sign === "=" && numArray.length >= 3) {
            numSlice = numArray.slice(0, 3);

            operate(numSlice);
        };
            console.log(numArray);  
    });
});

numPad.forEach(num => {
    num.addEventListener("click", () => {
        hasDecimal();
        if (display.innerHTML === "0"){
            display.innerHTML = num.innerHTML; 
        }else if(numArray.length === 2){
            display.innerHTML = num.innerHTML;

        } else {
            display.innerHTML = display.innerHTML + num.innerHTML;
        };
    });
});

/* 
    
*/

function operate([...args]){
    switch (args[1]) {
        case "+":
            args.splice(1, 1);
            add(args);
            break;
        case "-":
            args.splice(1, 1);
            subtract(args);
            break;
        case "/":
            args.splice(1, 1);
            divide(args);
            break;
        case "x":
            args.splice(1, 1);
            multiply(args);
            break;
        default:
            alert("Wrong input");
            break;
    };
    numArray.splice(0, 3);
    numArray.unshift(parseFloat(display.innerHTML));
};