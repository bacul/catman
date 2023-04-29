export enum MoveDirectionType {
    up = 1,
    down = 2,
    left = 3,
    right = 4
}
export interface MoveDirection {
    moveDirection: MoveDirectionType;
    changeToDirection: MoveDirectionType;
}

interface Character {
    width: number;
    height: number;
    currentX: number;
    currentY: number;
    stepSize: number;
    direction: MoveDirection;
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
    character: Character;
    background: Background;
}

const game: Game = {
    gameSize: {
        width: 480,
        height: 600
    },
    character: {
        width: 30,
        height: 30,
        currentX: 0,
        currentY: 0,
        stepSize: 1,
        direction: {
            moveDirection: null,
            changeToDirection: null
        }
    },
    background: {
        borderColor: '#009511',
        borderRadius: 5
    }
};

export const character: Character = game.character;
export const direction: MoveDirection = game.character.direction;
export const background: Background = game.background;
export const gameSize: GameSize = game.gameSize;
