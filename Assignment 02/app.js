//Inheritance
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vehicle = /** @class */ (function () {
    function Vehicle(vehicleType) {
        this.vehicleType = vehicleType;
    }
    Vehicle.prototype.displayVehicleType = function () {
        console.log("This is a ".concat(this.vehicleType, "."));
    };
    return Vehicle;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(vehicleType, brand) {
        var _this = _super.call(this, vehicleType) || this;
        _this.brand = brand;
        return _this;
    }
    Car.prototype.displayCarDetails = function () {
        console.log("This car is a ".concat(this.brand, "."));
    };
    Car.prototype.displayVehicleType = function () {
        console.log("This is a ".concat(this.brand, " car."));
    };
    return Car;
}(Vehicle));
var myCar = new Car("car", "BMW");
myCar.displayVehicleType();
myCar.displayCarDetails();
//Encapsulation
var Person = /** @class */ (function () {
    function Person(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    Person.prototype.getFullName = function () {
        return "".concat(this.firstName, " ").concat(this.lastName);
    };
    Person.prototype.setAge = function (age) {
        if (age < 0) {
            console.log("Age cannot be negative!");
        }
        else {
            this.age = age;
        }
    };
    Person.prototype.getAge = function () {
        return this.age;
    };
    return Person;
}());
var person = new Person("Ahmed", "Raza", 25);
console.log(person.getFullName());
console.log(person.getAge());
person.setAge(35);
console.log(person.getAge());
person.setAge(-5);
