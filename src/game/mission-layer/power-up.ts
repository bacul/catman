export class PowerUp {
    static active: boolean;
    private readonly durationMs = 10000;

    constructor() {}

    activatePowerUp(): void {
        PowerUp.active = true;
        setTimeout(() => {
            PowerUp.active = false;
        }, this.durationMs);
    }
}
