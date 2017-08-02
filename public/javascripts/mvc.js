/* ===============  CLIENT-SIDE ================= */

/* @ Singleton */
function getHeroModel() {

    let HeroModel = Backbone.Model.extend({
        default: {
            id: null,
            attr: {},
            view: {}
        },
        initialize: function() {
            console.log('@ Hero model init');
        }
    });
    return HeroModel;

} // end fn getHeroModel

/* @ Singleton */
function getHeroCollection(model) {

    let HeroCollection = Backbone.Collection.extend({
        model: model,
        url: 'chestheroes_heroes',
        onAdd: (model) => {
            console.log('@ Hero model: ' + model.get('id') + ' added to hero collection');
            // console.debug('spritesheet src: ' + model.get('view').spriteSheetParams.src);

            /* Push src into filelist */
            fileList.push({ id: model.get('id'), src: model.get('view').spriteSheetParams.src });
        },
        initialize: function(models, options) {

            _.bindAll(this, 'onAdd');
            this.on('add', this.onAdd, this); // triggered when fetching

        }
    });
    return new HeroCollection;

} // end fn getHeroCollection

/* =========== ============= HERO Playable MODEL ============= ============= */

function initHeroPlayableModel() {

    Playable = Backbone.Model.extend({
        default: {},
        setTransform: function(transform) {
            this.set({
                transform: {
                    x: ((!isNaN(transform.x)) ? transform.x : this.get('transform').x),
                    y: ((!isNaN(transform.y)) ? transform.y : this.get('transform').y),
                    z: (!isNaN(transform.z)) ? transform.z : this.get('transform').z
                }
            });
        },
        setLiveAttr: function(liveAttr) {
            this.set({
                liveAttr: {
                    skill: (!isNaN(liveAttr.skill)) ? liveAttr.skill : this.get('liveAttr').skill,
                    sta: (!isNaN(liveAttr.sta)) ? liveAttr.sta : this.get('liveAttr').sta,
                    lives: (!isNaN(liveAttr.lives)) ? liveAttr.lives : this.get('liveAttr').lives
                }
            });
        },
        setActionState: function(actionState) {
            this.set({
                actionState: {
                    standing: actionState.standing !== undefined ? actionState.standing : this.get('actionState').standing,
                    walking: actionState.walking !== undefined ? actionState.walking : this.get('actionState').walking,
                    running: actionState.running !== undefined ? actionState.running : this.get('actionState').running,
                    jumping: actionState.jumping !== undefined ? actionState.jumping : this.get('actionState').jumping,
                    dashing: actionState.dashing !== undefined ? actionState.dashing : this.get('actionState').dashing
                }
            });
        },
        setSelfState: function(selfState) {
            // console.log('b4: ' + selfState.falled);
            this.set({
                selfState: {
                    imbalance: (!isNaN(selfState.imbalance)) ? selfState.imbalance : this.get('selfState').imbalance,
                    falled: (selfState.falled !== undefined) ? selfState.falled : this.get('selfState').falled,
                    faint: (!isNaN(selfState.faint)) ? selfState.faint : this.get('selfState').faint,
                    passive: (selfState.passive !== undefined) ? selfState.passive : this.get('selfState').passive
                }
            });
            // console.log(this.get('selfState').falled);
        },
        setCollision: function(collision) {
            this.set({
                collision: {
                    forceX: (!isNaN(collision.forceX)) ? collision.forceX : this.get('collision').forceX,
                    forceY: (!isNaN(collision.forceY)) ? collision.forceY : this.get('collision').forceY,
                    collided: (collision.collided !== undefined) ? collision.collided : this.get('collision').collided,
                    collideTarget: (collision.collideTarget !== undefined) ? collision.collideTarget : this.get('collision').collideTarget,
                    slip: (collision.slip !== undefined) ? collision.slip : this.get('collision').slip,
                    slipTicks: (!isNaN(collision.slipTicks)) ? collision.slipTicks : this.get('collision').slipTicks
                }
            });
        },
        setRendering: function(rendering) {
            this.set({
                rendering: {
                    render: (rendering.render !== undefined) ? rendering.render : this.get('rendering').render,
                    play: (rendering.play !== undefined) ? rendering.play : this.get('rendering').play
                }
            });
        },
        setEvent: function(event) {
            this.set({
                event: {
                    uuid: (event.uuid !== undefined) ? event.uuid : this.get('event').uuid,
                    thisClient: (event.thisClient !== undefined) ? event.thisClient : this.get('event').thisClient,
                    // listenTargets: (event.listenTargets !== undefined) ? event.listenTargets : this.get('event').listenTargets,
                    inEvent: (event.inEvent !== undefined) ? event.inEvent : this.get('event').inEvent,
                }
            });
        },
        setNextAction: function(nextAction) {
            this.set({
                nextAction: nextAction || new Action()
            });
        },
        setLastAction: function(lastAction) {
            this.set({
                lastAction: lastAction || this.get('nextAction')
            });
        },
        setActionControl: function(actCtrl) {
            this.set({
                actionControl: {
                    block: (actCtrl.block !== undefined) ? actCtrl.block : this.get('actionControl').block,
                    dashCD: (actCtrl.dashCD !== undefined) ? actCtrl.dashCD : this.get('actionControl').dashCD,
                    jumpCD: (actCtrl.jumpCD !== undefined) ? actCtrl.jumpCD : this.get('actionControl').jumpCD,
                    lastActionTick: (actCtrl.lastActionTick !== undefined) ? actCtrl.lastActionTick : this.get('actionControl').lastActionTick,
                }
            });
        },
        pushActions: function(actions) {
            let newStack = this.get('actionStack');
            if (Array.isArray(actions)) { // if input is an array
                actions.forEach((action) => { newStack.push(action); });
            } else {
                newStack.push(actions);
            }
            this.set({ actionStack: newStack });
        },
        shiftAction: function() {
            let newStack = this.get('actionStack');
            let res = newStack.shift();
            this.set({ actionStack: newStack });
            return res;
        },
        clearActionStack: function() {
            this.set({
                actionStack: new Array()
            })
        },
        unshiftAction: function(action) {
            let newStack = this.get('actionStack');
            newStack.unshift(action);
            this.set({ actionStack: newStack });
        },
        pushRecord: function(record) {
            let newStack = this.get('recordStack');
            newStack.push(record);
            this.set({ recordStack: newStack });
            if (this.get('recordStack').length >= 1000) this.shiftRecord;
        },
        shiftRecord: function() {
            let newStack = this.get('recordStack');
            let res = newStack.shift();
            this.set({ recordStack: newStack });
            return res;
        },
        onServerUpdate: function(data) {
            if (data.id === this.id) {
                // console.log(data);
                // if (!this.get('event').thisClient) {
                console.debug('onServerUpdate: ' + data.id);
                if (data.transform) this.setTransform(data.transform);
                // }
            }
        },
        initialize: function() {
            this.set({
                actionStack: new Array(),
                recordStack: new Array(),
                nextAction: new Action(),
                lastAction: new Action(),
                remoteActionStack: new Array()
            });

            this.set({
                modelFunctions: {
                    setTransform: this.setTransform,
                    setLiveAttr: this.setLiveAttr,
                    setActionState: this.setActionState,
                    setSelfState: this.setSelfState,
                    setCollision: this.setCollision,
                    setRendering: this.setRendering,
                    setEvent: this.setEvent,
                    setNextAction: this.setNextAction,
                    setLastAction: this.setLastAction,
                    pushActions: this.pushActions,
                    shiftAction: this.shiftAction,
                    unshiftAction: this.unshiftAction,
                    clearActionStack: this.clearActionStack,
                    setActionControl: this.actionControl,
                    pushRecord: this.pushRecord,
                    shiftRecord: this.shiftRecord,
                    onServerUpdate: this.onServerUpdate
                }
            });

            for (var key in this.get('modelFunctions')) {
                _.bindAll(this, key);
                this.on(key, this.get('modelFunctions')[key], this);
            }

            /* Update last action on next action change */
            this.on('change:nextAction', (model) => {
                // console.debug('on nextAction change: ' + this.get('nextAction').name);
                if (this.get('nextAction') !== null || this.get('nextAction') !== undefined) {
                    this.setLastAction(this.get('nextAction'));
                    // saveModelsToServer([this]);
                }
                // console.debug(this.get('lastAction'));
            });

            this.ioBind('update', this.onServerUpdate, this);
        },
        view: null,
        url: 'chestheroes_players',
        listenTargets: [],
    });
} //end fn initHeroPlayableModel

