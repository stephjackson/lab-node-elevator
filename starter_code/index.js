const Elevator = require('./elevator.js');
const Person = require('./person.js');

var elevator = new Elevator();
var julia = new Person("Julia", 4, 7);
var robert = new Person("Robert", 10, 1);
var stephen = new Person("Stephen", 1, 7);
var elon = new Person("Elon", 9, 4);
elevator.start();

elevator.call(julia);
setTimeout(() => elevator.call(elon), 10000);
setTimeout(() => elevator.call(robert), 15000);
setTimeout(() => elevator.call(stephen), 20000);