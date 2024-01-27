const inputArea = document.getElementById("input-area");
const addOption = document.getElementById("add-option");
const makeChoice = document.getElementById("choose-button");
const clearOptions = document.getElementById("clear-button");
const resultText = document.getElementById("result-text");




class Option
{
    constructor(number)
    {
        const container = document.createElement("div"); // Input Container
        const label = document.createElement("label"); // Label
        const input = document.createElement("input"); // Input Piece
        const removeContainer = document.createElement("div"); // Remove Option Container
        const removeText = document.createElement("h5");

        container.setAttribute("class", "input");

        label.setAttribute("for", `input-${number}`);

        input.setAttribute("id", `input-${number}`);
        input.setAttribute("class", "option");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "Choose something...");
        input.setAttribute("value", "");

        removeContainer.setAttribute("class", "remove-option");
        removeContainer.setAttribute("id", `remove-${number}`);

        removeText.textContent = "Remove";

        container.appendChild(label);
        container.appendChild(input);
        removeContainer.appendChild(removeText);
        container.appendChild(removeContainer);
        inputArea.appendChild(container);

        this.removeButton = removeContainer;

        this.removeButton.addEventListener("click", () =>
        {
            removeOption(container);
        })

        input.addEventListener("input", (event) =>
        {
            input.setAttribute("value", event.target.value);
        });
    }
}

function createOption(number)
{
    const newOption = new Option(number);
}

createOption(1);
createOption(2);
createOption(3);

addOption.addEventListener("click", () =>
{   
    let numberOfOptions = Array.from(document.getElementsByClassName("input"));
    createOption(numberOfOptions.length + 1);
    // Probably remove the number argument - extra work and doesn't add much

});

function removeOption(optionToRemove)
{ 
    optionToRemove.remove();
}

clearOptions.addEventListener("click", () =>
{
    let options = Array.from(document.getElementsByClassName("option"));
    console.log(options);
    options.forEach(option =>
        {

                option.setAttribute("value", "");
                option.value = "";

        });
        resultText.textContent = "";
        
});

makeChoice.addEventListener("click", () =>
{   
    let options = Array.from(document.getElementsByClassName("option"));
    let finalOptions = [];

    for (let i = 0; i < options.length; i++)
    {
        if (options[i].value)
        {
            finalOptions.push(options[i]);
            console.log(options[i].value);
        }
    }


    if (finalOptions.length > 0)
    {
        let chosenNumber = pickRandomNumber(finalOptions.length);

        resultText.textContent = finalOptions[chosenNumber].value;

    }
    else
    {
        resultText.textContent = "Please Add Items To Choose From!";
    }
    

});

function pickRandomNumber(inputNumber)
{
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * inputNumber);
    console.log(randomNumber);
    return randomNumber;
}

