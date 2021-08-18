'use strict'

setTimeout(disableFullscreenButtonForSafari, 500);

// disabling context menu
window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  e.stopPropagation();
});

// manually setting a-scene geolocation equal to device geolocation when page is loaded
window.addEventListener('load', () => {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const gps = document.createAttribute('gps-entity-place');
      gps.value = `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude}`;
      globalAR.scene.setAttributeNode(gps);
      console.log(gps.value);
    });
  }
});

function disableFullscreenButtonForSafari() {
  let check = isSafari();
  if(check) {
    globalAR.fullscreenButton.classList.add('dn');
  }
}

function isSafari() {
  var ua = navigator.userAgent.toLowerCase();
  if(ua.indexOf('safari') != -1 && ua.indexOf('chrome') == -1) { 
    return true;
  }
  return false;
}