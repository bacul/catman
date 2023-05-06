import {MoveDirectionType, character, characterDirection, gameSize} from '../game';

import {State} from '../../application-state';
import {CharacterLayerContext} from './character-layer-context';

export class CharacterLayer {
    constructor() {
        State.characterTexture.setDownView();
    }

    move(): void {
        const needChangeMovement =
            State.characterMovement.keyPressed &&
            characterDirection.moveDirection !== characterDirection.changeToDirection;
        let canChangeMovement: boolean;
        if (needChangeMovement) {
            switch (characterDirection.changeToDirection) {
                case MoveDirectionType.up:
                    canChangeMovement = !State.figureCollision.stuckTop(character);
                    break;
                case MoveDirectionType.down:
                    canChangeMovement = !State.figureCollision.stuckBottom(character);
                    break;
                case MoveDirectionType.left:
                    canChangeMovement = !State.figureCollision.stuckLeft(character);
                    break;
                case MoveDirectionType.right:
                    canChangeMovement = !State.figureCollision.stuckRight(character);
                    break;
            }
            if (canChangeMovement) {
                characterDirection.moveDirection = characterDirection.changeToDirection;
            }
        }

        switch (characterDirection.moveDirection) {
            case MoveDirectionType.up:
                if (canChangeMovement || !State.figureCollision.stuckTop(character)) {
                    character.currentY -= character.stepSize;
                    State.characterTexture.setUpView();
                    State.collectibleCollision.collectTop();
                }
                break;
            case MoveDirectionType.down:
                if (canChangeMovement || !State.figureCollision.stuckBottom(character)) {
                    character.currentY += character.stepSize;
                    State.characterTexture.setDownView();
                    State.collectibleCollision.collectBottom();
                }
                break;
            case MoveDirectionType.left:
                if (canChangeMovement || !State.figureCollision.stuckLeft(character)) {
                    character.currentX -= character.stepSize;
                    State.characterTexture.setLeftView();
                    State.collectibleCollision.collectLeft();
                    if (State.figureCollision.isInLeftTunnel(character)) {
                        State.figureCollision.setWalkThroughLeftTunnel(character);
                    }
                }
                break;
            case MoveDirectionType.right:
                if (canChangeMovement || !State.figureCollision.stuckRight(character)) {
                    character.currentX += character.stepSize;
                    State.characterTexture.setRightView();
                    State.collectibleCollision.collectRight();
                    if (State.figureCollision.isInRightTunnel(character)) {
                        State.figureCollision.setWalkThroughRightTunnel(character);
                    }
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
        State.characterTexture.draw();
    }
}
