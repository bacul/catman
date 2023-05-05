export interface Language {
    score: string;
    howToStart: string;
    win: string;
    defeat: string;
}

export const defaultLanguage: Language = {
    score: 'Score:',
    howToStart: 'Press Any Key',
    win: 'You Win!',
    defeat: 'Defeat'
};

export const russianLanguage: Language = {
    score: 'Счет:',
    howToStart: 'Нажмите Любую Клавишу',
    win: 'Победа!',
    defeat: 'Поражение'
};
