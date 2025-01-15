document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');

    let currentInput = ''; // Stores the current input as a string
    let operator = ''; // Stores the selected operator
    let operand1 = null; // Stores the first operand

    // Function to update the display
    const updateDisplay = (value) => {
        display.value = value;
    };

    // Event listener for number and operator buttons
    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const value = event.target.getAttribute('data-value');

            if (!isNaN(value)) {
                // If the button is a number, append it to the current input
                currentInput += value;
                updateDisplay(currentInput);
            } else if (['+', '-', '*', '/'].includes(value)) {
                // If the button is an operator
                if (currentInput !== '') {
                    if (operand1 === null) {
                        // Store the first operand
                        operand1 = parseFloat(currentInput);
                    } else if (operator) {
                        // Perform the calculation if there's already an operator
                        operand1 = calculate(operand1, operator, parseFloat(currentInput));
                        updateDisplay(operand1);
                    }
                    operator = value; // Store the new operator
                    currentInput = ''; // Reset the current input for the next number
                }
            }
        });
    });

    // Event listener for the equals button
    equalsButton.addEventListener('click', () => {
        if (operand1 !== null && currentInput !== '' && operator) {
            const operand2 = parseFloat(currentInput);
            const result = calculate(operand1, operator, operand2);
            updateDisplay(result);
            operand1 = null; // Reset for the next calculation
            operator = '';
            currentInput = '';
        }
    });

    // Event listener for the clear button
    clearButton.addEventListener('click', () => {
        currentInput = '';
        operand1 = null;
        operator = '';
        updateDisplay('');
    });

    // Function to perform the calculation
    const calculate = (num1, operator, num2) => {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            default:
                return 'Error';
        }
    };
});
