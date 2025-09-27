function add(a,b) {
    return a+b;
}
function subtract(a,b) {
    return a-b;
}
function multiply(a,b) {
    return a*b;    
}
function divide(a,b) {
    if(b === 0) return NaN;
    return a/b;
}
function operate(num1,num2,operation) {
    if(operation === "+") return add(num1,num2);
    if(operation === "-") return subtract(num1,num2);
    if(operation === "×") return multiply(num1,num2);
    if(operation === "÷") return divide(num1,num2);
}
let digit = ["0","1","2","3","4","5","6","7","8","9","."];
let operators = ["+", "-", "×", "÷"];  // use the displayed symbols
let screen = document.querySelector(".expr");
let oldexpr = document.querySelector(".oldexpr");
let clear = document.querySelector(".clear");
let back_space = document.querySelector(".delete");
let number = document.querySelectorAll(".number");
let num = NaN;
let Output = false;
number.forEach(key => {
    key.addEventListener("click",() => {
        let keyVal = key.textContent;
        if(digit.includes(keyVal)){
            if (Output) {
                Output = false;
                clear.click();
            }
            if (screen.textContent === "0") {
                screen.textContent = "";
            }
            if (keyVal === "." && screen.textContent.includes(".")) return;
            if(screen.textContent.length < 11){
                screen.textContent += keyVal;
            }
        }
        else if (operators.includes(keyVal)) {
            if(isNaN(num)){ 
                num = Number(screen.textContent);
                screen.textContent = "0";
            }
            else if(!isNaN(num) && oldexpr.textContent === ""){
                screen.textContent = "0";
            }
            else{
                let num2 = Number(screen.textContent);
                num = operate(num,num2,oldexpr.textContent.slice(-1));
                screen.textContent = "0";
                oldexpr.textContent = String(num) + keyVal;
                return;
            }
            oldexpr.textContent += String(num) + keyVal;
        }
        else{
            if(!isNaN(num)){
                let num2 = Number(screen.textContent);
                num = operate(num,num2,oldexpr.textContent.slice(-1));
                let ans = String(num);
                if(ans.length < 11) screen.textContent = ans;
                else screen.textContent = "0";
                oldexpr.textContent = "";
                Output = true;
            }
        }
    })
})
clear.addEventListener("click", () => {
    screen.textContent = "0";
    oldexpr.textContent = "";
    num = NaN;
})
back_space.addEventListener("click",() => {
    screen.textContent = screen.textContent.slice(0,-1);
    if(screen.textContent === ""){
        screen.textContent = "0";
    }
})
