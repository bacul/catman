import {character, gameSize} from './game/game';

import {BackgroundLayer} from './game/background-layer/background-layer';
import {GameLayer} from './game/game-layer/game-layer';

let animationFrameId: number;
const gameLayer = new GameLayer();
class Application {
    private readonly backgroundLayer = new BackgroundLayer();

    constructor() {
        this.initConfig();
        this.initDebug();

        this.backgroundLayer.initBackgroundStyle();
        this.backgroundLayer.drawFigures();

        main();
    }

    private initConfig(): void {
        document.querySelectorAll('.game-field').forEach((element) => {
            if (element.nodeName === 'CANVAS') {
                element.setAttribute('width', `${gameSize.width}px`);
                element.setAttribute('height', `${gameSize.height}px`);
            } else {
                element.setAttribute('style', `width: ${gameSize.width}px ;height: ${gameSize.height}px`);
            }
        });
    }

    private initDebug(): void {
        window.document.querySelector('#stop').addEventListener('click', this.stop);
        window.document.addEventListener('keydown', this.stop);
    }

    private stop(event: Event): void {
        const isKeyboardEvent = event instanceof KeyboardEvent;
        if (isKeyboardEvent) {
            if (event.key === 'Space') {
                character.stepSize = 0;
                window.cancelAnimationFrame(animationFrameId);
            }
        } else {
            character.stepSize = 0;
            window.cancelAnimationFrame(animationFrameId);
        }
    }
}
new Application();

function main() {
    animationFrameId = window.requestAnimationFrame(main);
    gameLayer.draw();
}
