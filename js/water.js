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

class Ground{
  constructor(height, width){
    this.h=height;
    this.w=width;
  }
  display(){
    push()
    stroke("black");
    strokeWeight(15);
    line(0,this.h, this.w, this.h);
    pop()
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
  let ground = new Ground(height,width);
  ground.display();
  
  push();
  stroke("black");
  strokeWeight(15);
  line(600,200, 200,500);
  pop();

  system.runDrops();
  

  waterParticles();
}

function waterParticles(){
  if (mouseIsPressed === true) {
      system.addNewDrop(new Droplet(random(mouseX - 20, mouseX + 20), random(mouseY - 20, mouseY + 20)) ); 
    
  }

}