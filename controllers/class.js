/* SERVER-SIDE */

function GameButton(images, width, height) {
    this.spriteSheet = new createjs.SpriteSheet({
        images: [images],
        frames: { width: width, height: height },
        animations: { normal: [0], hover: [1], clicked: [2] }
    });
    this.button = new createjs.Sprite(this.spriteSheet);
    this.helper = new createjs.ButtonHelper(this.button, 'normal', 'hover', 'clicked');
    this.button.x = 100;
    this.button.y = 100;
    this.button.gotoAndStop('normal');
}

function Hero(params) {
    var id = params.id;
    var attr = params.attr;
    var view = params.view;
    // attributes
    this.id = params.id;
    this.attr = {
        name: attr.name,
        play: attr.play,
        weight: attr.weight, // max: 20
        spd: attr.spd, //speed max: 20, used in velocity, force
        pow: attr.pow, //power max: 20, used in determining force
        sta: attr.sta, //stamina max: 20
        cost: attr.cost, //cost for dashing
        height: attr.height,
        width: attr.width,
        thickness: attr.thickness,
        regX: attr.regX,
        regY: attr.regY,
        scaleX: attr.scaleX,
        scaleY: attr.scaleY
    };
    // view
    this.view = {
        spriteSheetParams: view.spriteSheetParams,
        spriteSheet: view.spriteSheet
    };
}

/* Exports for server-side scripts */
module.exports = {
    GameButton,
    Hero,
}