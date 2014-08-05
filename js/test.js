var Test = function(){
  var group = new SPE.Group({
    texture: new THREE.ImageUtils.loadTexture('assets/point.png')
  });
  var emitter = new SPE.Emitter({
    position: new THREE.Vector3(0, 30, -hallLength/2),
    accelerationSpread: new THREE.Vector3(1,1,1),
    particleCount: 10000
  });
  group.addEmitter(emitter);
  scene.add(group.mesh);

  this.update = function(){
    group.tick()
  }
}