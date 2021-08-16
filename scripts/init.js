'use strict'

// disabling context menu
window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  e.stopPropagation();
});

// manually setting a-scene geolocation equal to device geolocation when page is loaded
window.addEventListener('load', () => {
  const scene = document.querySelector('a-scene');
  
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const gps = document.createAttribute('gps-entity-place');
      gps.value = `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude}`;
      scene.setAttributeNode(gps);
      console.log(gps.value);
    });
  }
});