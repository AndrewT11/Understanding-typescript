import 'reflect-metadata';
import { plainToClass } from 'class-transformer';

import { Product } from './product.model';

const products = [
  { title: 'A Carpet', price: 29.99 },
  { title: 'A Book', price: 10.99 }
];

// const p1 = new Product('A Book', 12.99);

// const loadedProducts = products.map(prod => {
//   return new Product(prod.title, prod.price);
// });

// Manually transforming vanilla JS array or single-noname object into an instance
const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}

// Class transformer package:

// https://www.npmjs.com/package/class-transformer

// Makes creating an instance of a class from JSON info easier. Above was manual and cumbersome.
// 1) Define a class
// 2) Then, grab some data 
// 3) Call a convenience method, and it will automatically convert data into right models.

// npm install class-transformer --save
// npm install reflect-metadata --save
// import 'reflect-metadata'; in root file (app.ts here)
import { plainttoClass } from 'class-transformer'
- the main method. 

plainToClass(class you want to convert to, data you want to transform)
const loadedProduct = plainttoClass()
