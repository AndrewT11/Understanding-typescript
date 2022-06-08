//interface describes the structure of an object.
// you can use interfaces as a type. The variable  assigned that type must follow the interface definition of what the object should be.
//although you can use interface and type interchangeably, they are not the same.
// Union types can be stored in types, not interface
// interface is clearer. when you define it as interface, you want to define the structure of an object with that. This is why interface is used to do this more than custom types. 
// interface can be implemented in classes. This is why you often use these.
// class Person implements Greetable
// readonly to set something and never be able to change it. Only added to interface.

// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + ' ' + this.name);
    } else {
      console.log('Hi!');
    }
  }
}

let user1: Greetable;

user1 = new Person();
// user1.name = 'Manu';

user1.greet('Hi there - I am');
console.log(user1);
