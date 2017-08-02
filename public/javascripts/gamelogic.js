function startGame(mode, stageID) {

    bg.onPress = null;

    /* Reset Global */
    controlIntensity = 1;
    controlAngle = null;
    controlDir = null;

    /* Clear keymap */
    keyMap = {};

    /* Destroy count down text */
    GameView.removeChild(countDown);
    // countDown = null;

    /* Start Listeners for Game View */


    /* Start Hero View Listeners */
    if (mode === 'single-player') {
        player.trigger('startListeners', [cpu]);
        cpu.trigger('startListeners', [player]);
        heroesOnGame.push(player, cpu);
    }
    // player.trigger('startPlayerListeners');
    // cpu.trigger('startAIListeners');
    if (mode === 'multi-player') {
        player.trigger('startListeners', [remotePlayer]);
        remotePlayer.trigger('startListeners', [player]);
        heroesOnGame.push(player, remotePlayer);
        // socket.on('chestheroes_players:update', onServerUpdateModels);
        saveModelsToServer(heroesOnGame);
    }

    player.setEvent({ thisClient: true });

    gameMode = mode;

    /* Add Listeners */
    addListenersOntickerStart(mode);

    // if (stageID === 'stage1') {
    createjs.Sound.play('stage1Music', { loop: Infinity, volume: 0.5 });
    // }

    heroesOnGame.forEach((model) => {
        console.log(model.id + ' lives remain: ' + model.get('liveAttr').lives);
    });

    /* Start auto moving AI */
    // cpu.trigger('AIAutoMove', gameStage);
    // cpu.trigger('AISearchMove', gameStage, player);
    // cpu.trigger('startAIDebugListener');
} // end fn startGame

function handleGameEnd(msg, mode, models) {

    setTimeout(() => {
        console.info(msg);
        // alert(msg + 'Click to continue');
        popUptext.text = msg + 'Click to continue';
        popUptext.regX = popUptext.getMeasuredWidth() / 2;
        stage.addChild(popUptext);

    }, 500);
    gameEnded = true;

    removeListenersOntickerEnd();

    /* Remove listeners bound to heroes  */
    if (mode === 'single-player') {
        player.trigger('removeListeners');
        player.trigger('removePlayerListeners');
        cpu.trigger('removeListeners');
        cpu.trigger('removeAIListeners');
    }
    if (mode === 'multi-player') {
        player.trigger('removeListeners');
        player.trigger('removePlayerListeners');
        remotePlayer.trigger('removeListeners');
        remotePlayer.trigger('removePlayerListeners');
        // socket.off('chestheroes_players:update', onServerUpdateModels);
    }

    heroesOnGame = [];
    gameMode = null;

    // Show something before Left

    /* Click to leave */
    stage.addEventListener('mousedown', removeGameView);
} // end fn gameEnd

function handleGameRestart(msg, mode, models) {

    setTimeout(() => {
        console.info(msg);
        popUptext.text = msg + 'Click to continue';
        popUptext.regX = popUptext.getMeasuredWidth() / 2;
        stage.addChild(popUptext);
    }, 500);
    // gameEnded = true;

    removeListenersOntickerEnd();

    /* Remove listeners bound to heroes  */
    if (mode === 'single-player') {
        player.trigger('removeListeners');
        player.trigger('removePlayerListeners');
        cpu.trigger('removeListeners');
        cpu.trigger('removeAIListeners');
    }
    if (mode === 'multi-player') {
        player.trigger('removeListeners');
        player.trigger('removePlayerListeners');
        remotePlayer.trigger('removeListeners');
        remotePlayer.trigger('removePlayerListeners');
        // socket.off('chestheroes_players:update', onServerUpdateModels);
    }

    heroesOnGame = [];
    gameMode = null;

    // Show something before restart
    createjs.Sound.stop();

    /* Click to leave */
    stage.addEventListener('mousedown', restartGameView);
} // end fn Restart

