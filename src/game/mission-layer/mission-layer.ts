import {Collectible, CollectibleCoordinate, collectibles} from './collectibles';

export class MissionLayer {
    private readonly context: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement = document.querySelector('#mission-layer');
    private readonly score: HTMLDivElement = document.querySelector('.score-value');
    private readonly collectible: Collectible;

    constructor() {
        this.context = this.canvas.getContext('2d');
        this.collectible = collectibles;
    }

    drawCollectibles(): void {
        this.collectible.coordinates.forEach((coordinate) => {
            this.context.beginPath();
            this.context.arc(coordinate.centerX, coordinate.centerY, this.collectible.radius, 0, 2 * Math.PI);
            this.context.fillStyle = this.collectible.backgroundColor;
            this.context.fill();
            this.context.closePath();
        });
    }

    eraseCollectible(coordinate: CollectibleCoordinate): void {
        const startX = coordinate.centerX - collectibles.radius;
        const startY = coordinate.centerY - collectibles.radius;
        const collectibleSize = collectibles.radius * 2;
        this.context.clearRect(startX, startY, collectibleSize, collectibleSize);
        this.score.innerHTML = `${+this.score.innerHTML + 1}`;
    }

    setMissionComplete(): void {
        // TODO
        console.log('you win!');
    }
}
