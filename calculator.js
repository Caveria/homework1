document.addEventListener('DOMContentLoaded', function() {

    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operatorSelect = document.getElementById('operator');
    const resultsTable = document.getElementById('results-table');
    const summaryTable = document.getElementById('summary-table');

    let calculations = [];
    let validResults = [];

    // Function to perform calculation
    function calculate() {
        const x = num1Input.value.trim();
        const y = num2Input.value.trim();
        const operator = operatorSelect.value;

        if (x === '' || y === '') {
            alert('Please enter both numbers');
            return;
        }

        if (isNaN(x) || isNaN(y)) {
            calculations.push({
                x: x,
                operator: operator,
                y: y,
                result: 'Error: Non-numeric input'
            });
            updateResultsTable();
            clearInputs();
            return;
        }

        const numX = parseFloat(x);
        const numY = parseFloat(y);
        let result;

        switch(operator) {
            case '+':
                result = numX + numY;
                break;
            case '-':
                result = numX - numY;
                break;
            case '*':
                result = numX * numY;
                break;
            case '/':
                if (numY === 0) {
                    result = 'Error: Division by zero';
                } else {
                    result = numX / numY;
                }
                break;
            case '%':
                result = numX % numY;
                break;
            default:
                result = 'Error: Invalid operator';
        }

        // Add to calculations array
        calculations.push({
            x: numX,
            operator: operator,
            y: numY,
            result: result
        });

        // If result is valid, add to validResults array
        if (typeof result === 'number' && !isNaN(result)) {
            validResults.push(result);
        }

        updateResultsTable();
        updateSummaryTable();
        clearInputs();
    }

    // Function to update results table
    function updateResultsTable() {
        if (calculations.length === 0) {
            resultsTable.innerHTML = '<p>No calculations yet.</p>';
            return;
        }

        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Number 1</th>
                        <th>Operator</th>
                        <th>Number 2</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
        `;

        calculations.forEach(calc => {
            tableHTML += `
                <tr>
                    <td>${calc.x}</td>
                    <td>${calc.operator}</td>
                    <td>${calc.y}</td>
                    <td class="${typeof calc.result === 'string' && calc.result.includes('Error') ? 'error' : ''}">
                        ${typeof calc.result === 'number' ? calc.result.toFixed(2) : calc.result}
                    </td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        resultsTable.innerHTML = tableHTML;
    }

    function updateSummaryTable() {
        if (validResults.length === 0) {
            summaryTable.innerHTML = '';
            return;
        }

        const min = Math.min(...validResults);
        const max = Math.max(...validResults);
        const total = validResults.reduce((sum, value) => sum + value, 0);
        const avg = total / validResults.length;

        summaryTable.innerHTML = `
            <h2>Summary Statistics</h2>
            <table>
                <thead>
                    <tr>
                        <th>Minimum</th>
                        <th>Maximum</th>
                        <th>Average</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${min.toFixed(2)}</td>
                        <td>${max.toFixed(2)}</td>
                        <td>${avg.toFixed(2)}</td>
                        <td>${total.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    function clearInputs() {
        num1Input.value = '';
        num2Input.value = '';
        num1Input.focus();
    }
    function resetCalculator() {
        calculations = [];
        validResults = [];
        clearInputs();
        updateResultsTable();
        updateSummaryTable();
    }

    // Event listeners
    calculateBtn.addEventListener('click', calculate);
    resetBtn.addEventListener('click', resetCalculator);
    num2Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculate();
        }
    });

    updateResultsTable();
});