function tickHandler(e) {
    var mode = gameMode;
    // Record Start time of tickHandler
    var startPerf = performance.now();

    countTickToSec++;

    handleItemsPrompt(gameItems);

    handleItemsIntake(heroesOnGame, gameItems);

    /* Detect Collision to stage */
    handleHeroToStageCollision(heroesOnGame, gameStage);

    /* Handle all stuff by the number of countTickToSec */
    handleCountTickToSec(heroesOnGame, mode);

    /* Correct Z position */
    autoGravity(heroesOnGame);

    /* Reduce Hero Action CD by frame */
    reduceCD(heroesOnGame);

    /* Control hero movement */
    // Check collision and manipulate action
    handleHeroToHeroCollision(heroesOnGame);
    // Push action into hero's action stack
    pushHeroAction(heroesOnGame);
    // Finally apply action
    handleHeroMove(heroesOnGame);

    /* Exception Handling */
    handleExceptions(heroesOnGame);

    // if (mode === 'multi-player') saveModelsToServer(heroesOnGame);

    /* Update deltaTime */
    deltaTime = (performance.now() - startPerf);
    // console.log('tickHandler took: ' + deltaTime + ' ms');

}; // end fn tickHandler

// function onServerUpdateModels(data) {
//     console.log(data);
// } // fn onServerUpdateModels

function handleItemsIntake(heroes, items) {
    items.forEach((item, i) => {
        heroes.forEach((hero, i) => {
            if (hero.get('transform').z === 0 && item.active) {
                if (Math.abs(hero.view.x - item.view.x) <= 50 && Math.abs(hero.view.y - item.view.y) <= 100) {
                    console.log(hero.id + ' intakes ' + item.id);
                    //recover sta
                    if (item.type === 'sta_recover' && hero.get('liveAttr').sta <= hero.get('attr').sta) {
                        if (hero.get('liveAttr').sta + 3 <= hero.get('attr').sta)
                            hero.setLiveAttr({ sta: hero.get('liveAttr').sta + 3 });
                        else
                            hero.setLiveAttr({ sta: hero.get('attr').sta });
                        item.active = false;
                        stage.removeChild(item.view);
                    }
                }
            }
        });
    });
} // fn handleItemsIntake

function handleItemsPrompt(items) {
    items.forEach((item, i, items) => {
        if (item.promptTime === parseInt(gameTime.text) && !item.active) {
            stage.addChild(item.view);
            item.active = true;
        }
        if (countTickToSec % FPS === 0) {
            if (item.active && item.liveTime !== 0) {
                item.liveTime--;
            }
            if (item.liveTime === 0) {
                item.active = false;
                stage.removeChild(item.view);
                items.slice(i);
            }
        }
    });
} //fn handleItemsPrompt

function saveModelsToServer(models, data) {
    // console.log(models);
    models.forEach((model) => {
        model.save(data || null, {
            success: function(model, response, options) {
                console.log("successfully saved model, id=" + model.id);
            },
            error: function(model, response, options) {
                //	not successful in save
                //	model is not changed, as "wait"=true
                console.log("failed in saving model, id=" + model.id + " error=" + response.errmsg);
            },
            view: model.view,
            wait: false, //	wait till the server to confirm the save before confirm the change on the model on client side
            //	if error in server, the model will not be updated on the client side
            //	may not be good in terms of responsiveness on the client side
            // patch: true
        });
        // socket.emit('chestheroes_players:update', { id: model.id, transform: model.get('transform') });
    });
} // fn saveModelsToServer

