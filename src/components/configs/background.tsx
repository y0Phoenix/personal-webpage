// conatnts for configuring the overall behavior of the polygons
export const SIZE_MIN = 7;
export const SIZE_MAX = 25;
export const SQUARE_COUNT = 20;
export const SQUARES_PER_COLUMN = 2;
export const RIGHT_BOUNDARY_BUFFER = 50;
export const LEFT_BOUNDARY_BUFFER = 15;
export const TOP_BOUNDARY_BUFFER = 100;

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
    direction: Direction = {
        x: "right",
        y: "up",
        angle: "clockwise"
    }
    /**
     * values are in px not vw
     * */
    velocity: Velocity = {
        x: 0,
        y: 0,
        angle: 0
    }
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
        this.id = id;
        const halfSize = vwToPx(this.size) / 2;
        this.center = {
            x: vwToPx(this.rect.left) + halfSize,
            y: vwToPx(this.rect.top) + halfSize
        };
        this.getOgVertices();
        this.transformVertices();
        this.direction = {
            x: random(0, 1) == 1 ? "right" : "left",
            y: random(0, 1) == 1 ? "up" : "down",
            angle: random(0, 1) == 1 ? "clockwise" : "counterclockwise"
        };
        this.moveFromBoundaries();
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

            return {x: newX, y: newY};
        })
    }
    /**
     * calculate the vertices without the angle being applied
     * */
    getOgVertices() {
        this.ogVertices = [
            {x: vwToPx(this.rect.left), y: vwToPx(this.rect.top)},
            {x: vwToPx(this.rect.left) + vwToPx(this.size), y: vwToPx(this.rect.top)},
            {x: vwToPx(this.rect.left) + vwToPx(this.size), y: vwToPx(this.rect.top) + vwToPx(this.size)},
            {x: vwToPx(this.rect.left), y: vwToPx(this.rect.top) + vwToPx(this.size)}
        ];
    }
    /**
     * check if the polygon is outofbounds. returns an OutOfBounds enum which determines where the shape is out of bounds
     * */
    checkBoundaries(): OutOfBounds {
        for(let i = 0; i < this.trVertices.length; i++) {
            const vertex = this.trVertices[i];
            const bodyHeight = document.body.scrollHeight;
            if (vertex.x >= document.body.clientWidth - RIGHT_BOUNDARY_BUFFER) return OutOfBounds.right;
            else if (vertex.x <= LEFT_BOUNDARY_BUFFER) return OutOfBounds.left;
            else if (vertex.y >= bodyHeight) return OutOfBounds.bottom;
            else if (vertex.y <= TOP_BOUNDARY_BUFFER) return OutOfBounds.top;
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
        for(;;) {
            const newOutOfBounds = this.checkBoundaries();
            // if we have changed the out of bounds type we change the direction as well
            if (newOutOfBounds !== outOfBounds) {
                this.setDirectionBoundaries(newOutOfBounds);
                console.log("setting new direction");
            }
            if (newOutOfBounds == OutOfBounds.not) return;
           
            // move the shape only in the direction we need to
            if (newOutOfBounds == OutOfBounds.left) this.rect.left = this.rect.left + 5;
            else if (newOutOfBounds == OutOfBounds.right) this.rect.left = this.rect.left - 5;
            else if (newOutOfBounds == OutOfBounds.top) this.rect.top = this.rect.top + 5;
            else if (newOutOfBounds == OutOfBounds.bottom) this.rect.top = this.rect.top - 5;
            this.getOgVertices();
            this.transformVertices();
        }
    }
    move() {
        // 
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
        const columnSize = ((document.body.scrollHeight / viewportWidth) * 100) / (SQUARE_COUNT / SQUARES_PER_COLUMN);
        for(let i = 0; i < SQUARE_COUNT; i += 2, column++) {
            for(let j = 0; j < SQUARES_PER_COLUMN; j++) {
                this.polygons.push(new Polygon({
                    column,
                    columnSize,
                    leftSide: j == 0,
                    id: `polygon-${i + j}`
                }));
            }
        }
    }
    /**
     * gets the polygon from the id if it exists otherwise returns null
     * */
    getPolyById(id: string): Polygon | null {
        for(let i = 0; i < this.polygons.length; i++) {
            if (this.polygons[i].id == id) return this.polygons[i];
        }
        return null;
    }
    checkCollisions() {
        for (let i = 0; i < this.polygons.length; i = i + 2) {
            
        }
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
export type Direction = {
    x: "left" | "right",
    y: "up" | "down",
    angle: "clockwise" | "counterclockwise"
}
export type Velocity = {
    x: number,
    y: number,
    angle: number
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
