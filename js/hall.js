var wallSize = 150;
var Hall = function() {

  var wallGeo = new THREE.PlaneGeometry(wallSize, wallSize);

  var backWallMat = new THREE.MeshLambertMaterial({color: 0x00ff00});
  var backWall = new THREE.Mesh(wallGeo, backWallMat);
  backWall.position.z = -wallSize/2;
  backWall.position.y = wallSize/2;
  scene.add(backWall);

  var frontWallMat = new THREE.MeshLambertMaterial({color:0xff0000, side: THREE.DoubleSide});
  var frontWall = new THREE.Mesh(wallGeo, frontWallMat);
  frontWall.position.z = wallSize/2;
  frontWall.position.y = wallSize/2;
  scene.add(frontWall);

  var sideRightWallMat = new THREE.MeshLambertMaterial({color: 0xff00ff, side: THREE.DoubleSide});
  var sideRightWall = new THREE.Mesh(wallGeo, sideRightWallMat);
  sideRightWall.rotation.y = Math.PI/2;
  sideRightWall.position.x = wallSize/2;
  sideRightWall.position.y += wallSize/2;
  scene.add(sideRightWall);

  var sideLeftWallMat = new THREE.MeshLambertMaterial({color: 0x0000ff, side: THREE.DoubleSide});
  var sideLeftWall = new THREE.Mesh(wallGeo, sideLeftWallMat);
  sideLeftWall.rotation.y = Math.PI/2;
  sideLeftWall.position.x = -wallSize/2;
  sideLeftWall.position.y += wallSize/2;
  scene.add(sideLeftWall);

  // var topWallMat = new THREE.MeshLambertMaterial();;
  // var topWall = new THREE.Mesh(wallGeo, topWallMat);
  // topWall.position.y = wallSize;
  // topWall.position.z += wallSize/2;
  // topWall.rotation.x = -Math.PI/2;
  // scene.add(topWall);

  // var bottomWall = backWall.clone();
  // bottomWall.rotation.x = -Math.PI/2;
  // scene.add(bottomWall);
}