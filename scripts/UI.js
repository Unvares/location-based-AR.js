'use strict'

const scene = document.querySelector('a-scene');
const button = document.querySelector('.UI__button');

button.addEventListener('touchstart', buttonTouchStart);
button.addEventListener('touchend', buttonTouchEnd);

function buttonTouchStart() {
    button.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    loadContent();
}

function buttonTouchEnd() {
    button.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
}

function loadContent() {
    let content = document.createElement('a-entity');
    scene.append(content);
    content.setAttribute('gltf-model', '#tram');
    setTimeout(() => {
        content.setAttribute('position', '0 0 -8');
    }, 1000);
    // content.setAttribute('position', '0 0 -8');
    button.style.display = 'none';
}