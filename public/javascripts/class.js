/* ===============  CLIENT-SIDE ================= */

class GameButton {

    constructor(images, width, height, animations) {
        this.spriteSheet = new createjs.SpriteSheet({
            images: [images],
            frames: { width: width, height: height },
            animations: animations || { normal: [0], hover: [1], clicked: [2] }
        });
        this.button = new createjs.Sprite(this.spriteSheet);
        this.helper = new createjs.ButtonHelper(this.button, 'normal', 'hover', 'clicked');
        this.button.x = 100;
        this.button.y = 100;
        this.button.gotoAndStop('normal');
    }; // end constructor

    set oriX(val) {
        this.button.oriX = val;
    }

    set oriY(val) {
        this.button.oriY = val;
    }

    set x(val) {
        this.button.x = val;
    }

    set y(val) {
        this.button.y = val;
    }

    set name(val) {
        this.button.name = val;
    }

    get view() {
        return this.button;
    }

}
class GameCharButton {

    constructor(images, width, height, animations) {
        this.spriteSheet = new createjs.SpriteSheet({
            images: [images],
            frames: { width: width, height: height },
            animations: animations || { normal: [0], hover: [1], clicked: [2] }
        });
        this.button = new createjs.Sprite(this.spriteSheet);
        // this.helper = new createjs.ButtonHelper(this.button, 'normal', 'hover', 'clicked');
        this.button.x = 100;
        this.button.y = 100;
        this.button.gotoAndStop('normal');
    }; // end constructor

    set oriX(val) {
        this.button.oriX = val;
    }

    set oriY(val) {
        this.button.oriY = val;
    }

    set x(val) {
        this.button.x = val;
    }

    set y(val) {
        this.button.y = val;
    }

    set name(val) {
        this.button.name = val;
    }

    get view() {
        return this.button;
    }

}
class Character {
    constructor(color, x, y, ability) {
        this.speed = ability[0];
        this.weight = ability[1];
        this.power = ability[2];
        this.stamina = ability[3];
        this.color = color;
        this.oriX = x;
        this.oriY = y;
    }

    displayBarAndText() {
        speedText = new createjs.Text("Speed : ", "15px Arial", 'black');
        weightText = new createjs.Text("Weight : ", "15px Arial", 'black');
        powerText = new createjs.Text("Power : ", "15px Arial", 'black');
        staminaText = new createjs.Text("Stamina : ", "15px Arial", 'black');
        speedText.oriX = this.oriX - 70;
        speedText.oriY = this.oriY;
        weightText.oriX = this.oriX - 70;
        weightText.oriY = this.oriY + 30;
        powerText.oriX = this.oriX - 70;
        powerText.oriY = this.oriY + 60;
        staminaText.oriX = this.oriX - 70;
        staminaText.oriY = this.oriY + 90;
        speedBar = createGameStatusBar(this.color, this.oriX, this.oriY, this.speed);
        weightBar = createGameStatusBar(this.color, this.oriX, this.oriY + 30, this.weight);
        powerBar = createGameStatusBar(this.color, this.oriX, this.oriY + 60, this.power);
        staminaBar = createGameStatusBar(this.color, this.oriX, this.oriY + 90, this.stamina);
        scalables.push(speedBar, weightBar, powerBar, staminaBar, speedText, weightText, powerText, staminaText);
        barContainer.addChild(speedBar, weightBar, powerBar, staminaBar, speedText, weightText, powerText, staminaText);
        oriX = 0;
        oriY = 0;
    }
}


class Transform {
    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    multiply(k) {
        this.x *= k;
        this.y *= k;
        this.z *= k;
    }
}

class TransformFactor {
    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
}

class Action {
    constructor(name, dir, transform, intensity, block, rebounce, rebounceFactor, disturbed) {
        this.type = 'action';
        this.name = name || 'stand';
        this.dir = dir || 'Forward';
        this.play = '' + this.name + this.dir || 'standForward';
        this.transform = transform || new Transform();
        this.intensity = intensity || 1;
        this.block = block || false;
        this.rebounce = rebounce || false;
        this.rebounceFactor = rebounceFactor || new TransformFactor();
        this.disturbed = disturbed || false;
    }
}

class ConsecutiveActions {
    constructor(name, actions, block, rebounce, disturbed, nextIsNull) {
        this.type = 'consecutiveActions';
        this.name = name || null;
        this.actions = actions || []; // stack sync with rebounceFactor
        this.block = block || true;
        this.rebounce = rebounce || true;
        this.disturbed = disturbed || false; //changed to true once this action get disturbed e.g. collided
        this.nextIsNull = nextIsNull || false; //set nextAction of the model executes this action to null
    }
}