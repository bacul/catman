import {Language, defaultLanguage} from './language/language';

export class UILayer {
    private readonly language: Language;

    constructor() {
        this.language = defaultLanguage;
    }

    setLanguage(): void {
        document.querySelector('.score-header').innerHTML = this.language.score;
    }
}
