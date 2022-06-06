"use strict";
;
class Person {
    constructor(n) {
        this.name = n;
    }
    greet(phrase) {
        console.log(`${phrase} ${this.name}!`);
    }
}
let person1;
person1 = new Person("Andrew");
person1.greet("What up");
//# sourceMappingURL=app.js.map