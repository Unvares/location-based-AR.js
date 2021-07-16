let tramModel;
let initialPosition = [0, 0, -8];

{
    loadingButton.addEventListener('touchstart', buttonTouchStart);
    loadingButton.addEventListener('touchend', buttonTouchEnd);

    function buttonTouchStart() {
        loadingButton.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        loadContent();
    }

    function buttonTouchEnd() {
        loadingButton.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
    }

    function loadContent() {
        let content = document.createElement('a-entity');
        scene.append(content);

        content.setAttribute('gltf-model', '#tram');
        content.setAttribute('scale', '1 1 1');
        setTimeout(() => {
            content.setAttribute('position', `${initialPosition[0]} ${initialPosition[1]} ${initialPosition[2]}`);
        }, 500);

        content.classList.add('tramModel');
        tramModel = content;

        loadingButton.style.display = 'none';
        controlPanel.style.display = 'flex';
    }
}