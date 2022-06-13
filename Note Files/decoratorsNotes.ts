// write code to make it easier for other developers
// typescriptlang.org definition:
// Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members. Decorators are a stage 2 proposal for JavaScript and are available as an experimental feature of TypeScript.

// 105. A FIRST CLASS DECORATOR - Decorator output was printed before pers1 console.log. Decorators execute when class is defined, not when instantiated. 

// function Logger(constructor: Function) {
//     console.log("Logging...")
//     console.log(constructor)
// }

// @Logger
// class Person {
//     name =  "Andrew";

//     constructor() {
//         console.log("Person created")
//     }
// }

// const pers1 = new Person();

// console.log(pers1)

// 106. WORKING WITH DECORATOR FACTORIES - returns a decorator function, but allows us to configure when we assign it as a decorator to something

// 107. BUILDING MORE USEFUL DECORATORS

function Logger(logString: string) {
    console.log("LOGGER FACTORY")
    return function(constructor: Function) {
        console.log(logString)
        console.log(constructor)
    }
   
}

function withTemplate(template: string, hookId: string) {
    console.log("TEMPLATE FACTORY")

    return function<T extends {new(...args: any[]): { name: string }} >(originalConstructor: T) {
        // if you add a constructor inside of a class that extends another class, you must include a super. 
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log("Rendering Template")
                const hookEl = document.getElementById(hookId)

                if (hookEl) {
                    hookEl.innerHTML = template;
                    //TS sees this h1 element as possibly null (may not have been created) Thus, we add ! to say that this element WILL be there    
                    hookEl.querySelector("h1")!.textContent = this.name;
                }
            }
        }
    }
}

//108. Multiple decorators.  Goes bottom up.

// @Logger('Logging - Person')
@Logger("LOGGING")
@withTemplate("<h1>Hello World</h1>", "app")
class Person {
    name =  "Andrew";

    constructor() {
        console.log("Person created")
    }
}
const pers = new Person();
console.log(pers)

// 109. DIVING INTO PROPERTY DECORATORS
// 110. ACCESSOR AND PARAMETER DECORATORS 

// // Property Decorators have 2 arguments(target, propertyName)
// function Log(target: any, propertyName: string | symbol) {
//     console.log("Property Decorator")
//     console.log(target, propertyName)
// }

// // Accessor Decorators have 3 arguments(target, name, descriptor)
// function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
//     console.log("Accessor Decorator");
//     console.log("Target: ", target);
//     console.log("Name: ",name);
//     console.log("Descriptor: ",descriptor);
// }

// // Method Decorators  have 3 arguments(target, name, descriptor )
// function Log3(target: any, name: string | symbol, descriptor: PropertyDescriptor ) {
//     console.log("Method Decorator");
//     console.log("Target: ", target);
//     console.log("Name: ",name);
//     console.log("Descriptor: ",descriptor);
// }

// // Parameter Decorators have 3 arguments(target, name(of method like MDs), position)

// function Log4(target: any, name: string | symbol, position: number) {
//     console.log("Parameter Decorator");
//     console.log("Target: ", target);
//     console.log("Name: ",name);
//     console.log("Position: ",position);
// }

// class Product {
//     @Log
//     title: string;
//     private _price: number;

//     @Log2
//     set price(val: number) {
//         if (val>0) {
//             this._price = val;
//         } else {
//             throw new Error("Not a valid price.")
//         }
//     }

//     constructor(t: string, p: number) {
//         this.title = t;
//         this._price = p;
//     }

//     @Log3
//     getPriceWithTax(@Log4 tax: number) {
//         return this._price * (1 + tax);
//     }
// }

// // 111. WHEN DO DECORATORS EXECUTE
// // All decorators all executed when you defined the class. They don't run at runtime. These decorators allow behind the scene setup work when class is defined. Back to meta programming concept, decorators are not event listeners, but the decorator itself is a function that executes when your class is defined, method is registered, and you can use decorator to do behind the scenes work that should run whenever this is called, add extra meta data, store data.

// // 112.RETURNING (AND CHANGING) A CLASS IN A CLASS DECORATOR
// // - in this tutorial we changed how decorators run when the class is created. We wanted to have the decorator run when we instantiate the class to show new info. This is demo'd in 112.

// // 113. THE OTHER DECORATOR RETURN TYPES
// // Return value of decorators are for method and accessor decorators. You can return values for the other two (property and parameter, but typescript will ignore it)

// // 114. CREATING AN AUTOBIND DECORATOR.

// function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
//   const originalMethod = descriptor.value;
//   const adjDescriptor: PropertyDescriptor =  {
//     configurable: true,
//     enumerable: true,
//     get() {
//         const boundFn = originalMethod.bind(this)
//         return boundFn;
//     }
//   }
//   return adjDescriptor;
// }

// class Printer {
//     message = "This Works";

//     @Autobind
//     showMessage() {
//         console.log(this.message)
//     }
// }

// const p = new Printer();

// const button = document.querySelector("button")!;
// button.addEventListener('click', () => p.showMessage)

// /////////////////////////////////////////////////////////////
//* DECORATOR VALIDATION *****************************************//
interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]; // ['required', 'positive']
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required']
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive']
    };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if(!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
        switch (validator) {
            case 'required':
                isValid = isValid && !!obj[prop];
                break;
            case 'positive':
                isValid = isValid && obj[prop] > 0;
                break;
        }
    }   
  }
  return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createCourse = new Course(title, price);

    if (!validate(createCourse)) {
        alert('Invalid input, please try again!');
        return;
    }
    console.log(createCourse);
});