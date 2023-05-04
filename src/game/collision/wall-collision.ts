import {Figure, Path, Rectangle} from '../background-layer/figure';
import {MovableEntity, gameSize} from '../game';

interface HorizontalLine {
    start: number;
    end: number;
    y: number;
}

interface VerticalLine {
    start: number;
    end: number;
    x: number;
}

export class FigureCollision {
    stuckRight(movableEntity: MovableEntity): boolean {
        return (
            movableEntity.currentX >= gameSize.width - movableEntity.width - gameSize.shiftXY ||
            this.stuckRightPath(movableEntity) ||
            this.stuckRightRectangle(movableEntity)
        );
    }

    stuckLeft(movableEntity: MovableEntity): boolean {
        return (
            movableEntity.currentX <= gameSize.shiftXY ||
            this.stuckLeftPath(movableEntity) ||
            this.stuckLeftRectangle(movableEntity)
        );
    }

    stuckBottom(movableEntity: MovableEntity): boolean {
        return (
            movableEntity.currentY + movableEntity.height >= gameSize.height - gameSize.shiftXY ||
            this.stuckBottomRectangle(movableEntity) ||
            this.stuckBottomPath(movableEntity)
        );
    }

    stuckTop(movableEntity: MovableEntity): boolean {
        return (
            movableEntity.currentY <= gameSize.shiftXY ||
            this.stuckTopPath(movableEntity) ||
            this.stuckTopRectangle(movableEntity)
        );
    }

    private stuckRightRectangle(movableEntity: MovableEntity): boolean {
        return Figure.rectangles.some((rectangle) => {
            const isWallPassed = rectangle.topLeftX + rectangle.width <= movableEntity.currentX + movableEntity.width;
            if (isWallPassed) {
                return false;
            }

            const reachRightEdge = movableEntity.currentX + movableEntity.width >= rectangle.topLeftX;
            if (!reachRightEdge) {
                return false;
            }

            return this.rectangleOnWayX(movableEntity, rectangle);
        });
    }

    private stuckRightPath(movableEntity: MovableEntity): boolean {
        return Figure.paths.some((path) => {
            const isWallPassed = path.maxX < movableEntity.currentX;
            if (isWallPassed) {
                return false;
            }

            const reachLeftEdge = movableEntity.currentX + movableEntity.width >= path.minX;
            if (!reachLeftEdge) {
                return false;
            }

            if (!this.pathOnWayX(movableEntity, path)) {
                return false;
            }

            const movableEntityRightX = movableEntity.currentX + movableEntity.width;
            const stuck = this.getVerticalLines(path, false).some((line) => {
                const linePassed = movableEntityRightX > line.x;
                if (linePassed) {
                    return false;
                }
                const topCornerOnWayX = movableEntity.currentY + movableEntity.height > line.end;
                const bottomCornerOnWayX = movableEntity.currentY < line.start;
                const lineOnWay = topCornerOnWayX && bottomCornerOnWayX;
                const lineReached = movableEntityRightX >= line.x;
                return lineReached && lineOnWay;
            });
            return stuck;
        });
    }

    private stuckLeftRectangle(movableEntity: MovableEntity): boolean {
        return Figure.rectangles.some((rectangle) => {
            const isWallPassed = rectangle.topLeftX >= movableEntity.currentX + movableEntity.width;
            if (isWallPassed) {
                return false;
            }

            const reachLeftEdge = movableEntity.currentX <= rectangle.topLeftX + rectangle.width;
            if (!reachLeftEdge) {
                return false;
            }

            return this.rectangleOnWayX(movableEntity, rectangle);
        });
    }

    private stuckLeftPath(movableEntity: MovableEntity): boolean {
        return Figure.paths.some((path) => {
            const isWallPassed = path.minX > movableEntity.currentX;
            if (isWallPassed) {
                return false;
            }

            const reachRightEdge = movableEntity.currentX <= path.maxX;
            if (!reachRightEdge) {
                return false;
            }

            if (!this.pathOnWayX(movableEntity, path)) {
                return false;
            }

            const movableEntityLeftX = movableEntity.currentX;
            const stuck = this.getVerticalLines(path, true).some((line) => {
                const linePassed = movableEntityLeftX > line.x;
                if (linePassed) {
                    return false;
                }
                const topCornerOnWayX = movableEntity.currentY + movableEntity.height > line.start;
                const bottomCornerOnWayX = movableEntity.currentY < line.end;
                const lineOnWay = topCornerOnWayX && bottomCornerOnWayX;
                const lineReached = movableEntityLeftX >= line.x;
                return lineReached && lineOnWay;
            });
            return stuck;
        });
    }

    private stuckBottomRectangle(movableEntity: MovableEntity): boolean {
        return Figure.rectangles.some((rectangle) => {
            const isWallPassed = rectangle.topLeftY < movableEntity.currentY + movableEntity.height;
            if (isWallPassed) {
                return false;
            }

            const reachBottomEdge = movableEntity.currentY + movableEntity.height >= rectangle.topLeftY;
            if (!reachBottomEdge) {
                return false;
            }

            return this.rectangleOnWayY(movableEntity, rectangle);
        });
    }

