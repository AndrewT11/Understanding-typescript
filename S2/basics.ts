function add(n1: number, n2: number, showResult: boolean, phrase: string) {
    // if (typeof n1 !== 'number' || typeof n2 !== 'number') {
    //   throw new Error('Incorrect input!');
    // }
    const result = n1 + n2;
    if (showResult) {
      console.log(phrase + result);
    } else {
      return result;
    }
  }
  
  let number1: number;
  number1 = 5;
  const number2 = 2.8;
  const printResult = true;
  let resultPhrase = 'Result is: ';
  
  add(number1, number2, printResult, resultPhrase);
  
  // const person: {
//     name: string,
//     age: number
// } 

// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     // This is the tuple. We are stating role is an array, that holds 2 elements, the first being a number and the second being a string.
//     role: [number, string]
// } = {
//     name: "Maximillian",
//     age: 30,
//     hobbies: ["Sports", "Cooking"],
//     role: [2, "author"]
// }

//** Emuns */

// If you don't assign values, they enum keys will be assigned number values similar to index numbers.
enum Role {
    ADMIN,
    READ_ONLY,
    AUTHOR
};

const person:  {
    name: "Maximillian",
    age: 30,
    hobbies: ["Sports", "Cooking"],
    role: Role.ADMIN;
}

// person.role.push("admin")
// person.role[1] = 10;

let favoriteHobs: string[];
favoriteHobs = ['Sports'];

console.log(person.name);

for(const hobby of person.hobbies) {
    console.log(hobby.toUpperCase())
}

//**Union and Literal Types */
// type Aliases aka Custom Types. Save code, write code quicker and be clearer about your intent with descriptive type names
// notice type here is capitalized because of is the name of the custom/alias type.
type Combinable = number | string;

// can include literal types. 
type ConversionDescriptor = 'as-number' | 'as-text';

function combine(
    input1: Combinable, 
    input2: Combinable, 
    //this is the literal type. It used to be type string. now it is type literally those two things. Anywhere resultConversion cna be found, it must have value of "as-number" or "as-text", even in if functions. It will throw an error.
    resultConversion: ConversionDescriptor) {
    let result;
    if (typeof input1 === "number" && input2 === "number" || resultConversion === "as-number") {
        result = +input1 + +input2;

    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
    // if(resultConversion === 'as-number') {
    //     return +result
    // } else {
    //     return result.toString();
    // }
  }

  const combinedAges = combine(30, 26, 'as-number');
  console.log("Cpmbined Ages: ", combinedAges)

  const combinedStringAges = combine("30", "26", 'as-number');
  console.log("String-Age: ", combinedStringAges)


  const combinedNames = combine("Max", "Anna", 'as-text');
  console.log("Combined Names: ", combinedNames)