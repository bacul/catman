import {background} from '../game';

interface IBackgroundLayer {
    rectangles: Rectangle[];
    paths: Path[];
}

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

function convertCoordinatesToPath(pathCoordinates: PathCoordinates[]): Path[] {
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

export const backgroundLayer: IBackgroundLayer = {
    paths: convertCoordinatesToPath(pathCoordinates),
    rectangles: [
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
    ]
};

export class BackgroundLayer {
    private readonly context: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement = document.querySelector('#background-layer');

    constructor() {
        this.context = this.canvas.getContext('2d', {alpha: false});
    }

    initBackgroundStyle(): void {
        this.context.fillStyle = '#fff';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.beginPath();
        this.context.lineWidth = 2;
        this.context.roundRect(0, 0, this.canvas.width, this.canvas.height, background.borderRadius);
        this.context.strokeStyle = background.borderColor;
        this.context.stroke();
        this.context.closePath();
    }

    drawPaths(): void {
        backgroundLayer.paths.forEach((path) => {
            this.context.beginPath();
            this.context.moveTo(path.topLeftX + background.borderRadius, path.topLeftY);
            path.points.forEach((line, index) => {
                if (index === 0) {
                    this.context.arcTo(
                        line.x,
                        line.y,
                        path.points[index + 1].x,
                        path.points[index + 1].y,
                        background.borderRadius
                    );
                } else if (index === path.points.length - 1) {
                    this.context.arcTo(line.x, line.y, path.points[0].x, path.points[0].y, background.borderRadius);
                } else {
                    this.context.arcTo(
                        line.x,
                        line.y,
                        path.points[index + 1].x,
                        path.points[index + 1].y,
                        background.borderRadius
                    );
                }
            });
            this.context.stroke();
            this.context.closePath();
        });
    }

    drawRectangles(): void {
        backgroundLayer.rectangles.forEach((rectangle) => {
            this.context.beginPath();
            this.context.lineWidth = 2;
            this.context.roundRect(
                rectangle.topLeftX,
                rectangle.topLeftY,
                rectangle.width,
                rectangle.height,
                background.borderRadius
            );
            this.context.strokeStyle = background.borderColor;
            this.context.stroke();
            this.context.closePath();
        });
    }
}
