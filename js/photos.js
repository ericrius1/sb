var photoHeight = 100;
var photoGap = 5
var Photos = function() {
  var photoGap = 5;
  //Doug guitar
  var photoGeo = new THREE.PlaneGeometry(566, 496);
  var photoMat = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('assets/doug.jpg'),
    side: THREE.DoubleSide
  });

  var photoMesh = new THREE.Mesh(photoGeo, photoMat);
  photoMesh.position.set(hallWidth/2 -photoGap, photoHeight, playerStartZ - 100);
  photoMesh.scale.multiplyScalar(0.15);
  photoMesh.rotation.y = -Math.PI/2;
  photoMesh.castShadow = true;
  scene.add(photoMesh);

  //Bill and rick
  photoGeo = new THREE.PlaneGeometry(2048, 1152)
  photoMat = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('assets/billrick.jpg'),
    side: THREE.DoubleSide
  });
  photoMesh = new THREE.Mesh(photoGeo, photoMat);
  photoMesh.scale.multiplyScalar(.05);
  photoMesh.position.set(-hallWidth/2 + photoGap, photoHeight, playerStartZ - 200);  
  photoMesh.rotation.y = Math.PI/2;
  photoMesh.castShadow = true;
  scene.add(photoMesh);

  //Mike
  photoGeo = new THREE.PlaneGeometry(1837, 1144);
  photoMat = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('assets/mike.jpg'),
    side: THREE.DoubleSide
  });
  photoMesh = new THREE.Mesh(photoGeo, photoMat);
  photoMesh.scale.multiplyScalar(0.06);
  photoMesh.position.set(hallWidth/2 -photoGap, photoHeight, playerStartZ - 300);
  photoMesh.rotation.y = -Math.PI/2;
  photoMesh.castShadow = true;
  scene.add(photoMesh);


  //CJ KIA KYLE
  photoGeo = new THREE.PlaneGeometry(605, 466);
  photoMat = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('assets/cjkiakyle.jpg'),
    side: THREE.DoubleSide
  });
  photoMesh = new THREE.Mesh(photoGeo, photoMat);
  photoMesh.scale.multiplyScalar(0.14 );
  photoMesh.position.set(-hallWidth/2 +photoGap, photoHeight, playerStartZ - 400);
  photoMesh.rotation.y = Math.PI/2;
  photoMesh.castShadow = true;
  scene.add(photoMesh);

  //Rel Kendra
  photoGeo = new THREE.PlaneGeometry(960, 720);
  photoMat = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('assets/relkendra.jpg'),
    side: THREE.DoubleSide
  });
  photoMesh = new THREE.Mesh(photoGeo, photoMat);
  photoMesh.scale.multiplyScalar(0.11 );
  photoMesh.position.set(hallWidth/2 -photoGap, photoHeight, playerStartZ - 500);
  photoMesh.rotation.y = -Math.PI/2;
  photoMesh.castShadow = true;
  scene.add(photoMesh);
}