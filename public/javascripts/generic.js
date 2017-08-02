/* ===============  CLIENT-SIDE ================= */

function computeVelocity(spd, weight) {

    return Math.round(HERO_BASE_SPD + spd * 0.5 - weight / 10);

} // end fn computeVelocity

function computeJumpPosition(c, s, e) {
    // if (c >= s) {
    //     c = c - s + 1;
    if (c <= 60) return -2;
    else if (c > 100) return +4;
    else if (c > 60) return -1;
    // }
} // end fn computeJumpPosition


function computeJumpPosition2(c, h) {
    // if (c >= s) {
    //     c = c - s + 1;
    if (c <= 40) return -2.5;
    else if (c > 40) return +(100 + h) / (100 - 40);
    // }
} // end fn computeJumpPosition

function computeDashPosition(spd, weight) {

    return Math.round((spd - weight / 10) * HERO_SPRINT_SPEED_MODIFIER);

} // end fn computeDashPosition

function computeForce(pow, spd, off) {
    // //console.debug(off * (pow * spd / 400));
    return off * (pow * spd / 400);

} // end fn computeForce

function determinePlay(action, offX, offY) {
    // //console.log('@determinePlay ' + offX + ' , ' + offY);
    if (offX !== 0) {
        if (offX > 0) return action + 'Rightward';
        else return action + 'Leftward';
    }
    if (offY !== 0) {
        if (offY > 0) return action + 'Forward';
        else return action + 'Backward';
    }
} // end fn determinePlay

function heroesCollide(a, b, aOffX, aOffY, bOffX, bOffY) {
    aOffX = aOffX || 0;
    aOffY = aOffY || 0;
    bOffX = bOffX || 0;
    bOffY = bOffY || 0;

    let diffZ = Math.abs(a.get('transform').z - b.get('transform').z),
        collideZ = (diffZ <= a.get('attr').height || diffZ <= b.get('attr').height) ? true : false,
        diffY = Math.abs((a.get('transform').y + aOffY) - (b.get('transform').y + bOffY)),
        collideY = (diffY <= a.get('attr').thickness / 2 + b.get('attr').thickness / 2) ? true : false,
        diffX = Math.abs((a.get('transform').x + aOffX) - (b.get('transform').x + bOffX)),
        collideX = (diffX <= a.get('attr').width / 2 + b.get('attr').width / 2) ? true : false;

    if (collideZ && collideY && collideX) {
        return true;
    } else {
        return false;
    }
} // end fn heroesCollide

function movingOut(a, b, actA, actB) {
    let dist = computeDistance(a.get('transform').x, a.get('transform').y, b.get('transform').x, b.get('transform').y);
    let aMovedDist = computeDistance(a.get('transform').x + actA.transform.x, a.get('transform').y + actA.transform.y, b.get('transform').x, b.get('transform').y);
    let bMovedDist = computeDistance(a.get('transform').x, a.get('transform').y, b.get('transform').x + actB.transform.x, b.get('transform').y + actB.transform.y);
    if (aMovedDist > dist || bMovedDist > dist) return true;
    else return false;
} // end fn movingOut

/* Vertical overlap error */
function vOverlapError(modelA, modelB, viewA, viewB, container) {

    let indexA = container.getChildIndex(viewA),
        indexB = container.getChildIndex(viewB),
        yA = modelA.get('transform').y,
        yB = modelB.get('transform').y;

    /* Check index order if a pos y is higher than b pos y*/
    if (yA < yB) return (indexA < indexB) ? false : true;

    /* Check index order if a pos y is lower than b pos y */
    if (yA > yB) return (indexA > indexB) ? false : true;

} // end fn vOverlapError

function pointHitObject(a, x, y, b) {
    let pt = a.localToLocal(x, y, b);
    // let pt = player.view.hitArea.localToLocal(player.view.hitArea.regX, player.view.hitArea.regY, gameStage);
    // //console.debug(a.id+' ' + pt.x + ' ' + pt.y + ':' + b.hitTest(pt.x, pt.y));
    return b.hitTest(pt.x, pt.y);

} // end fn collideWithObject

function objectStandPoints(a, x, y, w, h, obj) {

    // //console.debug(x + ' ' + y + ' ' + w + ' ' + h);
    let numPts = 0;
    let ptC = a.localToLocal(x, y, obj);
    let ptL = a.localToLocal(x - w / 2, y, obj);
    let ptR = a.localToLocal(x + w / 2, y, obj);
    let ptU = a.localToLocal(x, y - h / 2, obj);
    let ptD = a.localToLocal(x, y + h / 2, obj);
    let pts = [ptC, ptL, ptR, ptU, ptD];
    for (var i in pts) {
        if (obj.hitTest(pts[i].x, pts[i].y)) numPts++;
        // //console.debug(i + ' ' + numPts);
    }

    return numPts;
} // end fn objectStandPoints

function determineTrackingDirection(a, b) {
    // a tracks b
    var x = 0,
        y = 0;

    var diffX = b.get('transform').x - a.get('transform').x;
    var diffY = b.get('transform').y - a.get('transform').y;

    if (diffX > 0) {
        x = +1;
    }
    if (diffX < 0) {
        x = -1;
    }
    if (diffY < 0) {
        y = -1;
    }
    if (diffY > 0) {
        y = +1;
    }

    return { x: x, y: y };
} // end fn determineTrackingDirection

