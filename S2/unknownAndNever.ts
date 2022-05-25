//** UNKNOWN TYPE */
let userInput: unknown;
let userName: string;

// userInput = 5;
// userInput = "Max";

function getErrDone(userInput) {
    if(typeof userInput==="string") {
        userName = userInput;
        console.log(`This is the user's name: ${userName}`)
        
    } else {
        userName = userInput
        console.log(`This was not the user's name, but the user input this anyway: ${userName}`)
    }
}

getErrDone("Andrew");

/**NEVER TYPE */
function generateError(message: string, code: number) {
    throw {message: message, errorCode: code};
}

generateError('An error occurred', 500);