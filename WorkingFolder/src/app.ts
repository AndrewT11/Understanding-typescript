import { Product } from './product.model';
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

import 'reflect-metadata';

const products = [
    { title: "A Carpet", price: 29.99 },
    { title: "A Book", price: 10.99 },
 ]

const newProduct = new Product("", -5.99)
validate(newProduct).then(errors => {
    if(errors.length > 0) {
        console.log('VALIDATION ERRORS!');
        console.log(errors);
    } else {
        console.log(newProduct.getInformation())

    }
})
// const p1 = new Product('A Book', 12.99);
// console.log(p1.getInformation());


// const loadedProducts = products.map(product => new Product(product.title, product.price))

const loadedProducts = plainToClass(Product, products)

for (const product of loadedProducts) {
    console.log(product.getInformation())
}
