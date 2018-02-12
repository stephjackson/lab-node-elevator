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
    var that = this;
    this.intervalId = setInterval(function(){ that.update(); }, 1000);
  }
  stop() { 
    clearInterval(this.intervalId);
  }
  update() {
    this.log();
    if (this.requests.length === 0) {
      if (this.waitingList.length === 0) {
        console.log("No one is waiting!");
        this.stop();
        while (this.floor > 0) {
          this.floorDown();
          }
        } else {
          this.requests.push(waitingList[0].originFloor);
      }
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
    }
  }
  _passengersEnter() { 
    var that = this;
    this.waitingList.forEach(function(person, i){
      if (person.originFloor === that.floor) {
        that.passengers.push(person);
        that.waitingList.splice(i, 1);
        that.requests.push(person.destinationFloor);
        console.log(person.name + " has entered the elevator");
      }
    });
  }
  _passengersLeave() {
    var that = this;
    this.passengers.forEach(function(person, i) {
      if (person.destinationFloor === that.floor) {
        that.passengers.splice(i, 1);
        console.log(person.name + " has left the elevator");
      }
      that.requests.forEach(function(request, i) {
        if (request === that.floor) {
          that.requests.splice(i, 1);
        }
      });
    })
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
    console.log("Direction: " + this.direction + " | Floor: " + this.floor);
  }
}

module.exports = Elevator;
