function testCPUWalkLeftNonStop(cpu) {
    let enabled = false;
    // enabled = true;
    if (enabled) {
        let cpuCtrlIntensity = 3 * Math.random();
        // Test: cpu keeps walking leftward
        if (canMove(cpu)) {
            cpu.setNextAction(getWalkAction(new Transform(-1, 0, 0), 'Leftward', 3));
        } else { cpu.setNextAction(new Action()); }
    }
} // fn testCPUWalkLeftNonStop

function testCPURunLeftNonStop(cpu) {
    let enabled = false;
    // enabled = true;
    if (enabled) {
        let cpuCtrlIntensity = 3 * Math.random();
        // Test: cpu keeps running leftward
        if (canMove(cpu) && canRun(cpu)) {
            cpu.setNextAction(new Action(
                'run', 'Leftward', new Transform(-1 * HERO_RUN_OFFSET, 0, 0), 3
            ));
        } else { cpu.setNextAction(new Action()); };
    }
} // fn testCPURunLeftNonStop

function testCPUDashLeftNonStop(cpu) {
    let enabled = false;
    // enabled = true;
    if (enabled) {
        let cpuCtrlIntensity = 3 * Math.random();
        // Test: cpu keeps dashing leftward
        if (canMove(cpu) && canDash(cpu)) {
            // setTimeout(() => {
            var action = new ConsecutiveActions('dash', [], true, true, false, true);
            var transform = new Transform();
            transform.x = -1 * HERO_DASH_OFFSET;
            for (var i = 1; i <= HERO_DASH_COUNT; i++) {
                action.actions.push(
                    new Action('dash', 'Leftward', new Transform(transform.x, transform.y, transform.z), 3,
                        true, true, new TransformFactor(-0.6 * i / HERO_DASH_COUNT, -0.6 * i / HERO_DASH_COUNT, 0))
                );
                // console.debug(action.actions[action.actions.length - 1]);
            }
            cpu.setNextAction(action);
            // console.debug(cpu.get('lastAction'));
            // }, 2000);
        } else {
            cpu.setNextAction(new Action());
        }
    }
} // fn testCPUDashLeftNonStop

function testCPUJumpLeftNonStop(cpu) {
    let enabled = false;
    // enabled = true;
    if (enabled) {
        let cpuCtrlIntensity = 3 * Math.random();
        // Test: cpu keeps jumping leftward
        setTimeout(() => {
            if (canMove(cpu) && canJump(cpu)) {

                var action = new ConsecutiveActions('jump', [], true, true, false, true);
                var transform = new Transform();
                transform.x = -HERO_JUMP_OFFSET;
                transform.y = 0;
                for (var i = 1; i <= HERO_JUMP_COUNT; i++) {
                    transform.z = computeJumpPosition(i);
                    action.actions.push(
                        new Action('jump', 'Leftward', new Transform(transform.x, transform.y, transform.z), 3,
                            true, true, new TransformFactor(-0.4 * i / HERO_JUMP_COUNT, -0.4 * i / HERO_JUMP_COUNT, 0))
                    );
                }
                cpu.setNextAction(action);

            } else {
                cpu.setNextAction(new Action());
            }
        }, 2000);
    }
} // fn testCPUJumpLeftNonStop

