export type PolygonProps = {
    iteration: number,
    column: number,
    columnSize: number,
    player: boolean
}

export const PLAYER_HITBOX_SIZE = 10;
export const SQUARE_COUNT = 20;
export const SQUARE_X_MAX_DEVIATION = 50;
export const SQUARE_X_MIN_DEVIATION = 20;
export const SQUARE_Y_MAX_DEVIATION = 50;
export const SQUARE_Y_MIN_DEVIATION = 20;
export const SQUARE_ROTATE_MAX_DEVIATION = 50;
export const SQUARE_ROTATE_MIN_DEVIATION = 20;
export const SQUARE_MAX_SIZE = 30;
export const SQUARE_MIN_SIZE = 7;
export const SQUARE_X_VEL_MAX = 0.50;
export const SQUARE_X_VEL_MIN = 0.20;
export const SQUARE_Y_VEL_MAX = 0.40;
export const SQUARE_Y_VEL_MIN = 0.10;
export const SQUARE_ROTATE_VEL_MAX = 0.20;
export const SQUARE_ROTATE_VEL_MIN = 0.30;

export class Squares { 
    squares: Polygon[] = [];
    constructor(squares: Polygon[]) {
        this.squares = squares; 
    }

    getSquareById(id: string): Polygon | null {
        for (let i = 0; i < this.squares.length; i++) {
            if (this.squares[i].id == id) return this.squares[i];
        }
        return null;
    }
}

export class Polygon {
    angle = 0;
    top = 0;
    left = 0;
    size = 0;
    velocity: Velocity = {
        x: 0,
        y: 0,
        angle: 0
    };
    player = false;
    private max: MaxValues = {
        x: 0,
        y: 0,
        angle: 0
    };
    private direction: Direction = {
        x: "left",
        y: "up",
        angle: "clockwise"
    };
    private ogValues: Vec3 = {
        x: 0,
        y: 0,
        angle: 0
    }
    ogPoly: Vec2[] = [];
    trPoly: Vec2[] = [];
    mid: Vec2 = {
        x: 0,
        y: 0
    };
    id = "";
    constructor({
        iteration,
        column,
        columnSize,
        player
    }: PolygonProps) {
        this.player = player;
        const random = Math.random();
        this.size = player ? 10 : Math.floor(Math.random() * (SQUARE_MAX_SIZE - SQUARE_MIN_SIZE + 1)) + SQUARE_MIN_SIZE;
        if (iteration == 0) this.left = Math.floor(Math.random() * 51) + 50;
        else this.left = Math.floor(Math.random() * 51);
        const topMin = column * columnSize;
        const topMax = topMin + columnSize;
        this.top = Math.floor(Math.random() * (topMax - topMin + 1)) + topMin;
        this.angle = Math.floor(Math.random() * 91);
        this.velocity = {
            x: (Math.random() * (SQUARE_X_VEL_MAX - SQUARE_X_VEL_MIN + 1)) + SQUARE_X_VEL_MIN,
            y: (Math.random() * (SQUARE_Y_VEL_MAX - SQUARE_Y_VEL_MIN + 1)) + SQUARE_Y_VEL_MIN,
            angle: (Math.random() * (SQUARE_ROTATE_VEL_MAX - SQUARE_ROTATE_VEL_MIN + 1)) + SQUARE_ROTATE_VEL_MIN
        };
        this.max = {
            x: Math.round(Math.random() * (SQUARE_X_MAX_DEVIATION - SQUARE_X_MIN_DEVIATION + 1)) + SQUARE_X_MIN_DEVIATION,
            y: Math.round(Math.random() * (SQUARE_Y_MAX_DEVIATION - SQUARE_Y_MIN_DEVIATION + 1)) + SQUARE_Y_MIN_DEVIATION,
            angle: Math.round(Math.random() * (SQUARE_ROTATE_MAX_DEVIATION - SQUARE_ROTATE_MIN_DEVIATION + 1)) + SQUARE_ROTATE_MIN_DEVIATION
        }
        const [x, y] = [vwToPx(this.left), vwToPx(this.top)];
        this.mid = {x: x + (vwToPx(this.size) / 2), y: y + (vwToPx(this.size) / 2)};
        this.ogValues = {x: this.mid.x, y: this.mid.y, angle: this.angle};
        this.ogPoly.push({x, y});
        this.ogPoly.push({x: x + x, y});
        this.ogPoly.push({x: x + x, y: y + y});
        this.ogPoly.push({x, y: y + y});
        this.trPoly = [...this.ogPoly];
        this.rotateVertices();
        this.direction = {
            x: Math.round(Math.random()) == 1 ? "left" : "right",
            y: Math.round(Math.random()) == 1 ? "up" : "down",
            angle: Math.round(Math.random()) == 1 ? "clockwise" : "counterclockwise"
        }
        this.id = `square${iteration}`; 
    }
    
