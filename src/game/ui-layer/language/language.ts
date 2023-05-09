export interface Language {
    score: string;
    howToStart: string;
    win: string;
    defeat: string;
    restart: string;
    aboutButton: string;
    aboutModalHeader: string;
    aboutModalDeveloper: string;
    aboutModalAsset: string;
}

export const defaultLanguage: Language = {
    score: 'Score:',
    howToStart: 'Press Any Key',
    win: 'You Win!',
    defeat: 'Defeat',
    restart: 'restart',
    aboutButton: 'about',
    aboutModalHeader: 'about',
    aboutModalDeveloper: 'developer:',
    aboutModalAsset: 'asset pack author:'
};

export const russianLanguage: Language = {
    score: 'Счет:',
    howToStart: 'Нажмите Любую Клавишу',
    win: 'Победа!',
    defeat: 'Поражение',
    restart: 'перезапуск',
    aboutButton: 'об игре',
    aboutModalHeader: 'об игре',
    aboutModalDeveloper: 'разработчик:',
    aboutModalAsset: 'ресурсы:'
};
