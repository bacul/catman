export interface Collectible {
    radius: number;
    backgroundColor: string;
    coordinates: CollectibleCoordinate[];
}

export interface CollectibleCoordinate {
    centerX: number;
    centerY: number;
}

export const collectibles: Collectible = {
    radius: 3,
    backgroundColor: '#ffb04b',
    coordinates: [
        {
            centerX: 44,
            centerY: 15
        },
        {
            centerX: 64,
            centerY: 15
        },
        {
            centerX: 84,
            centerY: 15
        },
        {
            centerX: 105,
            centerY: 15
        },

        {
            centerX: 105,
            centerY: 35
        },
        {
            centerX: 105,
            centerY: 55
        },
        {
            centerX: 105,
            centerY: 75
        },
        {
            centerX: 105,
            centerY: 95
        }
    ]
};
