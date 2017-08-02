/* ============================== File Handling ============================== */
function getFileList() {
    return [
        /* Generic */
        { id: 'btn_previous', src: '/images/spritesheet_btn_back.png' },
        { id: 'btn_next', src: '/images/spritesheet_btn_proceed.png' },
        { id: 'btn_ok', src: '/images/spritesheet_btn_primary.png' },
        { id: 'btn_back', src: '/images/spritesheet_btn_primary.png' },
        /* Background */
        { id: 'bg', src: '/images/bg.jpg' },
        /*Heros Selection */
        { id: 'charBG', src: '/images/charmenu.png' },
        { id: 'heroChin', src: '/images/ChinCharM.png' },
        { id: 'heroNuison', src: '/images/NuisonCharM.png' },
        { id: 'heroUncle', src: '/images/UncleCharM.png' },
        { id: 'next', src: '/images/ButtonNext.png' },
        { id: 'back', src: '/images/ButtonBack.png' },
        /*Scene Selection */
        { id: 'AIBG', src: '/images/VenueM.png' },
        { id: 'AIChin', src: '/images/kkTesting.png' },
        // { id: 'AINuison', src: '/images/Stage1.png' },
        // { id: 'AIUncle', src: '/images/Stage1.png' },
        { id: 'AInext', src: '/images/ButtonNext.png' },
        { id: 'AIback', src: '/images/ButtonBack.png' },
        /* Title View */
        { id: 'main', src: '/images/MainBG.png' },
        { id: 'btn_single_player', src: '/images/ButtonSPM.png' },
        { id: 'btn_multi_player', src: '/images/ButtonTut.png' },
        { id: 'btn_credits', src: '/images/ButtonSetting.png' },
        { id: 'tutorial', src: '/images/tut.png' },
        /* Game Load View */
        { id: 'game_load', src: '/images/game_load.jpg' },
        /* Game View */
        { id: 'game_bg', src: '/images/game_bg.jpg' },
        { id: 'game_stage1', src: '/images/stages/Stage(WithHole).png' },
        { id: 'wrong_hole', src: '/images/stages/WrongHole.png' },
        // game status
        // { id: 'game_status', src: '/images/game_status.png' },
        { id: 'game_status', src: '/images/LabelBar.png' },
        { id: 'hero_icon_small', src: '/images/hero_icon_small.jpg' },
        { id: 'heroHeart', src: 'images/heart.png' },
        /* Sound */
        { id: 'titleBgMusic', src: '/sounds/bg-main.wav' },
        { id: 'stage1Music', src: '/sounds/Aggressive1.wav' },
        { id: 'btn_click_sound', src: '/sounds/button-procceed.wav' },
        { id: 'countdown_beep', src: '/sounds/count-down-beep.mp3' },
        { id: 'countdown_start', src: '/sounds/count-down-start.wav' },
        // Heroes
        { id: 'footstep_walk', src: '/sounds/M3_StepEnemy.wav' },
        { id: 'footstep_run', src: '/sounds/M3_StepEnemy.wav' },
        { id: 'footstep_jump', src: '/sounds/M3_StepEnemy.wav' },
        { id: 'footstep_dash', src: '/sounds/M3_StepEnemy.wav' },
        // item
        { id: 'item_redbull', src: '/images/Items/Redbull.png' }
    ];
} // end fn getFileList

function loadQueue(heroSpriteSheets, stageSpriteSheets) {
    loader = new createjs.LoadQueue();
    loader.crossOrigin = 'Anonymous';
    loader.installPlugin(createjs.Sound);

    loader.on('fileload', loadGfx, this);
    loader.on('complete', addTitleView, this);
    loader.loadManifest(fileList);
} // end fn loadQueue

