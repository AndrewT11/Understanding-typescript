type Admin = {
    name: string;
    privilege: string[];
};

type Employee {
    name: string; 
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Max',
    privilege: ['create-server'],
    startDate: new Date()
}