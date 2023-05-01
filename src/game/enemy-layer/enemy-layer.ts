import {Enemy, MoveDirectionType, character, enemies, gameSize} from '../game';

import {FigureCollision} from '../character-layer/wall-collision';

export class EnemyLayer {
    private readonly canvas: HTMLCanvasElement = document.querySelector('#enemy-layer');
    private readonly context: CanvasRenderingContext2D;
    private readonly figureCollision = new FigureCollision();
    private readonly enemyHandicapTick: number = 2;
    private enemyHandicap: number = 0;

    constructor() {
        this.context = this.canvas.getContext('2d');
        enemies.forEach((enemy) => {
            enemy.direction.moveDirection = this.getClosestToMove(enemy);
        });
    }

    draw(): void {
        enemies.forEach((enemy) => {
            this.context.clearRect(0, 0, gameSize.width, gameSize.height);
            this.context.fillRect(enemy.currentX, enemy.currentY, enemy.width, enemy.height);
            this.context.fillStyle = enemy.color;
        });
    }

    move(): void {
        if (this.enemyHandicap !== this.enemyHandicapTick) {
            this.enemyHandicap++;
            this.moveAction();
        } else {
            this.enemyHandicap = 0;
        }
    }

    private getMoveDirection(enemy: Enemy): MoveDirectionType {
        let closestDirection = this.getClosestToMove(enemy);
        let blockedDirections = enemy.blockDirections;
        let extrimeState: boolean;

        const onXStart = enemy.currentX === 0;
        if (onXStart) {
            enemy.blockDirections.add(MoveDirectionType.left);
            extrimeState = true;
        }
        const onXEnd = enemy.currentX + enemy.width === gameSize.width;
        if (onXEnd) {
            enemy.blockDirections.add(MoveDirectionType.right);
            extrimeState = true;
        }
        const onYStart = enemy.currentY === 0;
        if (onYStart) {
            enemy.blockDirections.add(MoveDirectionType.up);
            extrimeState = true;
        }
        const onYEnd = enemy.currentY + enemy.height === gameSize.height;
        if (onYEnd) {
            enemy.blockDirections.add(MoveDirectionType.down);
            extrimeState = true;
        }

        if (enemy.blockDirections.size === 2) {
            if (extrimeState) {
                const closedDestination = this.getClosestToMove(enemy);
                if (this.canMove(enemy, closedDestination)) {
                    enemy.blockDirections.clear();
                    return closedDestination;
                } else {
                    return this.getClosestToMove(enemy, closedDestination);
                }
            }
            return this.getDirectionWhenTwoBlocked(enemy);
        }

        if (enemy.blockDirections.size === 1) {
            return this.getDirectionWhenOneBlocked(enemy, closestDirection);
        }

        const canChangeOnClosest = this.canMove(enemy, closestDirection);
        if (canChangeOnClosest) {
            blockedDirections.clear();
            return closestDirection;
        }

        blockedDirections.add(closestDirection);
        const secondClosest = this.getClosestToMove(enemy, closestDirection);
        const secondClosestAvailable = this.canMove(enemy, secondClosest);
        if (secondClosestAvailable) {
            return this.getDirectionWhenOneBlocked(enemy, closestDirection);
        } else {
            enemy.blockDirections.add(secondClosest);
        }
    }

    private getDirectionWhenOneBlocked(enemy: Enemy, closestDirection: MoveDirectionType): MoveDirectionType {
        if (!enemy.blockDirections.has(closestDirection)) {
            enemy.blockDirections.add(closestDirection);
            return this.getDirectionWhenTwoBlocked(enemy);
        }
        const canChangeOnClosest = this.canMove(enemy, closestDirection);
        if (canChangeOnClosest) {
            enemy.blockDirections.clear();
            return closestDirection;
        } else {
            const secondClosest = this.getClosestToMove(enemy, closestDirection);
            const canMoveSecondClosest = this.canMove(enemy, secondClosest);
            if (canMoveSecondClosest) {
                return secondClosest;
            } else {
                enemy.blockDirections.add(secondClosest);
                return this.getDirectionWhenTwoBlocked(enemy);
            }
        }
    }

