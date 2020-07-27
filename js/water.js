class WaterParticle {
    // creates droplet
    constructor(xval, yval) {
        // creates x,y, and diameter properties of droplet
        // also creates speed property of how fast the droplets move back and forth 
        this.x = xval;
        this.y = yval;
        if (this.y < height) {
            this.y = this.y + 5;
        }

        this.yvel = 0.3;
        this.xvel = 0;

        this.stopped = false;
    }

    run() {
        this.fall();
        this.display();
    }

    fall() {
        if(this.stopped) return;

        let collisionCode = system.collided(this.x, this.y);

        // these are hardcoded to be only for rotations of pi/4 rad but that can be changed later
        // sand is so light it doesn't really bounce so don't need many hard calculations

        // bounce to the right
        if (collisionCode == 1) {
            this.y += this.yvel;

            if (this.xvel <= 0) {
                this.xvel = this.yvel;
            }

            this.x += this.xvel;

        // bounce to the left
        } else if (collisionCode == 2) {
            this.y += this.yvel;

            if (this.xvel >= 0) {
                this.xvel = -this.yvel;
            }

            this.x += this.xvel;
        }

        else if (this.y < height-10 && this.y + this.yvel < height-10) {
            this.yvel *= 1.05;

            this.y += this.yvel;
            this.x += this.xvel;

        } else {
            if (get(this.x, this.y)[0] != 255) {
                this.x += random(-2, 2);

                this.stopped = true;
            }

            this.y = height - 8;
        }
    }

    display() {
        push();
        stroke(0, 220, 220);
        fill(0, 180, 225);
        circle(this.x, this.y, 2);
        pop();
    }
}
