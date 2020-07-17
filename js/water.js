class Droplet {
  //creates droplet
  constructor(xval, yval) {
    //creates x,y, and diameter properties of droplet
    this.x = xval;
    this.y = yval;
    this.diameter = 1;
    this.speed = 1
  }

  run() {
    this.fall();
    this.display();
  }

  fall() {


    if (this.y < height-16 ) {

      this.y += 2;


    }
    else{
        this.y -=1;

    }
    this.move();

  }
  move(){
    this.x += random(-this.speed, this.speed);
  }

  display() {
    stroke(0,150,220);
    circle(this.x, this.y, this.diameter);
  }
  getY(){
    return(this.y);
  }

}


//creates system of droplets

class DropSystem{
  constructor(){
    this.dropsystem = [];
    this.length =0;
  }

  addNewDrop(drop){
    this.dropsystem[this.length] = drop;
    this.length++;
  }

  runDrops(){
    for (let j = 0; j < this.length; j++) {
      this.dropsystem[j].run();
    }
  }
  checkOverlap(){
   /* let t=this.length;
    let i=0;
    while(t>-1){
      if(this.dropsystem[t].y === this.dropsystem[i].y){
        print("overlap");
      }
      t--;
      } */
    }


}

let system = new DropSystem();

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background('white');
  //creates new background on every draw to create falling

  //creates bottom 'floor' of structure
  push()
  stroke("green");
  strokeWeight(15);
  line(0,height, width, height);
  pop()

  system.runDrops();

  if(system.length>1){
    system.checkOverlap();
  }



  //when the mouse is pressed is calls the function to create a droplet
  if (mouseIsPressed === true) {
      system.addNewDrop(new Droplet(random(mouseX - 20, mouseX + 20), random(mouseY - 20, mouseY + 20)) ); //droplet is created anywhere 20 pixels around the circle
    //changes drops position and displays

  }




}
