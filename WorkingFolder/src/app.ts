type Admin = {
    name: string;
    privilege: string[];
};

type Employee {
    name: string; 
    startDate: Date;
}

//this is the intersection
type ElevatedEmployee = Admin & Employee;

//Conversely, could have created interfaces instead of types, then
// interface ElevatedEmployee extends Admin, Employees {}

const e1: ElevatedEmployee = {
    name: 'Max',
    privilege: ['create-server'],
    startDate: new Date()
}