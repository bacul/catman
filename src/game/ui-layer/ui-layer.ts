import {Language, defaultLanguage, russianLanguage} from './language/language';

import {State} from '../../application-state';
import {gameSizeModel} from '../game-model';

export enum UIElements {
    game = '.game',
    gameWrapper = '.game-wrapper',
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
        if (navigator.language === 'ru' || navigator.language === 'ru-RU') {
            this.language = russianLanguage;
        } else {
            this.language = defaultLanguage;
        }
        document.addEventListener('keydown', UILayer.onKeyDownHandler, false);
        document.addEventListener('keydown', this.hideModal, false);
        document.querySelector(UIElements.aboutButton).addEventListener('click', this.toggleAboutModal);
    }

    setGameSize(): void {
        const outterBorderSizeAndPadding = 12;
        const gameFieldShiftXY = gameSizeModel.shiftXY * 2 - outterBorderSizeAndPadding;
        document.querySelectorAll('.game-field').forEach((element) => {
            if (element.nodeName === 'CANVAS') {
                element.setAttribute('width', `${gameSizeModel.width}px`);
                element.setAttribute('height', `${gameSizeModel.height}px`);
            } else {
                element.setAttribute(
                    'style',
                    `width: ${gameSizeModel.width - gameFieldShiftXY}px ;height: ${
                        gameSizeModel.height - gameFieldShiftXY
                    }px`
                );
            }
        });
        document.querySelector('.ui-layer').setAttribute('style', `width: ${gameSizeModel.width - gameFieldShiftXY}px`);
        document
            .querySelector('.ui-layer-overlay')
            .setAttribute('style', `height: ${gameSizeModel.height - gameFieldShiftXY}px`);
        document
            .querySelector('.modal')
            .setAttribute(
                'style',
                `width: ${gameSizeModel.width - gameFieldShiftXY}px ;height: ${
                    gameSizeModel.height - gameFieldShiftXY
                }px`
            );
        this.setScale();
    }

    private setScale(): void {
        const gameWrapperHeight = document.querySelector(UIElements.gameWrapper).getBoundingClientRect().height;
        const gameElement = document.querySelector(UIElements.game);
        const gameElementHeight = gameElement.getBoundingClientRect().height;
        const availablePx = gameWrapperHeight - gameElementHeight;
        if (gameElementHeight < gameWrapperHeight) {
            const increaseRating = Math.floor((availablePx / gameElementHeight) * 100);
            gameElement.setAttribute('style', `transform: scale(1.${increaseRating})`);
        }
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
        State.powerUp.cancelPowerUp();
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
