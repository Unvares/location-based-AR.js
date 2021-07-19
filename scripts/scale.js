{  
    // settings
    let minScale = 0.05,
        maxScale = 6;


    let startPosition = 0,
        currentPosition = 0,
        currentTranslate = 0,
        prevTranslate = 0,
        scalingCoefficient = 500, // the bigger it is, the slower is scaling
        scaleAmount = initialScale,
        isScrolling = false,
        animationID,
        whichTouch;

    scaleScroller.addEventListener('touchstart', scrollingStart);
    scaleScroller.addEventListener('touchmove', scrollingMove);
    scaleScroller.addEventListener('touchend', scrollingEnd);

    function scrollingStart(event) {
        whichTouch = (event.touches[2]) ? 2 :
                     (event.touches[1]) ? 1 : 0;
        isScrolling = true;
        startPosition = getTouchPosition(event);
        animationID = requestAnimationFrame(scaling);
    }

    function scrollingMove(event) {
        currentPosition = getTouchPosition(event);
        currentTranslate = getCurrentTranslate(); 
    }

    function scrollingEnd() {
        isScrolling = false;
        cancelAnimationFrame(animationID);
        prevTranslate = currentTranslate;
        console.log(scaleAmount);
    }

    function scaling() {
        scaleAmount = initialScale + (currentTranslate / scalingCoefficient);
        tramModel.setAttribute('scale', `${scaleAmount} ${scaleAmount} ${scaleAmount}`);
        if(isScrolling) {
            requestAnimationFrame(scaling);
        }
    }
    function getCurrentTranslate() {
        let currentTranslate =  prevTranslate + startPosition - currentPosition;
        let minTranslate = -scalingCoefficient * (initialScale - minScale);
        let maxTranslate = scalingCoefficient * (maxScale - initialScale);

        if(currentTranslate > minTranslate && currentTranslate < maxTranslate) {
            return prevTranslate + startPosition - currentPosition;
        } else if(currentTranslate >= maxTranslate) {
            return maxTranslate;
        } else {
            return minTranslate;
        }
    }
    function getTouchPosition(event) {
        return event.touches[whichTouch].clientY;
    }
}