function getCPUTransformByChasing(cpu, player, offset, intensity, errorRate) {
    let bestTrans = new Transform();
    let bestPos = new Transform(),
        bestDist;
    let cpuPos = cpu.get('transform');
    let playerPos = player.get('transform');
    let varyFactor = 0.5;
    let ascending = (Math.random() > 0.5) ? true : false;
    errorRate = Math.random() * (errorRate || 1);

    /* Find the best transform offset by angles */
    for (var i = (ascending) ? 0 : MAX_CONTROL_ANGLES;
        (ascending) ? i < MAX_CONTROL_ANGLES : i > 0;
        (ascending) ? i++ : i--) {
        let newTrans = new Transform(getXbyDeg(i * 360 / MAX_CONTROL_ANGLES), getYbyDeg(i * 360 / MAX_CONTROL_ANGLES), 0);

        bestPos = new Transform(cpuPos.x + bestTrans.x, cpuPos.y + bestTrans.y, 0);
        bestDist = computeDistance(playerPos.x, playerPos.y, bestPos.x, bestPos.y);

        // newTrans.x *= offset * intensity + (newTrans.x > 0 ? 1 : -1) * varyFactor * errorRate;
        // newTrans.y *= offset * intensity + (newTrans.y > 0 ? 1 : -1) * varyFactor * errorRate;

        let newPos = new Transform(cpuPos.x + newTrans.x, cpuPos.y + newTrans.y, 0);
        let newDist = computeDistance(playerPos.x, playerPos.y, newPos.x, newPos.y);

        let analyzedPt = {
            x: (cpuPos.x + newTrans.x * 150) * stageScaleX,
            y: (cpuPos.y + newTrans.y * 150) * stageScaleY * LAND_SCALE
        }
        let onStage = getHeroPointsOnStage(cpu, analyzedPt.x, analyzedPt.y, gameStage) >= 5;
        // console.debug('cpuPos: ' + cpuPos.x + ', ' + cpuPos.y);
        // console.debug('newTrans: ' + newTrans.x + ', ' + newTrans.y);
        // console.debug('newPos: ' + newPos.x + ', ' + newPos.y);
        // console.debug('analyzed: ' + analyzedPt.x + ', ' + analyzedPt.y + ' ' + onStage);
        // console.debug('scale: ' + stageScaleX + ', ' + stageScaleY);
        if (newDist < bestDist && onStage) {
            bestTrans = newTrans;
            bestPos = newPos;
            bestDist = newDist;
        }
        // console.debug(newDist + ' ' + bestDist + ' ' + onStage);
    }
    return {
        bestPos: bestPos,
        bestTrans: bestTrans,
        bestDist: bestDist,
    }
} // fn getCPUTransformByChasing

function CPUSearchMove(cpu, player) {
    let enabled = false;
    let nextAction = new Action();
    let cpuPos = cpu.get('transform');
    let playerPos = player.get('transform');

    enabled = true;

    if (enabled) {
        let intensity = Math.ceil(Math.random() * 1 + 2);
        if (canMove(cpu)) {
            /* Compute for next dash */
            let chasedObj = getCPUTransformByChasing(cpu, player, HERO_WALK_OFFSET, intensity, 0.8);
            let bestTrans = chasedObj.bestTrans;
            let bestDist = chasedObj.bestDist;

            // console.debug(cpu.get('transform'));

            let dashTrans = computeConsecutiveActionsTransform(
                getDashAction(Object.assign(new Transform(), bestTrans), getDirByOffset(bestTrans.x, bestTrans.y))
            );
            let dashPos = new Transform(cpuPos.x + dashTrans.x, cpuPos.y + dashTrans.y);
            let dashDist = computeDistance(cpuPos.x, cpuPos.y, dashPos.x, dashPos.y);
            let dashPosOnStage = getHeroPointsOnStage(cpu, dashPos.x * stageScaleX, dashPos.y * stageScaleY * LAND_SCALE, gameStage) === 5;

            // console.log(dashTrans);
            // console.log(dashPos);
            // console.log(dashDist + ' ' + bestDist);
            // console.log(dashPosOnStage);


            if (canDash(cpu) && bestDist < dashDist && dashPosOnStage) {
                console.debug('# dashing');
                nextAction = getDashAction(bestTrans, getDirByOffset(bestTrans.x, bestTrans.y));
            } else
            /* Set next action */
            // if (canRun(cpu)) {
            // nextAction = getRunAction(bestTrans, getDirByOffset(bestTrans.x, bestTrans.y), intensity);
            // } else
            {
                console.info('# walking');
                /* compute for next walk */
                let chasedObj = getCPUTransformByChasing(cpu, player, HERO_WALK_OFFSET, intensity, 0.9);
                let bestTrans = chasedObj.bestTrans;
                let bestDist = chasedObj.bestDist;

                nextAction = getWalkAction(bestTrans, getDirByOffset(bestTrans.x, bestTrans.y), intensity);
            }

            cpu.setNextAction(nextAction);

        } else { cpu.setNextAction(new Action()); }
    } // end if (enabled) 
} // fn CPUSearchMove