function getAllOffsetDirection() {

    return [
        { x: -1, y: 0 },
        { x: +1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: +1 }
    ]

} // end fn getAllOffsetDirection

function computeDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
} // end fn computeDistance

function computePositionAbsoluteDifference(x1, y1, x2, y2) {
    return {
        x: Math.abs(x1 - x2),
        y: Math.abs(y1 - y2)
    }
} // end fn computePositionAbsoluteDifference

function computePositionDifference(x1, y1, x2, y2) {
    return {
        x: x1 - x2,
        y: y1 - y2
    }
} //end fn computePositionDifference

function determineOnStage(view, regX, regY, width, thickness, stg) {

    let pointsOnTraps = 0;
    /* Trap standpoints check */
    for (let trap of stg.traps) {
        pointsOnTraps += objectStandPoints(view, regX, regY, width - 10, thickness - 4, trap);
    }
    /* Stage standpoints check */
    let pointsOnStage = objectStandPoints(view, regX, regY, width - 10, thickness - 4, stg);

    return { pointsOnTraps: pointsOnTraps, pointsOnStage: pointsOnStage };
} //end fn determineOnStage

function getHeroPointsOnStage(model, x, y, gameStage) {
    let pointsOnStage = 0,
        pointsOnTraps = 0,
        analyzedPts = getHeroAnalyzedPoints(model, x, y);
    /* Analyze each point */
    analyzedPts.forEach((pt, i) => {
        /* check whether hero on stage ignoring traps */
        if (gameStage.type === 'ellipse') {
            if (isInsideEllipse(pt.x, pt.y, gameStage.x, gameStage.y, gameStage.rx * stageScaleX, gameStage.ry * stageScaleY)) pointsOnStage += 1;
        }
        /* check whether hero on traps */
        gameStage.traps.forEach((trap, i) => {
            if (trap.type === 'ellipse') {
                if (isInsideEllipse(pt.x, pt.y, trap.x, trap.y, trap.rx * stageScaleX, trap.ry * stageScaleY)) pointsOnTraps += 1;
            }
        });
    });
    /* Subtract to check whether hero on stage considering traps */
    if (pointsOnStage > 0) pointsOnStage -= pointsOnTraps;
    return pointsOnStage;
} // fn checkHeroOnStage

function isInsideEllipse(x, y, h, k, rx, ry) {
    return (
        Math.pow(x - h, 2) / Math.pow(rx, 2) + Math.pow(y - k, 2) / Math.pow(ry, 2) <= 1
    );
} // fn isInsideEllipse

function getHeroAnalyzedPoints(model, x, y) {
    let w = model.get('attr').width * stageScaleX,
        th = model.get('attr').thickness * stageScaleY;
    return [
        { type: 'center', x: x, y: y }, // center
        { type: 'left', x: x - w / 2, y: y }, // left 
        { type: 'right', x: x + w / 2, y: y }, // right
        { type: 'top', x: x, y: y - th / 2 }, // top
        { type: 'bottom', x: x, y: y + th / 2 }, // bottom
    ];
} // fn getHeroAnalyzedPoints

function _checkHeroOnStage(heroes, offX, offY) {
    offX = offX || 0, offY = offY || 0;
    for (let h of heroes) {
        // let heroOnFloor = !h.get('actionState').jumping && h.get('transform').z === 0;
        // if (heroOnFloor) {
        // //console.debug('@ checkHeroFallingDown ' + h.id);
        // Determine number of pts out of five points heroes have got standing on the game stage
        switch (objectStandPoints(h.view, h.view.regX + offX, h.view.regY + offY, h.get('attr').width - 10, h.get('attr').thickness - 4, gameStage)) {
            case 5:
                h.setSelfState({ imbalance: 0 });
                break;
            case 4:
                h.setSelfState({ imbalance: 1 });
                break;
            case 3:
                h.setSelfState({ imbalance: 2 });
                break;
            case 2:
                h.setSelfState({ imbalance: 3 });
                break;
            case 1:
                h.setSelfState({ imbalance: 4 });
                break;
            case 0:
                h.setSelfState({ falled: true });
                break;
            default:
                break;
                // }
        }
        // console.log(h.get('selfState').falled);
    }

} // end fn checkHeroFallingDown

function _checkHeroOnTraps(heroes, traps, offX, offY) {
    offX = offX || 0, offY = offY || 0;
    for (let trap of traps) {
        for (let h of heroes) {
            // let heroOnFloor = !h.get('actionState').jumping && h.get('transform').z === 0;
            // if (heroOnFloor) {
            // //console.debug('@ checkHeroFallingDown ' + h.id);
            // Determine number of pts out of five points heroes have got standing on the game stage
            switch (objectStandPoints(h.view, h.view.regX + offX, h.view.regY + offY, h.get('attr').width - 10, h.get('attr').thickness - 4, trap)) {
                case 5:
                    h.setSelfState({ falled: true });
                    break;
                case 4:
                    h.setSelfState({ imbalance: 4 });
                    break;
                case 3:
                    h.setSelfState({ imbalance: 3 });
                    break;
                case 2:
                    h.setSelfState({ imbalance: 2 });
                    break;
                case 1:
                    h.setSelfState({ imbalance: 1 });
                    break;
                case 0:
                    break;
                default:
                    break;
                    // }
            }
            // console.log(h.get('selfState').falled);
        }
    }

} //end fn checkHeroOnTrap

