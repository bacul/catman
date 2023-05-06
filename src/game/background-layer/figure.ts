export interface Point {
    x: number;
    y: number;
}

export interface Rectangle {
    topLeftX: number;
    topLeftY: number;
    width: number;
    height: number;
    invisible?: boolean;
}

export interface PathCoordinates {
    topLeftX: number;
    topLeftY: number;
    points: Point[];
}

export interface Path extends PathCoordinates {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

const pathCoordinates: PathCoordinates[] = [
    /** start second row */
    {
        topLeftX: 205,
        topLeftY: 190,
        points: [
            {x: 220, y: 190},
            {x: 220, y: 235},
            {x: 265, y: 235},
            {x: 265, y: 250},
            {x: 220, y: 250},
            {x: 220, y: 295},
            {x: 205, y: 295},
            {x: 205, y: 190}
        ]
    },
    {
        topLeftX: 250,
        topLeftY: 190,
        points: [
            {x: 355, y: 190},
            {x: 355, y: 205},
            {x: 310, y: 205},
            {x: 310, y: 250},
            {x: 295, y: 250},
            {x: 295, y: 205},
            {x: 250, y: 205},
            {x: 250, y: 190}
        ]
    },
    {
        topLeftX: 340,
        topLeftY: 235,
        points: [
            {x: 385, y: 235},
            {x: 385, y: 190},
            {x: 400, y: 190},
            {x: 400, y: 295},
            {x: 385, y: 295},
            {x: 385, y: 250},
            {x: 340, y: 250},
            {x: 340, y: 235}
        ]
    },
    /** end second row */
    /** start fourth row */
    {
        topLeftX: 250,
        topLeftY: 370,
        points: [
            {x: 355, y: 370},
            {x: 355, y: 385},
            {x: 310, y: 385},
            {x: 310, y: 430},
            {x: 295, y: 430},
            {x: 295, y: 385},
            {x: 250, y: 385},
            {x: 250, y: 370}
        ]
    },
    /** end fourth row */
    /** start fifth row */
    {
        topLeftX: 130,
        topLeftY: 415,
        points: [
            {x: 175, y: 415},
            {x: 175, y: 475},
            {x: 160, y: 475},
            {x: 160, y: 430},
            {x: 130, y: 430},
            {x: 130, y: 415}
        ]
    },
    {
        topLeftX: 430,
        topLeftY: 415,
        points: [
            {x: 475, y: 415},
            {x: 475, y: 430},
            {x: 445, y: 430},
            {x: 445, y: 475},
            {x: 430, y: 475},
            {x: 430, y: 415}
        ]
    },
    /** start sixth row */
    {
        topLeftX: 130,
        topLeftY: 505,
        points: [
            {x: 205, y: 505},
            {x: 205, y: 460},
            {x: 220, y: 460},
            {x: 220, y: 505},
            {x: 265, y: 505},
            {x: 265, y: 520},
            {x: 130, y: 520},
            {x: 130, y: 505}
        ]
    },
    {
        topLeftX: 250,
        topLeftY: 460,
        points: [
            {x: 355, y: 460},
            {x: 355, y: 475},
            {x: 310, y: 475},
            {x: 310, y: 520},
            {x: 295, y: 520},
            {x: 295, y: 475},
            {x: 250, y: 475},
            {x: 250, y: 460}
        ]
    },
    {
        topLeftX: 340,
        topLeftY: 505,
        points: [
            {x: 385, y: 505},
            {x: 385, y: 460},
            {x: 400, y: 460},
            {x: 400, y: 505},
            {x: 475, y: 505},
            {x: 475, y: 520},
            {x: 340, y: 520},
            {x: 340, y: 505}
        ]
    }
    /** end sixth row */
];

const rectangles: Rectangle[] = [
    /** start first row */
    {
        topLeftX: 130,
        topLeftY: 130,
        width: 45,
        height: 30
    },
    {
        topLeftX: 205,
        topLeftY: 130,
        width: 60,
        height: 30
    },
    {
        topLeftX: 295,
        topLeftY: 100,
        width: 15,
        height: 60,
        invisible: true
    },
    {
        topLeftX: 340,
        topLeftY: 130,
        width: 60,
        height: 30
    },
    {
        topLeftX: 430,
        topLeftY: 130,
        width: 45,
        height: 30
    },
    /** end first row */
    /** start second row */
    {
        topLeftX: 130,
        topLeftY: 190,
        width: 45,
        height: 15
    },
    {
        topLeftX: 430,
        topLeftY: 190,
        width: 45,
        height: 15
    },
    /** end second row */
    /** start third row */
    {
        topLeftX: 75,
        topLeftY: 235,
        width: 100,
        height: 60,
        invisible: true
    },
    {
        topLeftX: 430,
        topLeftY: 235,
        width: 100,
        height: 60,
        invisible: true
    },
    {
        topLeftX: 250,
        topLeftY: 280,
        width: 105,
        height: 60
    },
    /** end third row */
    /** start fourth row */
    {
        topLeftX: 75,
        topLeftY: 325,
        width: 100,
        height: 60,
        invisible: true
    },
    {
        topLeftX: 430,
        topLeftY: 325,
        width: 100,
        height: 60,
        invisible: true
    },
    {
        topLeftX: 205,
        topLeftY: 325,
        width: 15,
        height: 60
    },
    {
        topLeftX: 385,
        topLeftY: 325,
        width: 15,
        height: 60
    },
    /** end fourth */
    /** start fifth */
    {
        topLeftX: 205,
        topLeftY: 415,
        width: 60,
        height: 15
    },
    {
        topLeftX: 340,
        topLeftY: 415,
        width: 60,
        height: 15
    },
    /** start sixth */
    {
        topLeftX: 100,
        topLeftY: 460,
        width: 30,
        height: 15,
        invisible: true
    },
    {
        topLeftX: 475,
        topLeftY: 460,
        width: 30,
        height: 15,
        invisible: true
    },
    /** end sixth */
    /** start left round edge */
    {
        topLeftX: 95,
        topLeftY: 95,
        width: 5,
        height: 135,
        invisible: true
    },
    {
        topLeftX: 95,
        topLeftY: 385,
        width: 5,
        height: 165,
        invisible: true
    },
    /** end left round edge */
    /** start right round edge */
    {
        topLeftX: 505,
        topLeftY: 95,
        width: 5,
        height: 135,
        invisible: true
    },
    {
        topLeftX: 505,
        topLeftY: 385,
        width: 5,
        height: 165,
        invisible: true
    }
    /** end right round edge */
];

export const pathBackgroundCoordinates: PathCoordinates[] = [
    /** upper inner */
    {
        topLeftX: 90,
        topLeftY: 295,
        points: [
            {x: 90, y: 295},
            {x: 175, y: 295},
            {x: 175, y: 235},
            {x: 100, y: 235},
            {x: 100, y: 100},
            {x: 295, y: 100},
            {x: 295, y: 160},
            {x: 310, y: 160},
            {x: 310, y: 100},
            {x: 505, y: 100},
            {x: 505, y: 235},
            {x: 430, y: 235},
            {x: 430, y: 295},
            {x: 505, y: 295},
            {x: 515, y: 295}
        ]
    },
    /** upper outer */
    {
        topLeftX: 90,
        topLeftY: 290,
        points: [
            {x: 90, y: 290},
            {x: 170, y: 290},
            {x: 170, y: 240},
            {x: 95, y: 240},
            {x: 95, y: 95},
            {x: 510, y: 95},
            {x: 510, y: 240},
            {x: 435, y: 240},
            {x: 435, y: 290},
            {x: 515, y: 290}
        ]
    },
    /** lower inner */
    {
        topLeftX: 90,
        topLeftY: 325,
        points: [
            {x: 90, y: 325},
            {x: 175, y: 325},
            {x: 175, y: 385},
            {x: 100, y: 385},
            {x: 100, y: 460},
            {x: 130, y: 460},
            {x: 130, y: 475},
            {x: 100, y: 475},
            {x: 100, y: 550},
            {x: 505, y: 550},
            {x: 505, y: 475},
            {x: 475, y: 475},
            {x: 475, y: 460},
            {x: 505, y: 460},
            {x: 505, y: 385},
            {x: 430, y: 385},
            {x: 430, y: 325},
            {x: 515, y: 325}
        ]
    },
    /** lower outer */
    {
        topLeftX: 90,
        topLeftY: 330,
        points: [
            {x: 90, y: 330},
            {x: 170, y: 330},
            {x: 170, y: 380},
            {x: 95, y: 380},
            {x: 95, y: 555},
            {x: 510, y: 555},
            {x: 510, y: 380},
            {x: 435, y: 380},
            {x: 435, y: 330},
            {x: 515, y: 330}
        ]
    }
];

export class Figure {
    private static _paths: Path[];
    private static _rectangles: Rectangle[];

    constructor() {
        Figure._paths = this.convertCoordinatesToPath(pathCoordinates);
        Figure._rectangles = rectangles;
    }

    static get paths() {
        return Figure._paths;
    }

    static get rectangles() {
        return Figure._rectangles;
    }

    private convertCoordinatesToPath(pathCoordinates: PathCoordinates[]): Path[] {
        return pathCoordinates.map((coordinates) => {
            const path: Path = {
                ...coordinates,
                maxX: Math.max(...coordinates.points.map((point) => point.x)),
                minX: Math.min(...coordinates.points.map((point) => point.x)),
                maxY: Math.max(...coordinates.points.map((point) => point.y)),
                minY: Math.min(...coordinates.points.map((point) => point.y))
            };

            return path;
        });
    }
}
new Figure();
