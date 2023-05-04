export interface Point {
    x: number;
    y: number;
}

export interface Rectangle {
    topLeftX: number;
    topLeftY: number;
    width: number;
    height: number;
}

interface PathCoordinates {
    topLeftX: number;
    topLeftY: number;
    points: Point[];
}

export interface Path extends PathCoordinates {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

const pathCoordinates: PathCoordinates[] = [
    /** start second row */
    {
        topLeftX: 105,
        topLeftY: 90,
        points: [
            {x: 120, y: 90},
            {x: 120, y: 135},
            {x: 165, y: 135},
            {x: 165, y: 150},
            {x: 120, y: 150},
            {x: 120, y: 195},
            {x: 105, y: 195},
            {x: 105, y: 90}
        ]
    },
    {
        topLeftX: 150,
        topLeftY: 90,
        points: [
            {x: 255, y: 90},
            {x: 255, y: 105},
            {x: 210, y: 105},
            {x: 210, y: 150},
            {x: 195, y: 150},
            {x: 195, y: 105},
            {x: 150, y: 105},
            {x: 150, y: 90}
        ]
    },
    {
        topLeftX: 240,
        topLeftY: 135,
        points: [
            {x: 285, y: 135},
            {x: 285, y: 90},
            {x: 300, y: 90},
            {x: 300, y: 195},
            {x: 285, y: 195},
            {x: 285, y: 150},
            {x: 240, y: 150},
            {x: 240, y: 135}
        ]
    },
    /** end second row */
    /** start fourth row */
    {
        topLeftX: 150,
        topLeftY: 270,
        points: [
            {x: 255, y: 270},
            {x: 255, y: 285},
            {x: 210, y: 285},
            {x: 210, y: 330},
            {x: 195, y: 330},
            {x: 195, y: 285},
            {x: 150, y: 285},
            {x: 150, y: 270}
        ]
    },
    /** end fourth row */
    /** start fifth row */
    {
        topLeftX: 30,
        topLeftY: 315,
        points: [
            {x: 75, y: 315},
            {x: 75, y: 375},
            {x: 60, y: 375},
            {x: 60, y: 330},
            {x: 30, y: 330},
            {x: 30, y: 315}
        ]
    },
    {
        topLeftX: 330,
        topLeftY: 315,
        points: [
            {x: 375, y: 315},
            {x: 375, y: 330},
            {x: 345, y: 330},
            {x: 345, y: 375},
            {x: 330, y: 375},
            {x: 330, y: 315}
        ]
    },
    /** start sixth row */
    {
        topLeftX: 30,
        topLeftY: 405,
        points: [
            {x: 105, y: 405},
            {x: 105, y: 360},
            {x: 120, y: 360},
            {x: 120, y: 405},
            {x: 165, y: 405},
            {x: 165, y: 420},
            {x: 30, y: 420},
            {x: 30, y: 405}
        ]
    },
    {
        topLeftX: 150,
        topLeftY: 360,
        points: [
            {x: 255, y: 360},
            {x: 255, y: 375},
            {x: 210, y: 375},
            {x: 210, y: 420},
            {x: 195, y: 420},
            {x: 195, y: 375},
            {x: 150, y: 375},
            {x: 150, y: 360}
        ]
    },
    {
        topLeftX: 240,
        topLeftY: 405,
        points: [
            {x: 285, y: 405},
            {x: 285, y: 360},
            {x: 300, y: 360},
            {x: 300, y: 405},
            {x: 375, y: 405},
            {x: 375, y: 420},
            {x: 240, y: 420},
            {x: 240, y: 405}
        ]
    }
    /** end sixth row */
];

const rectangles: Rectangle[] = [
    /** start first row */
    {
        topLeftX: 30,
        topLeftY: 30,
        width: 45,
        height: 30
    },
    {
        topLeftX: 105,
        topLeftY: 30,
        width: 60,
        height: 30
    },
    {
        topLeftX: 195,
        topLeftY: -5,
        width: 15,
        height: 65
    },
    {
        topLeftX: 240,
        topLeftY: 30,
        width: 60,
        height: 30
    },
    {
        topLeftX: 330,
        topLeftY: 30,
        width: 45,
        height: 30
    },
    /** end first row */
    /** start second row */
    {
        topLeftX: 30,
        topLeftY: 90,
        width: 45,
        height: 15
    },
    {
        topLeftX: 330,
        topLeftY: 90,
        width: 45,
        height: 15
    },
    /** end second row */
    /** start third row */
    /** TODO must be invisible */
    {
        topLeftX: 0,
        topLeftY: 135,
        width: 75,
        height: 60
    },
    /** TODO must be invisible */
    {
        topLeftX: 330,
        topLeftY: 140,
        width: 75,
        height: 60
    },
    {
        topLeftX: 150,
        topLeftY: 180,
        width: 105,
        height: 60
    },
    /** end third row */
    /** start fourth row */
    /** TODO must be invisible */
    {
        topLeftX: 0,
        topLeftY: 225,
        width: 75,
        height: 60
    },
    /** TODO must be invisible */
    {
        topLeftX: 330,
        topLeftY: 225,
        width: 75,
        height: 60
    },
    {
        topLeftX: 105,
        topLeftY: 225,
        width: 15,
        height: 60
    },
    {
        topLeftX: 285,
        topLeftY: 225,
        width: 15,
        height: 60
    },
    /** end fourth */
    /** start fifth */
    {
        topLeftX: 105,
        topLeftY: 315,
        width: 60,
        height: 15
    },
    {
        topLeftX: 240,
        topLeftY: 315,
        width: 60,
        height: 15
    },
    /** start sixth */
    {
        topLeftX: 0,
        topLeftY: 360,
        width: 30,
        height: 15
    },
    {
        topLeftX: 375,
        topLeftY: 360,
        width: 30,
        height: 15
    }
];

export class Figure {
    private static _paths: Path[];
    private static _rectangles: Rectangle[];

    constructor() {
        Figure._paths = this.convertCoordinatesToPath(pathCoordinates);
        Figure._rectangles = rectangles;
    }

    static get paths() {
        return Figure._paths;
    }

    static get rectangles() {
        return Figure._rectangles;
    }

    private convertCoordinatesToPath(pathCoordinates: PathCoordinates[]): Path[] {
        return pathCoordinates.map((coordinates) => {
            const path: Path = {
                ...coordinates,
                maxX: Math.max(...coordinates.points.map((point) => point.x)),
                minX: Math.min(...coordinates.points.map((point) => point.x)),
                maxY: Math.max(...coordinates.points.map((point) => point.y)),
                minY: Math.min(...coordinates.points.map((point) => point.y))
            };

            return path;
        });
    }
}
new Figure();
