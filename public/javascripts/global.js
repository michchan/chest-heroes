/* Socket */
var socket;
var windowW;
var windowH;

/* Heroes Collection */
var HeroModel; //backbone heroModel: Singleton
var heroCollection; //backbone collection

/* Stage Collection */
var stageModel;
var stageCollection;

/* Load queue */
var fileList;
var loader;

/* Canvas */
var canvas;
var stage;
var stageScaleX;
var stageScaleY;
const STAGE_ORI_WIDTH = 1200;
const STAGE_ORI_HEIGHT = 800;
var scalables = []; // store scalable display objects
var heroScalables = []; //store scalable display objects that do not have a fixed position

/* Background */
var bg;

/* Title View */
var main;
var singlePlayerB;
var multiPlayerB;
var creditsB;

var TitleView = new createjs.Container();

/* Tutorial */
var tutorial;

/* Credits */
var credits;

/* Stage View */
var stage;
var stagePreview;
var previousStageB;
var nextStageB;
var backToTitleViewB;
var confirmStageB;

var StageView = new createjs.Container();

/* Select Hero View */
var anim = { normal: [1], hover: [2], clicked: [3] };
var charBG;
var hero1, hero2, hero3;
var isOnClicked = true;
var ability = [];
var chinChar, nuisonChar, uncleChar;
var speedBar, weightBar, staminaBar, powerBar;
var speedText, weightText, staminaText, powerText;
var oriX, oriY;
var SelectHerosView = new createjs.Container();
var barContainer = new createjs.Container();
var playerSelected;

/*Select Scene View */
var SelectAIView = new createjs.Container();
var AIBG;
var AICHin;
var AIStage2;
var AIStage3;
var AInext;
var AIback;

/* Game Loading View */
var gameLoad;
var myHero;
var opponentHero;

var GameLoadView = new createjs.Container();

/* --- Game View --- */
var gameBg;
var gameStage;
var gameStageImg;
var gameStagetraps = [];
var countDown;
var win;
var lose;

/* Game Status */
var gameStatus;
var playerScore;
var cpuScore;
var heart;
var playerIcon;
var cpuIcon;
var gameTime;
// Status Bars
var leftSkillBar;
var leftStaminaBar;
var rightSkillBar;
var rightStaminaBar;
var GameStage = new createjs.Container();
var GameStatusBar = new createjs.Container();
var GameStatus = new createjs.Container();
/* Game Buttons */
var joystickL;
var joystickLCage;
var joystickR;
var joystickRCage;

var actionButtonW, actionButtonA, actionButtonS, actionButtonD;

var GameButtons = new createjs.Container();

/* Game Interactive */
var player;
var cpu;
var remotePlayer;
var PlayerContainer = new createjs.Container();
var CPUContainer = new createjs.Container();
var RemotePlayerContainer = new createjs.Container();
var GameInteractive = new createjs.Container();
var heroesOnGame = [];

var GameView = new createjs.Container();

var popUptext;
var gameItems = [];

var itemStaImg;
var itemSpeedImg;
var itemLifeImg;

var heartImg;

/* --- End Game View --- */

/* Model Prototype */
const PLAYABLE_PROTOTYPE = {
    id: null,
    attr: null,
    view: null,
    transform: {
        x: 0,
        y: 0,
        z: 0
    },
    liveAttr: {
        skill: 0,
        sta: 0,
        lives: 3,
    },
    actionState: {
        standing: true,
        walking: false,
        running: false,
        jumping: false,
        dashing: false,
    },
    selfState: {
        imbalance: 0, // in levels 0-4
        falled: false,
        faint: 0, // in Seconds, Max 3
        passive: false
    },
    collision: {
        forceX: 0,
        forceY: 0,
        collided: false,
        colideTarget: null,
        slip: false,
        slipTicks: 0,
    },
    rendering: {
        render: true,
        play: null
    },
    event: {
        uuid: null,
        thisClient: false,
        inEvent: false
    },
    remoteActionStack: null,
    nextAction: null,
    lastAction: null,
    actionControl: {
        block: false,
        dashCD: 0, //cooldown
        jumpCD: 0,
        lastActionTick: 0,
    },
    actionStack: null,
    recordStack: null,
    modelFunctions: {},
    viewFunctions: {}
};
const AI_PROTOTYPE = Object.assign({}, PLAYABLE_PROTOTYPE);
AI_PROTOTYPE.AI = {
    lv: 1,
    autoWalking: false
};

/* Constant */
const GAME_CNT_DOWN_FONT_SIZE = 150;
const GAME_TIME = 180; // 3 mins
const KEYCODE = {
    ARROWLEFT: 37,
    ARROWUP: 38,
    ARROWRIGHT: 39,
    ARROWDOWN: 40,
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    F: 70,
    SPACEBAR: 32,
    SHIFT: 16,
};

const FPS = 180;
const LAND_SCALE = 0.55; // stage h:w = 6:8 = 0.8
const STATUS_BAR_BASE_WIDTH = 190;
const HERO_BASE_SPD = 5;
const HERO_JUMP_COST = 1.1;
const HERO_JUMP_SKILL = 0.5;
const HERO_JUMP_SPEED_MODIFIER = 1.4;
const HERO_JUMP_COUNT = 140;
const HERO_RUN_SPEED = 2.0; // multipicated
const HERO_RUN_COST = 0.2;
const HERO_RUN_SKILL = 0.01;
const HERO_DASH_SKILL = 3;
const HERO_DASH_SPEED_MODIFIER = 0.37;
const HERO_DASH_COUNT = 70;
const HERO_MAX_SKILL = 20;
const VELOC_THRESHOLD = 50; // velocity threshold per frame
// the above is deprecated
const HERO_WALK_OFFSET = 1.8 / (FPS / 30);
const HERO_JUMP_OFFSET = 4.0 / (FPS / 30);
const HERO_DASH_OFFSET = 9.0 / (FPS / 30);
const HERO_RUN_OFFSET = HERO_WALK_OFFSET * 1.7;
const HERO_RUN_BASE_COST = 0.0035;
const ACTION_SUPERIORITY = [
    'stand',
    'walk',
    'run',
    'slip',
    'jump',
    'dash'
];
// Mulitplier
const HERO_WALK_ENFORCER_DECLINE = 0.2;
const HERO_WALK_ENDURER_GAIN = 1.5;
const HERO_RUN_ENFORCER_DECLINE = 0.2;
const HERO_RUN_ENDURER_GAIN = 2.0;
const HERO_JUMP_ENFORCER_DECLINE = 0.5;
const HERO_JUMP_ENDURER_GAIN = 1.2;
const HERO_DASH_SLIP_COUNT = 65;
const HERO_JUMP_SLIP_COUNT = 30;
const HERO_DASH_CD = FPS / 3;
const HERO_JUMP_CD = FPS / 3;

const HERO_FAINT_TIME = 3;

const MAX_CONTROL_ANGLES = 24;

/* Variables */
var countTickToSec = 0; // used for counting each second in ticker
var keyMap = {}; // used as key mapping for compound key listeners
var gameEnded = false;
var controlIntensity = 1;
var controlAngle = null;
var controlDir = null;
var Playable;
var heroesInGame = [];
var localControlRef = new Action();
var localCPUControlRef = new Action();
var lastInputAction = { name: null, type: null, tick: null };
var countCost = 0;
var errorStack = {}; // store object of id, action, count pairs
var countAction = { player: 0, cpu: 0, playerAvg: 0, cpuAvg: 0 }; // debug use
var deltaTime = 0;
var gameMode = null;

// var lastFootstep;
var gameRound = null;
var lastliveState = [];
var lastGameViewState = {};