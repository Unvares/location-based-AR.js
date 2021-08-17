'use strict'

// global object for all structures and UI elements in the project

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

    tramModel: undefined, // it is defined in 'loading' script after user interaction

    // scene settings

    settings: {
        movingCoefficient: 60, // the bigger it is, the slower is moving
        scalingCoefficient: 500, // the bigger it is the slower is scaling
        minTramScale: 0.1,
        maxTramScale: 6,
        initialTransform: {
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
            scale: 0.1
        },
        zoomTransform: {
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
            scale: 1
        },
    }
}