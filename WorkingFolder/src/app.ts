// These two are equivalent. Array is the generic type connected to another type.

// const names: string[] = ["Andrew", "James"]
// const names: Array<string> = ["Andrew", "James"]
// advantage do defining the type of the array is typescript will know when you try to perform string methods on the variable. (such as .split(" ")

// const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('This is done');
//     }, 2000);
// })

//we are doing this for better typescript support.

// 95. CREATING GENERIC FUNCITONS

function merge<T, U>(objA: T, objB: U) {
    return  Object.assign(objA, objB)
}

// using generics allows TS to see that the function merge will get two different types of objects and the output will be an intersection of the two aprams passed in. So now we know that intersected data will be stored in mergedObj below.
const mergedObj = merge({name: "Andrew"}, {age: 39})

console.log(mergedObj.age)

// 96. Working with Constraints
// - do this by extending your generic types. < T extends object, U extends object>
// Now whatever is passed must be an object. This forces us to place an object as the second argument. If we do not have an object (say just the number), an error will show and TS will not compile the code.

// 97. ANOTHER GENERIC FUNCTION

interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = "Got no value.";

    if(element.length === 1) {
        descriptionText = "Got 1 elements."
    } else if (element.length > 1) {
        descriptionText = `Got ${element.length} elements.`
    }

    return [element, descriptionText]
}

console.log(countAndDescribe("Hi there"));
console.log(countAndDescribe(["Fox", "Tiger", "Mouse"]));
console.log(countAndDescribe("1"));

// 98. KEY OF CONSTRAINT <U extends keyof T>

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return `Value: ${obj[key]}`;
}

extractAndConvert({name: "Andrew"}, "name")

// 99. Generic Classes

class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if(this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Andrew");
textStorage.addItem("Manu");
textStorage.removeItem("Manu");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.removeItem(1);
console.log(numberStorage.getItems());

//when we extend generic T on DataStorage to string, number, boolean, we cannot create an objStore instance off a DataStorage class.
// const objectStorage = new DataStorage<object>();
// const andrewObj = {name: "Andrew"}

// objectStorage.addItem(andrewObj)
// objectStorage.addItem({ age: 39})
// objectStorage.removeItem(andrewObj)
// console.log(objectStorage.getItems());

// 100. A FIRST SUMMARY