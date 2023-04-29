import {character, gameSize} from './game/game';

import {BackgroundLayer} from './game/background-layer/background-layer';
import {CharacterLayer} from './game/character-layer/character-layer';

class Application {
    private animationFrameId: number;
    private readonly backgroundLayer = new BackgroundLayer();
    private readonly characterLayer = new CharacterLayer();

    constructor() {
        this.setGameSize();
        this.setDebugMode();
        this.backgroundLayer.draw();
        this.main();
        this.setCharacterPosition();
    }

    private setCharacterPosition(): void {
        setTimeout(() => {
            this.characterLayer.move();
            this.setCharacterPosition();
        }, 10);
    }

    private main() {
        this.animationFrameId = window.requestAnimationFrame(this.main.bind(this));
        this.characterLayer.draw();
    }

    private setGameSize(): void {
        document.querySelectorAll('.game-field').forEach((element) => {
            if (element.nodeName === 'CANVAS') {
                element.setAttribute('width', `${gameSize.width}px`);
                element.setAttribute('height', `${gameSize.height}px`);
            } else {
                element.setAttribute('style', `width: ${gameSize.width}px ;height: ${gameSize.height}px`);
            }
        });
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
