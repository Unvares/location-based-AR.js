'use strict'

// global object for all structures and elements in the project

const globalAR = {

    // global structures

    scene: document.querySelector('a-scene'),
    UI: document.querySelector('.UI'),

    // UI elements

    loadingButton: document.querySelector('.UI__button_loading'),
    scalingButton: document.querySelector('.control-panel__button_scaling'),
    fullscreenButton: document.querySelector('.control-panel__button_fullscreen'), 
    controlPanel: document.querySelector('.control-panel'),
    rotationCircle: document.querySelector('.control-panel__rotation-circle'),
    positionController: document.querySelector('.control-panel__position-controller'),
    scaleScroller: document.querySelector('.control-panel__scale-scroller'),

    // scene elements

    tramModel: undefined,        // property is defined in loading.js after user interaction

    // scene settings

    settings: {
        scaleSpeed: 0.1,         // parameter used for toggling between initial and 1:1 scaling in controlButtons.js
        ignoredDifference: 0.2,  // parameter used for toggling between initial and 1:1 scaling in controlButtons.js
        movingCoefficient: 60,   // the bigger it is, the slower is moving
        scalingCoefficient: 500, // the bigger it is the slower is scaling
        minTramScale: 0.1,
        maxTramScale: 0.5,
        initialTransform: {      // tram model initial transform parameters for controlButtons.js
            position: {
                x: 0,
                y: 1,
                z: -2,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0,
            },
            scale: {
                x: 0.1,
                y: 0.1,
                z: 0.1,
            }
        },
        zoomTransform: {         // tram model 1:1 scaling parameters for controlButtons.js
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0,
            },
            scale: {
                x: 1,
                y: 1,
                z: 1,
            }
        },
    }
}