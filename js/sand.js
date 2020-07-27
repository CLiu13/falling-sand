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

        this.stoppedStrikes  = 0;
    }

    run() {
        this.fall();
    }

    fall() {
        if(this.stoppedStrikes > 20) return;
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

            if(this.xvel >= 0){
                this.xvel = -this.yvel;
            }

            this.x += this.xvel;

        } else {
            let below = get(this.x, this.y+2);
            let left = get(this.x-2, this.y+2);
            let right = get(this.x+2, this.y+2);

            if (below[0] != 255 && left[0] != 255 && right[0] != 255) {
                // allow for the edge cases to be handled by adding a strike system
                // it only stops if the particle cannot move for 20 frames in a row.
                this.stoppedStrikes++;
                return;
            }

            this.stoppedStrikes = 0;

            this.yvel *= 1.05;

            this.y += this.yvel;
            this.x += this.xvel;

            if (this.y > height-8) {
                this.y = height-8;
            }
        }
    }

    display() {
        push()
        // sand color
        stroke(194, 178, 127);
        // fill circle
        fill(194, 178, 127);
        circle(this.x, this.y, 2);
        pop();
    }
}

this.partiallyStopped = false;
