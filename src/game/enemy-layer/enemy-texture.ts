import {Texture} from '../texture/texture';

import {EnemyLayerContext} from './enemy-layer-context';

export class EnemyTexture extends Texture {
    private readonly image: CanvasImageSource;

    constructor() {
        super();
        this.image = EnemyLayerContext.image;
    }

    draw(x: number, y: number): void {
        EnemyLayerContext.context.drawImage(
            this.image,
            this.texture.spriteCoordinate.x,
            this.texture.spriteCoordinate.y,
            this.texture.size,
            this.texture.size,
            x,
            y,
            30,
            30
        );
    }
}
