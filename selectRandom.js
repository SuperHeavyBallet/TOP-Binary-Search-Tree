const inputArea = document.getElementById("input-area");

console.log("Hello!");

const addOption = document.getElementById("add-option");
const makeChoice = document.getElementById("choose-button");
const clearOptions = document.getElementById("clear-button");
const resultText = document.getElementById("result-text");
let removeOptions = Array.from(document.getElementsByClassName("remove-option"));
updateRemoveButtonCount();

let numberOfOptions = 2;
updateOptions();


addOption.addEventListener("click", () =>
{   
    console.log("Clicked Add!");
    numberOfOptions++;
    

    createLabelInputPair(numberOfOptions);
    updateOptions();
    updateRemoveButtonCount();


});

function updateRemoveButtonCount()
{
    
    let removeOptions = Array.from(document.getElementsByClassName("remove-option"));

    removeOptions.forEach((option) =>
    {
        option.addEventListener("click", (event) =>
        {
            console.log(option.getAttribute("id"));
            const buttonID = parseInt(option.getAttribute("id").match(/(\d+)/));
            console.log(buttonID);
            removeOption(buttonID-1);
        })
    })
   
}

function removeOption(optionToRemove)
{
    let removeOption = Array.from(document.getElementsByClassName("input"));
    removeOption[optionToRemove].remove();
    updateOptions();
    updateRemoveButtonCount();
}

console.log(removeOptions);


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

function updateOptions()
{
    let options = Array.from(document.getElementsByClassName("option"));
    console.log(options);
    options.forEach(option =>
        {
            option.addEventListener("input", (event) =>
            {
                option.setAttribute("value", event.target.value);
                
            })
        });
}



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

    console.log("Final Options", finalOptions);

    if (finalOptions.length > 0)
    {
        let chosenNumber = pickRandomNumber(finalOptions.length);

        resultText.textContent = finalOptions[chosenNumber].value;

    console.log("Clicked Choose!");
    }
    else
    {
        resultText.textContent = "Please Add Items To Choose From!";
    }
    

});

function createLabelInputPair(number)
{
    const container = document.createElement("div"); // Input Container
    const label = document.createElement("label"); // Label
    const input = document.createElement("input"); // Input Piece
    const removeContainer = document.createElement("div"); // Remove Option Container
    const removeButton = document.createElement("h5");

    container.setAttribute("class", "input");

    label.setAttribute("for", `input-${number}`);
    label.textContent = (`${number}. `);

    input.setAttribute("id", `input-${number}`);
    input.setAttribute("class", "option");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Choose something...");

    removeContainer.setAttribute("class", "remove-option");
    removeContainer.setAttribute("id", `remove-${number}`);

    removeButton.textContent = "Remove";

    container.appendChild(label);
    container.appendChild(input);
    removeContainer.appendChild(removeButton);
    container.appendChild(removeContainer);
    inputArea.appendChild(container);
}

function pickRandomNumber(inputNumber)
{
    const numberRange = inputNumber;
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * inputNumber);
    console.log(randomNumber);
    return randomNumber;

}

