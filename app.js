let savedNumber = 0;
let state = 'calculating';
let firstNumber = true;

//Called when clicking a number
function numberClick(value)
{
    let screenResult = document.getElementById('result').innerHTML;

    //Removes the 0 that is displayed initially
    if(screenResult == '0' || firstNumber)
        document.getElementById('result').innerHTML='';
    
    //So that we don't go outside of the div
    if(!firstNumber && screenResult.toString().length >= 7)
        return;
    
    firstNumber = false;
    
    //Special state after the calculation is done
    if(state == 'justCalced')
    {
        document.getElementById('result').innerHTML=''
        state = 'calculating'
    }

    //Display the value
    document.getElementById('result').innerHTML+=value;

}

//Called when clicking a operand
function operandClick(operation)
{
    let currentDisplay = parseFloat(document.getElementById('result').innerHTML)
    //Saves the number
    if(!firstNumber || currentDisplay == 0)
        savedNumber += currentDisplay;
        
    //Determine the operation
    state = operation; 

    //The next number will be the first in the sequence
    firstNumber = true;

    if(savedNumber.toString().length > 7)
    {
        savedNumber = savedNumber.toExponential(3);
    }
    document.getElementById('result').innerHTML = savedNumber;

}

//Called when clicking equals
function equalsClick()
{
    let result;
    let currentNumber = document.getElementById('result').innerHTML;

    if(state == 'add')
        result = parseFloat(savedNumber) + parseFloat(currentNumber);
    else if(state == 'sub')
        result = parseFloat(savedNumber) - parseFloat(currentNumber);
    else if(state == 'div')
        result = parseFloat(savedNumber) / parseFloat(currentNumber);
    else if(state == 'times')
        result = parseFloat(savedNumber) * parseFloat(currentNumber);
    else if(state == 'sqrt')
        result = Math.sqrt(parseFloat(currentNumber));
    else if(state == 'percent')
        result = parseFloat(savedNumber) / 100;
    
    else if(state == 'justCalced' || state == 'calculating')
        return;

    if(result.toString().length >= 7)
    {
        result = result.toExponential(3);
    }

    document.getElementById('result').innerHTML = result;
    savedNumber = 0;
    state = 'justCalced';
}

//Resets the calculator
function reset()
{
    state = 'calculating';
    savedNumber = null;

    document.getElementById('result').innerHTML = 0;
}
