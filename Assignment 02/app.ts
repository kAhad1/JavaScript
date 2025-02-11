//Inheritance

class Vehicle {

    protected vehicleType: string;

    constructor(vehicleType: string) {
        this.vehicleType = vehicleType;
    }

    displayVehicleType(): void {
        console.log(`This is a ${this.vehicleType}.`);
    }
}

class Car extends Vehicle {
    private brand: string;

    constructor(vehicleType: string, brand: string) {
        super(vehicleType);
        this.brand = brand;
    }

    displayCarDetails(): void {
        console.log(`This car is a ${this.brand}.`);
    }

    displayVehicleType(): void {
        console.log(`This is a ${this.brand} car.`);
    }
}

const myCar = new Car("car", "BMW");


myCar.displayVehicleType();
myCar.displayCarDetails();


//Encapsulation

class Person {
    private firstName: string;
    private lastName: string;
    private age: number;

    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    setAge(age: number): void {
        if (age < 0) {
            console.log("Age cannot be negative!");
        } else {
            this.age = age;
        }
    }

    getAge(): number {
        return this.age;
    }
}

const person = new Person("Ahmed", "Raza", 25);

console.log(person.getFullName());
console.log(person.getAge());

person.setAge(35);
console.log(person.getAge());

person.setAge(-5);