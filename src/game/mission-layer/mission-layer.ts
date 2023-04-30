import {Collectible, CollectibleCoordinate, collectibles} from './collectibles';

export class MissionLayer {
    private readonly context: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement = document.querySelector('#mission-layer');
    private readonly collectible: Collectible;

    constructor() {
        this.context = this.canvas.getContext('2d');
        this.collectible = collectibles;
    }

    drawCollectibles(): void {
        this.collectible.coordinates.forEach((coordinate) => {
            this.context.beginPath();
            this.context.arc(coordinate.centerX, coordinate.centerY, this.collectible.size, 0, 2 * Math.PI);
            this.context.fillStyle = this.collectible.backgroundColor;
            this.context.fill();
            this.context.closePath();
        });
    }

    eraseCollectible(coordinate: CollectibleCoordinate): void {
        const startX = coordinate.centerX - collectibles.size;
        const startY = coordinate.centerY - collectibles.size;
        const collectibleSize = collectibles.size * 2;
        this.context.clearRect(startX, startY, collectibleSize, collectibleSize);
    }
}
