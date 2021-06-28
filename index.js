/* 
    bugs to fix:
        when starting number is zero and no number is pressed whacky things happen.
        length of number needs to be restricted.
*/


const numPad = document.querySelectorAll(".num-btn");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".oper-btn");
const clearAll = document.querySelector(".ac");
const decimal = document.querySelector("#decimal");
const percent = document.querySelector(".percent");
const signChange = document.querySelector(".change-sign")
const equalSign = document.querySelector("#equal-sign");

let numArray = []; // store numbers and operators
let displayNum = parseFloat(display.innerHTML);

function updateDisplay(){
    display.innerHTML = displayNum.toString();
}

percent.addEventListener("click", () => {
    displayNum /= 100; 
    updateDisplay();
});

signChange.addEventListener("click", () => {
    displayNum *= -1;
    updateDisplay();
});

function hasDecimal(){ // disables decimal if already exists in the display
    // if (parseFloat(display.innerHTML) - Math.floor(parseFloat(display.innerHTML)) !== 0){
    if (display.innerHTML.indexOf(".") != -1){
        decimal.disabled = true;
    } else {
        decimal.disabled = false;
    };
    return decimal.disabled;
};

decimal.addEventListener("click", () => { // decimal control... needs work
    hasDecimal();
    if (!hasDecimal()){
        displayNum = display.innerHTML + decimal.innerHTML;
        updateDisplay();

    };

});

function hasEqualSign(){
    if (numArray[1] === "="){
        equalSign.disabled = true;
    } else {
        equalSign.disabled = false;
    };
    return equalSign.disabled;
};

function clear(){
    displayNum = 0;
    numArray = [];
    updateDisplay();
};



clearAll.addEventListener("click", clear); // set display to zero and reset numArray

let counter = 0;

operators.forEach(sign => {
    sign.addEventListener("click", () => {
        let numSlice;
        counter = 0; // reset counter after clicking operation
        
        if (hasEqualSign() && sign.innerHTML != "="){ // if true, allow next calculation by cutting before pushing
            numArray.splice(0, 2);
        };
        
        numArray.push(parseFloat(displayNum));
        displayNum = 0; // resets display after operator button pressed
        numArray.push(sign.innerHTML);
        
        if (hasEqualSign()) {
            console.log("equals", numArray);
            numArray.splice(0, 2);
            displayNum = 0;
        } else {
            if (numArray.length >= 3){
                numSlice = numArray.slice(0, 3);
                console.log("slice:",numSlice);
                operate(numSlice);
            };
            
        };
        updateDisplay();
        console.log(numArray);  
    });
}); 

function checkCounters(){
    if (counter === 0){
        return true;
    } else {
        return false;
    };
};

function checkDisplayLength(){
    
}

let operationCounter = 0; // tracks when operate() is called

numPad.forEach(num => { // number control
    num.addEventListener("click", () => {
        hasDecimal();
        checkCounters();
        console.log("has decimal:", hasDecimal());

        let number = num.innerHTML;

        if (hasDecimal()){
            displayNum = displayNum.toString() + num.innerHTML;
            console.log("displayNum:", displayNum);
            updateDisplay();
        } else {

            if (display.innerHTML === "0" || display.innerHTML === 0){
                
                displayNum = number; 
                console.log("condition 1");
                
            }else if(hasEqualSign()){
                displayNum = number;
                numArray.splice(0,2);
                console.log("condition 2");
                
            }else if(operationCounter === 1 && numArray.length === 2 && checkCounters()){ 
                
                displayNum = number;                
                counter++;
                console.log("counter", counter);
                console.log("condition 3");
                    
            }else {
                displayNum = displayNum.toString() + number;
                console.log("condition 4");
                operationCounter = 0; // reset counter after condition 3 is false
            };
            updateDisplay();
        };
        
        if (numArray.length !== 2){
            counter = 0;
        };
        console.log("array length:", numArray);
        console.log("current counter:", counter);
    });
});
    
function operate([...args]){
    function add([...args]){
        let results = args[0] + args[1];
        displayNum = results;
        return results;
    };
    
    function subtract([...args]){
        let results = args[0] - args[1];
        displayNum = results;
        return results;
    };
    
    function multiply([...args]){
        let results = args[0] * args[1];
        displayNum = results;
        return results;
    };
    
    function divide([...args]){
        let results;
        if (args[1] === 0){
            alert("Tsk tsk tsk. You thought you were clever trying to divide by zero!");
            clear();

        } else{
            results = args[0] / args[1];
            displayNum = results;
            return results;

        };
        
    };

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
    operationCounter++
    updateDisplay();
    numArray.splice(0, 3);
    numArray.unshift(parseFloat(displayNum));
};