function handleCountTickToSec(models, mode) {
    // Supposed countTickToSec is global
    if (countTickToSec % (FPS / 60) === 0) {
        /* Auto Recover Stamina every 1/60 second */
        recoverStamina(models);
        /* Sync view animation with model */
        checkHeroAnimRendering(models);

        /* ===== Rendering ===== */

        /* Update Status Bar */
        updateGameStatusBar(models, mode);
        /* Start View Overlap Error Listener */
        correctGameObjectsOverlapError(mode);
    }
    if (countTickToSec % (FPS) === 0) {
        /*//---- TESTING --- //*/
        testCPUWalkLeftNonStop(cpu);
        testCPURunLeftNonStop(cpu);
        testCPUDashLeftNonStop(cpu);
        testCPUJumpLeftNonStop(cpu);
        CPUSearchMove(cpu, player);
    }
    if (countTickToSec % (FPS / 10) === 0) {
        /* Reduce faint time */
        reduceFaintTime(models);
    }
    /* Handler when tick reaches every second */
    if (countTickToSec === FPS) {

        /* Shrink Land */
        // gameStage.graphics.command.w -= 1;
        // gameStage.graphics.command.h -= 1 * LAND_SCALE;
        // gameStage.rx = gameStage.graphics.command.w / 2;
        // gameStage.ry = gameStage.graphics.command.h / 2;
        // gameStage.regX = gameStage.graphics.command.w / 2;
        // gameStage.regY = gameStage.graphics.command.h / 2;

        /* Reset if tick reached a second, fps:30 */
        countTickToSec = 0;
        if (!gameEnded) gameTime.text = parseInt(gameTime.text - 1);

        /* ========== Game End Handler when timeout ========== */
        if (parseInt(gameTime.text) === 0 && !gameEnded) {
            handleGameEnd('@ GAME END - timeout', mode, models);
        }
    }
} // end fn handleCountTickToSec

function handleExceptions(models) {
    let recsAnalyzed = new Array();
    let countStickingErr = 0,
        lastTransform = new Transform();

    models.forEach((model, i, models) => {
        /* push record by tick for watching */
        model.pushRecord({
            tick: createjs.Ticker.getTicks(),
            action: Object.assign({}, model.get('lastAction') || new Action()),
            transform: Object.assign({}, model.get('transform') || new Transform()),
            checked: false
        });
        /* Retrieve records for analysis */
        for (var i = model.get('recordStack').length - 5; i < model.get('recordStack').length; i++) {
            recsAnalyzed.push(model.get('recordStack')[i]);
        }
        /* Extracted last five records for analysis */
        recsAnalyzed.forEach((rec, i, recs) => {
            /* Count if hero is not standing and transform not changed (sticked) */
            if (rec && model.view.currentAnimation) {
                if ((rec.action.name !== 'stand' || !model.view.currentAnimation.includes('stand')) && model.get('collision').collided && model.get('actionControl').block && model.get('transform').z === 0) {
                    if (lastTransform.x === rec.transform.x && lastTransform.y === rec.transform.y && lastTransform.z === rec.transform.z) {
                        countStickingErr++;
                    }
                    lastTransform = rec.transform;
                }
            }
        });
        if (countStickingErr >= 4) {
            /* Correct heroes sticking error */
            console.debug(' * Correct heroes sticking error * ');
            model.clearActionStack();
            model.setNextAction(new Action());
            model.setActionControl({ block: false });
        }
    });
} // end fn handleExceptions

function autoGravity(models) {
    models.forEach((model, i, models) => {
        if (model.get('transform').z < 0 && !model.get('actionState').jumping) {
            model.setTransform({ z: Math.round(model.get('transform').z) + 1 });
        }
        if (model.get('transform').z > 0 && !model.get('actionState').jumping) {
            model.setTransform({ z: Math.round(model.get('transform').z) - 1 });
        }
    });
} // end fn autoGravity

function recoverStamina(models) {
    for (let model of models) {
        if (model.get('liveAttr').sta < model.get('attr').sta) {
            model.setLiveAttr({ sta: model.get('liveAttr').sta + 0.01 });
            // console.debug('model sta:' + model.get('liveAttr').sta);
        }
    }
} // end fn recoverStamina

function reduceFaintTime(models) {
    models.forEach((model) => {
        let faint = model.get('selfState').faint;
        // console.debug(model.id + ' faint: ' + faint);
        if (faint > 0) {
            model.setSelfState({ faint: faint - (faint >= 0.1 ? 0.1 : faint) });
        }
    });
} // end fn reduceFaintTime

