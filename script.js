const operators = ["+", "-", "/", "*"];
let box = null;
let last_operation_history = null;
let operator = null;
let equal = null;
let dot = null;

let firstNum = true;

let numbers = [];
let operator_value;
let last_button;
let calc_operator;

let total;

let key_combination = [];

function button_number(button) {
    operator = document.getElementsByClassName("operator");
    box = document.getElementById("box");
    last_operation_history = document.getElementById("last_operation_history");
    equal = document.getElementById("equal_sign").value;
    dot = document.getElementById("dot").value;

    last_button = button;

    // if button is not an operator or = sign
    if (!operators.includes(button) && button !== equal) {
        // if it is the first button clicked
        if (firstNum) {
            // and it's a dot, show 0.
            if (button == dot) {
                box.innerText = "0" + dot;
            }
            // else clear box and show the number
            else {
                box.innerText = button;
            }
            firstNum = false;
        } else {
            // return if the box value is 0
            if (box.innerText.length == 1 && box.innerText == "0") {
                if (button == dot) {
                    box.innerText += button;
                }
                return;
            }
            // return if the box already has a dot and clicked button is a dot
            if (box.innerText.includes(dot) && button == dot) {
                return;
            }
            // maximum allowed numbers inputted are 20
            if (box.innerText.length == 20) {
                return;
            }

            // if pressed dot and box already has a - sign, show -0.
            if (button == dot && box.innerText == "-") {
                box.innerText = "-0" + dot;
            }
            // else append number
            else {
                box.innerText += button;
            }
        }
    }
    // if it's an operator or = sign
    else {
        // return if operator is already pressed
        if (operator_value != null && button == operator_value) {
            return;
        }

        // show minus sign if it's the first value selected and finally return
        if (button == "-" && box.innerText == "0") {
            box.innerText = button;
            firstNum = false;
            operator_value = button;
            showSelectedOperator();
            return;
        }
        // return if minus operator pressed and it's already printed on screen 
        else if (operators.includes(button) && box.innerText == "-") {
            return;
        }
        // return if minus operator pressed and history already has equal sign
        else if (button == "-" && operator_value == "-" && last_operation_history.innerText.includes("=")) {
            return;
        }

        // set value of operator if it's one
        if (operators.includes(button)) {
            if (typeof last_operator != "undefined" && last_operator != null) {
                calc_operator = last_operator;
            } else {
                calc_operator = button;
            }
            if (button == "*") {
                last_operator = "×";
            } else if (button == "/") {
                last_operator = "÷";
            } else {
                last_operator = button;
            }
            operator_value = button;
            firstNum = true;
            showSelectedOperator();
        }

        // add first number to numbers array and show it on history
        if (numbers.length == 0) {
            numbers.push(box.innerText);
            if (typeof last_operator != "undefined" && last_operator != null) {
                last_operation_history.innerText = box.innerText + " " + last_operator;
            }
        }
        // rest of calculations
        else {
            if (numbers.length == 1) {
                numbers[1] = box.innerText;
            }
            let temp_num = box.innerText;

            // calculate total
            if (button == equal && calc_operator != null) {
                let total = calculate(numbers[0], numbers[1], calc_operator);
                box.innerText = total;

                // append second number to history
                if (!last_operation_history.innerText.includes("=")) {
                    last_operation_history.innerText += " " + numbers[1] + " =";
                }

                temp_num = numbers[0];

                numbers[0] = total;
                operator_value = null;
                showSelectedOperator();

                // replace first number of history with the value of total
                let history_arr = last_operation_history.innerText.split(" ");
                history_arr[0] = temp_num;
                last_operation_history.innerText = history_arr.join(" ");
            }
            // update history with the value on screen and the pressed operator
            else if (calc_operator != null) {
                last_operation_history.innerText = temp_num + " " + last_operator;
                calc_operator = button;
                numbers = [];
                numbers.push(box.innerText);
            }
        }
    }
}
// highlight operator button when selected
function showSelectedOperator() {
    const elements = document.getElementsByClassName("operator");

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "#e68a00";
    }

    if (operator_value == "+") {
        document.getElementById("plusOp").style.backgroundColor = "#ffd11a";
    } else if (operator_value == "-") {
        document.getElementById("subOp").style.backgroundColor = "#ffd11a";
    } else if (operator_value == "*") {
        document.getElementById("multiOp").style.backgroundColor = "#ffd11a";
    } else if (operator_value == "/") {
        document.getElementById("divOp").style.backgroundColor = "#ffd11a";
    }
}

// function to calculate the result using two numbers and an operator
function calculate(num1, num2, operator) {
    let result;
    if (operator === "+") {
        result = (parseFloat)(num1) + (parseFloat)(num2);
    } else if (operator === "-") {
        result = (parseFloat)(num1) - (parseFloat)(num2);
    } else if (operator === "*") {
        result = (parseFloat)(num1) * (parseFloat)(num2);
    } else if (operator === "/") {
        result = (parseFloat)(num1) / (parseFloat)(num2);
    } else {
        if (total == box.innerText) {
            return total;
        } else {
            return box.innerText;
        }
    }
    // if total is not an integer, show a maximum of 12 decimal places
    if (!Number.isInteger(result)) {
        result = result.toPrecision(12);
    }
    return parseFloat(result);
}

// function to clear box and reset everything
function button_clear() {
    window.location.reload();
}

function backspace_remove() {
    box = document.getElementById("box");
    const elements = document.getElementsByClassName("operator");

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "#e68a00";
    }

    let last_num = box.innerText;
    last_num = last_num.slice(0, -1);

    box.innerText = last_num;

    // show 0 if all characters on screen are removed
    if (box.innerText.length == 0) {
        box.innerText = "0";
        firstNum = true;
    }
}

// function to change the sign of the number currently on screen
function plus_minus() {
    box = document.getElementById("box");

    // if any operator is already pressed
    if (typeof last_operator != "undefined") {
        if (numbers.length > 0) {
            // if last button pressed is an operator
            if (operators.includes(last_button)) {
                // if the displayed text is just a negative sign, replace it with a 0
                if (box.innerText == "-") {
                    box.innerText = "0";
                    firstNum = true;
                    return;
                }
                // if the displayed text is not just a negative sign, replace it with a negative sign
                else {
                    box.innerText = "-";
                    firstNum = false;
                }
            }
            // if last button pressed is not an operator, change its sign
            else {
                box.innerText = -box.innerText;

                if (numbers.length == 1) {
                    numbers[0] = box.innerText;
                } else {
                    numbers[1] = box.innerText;
                }
            }
        }
        return;
    }

    // if displayed text is 0, replace it with a negative sign
    if (box.innerText == "0") {
        box.innerText = "-";
        firstNum = false;
        return;
    }
    box.innerText = -box.innerText;
}

// function to calculate the square root of the number currently on screen
function square_root() {
    box = document.getElementById("box");
    const square_num = Math.sqrt(box.innerText);
    box.innerText = square_num;
    numbers.push(square_num);
}

// function to calculate the division of 1 by the number currently on screen
function division_one() {
    box = document.getElementById("box");
    const square_num = 1 / box.innerText;
    box.innerText = square_num;
    numbers.push(square_num);
}

// function to calculate the power of the number currently on screen
function square_power() {
    box = document.getElementById("box");
    const power_num = Math.pow(box.innerText, 2);
    box.innerText = power_num;
    numbers.push(power_num);
}

// function to calculate percentage
function calculate_percentage() {
    box = document.getElementById("box");
    const current_value = parseFloat(box.innerText);
    const percentage = current_value / 100;
    box.innerText = percentage;
    numbers.push(percentage);
}