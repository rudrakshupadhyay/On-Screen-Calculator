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
    return a/b;
}
function operate(a,b,operation) {
    let num1 = Number(a);
    let num2 = Number(b);
    if(operation === "+") return add(num1,num2);
    if(operation === "-") return subtract(num1,num2);
    if(operation === "×") return multiply(num1,num2);
    if(operation === "÷") return divide(num1,num2);
    else return null;
}
let digit = ["0","1","2","3","4","5","6","7","8","9"];
let operators = ["+", "-", "×", "÷"];  // use the displayed symbols
let expr = document.querySelector(".expr");
let oldexpr = document.querySelector(".oldexpr");
let clear = document.querySelector(".clear");
let back_space = document.querySelector(".delete");
let number = document.querySelectorAll(".number");

let operand1 = "";
let operand2 = "";
let currOperation = null;
let screen_empty = false;
let need_clear = false;
number.forEach(key => {
    key.addEventListener("click",() => {
        let keyVal = key.textContent;
        if(need_clear){
            clear.click();
            need_clear = false;
        }
        if(digit.includes(keyVal) || keyVal === ".") append(keyVal);
        else if(operators.includes(keyVal)) setoperation(keyVal);
        else if(keyVal === "="){
            evalute();
            need_clear = true;
        }
    })
})
clear.addEventListener("click", () => clearScreen());
back_space.addEventListener("click",() => deleteNumber());
function deleteNumber() {
    expr.textContent = expr.textContent.slice(0,-1);
}
function evalute() {
    if(currOperation === null || screen_empty) return;
    if(currOperation === "÷" && expr.textContent === "0"){
        alert("You can't divide by 0!");
        return;
    }
    operand2 = expr.textContent;
    ans = `${operate(operand1,operand2,currOperation)}`;
    if(ans.length > 9) ans = "Overflow";
    expr.textContent = ans;
    oldexpr.textContent = `${operand1} ${currOperation} ${operand2} =`;
    currOperation = null; 
}
function setoperation(keyVal) {
    if(currOperation != null) evalute();
    operand1 = expr.textContent;
    currOperation = keyVal;
    oldexpr.textContent = `${operand1} ${currOperation}`
    screen_empty = true;
}
function append(keyVal){
    if((expr.textContent == "0" && !(keyVal == "."))|| screen_empty) reset();
    if(keyVal == "." && expr.textContent.includes(".")) return;
    expr.textContent += keyVal; 
}
function reset() {
    expr.textContent = "";
    screen_empty = false;
}
function clearScreen() {
    expr.textContent = "0";
    oldexpr.textContent = "";
    operand1 = "";
    operand2 = "";
    currOperation = null;
}
