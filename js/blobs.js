var Blobs = function(){
  var localTimeStart = _.random(0, 9999);
  var localTime;
  var blobsMat = new THREE.ShaderMaterial({
    uniforms: {
      time: {
        type: 'f',
        value: 0.0
      },
      resolution: {
        type: 'v2',
        value: new THREE.Vector2(window.innerWidth, window.innerHeight)
      }
    },
    vertexShader: shaders.vertexShaders.ceiling,
    fragmentShader: shaders.fragmentShaders.blobs,
    side: THREE.DoubleSide,
  })
  var blobsMesh = new THREE.Mesh(new THREE.PlaneGeometry(250, 160), blobsMat);
  blobsMesh.position.set(hallWidth/2 - photoGap, photoHeight, -hallLength * 0.66 - 100);
  blobsMesh.rotation.y = -Math.PI/2;
  blobsMesh.castShadow = true;

  scene.add(blobsMesh);

  this.update = function(){
    localTime= time + localTimeStart;
    blobsMat.uniforms.time.value = localTime * .001;
  }
}