export class GameLayerContext {
    private static _characterImage: CanvasImageSource;
    private static _context: CanvasRenderingContext2D;

    constructor() {
        const gameLayerCanvas: HTMLCanvasElement = document.querySelector('#game-layer');
        GameLayerContext._context = gameLayerCanvas.getContext('2d');
        GameLayerContext._characterImage = document.getElementById('mainCharacter') as CanvasImageSource;
    }

    static get context(): CanvasRenderingContext2D {
        return GameLayerContext._context;
    }

    static get characterImage(): CanvasImageSource {
        return GameLayerContext._characterImage;
    }
}
new GameLayerContext();
