var Floor2 = function() {
  var x, y;
  var uniforms = {
    time: {
      type: 'f',
      value: 0.0
    },
    playerPos: {
      type: 'v2',
      value: new THREE.Vector2(0, 0)
    }
  }
  var floorMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shaders.vertexShaders.floor2,
    fragmentShader: shaders.fragmentShaders.floor2
  });
  var floorGeo = new THREE.PlaneGeometry(hallLength, hallLength)
  var floor = new THREE.Mesh(floorGeo, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.z -= hallLength / 2;
  scene.add(floor);

  this.update = function() {
    var uTime = time * .1;
    x = map(controlObject.position.x, -hallWidth / 2, hallWidth / 2, 0, 1);
    y = map(controlObject.position.z, -hallLength, 0, 1, 0);
    floorMaterial.uniforms.time.value = uTime;
    floorMaterial.uniforms.playerPos.value.set(x, y);

  }
}