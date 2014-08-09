var Heart = function() {
  var emitters = [];
  var emitter;
  var x = 0,
    y = 0;

  var numEmitters = 100;
  var heartShape = new THREE.Shape(); // From http://blog.burlock.org/html5/130-paths

  heartShape.moveTo(x + 25, y + 25);
  heartShape.bezierCurveTo(x + 25, y + 25, x + 20, y, x, y);
  heartShape.bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35);
  heartShape.bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95);
  heartShape.bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35);
  heartShape.bezierCurveTo(x + 80, y + 35, x + 80, y, x + 50, y);
  heartShape.bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);

  var spacedPoints = heartShape.createSpacedPointsGeometry(numEmitters);
  var heartMesh = new THREE.Mesh(spacedPoints);
  heartMesh.position.set(0, 100, -hallLength/2);
  heartMesh.rotation.z = Math.PI;
  scene.add(heartMesh);
  var points = heartMesh.geometry.vertices;

  var pGroup = new SPE.Group({
    texture: new THREE.ImageUtils.loadTexture('assets/point.png')
  });
  for(var i = 0; i < numEmitters; i++){
    emitter = createEmitter(points[i]);
    console.log(points[i])
    pGroup.addEmitter(emitter);

  }

  heartMesh.add(pGroup.mesh);
  function createEmitter(position){
    return new SPE.Emitter({
      position: position,
      accelerationSpread: new THREE.Vector3(5, 5, 5),
      sizeStart: 10
    });
  }

  this.update = function(){
    pGroup.tick();
  }

}