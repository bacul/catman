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

export interface MovableEntity {
    width: number;
    height: number;
    currentX: number;
    currentY: number;
    stepSize: number;
    direction: MoveDirection;
    color: string;
}

export interface Enemy extends MovableEntity {
    blockDirections: MoveDirectionType[];
}

interface Background {
    borderColor: string;
    borderRadius: number;
}

interface GameSize {
    width: number;
    height: number;
}

interface Game {
    gameSize: GameSize;
    character: MovableEntity;
    background: Background;
    enemies: Enemy[];
}

const game: Game = {
    gameSize: {
        width: 480,
        height: 600
    },
    background: {
        borderColor: '#009511',
        borderRadius: 5
    },
    character: {
        width: 30,
        height: 30,
        currentX: 250,
        currentY: 0,
        stepSize: 1,
        direction: {
            moveDirection: null,
            changeToDirection: null
        },
        color: '#0095DD'
    },
    enemies: [
        {
            width: 30,
            height: 30,
            currentX: 200,
            currentY: 0,
            stepSize: 1,
            direction: {
                moveDirection: null,
                changeToDirection: null
            },
            blockDirections: [],
            color: '#9500DD'
        }
    ]
};

export const character: MovableEntity = game.character;
export const enemies: Enemy[] = game.enemies;
export const characterDirection: MoveDirection = game.character.direction;
export const background: Background = game.background;
export const gameSize: GameSize = game.gameSize;
