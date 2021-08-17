globalAR.loadingButton.addEventListener('touchend', loadContent);

function loadContent() {
    globalAR.loadingButton.classList.add('UI__button_unclickable');

    let content = document.createElement('a-entity');
    globalAR.scene.append(content);

    content.setAttribute('gltf-model', '#tram');
    content.setAttribute('scale', `${globalAR.settings.initialTransform.scale.x}
                                   ${globalAR.settings.initialTransform.scale.y}
                                   ${globalAR.settings.initialTransform.scale.z}`);
    content.setAttribute('position', `${globalAR.settings.initialTransform.position.x}
                                      ${globalAR.settings.initialTransform.position.y}
                                      ${globalAR.settings.initialTransform.position.z}`);

    content.classList.add('tramModel');
    globalAR.tramModel = content;

    loadingButton.style.display = 'none';
    controlPanel.style.display = 'flex';
}