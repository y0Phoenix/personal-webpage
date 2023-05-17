// conatnts for configuring the overall behavior of the polygons
export const SIZE_MIN = 7;
export const SIZE_MAX = 16;
export const SQUARE_COUNT = 20;
export const SQUARES_PER_COLUMN = 2;
export const RIGHT_BOUNDARY_BUFFER = 50;
export const LEFT_BOUNDARY_BUFFER = 5;
export const TOP_BOUNDARY_BUFFER = window.innerWidth <= 800 ? 550 : 100;
export const X_VELOCITY_MIN = 0.15;
export const X_VELOCITY_MAX = 0.45;
export const Y_VELOCITY_MIN = 0.05;
export const Y_VELOCITY_MAX = 0.35;
export const ANGLE_VELOCITY_MIN = 0.65;
export const ANGLE_VELOCITY_MAX = 0.95;

// props for the polygon constructor
export type PolygonProps = {
    leftSide: boolean,
    column: number,
    columnSize: number,
    id: string,
}

export class Polygon {
    /**
     * values are in vw instead of px
     **/
    rect: Rect = {
        top: 0,
        left: 0
    };
    /**
     * values are in vw instead of px
    **/
    center: Vec2 = {
        x: 0,
        y: 0
    }
    /**
     * angle is in degrees
    **/
    angle = 0;
    /**
     * value is in vw not px
     * */
    size = 0;
    id: string;
    /**
     * the vertices before the angle is applies
     * */
    ogVertices: Vec2[] = [];
    /**
     * the vertices with the angle calculated
     * */
    trVertices: Vec2[] = [];
    direction: Direction;
    inCollision = false;
    /**
     * values are in px not vw
     * */
    velocity: Velocity;

    constructor({
        leftSide,
        column,
        columnSize,
        id,
    }: PolygonProps) {
        // min max values for the random calulation
        const topMin = column * columnSize;
        const topMax = topMin + columnSize;

        // min max values for the random calulation
        const leftMin = leftSide ? 10 : 50;
        const leftMax = leftSide ? 50 : 90;

        this.rect = {
            top: random(topMin, topMax),
            left: random(leftMin, leftMax)
        };
        this.size = random(SIZE_MIN, SIZE_MAX);
        this.angle = random(0, 90);
        this.velocity = new Velocity();
        this.direction = new Direction();
        this.id = id;
        this.getOgVertices();
        this.transformVertices();
    }
    /**
     * apply the angle to the vertices to get the transformed vertices
     * */
    transformVertices() {
        // cos, sin with the angle in radians
        const [sin, cos] = [Math.sin(Math.PI / this.angle), Math.cos(Math.PI / this.angle)];
        this.trVertices = this.ogVertices.map(vertex => {
            // normal calculation except the center values are needed because the top and left grid is different than a normal grid on like a grid calculator
            const newX = this.center.x + (((vertex.x - this.center.x) * cos) - ((vertex.y - this.center.y) * sin));
            const newY = this.center.y + (((vertex.y - this.center.y) * cos) + ((vertex.x - this.center.x) * sin));

            return { x: newX, y: newY };
        })
    }
    /**
     * calculate the vertices without the angle being applied
     * */
    getOgVertices() {
        this.ogVertices = [
            { x: vwToPx(this.rect.left), y: vwToPx(this.rect.top) },
            { x: vwToPx(this.rect.left) + vwToPx(this.size), y: vwToPx(this.rect.top) },
            { x: vwToPx(this.rect.left) + vwToPx(this.size), y: vwToPx(this.rect.top) + vwToPx(this.size) },
            { x: vwToPx(this.rect.left), y: vwToPx(this.rect.top) + vwToPx(this.size) }
        ];
        const halfSize = vwToPx(this.size) / 2;
        this.center = {
            x: vwToPx(this.rect.left) + halfSize,
            y: vwToPx(this.rect.top) + halfSize
        };

    }
    /**
     * check if the polygon is outofbounds. returns an OutOfBounds enum which determines where the shape is out of bounds
     * */
    checkBoundaries(): OutOfBounds {
        for (let i = 0; i < this.trVertices.length; i++) {
            const vertex = this.trVertices[i];
            const bodyHeight = document.body.scrollHeight > 6100 ? document.body.scrollHeight : 1.33 * document.body.scrollHeight;
            if (vertex.x >= document.body.clientWidth - RIGHT_BOUNDARY_BUFFER) {
                this.direction.x = "left";
                return OutOfBounds.right;
            }
            else if (vertex.x <= LEFT_BOUNDARY_BUFFER) {
                this.direction.x = "right";
                return OutOfBounds.left;
            }
            else if (vertex.y >= bodyHeight) {
                this.direction.y = "up";
                return OutOfBounds.bottom;
            }
            else if (vertex.y <= TOP_BOUNDARY_BUFFER) {
                this.direction.y = "down";
                return OutOfBounds.top;
            }
        }
        return OutOfBounds.not;
    }
    /**
     * will move the shape within bounds if it's out of bounds. only use this function on initial spawn
     * */
    moveFromBoundaries() {
        const outOfBounds = this.checkBoundaries();
        if (outOfBounds == OutOfBounds.not) return;
        this.setDirectionBoundaries(outOfBounds);
        for (; ;) {
            const newOutOfBounds = this.checkBoundaries();
            // if we have changed the out of bounds type we change the direction as well
            if (newOutOfBounds !== outOfBounds) {
                this.setDirectionBoundaries(newOutOfBounds);
            }
            if (newOutOfBounds == OutOfBounds.not) return;

            this.move(5);

            this.getOgVertices();
            this.transformVertices();
        }
    }
    move(amount: number) {
        const velocity: Velocity = {
            x: amount > 0 ? amount : this.velocity.x,
            y: amount > 0 ? amount : this.velocity.y,
            angle: this.velocity.angle
        };
        if (this.direction.x == "left") this.rect.left = this.rect.left - velocity.x;
        else this.rect.left = this.rect.left + velocity.x;

        if (this.direction.y == "up") this.rect.top = this.rect.top - velocity.y;
        else this.rect.top = this.rect.top + velocity.y;

        if (this.direction.angle == "counterclockwise") this.angle = this.angle - velocity.angle;
        else this.angle = this.angle + velocity.angle;
    }
    /**
     * set the new direction based on the OutOfBounds type
     * */
    setDirectionBoundaries(outOfBounds: OutOfBounds) {
        if (outOfBounds == OutOfBounds.top) this.direction.y = "down";
        else if (outOfBounds == OutOfBounds.bottom) this.direction.y = "up";
        else if (outOfBounds == OutOfBounds.left) this.direction.x = "right";
        else if (outOfBounds == OutOfBounds.right) this.direction.x = "left";
    }
}

