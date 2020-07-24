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

    rightcontains(x, y) {
        return this.x <= x && x <= this.endx &&
            this.y <= y && this.y - y < this.slope * (x - this.x) + 6 &&
            this.y - y > this.slope * (x - this.x) - 10;
    }

    leftcontains(x, y) {
        return this.x <= x && x <= this.endx &&
            this.y >= y && this.endy <= y &&
            -(y - this.y) <= this.slope * (x - this.x) + 6 &&
            -(y - this.y) >= this.slope * (x - this.x) - 10;
    }
}


function setup() {
    selector = document.getElementById("particle-canvas");
    let canvas = createCanvas(selector.clientWidth, selector.offsetHeight + 100);

    canvas.parent("particle-canvas");
    
    system = new ParticleManager();
}

function windowResized() {
    selector = document.getElementById("particle-canvas");
    canvas = createCanvas(selector.clientWidth, selector.offsetHeight);
    line(0, selector.clientHeight - 5, selector.clientWidth, selector.clientHeight - 5);
    canvas.parent("particle-canvas");
}


function draw() {
    background('white');
    //creates bottom 'floor' of structure
    push();
    stroke("black");
    strokeWeight(15);
    line(0, selector.clientHeight - 5, selector.clientWidth+20, selector.clientHeight - 5);
    pop();
    
    
    system.drawRectangles();

    if (mouseIsPressed) {
            system.addNewParticle(mouseX, mouseY);
    }
    
    system.simulate();
}
