export interface Language {
    score: string;
    howToStart: string;
}

export const defaultLanguage: Language = {
    score: 'Score:',
    howToStart: 'Press Any Key'
};

export const russianLanguage: Language = {
    score: 'Счет:',
    howToStart: 'Нажмите Любую Клавишу'
};