function loadGfx(e) {

    let id = e.item.id;
    let img = e.result;
    console.log('load GFX name: ' + id);

    /* generic */
    if (id === 'btn_previous') {}
    if (id === 'btn_next') {}
    if (id === 'btn_ok') {}
    if (id === 'btn_back') {}

    /* background */
    if (id === 'bg') {
        bg = new createjs.Bitmap(img);
        scalables.push(bg);
    }

    /* main */
    if (id === 'main') {
        main = new createjs.Bitmap(img);
        scalables.push(main);
    }
    if (id === 'btn_single_player') {
        singlePlayerB = new GameButton(img, 347, 100);
        scalables.push(singlePlayerB.button);
    }
    if (id === 'btn_multi_player') {
        multiPlayerB = new GameButton(img, 347, 100);
        scalables.push(multiPlayerB.button);
    }
    if (id === 'btn_credits') {
        creditsB = new GameButton(img, 347, 100);
        scalables.push(creditsB.button);
    }
    if (id === 'tutorial') {
        tutorial = new createjs.Bitmap(img);
        scalables.push(tutorial);
    }

    /*Heros Selection */
    if (id == 'charBG') {
        charBG = new createjs.Bitmap(img, 0, 0);
        scalables.push(charBG);
    }
    if (id == 'heroChin') {
        heroChin = new GameCharButton(img, 100, 340, anim);
        scalables.push(heroChin.button);
    }

    if (id == 'heroNuison') {
        heroNuison = new GameCharButton(img, 113.25, 340, anim);
        scalables.push(heroNuison.button);
    }

    if (id == 'heroUncle') {
        heroUncle = new GameCharButton(img, 140, 340, anim);
        scalables.push(heroUncle.button);
    }
    if (id == 'next') {
        next = new GameButton(img, 282.3, 80);
        scalables.push(next.button);
    }
    if (id == 'back') {
        back = new GameButton(img, 282.3, 80);
        scalables.push(back.button);
    }
    /*Scene Selection */
    if (id == 'AIBG') {
        AIBG = new createjs.Bitmap(img, 0, 0);
        // scalables.push(AIBG.button);
    }
    if (id == 'AIChin') {
        AIChin = new GameCharButton(img, 212.5, 350, anim);
        // scalables.push(AIChin.button);
    }
    if (id == 'AIStage2') {
        AIStage2 = new GameCharButton(img, 212.5, 350, anim);
        // scalables.push(AIStage2.button);
    }
    if (id == 'AIStage3') {
        AIStage3 = new GameCharButton(img, 212.5, 350, anim);
        // scalables.push(AIStage3.button);
    }
    // if (id == 'AINuison') {
    //     AINuison = new GameCharButton(img, 125, 150, anim);
    //     scalables.push(heroNuison.button);
    // }

    // if (id == 'AIUncle') {
    //     AIUncle = new GameCharButton(img, 125, 150, anim);
    //     scalables.push(heroUncle.button);
    // }
    if (id == 'AInext') {
        AInext = new GameButton(img, 282.3, 80);
        scalables.push(AInext.button);
    }
    if (id == 'AIback') {
        AIback = new GameButton(img, 282.3, 80);
        scalables.push(AIback.button);
    }
    /* game load */
    if (id === 'game_load') {
        gameLoad = new createjs.Bitmap(img);
        scalables.push(gameLoad);
    }

    /* game view */
    if (id === 'game_bg') {
        gameBg = new createjs.Bitmap(img);
        scalables.push(gameBg);
    }
    if (id === 'game_stage1') {
        gameStageImg = new createjs.Bitmap(img);
        scalables.push(gameStageImg);
    }
    if (id === 'game_status') {
        gameStatus = new createjs.Bitmap(img);
        scalables.push(gameStatus);
    }
    if (id === 'hero_icon_small') {
        playerIcon = new createjs.Bitmap(img);
        cpuIcon = new createjs.Bitmap(img);
        scalables.push(playerIcon, cpuIcon);
    }

    if (id === 'item_redbull') {
        itemStaImg = img;
    }
    if (id === 'heroHeart') {
        heartImg = img;
    }

    /* hero collection */
    if (heroModel = heroCollection.findWhere({ id: id })) {
        /* create a sprite sheet for the hero model */
        console.log('@ hero sprite sheet on load');
        heroModel.get('view').spriteSheet = new createjs.SpriteSheet({
            images: [img],
            frames: heroModel.get('view').spriteSheetParams.frames,
            animations: heroModel.get('view').spriteSheetParams.animations
        });
        // console.debug(heroModel.get('view').spriteSheet);
    }
} // end fn loadGfx


/* ============================== View Control ============================== */

