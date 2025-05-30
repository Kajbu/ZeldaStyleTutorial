import { GameObject } from "../../common/types";
import { BaseGameObjectComponent } from "./base-game-object-component";
import { InputComponent } from "../input/input-component";

export class ControlsComponent extends BaseGameObjectComponent {
    #inputComponent: InputComponent

    constructor(gameObject:GameObject, inputComponent: InputComponent) {
        super(gameObject)
        this.#inputComponent = inputComponent;
    }

    get controls(): InputComponent {
        return this.#inputComponent;
    }
}