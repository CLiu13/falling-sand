//class for individual sand particles
class SandParticle {
    constructor(xval, yval) {
        this.x = xval;
        this.y = yval;

        this.stoppedStrikes = 0;
    }

    fall() {
        if (this.stoppedStrikes > 30) {
            if (this.y > height - 12) {
                return;
            }

            if (system.board[this.y + 5][this.x] == undefined) {
                this.stoppedStrikes = 0;

            } else if (system.board[this.y + 5][this.x + 5] == undefined) {
                this.x += 5;
                this.stoppedStrikes = 0;

            } else if (system.board[this.y + 5][this.x - 5] == undefined) {
                this.x -= 5;
                this.stoppedStrikes = 0;

            } else {
                return;
            }
        }

        let collisionCode = system.collided(this.x, this.y);

        // these are hardcoded to be only for rotations of pi/4 rad but that can be changed later
        if (collisionCode == 1) {
            // bounce right

            let below = system.board[this.y + 5][this.x];
            let right = system.board[this.y + 5][this.x + 5];

            if (below != undefined || right != undefined) {
                return;
            }

            this.set(undefined);

            if (below == undefined) {
                this.y += 5;
            }

            if (right == undefined) {
                this.x += 5;
            }

        } else if (collisionCode == 2) {
            // bounce left

            let below = system.board[this.y + 5][this.x];
            let left = system.board[this.y + 5][this.x - 5];

            if (below != undefined || left != undefined) {
                return;
            }

            this.set(undefined);

            if (below == undefined) {
                this.y += 5;
            }

            if (left == undefined) {
                this.x -= 5;
            }

        } else if (collisionCode == 3) {
            this.set(this);
            return;

        } else {
            let below = system.board[this.y + 5][this.x];
            let left = system.board[this.y + 5][this.x - 5];
            let right = system.board[this.y + 5][this.x + 5];

            if (below != undefined && left != undefined && right != undefined) {
                // allow for the edge cases to be handled by adding a strike system
                // it only stops if the particle cannot move for x frames in a row.
                this.stoppedStrikes++;

                return;

            }

            this.set(undefined);

            if (below != undefined) {
                if (left == undefined) {
                    this.x -= 5;
                } else if (right == undefined) {
                    this.x += 5;
                }
            }

            this.stoppedStrikes = 0;

            this.y += 5;
        }

        if (this.y >= height - 12) {
            this.y = height - 12;
            this.stoppedStrikes++;
        }

        this.set(this);
    }

    set(dat) {
        for (let i = -2; i <= 2; i++) {
            for (let j = -2; j <= 2; j++) {
                system.board[this.y + i][this.x + j] = dat;
            }
        }
    }

    display() {
        push()
        // sand color
        stroke(194, 178, 127);
        fill(194, 178, 127);
        square(this.x, this.y, 5);
        pop();
    }
}
