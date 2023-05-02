export class EnemyLayerContext {
    private static _image: CanvasImageSource;
    private static _context: CanvasRenderingContext2D;

    constructor() {
        const characterLayerCanvas: HTMLCanvasElement = document.querySelector('#enemy-layer');
        EnemyLayerContext._context = characterLayerCanvas.getContext('2d');
        EnemyLayerContext._image = document.getElementById('enemy') as CanvasImageSource;
    }

    static get context(): CanvasRenderingContext2D {
        return EnemyLayerContext._context;
    }

    static get image(): CanvasImageSource {
        return EnemyLayerContext._image;
    }
}
new EnemyLayerContext();
