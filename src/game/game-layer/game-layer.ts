import {MoveDirectionType, character, direction, gameSize} from '../game';

import {CharacterMovement} from './character';
import {GameLayerContext} from './game-layer-context';
import {FigureCollision} from './wall-collision';

export class GameLayer {
    private readonly figureCollision: FigureCollision;
    private readonly characterMovement: CharacterMovement;

    constructor() {
        this.figureCollision = new FigureCollision();
        this.characterMovement = new CharacterMovement();
    }

    draw() {
        GameLayerContext.context.clearRect(0, 0, gameSize.width, gameSize.height);
        GameLayerContext.context.fillRect(character.currentX, character.currentY, character.width, character.height);
        GameLayerContext.context.fillStyle = '#0095DD';

        const needChangeMovement =
            this.characterMovement.keyPressed && direction.moveDirection !== direction.changeToDirection;
        let canChangeMovement: boolean;
        if (needChangeMovement) {
            switch (direction.changeToDirection) {
                case MoveDirectionType.up:
                    canChangeMovement = !this.figureCollision.stuckTop();
                    break;
                case MoveDirectionType.down:
                    canChangeMovement = !this.figureCollision.stuckBottom();
                    break;
                case MoveDirectionType.left:
                    canChangeMovement = !this.figureCollision.stuckLeft();
                    break;
                case MoveDirectionType.right:
                    canChangeMovement = !this.figureCollision.stuckRight();
                    break;
            }
            if (canChangeMovement) {
                direction.moveDirection = direction.changeToDirection;
            }
        }

        switch (direction.moveDirection) {
            case MoveDirectionType.up:
                if (canChangeMovement || !this.figureCollision.stuckTop()) {
                    character.currentY -= character.stepSize;
                }
                break;
            case MoveDirectionType.down:
                if (canChangeMovement || !this.figureCollision.stuckBottom()) {
                    character.currentY += character.stepSize;
                }
                break;
            case MoveDirectionType.left:
                if (canChangeMovement || !this.figureCollision.stuckLeft()) {
                    character.currentX -= character.stepSize;
                }
                break;
            case MoveDirectionType.right:
                if (canChangeMovement || !this.figureCollision.stuckRight()) {
                    character.currentX += character.stepSize;
                }
                break;
        }
    }
}