    private stuckBottomPath(movableEntity: MovableEntity): boolean {
        return Figure.paths.some((path) => {
            const isWallPassed = path.maxY < movableEntity.currentY + movableEntity.height;
            if (isWallPassed) {
                return false;
            }

            const reachTopEdge = movableEntity.currentY + movableEntity.height >= path.minY;
            if (!reachTopEdge) {
                return false;
            }

            if (!this.pathOnWayY(movableEntity, path)) {
                return false;
            }

            const movableEntityBottomY = movableEntity.currentY + movableEntity.height;
            const stuck = this.getHorizontalLines(path, true).some((line) => {
                const linePassed = movableEntityBottomY > line.y;
                if (linePassed) {
                    return false;
                }
                const leftCornerOnWayX = movableEntity.currentX < line.end;
                const rightCornerOnWayX = movableEntity.currentX + movableEntity.width > line.start;
                const lineOnWay = leftCornerOnWayX && rightCornerOnWayX;
                const lineReached = movableEntityBottomY >= line.y;
                return lineReached && lineOnWay;
            });
            return stuck;
        });
    }

    private stuckTopRectangle(movableEntity: MovableEntity): boolean {
        return Figure.rectangles.some((rectangle) => {
            const isWallPassed = rectangle.topLeftY + rectangle.height > movableEntity.currentY;
            if (isWallPassed) {
                return false;
            }

            const reachTopEdge = movableEntity.currentY <= rectangle.topLeftY + rectangle.height;
            if (!reachTopEdge) {
                return false;
            }

            return this.rectangleOnWayY(movableEntity, rectangle);
        });
    }

    private stuckTopPath(movableEntity: MovableEntity): boolean {
        return Figure.paths.some((path) => {
            const isWallPassed = path.minY > movableEntity.currentY + movableEntity.height;
            if (isWallPassed) {
                return false;
            }

            const reachBottomEdge = movableEntity.currentY <= path.maxY;
            if (!reachBottomEdge) {
                return false;
            }

            if (!this.pathOnWayY(movableEntity, path)) {
                return false;
            }

            const movableEntityTopY = movableEntity.currentY;
            const stuck = this.getHorizontalLines(path, false).some((line) => {
                const linePassed = movableEntityTopY < line.y;
                if (linePassed) {
                    return false;
                }
                const leftCornerOnWayX = movableEntity.currentX < line.start;
                const rightCornerOnWayX = movableEntity.currentX + movableEntity.width > line.end;
                const lineOnWay = leftCornerOnWayX && rightCornerOnWayX;
                const lineReached = movableEntityTopY <= line.y;
                return lineReached && lineOnWay;
            });
            return stuck;
        });
    }

    private rectangleOnWayX(movableEntity: MovableEntity, rectangle: Rectangle): boolean {
        const topCornerOnWayY = movableEntity.currentY < rectangle.topLeftY + rectangle.height;
        const bottomCornerOnWayY = movableEntity.currentY + movableEntity.height > rectangle.topLeftY;
        return topCornerOnWayY && bottomCornerOnWayY;
    }

    private rectangleOnWayY(movableEntity: MovableEntity, rectangle: Rectangle): boolean {
        const leftCornerOnWayX = movableEntity.currentX < rectangle.topLeftX + rectangle.width;
        const rightCornerOnWayX = movableEntity.currentX + movableEntity.width > rectangle.topLeftX;
        return leftCornerOnWayX && rightCornerOnWayX;
    }

    private pathOnWayY(movableEntity: MovableEntity, path: Path): boolean {
        const leftCornerOnWayX = movableEntity.currentX < path.maxX;
        const rightCornerOnWayX = movableEntity.currentX + movableEntity.width > path.minX;
        return leftCornerOnWayX && rightCornerOnWayX;
    }

    private pathOnWayX(movableEntity: MovableEntity, path: Path): boolean {
        const bottomCornerOnWayY = movableEntity.currentY + movableEntity.height > path.minY;
        const topCornerOnWayY = movableEntity.currentY < path.maxY;
        return bottomCornerOnWayY && topCornerOnWayY;
    }

    private getHorizontalLines(path: Path, bottomLines: boolean): HorizontalLine[] {
        return path.points
            .map((point, index) => {
                if (index === 0) {
                    return {
                        start: path.topLeftX,
                        end: point.x,
                        y: point.y
                    };
                }
                const next = path.points[index + 1];
                if (next) {
                    const horizontalLine = point.y === next.y;
                    if (horizontalLine) {
                        return {
                            start: point.x,
                            end: next.x,
                            y: point.y
                        };
                    }
                }
                return null;
            })
            .filter((line) => {
                if (line) {
                    if (bottomLines) {
                        return line.start < line.end;
                    }
                    return line.start > line.end;
                }
                return null;
            });
    }

    private getVerticalLines(path: Path, rightLines: boolean): VerticalLine[] {
        return path.points
            .map((point, index) => {
                const next = path.points[index + 1];
                if (next) {
                    const verticalLine = point.x === next.x;
                    if (verticalLine) {
                        return {
                            start: point.y,
                            end: next.y,
                            x: point.x
                        };
                    }
                }
                return null;
            })
            .filter((line) => {
                if (line) {
                    if (rightLines) {
                        return line.start < line.end;
                    }
                    return line.start > line.end;
                }
                return null;
            });
    }
}
