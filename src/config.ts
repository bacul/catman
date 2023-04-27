export interface GameSize {
    width: number;
    height: number;
}

export interface Config {
    gameSize: GameSize;
}

export const Config: Config = {
    gameSize: {
        width: 640,
        height: 360
    }
};
