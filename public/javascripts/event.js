function buttonClickHandler(e) {

    createjs.Sound.play('btn_click_sound');

    switch (e.target.name) {
        case 'singlePlayerB':
            addSelectHerosView();
            //addGameView(e, 'single-player', 'stage1', [{ heroID: 'hero_test_001' }]); // stage and hero are DUMMY data, which supposed to be selected by client prior to this operation
            break;
        case 'multiPlayerB':
            showTutorial();
            break;
        case 'creditsB':
            break;
        default:
            break;
    }
}; // end fn buttonClickHandler
function buttonDisplayClick(e) {
    var charArray = [heroChin, heroNuison, heroUncle];
    for (var item of charArray) {
        item.button.gotoAndStop('normal');
    }
    playerSelected = e.target.name;
    e.target.gotoAndStop('clicked');
    isOnClicked = true;
}

function buttonDisplayHover(e) {
    isOnClicked = false;
    e.target.gotoAndStop('hover');
}

function buttonDisplayNormal(e) {
    if (isOnClicked == false)
        e.target.gotoAndStop('normal');
}

function buttonAIDisplayClick(e) {
    // var charArray = [AIChin, AINuison, AIUncle];
    var charArray = [AIChin];
    for (var item of charArray) {
        item.button.gotoAndStop('normal');
    }
    AISelected = e.target.name;
    e.target.gotoAndStop('clicked');
    isOnClicked = true;
}


function buttonNext(e) {
    if (e.target.name == "next") {
        if (playerSelected != null) {
            addSelectSceneView();
            console.log("player" + playerSelected);
        }
    } else if (e.target.name == "AInext") {
        if (AISelected != null) {
            console.log("AISelected" + AISelected);
            // addGameView(e, 'single-player', 'stage1', [{ heroID: 'hero_test_001' }]);
            changeToID(playerSelected, AISelected);
            addGameView(e, 'single-player', 'stage1', [{ heroID: playerSelected }, { heroID: AISelected }]);

        }
    }
}

function changeToID(play, AI) {
    if (play == "heroChin") {
        playerSelected = "hero_test_001";
        if (AI == "AIChin") {
            AISelected = "hero_test_003";
        } else if (AI == "AINuison") {
            AISelected = "hero_test_002";
        } else {
            AISelected = "hero_test_003";
        }
    } else if (play == "heroNuison") {
        playerSelected = "hero_test_002";
        if (AI == "AIChin") {
            AISelected = "hero_test_003";
        } else if (AI == "AINuison") {
            AISelected = "hero_test_002";
        } else {
            AISelected = "hero_test_003";
        }
    } else {
        playerSelected = "hero_test_003";
        if (AI == "AIChin") {
            AISelected = "hero_test_003";
        } else if (AI == "AINuison") {
            AISelected = "hero_test_002";
        } else {
            AISelected = "hero_test_003";
        }
    }
}

function buttonBack(e) {
    if (e.target.name == "back") {
        addTitleView();
    } else if (e.target.name == "AIback") {
        addSelectHerosView();
    }
}

function addListenersOntickerStart(mode) {

    createjs.Ticker.addEventListener('tick', tickHandler);

    $(document).on('keydown keyup', { ticker: createjs.Ticker, model: player }, keyHandler);

    /* Add Joystick Control */
    joystickR.on('mousedown', joystickHandler, null, false, { ticker: createjs.Ticker, model: player });
    joystickR.on('pressmove', joystickHandler, null, false, { ticker: createjs.Ticker, model: player });
    joystickR.on('pressup', joystickHandler, null, false, { ticker: createjs.Ticker, model: player });

    joystickL.on('mousedown', joystickHandler, null, false, { ticker: createjs.Ticker, model: player });
    joystickL.on('pressmove', joystickHandler, null, false, { ticker: createjs.Ticker, model: player });
    joystickL.on('pressup', joystickHandler, null, false, { ticker: createjs.Ticker, model: player });

    /* Add Action Button Control */
    actionButtonW.on('mousedown', actionButtonHandler, null, false, { ticker: createjs.Ticker, model: player });
    actionButtonA.on('mousedown', actionButtonHandler, null, false, { ticker: createjs.Ticker, model: player });
    actionButtonS.on('mousedown', actionButtonHandler, null, false, { ticker: createjs.Ticker, model: player });
    actionButtonD.on('mousedown', actionButtonHandler, null, false, { ticker: createjs.Ticker, model: player });
    actionButtonW.on('pressup', actionButtonHandler, null, false, { ticker: createjs.Ticker, model: player });
    actionButtonA.on('pressup', actionButtonHandler, null, false, { ticker: createjs.Ticker, model: player });
    actionButtonS.on('pressup', actionButtonHandler, null, false, { ticker: createjs.Ticker, model: player });
    actionButtonD.on('pressup', actionButtonHandler, null, false, { ticker: createjs.Ticker, model: player });

} // end fn addListenersOntickerStart