function getHeroPlayableModel(model, id, x, y) {

    let newPlayable = new Playable(PLAYABLE_PROTOTYPE);
    newPlayable.set({
        id: id || (Math.random() * 10000).toString(),
        attr: model.get('attr'),
        view: model.get('view')
    });
    newPlayable.setTransform({ x: x || 0, y: y || 0 });
    newPlayable.setRendering({ play: model.get('attr').play });
    newPlayable.setLiveAttr({
        skill: 0,
        sta: model.get('attr').sta,
        lives: 3,
    });
    newPlayable.view = null;

    return newPlayable;
} // end fn getHeroPlayableModel

/* =========== ============= End HERO Playable MODEL ============= ============= */

/* =========== ============= HERO AI MODEL ============= ============= */

function getHeroAIModel(model, id, x, y, lv) {

    let newAIPlayable = new Playable(AI_PROTOTYPE);
    newAIPlayable.setAI = function(AI) {
        this.set({
            AI: {
                lv: AI.lv || this.get('AI').lv,
                autoWalking: AI.autoWalking || this.get('AI').autoWalking
            }
        });
    };
    newAIPlayable.get('modelFunctions').setAI = newAIPlayable.setAI;

    newAIPlayable.set({
        id: id || (Math.random() * 10000).toString(),
        attr: model.get('attr'),
        view: model.get('view')
    });
    newAIPlayable.setLiveAttr({
        skill: 0,
        sta: model.get('attr').sta,
        lives: 3,
    });
    newAIPlayable.setTransform({ x: x || 0, y: y || 0 });
    newAIPlayable.setRendering({ play: model.get('attr').play });
    newAIPlayable.setAI({ lv: lv || 1 });
    newAIPlayable.view = null;

    return newAIPlayable;
} // end fn getHeroPlayableModel

