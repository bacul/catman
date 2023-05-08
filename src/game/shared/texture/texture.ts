import {MovableEntity, MoveDirectionType} from '../movable-entity';

export interface SpriteCoordinate {
    x: number;
    y: number;
}

export enum AnimationStateType {
    default,
    start,
    end
}

export interface TextureModel {
    size: number;
    spriteCoordinate: SpriteCoordinate;
    direction: MoveDirectionType;
    state: AnimationStateType;
}

export abstract class Texture {
    protected animationTick: number = 0;
    protected animationForwardDirection: boolean;
    private readonly animationChangeEveryTick: number = 10;

    setLeftView(movableEntity: MovableEntity): void {
        movableEntity.texture.direction = MoveDirectionType.left;
        this.setView(movableEntity);
    }

    setRightView(movableEntity: MovableEntity): void {
        movableEntity.texture.direction = MoveDirectionType.right;
        this.setView(movableEntity);
    }

    setDownView(movableEntity: MovableEntity): void {
        movableEntity.texture.direction = MoveDirectionType.down;
        this.setView(movableEntity);
    }

    setUpView(movableEntity: MovableEntity): void {
        movableEntity.texture.direction = MoveDirectionType.up;
        this.setView(movableEntity);
    }

    private setView(movableEntity: MovableEntity): void {
        this.setAnimationState(movableEntity);
        this.setTexture(movableEntity);
    }

    private setAnimationState(movableEntity: MovableEntity): void {
        if (this.animationChangeEveryTick !== this.animationTick) {
            this.animationTick++;
        } else {
            this.animationTick = 0;
            if (
                movableEntity.texture.state === AnimationStateType.end ||
                movableEntity.texture.state === AnimationStateType.start
            ) {
                movableEntity.texture.state = AnimationStateType.default;
                this.animationForwardDirection = !this.animationForwardDirection;
                return;
            }
            if (this.animationForwardDirection) {
                movableEntity.texture.state = AnimationStateType.end;
            } else {
                movableEntity.texture.state = AnimationStateType.start;
            }
        }
    }

    private setTexture(movableEntity: MovableEntity): void {
        switch (movableEntity.texture.direction) {
            case MoveDirectionType.up:
                this.setUpTexture(movableEntity);
                break;
            case MoveDirectionType.down:
                this.setDownTexture(movableEntity);
                break;
            case MoveDirectionType.left:
                this.setLeftTexture(movableEntity);
                break;
            case MoveDirectionType.right:
                this.setRightTexture(movableEntity);
                break;
        }
    }

    private setUpTexture(movableEntity: MovableEntity): void {
        switch (movableEntity.texture.state) {
            case AnimationStateType.default:
                movableEntity.texture.spriteCoordinate.x = 16;
                movableEntity.texture.spriteCoordinate.y = 0;
                break;
            case AnimationStateType.start:
                movableEntity.texture.spriteCoordinate.x = 16;
                movableEntity.texture.spriteCoordinate.y = 16;
                break;
            case AnimationStateType.end:
                movableEntity.texture.spriteCoordinate.x = 16;
                movableEntity.texture.spriteCoordinate.y = 32;
                break;
        }
    }

    private setDownTexture(movableEntity: MovableEntity): void {
        switch (movableEntity.texture.state) {
            case AnimationStateType.default:
                movableEntity.texture.spriteCoordinate.x = 0;
                movableEntity.texture.spriteCoordinate.y = 0;
                break;
            case AnimationStateType.start:
                movableEntity.texture.spriteCoordinate.x = 0;
                movableEntity.texture.spriteCoordinate.y = 16;
                break;
            case AnimationStateType.end:
                movableEntity.texture.spriteCoordinate.x = 0;
                movableEntity.texture.spriteCoordinate.y = 32;
                break;
        }
    }

    private setRightTexture(movableEntity: MovableEntity): void {
        switch (movableEntity.texture.state) {
            case AnimationStateType.default:
                movableEntity.texture.spriteCoordinate.x = 32;
                movableEntity.texture.spriteCoordinate.y = 0;
                break;
            case AnimationStateType.start:
                movableEntity.texture.spriteCoordinate.x = 32;
                movableEntity.texture.spriteCoordinate.y = 16;
                break;
            case AnimationStateType.end:
                movableEntity.texture.spriteCoordinate.x = 32;
                movableEntity.texture.spriteCoordinate.y = 32;
                break;
        }
    }

    private setLeftTexture(movableEntity: MovableEntity): void {
        switch (movableEntity.texture.state) {
            case AnimationStateType.default:
                movableEntity.texture.spriteCoordinate.x = 48;
                movableEntity.texture.spriteCoordinate.y = 0;
                break;
            case AnimationStateType.start:
                movableEntity.texture.spriteCoordinate.x = 48;
                movableEntity.texture.spriteCoordinate.y = 16;
                break;
            case AnimationStateType.end:
                movableEntity.texture.spriteCoordinate.x = 48;
                movableEntity.texture.spriteCoordinate.y = 32;
                break;
        }
    }
}
