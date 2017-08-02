/* Init Controller - init game data */

var Hero = require('./class').Hero;
const FPS = 180;
const HERO_ANIM_SPD = 0.3 * 30 / FPS;

module.exports = function(app) {

    /* Define heroes list */
    app.heroes = [];

    /* Add new heroes (supposed the data from dB) */
    var hero_test = new Hero({
        id: 'hero_test_001',
        attr: {
            name: 'First Test Hero',
            play: 'standForward',
            weight: 20, // max: 20
            spd: 15, // max: 20
            pow: 12, // max: 20
            sta: 10, //stamina max: 20
            cost: 4.5, // stamina cost for rushing
            height: 80, // z
            width: 60, // x
            thickness: 30, // y
            regX: 40, // original image size = 360/4 * 479/4 = 80 * 120
            regY: 110,
            scaleX: 1.0,
            scaleY: 1.0
        },
        view: {
            spriteSheetParams: {
                src: '/images/heroes/hero_test.png',
                frames: { width: 80, height: 119.25 },
                animations: {
                    standForward: [0, 'standForward'],
                    standBackward: [4, 'standBackward'],
                    standLeftward: [8, 'standLeftward'],
                    standRightward: [15, 'standRightward'],

                    walkForward: [1, 3, 'walkForward', HERO_ANIM_SPD],
                    walkBackward: [5, 7, 'walkBackward', HERO_ANIM_SPD],
                    walkLeftward: [9, 11, 'walkLeftward', HERO_ANIM_SPD],
                    walkRightward: [12, 14, 'walkRightward', HERO_ANIM_SPD],

                    runForward: [1, 3, 'runForward', HERO_ANIM_SPD * 2],
                    runBackward: [5, 7, 'runBackward', HERO_ANIM_SPD * 2],
                    runLeftward: [9, 11, 'runLeftward', HERO_ANIM_SPD * 2],
                    runRightward: [12, 14, 'runRightward', HERO_ANIM_SPD * 2],

                    jumpForward: [1, 3, 'jumpForward', HERO_ANIM_SPD],
                    jumpBackward: [5, 7, 'jumpBackward', HERO_ANIM_SPD],
                    jumpLeftward: [9, 11, 'jumpLeftward', HERO_ANIM_SPD],
                    jumpRightward: [12, 14, 'jumpRightward', HERO_ANIM_SPD],

                    dashForward: [1, 3, 'dashForward', HERO_ANIM_SPD],
                    dashBackward: [5, 7, 'dashBackward', HERO_ANIM_SPD],
                    dashLeftward: [9, 11, 'dashLeftward', HERO_ANIM_SPD],
                    dashRightward: [12, 14, 'dashRightward', HERO_ANIM_SPD],

                    slipForward: [5, 7, 'slipForward', HERO_ANIM_SPD],
                    slipBackward: [1, 3, 'slipBackward', HERO_ANIM_SPD],
                    slipLeftward: [12, 14, 'slipLeftward', HERO_ANIM_SPD],
                    slipRightward: [9, 11, 'slipRightward', HERO_ANIM_SPD],

                }
            },
            spriteSheet: null,
        }
    });

    var hero_test_opponent = new Hero({
        id: 'hero_test_002',
        attr: {
            name: 'Second Test Hero',
            play: 'standForward',
            weight: 20, // max: 20
            spd: 15, // max: 20
            pow: 12, // max: 20
            sta: 10, //stamina max: 20
            cost: 4.5, // stamina cost for rushing
            height: 110, // z
            width: 60, // x
            thickness: 30, // y
            regX: 40, // original image size = 360/4 * 479/4 = 80 * 120
            regY: 110,
            scaleX: 1.0,
            scaleY: 1.0
        },
        view: {
            spriteSheetParams: {
                src: '/images/heroes/NSheet_nogrid.png',
                frames: { width: 63.3, height: 112.5 },
                animations: {
                    standForward: [41, 'standForward'],
                    standBackward: [42, 'standBackward'],
                    standLeftward: [40, 'standLeftward'],
                    standRightward: [43, 'standRightward'],

                    walkForward: [6, 8, 'walkForward', HERO_ANIM_SPD],
                    walkBackward: [3, 5, 'walkBackward', HERO_ANIM_SPD],
                    walkLeftward: [0, 2, 'walkLeftward', HERO_ANIM_SPD],
                    walkRightward: [9, 11, 'walkRightward', HERO_ANIM_SPD],

                    runForward: [6, 8, , 'runForward', HERO_ANIM_SPD * 2],
                    runBackward: [3, 5, 'runBackward', HERO_ANIM_SPD * 2],
                    runLeftward: [0, 2, 'runLeftward', HERO_ANIM_SPD * 2],
                    runRightward: [9, 11, 'runRightward', HERO_ANIM_SPD * 2],

                    jumpForward: [30, 32, 'jumpForward', HERO_ANIM_SPD],
                    jumpBackward: [27, 29, 'jumpBackward', HERO_ANIM_SPD],
                    jumpLeftward: [24, 26, 'jumpLeftward', HERO_ANIM_SPD],
                    jumpRightward: [33, 35, 'jumpRightward', HERO_ANIM_SPD],

                    dashForward: [18, 20, 'dashForward', HERO_ANIM_SPD],
                    dashBackward: [15, 17, 'dashBackward', HERO_ANIM_SPD],
                    dashLeftward: [12, 14, 'dashLeftward', HERO_ANIM_SPD],
                    dashRightward: [18, 20, 'dashRightward', HERO_ANIM_SPD], //21-23

                    slipForward: [45, 'slipForward', HERO_ANIM_SPD],
                    slipBackward: [46, 'slipBackward', HERO_ANIM_SPD],
                    slipLeftward: [47, 'slipLeftward', HERO_ANIM_SPD],
                    slipRightward: [44, 'slipRightward', HERO_ANIM_SPD],

                }
            },
            spriteSheet: null,
        }
    });

    var hero_test_opponent1 = new Hero({
        id: 'hero_test_003',
        attr: {
            name: 'Three Test Hero',
            play: 'standForward',
            weight: 20, // max: 20
            spd: 15, // max: 20
            pow: 12, // max: 20
            sta: 10, //stamina max: 20
            cost: 4.5, // stamina cost for rushing
            height: 120, // z
            width: 80, // x
            thickness: 30, // y
            regX: 40, // original image size = 360/4 * 479/4 = 80 * 120
            regY: 110,
            scaleX: 1.0,
            scaleY: 1.0
        },
        view: {
            spriteSheetParams: {
                src: '/images/heroes/USheet.png',
                frames: { width: 83.3, height: 125 },
                animations: {
                    standForward: [41, 'standForward'],
                    standBackward: [42, 'standBackward'],
                    standLeftward: [40, 'standLeftward'],
                    standRightward: [43, 'standRightward'],

                    walkForward: [9, 11, 'walkForward', HERO_ANIM_SPD],
                    walkBackward: [3, 5, 'walkBackward', HERO_ANIM_SPD],
                    walkLeftward: [0, 2, 'walkLeftward', HERO_ANIM_SPD],
                    walkRightward: [6, 8, 'walkRightward', HERO_ANIM_SPD],

                    runForward: [6, 8, , 'runForward', HERO_ANIM_SPD * 2],
                    runBackward: [3, 5, 'runBackward', HERO_ANIM_SPD * 2],
                    runLeftward: [0, 2, 'runLeftward', HERO_ANIM_SPD * 2],
                    runRightward: [9, 11, 'runRightward', HERO_ANIM_SPD * 2],

                    jumpForward: [30, 32, 'jumpForward', HERO_ANIM_SPD],
                    jumpBackward: [27, 29, 'jumpBackward', HERO_ANIM_SPD],
                    jumpLeftward: [24, 26, 'jumpLeftward', HERO_ANIM_SPD],
                    jumpRightward: [33, 35, 'jumpRightward', HERO_ANIM_SPD],

                    dashForward: [21, 23, 'dashForward', HERO_ANIM_SPD],
                    dashBackward: [15, 17, 'dashBackward', HERO_ANIM_SPD],
                    dashLeftward: [12, 14, 'dashLeftward', HERO_ANIM_SPD],
                    dashRightward: [18, 20, 'dashRightward', HERO_ANIM_SPD],

                    slipForward: [45, 'slipForward', HERO_ANIM_SPD],
                    slipBackward: [46, 'slipBackward', HERO_ANIM_SPD],
                    slipLeftward: [47, 'slipLeftward', HERO_ANIM_SPD],
                    slipRightward: [44, 'slipRightward', HERO_ANIM_SPD],
                }
            },
            spriteSheet: null,
        }
    });
    /* Push new heroes into hero list */
    app.heroes.push(hero_test, hero_test_opponent, hero_test_opponent1);

    /* Define stage list */
    app.stages = [];

    var stage1 = {
        name: 'stage1',
        url: '/images/stages/stage1.png',
        type: 'ellipse'
    };

    app.stages.push(stage1);

}; // end module.exports