    private getDirectionWhenTwoBlocked(enemy: Enemy): MoveDirectionType {
        const blockedDirectionsValues = enemy.blockDirections.values();
        let wayToMove: MoveDirectionType = this.getCounterMoveDirection(blockedDirectionsValues.next().value);
        let exit: MoveDirectionType = blockedDirectionsValues.next().value;

        const canGoExit = this.canMove(enemy, exit);
        if (canGoExit) {
            enemy.blockDirections.clear();
            return exit;
        } else {
            return wayToMove;
        }
    }

    private getClosestToMove(enemy: Enemy, exclude?: MoveDirectionType): MoveDirectionType {
        const differenceX = enemy.currentX - character.currentX;
        const differenceY = enemy.currentY - character.currentY;

        const distanceToCharacterX = differenceX;
        const distanceToCharacterY = differenceY;

        if (exclude) {
            let excludeX: boolean = exclude === MoveDirectionType.left || exclude === MoveDirectionType.right;
            if (excludeX) {
                const closestY = this.getClosestYToMove(distanceToCharacterY);
                if (closestY === exclude) {
                    return this.getCounterMoveDirection(closestY);
                }
                return closestY;
            } else {
                const closestX = this.getClosestXToMove(distanceToCharacterX);
                if (closestX === exclude) {
                    return this.getCounterMoveDirection(closestX);
                }
                return closestX;
            }
        }

        const destinationXReached = differenceX === 0;
        if (destinationXReached) {
            return this.getClosestYToMove(distanceToCharacterY);
        }
        const destinationYReached = differenceY === 0;
        if (destinationYReached) {
            return this.getClosestXToMove(distanceToCharacterX);
        }

        if (distanceToCharacterX > distanceToCharacterY) {
            return this.getClosestXToMove(distanceToCharacterX);
        } else {
            return this.getClosestYToMove(distanceToCharacterY);
        }
    }

    private moveAction(): void {
        enemies.forEach((enemy) => {
            enemy.direction.moveDirection = this.getMoveDirection(enemy);
            switch (enemy.direction.moveDirection) {
                case MoveDirectionType.up:
                    if (!this.figureCollision.stuckTop(enemy)) {
                        enemy.currentY -= enemy.stepSize;
                    }
                    break;
                case MoveDirectionType.down:
                    if (!this.figureCollision.stuckBottom(enemy)) {
                        enemy.currentY += enemy.stepSize;
                    }
                    break;
                case MoveDirectionType.left:
                    if (!this.figureCollision.stuckLeft(enemy)) {
                        enemy.currentX -= enemy.stepSize;
                    }
                    break;
                case MoveDirectionType.right:
                    if (!this.figureCollision.stuckRight(enemy)) {
                        enemy.currentX += enemy.stepSize;
                    }
                    break;
            }
        });
    }

    private canMove(enemy: Enemy, direction: MoveDirectionType): boolean {
        switch (direction) {
            case MoveDirectionType.up:
                return !this.figureCollision.stuckTop(enemy);
            case MoveDirectionType.down:
                return !this.figureCollision.stuckBottom(enemy);
            case MoveDirectionType.left:
                return !this.figureCollision.stuckLeft(enemy);
            case MoveDirectionType.right:
                return !this.figureCollision.stuckRight(enemy);
        }
    }

    private getCounterMoveDirection(direction: MoveDirectionType): MoveDirectionType {
        switch (direction) {
            case MoveDirectionType.up:
                return MoveDirectionType.down;
            case MoveDirectionType.down:
                return MoveDirectionType.up;
            case MoveDirectionType.left:
                return MoveDirectionType.right;
            case MoveDirectionType.right:
                return MoveDirectionType.left;
        }
    }

    private getClosestYToMove(distanceToCharacterY: number): MoveDirectionType {
        if (distanceToCharacterY > 0) {
            return MoveDirectionType.up;
        } else {
            return MoveDirectionType.down;
        }
    }

    private getClosestXToMove(distanceToCharacterX: number): MoveDirectionType {
        if (distanceToCharacterX > 0) {
            return MoveDirectionType.left;
        } else {
            return MoveDirectionType.right;
        }
    }
}
