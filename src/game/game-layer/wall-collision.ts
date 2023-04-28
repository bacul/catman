import {Figure, FigureType, Point, backgroundLayer} from '../background-layer/background-layer';

import {character} from '../game';

interface HorizontalLine {
    start: number;
    end: number;
    y: number;
}

export class WallCollision {
    stuckRight(): boolean {
        return backgroundLayer.figures.some((figure) => {
            if (figure.type !== FigureType.rectangle) {
                return false;
            }

            const isWallPassed = figure.offsetX + figure.width <= character.currentX + character.width;
            if (isWallPassed) {
                return false;
            }

            const reachRightEdge = character.currentX + character.width >= figure.offsetX;
            if (!reachRightEdge) {
                return false;
            }

            return this.rectangleOnWayX(figure);
        });
    }

    stuckLeft(): boolean {
        return backgroundLayer.figures.some((figure) => {
            if (figure.type !== FigureType.rectangle) {
                return false;
            }

            const isWallPassed = figure.offsetX >= character.currentX + character.width;
            if (isWallPassed) {
                return false;
            }

            const reachLeftEdge = character.currentX <= figure.offsetX + figure.width;
            if (!reachLeftEdge) {
                return false;
            }

            return this.rectangleOnWayX(figure);
        });
    }

    stuckBottom(): boolean {
        return backgroundLayer.figures.some((figure) => {
            if (figure.type === FigureType.rectangle) {
                const isWallPassed = figure.offsetY < character.currentY + character.height;
                if (isWallPassed) {
                    return false;
                }

                const reachBottomEdge = character.currentY + character.height >= figure.offsetY;
                if (!reachBottomEdge) {
                    return false;
                }

                return this.rectangleOnWayY(figure);
            }

            if (figure.type === FigureType.path) {
                const figureBottomY = Math.max(...figure.path.map((item) => item.y));
                const isWallPassed = figureBottomY < character.currentY + character.height;
                if (isWallPassed) {
                    return false;
                }

                const reachTopEdge = character.currentY + character.height >= figure.offsetY;
                if (!reachTopEdge) {
                    return false;
                }

                const leftFigureCornerX = Math.min(...figure.path.map((item) => item.x));
                const leftCornerOnWayX = character.currentX < Math.max(...figure.path.map((item) => item.x));
                const rightCornerOnWayX = character.currentX + character.width > leftFigureCornerX;
                const figureOnWayY = leftCornerOnWayX && rightCornerOnWayX;

                if (!figureOnWayY) {
                    return false;
                }

                const characterBottomY = character.currentY + character.height;
                const stuck = this.getHorizontalLines(figure.path, figure, true).some((line) => {
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
            }
        });
    }

    stuckTop(): boolean {
        return backgroundLayer.figures.some((figure) => {
            if (figure.type === FigureType.rectangle) {
                const isWallPassed = figure.offsetY + figure.height > character.currentY;
                if (isWallPassed) {
                    return false;
                }

                const reachTopEdge = character.currentY <= figure.offsetY + figure.height;
                if (!reachTopEdge) {
                    return false;
                }

                return this.rectangleOnWayY(figure);
            }

            if (figure.type === FigureType.path) {
                const figureTopY = Math.min(...figure.path.map((item) => item.y));
                const isWallPassed = figureTopY > character.currentY + character.height;
                if (isWallPassed) {
                    return false;
                }

                const reachBottomEdge = character.currentY <= Math.max(...figure.path.map((item) => item.y));
                if (!reachBottomEdge) {
                    return false;
                }

                const leftFigureCornerX = Math.min(...figure.path.map((item) => item.x));
                const leftCornerOnWayX = character.currentX < Math.max(...figure.path.map((item) => item.x));
                const rightCornerOnWayX = character.currentX + character.width > leftFigureCornerX;
                const figureOnWayY = leftCornerOnWayX && rightCornerOnWayX;

                if (!figureOnWayY) {
                    return false;
                }

                const characterTopY = character.currentY;
                const stuck = this.getHorizontalLines(figure.path, figure, false).some((line) => {
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
            }
        });
    }

    private rectangleOnWayX(rectangle: Figure): boolean {
        const topCornerOnWayY = character.currentY < rectangle.offsetY + rectangle.height;
        const bottomCornerOnWayY = character.currentY + character.height > rectangle.offsetY;
        return topCornerOnWayY && bottomCornerOnWayY;
    }

    private rectangleOnWayY(rectangle: Figure): boolean {
        const leftCornerOnWayX = character.currentX < rectangle.offsetX + rectangle.width;
        const rightCornerOnWayX = character.currentX + character.width > rectangle.offsetX;
        return leftCornerOnWayX && rightCornerOnWayX;
    }

    private getHorizontalLines(points: Point[], figure: Figure, startToEnd: boolean): HorizontalLine[] {
        return points
            .map((point, index) => {
                if (index === 0) {
                    const horizontalLine = figure.offsetY === point.y;
                    if (horizontalLine) {
                        return {
                            start: figure.offsetX,
                            end: point.x,
                            y: point.y
                        };
                    }
                    return null;
                }

                if (figure.path[index + 1]) {
                    const horizontalLine = point.y === figure.path[index + 1].y;
                    if (horizontalLine) {
                        return {
                            start: point.x,
                            end: figure.path[index + 1].x,
                            y: point.y
                        };
                    }
                }
                return null;
            })
            .filter((line) => {
                if (line) {
                    if (startToEnd) {
                        return line.start < line.end;
                    }
                    return line.start > line.end;
                }

                return null;
            });
    }
}
