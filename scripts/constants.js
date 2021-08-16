'use strict'
// global object for all structures and UI elements in the project
const globalAR = {
    // global structures
    scene: document.querySelector('a-scene'),
    UI: document.querySelector('.UI'),
    // UI elements
    loadingButton: this.UI.querySelector('.UI__button'),
    scalingButton: this.UI.querySelector('.control-panel__button_scaling'),
    fullscreenButton: this.UI.querySelector('.control-panel__button_fullscreen'), 
    controlPanel: this.UI.querySelector('.control-panel'),
    rotationCircle: this.UI.querySelector('.control-panel__rotation-circle'),
    positionController: this.UI.querySelector('.control-panel__position-controller'),
    scaleScroller: this.UI.querySelector('.control-panel__scale-scroller'),
    // scene elements
    tramModel: undefined, // it is defined in 'loading' script after user interaction
    // scene settings
    settings: {
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
            scale: {
                x: 0.1,
                y: 0.1,
                z: 0.1,
            }
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
            scale: {
                x: 1,
                y: 1,
                z: 1,
            }
        },
        minTramScale: 0.1,
        maxTramScale: 6,
    }
}