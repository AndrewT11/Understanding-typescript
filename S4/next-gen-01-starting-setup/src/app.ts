const userName = "Max";


let age = 30;

age = 29;

const button = document.querySelector("button")

if (button) {
    button.addEventListener("click", event => console.log(event))
}

const add = (a: number = 1, b: number = 3) => a + b;

const printOutput: (a: number | string) => void = output => console.log(output);

printOutput(add());