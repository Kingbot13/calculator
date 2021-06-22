const numPad = document.querySelectorAll(".num");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");
const clearAll = document.querySelector(".ac");

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
    let results = args[0] / args[1];
    display.innerHTML = results;
    return results;
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

/* 
    after calculation, remove first three indexes in numArray and replace with result from calculation 
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
        case "X":
            args.splice(1, 1);
            multiply(args);
            break;
        default:
            alert("Wrong input");
            break;
    };

};