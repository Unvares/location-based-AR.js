{
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
            console.log('initial scaling');
            globalAR.scalingButton.classList.remove('UI__button_active');
            requestAnimationFrame( () => {
                scaling(globalAR.settings.initialTramTransform);
            });
        } else {
            console.log('1:1 scaling');
            globalAR.scalingButton.classList.add('UI__button_active');
            requestAnimationFrame( () => {
                scaling(globalAR.settings.zoomTramTransform);
            });
        }
    }

    function scaling(settings) {
        console.log('scaling');
        let tramPosition = globalAR.tramModel.getAttribute('position');
        let tramRotation = globalAR.tramModel.getAttribute('rotation');
        let tramScale = globalAR.tramModel.getAttribute('scale');
        
        scaleFrame(tramPosition, settings.position);
        scaleFrame(tramRotation, settings.rotation);
        scaleFrame(tramScale, settings.scale);

        setDimensionAttribute(tramModel, 'position', tramPosition);
        setDimensionAttribute(tramModel, 'rotation', tramRotation);
        setDimensionAttribute(tramModel, 'scale', tramScale);
        
        if(!didItScale([tramPosition, tramRotation, tramScale], targets)) {
            requestAnimationFrame(scaling);
        }
    }

    function scaleFrame(property, target) {
        console.log('scaleFrame');
        if(property.x < target.x + 0.2 && property.x > target.x - 0.2 &&
            property.y < target.y + 0.2 && property.y > target.y - 0.2 &&
            property.z < target.z + 0.2 && property.z > target.z - 0.2) {
            property.x = target.x;
            property.y = target.y;
            property.z = target.z;
            return;
        }
        for(let i = 0; i < 3; i++) {
            const dimensions = ['x', 'y', 'z'];
            property[dimensions[i]] = (property[dimensions[i]] > target[dimensions[i]]) ?
                property[dimensions[i]] - 0.1 :
                (property[dimensions[i]] == target[dimensions[i]]) ?
                property[dimensions[i]] :
                property[dimensions[i]] + 0.1;
        }    
    }

    function setDimensionAttribute(element, name, value) {
        element.setAttribute(name, `${value.x} ${value.y} ${value.z}`);
    }

    function didItScale(properties, settings) {
        let result = 0;
        settings = [settings.position, settings.rotation, settings.scale];
        
        for(let i = 0; i < properties.length; i++) {
            if (properties[i].x == settings[i].x &&
                properties[i].y == settings[i].y &&
                properties[i].z == settings[i].z) {
                    result++;
                }
        }

        return (result == settings.length);
    }
}