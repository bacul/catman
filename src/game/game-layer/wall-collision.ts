import {Wall, backgroundLayer} from '../background-layer/background-layer';

import {character} from '../game';

export class WallCollision {
    stuckRight(): boolean {
        return backgroundLayer.walls.some((wall) => {
            const isWallPassed = wall.offsetX + wall.width <= character.currentX + character.width;
            if (isWallPassed) {
                return false;
            }

            const reachRightEdge = character.currentX + character.width >= wall.offsetX;
            if (!reachRightEdge) {
                return false;
            }

            return this.wallOnWayX(wall);
        });
    }

    stuckLeft(): boolean {
        return backgroundLayer.walls.some((wall) => {
            const isWallPassed = wall.offsetX >= character.currentX + character.width;
            if (isWallPassed) {
                return false;
            }

            const reachLeftEdge = character.currentX <= wall.offsetX + wall.width;
            if (!reachLeftEdge) {
                return false;
            }

            return this.wallOnWayX(wall);
        });
    }

    stuckBottom(): boolean {
        return backgroundLayer.walls.some((wall) => {
            const isWallPassed = wall.offsetY < character.currentY + character.height;
            if (isWallPassed) {
                return false;
            }

            const reachBottomEdge = character.currentY + character.height >= wall.offsetY;
            if (!reachBottomEdge) {
                return false;
            }

            return this.wallOnWayY(wall);
        });
    }

    stuckTop(): boolean {
        return backgroundLayer.walls.some((wall) => {
            const isWallPassed = wall.offsetY + wall.height > character.currentY;
            if (isWallPassed) {
                return false;
            }

            const reachTopEdge = character.currentY <= wall.offsetY + wall.height;
            if (!reachTopEdge) {
                return false;
            }

            return this.wallOnWayY(wall);
        });
    }

    private wallOnWayX(wall: Wall): boolean {
        const topCornerOnWayY = character.currentY < wall.offsetY + wall.height;
        const bottomCornerOnWayY = character.currentY + character.height > wall.offsetY;
        return topCornerOnWayY && bottomCornerOnWayY;
    }

    private wallOnWayY(wall: Wall): boolean {
        const leftCornerOnWayX = character.currentX < wall.offsetX + wall.width;
        const rightCornerOnWayX = character.currentX + character.width > wall.offsetX;
        return leftCornerOnWayX && rightCornerOnWayX;
    }
}
