var Anitra = function(){
  var photoMesh = new THREE.Mesh(new THREE.PlaneGeometry(540, 734));
  photoMesh.scale.multiplyScalar(0.3);
  photoMesh.rotation.y = Math.PI/2;
  photoMesh.position.set(-hallWidth / 2 + photoGap, photoHeight, -hallLength * 0.25)
  photoMesh.castShadow = true;
  scene.add(photoMesh);

}