//class for individual sand particles
class SandParticle {
    constructor(xval, yval) {
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

        if (collisionCode == 1) { // bounce to the right
            this.y += this.yvel;

            if (this.xvel <= 0) {
                this.xvel = this.yvel;
            }

            this.x += this.xvel;

        } else if (collisionCode == 2) { // bounce to the left
            this.y += this.yvel;
            
            
            if(this.xvel >= 0){
                this.xvel = -this.yvel;
            }
            
            this.x += this.xvel;

        }

        else if (this.y < height-20 && this.y + this.yvel < height-20) {
            
            this.yvel *= 1.05;
            
            this.y += this.yvel;

            this.x += this.xvel;
            
        } else {
            
            if(get(this.x, this.y+1)[0] != 255){
                // once we figure out a better way of not calculating stopped particles we should check for bottom left and bottom right pixels to be filled in before stopping a pixel but get() is really slow
                // && get(this.x-1, this.y+1)[0] != 255 && get(this.x+1, this.y+1)[0] != 255){
                
                // this would be the place to handle objects that are already on the ground
                this.stopped = true;
                return;
            }
            
            this.y +=1;
        }
    }

    display() {
        push()
        stroke(194, 178, 127); // sand color
        circle(this.x, this.y, 2);
        pop();
    }
}