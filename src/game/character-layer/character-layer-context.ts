export class CharacterLayerContext {
    private static _image: CanvasImageSource;
    private static _context: CanvasRenderingContext2D;

    constructor() {
        const characterLayerCanvas: HTMLCanvasElement = document.querySelector('#character-layer');
        CharacterLayerContext._context = characterLayerCanvas.getContext('2d');
        CharacterLayerContext._image = document.getElementById('character') as CanvasImageSource;
    }

    static get context(): CanvasRenderingContext2D {
        return CharacterLayerContext._context;
    }

    static get image(): CanvasImageSource {
        return CharacterLayerContext._image;
    }
}
new CharacterLayerContext();