function getActionOnInput(e, v, model, controlDir, controlIntensity, controlAngle) {
    let transform = new Transform(),
        action;

    controlDir = controlDir || 'Forward';
    controlIntensity = controlIntensity || 1;
    controlAngle = controlAngle || 0;

    if (e.type == 'keydown' || e.type == 'pressmove' || e.type == 'mousedown') {
        if (isKeyMoveControl()) { /* auto set intensity if it is key move */
            controlIntensity = 3;
        }
        /* Get offset By Dir */ // pressmove : keydown
        transform.x = isKeyMoveControl() ? getOffsetByDir(controlDir).x : getXbyDeg(controlAngle);
        transform.y = isKeyMoveControl() ? getOffsetByDir(controlDir).y : getYbyDeg(controlAngle);
        /* Correct Anim with respect to transform */
        if (getDirByOffset(transform.x, transform.y) !== controlDir) {
            controlDir = getDirByOffset(transform.x, transform.y);
        }
        /* Get type of Action */
        /* Dash */
        if (keyMap[KEYCODE.D] && canMove(model) && canDash(model) && isMoveControl(true)) {
            action = getDashAction(transform, controlDir);
        } else /* Jump */
        if (keyMap[KEYCODE.W] && canMove(model) && canJump(model)) {
            // console.debug('trans by deg: ' + getXbyDeg(controlAngle) + ',' + getYbyDeg(controlAngle));
            // console.debug('isMoveControl: ' + isMoveControl(false));
            action = getJumpAction(transform, controlDir, controlIntensity, isMoveControl(false));
        } else /* Run */
        if (keyMap[KEYCODE.A] && canMove(model) && canRun(model) && isMoveControl(false)) {
            action = getRunAction(transform, controlDir, controlIntensity);
        } else /* Walk */
        if (isMoveControl(false)) {
            action = getWalkAction(transform, controlDir, controlIntensity);
        } else { /* Stand */
            action = new Action();
        }
    }
    if ((e.type == 'keyup' || e.type == 'pressup')) {
        /* Stand */
        action = new Action();
    }
    return action;
} // end fn getActionOnInput

function collisionResponseHandler(a, b, actA, actB) {

    var indexActA, indexActB,
        actA = actA,
        actB = actB;

    /* unblock action to push new action */
    a.setActionControl({ block: false });
    b.setActionControl({ block: false });
    /* if consecutiveActions, take the first of its action stack */
    if (actA.type === 'consecutiveActions') actA = a.get('lastAction').actions[0];
    if (actB.type === 'consecutiveActions') actB = b.get('lastAction').actions[0];
    // console.debug('act:');
    // console.debug(actA);
    // console.debug(actB);

    /* get the superiority index of the action */
    for (var i in ACTION_SUPERIORITY) {
        if (ACTION_SUPERIORITY[i] === actA.name) indexActA = i;
        if (ACTION_SUPERIORITY[i] === actB.name) indexActB = i;
    }
    // console.debug('index: ' + indexActA + ' ' + indexActB);
    /* Invoke response method based on the index comparison */
    if (indexActA > indexActB) {
        // console.debug('a>b');
        setUnevenCollisionActionResponse(a, b, actA, actB);
    } else
    if (indexActA < indexActB) {
        // console.debug('a<b');
        setUnevenCollisionActionResponse(b, a, actB, actA);
    } else
    if (indexActA === indexActB) {
        // console.debug('a===b');
        setEvenCollisionActionResponse(a, b, actA, actB);
    }
} // end fn collisionResponseHandler

function initEvenSlipConsecutiveActions(newActA, newActB, actA, actB) {
    let newAttrA = {
        name: 'slip',
        dir: actB.dir,
        play: newActA.name + newActA.dir,
        disturbed: true,
        block: true
    };
    let newAttrB = {
        name: 'slip',
        dir: actA.dir,
        play: newActB.name + newActB.dir,
        disturbed: true,
        block: true
    };
    /* Replace Action by a 'slip' consecutiveActions */
    setActionAttributes([newActA, newActB], [newAttrA, newAttrB]);
} // end fn initSlipActions

