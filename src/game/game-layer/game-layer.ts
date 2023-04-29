import {character, direction, gameSize} from '../game';

import {CharacterMovement} from './character';
import {GameLayerContext} from './game-layer-context';
import {FigureCollision} from './wall-collision';

export class GameLayer {
    private readonly figureCollision: FigureCollision;
    private readonly characterMovement: CharacterMovement;

    constructor() {
        this.figureCollision = new FigureCollision();
        this.characterMovement = new CharacterMovement();
        document.addEventListener('keydown', this.characterMovement.changeDirectionHandler, false);
    }

    draw() {
        GameLayerContext.context.clearRect(0, 0, gameSize.width, gameSize.height);
        GameLayerContext.context.fillRect(character.currentX, character.currentY, character.width, character.height);
        GameLayerContext.context.fillStyle = '#0095DD';

        if (direction.up) {
            if (character.currentY > 0) {
                if (!this.figureCollision.stuckTop()) {
                    character.currentY -= character.stepSize;
                }
            }
            this.characterMovement.setUpView();
        } else if (direction.down) {
            if (character.currentY < gameSize.height - character.height) {
                if (!this.figureCollision.stuckBottom()) {
                    character.currentY += character.stepSize;
                }
            }
            this.characterMovement.setDownView();
        } else if (direction.left) {
            if (character.currentX > 0) {
                if (!this.figureCollision.stuckLeft()) {
                    character.currentX -= character.stepSize;
                }
            }
            this.characterMovement.setLeftView();
        } else if (direction.right) {
            if (character.currentX < gameSize.width - character.width) {
                if (!this.figureCollision.stuckRight()) {
                    character.currentX += character.stepSize;
                }
            }
            this.characterMovement.setRightView();
        }
    }
}
