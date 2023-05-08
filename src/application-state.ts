import {BackgroundLayer} from './game/background-layer/background-layer';
import {CharacterMovement} from './game/character-layer/character';
import {CharacterLayer} from './game/character-layer/character-layer';
import {CharacterTexture} from './game/character-layer/character-texture';
import {EnemyLayer} from './game/enemy-layer/enemy-layer';
import {EnemyTexture} from './game/enemy-layer/enemy-texture';
import {CollectibleCollision} from './game/mission-layer/collectible-collision';
import {MissionLayer} from './game/mission-layer/mission-layer';
import {PowerUp} from './game/mission-layer/power-up';
import {FigureCollision} from './game/shared/collision/wall-collision';
import {UILayer} from './game/ui-layer/ui-layer';

export class State {
    static readonly characterTexture = new CharacterTexture();
    static readonly backgroundLayer = new BackgroundLayer();
    static readonly characterLayer = new CharacterLayer();
    static readonly missionLayer = new MissionLayer();
    static readonly enemyLayer = new EnemyLayer();
    static readonly uiLayer = new UILayer();
    static readonly powerUp = new PowerUp();
    static readonly enemyTexture = new EnemyTexture();
    static readonly figureCollision = new FigureCollision();
    static readonly characterMovement = new CharacterMovement();
    static readonly collectibleCollision = new CollectibleCollision();
}
