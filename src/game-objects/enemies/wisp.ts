import { ASSET_KEYS, SPIDER_ANIMATION_KEYS, WISP_ANIMATION_KEYS } from "../../common/assets";
import { Direction, Position } from "../../common/types";
import * as Phaser from 'phaser';
import { InputComponent } from "../../components/input/input-component";
import { IdleState } from "../../components/state-machine/states/character/idle-state";
import { CHARACTER_STATES } from "../../components/state-machine/states/character/character-states";
import { MoveState } from "../../components/state-machine/states/character/move-state";
import { ENEMY_SPIDER_CHANGE_DIRECTION_DELAY_MAX, ENEMY_SPIDER_CHANGE_DIRECTION_DELAY_MIN, ENEMY_SPIDER_CHANGE_DIRECTION_DELAY_WAIT, ENEMY_SPIDER_SPEED, ENEMY_WISP_MAX_HEALTH, ENEMY_WISP_PULSE_ANIMATION_DURATION, ENEMY_WISP_PULSE_ANIMATION_SCALE_X, ENEMY_WISP_PULSE_ANIMATION_SCALE_Y, ENEMY_WISP_SPEED } from "../../common/config";
import { AnimationConfig } from "../../components/game-object/animation-component";
import { CharacterGameObject } from "../common/character-game-object";
import { DIRECTION } from "../../common/common";
import { exhaustiveGuard } from "../../common/utils";
import { BounceMoveState } from "../../components/state-machine/states/character/bounce-move-state";

export type WispConfig = {
    scene: Phaser.Scene;
    position: Position;
};

export class Wisp extends CharacterGameObject {   
    constructor(config: WispConfig) {

        const animConfig = { key: WISP_ANIMATION_KEYS.IDLE, repeat: -1, ignoreIfPlaying: true }

        const animationConfig: AnimationConfig = {
            IDLE_DOWN: animConfig,
            IDLE_UP: animConfig,
            IDLE_LEFT: animConfig,
            IDLE_RIGHT: animConfig,
        };


        super({
            scene: config.scene,
            position: config.position,
            assetKey: ASSET_KEYS.WISP,
            frame: 0,
            id: `wisp-${Phaser.Math.RND.uuid()}`,
            isPlayer: false,
            animationConfig,
            speed: ENEMY_WISP_SPEED,
            inputComponent: new InputComponent(),
            isInvulnerable: true,
            maxLife: ENEMY_WISP_MAX_HEALTH
        });

        // add state machine
        this._stateMachine.addState(new BounceMoveState(this));
        this._stateMachine.setState(CHARACTER_STATES.BOUNCE_MOVE_STATE); 

        this.scene.tweens.add({
            targets: this,
            scaleX: ENEMY_WISP_PULSE_ANIMATION_SCALE_X,
            scaleY: ENEMY_WISP_PULSE_ANIMATION_SCALE_Y,
            yoyo: true,
            repeat: -1,
            duration: ENEMY_WISP_PULSE_ANIMATION_DURATION,
        });
   }
 } 