/* =========== ============= End HERO AI MODEL ============= ============= */

/* =========== ============= HERO Playable VIEW ============= ============= */

function setHeroPlayableView(model) {

    let playableView = Backbone.View.extend({
        initialize: function() {
            console.log('@ Init playableView: #' + this.model.get('id'));
            /* Bind functions to this scope */
            _.bindAll(this, 'startListeners');
            _.bindAll(this, 'startPlayerListeners');
            _.bindAll(this, 'startAIListeners');

            _.bindAll(this, 'passiveListeners');

            _.bindAll(this, 'removeListeners');
            _.bindAll(this, 'removePlayerListeners');
            _.bindAll(this, 'removeAIListeners');

            _.bindAll(this, 'AIStartListenByLevel');
            _.bindAll(this, 'AIStopListenByLevel');
            _.bindAll(this, 'AIAutoMove');
            _.bindAll(this, 'AIKeepDistance');

            _.bindAll(this, 'heroGetFaint');
            _.bindAll(this, 'setViewPosition');
            _.bindAll(this, 'render');


            /* Handle Listeners */
            this.model.once('startListeners', this.startListeners, this);
            this.model.once('startPlayerListeners', this.startPlayerListeners, this);
            this.model.once('startAIListeners', this.startAIListeners, this);
            this.model.once('removeListeners', this.removeListeners, this);
            this.model.once('removePlayerListeners', this.removePlayerListeners, this);
            this.model.once('removeAIListeners', this.removeAIListeners, this);

            /* Render on init */
            this.render();

        }, //end fn initialize

        startListeners: function(listenTargets) {
            console.log('@ startListeners playableView: #' + this.model.get('id'));

            /* Start Listen to this model changes and render */
            this.model.on('change:transform', this.render, this);
            this.model.on('change:rendering', this.render, this);
            this.model.on('heroSlip', this.heroSlip, this);
            this.model.on('heroMove', this.heroMove, this);
            this.model.on('getFaint', this.heroGetFaint, this);
            this.model.on('setViewPosition', this.setViewPosition, this);

            /* FOR DEBUG USE */
            this.model.on('change:rendering', () => {
                // console.debug('@@ rendering change: ' + this.model.id + ' ' + this.model.get('rendering').play);
                // console.debug('walking: ' + this.model.get('actionState').walking);
                // console.debug('running: ' + this.model.get('actionState').running);
                // console.debug('jumping: ' + this.model.get('actionState').jumping);
                // console.debug('dashing: ' + this.model.get('actionState').dashing);
                // console.debug('x: ' + this.model.get('transform').x + ' y: ' +
                //     this.model.get('transform').y + ' z: ' + this.model.get('transform').z);
            }, this);

            /* Start Listen to other model changes */
            for (var i in listenTargets) {
                console.log('listen to: ' + listenTargets[i].id);
                this.listenTo(listenTargets[i], 'change', this.passiveListeners);
            }
            this.model.listenTargets = listenTargets;
        }, // end fn startListeners

        removeListeners: function() {
            this.model.off('change:transform', this.render, this);
            this.model.off('change:rendering', this.render, this);
            this.model.off('heroSlip', this.heroSlip, this);
            this.model.off('heroMove', this.heroMove, this);
            this.model.off('getFaint', this.heroGetFaint, this);
            this.model.off('setViewPosition', this.setViewPosition, this);

            for (var i in this.model.get('event').listenTargets) {
                this.stopListening(this.model.get('event').listenTargets[i], 'change', this.passiveListeners);
            }
        }, // end fn removeListeners

        startPlayerListeners: function() {
            /* Start Key Listener */

        }, // end fn startPlayerListeners

        removePlayerListeners: function() {

        }, // end fn removePlayerListeners

        startAIListeners: function() {
            /* Start Auto Moving Listener */
            this.model.on('startAIDebugListener', this.startAIDebugListeners, this);
            this.model.on('AIAutoMove', this.AIAutoMove, this);
            this.model.on('AISearchMove', this.AISearchMove, this);

            /* Set AI Listener By Level */
            for (var i in this.model.get('event').listenTargets) {
                this.AIStartListenByLevel(this.model.get('event').listenTargets[i]);
            }
        }, // end fn startAIListeners

        removeAIListeners: function() {
            this.model.off('AIAutoMove', this.AIAutoMove, this);
            this.model.off('AISearchMove', this.AISearchMove, this);

            for (var i in this.model.get('event').listenTargets) {
                this.AIStopListenByLevel(this.model.get('event').listenTargets[i]);
            }
        }, // end fn removeAIListeners

        startAIDebugListeners: function() {

        }, // end fn startAIDebugListeners

        stopAIDebugListeners: function() {

        }, // end fn startAIDebugListeners

        passiveListeners: function(model) {
            // react to other models' changes
            // console.debug('@ Passive Listener for playableView: #' + this.model.get('id') + '; Event from: #' + model.id);
            /* Check if this model is standing */
            // let standing = (!this.model.get('actionState').dashing && !this.model.get('actionState').jumping && !this.model.get('actionState').running && !this.model.get('actionState').walking) ? true : false;

            /* Check if this model is hit by jumping or dashing */
            // if ((model.get('actionState').dashing || model.get('actionState').jumping || model.get('actionState').running || model.get('actionState').walking) && standing) {
            //     this.model.setSelfState({ passive: true });
            // } else if (model.get('actionState').dashing && (this.model.get('actionState').jumping || this.model.get('actionState').running || this.model.get('actionState').walking)) {
            //     this.model.setSelfState({ passive: true });
            // } else if (model.get('actionState').jumping && (this.model.get('actionState').running || this.model.get('actionState').walking)) {
            //     this.model.setSelfState({ passive: true });
            // } else if (model.get('actionState').running && this.model.get('actionState').walking) {
            //     this.model.setSelfState({ passive: true });
            // }
        }, // end fn passiveListeners

        /* ============== Player functions ============== */

        /* ============== AI functions ============== */
        AIStartListenByLevel: function(target) {

            // Behaviours based on level
            switch (this.model.get('AI').lv) {
                case 4:
                    break;
                case 3:
                    break;
                case 2:
                    this.listenTo(target, 'change', this.AIKeepDistance);
                    break;
                case 1:
                    this.on('AISearchMove', this.AISearchMove, this);
                    break;
                case 0:
                    this.on('AIAutoMove', this.AIAutoMove, this);
                    break;
                default:
                    break;
            }

        }, // end fn AIStartListenByLevel

        AIStopListenByLevel: function(target) {
            // Behaviours based on level
            switch (this.model.get('AI').lv) {
                case 4:
                    break;
                case 3:
                    break;
                case 2:
                    this.stopListening(target, 'change', this.AIKeepDistance);
                    break;
                case 1:
                    this.off('AISearchMove', this.AISearchMove, this);
                    break;
                case 0:
                    this.off('AIAutoMove', this.AIAutoMove, this);
                    break;
                default:
                    break;
            }
        }, // end fn AIStopListenByLevel

        /* LV: 0 */
        AIAutoMove: function(stg) {
            var positions = [];
            var dir = getRandomDirection();
            let view = this.model.view;
            this.model.setCollision({ forceX: 0, forceY: 0 });
            let v = computeVelocity(this.model.get('attr').spd, this.model.get('attr').weight);
            let width = this.model.get('attr').width;
            let thickness = this.model.get('attr').thickness;

            /* AI will never fall down unless hit by player */
            let autoWalk = setInterval(() => {
                /* check exit MUST be put first! */
                if (this.model.get('selfState').falled || gameEnded)
                    clearInterval(autoWalk);
                // console.debug(positions);
                // console.debug('@autoWalk');
                /* Fill up positions every frame */
                let fillPos = setInterval(() => {
                    if (positions.length < 5) {
                        // console.debug('@fill positions');
                        let x = dir.x * v,
                            y = dir.y * v,
                            regX = view.regX + x * positions.length,
                            regY = view.regY + y * positions.length;
                        let pointsOnTraps = 0;
                        /* Trap standpoints check */
                        for (let trap of stg.traps) {
                            pointsOnTraps += objectStandPoints(view, regX, regY, width - 10, thickness - 4, trap);
                        }
                        /* Stage standpoints check */
                        if (objectStandPoints(view, regX, regY, width - 10, thickness - 4, stg) === 5 && pointsOnTraps === 0) {
                            positions.push({ x: x, y: y });
                        } else { dir = getRandomDirection(); }
                        // console.debug(positions[positions.length - 1]);
                        // console.debug(objectStandPoints(view, regX, regY, width - 10, thickness - 4, stg));
                    } else if (positions.length === 5 || this.model.get('selfState').falled || gameEnded) {
                        clearInterval(fillPos);
                    }
                }, 1);
                let movePos = positions.shift();
                if (movePos) this.heroMove(movePos.x, movePos.y, 'walk');
            }, 130);
            // console.debug('@AIAutoMove');
            // } else this.model.setActionState({ walking: false });
        }, // end fn AIAutoMove 

        /* LV: 1 */
        AISearchMove: function(stg, model) {
            var positions = [];
            let view = this.model.view;
            /* reset force */
            this.model.setCollision({ forceX: 0, forceY: 0 });
            let v = computeVelocity(this.model.get('attr').spd, this.model.get('attr').weight),
                width = this.model.get('attr').width,
                thickness = this.model.get('attr').thickness,
                spd = this.model.get('attr').spd,
                weight = this.model.get('attr').weight,
                otherWidth = model.get('attr').width,
                otherThickness = model.get('attr').thickness;
            var off = { x: 0, y: 0 };
            var bestDist = null;
            var bestDir = { x: 0, y: 0 };
            var positionRecords = [];

            /* Determine offset according to other model's position */
            off = getAllOffsetDirection();

            /* AI will never fall down unless hit by player */
            let autoWalk = setInterval(() => {
                /* check exit MUST be put first! */
                if (this.model.get('selfState').falled || gameEnded)
                    clearInterval(autoWalk);
                // console.debug(positions);
                // console.debug('@autoWalk');

                /* Fill up positions every frame */
                let fillPos = setInterval(() => {
                    /* Reset bestDir */
                    bestDir = { x: 0, y: 0 };
                    bestDist = null;

                    if (positions.length < 5) {

                        // console.debug('@fill positions');
                        // console.debug('this.model pos: ' + this.model.get('transform').x + ',' + this.model.get('transform').y);
                        // console.debug('other model pos: ' + model.get('transform').x + ',' + model.get('transform').y);

                        /* Compare four directions */
                        for (var i = 0; i < 4; i++) {

                            let offX = off[i].x * v,
                                offY = off[i].y * v,
                                regX = view.regX + offX * positions.length,
                                regY = view.regY + offY * positions.length;

                            let onStage = determineOnStage(view, regX, regY, width, thickness, stg);

                            /* check if the position appropriate */
                            if (onStage.pointsOnStage === 5 && onStage.pointsOnTraps === 0) {

                                // console.debug('@' + i + ' Passed stage test: ' + offX + ',' + offY);
                                // if position not off stage and on trap
                                /* Compute Distance Between Hero */
                                let dist = computeDistance(
                                    this.model.get('transform').x + offX,
                                    this.model.get('transform').y + offY,
                                    model.get('transform').x,
                                    model.get('transform').y
                                );

                                // console.debug('dist: ' + dist);

                                if (!bestDist) {
                                    bestDist = dist;
                                    // console.debug('bestDist: ' + bestDist);
                                    bestDir.x = offX, bestDir.y = offY;
                                    // console.debug('bestDir: ' + bestDir.x + ',' + bestDir.y);
                                } else if (dist < bestDist) {
                                    bestDist = dist;
                                    // console.debug('bestDist: ' + bestDist);
                                    // set best dir if this dist smallest than best dist
                                    bestDir.x = offX, bestDir.y = offY;
                                    // console.debug('bestDir: ' + bestDir.x + ',' + bestDir.y);
                                }
                            } // if not, go to next direction
                        }; // end for loop

                        /* Push offsets into the position for hero to move */
                        // console.debug('push: ' + bestDir.x + ',' + bestDir.y);
                        positions.push(bestDir);
                        // console.debug(positions);

                        // console.debug(positions[positions.length - 1]);
                        // console.debug(objectStandPoints(view, regX, regY, width - 10, thickness - 4, stg));
                    } else if (positions.length === 5 || this.model.get('selfState').falled || gameEnded) {

                        if (this.model.get('selfState').falled || gameEnded) clearInterval(fillPos);
                    }
                }, 1);

                /* Move Hero and Apply Offset by diagonal distance*/
                var absDiff = computePositionAbsoluteDifference(
                    this.model.get('transform').x,
                    this.model.get('transform').y,
                    model.get('transform').x,
                    model.get('transform').y
                );
                var diff = computePositionDifference(
                    this.model.get('transform').x,
                    this.model.get('transform').y,
                    model.get('transform').x,
                    model.get('transform').y
                );
                var dist = computeDistance(
                    this.model.get('transform').x,
                    this.model.get('transform').y,
                    model.get('transform').x,
                    model.get('transform').y
                );
                // console.debug('diff: ' + diff.x + ',' + diff.y);
                // if (dist > 200) {
                // let cond = (diff.x < otherWidth / 2 && diff.y < 200) && (diff.x < 200 && diff.y < otherThickness / 2);

                if (dist > 350) {
                    let movePos = positions.shift();
                    if (movePos) this.heroMove(movePos.x, movePos.y, 'walk');
                } else {
                    if (absDiff.x > otherWidth / 2 && absDiff.y > otherThickness / 2) {
                        let vX = (diff.x > 0) ? (-v) : (+v),
                            vY = (diff.y > 0) ? (-v) : (+v);
                        let newX = view.regX + vX * 2,
                            newY = view.regY + vY * 2;
                        let onStageX = determineOnStage(view, newX, view.regY, width, thickness, stg);
                        let onStageY = determineOnStage(view, view.regX, newY, width, thickness, stg);
                        let goX = (onStageX.pointsOnTraps === 0 && onStageX.pointsOnStage === 5);
                        let goY = (onStageY.pointsOnTraps === 0 && onStageY.pointsOnStage === 5);

                        if (goX && goY) {
                            console.debug('goX/goY');
                            if (absDiff.x <= absDiff.y) {
                                // move x
                                if (diff.x > 0) this.heroMove(-v, 0, 'walk');
                                else this.heroMove(+v, 0, 'walk');
                            } else {
                                // move y
                                if (diff.y > 0) this.heroMove(0, -v, 'walk');
                                else this.heroMove(0, +v, 'walk');
                            }
                        } else if (goX) {
                            console.debug('goX');
                            if (diff.x > 0) this.heroMove(-v, 0, 'walk');
                            else this.heroMove(+v, 0, 'walk');
                        } else if (goY) {
                            console.debug('goY');
                            if (diff.y > 0) this.heroMove(0, -v, 'walk');
                            else this.heroMove(0, +v, 'walk');
                        }
                    } else {
                        console.debug(this.model.id + ' stop tracking. diff: ' + diff.x + ',' + diff.y);
                        let offX = absDiff.x > otherWidth ? (diff.x > 0 ? -1 : +1) : 0,
                            offY = absDiff.y > otherThickness ? (diff.y > 0 ? -1 : +1) : 0;
                        // console.debug(diff.x > otherWidth);
                        // console.debug(diff.y > otherThickness);
                        // console.debug('@ dash off: ' + offX + ',' + offY);
                        /* If target in attacking range, dash! */
                        if (this.model.get('liveAttr').sta >= this.model.get('attr').cost && !this.model.get('actionState').dashing) {
                            this.heroDash(offX, offY, 'dash', HERO_SPRINT_SKILL);
                        }
                    }
                    // console.debug('#dist: ' + dist);
                }

            }, 130);
            // console.debug('@AIAutoMove');
            // } else this.model.setActionState({ walking: false });
        }, // end fn AISearchMove

        AIKeepDistance: function(model) {

            // Listen to other heroes positions

        }, // end AIKeepDistance

        /* ============== GENERIC functions ============== */

        heroGetFaint: function(s) {
            // play the animation

            this.model.setSelfState({ faint: true });
            setTimeout(() => {
                // stop the animation

                this.model.setSelfState({ faint: false });
            }, 1000 * s);
        }, //end fn heroGetFaint

        setViewPosition: function(view, attr, X, Y, Z, landScale) {
            landScale = landScale || 1;

            view.x = X * stageScaleX;
            view.y = (Y * landScale + Z) * stageScaleY;

            view.castShadow.x = (X + attr.regX) * stageScaleX;
            view.castShadow.y = (Y * landScale + attr.regY) * stageScaleY;

            view.hit.x = (X + attr.regX) * stageScaleX;
            view.hit.y = (Y * landScale + Z + attr.regY) * stageScaleY;

            view.height.x = (X + attr.regX) * stageScaleX;
            view.height.y = (Y * landScale + Z + attr.regY) * stageScaleY;

            view.scaleX = view.castShadow.scaleX = view.hit.scaleX = view.height.scaleX = attr.scaleX * stageScaleX;
            view.scaleY = view.castShadow.scaleY = view.hit.scaleY = view.height.scaleY = attr.scaleY * stageScaleY;
        }, // end fn setViewPosition

        render: function() {
            // console.info('@ render playableView: #' + this.model.get('id'));
            var view, model;
            var attr = this.model.get('attr');
            const X = this.model.get('transform').x,
                Y = this.model.get('transform').y,
                Z = this.model.get('transform').z;

            if (this.model.view !== null) {

                /* Modify the Existing Sprite */
                view = this.model.view;
                model = this.model;

                /* Compute the difference of model position and view position */
                let diffX = X - view.x; // if X > view.x, diffX>0, else diffX<0
                let diffY = (Y + Z) - view.y;
                // console.log(this.model.get('id') + ' diff: ' + diffX + ' ' + diffY);

                /* Update Position and play */
                if (this.model.get('rendering').render) {
                    view.play(this.model.get('rendering').play);
                    this.setViewPosition(view, attr, X, Y, Z, LAND_SCALE);
                }

            } else {
                if (this.model.get('rendering').render) {
                    /* Create a New Sprite */
                    view = this.model.view = new createjs.Sprite(this.model.get('view').spriteSheet);

                    /* Set Attributes of the Sprite */
                    view.scaleX = attr.scaleX;
                    view.scaleY = attr.scaleY;
                    view.regX = attr.regX; //to the center
                    view.regY = attr.regY; //to the bottom
                    /* Add Cast Shadow to this object */
                    let castShadow = new createjs.Shape();
                    castShadow.graphics.f('#3E3E3E').de(-view.regX, -view.regY, attr.width, attr.thickness);
                    castShadow.alpha = 0.15;
                    castShadow.regX = attr.width / 2;
                    castShadow.regY = attr.thickness / 2;
                    view.castShadow = castShadow;

                    // * THIS IS FOR DEBUGGING USE * //

                    let hit = new createjs.Shape();
                    hit.graphics.f('#ee0000').dr(-view.regX, -view.regY, attr.width, attr.thickness);
                    hit.alpha = 0.3;
                    hit.regX = attr.width / 2;
                    hit.regY = attr.thickness / 2;

                    let height = new createjs.Shape();
                    height.graphics.f('#0000ee').dr(-view.regX, -view.regY, attr.width, attr.height);
                    height.alpha = 0.3;
                    height.regX = attr.width / 2;
                    height.regY = attr.height;

                    view.height = height; // * THIS IS FOR DEBUGGING USE
                    view.hit = hit; // * THIS IS FOR DEBUGGING USE
                    view.hitArea = hit;

                    view.gotoAndPlay(this.model.get('rendering').play);
                    /* Set all position */
                    this.setViewPosition(view, attr, X, Y, Z, LAND_SCALE);
                }
            }; // end if

        }, // end fn render

    }); // end playableView

    return new playableView({ model: model });

} // end fn setHeroPlayableView

/* =========== ============= End HERO Playable VIEW ============= ============= */