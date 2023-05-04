import {character, collectible} from '../game';
import {CollectibleCoordinate, collectibles} from './collectibles';

import {MissionLayer} from './mission-layer';

export class CollectibleCollision {
    private readonly missionLayer = new MissionLayer();

    collectRight(): void {
        const collectibleOnWayX = this.getCollectibleOnWayX();
        if (collectibleOnWayX.length) {
            const characterRightEdge = character.currentX + character.width;
            const collected = collectibleOnWayX.find((coordinate) => {
                const passCollectible = coordinate.centerX - collectible.radius < character.currentX;
                if (passCollectible) {
                    return null;
                }

                const reachCollectible = coordinate.centerX - collectible.radius <= characterRightEdge;
                return reachCollectible;
            });

            if (collected) {
                this.removeCollected(collected);
            }
        }
    }

    collectLeft(): void {
        const collectibleOnWayX = this.getCollectibleOnWayX();
        if (collectibleOnWayX.length) {
            const characterRightEdge = character.currentX + character.width;
            const collected = collectibleOnWayX.find((coordinate) => {
                const passCollectible = coordinate.centerX + collectible.radius > characterRightEdge;
                if (passCollectible) {
                    return null;
                }

                const reachCollectible = coordinate.centerX + collectible.radius >= character.currentX;
                return reachCollectible;
            });
            if (collected) {
                this.removeCollected(collected);
            }
        }
    }

    collectBottom(): void {
        const collectibleOnWayY = this.getCollectibleOnWayY();
        if (collectibleOnWayY.length) {
            const characterBottomEdge = character.currentY + character.height;
            const collected = collectibleOnWayY.find((coordinate) => {
                const passCollectible = coordinate.centerY + collectible.radius < character.currentY;
                if (passCollectible) {
                    return null;
                }

                const reachCollectible = coordinate.centerY - collectible.radius <= characterBottomEdge;
                return reachCollectible;
            });
            if (collected) {
                this.removeCollected(collected);
            }
        }
    }

    collectTop(): void {
        const collectibleOnWayY = this.getCollectibleOnWayY();
        if (collectibleOnWayY.length) {
            const characterBottomEdge = character.currentY + character.height;
            const collected = collectibleOnWayY.find((coordinate) => {
                const passCollectible = coordinate.centerY - collectible.radius > characterBottomEdge;
                if (passCollectible) {
                    return null;
                }

                const reachCollectible = coordinate.centerY + collectible.radius >= character.currentY;
                return reachCollectible;
            });
            if (collected) {
                this.removeCollected(collected);
            }
        }
    }

    private removeCollected(collected: CollectibleCoordinate): void {
        this.missionLayer.eraseCollectible(collected);
        const collectedIndex = collectibles.findIndex((coordinate) => {
            return collected.centerX === coordinate.centerX && collected.centerY === coordinate.centerY;
        });
        collectibles.splice(collectedIndex, 1);
        if (collectibles.length === 0) {
            this.missionLayer.setMissionComplete();
        }
    }

    private getCollectibleOnWayX(): CollectibleCoordinate[] {
        return collectibles.filter((coordinate) => {
            return coordinate.centerY === character.height / 2 + character.currentY;
        });
    }

    private getCollectibleOnWayY(): CollectibleCoordinate[] {
        return collectibles.filter((coordinate) => {
            return coordinate.centerX === character.width / 2 + character.currentX;
        });
    }
}
