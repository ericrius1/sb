var wallHeight = 150;
var hallWidth = 150;
var hallLength = 1000;
var Hall = function() {

  //because of rotation!
  var hallGeo = new THREE.PlaneGeometry(hallLength, hallWidth, 10, 2);


  var backWallMat = new THREE.MeshLambertMaterial({color:0xff0000, side: THREE.DoubleSide});
  var backWall = new THREE.Mesh(new THREE.PlaneGeometry(hallWidth, hallWidth), backWallMat);
  backWall.position.y = hallWidth/2;
  scene.add(backWall);

  var sideRightWallMat = new THREE.MeshLambertMaterial({color: 0xff00ff, side: THREE.DoubleSide});
  var sideRightWall = new THREE.Mesh(hallGeo, sideRightWallMat);
  sideRightWall.rotation.y = Math.PI/2;
    sideRightWall.position.x = hallWidth/2;
    sideRightWall.position.z -= hallLength/2;
    sideRightWall.position.y += hallWidth/2;
  scene.add(sideRightWall);

  var sideLeftWallMat = new THREE.MeshLambertMaterial({color: 0x0000ff, side: THREE.DoubleSide});
  var sideLeftWall = new THREE.Mesh(hallGeo, sideLeftWallMat);
  sideLeftWall.rotation.y = Math.PI/2;
  sideLeftWall.position.x = -hallWidth/2;
  sideLeftWall.position.z -= hallLength/2;
  sideLeftWall.position.y += hallWidth/2;
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
  var floorGeo = new THREE.PlaneGeometry(hallLength, hallWidth)
  var bottomWall = new THREE.Mesh(floorGeo, floorMaterial);
  bottomWall.rotation.x = -Math.PI/2;
  bottomWall.rotation.z = Math.PI/2;
  bottomWall.position.z -= hallLength/2;
  scene.add(bottomWall);

  this.update = function(){
    floorMaterial.uniforms.time.value = time * .1;
  }

}