import {Enemy, enemies, getNewEnemy} from './enemies';

import {State} from '../../application-state';
import {character} from '../character-layer/character';
import {gameSizeModel} from '../game-model';
import {PowerUp} from '../mission-layer/power-up';
import {MoveDirectionType} from '../shared/movable-entity';
import {EnemyLayerContext} from './enemy-layer-context';

export class EnemyLayer {
    static readonly gameOverEventName = 'game-over';
    private _enemiesHandicapTick: number = 2;
    private enemiesHandicap: number = 0;
    static enemies = [...enemies];
    private _activeEnemies = 1;
    private arriveEnemiesByTime = 1;
    private defeatedEnemyDelayMs = 5000;

    constructor() {
        EnemyLayer.enemies.forEach((enemy) => {
            enemy.direction.moveDirection = this.getClosestToMove(enemy);
        });
    }

    get activeEnemies(): number {
        return this._activeEnemies;
    }

    set activeEnemies(value: number) {
        this._activeEnemies = value;
    }

    addNewEnemies(): void {
        const secondEnemyArriveMs = 15000;
        this.addNewEnemyWithDelay$(secondEnemyArriveMs).then(() => {
            this.arriveEnemiesByTime += 1;
        });

        const thirdEnemyArriveMs = 20000;
        this.addNewEnemyWithDelay$(thirdEnemyArriveMs).then(() => {
            this.arriveEnemiesByTime += 1;
        });

        const fourthEnemyArriveMs = 30000;
        this.addNewEnemyWithDelay$(fourthEnemyArriveMs).then(() => {
            this.arriveEnemiesByTime += 1;
        });
    }

