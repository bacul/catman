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
     * второй ряд слева направо
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
            {x: 360, y: 210},
            {x: 340, y: 210},
            {x: 340, y: 160},
            {x: 280, y: 160},
            {x: 280, y: 140}
        ]
    },
    /**
     * четвертый ряд слева направо
     */
    {
        topLeftX: 170,
        topLeftY: 290,
        points: [
            {x: 310, y: 290},
            {x: 310, y: 310},
            {x: 250, y: 310},
            {x: 250, y: 360},
            {x: 230, y: 360},
            {x: 230, y: 310},
            {x: 170, y: 310},
            {x: 170, y: 290}
        ]
    },
    /**
     * пятый ряд
     */
    {
        topLeftX: 30,
        topLeftY: 340,
        points: [
            {x: 90, y: 340},
            {x: 90, y: 410},
            {x: 70, y: 410},
            {x: 70, y: 360},
            {x: 30, y: 360},
            {x: 30, y: 340}
        ]
    },
    {
        topLeftX: 390,
        topLeftY: 340,
        points: [
            {x: 450, y: 340},
            {x: 450, y: 360},
            {x: 410, y: 360},
            {x: 410, y: 410},
            {x: 390, y: 410},
            {x: 390, y: 340}
        ]
    },
    /**
     * шестой ряд
     */
    {
        topLeftX: 30,
        topLeftY: 440,
        points: [
            {x: 120, y: 440},
            {x: 120, y: 390},
            {x: 140, y: 390},
            {x: 140, y: 440},
            {x: 200, y: 440},
            {x: 200, y: 460},
            {x: 30, y: 460},
            {x: 30, y: 440}
        ]
    },
    {
        topLeftX: 170,
        topLeftY: 390,
        points: [
            {x: 310, y: 390},
            {x: 310, y: 410},
            {x: 250, y: 410},
            {x: 250, y: 460},
            {x: 230, y: 460},
            {x: 230, y: 410},
            {x: 170, y: 410},
            {x: 170, y: 390}
        ]
    },
    {
        topLeftX: 280,
        topLeftY: 440,
        points: [
            {x: 340, y: 440},
            {x: 340, y: 390},
            {x: 360, y: 390},
            {x: 360, y: 440},
            {x: 450, y: 440},
            {x: 450, y: 460},
            {x: 280, y: 460},
            {x: 280, y: 440}
        ]
    }
];

const rectangles: Rectangle[] = [
    /**
     * верхний ряд
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
     * второй ряд
     */
    {
        topLeftX: 30,
        topLeftY: 90,
        width: 60,
        height: 20
    },
    {
        topLeftX: 390,
        topLeftY: 90,
        width: 60,
        height: 20
    },
    /**
     * третий ряд
     */
    {
        topLeftX: -5,
        topLeftY: 140,
        width: 95,
        height: 170
    },
    {
        topLeftX: 390,
        topLeftY: 140,
        width: 95,
        height: 170
    },
    {
        topLeftX: 170,
        topLeftY: 190,
        width: 140,
        height: 70
    },
    /**
     * четвертый ряд
     */
    {
        topLeftX: 120,
        topLeftY: 240,
        width: 20,
        height: 70
    },
    {
        topLeftX: 340,
        topLeftY: 240,
        width: 20,
        height: 70
    },
    /**
     * пятый ряд
     */
    {
        topLeftX: 120,
        topLeftY: 340,
        width: 80,
        height: 20
    },
    {
        topLeftX: 280,
        topLeftY: 340,
        width: 80,
        height: 20
    },
    /**
     * шестой ряд
     */
    {
        topLeftX: -5,
        topLeftY: 390,
        width: 45,
        height: 20
    },
    {
        topLeftX: 445,
        topLeftY: 390,
        width: 45,
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
