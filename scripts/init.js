'use strict'

// disabling context menu
window.oncontextmenu = function(e) {
    e.preventDefault();
    e.stopPropagation();
}

// manually setting a-scene geolocation equal to device geolocation when page is loaded
window.onload = function() {
    document.documentElement.requestFullscreen();
    // console.log(document.documentElement.requestFullscreen());

    let scene = document.querySelector('a-scene');
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let gps = document.createAttribute('gps-entity-place');
            gps.value = `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude}`;
            scene.setAttributeNode(gps);
            console.log(gps.value);
        });
    }
}