import {Figure, PathCoordinates, pathBackgroundCoordinates} from './figure';

import {backgroundModel} from '../game';

export class BackgroundLayer {
    private readonly context: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement = document.querySelector('#background-layer');
    private textShiftX = 0;
    private textShiftY = 0;

    constructor() {
        this.context = this.canvas.getContext('2d', {alpha: false});
    }

    draw(): void {
        this.drawBackground();
        this.drawRectangles();
        this.drawPaths();
        this.drawBackgroundPaths();
    }

    private drawBackgroundPaths(): void {
        pathBackgroundCoordinates.forEach((backgroundPath) => this.drawPath(backgroundPath));
    }

    private drawBackground(): void {
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private drawPaths(): void {
        Figure.paths.forEach((path) => {
            this.drawPath(path);
        });
    }

    private figureTip(x: number, y: number): void {
        // this.context.font = '9px serif';
        // this.context.fillStyle = '#fff';
        // this.context.fillText(`${x}.${y}`, x - this.textShiftX, y - this.textShiftY);
        // if (this.textShiftX === 0) {
        //     this.textShiftX = 20;
        // } else {
        //     this.textShiftX = 0;
        // }
        // if (this.textShiftY === 0) {
        //     this.textShiftY = 10;
        // } else {
        //     this.textShiftY = 0;
        // }
    }

    private drawRectangles(): void {
        Figure.rectangles.forEach((rectangle) => {
            this.context.beginPath();
            this.context.lineWidth = 2;
            this.context.roundRect(
                rectangle.topLeftX,
                rectangle.topLeftY,
                rectangle.width,
                rectangle.height,
                backgroundModel.borderRadius
            );
            this.figureTip(rectangle.topLeftX, rectangle.topLeftY);
            this.figureTip(rectangle.topLeftX + rectangle.width, rectangle.topLeftY);
            this.figureTip(rectangle.topLeftX + rectangle.width, rectangle.topLeftY + rectangle.height);
            this.figureTip(rectangle.topLeftX, rectangle.topLeftY + rectangle.height);
            this.context.strokeStyle = backgroundModel.borderColor;
            if (rectangle.invisible) {
                this.context.strokeStyle = '#000';
            }
            this.context.stroke();
            this.context.strokeStyle = backgroundModel.borderColor;
            this.context.closePath();
        });
    }

    private drawPath(path: PathCoordinates): void {
        this.context.beginPath();
        this.context.moveTo(path.topLeftX + backgroundModel.borderRadius, path.topLeftY);
        path.points.forEach((line, index) => {
            if (index === 0) {
                this.context.arcTo(
                    line.x,
                    line.y,
                    path.points[index + 1].x,
                    path.points[index + 1].y,
                    backgroundModel.borderRadius
                );
                this.figureTip(line.x, line.y);
            } else if (index === path.points.length - 1) {
                this.context.arcTo(line.x, line.y, path.points[0].x, path.points[0].y, backgroundModel.borderRadius);
                this.figureTip(line.x, line.y);
            } else {
                this.context.arcTo(
                    line.x,
                    line.y,
                    path.points[index + 1].x,
                    path.points[index + 1].y,
                    backgroundModel.borderRadius
                );
                this.figureTip(line.x, line.y);
            }
        });
        this.context.stroke();
        this.context.closePath();
    }
}
