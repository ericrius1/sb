var BillRick = function() {
  var data = {
    name: 'billrick.jpg',
    res: [1024, 576],
    scale: .30
  };
  var rastaColors = ['#a00515', '#fdba09', '#07532c'];

  var photoMat = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('assets/billrick.jpg'),
    side: THREE.DoubleSide,
    maxAge: 4
  })

  var createEmitter = function(position){
  return emitter = new SPE.Emitter({
    position: position,
    acceleration: new THREE.Vector3(-10, -1, 0),
    sizeStart: 10,
    particleCount: 1000
  })
    
  }

  var pGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/point.png')
  })
  pGroup.addEmitter(createEmitter(new THREE.Vector3(hallWidth / 2 - photoGap, photoHeight + 35, -hallLength / 2 - 91)));
  pGroup.addEmitter(createEmitter(new THREE.Vector3(hallWidth / 2 - photoGap, photoHeight + 36, -hallLength / 2 - 112)));
  scene.add(pGroup.mesh);

  var photoMesh = new THREE.Mesh(new THREE.PlaneGeometry(data.res[0], data.res[1]), photoMat);
  photoMesh.castShadow = true;
  photoMesh.position.set(hallWidth / 2 - photoGap, photoHeight, -hallLength / 2)
  photoMesh.scale.multiplyScalar(data.scale);
  photoMesh.rotation.y = -Math.PI / 2;
  scene.add(photoMesh);
  

  this.update = function() {

    pGroup.tick();
  }

}