interface MoveDirection {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
}

interface Character {
    width: number;
    height: number;
    currentX: number;
    currentY: number;
    stepSize: number;
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
    direction: MoveDirection;
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
        currentX: 80,
        currentY: 60,
        stepSize: 1
    },
    direction: {
        up: false,
        down: false,
        left: false,
        right: false
    },
    background: {
        borderColor: '#009511',
        borderRadius: 5
    }
};

export const character: Character = game.character;
export const direction: MoveDirection = game.direction;
export const background: Background = game.background;
export const gameSize: GameSize = game.gameSize;
