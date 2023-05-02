export class CharacterLayerContext {
    private static _characterImage: CanvasImageSource;
    private static _context: CanvasRenderingContext2D;

    constructor() {
        const characterLayerCanvas: HTMLCanvasElement = document.querySelector('#character-layer');
        CharacterLayerContext._context = characterLayerCanvas.getContext('2d');
        CharacterLayerContext._characterImage = document.getElementById('character') as CanvasImageSource;
    }

    static get context(): CanvasRenderingContext2D {
        return CharacterLayerContext._context;
    }

    static get characterImage(): CanvasImageSource {
        return CharacterLayerContext._characterImage;
    }
}
new CharacterLayerContext();
