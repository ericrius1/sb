var scene, camera, controls, renderer, clock,time, lights, hall, photos, prize, shaders;

shaders = new ShaderLoader('shaders');
shaders.shaderSetLoaded = function(){
  init();
  animate();
}

shaders.load('vs-floor', 'floor', 'vertex');
shaders.load('fs-floor', 'floor', 'fragment');

function init() {
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 20000);
  scene = new THREE.Scene();

  controls = new Controls();

  renderer = new THREE.WebGLRenderer({});
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  clock = new THREE.Clock();
  hall = new Hall();
  lights = new Lights();
  photos = new Photos();
  // prize = new Prize();
}

function animate() {
  time = clock.getElapsedTime();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  TWEEN.update();
  controls.update();
  lights.update();
  hall.update();
  // prize.update();
}

// handle resizing windows
window.onload = function() {
  window.addEventListener('resize', onWindowResize, false);
};

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}