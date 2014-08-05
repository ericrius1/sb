
var Floor = function() {

  var floorMaterial = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide
  });

  var floorGeo = new THREE.PlaneGeometry(hallLength, hallLength)
  var floor = new THREE.Mesh(floorGeo, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.z -= hallLength / 2;
  scene.add(floor);

  this.update = function() {

  }
}