    rotateVertices() {
        const [cos, sin] = [Math.cos((Math.PI / 180) * this.angle), Math.sin((Math.PI / 180) * this.angle)];
        // const [cos, sin] = [Math.cos(this.angle), Math.sin(this.angle)];
        this.trPoly = this.ogPoly.map(vertex => {
            // Step 1: Translate to origin
            const tx = vertex.x - this.mid.x;
            const ty = vertex.y - this.mid.y;

            // Step 2: Rotate around origin
            const rx = tx * cos - ty * sin;
            const ry = tx * sin + ty * cos;
            
            // Step 3: Translate back to original position
            const newX = rx + this.mid.x;
            const newY = ry + this.mid.y; 
            // const newX = vertex.x * cos - vertex.y * sin;
            // const newY = vertex.y * cos + vertex.x * sin;
            return { x: newX, y: newY };
        });
    }

    changeXDirection() {
        if (this.direction.x == "left") {
            return this.direction.x = "right"
        }
        this.direction.x = "left";
    }
    
    changeYDirection() {
        if (this.direction.y == "up") {
            return this.direction.y = "down";
        }
        this.direction.y = "up";
    }

    changeAngleDirection() {
        if (this.direction.angle == "clockwise") {
            return this.direction.angle = "counterclockwise";
        }
        this.direction.angle = "clockwise";
    }

    move() {
        switch (this.direction.x) {
            case "left": 
                this.mid.x += this.velocity.x
                this.left += this.velocity.x
                break;
            case "right": 
                this.mid.x -= this.velocity.x
                this.left -= this.velocity.x
                break;
        }
        switch (this.direction.y) {
            case "up":
                this.mid.y -= this.velocity.y
                this.top -= this.velocity.y
                break;
            case "down":
                this.mid.y += this.velocity.y
                this.top += this.velocity.y
                break;
        }
        switch (this.direction.angle) {
            case "clockwise":
                this.angle += this.velocity.angle
                break;
            case "counterclockwise":
                this.angle -= this.velocity.angle
                break;
        }
        // virtual vertices
        this.ogPoly = [
            {x: this.left, y: this.top},
            {x: this.left * 2, y: this.top},
            {x: this.left * 2, y: this.top * 2},
            {x: this.left, y: this.top * 2}
        ]
        // calculate real veritces with angle
        this.rotateVertices();
    }

    playerMove(event: MouseEvent) {
        const x = (event.clientX * 100) / window.innerWidth;
        const y = (event.clientY * 100) / document.body.scrollHeight;

        this.mid.x = x;
        this.mid.y = y;
        const halfSize = (vwToPx(this.size) / 2);
        // virtual vertices
        this.trPoly = [
            {x: this.mid.x - halfSize, y: this.mid.y - halfSize},
            {x: this.mid.x + halfSize, y: this.mid.y - halfSize},
            {x: this.mid.x + halfSize, y: this.mid.y + halfSize},
            {x: this.mid.x - halfSize, y: this.mid.y + halfSize}
        ]
        // calculate real veritcies with angle
        this.rotateVertices();
    }

    update(element: HTMLElement, event = null) {
        if (event) {
            this.playerMove(event);
        }
        this.move();  
            
        // if the shape is out of bounds we don't need to check the maximum deviation because we are already changing directions
        if (!this.checkOutOfBounds() && !this.player) {
            // check if the polygon reached it's maximum deviation from original position
            if (Math.abs(this.mid.x - this.ogValues.x) > this.max.x) this.changeXDirection();
            if (Math.abs(this.mid.y - this.ogValues.y) > this.max.y) this.changeYDirection();
        }
        // need to check the angle deviation though because it's not checked in the checkOutOfBounds() method
        if (Math.abs(this.angle - this.ogValues.angle) > this.max.angle && !this.player) this.changeAngleDirection();

        if (element.style.top && element.style.left) {
            element.style.top = pxToVw(this.top) + "vw";
            element.style.left = pxToVw(this.left) + "vw";
            element.style.rotate = this.angle + "deg";
            element.style.transform = `translate(${this.left}px,${this.top}px)`;
        } 
    }