/**
 * wrapper class for managing the polygons
 * */
export class Polygons {
    polygons: Polygon[] = [];
    constructor() {
        let column = 0;
        const viewportWidth = window.innerWidth;
        const multiplier = viewportWidth > 1440 ? 1.50 : viewportWidth >= 768 ? 1.25 : viewportWidth >= 425 ? 1.45 : 1.25;
        const bodyHeight = document.body.scrollHeight > 6100 ? document.body.scrollHeight : multiplier * document.body.scrollHeight;
        const columnSize = ((bodyHeight / viewportWidth) * 100) / (SQUARE_COUNT / SQUARES_PER_COLUMN);
        for (let i = 0; i < SQUARE_COUNT; i += 2, column++) {
            for (let j = 0; j < SQUARES_PER_COLUMN; j++) {
                this.polygons.push(new Polygon({
                    column,
                    columnSize,
                    leftSide: j == 0,
                    id: `polygon-${i + j}`
                }));
            }
        }
        this.checkCollisions(true);
        this.polygons.forEach(polygon => polygon.moveFromBoundaries());
        this.polygons.forEach(polygon => polygon.moveFromBoundaries());
    }
    /**
     * gets the polygon from the id if it exists otherwise returns null
     * */
    getPolyById(id: string): Polygon | null {
        for (let i = 0; i < this.polygons.length; i++) {
            if (this.polygons[i].id == id) return this.polygons[i];
        }
        return null;
    }
    checkCollisions(spawn: boolean) {
        for (let i = 0; i < this.polygons.length; i++) {
            const poly1 = this.polygons[i];
            let collisionFound = false;
            for (let j = 0; j < this.polygons.length; j++) {
                const poly2 = this.polygons[j];
                if (poly1.id != poly2.id) {
                    if (collision(poly1.trVertices, poly2.trVertices)) {
                        collisionFound = true;
                        if (!poly1.inCollision) {
                            const poly1Dir = poly2.direction;
                            const poly2Dir = poly1.direction;

                            poly1.inCollision = true;
                            poly2.inCollision = true;

                            if (spawn) {
                                if (poly1Dir.xCmp(poly2Dir)) poly1Dir.swapX();
                                if (poly1Dir.yCmp(poly2Dir)) poly1Dir.swapY();
                                poly1.move(5);
                                poly2.move(5);

                                while (collision(poly1.trVertices, poly2.trVertices)) {
                                    poly1.move(5);
                                    poly2.move(5);

                                    poly1.getOgVertices();
                                    poly1.transformVertices();

                                    poly2.getOgVertices();
                                    poly2.transformVertices();
                                }
                                poly1.move(10);
                                poly2.move(10);
                            }
                            else {
                                poly1.direction.swapY();
                                poly1.direction.swapX();
                                poly2.direction.swapY();
                                poly2.direction.swapX();
                            }
                        }
                    }
                }
            }
            if (!collisionFound) poly1.inCollision = false;
        }
    }
    update(elements: NodeListOf<HTMLElement>) {
        this.checkCollisions(false);
        elements.forEach(element => {
            const poly = this.getPolyById(element.id);
            if (!poly) return;
            poly.checkBoundaries();

            poly.move(0);

            poly.getOgVertices();
            poly.transformVertices();

            element.style.left = poly.rect.left + "vw";
            element.style.top = poly.rect.top + "vw";
            element.style.rotate = poly.angle + "deg";
            // element.style.transform = `translate(${vwToPx(poly.rect.top)}px,${vwToPx(poly.rect.left)}px)`;
        });
    }
}

