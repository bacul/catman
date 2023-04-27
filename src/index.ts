import {BackgroundLayer} from './game/background-layer/background-layer';
import {character} from './game/game';
import {GameLayer} from './game/game-layer/game-layer';

const gameLayer = new GameLayer();
const backgroundLayer = new BackgroundLayer();

backgroundLayer.drawWalls();

let animationFrameId: number;

function main(): void {
    animationFrameId = window.requestAnimationFrame(main);
    gameLayer.draw();
}
main();

window.document.querySelector('#stop').addEventListener('click', stop);
window.document.addEventListener('keydown', stop);

function stop(event: Event): void {
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
