import {character, enemies, gameSize} from './game/game';
import {UIElements, UILayer} from './game/ui-layer/ui-layer';

import {BackgroundLayer} from './game/background-layer/background-layer';
import {CharacterLayer} from './game/character-layer/character-layer';
import {EnemyLayer} from './game/enemy-layer/enemy-layer';
import {MissionLayer} from './game/mission-layer/mission-layer';

class Application {
    private readonly backgroundLayer = new BackgroundLayer();
    private readonly characterLayer = new CharacterLayer();
    private readonly missionLayer = new MissionLayer();
    private readonly enemyLayer = new EnemyLayer();
    private readonly uiLayer = new UILayer();
    private readonly applicationTickMs = 14;
    private gameOver: boolean;

    constructor() {
        this.uiLayer.setLanguage();
        this.setGameSize();
        this.backgroundLayer.draw();
        this.missionLayer.drawCollectibles();
        this.missionLayer.drawPowerUps();
        this.main();
        this.uiLayer.setGameLoaded();

        document.addEventListener(EnemyLayer.gameOverEventName, () => (this.gameOver = true));
        document.addEventListener(UILayer.gameStartEventName, () => this.setMovablePosition());
        document.querySelector(UIElements.restart).addEventListener('click', this.restart.bind(this));
    }

    private setMovablePosition(): void {
        if (!this.gameOver) {
            setTimeout(() => {
                this.characterLayer.move();
                this.enemyLayer.move();
                this.setMovablePosition();
            }, this.applicationTickMs);
        }
    }

    private restart(): void {
        this.uiLayer.restart();
        character.currentX = character.startPositionX;
        character.currentY = character.startPositionY;
        enemies.forEach((enemy) => {
            enemy.currentX = enemy.startPositionX;
            enemy.currentY = enemy.startPositionY;
        });
        this.missionLayer.drawCollectibles();
        this.missionLayer.drawPowerUps();
        this.missionLayer.setScore(0);
        this.setMovablePosition();

        this.uiLayer.setGameLoaded();
        this.gameOver = false;
    }

    private main() {
        window.requestAnimationFrame(this.main.bind(this));
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
}
new Application();