export type Rect = {
    top: number,
    left: number
}

export type Vec2 = {
    x: number,
    y: number
}
export enum OutOfBounds {
    left,
    right,
    top,
    bottom,
    not
}
export class Direction {
    x: "left" | "right" = "left";
    y: "up" | "down" = "up";
    angle: "clockwise" | "counterclockwise" = "clockwise"
    constructor() {
        this.x = random(0, 1) == 1 ? "right" : "left";
        this.y = random(0, 1) == 1 ? "up" : "down";
        this.angle = random(0, 1) == 1 ? "clockwise" : "counterclockwise";

    }
    fullCmp(dir2: Direction): boolean {
        return this.x == dir2.x && this.y == dir2.y && this.angle == dir2.angle;
    }
    xCmp(dir2: Direction): boolean {
        return this.x == dir2.x;
    }
    yCmp(dir2: Direction): boolean {
        return this.y == dir2.y;
    }
    swapY() {
        if (this.y == "up") return this.y = "down";
        this.y = "up";
    }
    swapX() {
        if (this.x == "left") return this.x = "right";
        this.x = "left";
    }
    swapAngle() {
        if (this.angle == "clockwise") return this.angle = "counterclockwise";
        this.angle = "clockwise";
    }
}
export class Velocity {
    x = 0;
    y = 0;
    angle = 0;
    constructor() {
        this.x = random(X_VELOCITY_MIN, X_VELOCITY_MAX);
        this.y = random(Y_VELOCITY_MIN, Y_VELOCITY_MAX);
        this.angle = random(ANGLE_VELOCITY_MIN, ANGLE_VELOCITY_MAX);
    }
}
export type Projection = {
    min: number,
    max: number
}

/**
 * easily calculate a random number with min and max amounts
 * */
export function random(min: number, max: number): number {
    return Math.round(Math.random() * (max - min)) + min;
}
/**
 * easily convert vw amount to px amount
 * */
export function vwToPx(vw: number): number {
    return vw * window.innerWidth / 100;
}
/**
 * easily convert px amount to vw amount
 * */
export function pxToVw(px: number): number {
    return px / window.innerWidth * 100;
}
export function dotProduct(v1: Vec2, v2: Vec2): number {
    return v1.x * v2.x + v1.y * v2.y;
}

export function getEdges(vertices: Vec2[]): Vec2[] {
    const edges = [];
    for (let i = 0; i < vertices.length; i++) {
        const v1 = vertices[i];
        const v2 = vertices[i + 1 === vertices.length ? 0 : i + 1];
        edges.push({ x: v2.x - v1.x, y: v2.y - v1.y });
    }
    return edges;
}

export function getPerpendicular(edge: Vec2): Vec2 {
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

export function collision(vertices1: Vec2[], vertices2: Vec2[]): boolean {
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

