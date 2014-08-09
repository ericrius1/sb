var scene, camera, controls, renderer, clock, time, lights, hall, photos, prize, shaders, painting, floor,blobs, 
dotphoto, billrick, linephoto, anitra;

shaders = new ShaderLoader('shaders');
shaders.shaderSetLoaded = function() {
  init();
  animate();
}

shaders.load('vs-ceiling', 'ceiling', 'vertex');
shaders.load('fs-ceiling', 'ceiling', 'fragment');
shaders.load('vs-floor', 'floor', 'vertex');
shaders.load('fs-floor', 'floor', 'fragment');
shaders.load('fs-floor-pass1', 'floorPass', 'fragment');
shaders.load('fs-blobs', 'blobs', 'fragment');


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
  floor = new Floor();
  photos = new Photos();
  painting = new Painting();
  blobs = new Blobs();
  dotphoto = new DotPhoto();
  billrick = new BillRick();
  linephoto = new LinePhoto();
  anitra = new Anitra();

}

function animate() {
  time = clock.getElapsedTime();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  TWEEN.update();
  controls.update();
  hall.update();
  painting.update();
  blobs.update();
  dotphoto.update();
  linephoto.update();
  billrick.update()
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

