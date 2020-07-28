class WaterParticle {
    // creates droplet
    constructor(xval, yval) {
        // creates x,y, and diameter properties of droplet
        // also creates speed property of how fast the droplets move back and forth 
        this.x = xval;
        this.y = yval;
        /*if (this.y < height) {
            this.y = this.y + 5;
        } */

        this.yvel = 0.1;
        this.xvel = 0;

        this.stopped = false;
    }

  fall() {
    let index =  (this.x + (this.y+1) *width)*4;
    if (get(this.x,(this.y+this.yvel))[0]==255) {
      //only falls if pixel below is empty/not white
      this.y += this.yvel;
      this.yvel*=1.05
    }
    if (get(this.x,(this.y+1))[0]==255){
      //only falls if pixel below is empty/not white
      this.y += 1;
    }
    else{
        this.move();
    }
  }
  atBottom(){
   if(this.y>height-25){
     return false;
   }
    return true;
  }
  
  move(){
      this.x += random(-1, 1) ;//moves droplet back and forth at random speed

  }
  

  display() {
    stroke(0,220,220);
    fill(0, 180,225);
    circle(this.x, this.y, 2);
  }
  
}
