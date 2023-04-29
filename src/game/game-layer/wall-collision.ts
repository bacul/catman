import {Figure, FigureType, backgroundLayer} from '../background-layer/background-layer';

import {character} from '../game';

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
        return backgroundLayer.figures.some((figure) => {
            if (figure.type === FigureType.rectangle) {
                const isWallPassed = figure.offsetX + figure.width <= character.currentX + character.width;
                if (isWallPassed) {
                    return false;
                }

                const reachRightEdge = character.currentX + character.width >= figure.offsetX;
                if (!reachRightEdge) {
                    return false;
                }

                return this.rectangleOnWayX(figure);
            }

            if (figure.type === FigureType.path) {
                const figureRightX = Math.max(...figure.path.map((item) => item.x));
                const isWallPassed = figureRightX < character.currentX;
                if (isWallPassed) {
                    return false;
                }

                const reachLeftEdge = character.currentX + character.width >= figure.offsetX;
                if (!reachLeftEdge) {
                    return false;
                }

                if (!this.pathOnWayX(figure)) {
                    return false;
                }

                const characterRightX = character.currentX + character.width;
                const stuck = this.getVerticalLines(figure, false).some((line) => {
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
            }
        });
    }

    stuckLeft(): boolean {
        return backgroundLayer.figures.some((figure) => {
            if (figure.type === FigureType.rectangle) {
                const isWallPassed = figure.offsetX >= character.currentX + character.width;
                if (isWallPassed) {
                    return false;
                }

                const reachLeftEdge = character.currentX <= figure.offsetX + figure.width;
                if (!reachLeftEdge) {
                    return false;
                }

                return this.rectangleOnWayX(figure);
            }

            if (figure.type === FigureType.path) {
                const figureLeftX = Math.min(...figure.path.map((item) => item.x));
                const isWallPassed = figureLeftX > character.currentX;
                if (isWallPassed) {
                    return false;
                }

                const reachRightEdge = character.currentX <= Math.max(...figure.path.map((item) => item.x));
                if (!reachRightEdge) {
                    return false;
                }

                if (!this.pathOnWayX(figure)) {
                    return false;
                }

                const characterLeftX = character.currentX;
                const stuck = this.getVerticalLines(figure, true).some((line) => {
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
            }
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

                if (!this.pathOnWayY(figure)) {
                    return false;
                }

                const characterBottomY = character.currentY + character.height;
                const stuck = this.getHorizontalLines(figure, true).some((line) => {
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

                if (!this.pathOnWayY(figure)) {
                    return false;
                }

                const characterTopY = character.currentY;
                const stuck = this.getHorizontalLines(figure, false).some((line) => {
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

    private pathOnWayY(figure: Figure): boolean {
        const leftFigureCornerX = Math.min(...figure.path.map((item) => item.x));
        const leftCornerOnWayX = character.currentX < Math.max(...figure.path.map((item) => item.x));
        const rightCornerOnWayX = character.currentX + character.width > leftFigureCornerX;
        return leftCornerOnWayX && rightCornerOnWayX;
    }

    private pathOnWayX(figure: Figure): boolean {
        const topFigureCornerY = Math.min(...figure.path.map((item) => item.y));
        const bottomCornerOnWayY = character.currentY + character.height > topFigureCornerY;
        const topCornerOnWayY = character.currentY < Math.max(...figure.path.map((item) => item.y));
        return bottomCornerOnWayY && topCornerOnWayY;
    }

    private getHorizontalLines(figure: Figure, bottomLines: boolean): HorizontalLine[] {
        return figure.path
            .map((point, index) => {
                if (index === 0) {
                    return {
                        start: figure.offsetX,
                        end: point.x,
                        y: point.y
                    };
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
                    if (bottomLines) {
                        return line.start < line.end;
                    }
                    return line.start > line.end;
                }
                return null;
            });
    }

    private getVerticalLines(figure: Figure, rightLines: boolean): VerticalLine[] {
        return figure.path
            .map((point, index) => {
                const next = figure.path[index + 1];
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
