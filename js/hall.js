var wallHeight = 250;
var hallWidth = 1500;
var hallLength = 1500;
var Hall = function() {

  //because of rotation!
  var hallGeo = new THREE.PlaneGeometry(hallLength, wallHeight, 10, 2);

  var imgTexture = THREE.ImageUtils.loadTexture('assets/wall.jpg');
  imgTexture.anisotropy = renderer.getMaxAnisotropy();
  var wallMaterial = new THREE.MeshPhongMaterial({
      map: imgTexture,
      bumpMap: imgTexture,
      bumpScale: 3,
      shininess: 80,
    })
    // var testMaterial = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, color: 0xf});
  var sideRightWall = new THREE.Mesh(hallGeo, wallMaterial);
  sideRightWall.rotation.y = -Math.PI / 2;
  sideRightWall.position.x = hallWidth / 2;
  sideRightWall.position.z -= hallLength / 2;
  sideRightWall.position.y += wallHeight / 2;
  sideRightWall.receiveShadow = true;
  scene.add(sideRightWall);


  var sideLeftWall = new THREE.Mesh(hallGeo, wallMaterial);
  sideLeftWall.rotation.y = Math.PI / 2;
  sideLeftWall.position.x = -hallWidth / 2;
  sideLeftWall.position.z -= hallLength / 2;
  sideLeftWall.position.y += wallHeight / 2;
  sideLeftWall.receiveShadow = true;
  scene.add(sideLeftWall);

  var backWall = new THREE.Mesh(hallGeo, wallMaterial);
  backWall.position.y += wallHeight / 2;
  backWall.rotation.y = -Math.PI;
  scene.add(backWall)

  var frontWall = new THREE.Mesh(hallGeo, wallMaterial);
  frontWall.position.y += wallHeight / 2;
  frontWall.position.z -= hallLength;
  scene.add(frontWall)



  var uniforms = {
    time: {
      type: 'f',
      value: 0.0
    }
  }
  var ceilingMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shaders.vertexShaders.floor,
    fragmentShader: shaders.fragmentShaders.floor
  })

  var ceilingGeo  = new THREE.PlaneGeometry(hallLength, hallLength)
  var ceiling = new THREE.Mesh(ceilingGeo, ceilingMaterial);
  ceiling.position.y += wallHeight;
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.z -= hallLength / 2;
  scene.add(ceiling);

  var floor = new Floor();


  this.update = function() {
    var uTime = time * .1;
    ceilingMaterial.uniforms.time.value = uTime;
  }

}