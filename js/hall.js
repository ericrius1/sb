var Hall = function() {
  var wallSize = 200;

  var hallMat = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
  var wallGeo = new THREE.PlaneGeometry(wallSize, wallSize);
  var backWall = new THREE.Mesh(wallGeo, hallMat);
  backWall.position.z = -wallSize/2;
  backWall.position.y = wallSize/2;
  scene.add(backWall);

  var frontWall = backWall.clone();
  frontWall.position.z = wallSize/2;
  frontWall.position.y = wallSize/2;
  scene.add(frontWall);

  var sideRightWall = backWall.clone();
  sideRightWall.position.x = wallSize/2;
  sideRightWall.rotation.y = Math.PI/2;
  sideRightWall.position.z += wallSize/2;
  scene.add(sideRightWall);

  var sideLeftWall = backWall.clone();
  sideLeftWall.position.x = -wallSize/2;
  sideLeftWall.rotation.y = Math.PI/2;
  sideLeftWall.position.z += wallSize/2;
  scene.add(sideLeftWall);

  var topWall = backWall.clone();
  topWall.rotation.x = Math.PI/2;
  topWall.position.y = wallSize;
  topWall.position.z += wallSize/2;
  scene.add(topWall);

  // var bottomWall = backWall.clone();
  // bottomWall.rotation.x = -Math.PI/2;
  // scene.add(bottomWall);
}