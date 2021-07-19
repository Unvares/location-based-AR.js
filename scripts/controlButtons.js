{
    let targets;

    scalingButton.addEventListener('touchend', toggleScaling);
    fullscreenButton.addEventListener('touchend', toggleFullscreen);

    function toggleFullscreen() {
        if(document.fullscreenElement) {
            document.exitFullscreen();
            fullscreenButton.classList.remove('UI__button_active');
        } else {
            document.documentElement.requestFullscreen();
            fullscreenButton.classList.add('UI__button_active');
        }
    }

    function toggleScaling() {
        if(scalingButton.classList.contains('UI__button_active')) {
            scalingButton.classList.remove('UI__button_active');

            targets = {
                position: {
                    x: 0,
                    y: 1,
                    z: -2
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                scale: {
                    x: 0.1,
                    y: 0.1,
                    z: 0.1
                }
            };

            requestAnimationFrame(scaling);
        } else {
            console.log('toggleScaling');
            scalingButton.classList.add('UI__button_active');

            targets = {
                position: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                scale: {
                    x: 1,
                    y: 1,
                    z: 1
                }
            };
            requestAnimationFrame(scaling);
        }
    }

    function scaling() {
        console.log('scaling');
        let tramPosition = tramModel.getAttribute('position'),
            tramRotation = tramModel.getAttribute('rotation'),
            tramScale = tramModel.getAttribute('scale');
        
        scaleFrame(tramPosition, targets.position);
        scaleFrame(tramRotation, targets.rotation);
        scaleFrame(tramScale, targets.scale);

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
            let dimensions = ['x', 'y', 'z'];
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

    function didItScale(properties, targets) {
        let result = 0;
        targets = [targets.position, targets.rotation, targets.scale];
        
        for(let i = 0; i < properties.length; i++) {
            if (properties[i].x == targets[i].x &&
                properties[i].y == targets[i].y &&
                properties[i].z == targets[i].z) {
                    result++;
                }
        }

        return (result == targets.length);
    }
}