function getRandomDirection() {
    switch (Math.ceil(Math.random() * 4)) {
        case 1:
            return { x: -1, y: 0, play: 'Leftward' };
        case 2:
            return { x: +1, y: 0, play: 'Rightward' };
        case 3:
            return { x: 0, y: -1, play: 'Backward' };
        case 4:
            return { x: 0, y: +1, play: 'Forward' };
        default:
            break;
    }
}; //end fn getRandomDirection

function getControlDir(e, angle, model) {
    let controlDir;
    if (e.type === 'pressmove' || e.type === 'pressup' || e.type === 'mousedown') {
        if (e.target.name === 'joystickR') {
            if (e.type === 'pressmove' || e.type == 'mousedown') {
                // store angel to transform
                controlAngle = angle;

                if (angle > 337.5 || angle <= 22.5) {
                    controlDir = 'Rightward';
                } else if (angle > 22.5 && angle <= 67.5) {
                    controlDir = 'Rightward';
                } else if (angle > 67.5 && angle <= 112.5) {
                    controlDir = 'Forward';
                } else if (angle > 112.5 && angle <= 157.5) {
                    controlDir = 'Leftward';
                } else if (angle > 157.5 && angle <= 202.5) {
                    controlDir = 'Leftward';
                } else if (angle > 202.5 && angle <= 247.5) {
                    controlDir = 'Leftward';
                } else if (angle > 247.5 && angle <= 292.5) {
                    controlDir = 'Backward';
                } else if (angle > 292.5 && angle <= 337.5) {
                    controlDir = 'Rightward';
                }
            }
            if (e.type === 'pressup') {
                // e.keyCode = null;
                // resetDirKey();
                controlDir = null;
                controlAngle = null;
                controlIntensity = 1;
            }
            // console.debug('controlAngle set: ' + controlAngle + ' controlDir set: ' + controlDir);
        }
    }
    if (e.type === 'keyup' || e.type === 'keydown' || e.type === 'mousedown') {
        if (e.type === 'keydown') {
            controlDir = null;
            if (keyMap[KEYCODE.ARROWUP]) {
                controlDir = 'Backward';
            }
            if (keyMap[KEYCODE.ARROWDOWN]) {
                controlDir = 'Forward';
            }
            if (keyMap[KEYCODE.ARROWLEFT]) {
                controlDir = 'Leftward';
            }
            if (keyMap[KEYCODE.ARROWRIGHT]) {
                controlDir = 'Rightward';
            }
        }
        if (e.type === 'keyup') {
            controlDir = null;
            controlIntensity = 1;
        }
    }
    return controlDir;
    // up right
} // end fn getJoystickDir

function setKeyByVirtualInput(e, model, angle) {
    if (e.target.type === 'actionButton') {
        if (e.type === 'mousedown') {
            if (e.target.name === 'actionButtonW') {
                e.keyCode = KEYCODE.W;
                keyMap[KEYCODE.W] = true;
                resetModKey(KEYCODE.W);
            }
            if (e.target.name === 'actionButtonA') {
                if ((model.get('liveAttr').sta >= HERO_RUN_BASE_COST * 10)) {
                    e.keyCode = KEYCODE.A;
                    keyMap[KEYCODE.A] = true;
                    resetModKey(KEYCODE.A);
                }
            }
            if (e.target.name === 'actionButtonS') {
                e.keyCode = KEYCODE.S;
                keyMap[KEYCODE.S] = true;
                resetModKey(KEYCODE.S);
            }
            if (e.target.name === 'actionButtonD') {
                e.keyCode = KEYCODE.D;
                keyMap[KEYCODE.D] = true;
                resetModKey(KEYCODE.D);
            }
        }
        if (e.type === 'pressup') {
            keyMap[KEYCODE.D] = keyMap[KEYCODE.S] = keyMap[KEYCODE.A] = keyMap[KEYCODE.W] = false;
            e.keyCode = null;
            resetModKey();
        }
    }
    if (e.target.name === 'joystickL') {
        if (e.type === 'pressmove' || e.type === 'mousedown') {
            if (angle > 275 || angle <= 15) {
                e.keyCode = KEYCODE.D;
                keyMap[KEYCODE.D] = true;
                resetModKey(KEYCODE.D);

            } else if (angle > 15 && angle <= 75) {
                e.keyCode = KEYCODE.S;
                keyMap[KEYCODE.S] = true;
                resetModKey(KEYCODE.S);

            } else if (angle > 75 && angle <= 175) {

                if ((model.get('liveAttr').sta >= HERO_RUN_BASE_COST * 10)) {
                    e.keyCode = KEYCODE.A;
                    keyMap[KEYCODE.A] = true;
                    resetModKey(KEYCODE.A);
                }

            } else if (angle > 175 && angle <= 275) {
                e.keyCode = KEYCODE.W;
                keyMap[KEYCODE.W] = true;
                resetModKey(KEYCODE.W);

            } else {
                keyMap[KEYCODE.D] = keyMap[KEYCODE.S] = keyMap[KEYCODE.A] = keyMap[KEYCODE.W] = false;
                e.keyCode = null;
                resetModKey();
            }
        }
        if (e.type === 'pressup') {
            e.keyCode = null;
            resetModKey();
        }
    }
} // end fn setKeyByVirtualInput

