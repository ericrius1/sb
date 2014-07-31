var scene, camera, controls, renderer, clock,time;

init();
animate();


function init() {
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
  camera.position.z = 100;
  scene = new THREE.Scene();

  controls = new THREE.OrbitControls(camera);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  // renderer.setClearColor(0xffffff);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  clock = new THREE.Clock();

  scene.add(new THREE.Mesh(new THREE.SphereGeometry(30, 30, 30)));
}

function animate() {
  time = clock.getElapsedTime();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  TWEEN.update();
  controls.update();
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