const numPad = document.querySelectorAll(".num-btn");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".oper-btn");
const clearAll = document.querySelector(".ac");
const decimal = document.querySelector("#decimal");
const percent = document.querySelector(".percent");
const signChange = document.querySelector(".change-sign")
const equalSign = document.querySelector("#equal-sign");
let numArray = []; // store numbers and operators

percent.addEventListener("click", () => {
    display.innerHTML /= 100; 
});

signChange.addEventListener("click", () => {
    display.innerHTML *= -1;
});

function hasDecimal(){
    if (display.innerHTML - Math.floor(display.innerHTML) !== 0){
        decimal.disabled = true;
    } else {
        decimal.disabled = false;
    };
};

function hasEqualSign(){
    if (numArray[1] === "="){
        equalSign.disabled = true;
    } else {
        equalSign.disabled = false;
    };
    return equalSign.disabled;
};

function clear(){
    display.innerHTML = "0";
    numArray = [];
};



clearAll.addEventListener("click", clear); // set display to zero and reset numArray


operators.forEach(sign => {
    sign.addEventListener("click", () => {
        let numSlice;
        
        if (hasEqualSign() && sign.innerHTML != "="){ // if true, allow next calculation by cutting before pushing
            numArray.splice(0, 2);
        };
        
        numArray.push(parseFloat(display.innerHTML));
        display.innerHTML = 0; // resets display after operator button pressed
        numArray.push(sign.innerHTML);
        
        if (hasEqualSign()) {
            console.log("equals", numArray);
            numArray.splice(0, 2);
            display.innerHTML = 0;
        } else {
            if (numArray.length >= 3){
                numSlice = numArray.slice(0, 3);
                console.log("slice:",numSlice);
                operate(numSlice);
            };
            
        };
        
        console.log(numArray);  
    });
}); 

/* 
counter variable to count times number pressed
if counter > 1
display + num
*/

numPad.forEach(num => {
    num.addEventListener("click", () => {
        hasDecimal();
        let counter = 0;
        if (display.innerHTML === "0" || display.innerHTML === 0){
            if (num.innerHTML === "."){
                display.innerHTML = display.innerHTML + num.innerHTML;
                
            } else {
                display.innerHTML = num.innerHTML; 
            };
        }else if(hasEqualSign()){
            display.innerHTML = num.innerHTML;
            numArray.splice(0,2);
            
            // }else if(counter === 0){
                
                //     counter++;
                //     display.innerHTML = num.innerHTML;
                //     console.log("counter", counter);
                
                
            }else {
                display.innerHTML = display.innerHTML + num.innerHTML;
            };
            
            if (numArray.length !== 2){
                counter = 0;
            };
            console.log("current counter:", counter);
        });
    });
    
function operate([...args]){
    function add([...args]){
        // console.log(args);
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
        // case "=":
        //     args.splice(1, 1);
        //     break;
        default:
            alert("Wrong input");
            break;
        };
    numArray.splice(0, 3);
    numArray.unshift(parseFloat(display.innerHTML));
};