    /**
        * returns true if the shape is out of bounds. false if it's within bounds
    **/ 
    checkOutOfBounds(): boolean {
        for (let i = 0; i < this.trPoly.length; i++) {
            const vertex = this.trPoly[i];
            if (vertex.x >= document.body.clientWidth || vertex.x <= 0) { 
                console.log(vertex.x, document.body.clientWidth);
                this.changeXDirection();
                // console.log("out of bounds");
                return true;
            }
            if (vertex.y >= document.body.scrollHeight || vertex.y <= 0) {
                console.log(vertex.y, document.body.scrollHeight);
                this.changeYDirection(); 
                // console.log("out of bounds");
                return true;
            }
        }
        return false;
    }
}

export function vwToPx(vw: number): number {
    return vw * window.innerWidth / 100;
}

export function pxToVw(px: number): number {
    return px / window.innerWidth * 100;
}

export function dotProduct(v1: Vec2, v2: Vec2) : number{
    return v1.x * v2.x + v1.y * v2.y;
}

export function getEdges(vertices: Vec2[]) : Vec2[] {
    const edges = [];
    for (let i = 0; i < vertices.length; i++) {
        const v1 = vertices[i];
        const v2 = vertices[i + 1 === vertices.length ? 0 : i + 1];
        edges.push({ x: v2.x - v1.x, y: v2.y - v1.y });
    }
    return edges;
}

export function getPerpendicular(edge: Vec2) : Vec2 {
    return { x: -edge.y, y: edge.x };
}

export function project(vertices: Vec2[], axis: Vec2): Projection {
    const projections = vertices.map(vertex => dotProduct(vertex, axis));
    return {
        min: Math.min(...projections),
        max: Math.max(...projections),
    };
}

export function checkOverlap(proj1: Projection, proj2: Projection): boolean {
    return proj1.min <= proj2.max && proj1.max >= proj2.min;
}

export function checkCollisionSAT(vertices1: Vec2[], vertices2: Vec2[]): boolean {
    const edges1 = getEdges(vertices1);
    const edges2 = getEdges(vertices2);

    for (const edge of [...edges1, ...edges2]) {
        const axis = getPerpendicular(edge);
        const proj1 = project(vertices1, axis);
        const proj2 = project(vertices2, axis);

        if (!checkOverlap(proj1, proj2)) {
            return false; // Separating axis found
        }
    }

    return true; // No separating axis found, polygons are colliding
}

export type Projection = {
    min: number,
    max: number
}

export type Vec2 = {
    x: number,
    y: number
}

export type Vec3 = {
    x: number,
    y: number,
    angle: number
}

export type MaxValues = {
    x: number,
    y: number,
    angle: number
}

export type Velocity = {
    x: number,
    y: number,
    angle: number
}

export type Direction = {
    x: "left" | "right",
    y: "up" | "down"
    angle: "clockwise" | "counterclockwise"
}

// export const squares: Square[] = [
//     {rotate: "31deg", top: "20vh", left: "4vw", size: "5vw"},
//     {rotate: "71deg", top: "15vh", left: "50vw", size: "7vw"},
//     {rotate: "11deg", top: "17vh", left: "32vw", size: "10vw"},
//     {rotate: "4deg", top: "35vh", left: "90vw", size: "20vw"},
//     {rotate: "85deg", top: "40vh", left: "40vw", size: "20vw"},
//     {rotate: "30deg", top: "70vh", left: "2vw", size: "5vw"},
//     {rotate: "64deg", top: "74vh", left: "66vw", size: "24vw"},
//     {rotate: "12deg", top: "80vh", left: "20vw", size: "12vw"},
//     {rotate: "30deg", top: "125vh", left: "80vw", size: "15vw"},
//     {rotate: "9deg", top: "137vh", left: "11vw", size: "9vw"},
//     {rotate: "9deg", top: "140vh", left: "42vw", size: "17vw"},
//     {rotate: "60deg", top: "175vh", left: "5vw", size: "15vw"},
//     {rotate: "10deg", top: "180vh", left: "70vw", size: "5vw"},
//     {rotate: "19deg", top: "215vh", left: "10vw", size: "15vw"},
//     {rotate: "69deg", top: "215vh", left: "80vw", size: "20vw"},
//     {rotate: "39deg", top: "255vh", left: "16vw", size: "9vw"},
//     {rotate: "19deg", top: "260vh", left: "55vw", size: "17vw"},
//     {rotate: "76deg", top: "290vh", left: "5vw", size: "25vw"},
//     {rotate: "76deg", top: "285vh", left: "90vw", size: "20vw"},
//     {rotate: "12deg", top: "310vh", left: "50vw", size: "19vw"},
// ];
