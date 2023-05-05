import {collectible, powerUp} from '../game';
import {CollectibleCoordinate, collectibles, powerUps} from './collectibles';

export class MissionLayer {
    private readonly context: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement = document.querySelector('#mission-layer');
    private readonly score: HTMLDivElement = document.querySelector('.score-value');
    private readonly collectibles: CollectibleCoordinate[];
    private readonly powerUps: CollectibleCoordinate[];

    constructor() {
        this.context = this.canvas.getContext('2d');
        this.collectibles = collectibles;
        this.powerUps = powerUps;
    }

    drawCollectibles(): void {
        this.collectibles.forEach((coordinate) => {
            this.context.beginPath();
            this.context.arc(coordinate.centerX, coordinate.centerY, collectible.radius, 0, 2 * Math.PI);
            this.context.fillStyle = collectible.сolor;
            this.context.fill();
            this.context.closePath();
        });
    }

    eraseCollectible(coordinate: CollectibleCoordinate, radius: number): void {
        const startX = coordinate.centerX - radius;
        const startY = coordinate.centerY - radius;
        const collectibleSize = radius * 2;
        this.context.clearRect(startX, startY, collectibleSize, collectibleSize);
        if (this.getIsMissionCollectible(radius)) {
            this.score.innerHTML = `${+this.score.innerHTML + 1}`;
        }
    }

    drawPowerUps(): void {
        this.powerUps.forEach((coordinate) => {
            this.context.beginPath();
            this.context.arc(coordinate.centerX, coordinate.centerY, powerUp.radius, 0, 2 * Math.PI);
            this.context.fillStyle = powerUp.сolor;
            this.context.fill();
            this.context.closePath();
        });
    }

    setMissionComplete(): void {
        // TODO
        console.log('you win!');
    }

    getIsMissionCollectible(radius: number): boolean {
        return radius === collectible.radius;
    }
}
