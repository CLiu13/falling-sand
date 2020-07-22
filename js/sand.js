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
    }

    run() {
        this.fall();
        this.display();
    }

    fall() {
        let collisionCode = system.collided(this.x, this.y);

        // these are hardcoded to be only for rotations of pi/4 rad but that can be changed later

        if (collisionCode == 1) { // bounce to the right

            this.yvel /= 2;

            if (this.xvel < 0) {
                this.xvel = 0;
            }

            this.xvel = this.xvel + this.yvel / 2;

        } else if (collisionCode == 2) { // bounce to the left

            this.yvel /= 2;

            if (this.xvel > 0) {
                this.xvel = 0;
            }

            this.xvel = this.xvel - this.yvel / 2;

        }

        if (this.y < height-10 && this.y + this.yvel < height-10) {
            this.yvel = this.yvel * 1.05
            this.y += this.yvel;

            this.x += this.xvel;
        } else {
            this.y = height - 10;
        }

        this.display();
    }

    display() {
        stroke(194, 178, 127); // sand color
        circle(this.x, this.y, 2);
    }
}