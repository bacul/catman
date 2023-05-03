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
    /**
     * верхний ряд слева направо
     */
    {
        topLeftX: 120,
        topLeftY: 90,
        points: [
            {x: 140, y: 90},
            {x: 140, y: 140},
            {x: 200, y: 140},
            {x: 200, y: 160},
            {x: 140, y: 160},
            {x: 140, y: 210},
            {x: 120, y: 210},
            {x: 120, y: 90}
        ]
    },
    {
        topLeftX: 170,
        topLeftY: 90,
        points: [
            {x: 310, y: 90},
            {x: 310, y: 110},
            {x: 250, y: 110},
            {x: 250, y: 160},
            {x: 230, y: 160},
            {x: 230, y: 110},
            {x: 170, y: 110},
            {x: 170, y: 90}
        ]
    },
    {
        topLeftX: 280,
        topLeftY: 140,
        points: [
            {x: 340, y: 140},
            {x: 340, y: 90},
            {x: 360, y: 90},
            {x: 360, y: 230},
            {x: 340, y: 230},
            {x: 340, y: 160},
            {x: 280, y: 160},
            {x: 280, y: 140}
        ]
    }
];

const rectangles: Rectangle[] = [
    /**
     * верхний ряд слева направо
     */
    {
        topLeftX: 30,
        topLeftY: 30,
        width: 60,
        height: 30
    },
    {
        topLeftX: 120,
        topLeftY: 30,
        width: 80,
        height: 30
    },
    {
        topLeftX: 230,
        topLeftY: -5,
        width: 20,
        height: 65
    },
    {
        topLeftX: 280,
        topLeftY: 30,
        width: 80,
        height: 30
    },
    {
        topLeftX: 390,
        topLeftY: 30,
        width: 60,
        height: 30
    },
    /**
     * второй сверху ряд слева направо
     */
    {
        topLeftX: 30,
        topLeftY: 90,
        width: 60,
        height: 20
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
