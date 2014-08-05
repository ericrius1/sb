//bunch of paricles that move and change color as you 
//move through them
var Floor = function() {
  var x, y, z;
  var floorHeight = 50;

  //SET UP PARTICLES
  var size = 1024;
  var numPoints = size * size * 3;
  var data = new Float32Array(size * size * 3);
  var point = new THREE.Vector3();
  for (var i = 0, j = 0; i < numPoints; i++, j += 3) {
    //create a random point in room within specified height range
    data[j] = randFloat(-hallLength/2, hallLength/2);//x
    data[j + 1] = randFloat(0, floorHeight);//y
    data[j + 2] = randFloat(-hallLength, 0);//z
  }

  var simulationShader = new GPGPU.SimulationShader();

  var originsTexture = new THREE.DataTexture(data, size, size, THREE.RGBFormat, THREE.FloatType);
  originsTexture.minFilter = THREE.NearestFilter;
  originsTexture.magFilter = THREE.NearestFilter;
  originsTexture.generateMipmaps = false;
  originsTexture.needsUpdate = true;

  simulationShader.material.uniforms.tOrigins.value = originsTexture;

  var geometry = new THREE.BufferGeometry();
  var positions = new Float32Array(size * size * 3);
  //We create a buffer geometry with uv positions so we can access data from our data texture
  for (var i = 0, j = 0, l = positions.length / 3; i < l; i++, j += 3) {
    //we can leave j+2 blank because we only care about u and v coords- this is just for lookup
    positions[j] = (i % size) / size;
    positions[j + 1] = Math.floor(i / size) / size;
  }
  geometry.addAttribute('position', new THREE.BufferAttribute(positions,3));
  var rtTexturePos = new THREE.WebGLRenderTarget(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
    stencilBuffer: false
  });
  var rtTexturePos2 = rtTexturePos.clone();
  var uniforms = {
    "map": {
      type: 't',
      value: originsTexture
    }
  }
  var particleMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shaders.vertexShaders.floor,
    fragmentShader: shaders.fragmentShaders.floor,
    blending: THREE.AdditiveBlending,
  })
  var floorFog = new THREE.PointCloud(geometry, particleMaterial);
  scene.add(floorFog);

  this.update = function(){
    gpgpu.pass(simulationShader, rtTexturePos2);
    particleMaterial.uniforms.map.value = rtTexturePos;

  }
}