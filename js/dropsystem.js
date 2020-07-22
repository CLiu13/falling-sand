class ParticleManager {
    constructor() {
        this.particles = [];
        this.material = 1;          // 1 for sand, 2 for water
        this.rectangles = [new Rectangle(200, 50, 200, 5, 1/4),
                           new Rectangle(400, 300, 200, 5, -1/4)];
    }

    addNewParticle(x, y) {
        let obj;
        
        if(this.material == 1) obj = new SandParticle(x, y);
        else if (this.material == 2) obj = new WaterParticle(random(mouseX - 20, mouseX + 20), random(mouseY - 20, mouseY + 20));
        
        this.particles.push(obj);
    }

    collisionCheck() {
        for (let i = 0; i < this.particles.length; i++) {
            if (this.particles[i].y < height - 17) {
                let angle = 0.0;
                while (angle < 360) {
                    let colx = 1 * cos(angle) + this.particles[i].x;
                    let coly = 1 * sin(angle) + this.particles[i].y;
                    let bounces = false;
                    if (get(colx, coly)[0] != 255 && get(colx, coly)[1] != 255 && get(colx, coly)[2] != 255) {
                        if (get(colx, coly)[0] != 0 && get(colx, coly)[1] != 180 && get(colx, coly)[2] != 225) {
                            bounces = true;
                        }
                    }
                    if (bounces) {
                        this.particles[i].x += this.particles[i].x - colx;
                        this.particles[i].y += this.particles[i].y - coly;
                    }
                    angle += 30.0;
                }
            }
        }
    }

    simulate() {
        this.collisionCheck();
        this.particles.forEach((p)=>{
            p.run();
        });
    }
    
    differentMaterial(check) {
        this.material = check;
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
    
    drawRectangles(){
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