import {MoveDirection, MoveDirectionType} from '../game';

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

export interface Character {
    width: number;
    height: number;
    currentX: number;
    currentY: number;
    startPositionX: number;
    startPositionY: number;
    stepSize: number;
    direction: MoveDirection;
}

export const character: Character = {
    width: 30,
    height: 30,
    currentX: 288,
    currentY: 430,
    startPositionX: 288,
    startPositionY: 430,
    stepSize: 1,
    direction: {
        moveDirection: null,
        changeToDirection: null
    }
};
export const characterDirection: MoveDirection = character.direction;

export class CharacterMovement {
    private _keyPressed: boolean;

    constructor() {
        document.addEventListener('keydown', this.onKeyPressed.bind(this), false);
        document.addEventListener('keyup', () => (this._keyPressed = false), false);
    }

    get keyPressed(): boolean {
        return this._keyPressed;
    }

    private onKeyPressed(event: KeyboardEvent): void {
        this._keyPressed = true;
        if (!event.repeat) {
            if (event.code === ControlKey.w || event.code === ControlKey.arrowUp) {
                if (characterDirection.changeToDirection !== MoveDirectionType.up) {
                    this.setChangeDirection(MoveDirectionType.up);
                }
                return;
            }

            if (event.code === ControlKey.s || event.code === ControlKey.arrowDown) {
                if (characterDirection.changeToDirection !== MoveDirectionType.down) {
                    this.setChangeDirection(MoveDirectionType.down);
                }
                return;
            }

            if (event.code === ControlKey.a || event.code === ControlKey.arrowLeft) {
                if (characterDirection.changeToDirection !== MoveDirectionType.left) {
                    this.setChangeDirection(MoveDirectionType.left);
                }
                return;
            }

            if (event.code === ControlKey.d || event.code === ControlKey.arrowRight) {
                if (characterDirection.changeToDirection !== MoveDirectionType.right) {
                    this.setChangeDirection(MoveDirectionType.right);
                }
                return;
            }
        }
    }

    private setChangeDirection(type: MoveDirectionType): void {
        characterDirection.changeToDirection = type;
    }
}
