class Transform {
    constructor(actionType) {
        this['actionType'] = actionType;
        this.startPosition = [0, 0];
        this.currentPosition = [0, 0];
        this.currentTranslate = [0, 0];
        this.prevTranslate = [0, 0];
        this.coefficient = 0;
        this.isGoing = false;
        this.animationID = undefined;
        this.touchNumber = undefined;
    }

    actionStart (event) {
        this.isGoing = true;
        this.touchNumber = (event.touches[2]) ? 2 :
                           (event.touches[1]) ? 1 :0;
        this.startPosition = this.getTouchPosition(event, this.touchNumber);
        this.animationID = requestAnimationFrame(this.actionType);
    }
}


function actionStart(event, actionName) {
    let isGoing = true;
    touchNumber = (event.touches[2]) ? 2 :
                  (event.touches[1]) ? 1 : 0;
    let startPosition = getTouchPosition(event, touchNumber);
    let animationID = requestAnimationFrame(actionName);
}

function getTouchPosition(event, touchNumber) {
    return [event.touches[touchNumber].clientX, event.touches[touchNumber].clientY];
}

function moving() {
    let translateX = initialPosition[0] + currentTranslate[0] / movingCoefficient;
    let translateZ = initialPosition[2] + currentTranslate[1] / movingCoefficient;
    globalAR.tramModel.setAttribute('position', `${translateX} ${globalAR.settings.initialTramTransform.position.y} ${translateZ}`);
    if(isGoing) {
        requestAnimationFrame(moving);
    }
}

function rotating() {
    let rotationX = currentTranslate[1];
    let rotationY = currentTranslate[0] / 2;
    tramModel.setAttribute('rotation', `${-rotationX} ${rotationY} 0`);
    if(isGoing) {
        requestAnimationFrame(rotation);
    }
}

function scaling() {
    scaleAmount = initialScale + (currentTranslate / scalingCoefficient);
    tramModel.setAttribute('scale', `${scaleAmount} ${scaleAmount} ${scaleAmount}`);
    if(isGoing) {
        requestAnimationFrame(scaling);
    }
}


// move
function getTouchPosition(event) {
    return [event.touches[whichTouch].clientX, event.touches[whichTouch].clientY];
}

// rotation
function getTouchPosition(event) {
    return [event.touches[whichTouch].clientX, event.touches[whichTouch].clientY]
}

// scale
function getTouchPosition(event) {
    return event.touches[whichTouch].clientY;
}