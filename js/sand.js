//class for individual sand particles
class SandParticle {
    constructor(xval, yval) {
        this.x = xval;
        this.y = yval;
       
        this.yvel = 0.3;
        this.xvel = 0;

        this.stoppedStrikes = 0;
    }

    fall() {
        if (this.stoppedStrikes > 20) return;

        let collisionCode = system.collided(this.x, this.y);

        // these are hardcoded to be only for rotations of pi/4 rad but that can be changed later
        if (collisionCode == 1) {
            // bounce right
            this.y += this.yvel;

            if (this.xvel <= 0) {
                this.xvel = this.yvel;
            }

            this.x += this.xvel;

        } else if (collisionCode == 2) {
            // bounce left
            this.y += this.yvel;

            if (this.xvel >= 0) {
                this.xvel = -this.yvel;
            }

            this.x += this.xvel;

        } else {
            let below = get(this.x, this.y + 2);
            let left = get(this.x - 2, this.y + 2);
            let right = get(this.x + 2, this.y + 2);

            if (below[0] != 255 && left[0] != 255 && right[0] != 255) {
                // allow for the edge cases to be handled by adding a strike system
                // it only stops if the particle cannot move for 20 frames in a row.
                this.stoppedStrikes++;

                return;
            } else if(below[0] != 255) {
                this.x += random(-1, 1);
            }

            this.stoppedStrikes = 0;

            this.yvel *= 1.05;

            this.y += this.yvel;
            this.x += this.xvel;

            if (this.y > height - 8) {
                this.y = height - 8;
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
