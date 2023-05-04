// benefits:
// 1. prototype customization / injection
// 2. mark => framework or packages

import { exclude, serializeClass, serializer } from "./serializer";

// class level decorator

function logger(constructorFn: Function) {
  //   console.log(constructorFn);
}

function logger2(name: string) {
  return function (constructorFn: Function) {
    constructorFn.prototype.carName = name;
    constructorFn.prototype.setName(name); // not work
  };
}

function logger3() {
  return function (constructorFn: Function) {
    constructorFn.prototype.print = function () {
      console.log(this);
    };
    constructorFn.prototype.setName = function (name: string) {
      this.name = name;
    };
  };
}

@logger2("BMW M5")
@logger3()
@logger
class Car {
  public name: string = "";

  constructor() {
    console.log("Generate new car!");
  }
}

// const car1 = new Car();

// console.log(car1);
// console.log((car1 as any).carName);
// (<any>car1).print();
// (<any>car1).setName("salam");
// (<any>car1).print();
// console.log(car1);

// ===============================================================

// method and property level decorator

// function writable(value: boolean) {
//   return function (
//     target: any,
//     propertyKey: string,
//     descriptor: PropertyDescriptor
//   ) {
//     // method protection
//     descriptor.writable = value;

//     console.log("propertyKey", propertyKey);
//   };
// }

// function test(target: any, propertyKey: string) {
//   console.log(target);
//   console.log(propertyKey);
// }

// class Person {
//   public firstname: string = "";

//   @test
//   public lastname: string = "";

//   constructor(firstname: string, lastname: string) {
//     this.firstname = firstname;
//     this.lastname = lastname;
//   }

//   @writable(false)
//   public greeting() {
//     console.log(`Hello ${this.firstname} ${this.lastname}`);
//   }
// }

// const p1 = new Person("ali", "rajabi");
// p1.greeting();
// p1.greeting = () => {
//   console.log("salam");
// };
// p1.greeting();

// ============================ serializer ==============================

@serializeClass
class Animal {
  @exclude
  public animalName: string = "";

  public voice: string = "";

  constructor(name: string, voice: string) {
    this.animalName = name;
    this.voice = voice;
  }
}

@serializeClass
class User {
  public username: string = "";

  @exclude
  private password: string = "";

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

const animal1 = new Animal("Reven", "Ghar Ghar");
const animal2 = new Animal("Cat", "Mio Mio");

console.log(animal1);
console.log(animal2);

serializer(animal1);

console.log(animal1);

const user1 = new User("rajabinekoo", "maktab88");

serializer(user1);

console.log(user1);

// Parameter Decorator

function printInfo(target: any, methodName: string, paramIndex: number) {
  console.log("Targer: ", target);
  console.log("methodName: ", methodName);
  console.log("paramIndex: ", paramIndex);
}

class Course {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  printStudentNumbers(mode: string, @printInfo printAll: boolean) {
    if (printAll) {
      console.log(10000);
    } else {
      console.log(2000);
    }
  }
}

const course = new Course("Super Course");
course.printStudentNumbers("ANYTHING", true);
course.printStudentNumbers("ANYTHING", false);
