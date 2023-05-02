import {AnimationStateType, Texture} from '../texture/texture';

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
