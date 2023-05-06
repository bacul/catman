import {Enemy, MoveDirectionType, character, enemies, gameSize} from '../game';

import {State} from '../../application-state';
import {EnemyLayerContext} from './enemy-layer-context';

export class EnemyLayer {
    private readonly enemiesHandicapTick: number = 1;
    private enemiesHandicap: number = 0;
    static gameOverEventName = 'game-over';

    constructor() {
        enemies.forEach((enemy) => {
            enemy.direction.moveDirection = this.getClosestToMove(enemy);
        });
    }

    draw(): void {
        enemies.forEach((enemy) => {
            EnemyLayerContext.context.clearRect(0, 0, gameSize.width, gameSize.height);
            State.enemyTexture.draw(enemy.currentX, enemy.currentY);
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

    private setGameOver(gameOver: boolean): void {
        if (gameOver) {
            document.dispatchEvent(new CustomEvent(EnemyLayer.gameOverEventName));
            State.uiLayer.setGameDefeat();
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
            } else {
                const secondClosest = this.getClosestToMove(enemy, enemy.direction.moveDirection);
                const canMoveOnSecondClosest = this.canMove(enemy, secondClosest);
                if (canMoveOnSecondClosest) {
                    enemy.direction.changeToDirection = enemy.direction.moveDirection;
                    enemy.direction.moveDirection = secondClosest;
                } else {
                    enemy.blockDirections.push(secondClosest);
                    this.setDirectionWhenTwoBlocked(enemy);
                }
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
                    if (!State.figureCollision.stuckTop(enemy)) {
                        enemy.currentY -= enemy.stepSize;
                        State.enemyTexture.setUpView();
                        this.setGameOver(this.isGameOver(enemy, MoveDirectionType.up));
                    }
                    break;
                case MoveDirectionType.down:
                    if (!State.figureCollision.stuckBottom(enemy)) {
                        enemy.currentY += enemy.stepSize;
                        State.enemyTexture.setDownView();
                        this.setGameOver(this.isGameOver(enemy, MoveDirectionType.down));
                    }
                    break;
                case MoveDirectionType.left:
                    if (!State.figureCollision.stuckLeft(enemy)) {
                        enemy.currentX -= enemy.stepSize;
                        State.enemyTexture.setLeftView();
                        this.setGameOver(this.isGameOver(enemy, MoveDirectionType.left));
                        if (State.figureCollision.isInLeftTunnel(enemy)) {
                            State.figureCollision.setWalkThroughLeftTunnel(enemy);
                        }
                    }
                    break;
                case MoveDirectionType.right:
                    if (!State.figureCollision.stuckRight(enemy)) {
                        enemy.currentX += enemy.stepSize;
                        State.enemyTexture.setRightView();
                        this.setGameOver(this.isGameOver(enemy, MoveDirectionType.right));
                        if (State.figureCollision.isInRightTunnel(enemy)) {
                            State.figureCollision.setWalkThroughRightTunnel(enemy);
                        }
                    }
                    break;
            }
        });
    }

    private canMove(enemy: Enemy, direction: MoveDirectionType): boolean {
        switch (direction) {
            case MoveDirectionType.up:
                return !State.figureCollision.stuckTop(enemy);
            case MoveDirectionType.down:
                return !State.figureCollision.stuckBottom(enemy);
            case MoveDirectionType.left:
                return !State.figureCollision.stuckLeft(enemy);
            case MoveDirectionType.right:
                return !State.figureCollision.stuckRight(enemy);
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

    private isGameOver(enemy: Enemy, direction: MoveDirectionType): boolean {
        switch (direction) {
            case MoveDirectionType.up:
                const differenceTopY = enemy.currentY - character.currentY - character.height;
                const characterTopCaptured =
                    enemy.currentX === character.currentX &&
                    (differenceTopY === 0 ||
                        (differenceTopY < 0 && differenceTopY >= -character.height) ||
                        (differenceTopY > 0 && differenceTopY <= -character.height));
                return characterTopCaptured;
            case MoveDirectionType.down:
                const differenceBottomY = enemy.currentY + enemy.height - character.currentY;
                const characterBottomCaptured =
                    enemy.currentX === character.currentX &&
                    (differenceBottomY === 0 ||
                        (differenceBottomY < 0 && differenceBottomY >= character.height) ||
                        (differenceBottomY > 0 && differenceBottomY <= character.height));
                return characterBottomCaptured;
            case MoveDirectionType.left:
                const differenceLeftX = enemy.currentX - character.currentX - character.width;
                const characterLeftCaptured =
                    enemy.currentY === character.currentY &&
                    (differenceLeftX === 0 ||
                        (differenceLeftX < 0 && differenceLeftX >= -character.width) ||
                        (differenceLeftX > 0 && differenceLeftX <= -character.width));
                return characterLeftCaptured;
            case MoveDirectionType.right:
                const differenceRightX = enemy.currentX - character.currentX;
                const characterRightCaptured =
                    enemy.currentY === character.currentY &&
                    (differenceRightX === 0 ||
                        (differenceRightX < 0 && differenceRightX >= -character.width) ||
                        (differenceRightX > 0 && differenceRightX <= -character.width));
                return characterRightCaptured;
        }
    }
}