function modifyEvenSlipActionStack(newActA, newActB, actA, actB) {
    newActA.actions.forEach((act, i, arr) => {
        act.name = (actA.name === 'jump') ? 'jump' : 'slip';
        act.dir = arr.dir;
        act.play = act.name + act.dir;
        act.transform.x *= act.rebounceFactor.x;
        act.transform.y *= act.rebounceFactor.y;
        act.disturbed = true;
        act.block = true;
        // console.debug(act);
    });
    newActB.actions.forEach((act, i, arr) => {
        act.name = (actB.name === 'jump') ? 'jump' : 'slip';
        act.dir = arr.dir;
        act.play = act.name + act.dir;
        act.transform.x *= act.rebounceFactor.x;
        act.transform.y *= act.rebounceFactor.y;
        act.disturbed = true;
        act.block = true;
        // console.debug(act);
    });
} // end fn modifyEvenSlipActionStack

function setEvenCollisionActionResponse(a, b, actA, actB) {

    let newActA = new Action(actA.name, actA.dir, new Transform(actB.transform.x, actB.transform.y, 0), actB.intensity),
        newActB = new Action(actB.name, actB.dir, new Transform(actA.transform.x, actA.transform.y, 0), actA.intensity),
        rand = getRelativeRandomPair(8);

    if (actA.name === 'dash') {
        let res = getEvenDashResponse(a, b, actA, actB);
        newActA = res.newActA;
        newActB = res.newActB;
    }
    if (actA.name === 'jump') {
        let res = getEvenJumpResponse(a, b, actA, actB);
        newActA = res.newActA;
        newActB = res.newActB;
    }
    if (actA.name === 'run' || actA.name === 'walk') {
        /* Even run and walk */
        modifyActionTransform([newActA, newActB], [new TransformFactor(rand.a, rand.a, 0), new TransformFactor(rand.b, rand.b, 0)]);
    }
    if (actA.name === 'stand') {
        /* Even Stand */
        let overlapPts = getHeroesOverlapPoints(a, b);

        let distX = Math.abs((overlapPts.b.x - overlapPts.a.x) / 1.9);
        let distY = Math.abs((overlapPts.b.y - overlapPts.a.y) / 1.9);
        let length = 1;

        newActA = new ConsecutiveActions('walk', [], true, true, false);
        newActB = new ConsecutiveActions('walk', [], true, true, false);

        if (distX > distY) length = Math.round(distX);
        else if (distX < distY) length = Math.round(distY);

        for (var i = 0; i < length; i++) {
            newActA.actions.push(
                new Action('walk', 'Forward', new Transform(((overlapPts.b.x - overlapPts.a.x) / 1.9) / length, ((overlapPts.b.y - overlapPts.a.y) / 1.9) / length, 0))
            );
            newActB.actions.push(
                new Action('walk', 'Forward', new Transform(((overlapPts.a.x - overlapPts.b.x) / 1.9) / length, ((overlapPts.a.y - overlapPts.b.y) / 1.9) / length, 0))
            );
        }

        // setActionTransform([newActA, newActB], [
        //     new TransformFactor(((overlapPts.b.x - overlapPts.a.x) / 1.9), ((overlapPts.b.y - overlapPts.a.y) / 1.9), 0),
        //     new TransformFactor(((overlapPts.a.x - overlapPts.b.x) / 1.9), ((overlapPts.a.y - overlapPts.b.y) / 1.9), 0)
        // ]);
    }
    if (actA.name === 'slip') {
        a.setNextAction(new Action());
        b.setNextAction(new Action());
    }
    /* Apply action to heroes' action stack */
    clearActionStack(a, b);
    unshiftAction([a, b], [newActA, newActB]);
}

