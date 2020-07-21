//class for individual water droplets
class Droplet {
  //creates droplet
  constructor(xval, yval) {
    //creates x,y, and diameter properties of droplet
    //also creates speed property of how fast the droplets move back and forth 
    this.x = xval;
    this.y = yval;
    this.diameter = 2;
    this.speed = 1;
  }

  run() {
    this.fall();
    this.display();
  }

  fall() {
    if (get(this.x,this.y+1)[0]==255 && get(this.x,this.y+1)[1]==255 && get(this.x,this.y+1)[2]==255) {
      //only falls if pixel below is empty/not white
      this.y += 2;
    }
    else{
        this.move();
    }
  }
  atBottom(){
   if(this.y>height-16){
     return false;
   }
    return true;
  }
  
  move(){
      this.x += random(-this.speed, this.speed);//moves droplet back and forth at random speed

  }
  

  display() {
    stroke(0,220,220);
    fill(0, 180,225);
    circle(this.x, this.y, this.diameter);
  }
  

}

//class for group of water particles
class DropSystem{
  constructor(){
    this.dropsystem = [];
    this.length =0;
  }
  
  addNewDrop(drop){
    this.dropsystem[this.length] = drop;
    this.length++;
  }
  
  checkDrops(x,y){
    for(let i=0;i<this.length;i++){
      if(x===this.dropsystem[this.length].x && y===this.dropsystem[this.length].y){
      return true;
      }
    }
    return false;
  }
  
  collisionCheck(){
    for(let i=0;i<this.length;i++){ //goes through array of droplets
      if(this.dropsystem[i].atBottom() ){ 
      let angle=0.0;
      while(angle<360){
        let colx = 1*cos(angle) + this.dropsystem[i].x;
        let coly = 1*sin(angle) + this.dropsystem[i].y; //checks the points along the circumference of the droplet to see if there is another object
        let bounces = false;
        if(get(colx,coly)[0]!=255 && get(colx,coly)[1]!=255 && get(colx,coly)[2]!=255 ){
        for(let j=0;j<this.length;j++){
            //checks to see if the droplet is colliding with another droplet  
            if(j!=i && colx!=this.dropsystem[i].x){
              bounces = true;
            }
            if(j!=i && coly==this.dropsystem[i].y){
              bounces = true;
          }
        }
      }
        if(bounces){ //if the droplet is colliding with another object adds the difference to its x and y
          this.dropsystem[i].x += this.dropsystem[i].x - colx;
          this.dropsystem[i].y += this.dropsystem[i].y - coly;
        }
        angle+=30.0;
        //goes through the circumference at 30 degree intervals to prevent lagging 
      }
    }
    }
    
  }
  
  runDrops(){
    this.collisionCheck();
    for (let j = 0; j < this.length; j++) {
      this.dropsystem[j].run();
    }
  }
}
//class for individual sand particles
class SandParticle {
  //creates particle
  constructor(xval, yval) {
    //creates x,y, and diameter properties of particle
    this.x = xval;
    this.y = yval;
    if (this.y < height) {
      this.y = this.y + 5;
    }
    
    this.yvel = 0.3;
    this.xvel = 0;
  }

  run() {
    this.fall();
    this.display();
  }

  fall() {
    let collisionCode = collided(this.x, this.y);
    
    // these are hardcoded to be only for rotations of pi/4 rad but that can be changed later
    
    if(collisionCode == 1){            // bounce to the right
      
      this.yvel /= 2;
      
      if(this.xvel < 0){
        this.xvel = 0;
      }
      
      this.xvel = this.xvel + this.yvel/2;
      
    } else if(collisionCode == 2){     // bounce to the left
      
      this.yvel /= 2;
      
      if(this.xvel > 0){
        this.xvel = 0;
      }
      
      this.xvel = this.xvel - this.yvel/2;
      
    }
    
    if (this.y < height-14 && this.y + this.yvel < height-14) {
      this.yvel = this.yvel*1.05
      this.y += this.yvel;
      
      this.x += this.xvel;
    } else {
      this.y = height-14;
    }
    
    this.display();
  }

  display() {
    stroke(194, 178, 127);  // sand color
    circle(this.x, this.y, 2);
  }
}

//class for rectangle
class Rectangle {
  constructor(x, y, w, h, r){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.rot = Math.PI * r;
    
    this.endx = Math.cos(this.rot)*this.w + this.x;
    this.endy = Math.sin(this.rot)*this.w + this.y;
    
    this.slope = -(this.endy - this.y)/(this.endx - this.x);
  }
  
  rightcontains(x, y){
    return this.x <= x && x <= this.endx &&
      this.y <= y && this.y - y < this.slope * (x - this.x)+6 &&
      this.y - y > this.slope * (x - this.x) - 10;
  }
  
  leftcontains(x, y){
    return this.x <= x && x <= this.endx &&
      this.y >= y && this.endy <= y &&
      -(y-this.y) <= this.slope * (x-this.x)+6 &&
      -(y-this.y) >= this.slope * (x-this.x)-10;
  }
}


function setup() {
  selector = document.getElementById("particle-canvas");
  canvas = createCanvas(selector.clientWidth, selector.offsetHeight+100);
  
  canvas.parent("particle-canvas");
}

function windowResized(){
  selector = document.getElementById("particle-canvas");
  canvas = createCanvas(selector.clientWidth, selector.offsetHeight);
  canvas.parent("particle-canvas");
}

let sand = [];
let rectangles = [new Rectangle(200, 50, 200, 5, 1/4),
                 new Rectangle(400, 300, 200, 5, -1/4)];

let i = 0;
let system = new DropSystem();
let material =1;

function draw() {
  background('white');
  //creates bottom 'floor' of structure
  push();
  stroke("black");
  strokeWeight(15);
  line(0,selector.clientHeight-5, selector.clientWidth, selector.clientHeight-5);
  pop();
  
  rectangles.forEach((r)=>{
    push();
    translate(r.x, r.y);
    rotate(r.rot)
    stroke(0);
    fill(0);

    rect(0,0, r.w, r.h);

    pop();
  });
  
  //changes drops position and displays 
  for (let j = 0; j < i; j++) {
    sand[j].run();
  }
  system.runDrops();

  if(mouseIsPressed){
    if(material===1){
      sand[i] = new SandParticle(mouseX, mouseY);
      i++;
    }
    if(material===2){
      system.addNewDrop(new Droplet(random(mouseX - 20, mouseX + 20), random(mouseY - 20, mouseY + 20)) );
    }

  }

  


}

function differentMaterial(check){
  if(check===1){
    material=1;
  }
  if(check===2){
    material=2;
  }

}


function collided(x, y){
  for(var i = 0; i < rectangles.length; i++){
    if(rectangles[i].rot > 0){
      if(rectangles[i].rightcontains(x, y)){
        return 1;
      }
    }
    else if(rectangles[i].rot < 0){
      if(rectangles[i].leftcontains(x, y)){
        return 2;
      }
    }
  }
  
  return 0;
}

