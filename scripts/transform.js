'use strict'

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
                           (event.touches[1]) ? 1 : 0;
        this.startPosition = this.getTouchPosition(event, this.touchNumber);
        this.animationID = requestAnimationFrame( () => {
            this[this.actionType]();
        });
    }

    getTouchPosition(event, touchNumber) {
        return [event.touches[touchNumber].clientX, event.touches[touchNumber].clientY];
    }

    actionEnd() {
        this.isGoing = false;
        cancelAnimationFrame(this.animationID);
        this.prevTranslate = this.currentTranslate.concat();
    }

    mouseMove(event) {
        this.currentPosition = this.getTouchPosition(event, this.touchNumber);
        this.getCurrentTranslate(this.actionType);        
    }
}

class TransformPosition extends Transform {
    constructor(attributeType) {
        super(attributeType);
    }

    getCurrentTranslate() {
        this.currentTranslate = [this.prevTranslate[0] + this.currentPosition[0] - this.startPosition[0],
                                 this.prevTranslate[1] + this.currentPosition[1] - this.startPosition[1]];
    }

    moving() {
        const translateX = globalAR.settings.initialTransform.position.x + this.currentTranslate[0] / this.coefficient;
        const translateZ = globalAR.settings.initialTransform.position.z + this.currentTranslate[1] / this.coefficient;

        globalAR.tramModel.setAttribute('position', `${translateX} ${globalAR.settings.initialTransform.position.y} ${translateZ}`);
        if(this.isGoing) {
            requestAnimationFrame( () => {
                this.moving();
            });
        }
    }

}

class TransformRotation extends Transform {
    constructor(attributeType) {
        super(attributeType);
    }

    getCurrentTranslate() {
        this.currentTranslate = [this.prevTranslate[0] + this.startPosition[0] - this.currentPosition[0],
                                 this.prevTranslate[1] + this.startPosition[1] - this.currentPosition[1]];
    }

    rotating() {
        const rotationX = this.currentTranslate[1];
        const rotationY = this.currentTranslate[0] / 2;
        globalAR.tramModel.setAttribute('rotation', `${-rotationX} ${rotationY} 0`);
        if(this.isGoing) {
            requestAnimationFrame( () => {
                this.rotating();
            });
        }
    }
}

class TransformScale extends Transform {
    constructor(attributeType) {
        super(attributeType);
    }

    getCurrentTranslate(actionType) {
        const currentTranslateX = this.prevTranslate[0] + this.startPosition[0] - this.currentPosition[0];
        const currentTranslateY = this.prevTranslate[1] + this.startPosition[1] - this.currentPosition[1];

        const minTranslate = -this.coefficient * (globalAR.settings.initialTransform.scale.y - globalAR.settings.minTramScale);
        const maxTranslate = this.coefficient * (globalAR.settings.maxTramScale - globalAR.settings.initialTransform.scale.y);

        if(currentTranslateY > minTranslate && currentTranslateY < maxTranslate) {
            this.currentTranslate = [currentTranslateX, currentTranslateY];
        } else if(currentTranslateY >= maxTranslate) {
            this.currentTranslate = [currentTranslateX, maxTranslate];
        } else {
            this.currentTranslate = [currentTranslateX, minTranslate];
        }
    }

    scaling() {
        const scaleAmount = globalAR.settings.initialTransform.scale.y + (this.currentTranslate[1] / this.coefficient);
        globalAR.tramModel.setAttribute('scale', `${scaleAmount} ${scaleAmount} ${scaleAmount}`);
        if(this.isGoing) {
            requestAnimationFrame( () => {
                this.scaling();
            });
        }
    }
}


const positionController = new TransformPosition('position');
const rotationController = new TransformRotation('rotation');
const scaleController    = new TransformScale('scale');

globalAR.rotationCircle.addEventListener('touchstart', (event) => {
    rotationController.actionStart(event);
});
globalAR.rotationCircle.addEventListener('touchmove', (event) => {
    rotationController.mouseMove(event);
});
globalAR.rotationCircle.addEventListener('touchend', () => {
    rotationController.actionEnd();
});

globalAR.positionController.addEventListener('touchstart', (event) => {
    positionController.actionStart(event);
});
globalAR.positionController.addEventListener('touchmove', (event) => {
    positionController.mouseMove(event);
});
globalAR.positionController.addEventListener('touchend', () => {
    positionController.actionEnd();
});

globalAR.scaleScroller.addEventListener('touchstart', (event) => {
    scaleController.actionStart(event);
});
globalAR.scaleScroller.addEventListener('touchmove', (event) => {
    scaleController.mouseMove(event);
});
globalAR.scaleScroller.addEventListener('touchend', () => {
    scaleController.actionEnd();
});