function setUnevenCollisionActionResponse(a, b, actA, actB) {

    let newActA = new Action(actA.name, actA.dir),
        newActB = new Action('slip', actA.dir);
    // console.debug('uneven resp');
    if (actA.name === 'dash') {
        // console.debug(a.id + ' is ' + actA.name);
        let newAct = getUnevenDashResponse(a, b, actA, actB);
        newActA = newAct.newActA;
        newActB = newAct.newActB;
        // console.debug(newActA);
        // console.debug(newActB);
    }
    if (actA.name === 'jump') {
        // console.debug(a.id + ' is ' + actA.name);
        let newAct = getUnevenJumpResponse(a, b, actA, actB);
        newActA = newAct.newActA;
        newActB = newAct.newActB;
        // console.debug(newActA);
        // console.debug(newActB);
    }
    if (actA.name === 'run') {
        // console.debug(a.id + ' is ' + actA.name);
        setActionTransform([newActA, newActB], [new Transform(actA.transform.x * HERO_RUN_ENFORCER_DECLINE, actA.transform.y * HERO_RUN_ENFORCER_DECLINE, 0), new Transform(actA.transform.x * HERO_RUN_ENDURER_GAIN, actA.transform.y * HERO_RUN_ENDURER_GAIN, 0)]);
    }
    if (actA.name === 'walk') {
        // console.debug(a.id + ' is ' + actA.name);
        setActionTransform([newActA, newActB], [new Transform(actA.transform.x * HERO_WALK_ENFORCER_DECLINE, actA.transform.y * HERO_WALK_ENFORCER_DECLINE, 0), new Transform(actA.transform.x * HERO_WALK_ENDURER_GAIN, actA.transform.y * HERO_WALK_ENDURER_GAIN, 0)]);
    }
    /* Apply action to heroes' action stack */
    clearActionStack(a, b);
    unshiftAction([a, b], [newActA, newActB]);
}

function handleHeroToHeroCollision(heroes) {
    heroes.forEach((thisHero) => {
        let numCollision = 0;
        heroes.forEach((thatHero) => {
            if (thatHero !== thisHero) {
                let thisAction = thisHero.get('lastAction'),
                    thatAction = thatHero.get('lastAction');
                if (thisAction.type === 'consecutiveActions') thisAction = thisAction.actions[0];
                if (thatAction.type === 'consecutiveActions') thatAction = thatAction.actions[0];

                if (thisAction && thatAction) {
                    /* Check if heroes collide */
                    if (heroesCollide(thisHero, thatHero, thisAction.transform.x * 5, thisAction.transform.y * 5, thatAction.transform.x * 5, thatAction.transform.y * 5)) {
                        // console.log('collided');
                        /* Set Collision params */
                        thisHero.setCollision({ collided: true, collideTarget: thatHero });
                        thatHero.setCollision({ collided: true, collideTarget: thatHero });
                        // console.log('a: ' + thisHero.id + ' b: ' + thatHero.id);
                        /* Invoke collision response */
                        collisionResponseHandler(thisHero, thatHero, thisAction, thatAction);
                    } else {
                        /* Unset collision params */
                        thisHero.setCollision({ collided: false, collideTarget: null });
                        thatHero.setCollision({ collided: false, collideTarget: null });
                    }
                }
            }
        });
    });
}

function pushHeroAction(models) {

    for (let model of models) {
        if (!model.get('actionControl').block) {
            let nextAction = model.get('nextAction');
            if (nextAction) {
                // if (model.get('liveAttr').sta >= getCostByAction(model, nextAction)) {
                // console.debug(cpu.get('nextAction'));
                if (canMove(model)) {
                    model.pushActions(nextAction);
                    // console.debug(model.id + ' action pushed');
                    // console.debug(nextAction);
                } else {
                    // console.log(model.id + ' faint');
                }
                // }
                if (nextAction.type === 'consecutiveActions' && nextAction.block) {
                    model.setActionControl({ block: true });
                }
            }
        }
    }
} // end fn pushHeroActions