function addTitleView() {

    console.log('@ Load Complete: add title view');

    if (!stage) {

        console.log('@ Stage and Ticker init');
        /* Link Canvas */
        canvas = 'canvas';
        stage = new createjs.Stage(canvas);
        stage.mouseEnabled = true;
        stage.enableMouseOver(10);
        createjs.Touch.enable(stage);

        /* Set Ticker to listen to stage event (update) */
        createjs.Ticker.addEventListener("tick", stage);
        createjs.Ticker.setFPS(FPS);
    }
    /* On Window Resize */
    $(window).resize(rescaleAll);

    /* Set Components Attributes */
    bg.oriX = bg.oriY = 0;

    main.name = 'main';
    main.oriX = main.oriY = 0;

    singlePlayerB.oriX = singlePlayerB.oriY = 450;
    singlePlayerB.name = 'singlePlayerB';

    multiPlayerB.oriX = 450;
    multiPlayerB.oriY = 550;
    multiPlayerB.name = 'multiPlayerB';

    creditsB.oriX = 450;
    creditsB.oriY = 650;
    creditsB.name = 'creditsB';

    tutorial.oriX = 1200;
    tutorial.oriY = 300;
    tutorial.name = 'tutorial';

    rescaleAll();

    /* Add Components to Stage */
    TitleView.addChild(main, singlePlayerB.view, multiPlayerB.view, creditsB.view, tutorial);
    stage.addChild(bg, TitleView);

    /* Start Listeners */
    singlePlayerB.view.addEventListener('mousedown', buttonClickHandler);
    multiPlayerB.view.addEventListener('mousedown', buttonClickHandler);
    creditsB.view.addEventListener('mousedown', buttonClickHandler);

    tutorial.addEventListener('mousedown', removeTutorial);

    createjs.Sound.play('titleBgMusic', { loop: Infinity, volume: 0.03 });

} // end fn addTitleView

function showTutorial() {
    let showTut = setInterval(() => {
        tutorial.x -= 10 * stageScaleX;
        tutorial.oriX -= 10 * stageScaleX;
        if (tutorial.x <= 320 * stageScaleX) clearInterval(showTut);
    }, 1);
};

function removeTutorial() {
    let rmTut = setInterval(() => {
        tutorial.x += 10 * stageScaleX;
        tutorial.oriX += 10 * stageScaleX;
        if (tutorial.x >= 1500 * stageScaleX) clearInterval(rmTut);
    }, 1);
}

function removeTitleView() {

    /* Destroy Menu & Credits Screen */
    stage.removeChild(TitleView);
    TitleView.removeAllChildren();
    /* Remove ALL Menu Button listeners */
    singlePlayerB.view.removeEventListener('mousedown', buttonClickHandler);
    multiPlayerB.view.removeEventListener('mousedown', buttonClickHandler);
    creditsB.view.removeEventListener('mousedown', buttonClickHandler);
    createjs.Sound.stop();
} // end fn removeTitleView

function addSelectHerosView() {
    console.log("selectPlayer");
    removeTitleView();
    charBG.name = 'charBG';
    charBG.oriX = charBG.oriY = 0;
    heroChin.name = 'heroChin';
    heroChin.oriX = 300;
    heroChin.oriY = 150;
    heroNuison.name = 'heroNuison';
    heroNuison.oriX = 550;
    heroNuison.oriY = 170;
    heroUncle.name = 'heroUncle';
    heroUncle.oriX = 800;
    heroUncle.oriY = 150;
    next.name = 'next';
    next.oriX = 800;
    next.oriY = 700;
    back.name = 'back';
    back.oriX = 100;
    back.oriY = 700;

    heroChin.view.addEventListener('mouseover', buttonDisplayHover);
    heroChin.view.addEventListener('mouseout', buttonDisplayNormal);
    heroChin.view.addEventListener('mousedown', buttonDisplayClick);


    heroNuison.view.addEventListener('mouseover', buttonDisplayHover);
    heroNuison.view.addEventListener('mouseout', buttonDisplayNormal);
    heroNuison.view.addEventListener('mousedown', buttonDisplayClick);


    heroUncle.view.addEventListener('mouseover', buttonDisplayHover);
    heroUncle.view.addEventListener('mouseout', buttonDisplayNormal);
    heroUncle.view.addEventListener('mousedown', buttonDisplayClick);

    next.view.addEventListener('mousedown', buttonNext);
    back.view.addEventListener('mousedown', buttonBack);

    ability = [10, 2, 20, 30];
    chinChar = new Character('red', 300, 550, ability);
    chinChar.displayBarAndText();
    console.log(chinChar);
    ability = [10, 100, 20, 30];
    nuisonChar = new Character('red', 550, 550, ability);
    nuisonChar.displayBarAndText();
    ability = [10, 2, 20, 30];
    uncleChar = new Character('red', 800, 550, ability);
    uncleChar.displayBarAndText();
    rescaleAll();
    SelectHerosView.addChild(charBG, heroChin.view, heroNuison.view, heroUncle.view, back.view, next.view, barContainer);
    stage.addChild(SelectHerosView);

}

