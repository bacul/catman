import {ElementStateClass, UIElements} from '../ui-layer/ui-layer';

import {State} from '../../application-state';

export class PowerUp {
    static active: boolean;
    private readonly durationSeconds = 8;
    private static timeoutId: NodeJS.Timeout;
    private static powerUpElement = document.querySelector(UIElements.powerUp);

    activatePowerUp(): void {
        this.cancelPowerUp();

        setTimeout(() => {
            PowerUp.active = true;
            State.enemyLayer.enemiesHandicapTick = 2;
            PowerUp.powerUpElement.classList.add(ElementStateClass.active);
        }, 100);

        PowerUp.timeoutId = setTimeout(() => {
            PowerUp.active = false;
            PowerUp.timeoutId = null;
            State.enemyLayer.enemiesHandicapTick = 1;
            PowerUp.powerUpElement.classList.remove(ElementStateClass.active);
        }, this.durationSeconds * 1000);
    }

    cancelPowerUp(): void {
        if (PowerUp.timeoutId) {
            PowerUp.powerUpElement.classList.remove(ElementStateClass.active);
            clearTimeout(PowerUp.timeoutId);
        }
    }
}