function handleHeroMove(models) {
    for (let m of models) {
        var act;
        if (m.get('actionStack') !== [] && m.get('actionStack')[0]) {
            act = m.shiftAction();
            // console.debug(m.id + ' shifted for move');
            // console.debug(act);
            /* shift from Consecutive Actions */
            if (act.type === 'consecutiveActions') {
                // console.debug(act);
                if (act.block) {
                    /* Make sure during these consecutiveActions no any other action is pushed */
                    m.clearActionStack();
                    m.setActionControl({ block: true });
                }
                let actions = act;
                act = act.actions.shift();
                /* Handle if this actions stack finished */
                if (actions.actions.length == 0) {
                    m.setNextAction(new Action());
                    m.setActionControl({
                        block: false,
                        dashCD: (actions.name === 'dash') ? HERO_DASH_CD : 0,
                        jumpCD: (actions.name === 'jump') ? HERO_JUMP_CD : 0,
                        lastActionTick: createjs.Ticker.getTicks()
                    });
                    // debug
                    countCost = 0;
                } else
                    m.unshiftAction(actions);

                if (countCost == 0) {
                    //     console.debug("## " + act.name + ' starts ');
                    // console.debug(act.name + ' ' + countCost++);
                }
            }
            /* Execute transform and play */
            if (act) {
                if (m.get('rendering').play !== act.play) {
                    m.setRendering({ play: act.play });
                }
                /* Reduce Cost if action not disturbed */
                if (!act.disturbed) {
                    reduceCostByAction(m, act);
                }
                /* Increment Skill */
                incrementSkillByAction(m, act);

                /* Set Model Action State */
                resetModelState(m, (act.name === 'run') ? act.name + 'nning' : act.name + 'ing');
                /* Set Transform */
                m.setTransform({
                    x: m.get('transform').x + act.transform.x * act.intensity,
                    y: m.get('transform').y + act.transform.y * act.intensity,
                    z: m.get('transform').z + act.transform.z
                });

                // if (!lastFootstep) {
                //     lastFootStep = createjs.Sound.play('footstep_' + act.name);
                // } else {
                //     lastFootstep.on('complete', (e) => {
                //         createjs.Sound.play('footstep_' + act.name);
                //     });
                // }

                // /* Even Stand */
                // let overlapPts = getHeroesOverlapPoints(a, b);
                // setActionTransform([newActA, newActB], [
                //     new TransformFactor(((overlapPts.b.x - overlapPts.a.x) / 1.9), ((overlapPts.b.y - overlapPts.a.y) / 1.9), 0),
                //     new TransformFactor(((overlapPts.a.x - overlapPts.b.x) / 1.9), ((overlapPts.a.y - overlapPts.b.y) / 1.9), 0)
                // ]);
            }
        }
    }
} // end fn handleHeroMove

function reduceCD(heroes) {
    heroes.forEach((hero) => {
        if (hero.get('actionControl').jumpCD > 0)
            hero.setActionControl({ jumpCD: hero.get('actionControl').jumpCD - 1 });
        if (hero.get('actionControl').dashCD > 0)
            hero.setActionControl({ dashCD: hero.get('actionControl').dashCD - 1 });
    });
}

function handleHeroToStageCollision(models, gameStage) {
    /*  - Collision between Game Stage and Heroes */
    models.forEach((model, i, models) => {
        /*    - Determine on or off game stage */
        if (model.get('transform').z === 0) { // Make sure model is on floor */
            // console.debug(model.id + ' pts on stage: ' + getHeroPointsOnStage(model, gameStage));
            let ptsOnStage = getHeroPointsOnStage(model, model.view.x, model.view.y, gameStage);
            model.setSelfState({
                imbalance: 5 - ptsOnStage,
                falled: ptsOnStage === 0 ? true : false
            });
        }
        /* ========== Game End Handler when one hero left on stage ========== */
        if (model.get('selfState').falled && !gameEnded) {
            var falledModel = model;
            if (model.get('liveAttr').lives === 1) {
                handleGameEnd('@ GAME END - ' + model.id + ' lost', gameMode, models);
            } else {
                console.log(model.id + ' falled lost one life');
                models.forEach((model) => {
                    if (falledModel === model) {
                        lastliveState.push({ id: model.id, lives: model.get('liveAttr').lives - 1 });
                    } else {
                        lastliveState.push({ id: model.id, lives: model.get('liveAttr').lives });
                    }
                });
                handleGameRestart('@ GAME Restart - ' + model.id + ' lost ONE life ', gameMode, models);
            }

            // falled down
            let count = 0;
            let fallingDownInterval = setInterval(() => {
                count++;
                model.view.y += 1;
                model.view.castShadow.y += 2;
                if (count % 3 == 0) {
                    model.view.alpha -= 0.01;
                    model.view.castShadow.alpha -= 0.02;
                }
                if (count === 300) {
                    clearInterval(fallingDownInterval);
                }
            }, 5);
        }
    });
} // end fn detectCollision