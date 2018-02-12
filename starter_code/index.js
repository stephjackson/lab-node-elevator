const Elevator = require('./elevator.js');
const Person = require('./person.js');

var elevator = new Elevator();
var julia = new Person("Julia", 4, 7);
elevator.call(julia);
var robert = new Person("Robert", 10, 1);
elevator.call(robert);
var stephen = new Person("Stephen", 1, 7);
elevator.call(stephen);
var elon = new Person("Elon", 10, 0);
elevator.call(elon);
elevator.start();