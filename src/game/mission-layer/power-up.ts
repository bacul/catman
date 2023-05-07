import {ElementStateClass, UIElements} from '../ui-layer/ui-layer';

import {State} from '../../application-state';

export class PowerUp {
    static active: boolean;
    private readonly durationMs = 10000;
    private static timeoutId: NodeJS.Timeout;
    private static powerUpElement = document.querySelector(UIElements.powerUp);

    activatePowerUp(): void {
        if (PowerUp.timeoutId) {
            PowerUp.powerUpElement.classList.remove(ElementStateClass.active);
            clearTimeout(PowerUp.timeoutId);
        }

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
        }, this.durationMs);
    }
}
