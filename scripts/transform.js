class Transform {
    constructor(attributeType) {
        this.actionType = (attributeType == 'position') ? 'moving'   :
                          (attributeType == 'rotation') ? 'rotating' :
                          (attributeType == 'scale')    ? 'scaling'  : undefined;
        this.startPosition = [0, 0];
        this.currentPosition = [0, 0];
        this.currentTranslate = [0, 0];
        this.prevTranslate = [0, 0];
        this.coefficient = this.setCoefficient(this.actionType);
        this.isGoing = false;
        this.animationID = undefined; // it is defined in actionStart function
        this.touchNumber = undefined; // it is defined in actionStart function
    }

    setCoefficient(actionType) {
        const coefficient = actionType + 'Coefficient';
        return globalAR['settings'][coefficient];
    }

    actionStart(event) {
        this.isGoing = true;
        this.touchNumber = (event.touches[2]) ? 2 :
                           (event.touches[1]) ? 1 :0;
        this.startPosition = this.getTouchPosition(event, this.touchNumber);
        this.animationID = requestAnimationFrame(this[this.actionType]);
    }

    getTouchPosition(event, touchNumber) {
        return [event.touches[touchNumber].clientX, event.touches[touchNumber].clientY];
    }

    actionEnd(event) {
        this.isGoing = false;
        cancelAnimationFrame(this.animationID);
        this.prevTranslate = this.currentTranslate.concat();
    }

    mouseMove(event) {
        currentPosition = this.getTouchPosition(event, this.touchNumber);
        this.getCurrentTranslate(this.actionType);        
    }

    getCurrentTranslate(actionType) {
        if(this.actionType == 'rotating') {
            const currentTranslate =  this.prevTranslate[1] + this.startPosition[1] - this.currentPosition[1];
            const minTranslate = -this.coefficient * (globalAR.settings.initialTransform.scale - globalAR.settings.minTramScale);
            const maxTranslate = this.coefficient * (globalAR.settings.maxTramScale - globalAR.settings.initialTransform.scale);

            if(currentTranslate > minTranslate && currentTranslate < maxTranslate) {
                this.currentTranslate = this.prevTranslate[1] + this.startPosition[1] - this.currentPosition[1];
            } else if(currentTranslate >= maxTranslate) {
                this.currentTranslate = globalAR.settings.maxTramScale;
            } else {
                this.currentTranslate = globalAR.settings.minTramScale;
            }
        } else {
            this.currentTranslate = [this.prevTranslate[0] + this.currentPosition[0] - this.startPosition[0],
                                     this.prevTranslate[1] + this.currentPosition[1] - this.startPosition[1]];
        }
    }

    moving() {
        const translateX = globalAR.settings.initialTransform.position.x + this.currentTranslate[0] / this.coefficient;
        const translateZ = globalAR.settings.initialTransform.position.z + this.currentTranslate[1] / this.coefficient;
        globalAR.tramModel.setAttribute('position', `${translateX} ${globalAR.settings.initialTramTransform.position.y} ${translateZ}`);
        if(this.isGoing) {
        requestAnimationFrame(moving);
        }
    }

    rotating() {
        const rotationX = this.currentTranslate[1];
        const rotationY = this.currentTranslate[0] / 2;
        globalAR.tramModel.setAttribute('rotation', `${-rotationX} ${rotationY} 0`);
        if(this.isGoing) {
            requestAnimationFrame(rotation);
        }
    }

    scaling() {
        const scaleAmount = globalAR.settings.initialTransform.scale + (this.currentTranslate / this.coefficient);
        globalAR.tramModel.setAttribute('scale', `${scaleAmount} ${scaleAmount} ${scaleAmount}`);
        if(this.isGoing) {
            requestAnimationFrame(scaling);
        }
    }
}

const positionController = new Transform('position');
const rotationController = new Transform('rotation');
const scaleController    = new Transform('scale');

globalAR.rotationCircle.addEventListener('touchstart', rotationController.actionStart);
globalAR.rotationCircle.addEventListener('touchmove', rotationController.mouseMove);
globalAR.rotationCircle.addEventListener('touchend', rotationController.actionEnd);

globalAR.positionController.addEventListener('touchstart', positionController.actionStart);
globalAR.positionController.addEventListener('touchmove', positionController.mouseMove);
globalAR.positionController.addEventListener('touchend', positionController.actionEnd);

globalAR.scaleScroller.addEventListener('touchstart', scaleController.actionStart);
globalAR.scaleScroller.addEventListener('touchmove', scaleController.mouseMove);
globalAR.scaleScroller.addEventListener('touchend', scaleController.actionEnd);