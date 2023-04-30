import {Enemy, MoveDirectionType, character, enemies, gameSize} from '../game';

import {FigureCollision} from '../character-layer/wall-collision';

export class EnemyLayer {
    private readonly canvas: HTMLCanvasElement = document.querySelector('#enemy-layer');
    private readonly context: CanvasRenderingContext2D;
    private readonly figureCollision = new FigureCollision();
    private readonly enemyHandicapTick: number = 5;
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
            // this.moveAction();
        } else {
            this.enemyHandicap = 0;
        }
    }

    private moveAction(): void {
        enemies.forEach((enemy) => {
            const enemyDirection = enemy.direction;
            const closestDirection = this.getClosestToMove(enemy);

            const moveOnClosestDirection = closestDirection === enemy.direction.moveDirection;
            const needChangeMovement =
                !moveOnClosestDirection && enemyDirection.moveDirection !== enemyDirection.changeToDirection;
            let canChangeMovement: boolean;
            if (needChangeMovement) {
                switch (closestDirection) {
                    case MoveDirectionType.up:
                        canChangeMovement = !this.figureCollision.stuckTop(enemy);
                        break;
                    case MoveDirectionType.down:
                        canChangeMovement = !this.figureCollision.stuckBottom(enemy);
                        break;
                    case MoveDirectionType.left:
                        canChangeMovement = !this.figureCollision.stuckLeft(enemy);
                        break;
                    case MoveDirectionType.right:
                        canChangeMovement = !this.figureCollision.stuckRight(enemy);
                        break;
                }
                if (canChangeMovement) {
                    enemyDirection.moveDirection = closestDirection;
                } else {
                    enemy.stuck = true;

                    const firstStuckDirection = closestDirection;
                    const secondStickDirection = this.getClosestToMove(enemy, firstStuckDirection);
                    const newDirection = this.getCounterMoveDirection(firstStuckDirection);
                    console.log('stuck');
                }
            }

            switch (enemyDirection.moveDirection) {
                case MoveDirectionType.up:
                    if (canChangeMovement || !this.figureCollision.stuckTop(enemy)) {
                        enemy.currentY -= enemy.stepSize;
                    }
                    break;
                case MoveDirectionType.down:
                    if (canChangeMovement || !this.figureCollision.stuckBottom(enemy)) {
                        enemy.currentY += enemy.stepSize;
                    }
                    break;
                case MoveDirectionType.left:
                    if (canChangeMovement || !this.figureCollision.stuckLeft(enemy)) {
                        enemy.currentX -= enemy.stepSize;
                    }
                    break;
                case MoveDirectionType.right:
                    if (canChangeMovement || !this.figureCollision.stuckRight(enemy)) {
                        enemy.currentX += enemy.stepSize;
                    }
                    break;
            }
        });
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

    private getClosestToMove(enemy: Enemy, exclude?: MoveDirectionType): MoveDirectionType {
        const distanceToCharacterX = enemy.currentX - character.currentX;
        const distanceToCharacterY = enemy.currentY - character.currentY;

        if (exclude) {
            let excludeX: boolean = exclude === MoveDirectionType.left || exclude === MoveDirectionType.right;
            if (excludeX) {
                return this.getClosestYToMove(distanceToCharacterY > 0);
            } else {
                return this.getClosestXToMove(distanceToCharacterX > 0);
            }
        }

        if (distanceToCharacterX > distanceToCharacterY) {
            return this.getClosestXToMove(distanceToCharacterX > 0);
        } else {
            return this.getClosestYToMove(distanceToCharacterY > 0);
        }
    }

    private getClosestYToMove(characterOnTopSide: boolean): MoveDirectionType {
        if (characterOnTopSide) {
            return MoveDirectionType.up;
        } else {
            return MoveDirectionType.down;
        }
    }

    private getClosestXToMove(characterOnLeftSide: boolean): MoveDirectionType {
        if (characterOnLeftSide) {
            return MoveDirectionType.left;
        } else {
            return MoveDirectionType.right;
        }
    }
}
