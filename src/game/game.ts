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

interface Game {
    character: Character;
    /** TODO нужно ли это вообще */
    sprite: any;
    direction: MoveDirection;
}

const game: Game = {
    character: {
        width: 32,
        height: 42,
        currentX: 0,
        currentY: 0,
        stepSize: 1
    },
    /** TODO нужно ли это вообще */
    sprite: {
        spriteWith: 144,
        spriteHeight: 192
    },
    direction: {
        up: false,
        down: false,
        left: false,
        right: false
    }
};

export const character: Character = game.character;
export const direction: MoveDirection = game.direction;
