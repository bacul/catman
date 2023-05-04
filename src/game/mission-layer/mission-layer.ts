import {CollectibleCoordinate, collectibles} from './collectibles';

import {collectible} from '../game';

export class MissionLayer {
    private readonly context: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement = document.querySelector('#mission-layer');
    private readonly score: HTMLDivElement = document.querySelector('.score-value');
    private readonly collectibles: CollectibleCoordinate[];

    constructor() {
        this.context = this.canvas.getContext('2d');
        this.collectibles = collectibles;
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

    eraseCollectible(coordinate: CollectibleCoordinate): void {
        const startX = coordinate.centerX - collectible.radius;
        const startY = coordinate.centerY - collectible.radius;
        const collectibleSize = collectible.radius * 2;
        this.context.clearRect(startX, startY, collectibleSize, collectibleSize);
        this.score.innerHTML = `${+this.score.innerHTML + 1}`;
    }

    setMissionComplete(): void {
        // TODO
        console.log('you win!');
    }
}
