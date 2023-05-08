import {MovableEntity} from '../game-model';
import {Texture} from '../shared/texture/texture';
import {CharacterLayerContext} from './character-layer-context';

export class CharacterTexture extends Texture {
    private readonly image: CanvasImageSource;

    constructor() {
        super();
        this.image = CharacterLayerContext.image;
    }

    draw(character: MovableEntity): void {
        CharacterLayerContext.context.drawImage(
            this.image,
            character.texture.spriteCoordinate.x,
            character.texture.spriteCoordinate.y,
            character.texture.size,
            character.texture.size,
            character.currentX,
            character.currentY,
            30,
            30
        );
    }
}
