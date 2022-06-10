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
// generic types give us flexibility combined with type safety. Flexible in values we pass in, as long as we follow constraints, but we have full type support with what we do with the class or function.
// 101. GENERAL UTILITY TYPES
// - Partial makes things optional
// - Readonly forbids editting after genesis

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(
    title: string,
    description: string,
    date: Date,
): CourseGoal {
// TS would usually complain here because CourseGoal is not an empty object, but an object with title, description, and completeUntil. Because you are adding piece by piece, TS sees a variable with a property CourseGoal to be wrong. When we add partial, all the keys inside CourseGoal interface have now been made optional to coursegoal.
 let courseGoal: Partial<CourseGoal> = {};
 courseGoal.title = title;
 courseGoal.description = description;
 courseGoal.completeUntil = date;

 // an error will be thrown here because we see courseGoal as a partial<CourseGoal>. To correct this, use "as CourseGoal"
 return courseGoal as CourseGoal;
}
// Read Only
const names: Readonly<string[]> = ["Andrew", "Anna"];
// names.push("Manu");
// names.pop();

// 102. GENERIC VS UNION TYPES
// Union types allow for addition of any of those kinds. Generics makes you choose a selection of what you extended. (number, string, boolean). So, generic types will allow you to choose for specificity when using the generics and extending the class. Union types allow for any type that is listed within the union type. You can store any type of data in the array, even the array will not be specified (obviously)
