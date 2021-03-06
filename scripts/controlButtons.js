globalAR.scalingButton.addEventListener('touchend', toggleScaling);
globalAR.fullscreenButton.addEventListener('touchend', toggleFullscreen);

function toggleFullscreen() {
    if(document.fullscreenElement) {
        document.exitFullscreen();
        globalAR.fullscreenButton.classList.remove('UI__button_active');
    } else {
        document.documentElement.requestFullscreen();
        globalAR.fullscreenButton.classList.add('UI__button_active');
    }
}

function toggleScaling() {
    if(globalAR.scalingButton.classList.contains('UI__button_active')) {
        globalAR.scalingButton.classList.remove('UI__button_active');
        requestAnimationFrame( () => {
            scaling(globalAR.settings.initialTransform);
        });
    } else {
        animating = true;
        globalAR.scalingButton.classList.add('UI__button_active');
        requestAnimationFrame( () => {
            scaling(globalAR.settings.zoomTransform);
        });
    }
}

function scaling(targetValueObject) {
    let tramPosition = globalAR.tramModel.getAttribute('position');
    let tramRotation = globalAR.tramModel.getAttribute('rotation');
    let tramScale = globalAR.tramModel.getAttribute('scale');

    tramPosition = scaleFrame(tramPosition, targetValueObject.position);
    tramRotation = scaleFrame(tramRotation, targetValueObject.rotation, true);
    tramScale = scaleFrame(tramScale, targetValueObject.scale);

    setTransform(globalAR.tramModel, 'position', tramPosition);
    setTransform(globalAR.tramModel, 'rotation', tramRotation);
    setTransform(globalAR.tramModel, 'scale', tramScale);
    
    if(!didItScale([tramPosition, tramRotation, tramScale], targetValueObject)) {
        requestAnimationFrame(() => {
            scaling(targetValueObject);
        });
    }
}

function scaleFrame(currentValueObject, targetValueObject, x50) {
    let diff = globalAR.settings.ignoredDifference;
    let scaleSpeed = globalAR.settings.scaleSpeed;
    let notRotation;

    // x50 is a parameter used to increase speed of rotation
    if(x50) {
        diff *= 50;
        scaleSpeed *= 50;
    }

    if(currentValueObject.x < targetValueObject.x + diff && currentValueObject.x > targetValueObject.x - diff &&
       currentValueObject.y < targetValueObject.y + diff && currentValueObject.y > targetValueObject.y - diff &&
       currentValueObject.z < targetValueObject.z + diff && currentValueObject.z > targetValueObject.z - diff) {
        return targetValueObject;
    }

    let result = Object.assign({}, currentValueObject);

    for(let i = 0; i < 3; i++) {
        const dimensions = ['x', 'y', 'z'];

        if (result[dimensions[i]] > targetValueObject[dimensions[i]]) {
            console.log(dimensions[i]);
            result[dimensions[i]] -= scaleSpeed;
        } else {
            result[dimensions[i]] += scaleSpeed;
        }
    }

    return result;
}

function setTransform(element, name, value) {
    element.setAttribute(name, `${value.x} ${value.y} ${value.z}`);
}

function didItScale(currentValueArray, targetValueObject) {
    const targetValueArray = [targetValueObject.position, targetValueObject.rotation, targetValueObject.scale];
    let result = 0;

    for(let i = 0; i < currentValueArray.length; i++) {
        if (currentValueArray[i].x == targetValueArray[i].x &&
            currentValueArray[i].y == targetValueArray[i].y &&
            currentValueArray[i].z == targetValueArray[i].z) {
                result++;
            }
    }
    return (result == targetValueArray.length);
}