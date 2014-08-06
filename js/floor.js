var Floor = function() {
  var x, y;
  var flipflop = false;
  var size = 1024;
  var rtTexture = new THREE.WebGLRenderTarget(size, size,{
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
    stencilBuffer: false
  });
  var rtTexture2 = rtTexture.clone();

  var sceneRTT = new THREE.Scene();
  var cameraRTT = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1);
  var simulationMaterial = new THREE.ShaderMaterial({
    uniforms: {
      playerPosition: {
        type: 'v2',
        value: new THREE.Vector2()
      },
      state: {
        type: 't',
        value: rtTexture2
      },
      time: {
        type: 'f',
        value: 0.0
      }
    },
    vertexShader: shaders.vertexShaders.floor,
    fragmentShader: shaders.fragmentShaders.floorPass
  });
  var mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), simulationMaterial);
  sceneRTT.add(mesh);

  var floorMaterial = new THREE.ShaderMaterial({
    uniforms: {
      map: {
        type: 't',
        value: rtTexture
      },
    },
    vertexShader: shaders.vertexShaders.floor,
    fragmentShader: shaders.fragmentShaders.floor
  });

  
  var floorGeo = new THREE.PlaneGeometry(hallLength, hallLength)
  var floor = new THREE.Mesh(floorGeo);
  floor.rotation.x = -Math.PI / 2;
  floor.position.z -= hallLength / 2;
  scene.add(floor);

  this.update = function() {

    if(flipflop){
      simulationMaterial.uniforms.state.value = rtTexture;
      renderer.render(sceneRTT, cameraRTT, rtTexture2, false);
    }
    else{
      simulationMaterial.uniforms.state.value = rtTexture2;
      renderer.render(sceneRTT,cameraRTT, rtTexture, false);
    }
    flipflop = !flipflop
    x = map(controlObject.position.x, -hallWidth / 2, hallWidth / 2, 0, 1);
    y = map(controlObject.position.z, -hallLength, 0, 1, 0);
    
    simulationMaterial.uniforms.time.value = time;
    simulationMaterial.uniforms.playerPosition.value.set(x,y);


  }
}