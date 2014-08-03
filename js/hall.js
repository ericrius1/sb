var wallHeight = 150;
var hallWidth = 250;
var hallLength = 1100;
var Hall = function() {

  //because of rotation!
  var hallGeo = new THREE.PlaneGeometry(hallLength, wallHeight, 10, 2);

  var imgTexture = THREE.ImageUtils.loadTexture('assets/wall.jpg');
  imgTexture.anisotropy = renderer.getMaxAnisotropy();
  var wallMaterial = new THREE.MeshPhongMaterial(
    {
      map: imgTexture, 
      bumpMap: imgTexture,
      bumpScale: 3,
      shininess: 80,
    }
  )
  // var testMaterial = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, color: 0xf});
  var sideRightWall = new THREE.Mesh(hallGeo, wallMaterial);
  sideRightWall.rotation.y = -Math.PI/2;
    sideRightWall.position.x = hallWidth/2;
    sideRightWall.position.z -= hallLength/2;
    sideRightWall.position.y += wallHeight/2;
  sideRightWall.receiveShadow = true;
  scene.add(sideRightWall);

  wallMaterial = new THREE.MeshPhongMaterial(
    {
      map: imgTexture, 
      bumpMap: imgTexture,
      bumpScale: 3,
      shininess: 80,
    }
  )
  var sideLeftWall = new THREE.Mesh(hallGeo, wallMaterial);
  sideLeftWall.rotation.y = Math.PI/2;
  sideLeftWall.position.x = -hallWidth/2;
  sideLeftWall.position.z -= hallLength/2;
  sideLeftWall.position.y += wallHeight/2;
  sideLeftWall.receiveShadow = true;
  scene.add(sideLeftWall);


  var uniforms = {
    time : {
      type: 'f',
      value: 0.0
    }
  }
  var floorMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shaders.vertexShaders.floor,
    fragmentShader: shaders.fragmentShaders.floor
  })
  var floorGeo = new THREE.PlaneGeometry(hallLength, hallLength)
  var bottomWall = new THREE.Mesh(floorGeo, floorMaterial);
  bottomWall.rotation.x = -Math.PI/2;
  bottomWall.rotation.z = -Math.PI/2;
  bottomWall.position.z -= hallLength/2;
  scene.add(bottomWall);


  // var backWallGeo = new THREE.PlaneGeometry(hallWidth, wallHeight);
  // imgTexture = THREE.ImageUtils.loadTexture('assets/backwall.jpg');
  // var backWallMaterial = new THREE.MeshPhongMaterial({
  //   map: imgTexture,
  //   bumpMap: imgTexture,
  //   side: THREE.DoubleSide
  // })
  // var backWall = new THREE.Mesh(backWallGeo, backWallMaterial);
  // backWall.rotation.y = Math.PI;
  // backWall.position.y += wallHeight/2;
  // scene.add(backWall);

  this.update = function(){
    var uTime = time * .1;
    floorMaterial.uniforms.time.value = uTime;
  }

}