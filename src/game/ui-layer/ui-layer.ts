import {Language, defaultLanguage, russianLanguage} from './language/language';

export enum UIElements {
    score = '.score-header',
    howToStart = '.how-to-start',
    win = '.win-text',
    defeat = '.defeat-text',
    overlay = '.ui-layer-overlay',
    restart = '.restart-button'
}

enum StateClass {
    active = 'active',
    disabled = 'disabled'
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
        document.querySelector(UIElements.score).innerHTML = this.language.score;
        document.querySelector(UIElements.howToStart).innerHTML = this.language.howToStart;
        document.querySelector(UIElements.win).innerHTML = this.language.win;
        document.querySelector(UIElements.defeat).innerHTML = this.language.defeat;
        document.querySelector(UIElements.restart).innerHTML = this.language.restart;
    }

    setGameLoaded(): void {
        document.querySelector(UIElements.howToStart).classList.add(StateClass.active);
        document.querySelector(UIElements.overlay).classList.add(StateClass.active);
    }

    setGameWin(): void {
        document.querySelector(UIElements.overlay).classList.add(StateClass.active);
        document.querySelector(UIElements.win).classList.add(StateClass.active);
        document.querySelector(UIElements.restart).classList.add(StateClass.active);
    }

    setGameDefeat(): void {
        document.querySelector(UIElements.overlay).classList.add(StateClass.active);
        document.querySelector(UIElements.defeat).classList.add(StateClass.active);
        document.querySelector(UIElements.restart).classList.add(StateClass.active);
    }

    restart(): void {
        document.querySelector(UIElements.restart).setAttribute(StateClass.disabled, 'true');
        document.querySelector(UIElements.defeat).classList.remove(StateClass.active);
        document.querySelector(UIElements.win).classList.remove(StateClass.active);
        document.querySelector(UIElements.restart).classList.remove(StateClass.active);
        document.addEventListener('keydown', UILayer.onKeyDownHandler, false);
    }

    private static onKeyDownHandler() {
        UILayer.setGameStart();
        document.removeEventListener('keydown', UILayer.onKeyDownHandler, false);
        document.dispatchEvent(new CustomEvent(UILayer.gameStartEventName));
        document.querySelector(UIElements.restart).removeAttribute(StateClass.disabled);
    }

    private static setGameStart(): void {
        document.querySelector(UIElements.howToStart).classList.remove(StateClass.active);
        document.querySelector(UIElements.overlay).classList.remove(StateClass.active);
    }
}
