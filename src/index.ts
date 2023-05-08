import {State} from './application-state';
import {UIElements} from './game/ui-layer/ui-layer';
import {gameSizeModel} from './game/game-model';

class Application {
    private readonly applicationTickMs = 14;

    constructor() {
        new State();
        State.uiLayer.setLanguage();
        this.setGameSize();
        State.backgroundLayer.draw();
        State.missionLayer.drawCollectibles();
        State.missionLayer.drawPowerUps();
        this.main();
        State.uiLayer.setGameLoaded();

        document.addEventListener(State.gameOverEventName, () => (State.gameOver = true));
        document.addEventListener(State.gameStartEventName, () => {
            State.enemyLayer.addNewEnemies();
            this.setMovablePosition();
        });
        document.querySelector(UIElements.restart).addEventListener('click', this.restart.bind(this));
    }

    private setMovablePosition(): void {
        if (!State.gameOver) {
            setTimeout(() => {
                State.characterLayer.move();
                State.enemyLayer.move();
                this.setMovablePosition();
            }, this.applicationTickMs);
        }
    }

    private restart(): void {
        State.uiLayer.restart();
        State.characterLayer.restart();
        State.enemyLayer.restart();
        State.missionLayer.restart();
        this.setMovablePosition();
        State.gameOver = false;
    }

    private main() {
        window.requestAnimationFrame(this.main.bind(this));
        State.characterLayer.draw();
        State.enemyLayer.draw();
    }

    private setGameSize(): void {
        const outterBorderSizeAndPadding = 12;
        const gameFieldShiftXY = gameSizeModel.shiftXY * 2 - outterBorderSizeAndPadding;
        document.querySelectorAll('.game-field').forEach((element) => {
            if (element.nodeName === 'CANVAS') {
                element.setAttribute('width', `${gameSizeModel.width}px`);
                element.setAttribute('height', `${gameSizeModel.height}px`);
            } else {
                element.setAttribute(
                    'style',
                    `width: ${gameSizeModel.width - gameFieldShiftXY}px ;height: ${
                        gameSizeModel.height - gameFieldShiftXY
                    }px`
                );
            }
        });
        document.querySelector('.ui-layer').setAttribute('style', `width: ${gameSizeModel.width - gameFieldShiftXY}px`);
        document
            .querySelector('.ui-layer-overlay')
            .setAttribute('style', `height: ${gameSizeModel.height - gameFieldShiftXY}px`);
    }
}
new Application();
