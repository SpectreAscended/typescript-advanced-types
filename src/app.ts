// Intersection types

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

// interface Admin {
//   name: string;
//   privileges: string[];
// }

// interface Employee {
//   name: string;
//   startDate: Date;
// }

// interface ElevatedEmployee extends Admin, Employee {}

// ^ These basically do the same thing

const e1: ElevatedEmployee = {
  name: 'Cory',
  privileges: ['create-server'],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// Type guards

function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

// Since a and b can be both number OR string, we need to be able to handle that case.  So if one of them is a string, and one is a number, we must convert them both to string to concatonate.  Otherwise they will be added mathematically.  This is a 'type guard' using typeof.

// We can only use a typeof check using types JavaScript knows because these will be compiled at run time.  So we cant do like 'typeof emp === 'Employee' for example. It can't be a custom type.

// Here we want to print privileges.  Typescript yells at us because emp.priviliges may not exist.  To get around this we can use  'in'. a JavaScript method to see if property 'privileges' exists within the object emp.

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);

  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges);
  }

  if ('startDate' in emp) {
    console.log('Start date: ' + emp.startDate);
  }
}

printEmployeeInformation(e1);
printEmployeeInformation({ name: 'Doug', startDate: new Date() });

class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo ... ' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  //   if ('loadCargo' in vehicle) {
  //     vehicle.loadCargo(1000);
  //   }

  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);
