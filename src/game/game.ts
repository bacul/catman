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
    shiftXY: number;
}

interface Game {
    gameSize: GameSize;
    character: MovableEntity;
    background: Background;
    enemies: Enemy[];
}

const game: Game = {
    gameSize: {
        width: 605,
        height: 650,
        shiftXY: 100
    },
    background: {
        borderColor: '#007300',
        borderRadius: 5
    },
    character: {
        width: 30,
        height: 30,
        currentX: 288,
        currentY: 430,
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
            currentX: 288,
            currentY: 250,
            stepSize: 1,
            direction: {
                moveDirection: null,
                changeToDirection: null
            },
            blockDirections: [],
            color: '#999'
        }
    ]
};

export const character: MovableEntity = game.character;
export const enemies: Enemy[] = game.enemies;
export const characterDirection: MoveDirection = game.character.direction;
export const background: Background = game.background;
export const gameSize: GameSize = game.gameSize;
