import {collectibleModel, powerUpModel} from '../game-model';

import {State} from '../../application-state';
import {character} from '../character-layer/character';
import {EnemyLayer} from '../enemy-layer/enemy-layer';
import {CollectibleCoordinate} from './collectibles';

export class CollectibleCollision {
    collectRight(): void {
        this.collectRightAction(State.missionLayer.collectibles, collectibleModel.radius);
        this.collectRightAction(State.missionLayer.powerUps, powerUpModel.radius);
    }

    collectLeft(): void {
        this.collectLeftAction(State.missionLayer.collectibles, collectibleModel.radius);
        this.collectLeftAction(State.missionLayer.powerUps, powerUpModel.radius);
    }

    collectBottom(): void {
        this.collectBottomAction(State.missionLayer.collectibles, collectibleModel.radius);
        this.collectBottomAction(State.missionLayer.powerUps, powerUpModel.radius);
    }

    collectTop(): void {
        this.collectTopAction(State.missionLayer.collectibles, collectibleModel.radius);
        this.collectTopAction(State.missionLayer.powerUps, powerUpModel.radius);
    }

    getIntersectEnemyId(): number {
        const intersectEnemyId = EnemyLayer.enemies.findIndex((enemy) => {
            const diffirenceLeftX = character.currentX - enemy.currentX;
            const intersectLeft = diffirenceLeftX >= 0 && diffirenceLeftX <= enemy.width;

            const differenceRightX = enemy.currentX - character.currentX;
            const intersectRight = differenceRightX >= 0 && differenceRightX <= enemy.width;

            const differenceTopY = character.currentY - enemy.currentY;
            const intersectTop = differenceTopY >= 0 && differenceTopY <= enemy.height;

            const differenceBottomY = enemy.currentY - character.currentY;
            const intersectBottom = differenceBottomY >= 0 && differenceBottomY <= enemy.height;

            if (intersectLeft || intersectRight) {
                return intersectBottom || intersectTop;
            }
            if (intersectBottom || intersectTop) {
                return intersectLeft || intersectRight;
            }
        });
        return intersectEnemyId;
    }

    private getCollectibleOnWayX(coordinates: CollectibleCoordinate[]): CollectibleCoordinate[] {
        return coordinates.filter((coordinate) => {
            return coordinate.centerY === character.height / 2 + character.currentY;
        });
    }

    private getCollectibleOnWayY(coordinates: CollectibleCoordinate[]): CollectibleCoordinate[] {
        return coordinates.filter((coordinate) => {
            return coordinate.centerX === character.width / 2 + character.currentX;
        });
    }

    private removeCollected(
        coordinates: CollectibleCoordinate[],
        collected: CollectibleCoordinate,
        radius: number
    ): void {
        State.missionLayer.eraseCollectible(collected, radius);
        const collectedIndex = coordinates.findIndex((coordinate) => {
            return collected.centerX === coordinate.centerX && collected.centerY === coordinate.centerY;
        });
        coordinates.splice(collectedIndex, 1);

        if (State.missionLayer.isMissionCollectible(radius)) {
            if (coordinates.length === 0) {
                State.missionLayer.setMissionComplete();
            }
        } else {
            State.powerUp.activatePowerUp();
        }
    }

    private collectTopAction(coordinates: CollectibleCoordinate[], collectibleRadius: number): void {
        const collectibleOnWayY = this.getCollectibleOnWayY(coordinates);
        if (collectibleOnWayY.length) {
            const characterBottomEdge = character.currentY + character.height;
            const collected = collectibleOnWayY.find((coordinate) => {
                const passCollectible = coordinate.centerY - collectibleRadius > characterBottomEdge;
                if (passCollectible) {
                    return null;
                }

                const reachCollectible = coordinate.centerY + collectibleRadius >= character.currentY;
                return reachCollectible;
            });
            if (collected) {
                this.removeCollected(coordinates, collected, collectibleRadius);
            }
        }
    }

    private collectBottomAction(coordinates: CollectibleCoordinate[], collectibleRadius: number): void {
        const collectibleOnWayY = this.getCollectibleOnWayY(coordinates);
        if (collectibleOnWayY.length) {
            const characterBottomEdge = character.currentY + character.height;
            const collected = collectibleOnWayY.find((coordinate) => {
                const passCollectible = coordinate.centerY + collectibleRadius < character.currentY;
                if (passCollectible) {
                    return null;
                }

                const reachCollectible = coordinate.centerY - collectibleRadius <= characterBottomEdge;
                return reachCollectible;
            });
            if (collected) {
                this.removeCollected(coordinates, collected, collectibleRadius);
            }
        }
    }

    private collectLeftAction(coordinates: CollectibleCoordinate[], collectibleRadius: number): void {
        const collectibleOnWayX = this.getCollectibleOnWayX(coordinates);
        if (collectibleOnWayX.length) {
            const characterRightEdge = character.currentX + character.width;
            const collected = collectibleOnWayX.find((coordinate) => {
                const passCollectible = coordinate.centerX + collectibleRadius > characterRightEdge;
                if (passCollectible) {
                    return null;
                }

                const reachCollectible = coordinate.centerX + collectibleRadius >= character.currentX;
                return reachCollectible;
            });
            if (collected) {
                this.removeCollected(coordinates, collected, collectibleRadius);
            }
        }
    }

    private collectRightAction(coordinates: CollectibleCoordinate[], collectibleRadius: number): void {
        const collectibleOnWayX = this.getCollectibleOnWayX(coordinates);
        if (collectibleOnWayX.length) {
            const characterRightEdge = character.currentX + character.width;
            const collected = collectibleOnWayX.find((coordinate) => {
                const passCollectible = coordinate.centerX - collectibleRadius < character.currentX;
                if (passCollectible) {
                    return null;
                }

                const reachCollectible = coordinate.centerX - collectibleRadius <= characterRightEdge;
                return reachCollectible;
            });

            if (collected) {
                this.removeCollected(coordinates, collected, collectibleRadius);
            }
        }
    }
}
