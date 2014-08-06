var Blobs = function(){
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
    side: THREE.DoubleSide
  })
  var blobsMesh = new THREE.Mesh(new THREE.PlaneGeometry(250, 200), blobsMat);
  blobsMesh.position.set(hallWidth/2 - photoGap, photoHeight, -hallLength * 0.66 - 100);
  blobsMesh.rotation.y = -Math.PI/2;
  blobsMesh.castShadow = true;

  scene.add(blobsMesh);

  this.update = function(){
    blobsMat.uniforms.time.value = time * 0.5;
  }
}