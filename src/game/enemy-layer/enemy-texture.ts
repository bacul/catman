import {Texture} from '../texture/texture';
import {Enemy} from './enemies';
import {EnemyLayerContext} from './enemy-layer-context';

export class EnemyTexture extends Texture {
    private readonly image: CanvasImageSource;
    protected animationTick: number = 0;
    protected animationForwardDirection: boolean;

    constructor() {
        super();
        this.image = EnemyLayerContext.image;
    }

    draw(enemies: Enemy[]): void {
        enemies.forEach((enemy) => {
            EnemyLayerContext.context.drawImage(
                this.image,
                enemy.texture.spriteCoordinate.x,
                enemy.texture.spriteCoordinate.y,
                enemy.texture.size,
                enemy.texture.size,
                enemy.currentX,
                enemy.currentY,
                30,
                30
            );
        });
    }
}
