class Droplet {
  //creates droplet
  constructor(xval, yval) {
    //creates x,y, and diameter properties of droplet
    //also creates speed property of how fast the droplets move back and forth 
    this.x = xval;
    this.y = yval;
    this.diameter = 2;
    this.speed = 2;
  }

  run() {
    this.fall();
    this.display();
  }

  fall() {
    if (get(this.x,this.y+1)[0]==255 && get(this.x,this.y+1)[1]==255 && get(this.x,this.y+1)[2]==255) {
      //only falls if pixel below is empty/not white
      this.y += 1;
    }
    else{
        this.move();
    }
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
    for(let i=0;i<this.length;i++){
      if(this.dropsystem[i].y<height-17){
      let angle=0.0;
      while(angle<360){
        let colx = 1*cos(angle) + this.dropsystem[i].x;
        let coly = 1*sin(angle) + this.dropsystem[i].y;
        let bounces = false;
        if(get(colx,coly)[0]!=255 && get(colx,coly)[1]!=255 && get(colx,coly)[2]!=255  ){
            if(get(colx,coly)[0]!=0 && get(colx,coly)[1]!=180 && get(colx,coly)[2]!=225){
              bounces = true;
            }
      }
        if(bounces){
          this.dropsystem[i].x += this.dropsystem[i].x - colx;
          this.dropsystem[i].y += this.dropsystem[i].y - coly;
        }
        angle+=30.0;
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
  material=check;
}
