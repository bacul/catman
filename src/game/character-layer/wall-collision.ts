import {Figure, Path, Rectangle} from '../background-layer/figure';
import {character, gameSize} from '../game';

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
    stuckRight(): boolean {
        return (
            character.currentX > gameSize.width - character.width || this.stuckRightPath() || this.stuckRightRectangle()
        );
    }

    stuckLeft(): boolean {
        return character.currentX <= 0 || this.stuckLeftPath() || this.stuckLeftRectangle();
    }

    stuckBottom(): boolean {
        return (
            character.currentY + character.height > gameSize.height ||
            this.stuckBottomRectangle() ||
            this.stuckBottomPath()
        );
    }

    stuckTop(): boolean {
        return character.currentY <= 0 || this.stuckTopPath() || this.stuckTopRectangle();
    }

    private stuckRightRectangle(): boolean {
        return Figure.rectangles.some((rectangle) => {
            const isWallPassed = rectangle.topLeftX + rectangle.width <= character.currentX + character.width;
            if (isWallPassed) {
                return false;
            }

            const reachRightEdge = character.currentX + character.width >= rectangle.topLeftX;
            if (!reachRightEdge) {
                return false;
            }

            return this.rectangleOnWayX(rectangle);
        });
    }

    private stuckRightPath(): boolean {
        return Figure.paths.some((path) => {
            const isWallPassed = path.maxX < character.currentX;
            if (isWallPassed) {
                return false;
            }

            const reachLeftEdge = character.currentX + character.width >= path.topLeftX;
            if (!reachLeftEdge) {
                return false;
            }

            if (!this.pathOnWayX(path)) {
                return false;
            }

            const characterRightX = character.currentX + character.width;
            const stuck = this.getVerticalLines(path, false).some((line) => {
                const linePassed = characterRightX > line.x;
                if (linePassed) {
                    return false;
                }
                const topCornerOnWayX = character.currentY + character.height > line.end;
                const bottomCornerOnWayX = character.currentY < line.start;
                const lineOnWay = topCornerOnWayX && bottomCornerOnWayX;
                const lineReached = characterRightX >= line.x;
                return lineReached && lineOnWay;
            });
            return stuck;
        });
    }

    private stuckLeftRectangle(): boolean {
        return Figure.rectangles.some((rectangle) => {
            const isWallPassed = rectangle.topLeftX >= character.currentX + character.width;
            if (isWallPassed) {
                return false;
            }

            const reachLeftEdge = character.currentX <= rectangle.topLeftX + rectangle.width;
            if (!reachLeftEdge) {
                return false;
            }

            return this.rectangleOnWayX(rectangle);
        });
    }

    private stuckLeftPath(): boolean {
        return Figure.paths.some((path) => {
            const isWallPassed = path.minX > character.currentX;
            if (isWallPassed) {
                return false;
            }

            const reachRightEdge = character.currentX <= path.maxX;
            if (!reachRightEdge) {
                return false;
            }

            if (!this.pathOnWayX(path)) {
                return false;
            }

            const characterLeftX = character.currentX;
            const stuck = this.getVerticalLines(path, true).some((line) => {
                const linePassed = characterLeftX > line.x;
                if (linePassed) {
                    return false;
                }
                const topCornerOnWayX = character.currentY + character.height > line.start;
                const bottomCornerOnWayX = character.currentY < line.end;
                const lineOnWay = topCornerOnWayX && bottomCornerOnWayX;
                const lineReached = characterLeftX >= line.x;
                return lineReached && lineOnWay;
            });
            return stuck;
        });
    }

    private stuckBottomRectangle(): boolean {
        return Figure.rectangles.some((rectangle) => {
            const isWallPassed = rectangle.topLeftY < character.currentY + character.height;
            if (isWallPassed) {
                return false;
            }

            const reachBottomEdge = character.currentY + character.height >= rectangle.topLeftY;
            if (!reachBottomEdge) {
                return false;
            }

            return this.rectangleOnWayY(rectangle);
        });
    }

    private stuckBottomPath(): boolean {
        return Figure.paths.some((path) => {
            const isWallPassed = path.maxY < character.currentY + character.height;
            if (isWallPassed) {
                return false;
            }

            const reachTopEdge = character.currentY + character.height >= path.topLeftY;
            if (!reachTopEdge) {
                return false;
            }

            if (!this.pathOnWayY(path)) {
                return false;
            }

            const characterBottomY = character.currentY + character.height;
            const stuck = this.getHorizontalLines(path, true).some((line) => {
                const linePassed = characterBottomY > line.y;
                if (linePassed) {
                    return false;
                }
                const leftCornerOnWayX = character.currentX < line.end;
                const rightCornerOnWayX = character.currentX + character.width > line.start;
                const lineOnWay = leftCornerOnWayX && rightCornerOnWayX;
                const lineReached = characterBottomY >= line.y;
                return lineReached && lineOnWay;
            });
            return stuck;
        });
    }

    private stuckTopRectangle(): boolean {
        return Figure.rectangles.some((rectangle) => {
            const isWallPassed = rectangle.topLeftY + rectangle.height > character.currentY;
            if (isWallPassed) {
                return false;
            }

            const reachTopEdge = character.currentY <= rectangle.topLeftY + rectangle.height;
            if (!reachTopEdge) {
                return false;
            }

            return this.rectangleOnWayY(rectangle);
        });
    }

    private stuckTopPath(): boolean {
        return Figure.paths.some((path) => {
            const isWallPassed = path.minY > character.currentY + character.height;
            if (isWallPassed) {
                return false;
            }

            const reachBottomEdge = character.currentY <= path.maxY;
            if (!reachBottomEdge) {
                return false;
            }

            if (!this.pathOnWayY(path)) {
                return false;
            }

            const characterTopY = character.currentY;
            const stuck = this.getHorizontalLines(path, false).some((line) => {
                const linePassed = characterTopY < line.y;
                if (linePassed) {
                    return false;
                }
                const leftCornerOnWayX = character.currentX < line.start;
                const rightCornerOnWayX = character.currentX + character.width > line.end;
                const lineOnWay = leftCornerOnWayX && rightCornerOnWayX;
                const lineReached = characterTopY <= line.y;
                return lineReached && lineOnWay;
            });
            return stuck;
        });
    }

    private rectangleOnWayX(rectangle: Rectangle): boolean {
        const topCornerOnWayY = character.currentY < rectangle.topLeftY + rectangle.height;
        const bottomCornerOnWayY = character.currentY + character.height > rectangle.topLeftY;
        return topCornerOnWayY && bottomCornerOnWayY;
    }

    private rectangleOnWayY(rectangle: Rectangle): boolean {
        const leftCornerOnWayX = character.currentX < rectangle.topLeftX + rectangle.width;
        const rightCornerOnWayX = character.currentX + character.width > rectangle.topLeftX;
        return leftCornerOnWayX && rightCornerOnWayX;
    }

    private pathOnWayY(path: Path): boolean {
        const leftCornerOnWayX = character.currentX < path.maxX;
        const rightCornerOnWayX = character.currentX + character.width > path.minX;
        return leftCornerOnWayX && rightCornerOnWayX;
    }

    private pathOnWayX(path: Path): boolean {
        const bottomCornerOnWayY = character.currentY + character.height > path.minY;
        const topCornerOnWayY = character.currentY < path.maxY;
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
