import {MoveDirectionType, character, characterDirection, gameSize} from '../game';

import {FigureCollision} from '../collision/wall-collision';
import {CollectibleCollision} from '../mission-layer/collectible-collision';
import {CharacterMovement} from './character';
import {CharacterLayerContext} from './character-layer-context';
import {CharacterTexture} from './character-texture';

export class CharacterLayer {
    private readonly figureCollision: FigureCollision;
    private readonly collectibleCollision: CollectibleCollision;
    private readonly characterMovement: CharacterMovement;
    private readonly characterTexture: CharacterTexture;

    constructor() {
        this.figureCollision = new FigureCollision();
        this.collectibleCollision = new CollectibleCollision();
        this.characterMovement = new CharacterMovement();
        this.characterTexture = new CharacterTexture();
        this.characterTexture.setDownView();
    }

    move(): void {
        const needChangeMovement =
            this.characterMovement.keyPressed &&
            characterDirection.moveDirection !== characterDirection.changeToDirection;
        let canChangeMovement: boolean;
        if (needChangeMovement) {
            switch (characterDirection.changeToDirection) {
                case MoveDirectionType.up:
                    canChangeMovement = !this.figureCollision.stuckTop(character);
                    break;
                case MoveDirectionType.down:
                    canChangeMovement = !this.figureCollision.stuckBottom(character);
                    break;
                case MoveDirectionType.left:
                    canChangeMovement = !this.figureCollision.stuckLeft(character);
                    break;
                case MoveDirectionType.right:
                    canChangeMovement = !this.figureCollision.stuckRight(character);
                    break;
            }
            if (canChangeMovement) {
                characterDirection.moveDirection = characterDirection.changeToDirection;
            }
        }

        switch (characterDirection.moveDirection) {
            case MoveDirectionType.up:
                if (canChangeMovement || !this.figureCollision.stuckTop(character)) {
                    character.currentY -= character.stepSize;
                    this.characterTexture.setUpView();
                    this.collectibleCollision.collectTop();
                }
                break;
            case MoveDirectionType.down:
                if (canChangeMovement || !this.figureCollision.stuckBottom(character)) {
                    character.currentY += character.stepSize;
                    this.characterTexture.setDownView();
                    this.collectibleCollision.collectBottom();
                }
                break;
            case MoveDirectionType.left:
                if (canChangeMovement || !this.figureCollision.stuckLeft(character)) {
                    character.currentX -= character.stepSize;
                    this.characterTexture.setLeftView();
                    this.collectibleCollision.collectLeft();
                }
                break;
            case MoveDirectionType.right:
                if (canChangeMovement || !this.figureCollision.stuckRight(character)) {
                    character.currentX += character.stepSize;
                    this.characterTexture.setRightView();
                    this.collectibleCollision.collectRight();
                }
                break;
        }
    }

    draw(): void {
        CharacterLayerContext.context.clearRect(0, 0, gameSize.width, gameSize.height);
        // CharacterLayerContext.context.fillRect(
        //     character.currentX,
        //     character.currentY,
        //     character.width,
        //     character.height
        // );
        // CharacterLayerContext.context.fillStyle = character.color;
        this.characterTexture.draw();
    }
}
