var scene, camera, controls, renderer, clock,time, lights, hall;

init();
animate();


function init() {
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
  camera.position.z = 10;
  scene = new THREE.Scene();

  controls = new THREE.OrbitControls(camera);

  renderer = new THREE.WebGLRenderer({});
  // renderer.setClearColor(0xffffff);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  clock = new THREE.Clock();

  var photoGeo = new THREE.PlaneGeometry(10, 10);
  var photoMat = new THREE.MeshBasicMaterial({map : THREE.ImageUtils.loadTexture('assets/doug.jpg')});
  var photoMesh = new THREE.Mesh(photoGeo, photoMat);
  scene.add(photoMesh);

  var photo2Mat = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('assets/billrick.jpg')});
  var photoMesh2 = new THREE.Mesh(photoGeo, photo2Mat);
  photoMesh2.position.x = 20;
  scene.add(photoMesh2);

  hall = new Hall();
  lights = new Lights();
}

function animate() {
  time = clock.getElapsedTime();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  TWEEN.update();
  controls.update();
  lights.update();
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