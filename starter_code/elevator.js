class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];
    this.waitingList = [];
    this.passengers = [];
    this.direction  = '';
    this.intervalId;
  }

  start() { 
    this.intervalId = setInterval(() => { this.update() }, 1000);
  }

  stop() { 
    clearInterval(this.intervalId);
  }

  update() {
    if (this.requests.length === 0) {
        console.log("No one is waiting!");
        return;
    } else {
      if (this.requests[0] < this.floor) {
        this.floorDown();
      } else if (this.requests[0] > this.floor) {
        this.floorUp();
      } else if (this.requests[0] === this.floor) {
        this.requests.splice(0, 1);
      } else {
        console.log("There's an issue in update!");
      }
      this.log();
    }
  }

  _passengersEnter() {
    this.waitingList.forEach((person, i) => {
      if (person.originFloor === this.floor) {
        this.passengers.push(person);
        this.requests.push(person.destinationFloor);
        console.log(`${person.name} has entered the elevator on floor ${this.floor}`);
      }
    });
    this.waitingList = this.waitingList.filter((person) => {
      return person.originFloor !== this.floor;
    });
  }

  _passengersLeave() {
    this.passengers.forEach((person) => {
      if (person.destinationFloor === this.floor) {
        console.log(`${person.name} has exited the elevator on floor ${this.floor}`);
      }
    });
    this.requests = this.requests.filter((request) => {
      return request !== this.floor;
    });
    this.passengers = this.passengers.filter((person) => {
      return person.destinationFloor !== this.floor;
    });
  }

  floorUp() { 
    if (this.floor < this.MAXFLOOR) {
      this.floor += 1;
      this.direction = "Up";
      this._passengersEnter();
      this._passengersLeave();
    } else {
      this.direction = "Not moving"
      console.log("You're on the highest floor!");
    }
  }

  floorDown() { 
    if (this.floor > 0) {
      this.floor -= 1;
      this.direction = "Down";
      this._passengersEnter();
      this._passengersLeave();
    } else {
      this.direction = "Not moving"
      console.log("You're on the ground floor!"); 
    }
  }

  call(person) { 
    this.waitingList.push(person);
    this.requests.push(person.originFloor);
  }

  log() {
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);
  }
}

module.exports = Elevator;
