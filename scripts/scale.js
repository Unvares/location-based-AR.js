{
    let startPosition = 0,
        currentPosition = 0,
        currentTranslate = 0,
        prevTranslate = 0,
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
        currentTranslate = prevTranslate + startPosition - currentPosition;
    }

    function scrollingEnd() {
        isScrolling = false;
        cancelAnimationFrame(animationID);
        prevTranslate = currentTranslate;
    }

    function scaling() {
        let scaleAmount = 1 + currentTranslate/200;
        tramModel.setAttribute('scale', `${scaleAmount} ${scaleAmount} ${scaleAmount}`);
        if(isScrolling) {
            requestAnimationFrame(scaling);
        }
    }
    function getTouchPosition(event) {
        return event.touches[whichTouch].clientY;
    }
}