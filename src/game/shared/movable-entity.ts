import {MovableEntityModel} from '../game-model';
import {TextureModel} from './texture/texture';

export enum MoveDirectionType {
    up = 1,
    down = 2,
    left = 3,
    right = 4
}

export interface MoveDirection {
    changeToDirection: MoveDirectionType;
    moveDirection: MoveDirectionType;
}

export interface MovableEntity extends MovableEntityModel {
    texture: TextureModel;
    direction: MoveDirection;
}
