class ParticleManager {
    constructor() {
        this.particles = [];
        this.waterparticles = [];
        // 1 for sand, 2 for water
        this.material = 1;
        this.rectangles = [new Rectangle(200, 50, 200, 5, 1/4),
                           new Rectangle(400, 300, 200, 5, -1/4)];
    }

    addNewParticle(x, y) {
        let obj;

        if(this.material == 1) obj = new SandParticle(random(x - 10, x + 10), random(y - 10, y + 10));
        else if (this.material == 2){ obj = new WaterParticle(random(x - 10, x + 10), random(y - 10, y + 10));
        this.waterparticles.push(obj);}

        this.particles.push(obj);
    }

    simulate() {
      this.collisionCheck();
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].run();
            this.particles[i].display();
        }
    }

    differentMaterial(check) {
        this.material = check;
    }

    collisionCheck(){
    for(let i=0;i<this.waterparticles.length;i++){ //goes through array of droplets
      if(this.waterparticles[i].atBottom() ){ 
      let angle=0.0;
      while(angle<360){
        let colx = 1*cos(angle) + this.waterparticles[i].x;
        let coly = 1*sin(angle) + this.waterparticles[i].y; //checks the points along the circumference of the droplet to see if there is another object
        let bounces = false;
        if(get(colx,coly)[0]!=255 && get(colx,coly)[1]!=255 && get(colx,coly)[2]!=255 ){
        for(let j=0;j<this.length;j++){
            //checks to see if the droplet is colliding with another droplet  
            if(j!=i && colx!=this.waterparticles[i].x){
              bounces = true;
            }
            if(j!=i && coly==this.waterparticles[i].y){
              bounces = true;
          }
        }
      }
        if(bounces){ //if the droplet is colliding with another object adds the difference to its x and y
          this.waterparticles[i].x += this.waterparticles[i].x - colx;
          this.waterparticles[i].y += this.waterparticles[i].y - coly;
        }
        angle+=90.0;
        //goes through the circumference at 30 degree intervals to prevent lagging 
      }
    }
    }
    
  }

    collided(x, y) {
        for (var i = 0; i < this.rectangles.length; i++) {
            if (this.rectangles[i].rot > 0) {
                if (this.rectangles[i].rightcontains(x, y)) {
                    return 1;
                }
            } else if (this.rectangles[i].rot < 0) {
                if (this.rectangles[i].leftcontains(x, y)) {
                    return 2;
                }
            }
        }
        return 0;
    }

    drawRectangles() {
        this.rectangles.forEach((r) => {
            push();
            translate(r.x, r.y);
            rotate(r.rot)
            stroke(0);
            fill(0);

            rect(0, 0, r.w, r.h);
            pop();
        });
    }
}