function getControlIntensity(e, range, dist) {
    let controlIntensity;
    if (e.type === 'pressmove' || e.type === 'pressup' || e.type === 'mousedown') {
        if (dist < range / 3) controlIntensity = 1;
        else if (dist < range * 2 / 3) controlIntensity = 2;
        else { controlIntensity = 3; }
    }
    if (e.type === 'keyup' || e.type === 'keydown') {
        controlIntensity = 3;
    }
    return controlIntensity
} // end fn setControlIntensity

function resetDirKey(except) {

    except = except || null;

    keyMap[KEYCODE.ARROWRIGHT] = (KEYCODE.ARROWRIGHT != except) ? false : keyMap[except];
    keyMap[KEYCODE.ARROWDOWN] = (KEYCODE.ARROWDOWN != except) ? false : keyMap[except];
    keyMap[KEYCODE.ARROWLEFT] = (KEYCODE.ARROWLEFT != except) ? false : keyMap[except];
    keyMap[KEYCODE.ARROWUP] = (KEYCODE.ARROWUP != except) ? false : keyMap[except];
} //end fn resetKeyMap

function resetModKey(except) {

    except = except || null;

    keyMap[KEYCODE.D] = (KEYCODE.D != except) ? false : keyMap[except];
    keyMap[KEYCODE.S] = (KEYCODE.S != except) ? false : keyMap[except];
    keyMap[KEYCODE.A] = (KEYCODE.A != except) ? false : keyMap[except];
    keyMap[KEYCODE.W] = (KEYCODE.W != except) ? false : keyMap[except];
} //end fn resetModKey

function resetModelState(model, except) {

    except = except || null;
    model.setActionState({
        standing: (except == 'standing') ? true : false,
        walking: (except == 'walking') ? true : false,
        running: (except == 'running') ? true : false,
        jumping: (except == 'jumping') ? true : false,
        dashing: (except == 'dashing') ? true : false,
    });
} // end fn resetModelState

function controlHeroesMovement(heroModels, objectModels) {

    for (let thisModel of heroModels) {
        let numCollision = 0;
        // Check collision between heroes
        for (let thatModel of heroModels) {
            if (thatModel !== thisModel) {
                if (heroesCollide(thisModel, thatModel, thisModel.get('nextAction').offX, thisModel.get('nextAction').offY, thatModel.get('nextAction').offX, thatModel.get('nextAction').offY)) {
                    numCollision++;
                    // console.debug(thisModel.id + ' -> ' + thisModel.get('nextAction').action);
                    // console.debug(thatModel.id + ' -> ' + thatModel.get('nextAction').action);
                    thisModel.setCollision({
                        collided: true,
                        collideTarget: thatModel
                    });
                    thatModel.setCollision({
                        collided: true,
                        collideTarget: thisModel
                    });
                    determineSuperior(thisModel, thatModel);
                }
            }
        }
        // Invoke hero move fn if no collision
        // if (numCollision === 0) {
        handleHeroMove(thisModel);
        // } else {
        //     // if collision (for continuousAction)
        //     console.log('!!!collided!!!');
        // }
    }
} // end fn controlHeroesMovement

function _handleHeroMove(model) {
    var action = model.get('nextAction').action,
        offX = model.get('nextAction').offX,
        offY = model.get('nextAction').offY,
        offZ = model.get('nextAction').offZ,
        x = model.get('transform').x,
        y = model.get('transform').y,
        z = model.get('transform').z;
    // hero walk or run
    // if (action === 'walk' || action === 'run') {
    model.setTransform({ x: x + offX, y: y + offY, z: z + offZ });
    let forceX, forceY;
    if (action === 'walk' || action === 'run') {
        forceX = offX;
        forceY = offY;
    }
    if (action === 'jump' || action === 'dash') {
        forceX = model.get('collision').forceX + offX;
        forceY = model.get('collision').forceY + offY;
    }
    model.setCollision({
        forceX: forceX,
        forceY: forceY
    });
    // if (action == 'jump') console.log(model.get('transform'));
    // }
} // end fn handleHeroMove

function getVelocityByAction(action) {
    if (action.name === 'dash') return HERO_DASH_OFFSET;
    if (action.name === 'jump') return HERO_JUMP_OFFSET;
    if (action.name === 'run') return HERO_RUN_OFFSET;
}

function getCostByAction(model, action) {
    if (action.name === 'jump') return HERO_JUMP_COST;
    if (action.name === 'run') return HERO_RUN_BASE_COST * action.intensity;
    if (action.name === 'dash') return model.get('attr').cost;
    if (action.name === 'walk' || action.name === 'stand' || action.name === 'slip') return 0;
} // end fn getCostByAction