    private addNewEnemyWithDelay$(delayMs: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newEnemy = getNewEnemy();
                newEnemy.direction.moveDirection = this.getClosestToMove(newEnemy);
                EnemyLayer.enemies.push(newEnemy);
                this.activeEnemies += 1;
                this.arriveEnemiesByTime++;
                resolve();
            }, delayMs);
        });
    }

    set enemiesHandicapTick(value: number) {
        this.enemiesHandicap = 0;
        this._enemiesHandicapTick = value;
    }

    get enemiesHandicapTick(): number {
        return this._enemiesHandicapTick;
    }

    draw(): void {
        EnemyLayerContext.context.clearRect(0, 0, gameSizeModel.width, gameSizeModel.height);
        State.enemyTexture.draw(EnemyLayer.enemies);
    }

    move(): void {
        if (this.enemiesHandicap === this.enemiesHandicapTick) {
            this.enemiesHandicap = 0;
            this.moveAction();
        } else {
            this.enemiesHandicap++;
        }
    }

    defeatEnemyById(id: number): void {
        if (~id) {
            EnemyLayer.enemies.splice(id, 1);
            EnemyLayerContext.context.clearRect(0, 0, gameSizeModel.width, gameSizeModel.height);
            State.enemyLayer.activeEnemies = State.enemyLayer.activeEnemies - 1;

            if (this._activeEnemies < this.arriveEnemiesByTime) {
                this._activeEnemies += 1;
                this.defeatedEnemyDelayMs += 1500;
                this.addNewEnemyWithDelay$(this.defeatedEnemyDelayMs);
            }
        }
    }

    private setGameOver(gameOver: boolean): void {
        if (gameOver) {
            document.dispatchEvent(new CustomEvent(EnemyLayer.gameOverEventName));
            State.uiLayer.setGameDefeat();
        }
    }

    private setFarestMoveDirection(enemy: Enemy): void {
        let farestDirection = this.getFarestToMove(enemy);
        if (enemy.blockDirections.length === 2) {
            this.setDirectionWhenTwoBlocked(enemy);
            return;
        }

        if (enemy.blockDirections.length === 1) {
            this.setDirectionWhenOneBlocked(enemy, false);
            return;
        }

        let blockedDirections = enemy.blockDirections;
        const canChangeOnClosest = this.canMove(enemy, farestDirection);
        if (canChangeOnClosest) {
            blockedDirections = [];
            enemy.direction.moveDirection = farestDirection;
            return;
        }

        enemy.direction.changeToDirection = farestDirection;
        blockedDirections.push(farestDirection);

        const secondFarest = this.getFarestToMove(enemy, farestDirection);
        const secondClosestAvailable = this.canMove(enemy, secondFarest);
        if (secondClosestAvailable) {
            enemy.direction.changeToDirection = secondFarest;
            this.setDirectionWhenOneBlocked(enemy);
        } else {
            enemy.blockDirections.push(secondFarest);
            this.setDirectionWhenTwoBlocked(enemy);
        }
    }

    private setClosestMoveDirection(enemy: Enemy): void {
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

    private setDirectionWhenOneBlocked(enemy: Enemy, closest: boolean = true): void {
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
                const secondDirection = closest
                    ? this.getClosestToMove(enemy, enemy.direction.moveDirection)
                    : this.getFarestToMove(enemy, enemy.direction.moveDirection);
                const canMoveOnSecondClosest = this.canMove(enemy, secondDirection);
                if (canMoveOnSecondClosest) {
                    enemy.direction.changeToDirection = enemy.direction.moveDirection;
                    enemy.direction.moveDirection = secondDirection;
                } else {
                    enemy.blockDirections.push(secondDirection);
                    this.setDirectionWhenTwoBlocked(enemy);
                }
            }
        } else {
            const extrimeState = this.getExtrimeState(enemy);
            if (extrimeState) {
                enemy.blockDirections.push(extrimeState);
                this.setDirectionWhenTwoBlocked(enemy);
            } else {
                const direction = closest
                    ? this.getClosestToMove(enemy, enemy.direction.moveDirection)
                    : this.getFarestToMove(enemy, enemy.direction.moveDirection);
                enemy.direction.moveDirection = direction;
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

    private getFarestToMove(enemy: Enemy, exclude?: MoveDirectionType): MoveDirectionType {
        const differenceX = enemy.currentX - character.currentX;
        const differenceY = enemy.currentY - character.currentY;

        const distanceToCharacterX = differenceX;
        const distanceToCharacterY = differenceY;

        if (exclude) {
            let excludeX: boolean = exclude === MoveDirectionType.left || exclude === MoveDirectionType.right;
            if (excludeX) {
                const closestY = this.getFarestYToMove(distanceToCharacterY);
                if (closestY === exclude) {
                    return this.getCounterMoveDirection(closestY);
                }
                return closestY;
            } else {
                const closestX = this.getFarestXToMove(distanceToCharacterX);
                if (closestX === exclude) {
                    return this.getCounterMoveDirection(closestX);
                }
                return closestX;
            }
        }

        const destinationXReached = differenceX === 0;
        if (destinationXReached) {
            return this.getFarestYToMove(distanceToCharacterY);
        }
        const destinationYReached = differenceY === 0;
        if (destinationYReached) {
            return this.getFarestXToMove(distanceToCharacterX);
        }

        if (distanceToCharacterX > distanceToCharacterY) {
            return this.getFarestXToMove(distanceToCharacterX);
        } else {
            return this.getFarestYToMove(distanceToCharacterY);
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
        EnemyLayer.enemies.forEach((enemy) => {
            if (!PowerUp.active) {
                this.setClosestMoveDirection(enemy);
            } else {
                this.setFarestMoveDirection(enemy);
            }
            switch (enemy.direction.moveDirection) {
                case MoveDirectionType.up:
                    if (!State.figureCollision.stuckTop(enemy)) {
                        enemy.currentY -= enemy.stepSize;
                        State.enemyTexture.setUpView(enemy);
                        if (!PowerUp.active) {
                            this.setGameOver(this.isGameOver(enemy, MoveDirectionType.up));
                        }
                    }
                    break;
                case MoveDirectionType.down:
                    if (!State.figureCollision.stuckBottom(enemy)) {
                        enemy.currentY += enemy.stepSize;
                        State.enemyTexture.setDownView(enemy);
                        if (!PowerUp.active) {
                            this.setGameOver(this.isGameOver(enemy, MoveDirectionType.down));
                        }
                    }
                    break;
                case MoveDirectionType.left:
                    if (!State.figureCollision.stuckLeft(enemy)) {
                        enemy.currentX -= enemy.stepSize;
                        State.enemyTexture.setLeftView(enemy);
                        if (!PowerUp.active) {
                            this.setGameOver(this.isGameOver(enemy, MoveDirectionType.left));
                        }
                        if (State.figureCollision.isInLeftTunnel(enemy)) {
                            State.figureCollision.setWalkThroughLeftTunnel(enemy);
                        }
                    }
                    break;
                case MoveDirectionType.right:
                    if (!State.figureCollision.stuckRight(enemy)) {
                        enemy.currentX += enemy.stepSize;
                        State.enemyTexture.setRightView(enemy);
                        if (!PowerUp.active) {
                            this.setGameOver(this.isGameOver(enemy, MoveDirectionType.right));
                        }
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

    /** FIXME is this needed? */
    private getExtrimeState(enemy: Enemy): MoveDirectionType {
        const onXStart = enemy.currentX === gameSizeModel.shiftXY;
        if (onXStart) {
            return MoveDirectionType.left;
        }
        const onXEnd = enemy.currentX + enemy.width === gameSizeModel.width - gameSizeModel.shiftXY;
        if (onXEnd) {
            return MoveDirectionType.right;
        }
        const onYStart = enemy.currentY === gameSizeModel.shiftXY;
        if (onYStart) {
            return MoveDirectionType.up;
        }
        const onYEnd = enemy.currentY + enemy.height === gameSizeModel.height - gameSizeModel.shiftXY;
        if (onYEnd) {
            return MoveDirectionType.down;
        }

        return null;
    }

    private getClosestYToMove(distanceToCharacterY: number): MoveDirectionType {
        if (distanceToCharacterY > 0) {
            return MoveDirectionType.up;
        }
        return MoveDirectionType.down;
    }

    private getClosestXToMove(distanceToCharacterX: number): MoveDirectionType {
        if (distanceToCharacterX > 0) {
            return MoveDirectionType.left;
        }
        return MoveDirectionType.right;
    }

    private getFarestYToMove(distanceToCharacterY: number): MoveDirectionType {
        if (distanceToCharacterY > 0) {
            return MoveDirectionType.down;
        }
        return MoveDirectionType.up;
    }

    private getFarestXToMove(distanceToCharacterX: number): MoveDirectionType {
        if (distanceToCharacterX > 0) {
            return MoveDirectionType.right;
        }
        return MoveDirectionType.left;
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
