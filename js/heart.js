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
  spacedPoints.applyMatrix( new THREE.Matrix4().makeTranslation(5, 0, 0) );
  var heartMesh = new THREE.Mesh(spacedPoints);
  heartMesh.position.set(0, 140, -hallLength/2);
  heartMesh.rotation.z = Math.PI;
  heartMesh.scale.multiplyScalar(1.4);
  scene.add(heartMesh);
  var points = heartMesh.geometry.vertices;

  var pGroup = new SPE.Group({
    texture: new THREE.ImageUtils.loadTexture('assets/point.png'),
    maxAge: 6,
    blending: THREE.NormalBlending
  });
  for(var i = 0; i < numEmitters; i++){
    emitter = createEmitter(points[i]);
    pGroup.addEmitter(emitter);

  }

  heartMesh.add(pGroup.mesh);
  function createEmitter(position){
    var colorStart = new THREE.Color().setRGB(randFloat(0.8, 1.0), randFloat(0.1, 0.2), randFloat(0.3, 0.6))
    var colorMiddle = new THREE.Color().setRGB(randFloat(0.2, 0.4), randFloat(0.1, 0.4), randFloat(0.6, 0.9))
    return new SPE.Emitter({
      position: position,
      colorStart: colorStart,
      colorMiddle: colorMiddle,
      accelerationSpread: new THREE.Vector3(5, 5, 5),
      sizeStart: 15,
    });
  }

  this.update = function(){
    heartMesh.rotation.y += 0.01;
    pGroup.tick();
  }

}