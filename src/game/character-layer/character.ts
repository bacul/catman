import {MovableEntity, MoveDirection, MoveDirectionType} from '../shared/movable-entity';

import {AnimationStateType} from '../shared/texture/texture';

export const character: MovableEntity = {
    width: 30,
    height: 30,
    currentX: 288,
    currentY: 430,
    startPositionX: 288,
    startPositionY: 430,
    stepSize: 1,
    direction: {
        moveDirection: null,
        changeToDirection: null
    },
    texture: {
        direction: MoveDirectionType.down,
        state: AnimationStateType.default,
        spriteCoordinate: {
            x: 0,
            y: 0
        },
        size: 16
    }
};

export const characterDirection: MoveDirection = character.direction;
