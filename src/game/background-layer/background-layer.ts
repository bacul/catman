interface IBackgroundLayer {
    walls: Wall[];
}

export interface Wall {
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
}

export const backgroundLayer: IBackgroundLayer = {
    walls: [
        {
            offsetX: 32,
            offsetY: 50,
            width: 25,
            height: 100
        },
        {
            offsetX: 89,
            offsetY: 100,
            width: 25,
            height: 100
        }
    ]
};

export class BackgroundLayer {
    private readonly context: CanvasRenderingContext2D;

    constructor() {
        const canvas: HTMLCanvasElement = document.querySelector('#background-layer');
        this.context = canvas.getContext('2d', {alpha: false});
        this.context.fillStyle = '#000';
    }

    drawWalls(): void {
        backgroundLayer.walls.forEach((wall) => {
            this.context.beginPath();
            this.context.rect(wall.offsetX, wall.offsetY, wall.width, wall.height);
            this.context.fillStyle = '#009511';
            this.context.fill();
            this.context.closePath();
        });
    }
}
