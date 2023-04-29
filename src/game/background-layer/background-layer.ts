import {background} from '../game';
import {Figure} from './figure';

export class BackgroundLayer {
    private readonly context: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement = document.querySelector('#background-layer');

    constructor() {
        this.context = this.canvas.getContext('2d', {alpha: false});
    }

    draw(): void {
        this.drawBackground();
        this.drawRectangles();
        this.drawPaths();
    }

    private drawBackground(): void {
        this.context.fillStyle = '#fff';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.beginPath();
        this.context.lineWidth = 2;
        this.context.roundRect(0, 0, this.canvas.width, this.canvas.height, background.borderRadius);
        this.context.strokeStyle = background.borderColor;
        this.context.stroke();
        this.context.closePath();
    }

    private drawPaths(): void {
        Figure.paths.forEach((path) => {
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

    private drawRectangles(): void {
        Figure.rectangles.forEach((rectangle) => {
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
