{
    let startPosition = [0, 0],
        currentPosition = [0, 0],
        currentTranslate = [0, 0],
        prevTranslate = [0, 0],
        isRotating = false,
        animationID,
        whichTouch;

    rotationCircle.addEventListener('touchstart', rotationStart);
    rotationCircle.addEventListener('touchmove', rotationMove);
    rotationCircle.addEventListener('touchend', rotationEnd);

    function rotationStart(event) {
        whichTouch = (event.touches[2]) ? 2 :
                     (event.touches[1]) ? 1 : 0;
        isRotating = true;
        startPosition = getTouchPosition(event)
        animationID = requestAnimationFrame(rotation);
    }

    function rotationMove(event) {
        currentPosition = getTouchPosition(event);
        currentTranslate = [prevTranslate[0] + startPosition[0] - currentPosition[0],
                            prevTranslate[1] + startPosition[1] - currentPosition[1]];
    }

    function rotationEnd() {
        isRotating = false;
        cancelAnimationFrame(animationID);
        prevTranslate = currentTranslate.concat();
    }

    function rotation() {
        let rotationX = currentTranslate[1];
        let rotationY = currentTranslate[0] / 2;
        tramModel.setAttribute('rotation', `${-rotationX} ${rotationY} 0`);
        if(isRotating) {
            requestAnimationFrame(rotation);
        }
    }
    function getTouchPosition(event) {
        return [event.touches[whichTouch].clientX, event.touches[whichTouch].clientY]
    }
}