// coords.js

// Coords structure for 3D coordinates
class Coords {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

// IntCoords structure for integer coordinates
class IntCoords {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

// Vector2D structure for 2D coordinates
class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

// Exporting the classes for use in other modules
export { Coords, IntCoords, Vector2D };