function removeSelectHerosView() {

    /* Destroy Menu & Credits Screen */
    stage.removeChild(addSelectHerosView);
    SelectHerosView.removeAllChildren();
    barContainer.removeAllChildren();
    /* Remove ALL Menu Button listeners */
    heroChin.view.removeEventListener('mouseover', buttonDisplayHover);
    heroChin.view.removeEventListener('mouseout', buttonDisplayNormal);
    heroChin.view.removeEventListener('mousedown', buttonDisplayClick);


    heroNuison.view.removeEventListener('mouseover', buttonDisplayHover);
    heroNuison.view.removeEventListener('mouseout', buttonDisplayNormal);
    heroNuison.view.removeEventListener('mousedown', buttonDisplayClick);


    heroUncle.view.removeEventListener('mouseover', buttonDisplayHover);
    heroUncle.view.removeEventListener('mouseout', buttonDisplayNormal);
    heroUncle.view.removeEventListener('mousedown', buttonDisplayClick);

    next.view.removeEventListener('mousedown', buttonNext);
    back.view.removeEventListener('mousedown', buttonBack);

} // end fn removeTitleView

function addSelectSceneView() {
    removeSelectHerosView();
    AIBG.name = 'AIBG';
    AIBG.oriX = AIBG.oriY = 0;
    AIChin.name = 'AIChin';
    AIChin.oriX = 300;
    AIChin.oriY = 500;


    // AINuison.name = 'AINuison';
    // AINuison.oriX = 600;
    // AINuison.oriY = 500;
    // AIUncle.name = 'AIUncle';
    // AIUncle.oriX = 800;
    // AIUncle.oriY = 500;
    AInext.name = 'AInext';
    AInext.oriX = 800;
    AInext.oriY = 700;
    AIback.name = 'AIback';
    AIback.oriX = 100;
    AIback.oriY = 700;


    AIChin.view.addEventListener('mouseover', buttonDisplayHover);
    AIChin.view.addEventListener('mouseout', buttonDisplayNormal);
    AIChin.view.addEventListener('mousedown', buttonAIDisplayClick);

    // AINuison.view.addEventListener('mouseover', buttonDisplayHover);
    // AINuison.view.addEventListener('mouseout', buttonDisplayNormal);
    // AINuison.view.addEventListener('mousedown', buttonAIDisplayClick);


    // AIUncle.view.addEventListener('mouseover', buttonDisplayHover);
    // AIUncle.view.addEventListener('mouseout', buttonDisplayNormal);
    // AIUncle.view.addEventListener('mousedown', buttonAIDisplayClick);

    AInext.view.addEventListener('mousedown', buttonNext);
    AIback.view.addEventListener('mousedown', buttonBack);
    rescaleAll();
    SelectAIView.addChild(AIBG, AIChin.view, /*AINuison.view, AIUncle.view, */ AIback.view, AInext.view);
    stage.addChild(SelectAIView);
}

function removeSelectSceneView() {

    /* Destroy Menu & Credits Screen */
    stage.removeChild(SelectAIView);
    SelectAIView.removeAllChildren();
    /* Remove ALL Menu Button listeners */
    AIChin.view.removeEventListener('mouseover', buttonDisplayHover);
    AIChin.view.removeEventListener('mouseout', buttonDisplayNormal);
    AIChin.view.removeEventListener('mousedown', buttonAIDisplayClick);


    // AINuison.view.removeEventListener('mouseover', buttonDisplayHover);
    // AINuison.view.removeEventListener('mouseout', buttonDisplayNormal);
    // AINuison.view.removeEventListener('mousedown', buttonAIDisplayClick);


    // AIUncle.view.removeEventListener('mouseover', buttonDisplayHover);
    // AIUncle.view.removeEventListener('mouseout', buttonDisplayNormal);
    // AIUncle.view.removeEventListener('mousedown', buttonAIDisplayClick);

    AInext.view.removeEventListener('mousedown', buttonNext);
    AIback.view.removeEventListener('mousedown', buttonBack);

} // end fn removeTitleView

