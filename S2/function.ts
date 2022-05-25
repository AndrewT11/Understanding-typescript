function add(n1: number, n2: number): number {
    return n1 + n2;
} 

// return type here is void. JS doesn't have a name for this situation.
function printResult(num: number) {
    console.log(`Result: ${num}`)
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1+ n2;
    cb(result)
}

let combineValues: (a: number, b: number) => number;

// this is called a pointer. Store a pointer at a function in another variable, execute variable as function because it points at function.
combineValues = add;
// this will complain because printResult takes in 1 number and does not return anything.
// combineValues = printResult;
// at this point, combineValues has a type any. It should be a function and function only.

// TS complains because "Max" is a string and not a number.
console.log(combineValues("Max", "John"))
console.log(combineValues(5, 8))

addAndHandle(10, 20, (result) => {
    console.log(result);
});