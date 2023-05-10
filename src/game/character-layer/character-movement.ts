import {MoveDirectionType} from '../shared/movable-entity';
import {characterDirection} from './character';

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
    private _keyPressed: boolean;
    private keyPressTimeoutId: NodeJS.Timer;
    private readonly intentionDurationMs: number = 800;

    constructor() {
        document.addEventListener('keydown', this.onKeyPressed.bind(this), false);
        document.addEventListener(
            'keyup',
            () => {
                clearTimeout(this.keyPressTimeoutId);
                this.keyPressTimeoutId = setTimeout(() => (this._keyPressed = false), this.intentionDurationMs);
            },
            false
        );
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
