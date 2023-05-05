import {character, gameSize} from './game/game';

import {BackgroundLayer} from './game/background-layer/background-layer';
import {CharacterLayer} from './game/character-layer/character-layer';
import {EnemyLayer} from './game/enemy-layer/enemy-layer';
import {MissionLayer} from './game/mission-layer/mission-layer';
import {UILayer} from './game/ui-layer/ui-layer';

class Application {
    private animationFrameId: number;
    private readonly backgroundLayer = new BackgroundLayer();
    private readonly characterLayer = new CharacterLayer();
    private readonly missionLayer = new MissionLayer();
    private readonly enemyLayer = new EnemyLayer();
    private readonly uiLayer = new UILayer();
    private readonly applicationTickMs = 14;

    constructor() {
        this.uiLayer.setLanguage();
        this.setGameSize();
        // this.setDebugMode();
        this.backgroundLayer.draw();
        this.missionLayer.drawCollectibles();
        this.missionLayer.drawPowerUps();
        this.main();
        this.uiLayer.setGameLoaded();

        this.uiLayer.startSequencePromise$().then(() => this.setMovablePosition());
    }

    private setMovablePosition(): void {
        setTimeout(() => {
            this.characterLayer.move();
            this.enemyLayer.move();
            this.setMovablePosition();
        }, this.applicationTickMs);
    }

    private main() {
        this.animationFrameId = window.requestAnimationFrame(this.main.bind(this));
        this.characterLayer.draw();
        this.enemyLayer.draw();
    }

    private setGameSize(): void {
        const outterBorderSizeAndPadding = 12;
        const gameFieldShiftXY = gameSize.shiftXY * 2 - outterBorderSizeAndPadding;
        document.querySelectorAll('.game-field').forEach((element) => {
            if (element.nodeName === 'CANVAS') {
                element.setAttribute('width', `${gameSize.width}px`);
                element.setAttribute('height', `${gameSize.height}px`);
            } else {
                element.setAttribute(
                    'style',
                    `width: ${gameSize.width - gameFieldShiftXY}px ;height: ${gameSize.height - gameFieldShiftXY}px`
                );
            }
        });
        document.querySelector('.ui-layer').setAttribute('style', `width: ${gameSize.width - gameFieldShiftXY}px`);
        document
            .querySelector('.ui-layer-overlay')
            .setAttribute('style', `height: ${gameSize.height - gameFieldShiftXY}px`);
    }

    private setDebugMode(): void {
        window.document.querySelector('#stop').addEventListener('click', this.stop);
        window.document.addEventListener('keydown', this.stop);
    }

    private stop(event: Event): void {
        const isKeyboardEvent = event instanceof KeyboardEvent;
        if (isKeyboardEvent) {
            if (event.key === 'Space') {
                character.stepSize = 0;
                window.cancelAnimationFrame(this.animationFrameId);
            }
        } else {
            character.stepSize = 0;
            window.cancelAnimationFrame(this.animationFrameId);
        }
    }
}
new Application();
