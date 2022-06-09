type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string; 
    startDate: Date;
}

//this is the intersection
type ElevatedEmployee = Admin & Employee;

//Conversely, could have created interfaces instead of types, then
// interface Employee { name: string; startDate: Date; }
// interface Admin { name: string; privileges: string[]; }
// interface ElevatedEmployee extends Admin, Employees {}

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

//////////////////////////////////////////////////////////////////
// this is a type guard. Using primitive types as typeguard.
// function add(a: Combinable, b: Combinable) {

//     if (typeof a === 'string' || typeof b === 'string') {
//         return a.toString() + b.toString();
//     }
//     return a + b;
// }

// using union type properties as a typeguard. This is like a "will print if available" guard because certain properties are found only in each type.
type UnknownEmployee = Admin | Employee;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log("Employee Name: ", emp.name)
    if("privileges" in emp) {
        console.log("Employee Privileges: ", emp.privileges)
    }
    if("startDate" in emp) {
        console.log("Start Date: ", emp.startDate)
    }
}

printEmployeeInformation(e1);

class Car {
    drive() {
        console.log("Driving a car...")
    }
}

class Truck {
    drive() {
        console.log("Driving a truck...")
    }
    loadCargo(amount: number) {
        console.log("Loading cargo..." + amount)
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

// using instance type as typeguard. We are using instance because the union type Vehicle above was created using two classes, which are instances.
function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if(vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

// discriminated unions. Using switch to pick between the types.
// create variable speed, then define it within the switch statement if type is chosen.
interface Bird {
    type: "bird";
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;


function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log(`The ${animal.type} is moving at ${speed} mph!!!`)
}

moveAnimal({type: 'bird', flyingSpeed: 25});
moveAnimal({type: 'horse', runningSpeed: 30});

/////////////////////////////////////////////////////////////////
// Type Casting. You can add a "!" behind document.getElementById("user-input") to tell TS that the value is not null, but it will still throw an error with .value as value does not exist on type "HTMLElement" 

// const userInputElement = document.getElementById("user-input")!;

// Two types:
// - <HTMLInputElement> before defining

// const userInputElement = <HTMLInputElement>document.getElementById("user-input")!;

// - as HTMLInputElement after defining the variable. 

// const userInputElement = document.getElementById("user-input") as HTMLInputElement;

// userInputElement.value = "Whatup doe!"

//If you are not sure if there will be a value inside the HTML, validate. Use an if statement.

const userInputElement = document.getElementById("user-input") 

//if statement first takes care if there is anything there, and if we do have a userInputElement, .value error is taken care of with the "as HTMLInputElement" code
if (userInputElement) {
    (userInputElement as HTMLInputElement).value = "Hi There"
}

///////////////////////////////////////////////////////////////////
// Index Properties. Create objects that are more flexible regarding the properties that they might hold
// So Index Properties are useful when we don't know which property names we have or the amount of properties 

interface ErrorContainer {
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: "Not a valid email",
    username: "Not a valid username"
}

//////////////////////////////////////////////////////////////////
// FUNCITON OVERLOAD. Feature that allows us to define multiple function signatures. We cna have multiple possible ways of calling a function with different parameteres.
//Reuse code from earlier to drive home point.

// These are the overloads. Stating if a and b are same type, then the return should be of the same type that was input as params
function add (a: number, b: number): number;
function add (a: string, b: string): string;
function add (a: string, b: number): string;
function add (a: number, b: string): string;

function add(a: Combinable, b: Combinable) {

    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

// const result = add(1, 5) 
//problem here is result is string/number. We want it to know if it is a string or number so we can call methods onto it for particular string or number types

const result = add("Andrew", "Tran")

result.split(' ') // with this, we can't split result because TS doesn't know if result is a string or number

////////////////////////////////////////////////////////////////
// OPTIONAL CHAINING

const fetchedUserData = {
    id: 'u1',
    name: 'Andrew',
    job: { title: 'CEO', description: 'My own company'}
}

console.log(fetchedUserData?.job?.title);

////////////////////////////////////////////////////////////////
// NULLISH COALESCING (??) If value before ?? is null or undefined, it will turn to the second option. Given an empty string is not null or undefined, this example would return the empty string in a console.log

const userInput = "";

const storedData = userInput ?? 'DEFAULT';

console.log(storedData)
