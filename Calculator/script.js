let resultField = document.getElementById('result');

function appendValue(value) {
    resultField.value += value;
}

function clearResult() {
    resultField.value = '';
}

function calculateResult() {
    const validExpression = /^[\d+\-*/().\s]+$/; 
    const input = resultField.value;

    if (validExpression.test(input)) {
        const result = eval(input);
        if (isFinite(result)) {
            resultField.value = result;
        } else {
            alert('Invalid Calculation');
            clearResult();
        }
    } else {
        alert('Invalid Input');
        clearResult();
    }
}
