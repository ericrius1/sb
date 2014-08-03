var Floor = function() {
  var canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var canvasTexture = new THREE.Texture(canvas);
  canvasTexture.needsUpdate = true;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "rgba(255,0,0,0.95)";
  ctx.fillRect(100, 200, 100, 100)

  var floorMaterial = new THREE.MeshBasicMaterial({map: canvasTexture, side: THREE.DoubleSide});

  var floorGeo = new THREE.PlaneGeometry(hallLength, hallLength)
  var floor = new THREE.Mesh(floorGeo);
  floor.rotation.x = -Math.PI / 2;
  floor.position.z -= hallLength / 2;
  scene.add(floor);
}