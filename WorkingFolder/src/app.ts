//interface describes the structure of an object.
// you can use interfaces as a type. The variable  assigned that type must follow the interface definition of what the object should be.
//although you can use interface and type interchangeably, they are not the same.
// Union types can be stored in types, not interface
// interface is clearer. when you define it as interface, you want to define the structure of an object with that. This is why interface is used to do this more than custom types. 
// interface can be implemented in classes. This is why you often use these.
// class Person implements Greetable

interface Greetable {
    name: string;

    greet(phrase: string): void;
};

class Person implements Greetable {
    name: string;

    constructor(n: string) {
        this.name = n;
    }

    greet(phrase: string) {
        console.log(`${phrase} ${this.name}!`)
    }
}

let person1: Greetable;

person1 = new Person("Andrew")


person1.greet("What up")