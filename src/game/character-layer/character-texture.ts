import {Texture} from '../texture/texture';

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
}
