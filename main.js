"use strict";
console.log('------------------------------------------ARRAY & FUNCTIONS---------------------------------------------------')
console.log("je suis lu");
var cars = ["Saab", "Volvo", "BMW"];

cars.forEach(car => {
    console.log(car);

});

console.log('original : ' + cars);
// note : since we cant pass parameters by reference, to change a variable value in the function we have to use an object instead
function first2End(array) {
    array.push(array.shift());
    return array;
}

console.log("modifié : " + first2End(cars));

//arrow function version
const test2 = () => 0;

var calc = (a, b) => a + b;

console.log(calc(10, 2));

calc = 2;

console.log(calc);
console.log('------------------------------------------CLASSES---------------------------------------------------')
//#region classes

class Car {
    constructor(brand, year) {

        this.name = brand;
        this.year = year;
        console.log("You've successfully created a new car!\n" + "its a " + this.name + " from the year " + this.year + "\n");
    }

    present() {
        return 'I have a ' + this.name;
    }

    age() {
        let date = new Date();
        return "the age of the car is : " + (date.getFullYear() - this.year) + " years \n";
    }

    static statMethod() {
        console.log("bonjour je suis une méthode statique, je suis reliée à la classe et non pas à une instance de la classe, ce qui veut dire qu'on m'appelle en faisant Car.statMethod()\n")
    }

}

class Model extends Car {
    constructor(brand, year, mod) {
        super(brand, year);
        this.model = mod;
    }
    show() {
        return this.present() + ', it is a ' + this.model + "\n";
    }
}

var mycar = new Model("Ford", "455", "Mustang");
console.log(mycar.show());
console.log(mycar.age())

let car1 = new Car("Ferrari", "2001");
let car2 = new Car("Aston Martin", "2015");
Car.statMethod();

console.log("l'age de " + car1.name + " est de : " + car1.age() + " ans");

class Task {
    
    static count;
    constructor(name, description, date = new Date(), status = "waiting", priority = "normal") {
        this.name = name;
        this.description = description;

        if (date instanceof Date) {
            this.date = date.getDate() + " " + this.month2String(date.getMonth()) + " " + date.getFullYear();
        }
        this.status = status;
        this.priority = priority;
        Task.increaseCount();
        this.number = Task.count;
    }

    static getCount(){
        return (typeof this.count !== "undefined")?  this.count : "count hasnt been defined yet";
    }

    static increaseCount(){
        this.count+=1;
    }


    month2String(month) {
        let months = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];

        return months[month];
    }

    toString() {
        return "task " + this.name + " is : \n" + this.description + " \nIt was created the " + this.date + " with the priority level of : " + this.priority + ". Its current status is " + this.status;
    }

    toJSONObj() {
        return JSON.stringify(this);
    }
}

console.log(Task.getCount());
Task.count = 0;
var tache1 = new Task("premiere tache", "ceci est la premiere tache de notre todolist", new Date(), "en attente", "importante");
var tache2 = new Task("deuxieme tache", "ceci est la deuxieme tache de notre todolist");
var tache3 = new Task("","");
var clone = tache1;

clone.name = 'test';

console.log(tache1.name);


console.log(Task.getCount());
console.log(tache1.number);



console.log('------------------------------------------OBJECTS---------------------------------------------------')
//#endregion

//#region objects

var person = {
    'nom': 'Doe',
    'prenom': 'John',
    'age': 25
};

const x = person;

// ici person et x sont exactement les mêmes, quand on modifie l'un on modifie aussi l'autre
console.log(person);
person.age = 65;
console.log(x);
x.nom = 'test';
console.log(person);
delete person.age;
for (let prop in x) {
    console.log(prop + ' = ' + x[prop]);
}

const myObj = {
    name: "John",
    age: 30,
    cars: [
        { name: "Ford", models: ["Fiesta", "Focus", "Mustang"] },
        { name: "BMW", models: ["320", "X3", "X5"] },
        { name: "Fiat", models: ["500", "Panda"] }
    ],
    get getAge(){
        return this.age;
    }
}

myObj.test = function() {
    console.log('test');
};

myObj.test();
console.log(myObj.getAge);

var y = "";

myObj.cars.forEach(car => {
    y += "<h2>" + car.name + "</h2>";
    car.models.forEach(att => {
        y += att + "<br>";
    });
});

var demo = document.getElementById("demo");
demo.innerHTML = JSON.stringify(myObj, null, 2);
demo.innerHTML += "<br> " + y;

var str ='<p class="pgen">Lorem ipsum dolor sit amet.</p><p class="pgen">Sequi laboriosam ipsam architecto pariatur?</p><p class="pgen">Cumque dolore illum eligendi ratione.</p>'
var head = document.createElement("header");
head.innerHTML = str

document.body.appendChild(head);

Array.prototype.increment = function(x){
    for(let i=0; i<this.length;i++){
        this[i] += x;
    }
    return this;
};

const arr = [1,2,3,4,5];
arr.increment(5);
console.log(arr);

//#endregion
