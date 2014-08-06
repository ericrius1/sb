var Floor = function() {
  var x, y;

  var sceneRTT = new THREE.Scene();
  var cameraRTT = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1);
  var mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1));
  sceneRTT.add(mesh);
  var size = 1024;
  var rtTexture = new THREE.WebGLRenderTarget(size, size,{
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
    stencilBuffer: false
  });

  var floorMaterial = new THREE.ShaderMaterial({
    uniforms: {
      map: {
        type: 't',
        value: rtTexture
      },
      playerPosition: {
        type: 'v2',
        value: new THREE.Vector2()
      }
    },
    vertexShader: shaders.vertexShaders.floor,
    fragmentShader: shaders.fragmentShaders.floor
  });

  
  var floorGeo = new THREE.PlaneGeometry(hallLength, hallLength)
  var floor = new THREE.Mesh(floorGeo, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.z -= hallLength / 2;
  scene.add(floor);

  this.update = function() {
    renderer.render(sceneRTT,cameraRTT, rtTexture, false);
    x = map(controlObject.position.x, -hallWidth / 2, hallWidth / 2, 0, 1);
    y = map(controlObject.position.z, -hallLength, 0, 1, 0);
  }
}