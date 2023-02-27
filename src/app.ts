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

// TypeGuards - The practice or approach of checking if a certain property or method exists before using it.
// 'in' 'typeof' 'instanceof' etc

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

// Discriminated Unions

// We can specify a type in our interfaces and use a switch statement, or I guess we could use ifelse statements, but switch works best. -- to 'Describe' which type it is, and then call methods or operations on that.

// Doing this gives us autocomplete for which properties we are allowed to access which eliminates the problem of possible typos in our type checks checks.

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed: number;
  //   if ('flyingSpeed' in animal) {
  //     console.log('Moving with speed: ' + animal.flyingSpeed);
  //   }
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
  }
  console.log(`Moving at speed: ${speed}`);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });

// Type casting

// Since typescript doesn't go into our HTML file it doesn't know that the ID we are accessing from the DOM is of type HTMLParagraphElement or type HTMLInputElement for example, so we can explicitly tell it that by either adding it in front of the document query in angle brackets, or using the 'as' operator at the end.

// const paragraph = document.getElementById('message-output');

// const userInputElement = <HTMLInputElement>(
//   document.getElementById('user-input')!
// );
// const userInputElement = document.getElementById(
//   'user-input'
// )! as HTMLInputElement;

// userInputElement.value = 'Hi there!';

// alternative way, incase the input is null. the ! insures that it will always exist. but in cases where it may be null:

const userInputElement = document.getElementById('user-input');

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = 'Hi there!';
}

// Index types

interface ErrorContainer {
  // { email: 'Not a valid email, username: 'Must start with a capital character!' }
  //   id: string;
  [prop: string]: string;
}
// This says, I don't know the propery name.  I don't know the property count. What I do know is that the key of this object will be a string, and the value will be a string.

// We can add other things to this, such as an id, if we know we'll have an id.  It must be the same type as your indexed property though.

const errorBag: ErrorContainer = {
  email: 'Not a valid Email!',
  username: 'Must start with a capital character',
  foo: 'bar',
  1: 'string',
};

// Please note! We CAN add numbers as a key, because they can be converted into a string.  If we required a number as a key, we could not use a string though, because that could not be converted into a number.
