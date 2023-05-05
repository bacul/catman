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

export interface Collectible {
    radius: number;
    сolor: string;
}

interface Game {
    gameSize: GameSize;
    character: MovableEntity;
    background: Background;
    enemies: Enemy[];
    collectible: Collectible;
    powerUp: Collectible;
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
        }
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
            blockDirections: []
        }
    ],
    collectible: {
        radius: 3,
        сolor: '#ffb04b'
    },
    powerUp: {
        radius: 7,
        сolor: '#ffe04b'
    }
};

export const character: MovableEntity = game.character;
export const enemies: Enemy[] = game.enemies;
export const characterDirection: MoveDirection = game.character.direction;
export const background: Background = game.background;
export const gameSize: GameSize = game.gameSize;
export const collectible: Collectible = game.collectible;
export const powerUp: Collectible = game.powerUp;