function addGameView(evt, mode, stageID, players, restart) {

    lastGameViewState = { mode: mode, stageID: stageID, players: players };
    if (evt) console.log('@ ' + evt.target.name + ': ' + evt.type + ': add game view');
    if (!restart) {
        removeTitleView();
        removeSelectSceneView();
    }

    /* Add Game View */
    /*  - count down */
    countDown = new createjs.Text('3', 'Bold ' + GAME_CNT_DOWN_FONT_SIZE + 'px Arial', '#FFFF55');
    scalables.push(countDown);
    countDown.oriX = 600;
    countDown.oriY = 400;
    countDown.regX = countDown.getMeasuredWidth() / 2;
    countDown.regY = countDown.getMeasuredHeight() / 2;
    /*  - game stage */
    gameStage = new createjs.Shape();
    scalables.push(gameStage);
    gameStage.graphics.f('#AAFF88').de(0, 0, 900, 500); // Tiny API: f=  beginFill; dc = drawEllipse;
    gameStage.type = 'ellipse';
    gameStage.oriX = 600;
    gameStage.oriY = 450;
    gameStage.rx = 450; // semi-major radius
    gameStage.ry = 250; // semi-minor radius
    gameStage.regX = 450;
    gameStage.regY = 250;
    gameStage.hitArea = gameStage;
    gameStage.name = 'gameStage';
    /*    - game stage traps */
    gameStage.traps = [];
    let trap1 = new createjs.Shape();
    scalables.push(trap1);
    trap1.graphics.f('#225599').de(0, 0, 180, 100);
    trap1.type = 'ellipse';
    trap1.oriX = 600;
    trap1.oriY = 450;
    trap1.rx = 90;
    trap1.ry = 50;
    trap1.regX = 90;
    trap1.regY = 50;
    gameStage.traps.push(trap1);

    if (stageID === 'stage1') {
        gameStageImg.regX = 455;
        gameStageImg.regY = 252;
        gameStageImg.oriX = 600;
        gameStageImg.oriY = 450;
    }

    GameStage.addChild(gameStage, gameStage.traps[0], gameStageImg);

    /* Add game status */
    // scores
    playerScore = new createjs.Text('0', 'Bold 80px Arial', '#BFDFEF');
    cpuScore = new createjs.Text('0', 'Bold 80px Arial', '#BFDFEF');
    scalables.push(playerScore, cpuScore);
    playerScore.oriX = 500;
    cpuScore.oriX = 700;
    playerScore.oriY = cpuScore.oriY = 40;
    playerScore.regX = cpuScore.regX = playerScore.getMeasuredWidth() / 2;
    playerScore.regY = cpuScore.regY = playerScore.getMeasuredHeight() / 2;
    // hero icons
    playerIcon.oriX = 10;
    playerIcon.oriY = cpuIcon.oriY = 10;
    cpuIcon.oriX = 1200 - 10 - 80;
    // status bars
    leftSkillBar = createGameStatusBar('#7666DF', 175, 68, 0);
    leftStaminaBar = createGameStatusBar('#BEBE88', 175, 34, STATUS_BAR_BASE_WIDTH);
    rightSkillBar = createGameStatusBar('#7666DF', 1200 - 165 - 225, 68, 0);
    rightStaminaBar = createGameStatusBar('#BEBE88', 1200 - 165 - 225, 34, STATUS_BAR_BASE_WIDTH);
    scalables.push(leftSkillBar, leftStaminaBar, rightSkillBar, rightStaminaBar);
    /* Add children to Container */
    GameStatusBar.addChild(leftSkillBar, leftStaminaBar, rightSkillBar, rightStaminaBar);
    // game time count down
    gameTime = new createjs.Text(GAME_TIME, 'Bold 60px Arial', '#666666');
    scalables.push(gameTime);
    gameTime.oriX = 600;
    gameTime.oriY = 40;
    gameTime.regX = gameTime.getMeasuredWidth() / 2;
    gameTime.regY = gameTime.getMeasuredHeight() / 2;

    /* Add children to Container */
    GameStatus.addChild(
        gameStatus,
        // playerScore,
        // cpuScore,
        playerIcon,
        cpuIcon,
        GameStatusBar,
        gameTime
    );

    /* Game Button */
    joystickL = new createjs.Shape();
    joystickL.name = 'joystickL';
    joystickLCage = new createjs.Shape();
    joystickR = new createjs.Shape();
    joystickR.name = 'joystickR';
    joystickRCage = new createjs.Shape();

    actionButtonW = new createjs.Shape();
    actionButtonW.name = 'actionButtonW';
    actionButtonA = new createjs.Shape();
    actionButtonA.name = 'actionButtonA';
    actionButtonS = new createjs.Shape();
    actionButtonS.name = 'actionButtonS';
    actionButtonD = new createjs.Shape();
    actionButtonD.name = 'actionButtonD';
    actionButtonW.type = actionButtonA.type = actionButtonS.type = actionButtonD.type = 'actionButton';

    scalables.push(joystickL, joystickLCage, joystickR, joystickRCage);
    joystickL.scaleOnX = joystickLCage.scaleOnX = joystickR.scaleOnX = joystickRCage.scaleOnX = true;

    scalables.push(actionButtonW, actionButtonA, actionButtonS, actionButtonD);
    actionButtonW.scaleOnX = actionButtonA.scaleOnX = actionButtonS.scaleOnX = actionButtonD.scaleOnX = true;

    joystickL.graphics.f('#666').dc(0, 0, 80);
    joystickL.radius = 80;
    joystickL.alpha = 0.4;
    joystickL.oriX = 120;
    joystickL.oriY = 640;
    joystickL.cage = joystickLCage;

    joystickLCage.graphics.f('#333').dc(0, 0, 90);
    joystickLCage.radius = 90;
    joystickLCage.alpha = 0.2;
    joystickLCage.oriX = 120;
    joystickLCage.oriY = 640;

    actionButtonW.graphics.f('#f2da07').dc(0, 0, 60);
    actionButtonA.graphics.f('#0cb709').dc(0, 0, 60);
    actionButtonS.graphics.f('#f71000').dc(0, 0, 60);
    actionButtonD.graphics.f('#0a02ef').dc(0, 0, 60);

    actionButtonW.radius = actionButtonA.radius = actionButtonS.radius = actionButtonD.radius = 60;
    actionButtonW.alpha = actionButtonA.alpha = actionButtonS.alpha = actionButtonD.alpha = 0.4;
    actionButtonW.oriX = 150;
    actionButtonW.oriY = 580;
    actionButtonS.oriX = 150;
    actionButtonS.oriY = 740;
    actionButtonA.oriX = 50;
    actionButtonA.oriY = 660;
    actionButtonD.oriX = 250;
    actionButtonD.oriY = 660;

    joystickR.graphics.f('#666').dc(0, 0, 70);
    joystickR.radius = 70;
    joystickR.alpha = 0.4;
    joystickR.oriX = 1060;
    joystickR.oriY = 640;
    joystickR.cage = joystickRCage;

    joystickRCage.graphics.f('#333').dc(0, 0, 90);
    joystickRCage.radius = 90;
    joystickRCage.alpha = 0.2;
    joystickRCage.oriX = 1060;
    joystickRCage.oriY = 640;

    GameButtons.addChild(
        actionButtonW,
        actionButtonA,
        actionButtonS,
        actionButtonD,
        // joystickLCage,
        joystickRCage,
        // joystickL,
        joystickR
    );

    /* ------ For Single Player Mode ------ */

    /* Add Heroes */
    initHeroPlayableModel();
    if (mode === 'single-player') {
        player = getHeroPlayableModel(heroCollection.findWhere({ id: players[0].heroID }), 'player', 300, 820);
        cpu = getHeroAIModel(heroCollection.findWhere({ id: players[1].heroID }), 'cpu', 900, 820, 0);
        setHeroPlayableView(player);
        setHeroPlayableView(cpu);
        // PlayerContainer = new createjs.Container();
        // CPUContainer = new createjs.Container();

        /* Add Pending Items */
        // * Pending Items are randomly generated when game starts, and prompted at random time during the game defined here.
        PlayerContainer.addChild(player.view.castShadow, player.view
            // ,player.view.hit, player.view.height
        );
        CPUContainer.addChild(cpu.view.castShadow, cpu.view
            // ,cpu.view.hit, cpu.view.height
        );
        heroScalables.push(player, cpu);
        /* Add children to Container */
        GameInteractive.addChild(
            PlayerContainer,
            CPUContainer
        );
    }
    /* ------ End for Single Player Mode ------ */


    popUptext = new createjs.Text('', 'Bold ' + '30px Arial', '#FFFF55');
    popUptext.oriX = 600;
    popUptext.oriY = 400;
    scalables.push(popUptext);

    if (lastliveState !== []) {
        [player, cpu].forEach((model) => {
            lastliveState.forEach((state) => {
                if (state.id === model.id) {
                    model.setLiveAttr({ lives: state.lives });
                }
            });
            // add heart
            for (var i = 0; i < model.get('liveAttr').lives; i++) {
                var heart = new createjs.Bitmap(heartImg);
                if (model.id === 'player') {
                    heart.oriX = 400 + i * 40;
                    heart.oriY = 40;
                }
                if (model.id === 'cpu') {
                    heart.oriX = 1200 - (450 + i * 40);
                    heart.oriY = 40;
                }
                scalables.push(heart);
                GameStatus.addChild(heart);
            }
        })
    }

    /* Items !!!!! */
    for (var i = 0; i < 40; i++) {
        var randType = Math.round(Math.random() * 3);
        var view, type;

        switch (randType) {
            case 0:
                view = new createjs.Bitmap(itemStaImg);
                type = 'sta_recover';
                break;
            case 1:
                view = new createjs.Bitmap(itemStaImg);
                type = 'sta_recover';
                break;
            case 2:
                view = new createjs.Bitmap(itemStaImg);
                type = 'sta_recover';
                break;
            case 3:
                view = new createjs.Bitmap(itemStaImg);
                type = 'sta_recover';
                break;
            default:
                break;
        }

        if (view) {
            view.oriX = Math.round(Math.random() * 900) + 150;
            view.oriY = Math.round(Math.random() * 500) + 200;
        }

        gameItems.push({
            id: 'item-' + i,
            promptTime: Math.round(Math.random() * 180) + 0,
            liveTime: 5,
            view: view,
            type: type,
            active: false,
        });

        scalables.push(view);
    }

    /* Bundle Components added to Stage */
    /* Add children to Container */
    rescaleAll();
    GameView.addChild(GameStage, GameInteractive, GameStatus, GameButtons, countDown);
    stage.addChild(gameBg, GameView);

    /* Start Counting Down */
    let counting = setInterval(() => {

        countDown.text = parseInt(countDown.text - 1);
        console.log('Game counting down: ' + countDown.text);
        countDown.font = 'Bold ' + (GAME_CNT_DOWN_FONT_SIZE + 80 * (3 - parseInt(countDown.text))) + 'px Arial';
        countDown.regX = countDown.getMeasuredWidth() / 2;
        countDown.regY = countDown.getMeasuredHeight() / 2;

        createjs.Sound.stop();
        createjs.Sound.play('countdown_beep');

        // if count to zero:
        if (parseInt(countDown.text) === 0) {
            /* start the game */
            startGame(mode, stageID);
            /* clear this interval */
            clearInterval(counting);

            createjs.Sound.stop();
            createjs.Sound.play('countdown_start');
        }

    }, 1000);

} // end fn addGameView

