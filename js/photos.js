var photoSize = 60;
var photoHeight = 30;
var Photos = function() {

  //Doug guitar
  var photoGeo = new THREE.PlaneGeometry(566, 496);
  var photoMat = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('assets/doug.jpg'),
  });
  var photoMesh = new THREE.Mesh(photoGeo, photoMat);
  photoMesh.position.set(hallWidth/2 -1, photoSize/2 + photoHeight, playerStartZ - 100);
  photoMesh.scale.multiplyScalar(0.15);
  photoMesh.rotation.y = -Math.PI/2;
  photoMesh.castShadow = true;
  photoMesh.recieveShadow = true;
  scene.add(photoMesh);

  //Bill and rick
  photoGeo = new THREE.PlaneGeometry(2048, 1152)
  photoMat = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('assets/billrick.jpg')
  });
  photoMesh = new THREE.Mesh(photoGeo, photoMat);
  photoMesh.scale.multiplyScalar(.05);
  photoMesh.position.set(-hallWidth/2 + 1, photoSize/2 + photoHeight, playerStartZ - 200);  
  photoMesh.rotation.y = Math.PI/2;
  scene.add(photoMesh);

  //Mike
  photoGeo = new THREE.PlaneGeometry(1837, 1144);
  photoMat = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('assets/mike.jpg')
  });
  photoMesh = new THREE.Mesh(photoGeo, photoMat);
  photoMesh.scale.multiplyScalar(0.06);
  photoMesh.position.set(hallWidth/2 -1, photoSize/2 + photoHeight, playerStartZ - 300);
  photoMesh.rotation.y = -Math.PI/2;
  scene.add(photoMesh);
}