import {MoveDirectionType} from '../game';

export interface SpriteCoordinate {
    x: number;
    y: number;
}

export enum AnimationStateType {
    default,
    start,
    end
}

export interface TextureImage {
    size: number;
    spriteCoordinate: SpriteCoordinate;
    direction: MoveDirectionType;
    state: AnimationStateType;
}

export abstract class Texture {
    protected readonly texture: TextureImage;
    protected animationTick: number = 0;
    protected animationForwardDirection: boolean;
    private readonly animationChangeEveryTick: number = 10;

    constructor() {
        this.texture = {
            direction: MoveDirectionType.down,
            state: AnimationStateType.default,
            spriteCoordinate: {
                x: 0,
                y: 0
            },
            size: 16
        };
    }

    protected abstract draw(entityX: number, entityY: number): void;

    setLeftView(): void {
        this.texture.direction = MoveDirectionType.left;
        this.setView();
    }

    setRightView(): void {
        this.texture.direction = MoveDirectionType.right;
        this.setView();
    }

    setDownView(): void {
        this.texture.direction = MoveDirectionType.down;
        this.setView();
    }

    setUpView(): void {
        this.texture.direction = MoveDirectionType.up;
        this.setView();
    }

    private setView() {
        this.setAnimationStateType();
        this.setTextureByDirection();
    }

    private setAnimationStateType(): void {
        if (this.animationChangeEveryTick !== this.animationTick) {
            this.animationTick++;
        } else {
            this.animationTick = 0;
            if (this.texture.state === AnimationStateType.end || this.texture.state === AnimationStateType.start) {
                this.texture.state = AnimationStateType.default;
                this.animationForwardDirection = !this.animationForwardDirection;
                return;
            }
            if (this.animationForwardDirection) {
                this.texture.state = AnimationStateType.end;
            } else {
                this.texture.state = AnimationStateType.start;
            }
        }
    }

    private setTextureByDirection(): void {
        switch (this.texture.direction) {
            case MoveDirectionType.up:
                this.setUpDirection();
                break;
            case MoveDirectionType.down:
                this.setDownDirection();
                break;
            case MoveDirectionType.left:
                this.setLeftDirection();
                break;
            case MoveDirectionType.right:
                this.setRightDirection();
                break;
        }
    }

    private setUpDirection(): void {
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

    private setDownDirection(): void {
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

    private setRightDirection(): void {
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

    private setLeftDirection(): void {
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