function removeGameView(e) {
    // /* Remove Click to leave listener */
    stage.removeEventListener('mousedown', removeGameView);
    stage.removeChild(popUptext);

    /* Remove stage children */
    stage.removeChild(gameBg, GameView);

    /* Remove all children of all Container children of GameView */
    GameView.removeAllChildren();
    GameStatusBar.removeAllChildren();
    GameStatus.removeAllChildren();
    GameStage.removeAllChildren();
    GameButtons.removeAllChildren();
    GameInteractive.removeAllChildren();
    PlayerContainer.removeAllChildren();
    CPUContainer.removeAllChildren();
    RemotePlayerContainer.removeAllChildren();

    /* Remove hero instances */
    player = null;
    cpu = null;
    remotePlayer = null

    createjs.Sound.stop();

    /* Back to Render Main View */
    addTitleView();

    /* Reset game flags and variables */
    gameEnded = false;
} // end fn removeGameView

function restartGameView(e) {
    // /* Remove Click to leave listener */
    stage.removeEventListener('mousedown', restartGameView);
    stage.removeChild(popUptext);

    /* Remove stage children */
    stage.removeChild(gameBg, GameView);

    /* Remove all children of all Container children of GameView */
    GameView.removeAllChildren();
    GameStatusBar.removeAllChildren();
    GameStatus.removeAllChildren();
    GameStage.removeAllChildren();
    GameButtons.removeAllChildren();
    GameInteractive.removeAllChildren();
    PlayerContainer.removeAllChildren();
    CPUContainer.removeAllChildren();
    RemotePlayerContainer.removeAllChildren();

    /* Remove hero instances */
    player = null;
    cpu = null;
    remotePlayer = null

    createjs.Sound.stop();

    /* Back to Render Main View */
    addGameView(null, lastGameViewState.mode, lastGameViewState.stageID, lastGameViewState.players, true);

    lastliveState = [];

    /* Reset game flags and variables */
    gameEnded = false;
} // end fn removeGameView


