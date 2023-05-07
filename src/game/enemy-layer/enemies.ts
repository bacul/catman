import {MovableEntityModel, MoveDirection, MoveDirectionType} from '../game';

export interface Enemy extends MovableEntityModel {
    blockDirections: MoveDirectionType[];
    direction: MoveDirection;
}

export const enemies: Enemy[] = [
    {
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
        blockDirections: []
    }
];
