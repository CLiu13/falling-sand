class WaterParticle {
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
        if (get(this.x, this.y + 1)[0] == 255 && get(this.x, this.y + 1)[1] == 255 && get(this.x, this.y + 1)[2] == 255) {
            //only falls if pixel below is empty/not white
            this.y += 1;
        } else {
            this.move();
        }
    }
    
    move() {
        this.x += random(-this.speed, this.speed); //moves droplet back and forth at random speed

    }
    
    display() {
        stroke(0, 220, 220);
        fill(0, 180, 225);
        circle(this.x, this.y, this.diameter);
    }
    
}