function removeListenersOntickerEnd() {

    /* Remove Ticker Listeners */
    createjs.Ticker.removeEventListener('tick', tickHandler);

    $(document).off('keydown keyup', { ticker: createjs.Ticker, model: player }, keyHandler);

    /* Remove Joystick Cofftrol */
    joystickR.off('mousedown', joystickHandler, null, false, { ticker: createjs.Ticker, model: player });
    joystickR.off('pressmove', joystickHandler, null, false, { ticker: createjs.Ticker, model: player });
    joystickR.off('pressup', joystickHandler, null, false, { ticker: createjs.Ticker, model: player });

    joystickL.off('mousedown', joystickHandler, null, false, { ticker: createjs.Ticker, model: player });
    joystickL.off('pressmove', joystickHandler, null, false, { ticker: createjs.Ticker, model: player });
    joystickL.off('pressup', joystickHandler, null, false, { ticker: createjs.Ticker, model: player });

    /* Remove Action Button Control */
    actionButtonW.off('mousedown', actionButtonHandler, null, false, { ticker: createjs.Ticker, model: player });
    actionButtonA.off('mousedown', actionButtonHandler, null, false, { ticker: createjs.Ticker, model: player });
    actionButtonS.off('mousedown', actionButtonHandler, null, false, { ticker: createjs.Ticker, model: player });
    actionButtonD.off('mousedown', actionButtonHandler, null, false, { ticker: createjs.Ticker, model: player });
    actionButtonW.off('pressup', actionButtonHandler, null, false, { ticker: createjs.Ticker, model: player });
    actionButtonA.off('pressup', actionButtonHandler, null, false, { ticker: createjs.Ticker, model: player });
    actionButtonS.off('pressup', actionButtonHandler, null, false, { ticker: createjs.Ticker, model: player });
    actionButtonD.off('pressup', actionButtonHandler, null, false, { ticker: createjs.Ticker, model: player });
} // end fn removeListenersOntickerEnd

function keyHandler(e) {
    /* Disable key input if the action condition is not ready */
    if (e.keyCode === KEYCODE.A && e.data.model.get('liveAttr').sta < HERO_RUN_BASE_COST * 10)
        keyMap[e.keyCode] = false;
    else if (e.keyCode === KEYCODE.W && (e.data.model.get('liveAttr').sta < HERO_JUMP_COST ||
            e.data.model.get('actionState').jumping || e.data.model.get('actionControl').jumpCD > 0))
        keyMap[e.keyCode] = false;
    else if (e.keyCode === KEYCODE.D && (e.data.model.get('liveAttr').sta < e.data.model.get('attr').cost ||
            e.data.model.get('actionState').dashing || e.data.model.get('actionControl').dashCD > 0))
        keyMap[e.keyCode] = false;
    else
        keyMap[e.keyCode] = e.type == 'keydown'; // return true if keydown

    controlIntensity = getControlIntensity(e);
    controlDir = getControlDir(e);
    /* Set Global Action */
    if (!e.data.model.get('actionControl').block) {
        e.data.model.setNextAction(getActionOnInput(e, e.data.model.view, e.data.model, controlDir, controlIntensity, controlAngle));
    }
}; // end fn keyHandler

function joystickHandler(e, data) {
    /* Extract transform info */
    let offX = e.stageX - e.target.x,
        offY = e.stageY - e.target.y;
    let dist = computeDistance(e.target.x + offX, e.target.y + offY, e.target.oriX * stageScaleX, e.target.oriY * stageScaleY);
    let limit = e.target.cage.radius * stageScaleX; // boundary limit
    let moveAngle = Math.atan2(e.stageY - e.target.cage.y, e.stageX - e.target.cage.x) * (180 / Math.PI);
    if (moveAngle < 0) moveAngle = 360 - (-moveAngle);

    /* Rendering of joystick */
    joyStickRenderer(e, dist, limit, moveAngle);

    /* Rounding the angle to the nearest X for the ease of control */
    moveAngle = Math.ceil(moveAngle / (360 / MAX_CONTROL_ANGLES)) * (360 / MAX_CONTROL_ANGLES); // 16x angles

    /* Set Global Control Properties */
    if (e.target.name === 'joystickR') {
        controlIntensity = getControlIntensity(e, e.target.cage.radius, dist);
        controlDir = getControlDir(e, moveAngle, data.model);
    }
    if (e.target.name === 'joystickL') {
        setKeyByVirtualInput(e, angle);
    }
    /* Set Global Action */
    if (!data.model.get('actionControl').block) {
        data.model.setNextAction(getActionOnInput(e, data.model.view, data.model, controlDir, controlIntensity, controlAngle));
    }
} // end fn joystickHandler

function actionButtonHandler(e, data) {
    // console.debug(e.target.name);
    setKeyByVirtualInput(e, data.model);

    /* Render */
    e.target.alpha = (e.type === 'mousedown') ? 0.9 : 0.4;

    if (!data.model.get('actionControl').block) {
        data.model.setNextAction(getActionOnInput(e, data.model.view, data.model, controlDir, controlIntensity, controlAngle));
    }
} // end fn actionButtonHandler