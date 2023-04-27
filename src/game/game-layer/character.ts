import {character, direction} from '../game';

import {GameLayerContext} from './game-layer-context';

enum ControlKey {
    arrowUp = 'ArrowUp',
    arrowDown = 'ArrowDown',
    arrowLeft = 'ArrowLeft',
    arrowRight = 'ArrowRight',
    w = 'KeyW',
    s = 'KeyS',
    a = 'KeyA',
    d = 'KeyD'
}

export class CharacterMovement {
    setLeftView(): void {
        this.setView(50, 48);
    }

    setRightView(): void {
        this.setView(50, 96);
    }

    setDownView(): void {
        this.setView(50, 2);
    }

    setUpView(): void {
        this.setView(50, 142);
    }

    changeDirectionHandler(event: KeyboardEvent): void {
        direction.up = false;
        direction.down = false;
        direction.left = false;
        direction.right = false;

        if (event.code === ControlKey.w || event.code === ControlKey.arrowUp) {
            direction.up = true;
        }

        if (event.code === ControlKey.s || event.code === ControlKey.arrowDown) {
            direction.down = true;
        }

        if (event.code === ControlKey.a || event.code === ControlKey.arrowLeft) {
            direction.left = true;
        }

        if (event.code === ControlKey.d || event.code === ControlKey.arrowRight) {
            direction.right = true;
        }
    }

    private setView(spritePositionX: number, spritePositionY: number) {
        GameLayerContext.context.drawImage(
            GameLayerContext.characterImage,
            spritePositionX,
            spritePositionY,
            50,
            50,
            character.currentX - 6,
            character.currentY - 7,
            50,
            50
        );
    }
}
