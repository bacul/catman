import {AnimationStateType, Texture} from '../texture/texture';

import {character} from '../game';
import {CharacterLayerContext} from './character-layer-context';

export class CharacterTexture extends Texture {
    private readonly image: CanvasImageSource;

    constructor() {
        super();
        this.image = CharacterLayerContext.image;
    }

    draw(): void {
        CharacterLayerContext.context.drawImage(
            this.image,
            this.texture.spriteCoordinate.x,
            this.texture.spriteCoordinate.y,
            this.texture.size,
            this.texture.size,
            character.currentX,
            character.currentY,
            30,
            30
        );
    }

    setUpDirection(): void {
        switch (this.texture.state) {
            case AnimationStateType.default:
                this.texture.spriteCoordinate.x = 16;
                this.texture.spriteCoordinate.y = 0;
                break;
            case AnimationStateType.start:
                this.texture.spriteCoordinate.x = 16;
                this.texture.spriteCoordinate.y = 16;
                break;
            case AnimationStateType.end:
                this.texture.spriteCoordinate.x = 16;
                this.texture.spriteCoordinate.y = 32;
                break;
        }
    }

    setDownDirection(): void {
        switch (this.texture.state) {
            case AnimationStateType.default:
                this.texture.spriteCoordinate.x = 0;
                this.texture.spriteCoordinate.y = 0;
                break;
            case AnimationStateType.start:
                this.texture.spriteCoordinate.x = 0;
                this.texture.spriteCoordinate.y = 16;
                break;
            case AnimationStateType.end:
                this.texture.spriteCoordinate.x = 0;
                this.texture.spriteCoordinate.y = 32;
                break;
        }
    }

    setRightDirection(): void {
        switch (this.texture.state) {
            case AnimationStateType.default:
                this.texture.spriteCoordinate.x = 32;
                this.texture.spriteCoordinate.y = 0;
                break;
            case AnimationStateType.start:
                this.texture.spriteCoordinate.x = 32;
                this.texture.spriteCoordinate.y = 16;
                break;
            case AnimationStateType.end:
                this.texture.spriteCoordinate.x = 32;
                this.texture.spriteCoordinate.y = 32;
                break;
        }
    }

    setLeftDirection(): void {
        switch (this.texture.state) {
            case AnimationStateType.default:
                this.texture.spriteCoordinate.x = 48;
                this.texture.spriteCoordinate.y = 0;
                break;
            case AnimationStateType.start:
                this.texture.spriteCoordinate.x = 48;
                this.texture.spriteCoordinate.y = 16;
                break;
            case AnimationStateType.end:
                this.texture.spriteCoordinate.x = 48;
                this.texture.spriteCoordinate.y = 32;
                break;
        }
    }
}
