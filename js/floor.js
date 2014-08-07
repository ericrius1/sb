var Floor = function() {
  var emitters = [];
  var distance, target;
  var numEmitters = 1000;
  var pGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/point.png'),
    blending: THREE.NormalBlending,
    maxAge: 2
  });
  createFloor();
  var hugeAccelSpread = new THREE.Vector3(200, 10, 200);
  var normalAccelSpread = new THREE.Vector3(1, 2, 1);

  function createEmitter(position) {
    return new SPE.Emitter({
      position: position,
      positionSpread: new THREE.Vector3(50, 0, 50),
      accelerationSpread:normalAccelSpread,
      sizeStart: 50,
      sizeStartSpread: 50,
      particleCount: 100,
      opacityStart: 0,
      opacityMiddle: 1,
      colorStart: new THREE.Color(Math.random(), Math.random(), Math.random()),
      colorStartSpread: new THREE.Vector3(.5, 0.5, 0.5),
      sizeEnd: 20
    });
  }

  function createFloor() {
    for (var i =0; i < numEmitters; i++) {
      emitter = createEmitter(new THREE.Vector3(randFloat(-hallLength/2, hallLength/2), 0, randFloat(-hallLength, 0)));
      pGroup.addEmitter(emitter);
      emitters.push(emitter);
    }
    scene.add(pGroup.mesh);
  }

  function repulse(){
    target = controlObject.position.clone();
    target.y = 0;
    _.each(emitters, function(emitter){
      distance = emitter.position.distanceTo(target);
      if(distance < 200){
        emitter.accelerationSpread = hugeAccelSpread;
      }
      else{
        emitter.accelerationSpread = normalAccelSpread;
      }
    })

  }


  this.update = function() {
    pGroup.tick();
    repulse();
  }

}