class ParticleManager {
    constructor() {
        this.particles = [];
        // 1 for sand, 2 for water
        this.material = 1;
        this.rectangles = [new Rectangle(200, 50, 200, 5, 1 / 4),
            new Rectangle(400, 300, 200, 5, -1 / 4)
        ];
    }

    addNewParticle(x, y) {
        let obj;

        if (this.material == 1) {
            obj = new SandParticle(random(x - 10, x + 10), random(y - 10, y + 10));
        } else if (this.material == 2) {
            obj = new WaterParticle(random(x - 10, x + 10), random(y - 10, y + 10));
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
}