/* ==============================  Display Object Methods ============================== */

function createGameStatusBar(color, x, y, w) {

    let bar = new createjs.Shape();
    bar.graphics.f(color).dr(0, 0, w, 12);
    bar.oriX = x;
    bar.oriY = y;
    return bar;
} // end fn createGameStatusBar

function setGameStatusBarWidth(obj, w) {
    obj.graphics.command.w = w;
    // //console.debug(obj.graphics.command.w);
} // end fn setGameStatusBarWidth


/* ==============================  Display Object Control ============================== */

function rescaleAll() {
    windowH = window.innerHeight;
    windowW = window.innerWidth;
    stageScaleX = windowW / STAGE_ORI_WIDTH;
    stageScaleY = windowH / STAGE_ORI_HEIGHT;
    stage.canvas.width = stageScaleX * STAGE_ORI_WIDTH;
    stage.canvas.height = stageScaleY * STAGE_ORI_HEIGHT;

    for (let obj of scalables) {
        if (!obj.scaleOnX) {
            obj.scaleX = stageScaleX;
            obj.scaleY = stageScaleY;
        } else {
            obj.scaleX = obj.scaleY = stageScaleX;
        }
        obj.x = (obj.oriX || 0) * stageScaleX;
        obj.y = (obj.oriY || 0) * stageScaleY;
        // obj.regX = (obj.oriRegX || 0) * stageScaleX;
        // obj.regY = (obj.oriRegY || 0) * stageScaleY;
    }

    for (let model of heroScalables) {
        model.trigger('change:transform');
    }
} //end fn resizeCanvas

