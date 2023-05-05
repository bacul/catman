import {Language, defaultLanguage, russianLanguage} from './language/language';

enum UIElements {
    score = 'score-header',
    howToStart = 'how-to-start',
    win = 'win-text',
    defeat = 'defeat-text',
    overlay = 'ui-layer-overlay',
    activeClass = 'active'
}

export class UILayer {
    private readonly language: Language;
    static gameStartEventName = 'game-start';

    constructor() {
        if (navigator.language === 'ru') {
            this.language = russianLanguage;
        } else {
            this.language = defaultLanguage;
        }
        document.addEventListener('keydown', UILayer.onKeyDownHandler, false);
    }

    setLanguage(): void {
        document.querySelector(`.${UIElements.score}`).innerHTML = this.language.score;
        document.querySelector(`.${UIElements.howToStart}`).innerHTML = this.language.howToStart;
        document.querySelector(`.${UIElements.win}`).innerHTML = this.language.win;
        document.querySelector(`.${UIElements.defeat}`).innerHTML = this.language.defeat;
    }

    setGameLoaded(): void {
        document.querySelector(`.${UIElements.howToStart}`).classList.add(UIElements.activeClass);
        document.querySelector(`.${UIElements.overlay}`).classList.add(UIElements.activeClass);
    }

    setGameWin(): void {
        document.querySelector(`.${UIElements.overlay}`).classList.add(UIElements.activeClass);
        document.querySelector(`.${UIElements.win}`).classList.add(UIElements.activeClass);
    }

    setGameDefeat(): void {
        document.querySelector(`.${UIElements.overlay}`).classList.add(UIElements.activeClass);
        document.querySelector(`.${UIElements.defeat}`).classList.add(UIElements.activeClass);
    }

    restart(): void {
        document.querySelector(`.${UIElements.defeat}`).classList.remove(UIElements.activeClass);
        document.addEventListener('keydown', UILayer.onKeyDownHandler, false);
    }

    private static onKeyDownHandler() {
        UILayer.setGameStart();
        document.removeEventListener('keydown', UILayer.onKeyDownHandler, false);
        document.dispatchEvent(new CustomEvent(UILayer.gameStartEventName));
    }

    private static setGameStart(): void {
        document.querySelector(`.${UIElements.howToStart}`).classList.remove(UIElements.activeClass);
        document.querySelector(`.${UIElements.overlay}`).classList.remove(UIElements.activeClass);
    }
}
