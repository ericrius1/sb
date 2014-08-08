var Floor = function() {
  var floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(hallWidth, hallLength));
  floorMesh.rotation.x = - Math.PI/2;
  floorMesh.position.z -= hallLength/2;
  scene.add(floorMesh)

}