function updateGameStatusBar(models, mode) {

    if (mode === 'single-player' && player && cpu) {
        setGameStatusBarWidth(leftSkillBar, STATUS_BAR_BASE_WIDTH * player.get('liveAttr').skill / HERO_MAX_SKILL);
        // player stamina bar
        setGameStatusBarWidth(leftStaminaBar, STATUS_BAR_BASE_WIDTH * player.get('liveAttr').sta / player.get('attr').sta);
        // cpu skill bar
        setGameStatusBarWidth(rightSkillBar, STATUS_BAR_BASE_WIDTH * cpu.get('liveAttr').skill / HERO_MAX_SKILL);
        // cpu stamina bar
        setGameStatusBarWidth(rightStaminaBar, STATUS_BAR_BASE_WIDTH * cpu.get('liveAttr').sta / cpu.get('attr').sta);

        if (player.get('liveAttr').skill >= HERO_MAX_SKILL) {
            leftSkillBar.graphics._instructions[2].style = '#ef3b0e';
        }
        if (cpu.get('liveAttr').skill >= HERO_MAX_SKILL) {
            rightSkillBar.graphics._instructions[2].style = '#ef3b0e';
        }
    }

} // end fn updateGameStatusBar

function correctGameObjectsOverlapError(mode) {

    // Swap HEROES
    if (mode === 'single-player' && player && cpu) {
        if (vOverlapError(player, cpu, PlayerContainer, CPUContainer, GameInteractive)) {
            /* Swap their order in stage */
            // console.log('@ Vertical Overlap err. Swap needed');
            GameInteractive.swapChildren(PlayerContainer, CPUContainer);
        }
    }
    if (mode === 'multi-player' && player && remotePlayer) {
        if (vOverlapError(player, remotePlayer, PlayerContainer, RemotePlayerContainer, GameInteractive)) {
            /* Swap their order in stage */
            // console.log('@ Vertical Overlap err. Swap needed');
            GameInteractive.swapChildren(PlayerContainer, RemotePlayerContainer);
        }
    }
} // end fn correctGameObjectsOverlapError

function joyStickRenderer(e, dist, limit, moveAngle) {

    /* Rendering of joystick */
    if (dist < limit) {
        e.target.x = e.type === 'pressup' ? e.target.oriX * stageScaleX : e.stageX;
        e.target.y = e.type === 'pressup' ? e.target.oriY * stageScaleY : e.stageY;
    }
    if (dist >= limit) {
        let rads = moveAngle * Math.PI / 180;
        let x = e.target.cage.radius * Math.cos(rads);
        let y = e.target.cage.radius * Math.sin(rads);

        e.target.x = e.type === 'pressup' ? e.target.oriX * stageScaleX : (x * stageScaleX + e.target.cage.x);
        e.target.y = e.type === 'pressup' ? e.target.oriY * stageScaleY : (y * stageScaleX + e.target.cage.y);
    }

    /* Styling */
    e.target.alpha = e.type === 'pressmove' || e.type === 'mousedown' ? 0.6 : 0.4;

    if (e.target.name === 'joystickL' && (e.type === 'pressmove' || e.type === 'mousedown')) {
        if (moveAngle > 275 || moveAngle <= 15) {
            // Inform this is dash
            e.target.graphics.clear().f('#0a02ef').dc(0, 0, 80);
        } else if (moveAngle > 15 && moveAngle <= 75) {
            // Inform this is skill
            e.target.graphics.clear().f('#f71000').dc(0, 0, 80);
        } else if (moveAngle > 75 && moveAngle <= 175) {
            // Inform this is run
            e.target.graphics.clear().f('#0cb709').dc(0, 0, 80);
        } else if (moveAngle > 175 && moveAngle <= 275) {
            // Inform this is jump
            e.target.graphics.clear().f('#f2da07').dc(0, 0, 80);
        }
    }
    if (e.target.name === 'joystickL' && e.type === 'pressup') {
        e.target.graphics.clear().f('#333').dc(0, 0, 80);
    }
} // end fn joyStickRenderer

function checkHeroAnimRendering(heroes) {

    heroes.forEach((hero) => {
        if (hero.get('rendering').play !== hero.view.currentAnimation) {
            hero.view.gotoAndPlay(hero.get('rendering').play);
            // console.debug(hero.get('rendering').play);
        }
    });
} // end fn checkHeroAnimRendering