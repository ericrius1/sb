var Hall = function() {
  var wallGeo = new THREE.PlaneGeometry(50, 50);
  var backWall = new THREE.Mesh(wallGeo);
  backWall.position.z = -20;
  scene.add(backWall);

  // var frontWall = backWall.clone();
  // frontWall.position.z = 20;
  // scene.add(frontWall);

  // var sideRightWall = backWall.clone();
  // sideRightWall.rotation.y = Math.PI/2;
  // sideRightWall.position.x = 20;
  // scene.add(sideRightWall);

  // var sideLeftWall = backWall.clone();
  // sideLeftWall.position.x = -20;
  // scene.add(sideLeftWall);

  // var topWall = backWall.clone();
  // topWall.rotation.x = -Math.PI/2;
  // topWall.position.y = 20;
  // scene.add(topWall);

  var bottomWall = backWall.clone();
  bottomWall.rotation.x = -Math.PI/2;
  scene.add(bottomWall);
}