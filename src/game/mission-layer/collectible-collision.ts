import {Collectible, character, collectible, powerUp} from '../game';

import {State} from '../../application-state';
import {CollectibleCoordinate} from './collectibles';

export class CollectibleCollision {
    collectRight(): void {
        this.collectRightAction(State.missionLayer.collectibles, collectible);
        this.collectRightAction(State.missionLayer.powerUps, powerUp);
    }

    collectLeft(): void {
        this.collectLeftAction(State.missionLayer.collectibles, collectible);
        this.collectLeftAction(State.missionLayer.powerUps, powerUp);
    }

    collectBottom(): void {
        this.collectBottomAction(State.missionLayer.collectibles, collectible);
        this.collectBottomAction(State.missionLayer.powerUps, powerUp);
    }

    collectTop(): void {
        this.collectTopAction(State.missionLayer.collectibles, collectible);
        this.collectTopAction(State.missionLayer.powerUps, powerUp);
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
        State.missionLayer.eraseCollectible(collected, radius);
        if (State.missionLayer.isMissionCollectible(radius)) {
            const collectedIndex = coordinates.findIndex((coordinate) => {
                return collected.centerX === coordinate.centerX && collected.centerY === coordinate.centerY;
            });
            coordinates.splice(collectedIndex, 1);
            if (coordinates.length === 0) {
                State.missionLayer.setMissionComplete();
            }
        } else {
            State.powerUp.activatePowerUp();
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
