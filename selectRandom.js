const inputArea = document.getElementById("input-area");

console.log("Hello!");

const addOption = document.getElementById("add-option");
const makeChoice = document.getElementById("choose-button");
const clearOptions = document.getElementById("clear-button");
const resultText = document.getElementById("result-text");

let numberOfOptions = 2;
updateOptions();


addOption.addEventListener("click", () =>
{   
    console.log("Clicked Add!");
    numberOfOptions++;
    

    const newOption = createLabelInputPair(numberOfOptions);
    updateOptions();


});

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
    let chosenNumber = pickRandomNumber(options.length);

    resultText.textContent = options[chosenNumber].value;

    console.log("Clicked Choose!");

});

function createLabelInputPair(number)
{
    const container = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");

    container.setAttribute("class", "input");

    label.setAttribute("for", `input-${number}`);
    label.textContent = (`${number}. `);

    input.setAttribute("id", `input-${number}`);
    input.setAttribute("class", "option");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Choose something...");

    
    container.appendChild(label);
    container.appendChild(input);

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

