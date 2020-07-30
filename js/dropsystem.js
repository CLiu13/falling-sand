class ParticleManager {
    constructor() {
        this.particles = [];
        
        this.board = new Array(height);
        
        for(var i = 0; i < height; i++) {
            this.board[i] = new Array(width);
        }

        // 1 for sand, 2 for water
        this.material = 1;
        this.rectangles = [new Rectangle(200, 50, 200, 5, 1 / 4),
            new Rectangle(400, 300, 200, 5, -1 / 4)
        ];
    }

    addNewParticle(x, y) {
        let obj;

        let xcoord = round(random(max(2, x - 10), min(width-11, x + 10)));
        let ycoord = round(random(max(2, y - 10), min(height-11, y + 10)));

        if (this.material == 1) {
            obj = new SandParticle(xcoord, ycoord);

        } else if (this.material == 2) {
            obj = new WaterParticle(xcoord, ycoord);

        } else if (this.material == 3) {
            this.erase(x,y);

            return;
        }

        for (let i = -2; i <= 2; i++) {
            for (let j = -2; j <= 2; j++) {
                system.board[ycoord+i][xcoord+j] = obj;
            }
        }

        this.particles.push(obj);
    }

    simulate() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].fall();
            this.particles[i].display();
        }
    }

    differentMaterial(check) {
        this.material = check;
    }

    getPixelIndex(x, y) {
        return round((x + y * width) * 4);
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

    erase(x,y){
        x = round(x);
        y = round(y);

        for(let i = 0; i < this.particles.length; i++) {
            let particle = this.particles[i];
            let dist = Math.sqrt((particle.x - x) ** 2 + (particle.y - y) ** 2);      

            // the circle around the cursor has diameter 20 (so radius 10)
            if (dist <= 10) {
                this.particles[i].set(undefined);
                this.particles.splice(i,1);
            }
        }
    }
}
