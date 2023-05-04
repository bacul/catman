import {Language, defaultLanguage, russianLanguage} from './language/language';

export class UILayer {
    private readonly language: Language;

    constructor() {
        if (navigator.language === 'ru') {
            this.language = russianLanguage;
        } else {
            this.language = defaultLanguage;
        }
    }

    setLanguage(): void {
        document.querySelector('.score-header').innerHTML = this.language.score;
    }
}
