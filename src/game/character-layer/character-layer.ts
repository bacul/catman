import {MoveDirectionType, character, direction, gameSize} from '../game';

import {CollectibleCollision} from '../mission-layer/collectible-collision';
import {CharacterMovement} from './character';
import {CharacterLayerContext} from './character-layer-context';
import {FigureCollision} from './wall-collision';

export class CharacterLayer {
    private readonly figureCollision: FigureCollision;
    private readonly collectibleCollision: CollectibleCollision;
    private readonly characterMovement: CharacterMovement;

    constructor() {
        this.figureCollision = new FigureCollision();
        this.collectibleCollision = new CollectibleCollision();
        this.characterMovement = new CharacterMovement();
    }

    move(): void {
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
                    this.collectibleCollision.collectTop();
                }
                break;
            case MoveDirectionType.down:
                if (canChangeMovement || !this.figureCollision.stuckBottom()) {
                    character.currentY += character.stepSize;
                    this.collectibleCollision.collectBottom();
                }
                break;
            case MoveDirectionType.left:
                if (canChangeMovement || !this.figureCollision.stuckLeft()) {
                    character.currentX -= character.stepSize;
                    this.collectibleCollision.collectLeft();
                }
                break;
            case MoveDirectionType.right:
                if (canChangeMovement || !this.figureCollision.stuckRight()) {
                    character.currentX += character.stepSize;
                    this.collectibleCollision.collectRight();
                }
                break;
        }
    }

    draw(): void {
        CharacterLayerContext.context.clearRect(0, 0, gameSize.width, gameSize.height);
        CharacterLayerContext.context.fillRect(
            character.currentX,
            character.currentY,
            character.width,
            character.height
        );
        CharacterLayerContext.context.fillStyle = '#0095DD';
    }
}
