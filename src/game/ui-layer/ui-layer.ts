import {Language, defaultLanguage, russianLanguage} from './language/language';

import {State} from '../../application-state';

export enum UIElements {
    score = '.score-header',
    howToStart = '.how-to-start',
    win = '.win-text',
    defeat = '.defeat-text',
    overlay = '.ui-layer-overlay',
    restart = '.restart-button',
    powerUp = '.power-up',
    modal = '.modal',
    aboutButton = '.about-button',
    aboutModal = '.about-modal',
    aboutModalHeader = '.about-modal-header',
    aboutModalDeveloper = '.about-modal-developer',
    aboutModalAsset = '.about-modal-asset'
}

export enum ElementStateClass {
    active = 'active',
    disabled = 'disabled'
}

export class UILayer {
    private readonly language: Language;

    constructor() {
        if (navigator.language === 'ru') {
            this.language = russianLanguage;
        } else {
            this.language = defaultLanguage;
        }
        document.addEventListener('keydown', UILayer.onKeyDownHandler, false);
        document.addEventListener('keydown', this.hideModal, false);
        document.querySelector(UIElements.aboutButton).addEventListener('click', this.toggleAboutModal);
    }

    setLanguage(): void {
        document.querySelector(UIElements.score).innerHTML = this.language.score;
        document.querySelector(UIElements.howToStart).innerHTML = this.language.howToStart;
        document.querySelector(UIElements.win).innerHTML = this.language.win;
        document.querySelector(UIElements.defeat).innerHTML = this.language.defeat;
        document.querySelector(UIElements.restart).innerHTML = this.language.restart;
        document.querySelector(UIElements.aboutButton).innerHTML = this.language.aboutButton;
        document.querySelector(UIElements.aboutModalHeader).innerHTML = this.language.aboutModalHeader;
        document.querySelector(UIElements.aboutModalDeveloper).innerHTML = this.language.aboutModalDeveloper;
        document.querySelector(UIElements.aboutModalAsset).innerHTML = this.language.aboutModalAsset;
    }

    setGameLoaded(): void {
        document.querySelector(UIElements.howToStart).classList.add(ElementStateClass.active);
        document.querySelector(UIElements.overlay).classList.add(ElementStateClass.active);
    }

    setGameWin(): void {
        document.querySelector(UIElements.overlay).classList.add(ElementStateClass.active);
        document.querySelector(UIElements.win).classList.add(ElementStateClass.active);
        document.querySelector(UIElements.restart).classList.add(ElementStateClass.active);
    }

    setGameDefeat(): void {
        document.querySelector(UIElements.overlay).classList.add(ElementStateClass.active);
        document.querySelector(UIElements.defeat).classList.add(ElementStateClass.active);
        document.querySelector(UIElements.restart).classList.add(ElementStateClass.active);
    }

    restart(): void {
        document.querySelector(UIElements.restart).setAttribute(ElementStateClass.disabled, 'true');
        document.querySelector(UIElements.defeat).classList.remove(ElementStateClass.active);
        document.querySelector(UIElements.win).classList.remove(ElementStateClass.active);
        document.querySelector(UIElements.restart).classList.remove(ElementStateClass.active);
        document.addEventListener('keydown', UILayer.onKeyDownHandler, false);
        this.setGameLoaded();
    }

    toggleAboutModal(): void {
        document.querySelector(UIElements.aboutModal).classList.toggle(ElementStateClass.active);
    }

    hideModal(event: KeyboardEvent): void {
        if (event.code === 'Escape') {
            document.querySelector(UIElements.modal).classList.remove(ElementStateClass.active);
        }
    }

    private static onKeyDownHandler() {
        const modalOpen = document.querySelector(UIElements.aboutModal).classList.contains(ElementStateClass.active);
        if (!modalOpen) {
            UILayer.setGameStart();
            document.removeEventListener('keydown', UILayer.onKeyDownHandler, false);
            document.dispatchEvent(new CustomEvent(State.gameStartEventName));
            document.querySelector(UIElements.restart).removeAttribute(ElementStateClass.disabled);
        }
    }

    private static setGameStart(): void {
        document.querySelector(UIElements.howToStart).classList.remove(ElementStateClass.active);
        document.querySelector(UIElements.overlay).classList.remove(ElementStateClass.active);
    }
}
