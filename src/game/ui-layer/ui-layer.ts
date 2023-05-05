import {Language, defaultLanguage, russianLanguage} from './language/language';

enum UIElements {
    score = 'score-header',
    howToStart = 'state-how-to-start-text',
    overlay = 'ui-layer-overlay',

    activeClass = 'active'
}

export class UILayer {
    private readonly language: Language;

    constructor() {
        if (navigator.language === 'ru') {
            this.language = russianLanguage;
        } else {
            this.language = defaultLanguage;
        }
    }

    startSequencePromise$(): Promise<void> {
        return new Promise((resolve) => {
            const onKeyDownHandler = () => {
                this.setGameStart();
                resolve();
                document.removeEventListener('keydown', onKeyDownHandler, false);
            };
            document.addEventListener('keydown', onKeyDownHandler, false);
        });
    }

    setLanguage(): void {
        document.querySelector(`.${UIElements.score}`).innerHTML = this.language.score;
        document.querySelector(`.${UIElements.howToStart}`).innerHTML = this.language.howToStart;
    }

    setGameLoaded(): void {
        document.querySelector(`.${UIElements.howToStart}`).classList.add(UIElements.activeClass);
        document.querySelector(`.${UIElements.overlay}`).classList.add(UIElements.activeClass);
    }

    setGameStart(): void {
        document.querySelector(`.${UIElements.howToStart}`).classList.remove(UIElements.activeClass);
        document.querySelector(`.${UIElements.overlay}`).classList.remove(UIElements.activeClass);
    }

    private setStartSequence(): void {}
}
