import {MovableEntity, MoveDirectionType} from '../game';

import {AnimationStateType} from '../texture/texture';

export interface Enemy extends MovableEntity {
    blockDirections: MoveDirectionType[];
}

export function getNewEnemy(): Enemy {
    return {
        width: 30,
        height: 30,
        currentX: 288,
        currentY: 250,
        startPositionX: 288,
        startPositionY: 250,
        stepSize: 1,
        direction: {
            moveDirection: null,
            changeToDirection: null
        },
        blockDirections: [],
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
}

export const enemies: Enemy[] = [getNewEnemy()];
