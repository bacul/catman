import {MoveDirectionType, characterDirection} from '../game';

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

    constructor() {
        document.addEventListener('keydown', this.onKeyPressed.bind(this), false);
        document.addEventListener('keyup', () => (this._keyPressed = false), false);
    }

    setLeftView(): void {
        // this.setView(50, 48);
    }

    setRightView(): void {
        // this.setView(50, 96);
    }

    setDownView(): void {
        // this.setView(50, 2);
    }

    setUpView(): void {
        // this.setView(50, 142);
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

    private setView(spritePositionX: number, spritePositionY: number) {
        // TODO найти квадратные спрайты
        // CharacterLayerContext.context.drawImage(
        //     CharacterLayerContext.characterImage,
        //     spritePositionX,
        //     spritePositionY,
        //     50,
        //     50,
        //     character.currentX - 6,
        //     character.currentY - 7,
        //     50,
        //     50
        // );
    }
}
