import {background} from '../game';

interface IBackgroundLayer {
    figures: Figure[];
}

export enum FigureType {
    rectangle,
    path
}

export interface Point {
    x: number;
    y: number;
}

export interface Figure {
    type: FigureType;
    offsetX: number;
    offsetY: number;
    /** Ширина прямоугольника */
    width?: number;
    /** Высота прямоугольника */
    height?: number;
    /** Коллекция точек фигуры */
    path?: Point[];
}

export const backgroundLayer: IBackgroundLayer = {
    figures: [
        /**
         * верхний ряд стен слева направо
         */
        // {
        //     offsetX: 30,
        //     offsetY: 30,
        //     width: 60,
        //     height: 30,
        //     type: FigureType.rectangle
        // },
        // {
        //     offsetX: 120,
        //     offsetY: 30,
        //     width: 80,
        //     height: 30,
        //     type: FigureType.rectangle
        // },
        // {
        //     offsetX: 230,
        //     offsetY: -5,
        //     width: 20,
        //     height: 65,
        //     type: FigureType.rectangle
        // },
        // {
        //     offsetX: 280,
        //     offsetY: 30,
        //     width: 80,
        //     height: 30,
        //     type: FigureType.rectangle
        // },
        // {
        //     offsetX: 390,
        //     offsetY: 30,
        //     width: 60,
        //     height: 30,
        //     type: FigureType.rectangle
        // },
        // /**
        //  * второй сверху ряд стен слева направо
        //  */
        // {
        //     offsetX: 30,
        //     offsetY: 90,
        //     width: 60,
        //     height: 20,
        //     type: FigureType.rectangle
        // },
        {
            offsetX: 120,
            offsetY: 90,
            type: FigureType.path,
            path: [
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

    drawWalls(): void {
        backgroundLayer.figures.forEach((figures) => {
            switch (figures.type) {
                case FigureType.rectangle:
                    this.context.beginPath();
                    this.context.lineWidth = 2;
                    this.context.roundRect(
                        figures.offsetX,
                        figures.offsetY,
                        figures.width,
                        figures.height,
                        background.borderRadius
                    );
                    this.context.strokeStyle = background.borderColor;
                    this.context.stroke();
                    this.context.closePath();
                    break;
                case FigureType.path:
                    this.context.beginPath();
                    this.context.moveTo(figures.offsetX + background.borderRadius, figures.offsetY);
                    figures.path.forEach((line, index) => {
                        if (index === 0) {
                            this.context.arcTo(
                                line.x,
                                line.y,
                                figures.path[index + 1].x,
                                figures.path[index + 1].y,
                                background.borderRadius
                            );
                        } else if (index === figures.path.length - 1) {
                            this.context.arcTo(
                                line.x,
                                line.y,
                                figures.path[0].x,
                                figures.path[0].y,
                                background.borderRadius
                            );
                        } else {
                            this.context.arcTo(
                                line.x,
                                line.y,
                                figures.path[index + 1].x,
                                figures.path[index + 1].y,
                                background.borderRadius
                            );
                        }
                    });
                    this.context.stroke();
                    this.context.closePath();
                    break;
            }
        });
    }
}
