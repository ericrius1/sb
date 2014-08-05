var scene, camera, controls, renderer, clock, time, lights, hall, photos, prize, shaders, painting;

shaders = new ShaderLoader('shaders');
shaders.shaderSetLoaded = function() {
  init();
  animate();
}

shaders.load('vs-floor', 'floor', 'vertex');
shaders.load('fs-floor', 'floor', 'fragment');

function init() {
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
  scene = new THREE.Scene();

  cubeCamera = new THREE.CubeCamera(1, 100000, 128);
  scene.add(cubeCamera);

  // MATERIALS

  var cubeTarget = cubeCamera.renderTarget;

  controls = new Controls();

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;
  renderer.shadowMapType = THREE.PCFShadowMap

  document.body.appendChild(renderer.domElement);

  clock = new THREE.Clock();
  hall = new Hall();
  lights = new Lights();
  photos = new Photos();
  painting = new Painting();


  // prize = new Prize();
}

function animate() {
  time = clock.getElapsedTime();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  TWEEN.update();
  controls.update();
  hall.update();
  painting.update();
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

function map(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}

function hslToFillStyle(h, s, l, a) {
  if (a === undefined) {
    return ["hsl(", h, ",", s, "%,", l, "%)"].join('');
  } else {
    return ["hsla(", h, ",", s, "%,", l, "%,", a, ")"].join('');
  }
}