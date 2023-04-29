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
    {
        topLeftX: 120,
        topLeftY: 90,
        points: [
            {x: 130, y: 90},
            {x: 130, y: 120},
            {x: 160, y: 120},
            {x: 160, y: 130},
            {x: 130, y: 130},
            {x: 130, y: 160},
            {x: 120, y: 160},
            {x: 120, y: 90}
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
