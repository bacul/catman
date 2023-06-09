import {CollectibleCoordinate, collectibles, powerUps} from './collectibles';
import {collectibleModel, gameSizeModel, powerUpModel} from '../game-model';

import {State} from '../../application-state';

export class MissionLayer {
    private readonly context: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement = document.querySelector('#mission-layer');
    private readonly scoreElement: HTMLDivElement = document.querySelector('.score-value');
    private static _collectibles: CollectibleCoordinate[];
    private static _powerUps: CollectibleCoordinate[];
    private static _score: number = 0;

    constructor() {
        this.context = this.canvas.getContext('2d');
        MissionLayer.collectibles = collectibles.slice();
        MissionLayer.powerUps = [...powerUps];
    }

    restart(): void {
        State.missionLayer.drawCollectibles();
        State.missionLayer.drawPowerUps();
        State.missionLayer.setScore(0);
    }

    drawCollectibles(): void {
        this.context.clearRect(0, 0, gameSizeModel.width, gameSizeModel.height);
        MissionLayer.collectibles = collectibles.slice();

        this.collectibles.forEach((coordinate) => {
            this.context.beginPath();
            this.context.arc(coordinate.centerX, coordinate.centerY, collectibleModel.radius, 0, 2 * Math.PI);
            this.context.fillStyle = collectibleModel.сolor;
            this.context.fill();
            this.context.closePath();
        });
    }

    eraseCollectible(coordinate: CollectibleCoordinate, radius: number): void {
        const startX = coordinate.centerX - radius;
        const startY = coordinate.centerY - radius;
        const collectibleSize = radius * 2;
        this.context.clearRect(startX, startY, collectibleSize, collectibleSize);
        if (this.isMissionCollectible(radius)) {
            this.setScore(MissionLayer.score + 1);
        }
    }

    setScore(score: number): void {
        MissionLayer.score = score;
        this.scoreElement.innerHTML = `${MissionLayer.score}`;
    }

    drawPowerUps(): void {
        MissionLayer.powerUps = [...powerUps];
        this.powerUps.forEach((coordinate) => {
            this.context.beginPath();
            this.context.arc(coordinate.centerX, coordinate.centerY, powerUpModel.radius, 0, 2 * Math.PI);
            this.context.fillStyle = powerUpModel.сolor;
            this.context.fill();
            this.context.closePath();
        });
    }

    setMissionComplete(): void {
        document.dispatchEvent(new CustomEvent(State.gameOverEventName));
        State.uiLayer.setGameWin();
    }

    isMissionCollectible(radius: number): boolean {
        return radius === collectibleModel.radius;
    }

    static set score(value: number) {
        MissionLayer._score = value;
    }

    static get score(): number {
        return MissionLayer._score;
    }

    static set collectibles(value: CollectibleCoordinate[]) {
        this._collectibles = value;
    }

    get collectibles(): CollectibleCoordinate[] {
        return MissionLayer._collectibles;
    }

    get powerUps(): CollectibleCoordinate[] {
        return MissionLayer._powerUps;
    }

    static set powerUps(value: CollectibleCoordinate[]) {
        MissionLayer._powerUps = value;
    }
}
