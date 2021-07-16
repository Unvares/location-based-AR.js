let tramModel;
let initialPosition = [0, 1, -2],
    initialScale = 0.1;

{
    loadingButton.addEventListener('touchstart', buttonTouchStart);
    loadingButton.addEventListener('touchend', buttonTouchEnd);

    function buttonTouchStart() {
        loadingButton.classList.add('UI__button_active');
        loadContent();
    }

    function buttonTouchEnd() {
        loadingButton.classList.remove('UI__button_active');
        loadingButton.style.display = 'none';
        controlPanel.style.display = 'flex';
    }

    function loadContent() {
        let content = document.createElement('a-entity');
        scene.append(content);

        content.setAttribute('gltf-model', '#tram');
        content.setAttribute('scale', `${initialScale} ${initialScale} ${initialScale}`);
        setTimeout(() => {
            content.setAttribute('position', `${initialPosition[0]} ${initialPosition[1]} ${initialPosition[2]}`);
        }, 500);

        content.classList.add('tramModel');
        tramModel = content;
    }
}