function reduceCostByAction(model, action) {
    // console.debug(model.id + ' ' + action.name);
    let currSta = model.get('liveAttr').sta;
    if (action.name === 'dash') model.setLiveAttr({ sta: currSta - model.get('attr').cost / HERO_DASH_COUNT });
    if (action.name === 'jump') model.setLiveAttr({ sta: currSta - HERO_JUMP_COST / HERO_JUMP_COUNT });
    if (action.name === 'run') {
        // if (countTickToSec % (FPS / 30) === 0)
        model.setLiveAttr({ sta: currSta - HERO_RUN_BASE_COST * action.intensity });
    }
    if (!action.name) console.error('ERROR! action name undefined ' + model.id + ' ' + action.name);
} // end fn reduceCostByAction

function incrementSkillByAction(model, action) {
    let currSkill = model.get('liveAttr').skill;
    let dist = Math.sqrt(Math.pow(action.transform.x, 2) + Math.pow(action.transform.y, 2));
    if (currSkill < HERO_MAX_SKILL) {
        if (action.name === 'dash') model.setLiveAttr({ skill: currSkill + (model.get('collision').collided ? 0.10 : 0.03) });
        if (action.name === 'jump') model.setLiveAttr({ skill: currSkill + (model.get('collision').collided ? 0.05 : 0.003) });
        if (action.name === 'slip') model.setLiveAttr({ skill: currSkill + 0.001 });
        if (action.name === 'run') {
            if (countTickToSec % (FPS / 30) === 0)
                model.setLiveAttr({ skill: currSkill + (model.get('collision').collided ? 0.05 : 0.005) });
        }
        if (action.name === 'walk') {
            if (countTickToSec % (FPS / 30) === 0)
                model.setLiveAttr({ skill: currSkill + (model.get('collision').collided ? 0.03 : 0) });
        }
        if (!action.name) console.error('ERROR! action name undefined');
    }
} // end incrementSkillByAction

function getXbyDeg(deg) {
    return (deg) ? Math.cos(deg * Math.PI / 180) : 0;
} // end fn getXbyDeg

function getYbyDeg(deg) {
    return (deg) ? Math.sin(deg * Math.PI / 180) : 0;
} // end fn getYbyDeg

function getOffsetByDir(dir) {
    let offset = { x: 0, y: 0 };
    if (dir === 'Forward') offset.y = +1;
    if (dir === 'Backward') offset.y = -1;
    if (dir === 'Leftward') offset.x = -1;
    if (dir === 'Rightward') offset.x = +1;
    return offset;
} // end fn getOffsetByDir

function getDirByOffset(offX, offY) {
    let deg = Math.acos(offX / Math.sqrt(Math.pow(offX, 2) + Math.pow(offY, 2))) * 180 / Math.PI || 0;
    let dir;

    if (offY < 0) deg = 360 - deg;

    if (deg > 337.5 || deg <= 22.5) {
        dir = 'Rightward';
    } else if (deg > 22.5 && deg <= 67.5) {
        dir = 'Rightward';
    } else if (deg > 67.5 && deg <= 112.5) {
        dir = 'Forward';
    } else if (deg > 112.5 && deg <= 157.5) {
        dir = 'Leftward';
    } else if (deg > 157.5 && deg <= 202.5) {
        dir = 'Leftward';
    } else if (deg > 202.5 && deg <= 247.5) {
        dir = 'Leftward';
    } else if (deg > 247.5 && deg <= 292.5) {
        dir = 'Backward';
    } else if (deg > 292.5 && deg <= 337.5) {
        dir = 'Rightward';
    }
    return dir;
} // end fn getDirByOffset

// function mouseHandler(e, data) {
//     // console.log(e.type + ' ' + e.target + ' ' + e.stageX + ' ' + e.stageY);
//     // console.log(data.ticker.getTicks());
//     getActionOnInput(e, data.model.view, data.model);
// }; // end fn mouseHandler

function getOffsetByAnim(model, v, action) {
    let offX = 0,
        offY = 0;
    if (model.view.currentAnimation == action + 'Backward') {
        offY = -v * LAND_SCALE;
    }
    if (model.view.currentAnimation == action + 'Forward') {
        offY = +v * LAND_SCALE;
    }
    if (model.view.currentAnimation == action + 'Leftward') {
        offX = -v;
    }
    if (model.view.currentAnimation == action + 'Rightward') {
        offX = +v;
    }
    return { offX: offX, offY: offY };
} // end fn determineOffByAnim

function findNthCamelCase(str, n) {
    n = n || 1;
    var count = 0,
        buf = '',
        found = false;
    for (var i in str) {
        if (isUpperCase(str[i])) count++;
        if (count == n) found = true;
        if (found) buf += str[i];
    }
    return buf !== '' ? buf : false;
} // end fn findNextCamelCase

function isUpperCase(char) {
    if (char.toUpperCase() === char) return true;
} // end fn isUppercase

function getNextTransform(model) {
    // let action = model.shiftAction();
    if (model.actionStack.length > 0) {
        let action = model.actionStack.shift();
        if (action) {
            action.transform.x *= action.intensity;
            action.transform.y *= action.intensity;
            action.transform.z *= action.intensity;

            if (action.type === 'action') {
                return action;
            }
            if (action.type === 'consecutiveActions') {
                let action = action.actions.pop();
                model.pushActions(action);
                return action;
            }
        }
    }
} // end fn getNextTransform

