import {Enemy, MoveDirectionType, character, enemies, gameSize} from '../game';

import {FigureCollision} from '../character-layer/wall-collision';

export class EnemyLayer {
    private readonly canvas: HTMLCanvasElement = document.querySelector('#enemy-layer');
    private readonly context: CanvasRenderingContext2D;
    private readonly figureCollision = new FigureCollision();
    private readonly enemiesHandicapTick: number = 1;
    private enemiesHandicap: number = 0;

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
        if (this.enemiesHandicap !== this.enemiesHandicapTick) {
            this.enemiesHandicap++;
            this.moveAction();
        } else {
            this.enemiesHandicap = 0;
        }
    }

    private setMoveDirection(enemy: Enemy): void {
        let closestDirection = this.getClosestToMove(enemy);
        if (enemy.blockDirections.length === 2) {
            this.setDirectionWhenTwoBlocked(enemy);
            return;
        }

        if (enemy.blockDirections.length === 1) {
            this.setDirectionWhenOneBlocked(enemy);
            return;
        }

        let blockedDirections = enemy.blockDirections;
        const canChangeOnClosest = this.canMove(enemy, closestDirection);
        if (canChangeOnClosest) {
            blockedDirections = [];
            enemy.direction.moveDirection = closestDirection;
            return;
        }

        enemy.direction.changeToDirection = closestDirection;
        blockedDirections.push(closestDirection);

        const secondClosest = this.getClosestToMove(enemy, closestDirection);
        const secondClosestAvailable = this.canMove(enemy, secondClosest);
        if (secondClosestAvailable) {
            this.setDirectionWhenOneBlocked(enemy);
        } else {
            enemy.blockDirections.push(secondClosest);
            this.setDirectionWhenTwoBlocked(enemy);
        }
    }

    private setDirectionWhenOneBlocked(enemy: Enemy): void {
        const canMoveOnNext = this.canMove(enemy, enemy.direction.changeToDirection);
        if (canMoveOnNext) {
            enemy.direction.moveDirection = enemy.direction.changeToDirection;
            enemy.direction.changeToDirection = null;
            enemy.blockDirections = [];
            return;
        }

        const canMoveOnCurrent = this.canMove(enemy, enemy.direction.moveDirection);
        if (canMoveOnCurrent) {
            if (canMoveOnNext) {
                enemy.direction.moveDirection = enemy.direction.changeToDirection;
                enemy.direction.changeToDirection = null;
                enemy.blockDirections = [];
            }
        } else {
            const extrimeState = this.getExtrimeState(enemy);
            if (extrimeState) {
                enemy.blockDirections.push(extrimeState);
                this.setDirectionWhenTwoBlocked(enemy);
            } else {
                enemy.direction.moveDirection = this.getClosestToMove(enemy, enemy.direction.moveDirection);
            }
        }
    }

    private setDirectionWhenTwoBlocked(enemy: Enemy): void {
        const canMoveOnCurrent = this.canMove(enemy, enemy.direction.moveDirection);
        const canMoveOnNext = this.canMove(enemy, enemy.direction.changeToDirection);
        if (canMoveOnCurrent) {
            if (canMoveOnNext) {
                enemy.direction.moveDirection = enemy.direction.changeToDirection;
                enemy.blockDirections = [];
            }
            return;
        }
        if (canMoveOnNext) {
            enemy.direction.moveDirection = enemy.direction.changeToDirection;
            enemy.direction.changeToDirection = null;
            enemy.blockDirections = [];
            return;
        }

        let blocked = [...enemy.blockDirections].filter((block) => block !== enemy.direction.moveDirection);
        enemy.direction.moveDirection = this.getCounterMoveDirection(blocked[0]);
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
            this.setMoveDirection(enemy);
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

    private getExtrimeState(enemy: Enemy): MoveDirectionType {
        const onXStart = enemy.currentX === 0;
        if (onXStart) {
            return MoveDirectionType.left;
        }
        const onXEnd = enemy.currentX + enemy.width === gameSize.width;
        if (onXEnd) {
            return MoveDirectionType.right;
        }
        const onYStart = enemy.currentY === 0;
        if (onYStart) {
            return MoveDirectionType.up;
        }
        const onYEnd = enemy.currentY + enemy.height === gameSize.height;
        if (onYEnd) {
            return MoveDirectionType.down;
        }

        return null;
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
