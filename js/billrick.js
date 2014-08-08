var BillRick = function() {
  var data = {
    name: 'billrick.jpg',
    res: [1024, 576],
    scale: .30
  };
  var rastaColors = ['#a00515', '#fdba09', '#07532c'];

  var photoMat = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('assets/billrick.jpg'),
    side: THREE.DoubleSide
  })

  var photoMesh = new THREE.Mesh(new THREE.PlaneGeometry(data.res[0], data.res[1]), photoMat);
  photoMesh.castShadow = true;
  photoMesh.position.set(hallWidth / 2 - photoGap, photoHeight, -hallLength / 2)
  photoMesh.scale.multiplyScalar(data.scale);
  photoMesh.rotation.y = -Math.PI / 2;
  scene.add(photoMesh);
  this.update = function() {
  }



}