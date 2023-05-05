import {Collectible, character, collectible, powerUp} from '../game';
import {CollectibleCoordinate, collectibles, powerUps} from './collectibles';

import {MissionLayer} from './mission-layer';
import {PowerUp} from './power-up';

export class CollectibleCollision {
    private readonly missionLayer = new MissionLayer();
    private readonly powerUp = new PowerUp();

    collectRight(): void {
        this.collectRightAction(collectibles, collectible);
        this.collectRightAction(powerUps, powerUp);
    }

    collectLeft(): void {
        this.collectLeftAction(collectibles, collectible);
        this.collectLeftAction(powerUps, powerUp);
    }

    collectBottom(): void {
        this.collectBottomAction(collectibles, collectible);
        this.collectBottomAction(powerUps, powerUp);
    }

    collectTop(): void {
        this.collectTopAction(collectibles, collectible);
        this.collectTopAction(powerUps, powerUp);
    }

    getCollectibleOnWayX(coordinates: CollectibleCoordinate[]): CollectibleCoordinate[] {
        return coordinates.filter((coordinate) => {
            return coordinate.centerY === character.height / 2 + character.currentY;
        });
    }

    getCollectibleOnWayY(coordinates: CollectibleCoordinate[]): CollectibleCoordinate[] {
        return coordinates.filter((coordinate) => {
            return coordinate.centerX === character.width / 2 + character.currentX;
        });
    }

    removeCollected(coordinates: CollectibleCoordinate[], collected: CollectibleCoordinate, radius: number): void {
        this.missionLayer.eraseCollectible(collected, radius);
        if (this.missionLayer.getIsMissionCollectible(radius)) {
            const collectedIndex = coordinates.findIndex((coordinate) => {
                return collected.centerX === coordinate.centerX && collected.centerY === coordinate.centerY;
            });
            collectibles.splice(collectedIndex, 1);
            if (collectibles.length === 0) {
                this.missionLayer.setMissionComplete();
            }
        } else {
            this.powerUp.activatePowerUp();
        }
    }

    private collectTopAction(coordinates: CollectibleCoordinate[], collectible: Collectible): void {
        const collectibleOnWayY = this.getCollectibleOnWayY(coordinates);
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
                this.removeCollected(coordinates, collected, collectible.radius);
            }
        }
    }

    private collectBottomAction(coordinates: CollectibleCoordinate[], collectible: Collectible): void {
        const collectibleOnWayY = this.getCollectibleOnWayY(coordinates);
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
                this.removeCollected(coordinates, collected, collectible.radius);
            }
        }
    }

    private collectLeftAction(coordinates: CollectibleCoordinate[], collectible: Collectible): void {
        const collectibleOnWayX = this.getCollectibleOnWayX(coordinates);
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
                this.removeCollected(coordinates, collected, collectible.radius);
            }
        }
    }

    private collectRightAction(coordinates: CollectibleCoordinate[], collectible: Collectible): void {
        const collectibleOnWayX = this.getCollectibleOnWayX(coordinates);
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
                this.removeCollected(coordinates, collected, collectible.radius);
            }
        }
    }
}