function isMoveControl(strict) {
    let isKeyMove = keyMap[KEYCODE.ARROWDOWN] || keyMap[KEYCODE.ARROWUP] || keyMap[KEYCODE.ARROWLEFT] || keyMap[KEYCODE.ARROWRIGHT],
        isPressMove = controlDir !== null || controlAngle !== null,
        isStrictPressMove = controlDir !== null && controlAngle !== null,
        isMove = isKeyMove || isPressMove,
        isStrictMove = isKeyMove || isStrictPressMove;
    if (strict) return isStrictMove;
    else return isMove;
} // end fn isMoveControl

function isKeyMoveControl() {
    return keyMap[KEYCODE.ARROWDOWN] || keyMap[KEYCODE.ARROWUP] || keyMap[KEYCODE.ARROWLEFT] || keyMap[KEYCODE.ARROWRIGHT];
}

function canMove(model) {
    let isBlock = model.get('actionControl').block,
        isFaint = model.get('selfState').faint > 0 || model.get('selfState').faint !== 0,
        isCollided = model.get('collision').collided,
        isGameEnded = gameEnded;
    if (!isBlock && !isFaint && !isCollided && !isGameEnded) return true;
    else return false;
}

function canDash(model) {
    let haveDashCost = model.get('liveAttr').sta >= model.get('attr').cost,
        dashCooledDown = model.get('actionControl').dashCD === 0 && !model.get('dashing');
    if (haveDashCost && dashCooledDown) return true;
    else return false;
}

function canJump(model) {
    let haveJumpCost = model.get('liveAttr').sta >= HERO_JUMP_COST,
        jumpCooledDown = model.get('actionControl').jumpCD === 0 && !model.get('jumping'),
        onGround = model.get('transform').z === 0;
    if (haveJumpCost && jumpCooledDown && onGround) return true;
    else return false;
}

function canRun(model) {
    let haveRunCost = model.get('liveAttr').sta >= HERO_RUN_BASE_COST * 10;
    if (haveRunCost) return true;
    else return false;
}

function getDashAction(transform, dir, name) {
    if (!transform) { console.error('A transform object needed'); return; }

    let action = new ConsecutiveActions('dash', [], true, true, false, true);
    transform.x *= HERO_DASH_OFFSET;
    transform.y *= HERO_DASH_OFFSET;
    for (var i = 1; i <= HERO_DASH_COUNT; i++) {
        action.actions.push(
            new Action(name || 'dash', dir || 3, new Transform(transform.x, transform.y, transform.z), 3, true, true, new TransformFactor(-0.6 * i / HERO_DASH_COUNT, -0.6 * i / HERO_DASH_COUNT, 0))
        );
        // console.debug(action.actions[action.actions.length - 1]);
    }
    return action;
} // end fn getDashAction

function getJumpAction(transform, dir, intensity, isMove, count, offset, zFunction, transformFactor, name) {
    if (!transform) { console.error('A transform object needed'); return; }

    let action = new ConsecutiveActions('jump', [], true, true, false, true);

    // console.debug('isMove: ' + isMove);
    // console.debug(transform);
    transform.x *= (isMove) ? offset || HERO_JUMP_OFFSET : 0;
    transform.y *= (isMove) ? offset || HERO_JUMP_OFFSET : 0;
    // console.debug(transform);
    for (var i = 1; i <= (count || HERO_JUMP_COUNT); i++) {
        transform.z = zFunction ? zFunction[0](i, zFunction[1]) : computeJumpPosition(i);
        action.actions.push(
            new Action(name || 'jump', dir || 'Forward', new Transform(transform.x, transform.y, transform.z), intensity || 3, true, true, transformFactor || new TransformFactor(-0.4 * i / HERO_JUMP_COUNT, -0.4 * i / HERO_JUMP_COUNT, 0))
        );
    }
    return action;
} // end fn getJumpAction

function getRunAction(transform, dir, intensity, name) {
    if (!transform) { console.error('A transform object needed'); return; }

    let action = new Action(name || 'run', dir || 'Forward', transform, intensity || 3);
    action.transform.x *= HERO_RUN_OFFSET;
    action.transform.y *= HERO_RUN_OFFSET;
    return action;
} // end fn getRunAction

function getWalkAction(transform, dir, intensity, name) {
    if (!transform) { console.error('A transform object needed'); return; }

    let action = new Action(name || 'walk', dir || 'Forward', transform, intensity || 3);
    action.transform.x *= HERO_WALK_OFFSET;
    action.transform.y *= HERO_WALK_OFFSET;
    return action;
} // end fn getWalkAction

function getRelativeRandomPair(Max) {
    randA = (Max * Math.random());
    randB = (Max - randA);
    return { a: randA, b: randB }
} // end fn getRelativeRandomPair

function setActionTransform(actions, transforms) {
    if (!Array.isArray(actions)) var actions = [actions];
    if (!Array.isArray(transforms)) var transform = [transforms];

    actions.forEach((action, i) => {
        if (!action instanceof Action) { console.error('Not an Action'); return; }
        if (!transforms[i] instanceof Transform) { console.error('Not a Transform'); return; }
        action.transform.x = transforms[i].x;
        action.transform.y = transforms[i].y;
        action.transform.z = transforms[i].z;
    });
} // end fn replaceActionTransform

