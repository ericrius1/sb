var photoSize = 60;
var photoHeight = 10;
var Photos = function() {

  //Doug guitar
  var photoGeo = new THREE.PlaneGeometry(566, 496);
  var photoMat = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('assets/doug.jpg')
  });
  var photoMesh = new THREE.Mesh(photoGeo, photoMat);
  photoMesh.position.set(wallSize/2 -1, photoSize/2 + photoHeight, 0);
  photoMesh.scale.multiplyScalar(0.1);
  photoMesh.rotation.y = -Math.PI/2;
  scene.add(photoMesh);

  //Bill and rick
  photoGeo = new THREE.PlaneGeometry(2048, 1152)
  photoMat = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('assets/billrick.jpg')
  });
  photoMesh = new THREE.Mesh(photoGeo, photoMat);
  photoMesh.scale.multiplyScalar(.04);
  photoMesh.position.set(-wallSize/2 + 1, photoSize/2 + photoHeight, 0);  
  photoMesh.rotation.y = Math.PI/2;
  scene.add(photoMesh);
}