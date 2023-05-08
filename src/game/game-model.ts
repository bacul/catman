export interface MovableEntityModel {
    width: number;
    height: number;
    currentX: number;
    currentY: number;
    stepSize: number;
    startPositionX: number;
    startPositionY: number;
}
interface BackgroundModel {
    borderColor: string;
    borderRadius: number;
}

interface GameSizeModel {
    width: number;
    height: number;
    shiftXY: number;
}

export interface CollectibleModel {
    radius: number;
    сolor: string;
}

interface GameModel {
    gameSizeModel: GameSizeModel;
    characterModel: MovableEntityModel;
    enemyModel: MovableEntityModel;
    backgroundModel: BackgroundModel;
    collectibleModel: CollectibleModel;
    powerUpModel: CollectibleModel;
}

const gameModel: GameModel = {
    gameSizeModel: {
        width: 605,
        height: 650,
        shiftXY: 100
    },
    backgroundModel: {
        borderColor: '#007300',
        borderRadius: 5
    },
    characterModel: {
        width: 30,
        height: 30,
        currentX: 288,
        currentY: 430,
        startPositionX: 288,
        startPositionY: 430,
        stepSize: 1
    },
    enemyModel: {
        width: 30,
        height: 30,
        currentX: 288,
        currentY: 250,
        startPositionX: 288,
        startPositionY: 250,
        stepSize: 1
    },
    collectibleModel: {
        radius: 3,
        сolor: '#ffb04b'
    },
    powerUpModel: {
        radius: 7,
        сolor: '#ffe04b'
    }
};

export const characterModel: MovableEntityModel = gameModel.characterModel;
export const enemyModel: MovableEntityModel = gameModel.enemyModel;
export const backgroundModel: BackgroundModel = gameModel.backgroundModel;
export const gameSizeModel: GameSizeModel = gameModel.gameSizeModel;
export const collectibleModel: CollectibleModel = gameModel.collectibleModel;
export const powerUpModel: CollectibleModel = gameModel.powerUpModel;