function modifyActionTransform(actions, transformFactors) {
    if (!Array.isArray(actions)) var actions = [actions];
    if (!Array.isArray(transformFactors)) var transformFactors = [transformFactors];

    actions.forEach((action, i) => {
        if (!action instanceof Action) { console.error('Not an Action'); return; }
        if (!transformFactors[i] instanceof TransformFactor) { console.error('Not a Transform'); return; }
        action.transform.x *= transformFactors[i].x;
        action.transform.y *= transformFactors[i].y;
        action.transform.z *= transformFactors[i].z;
    });
} // end fn actionTransform

function clearActionStack(models) {
    if (!Array.isArray(models)) var models = [models];

    models.forEach((model) => {
        if (!model instanceof Playable) { console.error('Not a Playable'); return; }
        model.clearActionStack();
    })
} //end fn clearHeroActionStack

function unshiftAction(models, actions) {
    if (!Array.isArray(models)) var models = [models];
    if (!Array.isArray(actions)) var actions = [actions];

    models.forEach((model, i) => {
        if (!model instanceof Playable) { console.error('Not a Playable'); return; }
        if (!actions[i] instanceof Action && !action[i] instanceof ConsecutiveActions) { console.error('Not an Action or ConsecutiveActions'); return; }
        model.unshiftAction(actions[i]);
    })
} // end fn unshiftHeroAction

function getHeroesOverlapPoints(a, b) {
    let distX = a.get('transform').x - b.get('transform').x,
        distY = a.get('transform').y - b.get('transform').y,
        aX = a.get('transform').x,
        aY = a.get('transform').y,
        bX = b.get('transform').x,
        bY = b.get('transform').y;

    if (distX > 0) {
        aX = aX - a.get('attr').width / 2;
        bX = bX + b.get('attr').width / 2;
    }
    if (distX < 0) {
        aX = aX + a.get('attr').width / 2;
        bX = bX - b.get('attr').width / 2;
    }
    if (distY > 0) {
        aY = aY - a.get('attr').thickness / 2;
        bY = bY + b.get('attr').thickness / 2;
    }
    if (distY < 0) {
        aY = aY + a.get('attr').thickness / 2;
        bY = bY - b.get('attr').thickness / 2;
    }
    return {
        a: { x: aX, y: aY },
        b: { x: bX, y: bY }
    }
} // end fn getHeroesOverlapPoints

function setActionAttributes(actions, attrs) {
    if (!Array.isArray(actions)) var actions = [actions];
    if (!Array.isArray(attrs)) var attrs = [attrs];

    actions.forEach((action, i) => {
        if (!action instanceof Action && !action instanceof ConsecutiveActions) { console.error('Not an Action or ConsecutiveActions'); return; }
        if (typeof attrs[i] !== 'object') { console.error('Not an attr object'); return; }

        if (attrs[i].name) action.name = attrs[i].name;
        if (attrs[i].block !== undefined && attrs[i].block !== null) action.block = attrs[i].block;
        if (attrs[i].rebounce !== undefined && attrs[i].rebounce !== null) action.rebounce = attrs[i].rebounce;
        if (attrs[i].disturbed !== undefined && attrs[i].disturbed !== null) action.disturbed = attrs[i].disturbed;

        if (action.type === 'action') {
            if (attrs[i].dir) action.dir = attrs[i].dir;
            if (attrs[i].play) action.play = attrs[i].play;
            if (attrs[i].transform) action.transform = attrs[i].transform;
            if (attrs[i].intensity) action.intensity = attrs[i].intensity;
            if (attrs[i].rebounceFactor) action.rebounceFactor = attrs[i].rebounceFactor;
        }
        if (action.type === 'consecutiveActions') {
            if (attrs[i].actions) action.actions = attrs[i].actions;
            if (attrs[i].nextIsNull !== undefined && attrs[i].nextIsNull !== null) action.nextIsNull = attrs[i].nextIsNull;
        }
    });
} // end fn setActionAttributes

function heroOverlaps(a, b) {
    // console.debug(a.get('transform').x - b.get('transform').x);
    return (Math.abs(a.get('transform').x - b.get('transform').x) < b.get('attr').width / 2) && (Math.abs(a.get('transform').y - b.get('transform').y) < b.get('attr').thickness / 2);
} //end fn heroOverlaps

function getEvenDashResponse(a, b, actA, actB) {
    let newActA = a.get('lastAction'),
        newActB = b.get('lastAction');

    initEvenSlipConsecutiveActions(newActA, newActB, actA, actB);
    modifyEvenSlipActionStack(newActA, newActB, actA, actB);

    return { newActA: newActA, newActB: newActB }
} // end fn getEvenDashResponse

