var BillRick = function() {
  var data = {
    name: 'billrick.jpg',
    res: [1024, 576],
    scale: .30
  };
  var rastaColors = [0xa00515, 0xfdba09, 0x07532c];

  var photoMat = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('assets/billrick.jpg'),
    side: THREE.DoubleSide,
  })

  var createEmitter = function(position, color){
  return emitter = new SPE.Emitter({
    position: position,
    acceleration: new THREE.Vector3(-10, -1, 0),
    accelerationSpread: new THREE.Vector3(2, 2, 2),
    sizeStart: 50,
    particleCount: 100,
    colorStart: new THREE.Color(color)
  })
    
  }

  var pGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/star.png'),
    maxAge: 5,
    blending: THREE.NormalBlending,
  })
  var pos = new THREE.Vector3(hallWidth / 2 - photoGap, photoHeight + 35, -hallLength / 2 - 91)
  pGroup.addEmitter(createEmitter(pos, rastaColors[0]));
  pGroup.addEmitter(createEmitter(pos, rastaColors[1]));
  pGroup.addEmitter(createEmitter(pos, rastaColors[2]));
  pos = new THREE.Vector3(hallWidth / 2 - photoGap, photoHeight + 36, -hallLength / 2 - 112);
  pGroup.addEmitter(createEmitter(pos, rastaColors[0]));
  pGroup.addEmitter(createEmitter(pos, rastaColors[1]));
  pGroup.addEmitter(createEmitter(pos, rastaColors[2]));
  scene.add(pGroup.mesh);

  var photoMesh = new THREE.Mesh(new THREE.PlaneGeometry(data.res[0], data.res[1]), photoMat);
  photoMesh.castShadow = true;
  photoMesh.position.set(hallWidth / 2 - photoGap + 1, photoHeight, -hallLength / 2)
  photoMesh.scale.multiplyScalar(data.scale);
  photoMesh.rotation.y = -Math.PI / 2;
  scene.add(photoMesh);
  

  this.update = function() {

    pGroup.tick();
  }

}