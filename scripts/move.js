{
    let startPosition = [0, 0],
        currentPosition = [0, 0],
        currentTranslate = [0, 0],
        prevTranslate = [0, 0],
        movingCoefficient = 60, // the bigger it is, the slower is moving
        isMoving = false,
        animationID,
        whichTouch;

    globalAR.positionController.addEventListener('touchstart', moveStart);
    globalAR.positionController.addEventListener('touchmove', moveMove);
    globalAR.positionController.addEventListener('touchend', moveEnd);

    function moveStart(event) {
        whichTouch = (event.touches[2]) ? 2 :
                     (event.touches[1]) ? 1 : 0;
        isMoving = true;
        startPosition = getTouchPosition(event);
        animationID = requestAnimationFrame(moving);
    }

    function moveMove(event) {
        currentPosition = getTouchPosition(event);
        currentTranslate = [prevTranslate[0] + currentPosition[0] - startPosition[0],
                            prevTranslate[1] + currentPosition[1] - startPosition[1]];
    }

    function moveEnd() {
        isMoving = false;
        cancelAnimationFrame(animationID);
        prevTranslate = currentTranslate.concat();
    }

    function moving() {
        let translateX = initialPosition[0] + currentTranslate[0] / movingCoefficient;
        let translateZ = initialPosition[2] + currentTranslate[1] / movingCoefficient;
        globalAR.tramModel.setAttribute('position', `${translateX} ${globalAR.settings.initialTramTransform.position.y} ${translateZ}`);
        if(isMoving) {
            requestAnimationFrame(moving);
        }
    }
    function getTouchPosition(event) {
        return [event.touches[whichTouch].clientX, event.touches[whichTouch].clientY];
    }
}