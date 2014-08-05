//bunch of paricles that move and change color as you 
//move through them
var Floor = function() {
  var x, y;
  var floorGeo = new THREE.BoxGeometry(hallWidth, 50, hallLength)
  var floor = new THREE.Mesh(floorGeo);
  floor.position.z -= hallLength / 2;
  scene.add(floor);


  //SET UP PARTICLES
  var size = 1024;
  var points = randomPointsInGeometry(floor, size * size);

  var data = float32Array(size * size * 3);
  var point = new THREE.Vector3();
  for (var i = 0, j = 0, l = points.length; i < l; i++, j += 3;) {
    point = points[i];
    data[j] = point.x;
    data[j + 1] = point.y;
    data[j + 2] = point.z;
  }

  var originsTexture = new THREE.DataTexture(data, size, size, THREE.RGBFormat, THREE.FloatType);
  originsTexture.minFilter = THREE.NearestFilter;
  originsTexture.magFilter = THREE.NearestFilter;
  originsTexture.generateMipmaps = false;
  originsTexture.needsUpdate = true;

  var geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new Float32Array(size * size * 3), 3);
  var positions = geometry.addAttribute('position').array;
  //We create a buffer geometry with uv positions so we can access data from our data texture
  for (var i = 0, j = 0, l = positions.length / 3; i < l; i++, j += 3) {
    //we can leave j+2 blank because we only care about u and v coords- this is just for lookup
    positions[j] = (i % size) / size;
    positions[j + 1] = Math.floor(i / size) / size;
  }
  var rtTexturePos = new THREE.WebGLRenderTarget(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
    stencilBuffer: false
  });
  var uniforms = {
    "map": {
      type: 't',
      value: originsTexture
    }
  }
  var particleMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shaders.vertexShaders.floor,
      fragmentShader: shaders.fragmentShaders.floor
    }
  })
var floorFog = new THREE.PointCloud(geometry, particleMaterial);
scene.add(floorFog);



}