function getEvenJumpResponse(a, b, actA, actB) {
    let newActA = a.get('lastAction'),
        newActB = b.get('lastAction');
    initEvenSlipConsecutiveActions(newActA, newActB, actA, actB);

    let aZ = Math.abs(a.get('transform').z),
        bZ = Math.abs(b.get('transform').z),
        aHeight = a.get('attr').height,
        bHeight = b.get('attr').height;

    modifyEvenSlipActionStack(newActA, newActB, actA, actB);

    if (aZ >= bHeight + bZ && heroOverlaps(a, b)) {
        console.debug('A on B\'s head');

        newActA = getJumpAction(new Transform(-actA.transform.x, -actA.transform.y, 0), actA.dir, actA.intensity, true, HERO_JUMP_COUNT - 40, 1, [computeJumpPosition2, bHeight]);

        if (b.get('selfState').faint === 0) b.setSelfState({ faint: 2.5 });
    } else
    if (bZ >= aHeight + aZ && heroOverlaps(b, a)) {
        console.debug('B on A\'s head');

        newActB = getJumpAction(new Transform(-actB.transform.x, -actB.transform.y, 0), actB.dir, actB.intensity, true, HERO_JUMP_COUNT - 40, 1, [computeJumpPosition2, aHeight]);

        if (a.get('selfState').faint === 0) a.setSelfState({ faint: 2.5 });
    }

    return { newActA: newActA, newActB: newActB }
} // end fn getEvenJumpResponse

function getUnevenDashResponse(a, b, actA, actB) {
    let newActB = new ConsecutiveActions('slip', [], true, true, false, false);
    let transformZ = 0,
        actLength = 0;

    /* B hit and pushed */
    if (a.get('actionStack')[0] instanceof ConsecutiveActions) {
        actLength = a.get('actionStack')[0].actions.length;
    } else if (a.get('lastAction') instanceof ConsecutiveActions) {
        actLength = a.get('lastAction').actions.length;
    }
    let slipCount = HERO_DASH_SLIP_COUNT * (HERO_DASH_COUNT - actLength) / HERO_DASH_COUNT;

    if (b.get('transform').z !== 0) transformZ = Math.abs(b.get('transform').z) / slipCount;

    for (var i = 1; i <= slipCount; i++) {
        newActB.actions.push(
            new Action('slip', actA.dir, new Transform(actA.transform.x * 1.2, actA.transform.y * 1.2, transformZ), actA.intensity,
                true, true, new TransformFactor(actA.rebounceFactor.x, actA.rebounceFactor.y, 0))
        );
    }

    /* A Bounce back */
    let newActA = a.get('lastAction');
    newActA.name = 'slip';
    newActA.play = newActA.name + newActA.dir;
    newActA.disturbed = true;
    newActA.block = true;

    newActA.actions.forEach((act, i, arr) => {
        act.name = 'slip';
        act.play = act.name + act.dir;
        act.transform.x *= act.rebounceFactor.x;
        act.transform.y *= act.rebounceFactor.y;
        act.disturbed = true;
        act.block = true;
        // console.debug(act);
    });
    return { newActA: newActA, newActB: newActB };
} // end fn getUnevenDashResponse

function getUnevenJumpResponse(a, b, actA, actB) {
    let newActB = new ConsecutiveActions('slip', [], true, true, false, false);
    let transformZ = 0;

    /* B hit and pushed */
    let slipCount = HERO_JUMP_SLIP_COUNT;

    if (b.get('transform').z !== 0) transformZ = Math.abs(b.get('transform').z) / slipCount;

    for (var i = 1; i <= slipCount; i++) {
        newActB.actions.push(
            new Action('slip', actA.dir, new Transform(actA.transform.x * 1.6, actA.transform.y * 1.6, transformZ), actA.intensity,
                true, true, new TransformFactor(actA.rebounceFactor.x, actA.rebounceFactor.y, 0))
        );
    }
    /* A Bounce back */
    let newActA = a.get('lastAction');
    newActA.name = 'jump';
    newActA.play = newActA.name + newActA.dir;
    newActA.disturbed = true;
    newActA.block = true;

    let aZ = Math.abs(a.get('transform').z),
        bZ = Math.abs(b.get('transform').z),
        bHeight = b.get('attr').height,
        newX = -actA.transform.x,
        newY = -actA.transform.y;
    /* Prevent Keeping Vertical Jumping */
    if (newX <= 0.01 && newY <= 0.01) {
        newX = (Math.random() >= 0.5) ? -0.15 : 0.15;
        newY = (Math.random() >= 0.5) ? -0.15 : 0.15;
    }
    if (actA.name === 'jump' && aZ >= bHeight + bZ) {
        newActA = getJumpAction(new Transform(newX, newY, 0), actA.dir, actA.intensity, true, HERO_JUMP_COUNT - 40, 1, [computeJumpPosition2, bHeight]);

        if (b.get('selfState').faint === 0) b.setSelfState({ faint: 2.5 });
    } else {
        newActA.actions.forEach((act, i, arr) => {
            act.name = 'jump';
            act.play = act.name + act.dir;
            act.transform.x *= act.rebounceFactor.x;
            act.transform.y *= act.rebounceFactor.y;
            act.disturbed = true;
            act.block = true;
            // console.debug(act);
        });
    }
    return { newActA: newActA, newActB: newActB };
} // end fn getUnevenJumpResponse

function computeConsecutiveActionsTransform(action) {
    let cumulativeTrans = new Transform();
    action.actions.forEach((act, i) => {
        cumulativeTrans.x += act.transform.x * act.intensity;
        cumulativeTrans.y += act.transform.y * act.intensity;
        cumulativeTrans.z += act.transform.z * act.intensity;
    });
    return cumulativeTrans;
} // end fn computeActionTransform