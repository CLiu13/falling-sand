class Rectangle {
    constructor(x, y, w, h, r) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.rot = Math.PI * r;

        this.endx = Math.cos(this.rot) * this.w + this.x;
        this.endy = Math.sin(this.rot) * this.w + this.y;

        this.slope = -(this.endy - this.y) / (this.endx - this.x);
    }

    incrementCoords(dx, dy){
        this.x += dx;
        this.y += dy;

        this.endx += dx;
        this.endy += dy;
    }
    
    contains(x, y){
        return this.leftcontains(x, y) || this.rightcontains(x, y);
    }

    rightcontains(x, y) {
        return this.x <= x && x <= this.endx &&
            this.y <= y && this.y - y < this.slope * (x - this.x) + 10 &&
            this.y - y > this.slope * (x - this.x) - 15;
    }

    leftcontains(x, y) {
        return this.x <= x && x <= this.endx &&
            this.y >= y && this.endy <= y &&
            -(y - this.y) <= this.slope * (x - this.x) + 15 &&
            -(y - this.y) >= this.slope * (x - this.x) - 20;
    }
}

function setup() {
    selector = document.getElementById("particle-canvas");
    let canvas = createCanvas(selector.clientWidth, selector.offsetHeight + 100);

    canvas.parent("particle-canvas");

    system = new ParticleManager(
        [
            new Rectangle(random(200, width-200), random(200, height-200), 200, 10, 1 / 4),
            new Rectangle(random(200, width-200), random(200, height-200), 200, 10, -1 / 4)
        ]
    );
}

function windowResized() {
    selector = document.getElementById("particle-canvas");
    canvas = createCanvas(selector.clientWidth, selector.offsetHeight);
    line(0, selector.clientHeight - 5, selector.clientWidth, selector.clientHeight - 5);
    canvas.parent("particle-canvas");
}

let dragging = false;
let dragnum = -1;
let mousePrevX = 0;
let mousePrevY = 0;

function draw() {
    background('white');

    // creates bottom 'floor' of structure
    push();
    stroke("black");
    strokeWeight(15);
    line(0, selector.clientHeight - 5, selector.clientWidth + 20, selector.clientHeight - 5);
    pop();

    system.drawRectangles();

    if (mouseIsPressed) {
        if (mouseX > 0 && mouseX < selector.clientWidth && mouseY > 0 && mouseY < selector.clientHeight) {
            for (let i = 0; i < system.rectangles.length && !dragging; i++) {
                if (system.rectangles[i].contains(mouseX, mouseY)) {
                    dragging = true;
                    dragnum = i;
                    mousePrevX = mouseX;
                    mousePrevY = mouseY;
                }
            }

            if (!dragging) {
                system.addNewParticle(mouseX, mouseY);
            } else {
                system.rectangles[dragnum].incrementCoords(mouseX - mousePrevX, mouseY - mousePrevY);
                mousePrevX = mouseX;
                mousePrevY = mouseY;
            }
        }
    } else {
        dragging = false;
    }

    system.simulate();

    if (system.material == 3) {
        push();
        stroke(0, 0, 0);
        fill(255, 255, 255, 0);
        circle(mouseX, mouseY, 20);
        pop();
    }
}
