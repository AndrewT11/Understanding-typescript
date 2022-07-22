import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class Product {
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsPositive()
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  getInformation() {
    return [this.title, `$${this.price}`];
  }
}

//class-validators build up on the concept of TS decorators
// gives us a brand new way of working with them

// A package that allows us to add validation rules with the help with decorators inside of a class
// When we instantiate it, we can validate it with the rules we setup using decorators

// npm install class-validator --save

// imports need to be made in the product.model.ts. These are all types of decorators
// import {
//   validate,
//   validateOrReject,
//   Contains,
//   IsInt,
//   Length,
//   IsEmail,
//   IsFQDN,
//   IsDate,
//   Min,
//   Max,
// } from 'class-validator';

// go to tsconfig.json file and turn "experimentalDecorators on or :true"

// begin placing imported decorators under sections of the class you want to protect

// import { validate } from 'class-validator' into where you instantiated the class. Here, it will be in the root file, app.ts
// - validate will return a promise which might yield validation errors.

// This is a great way of using decorators without creating decorators