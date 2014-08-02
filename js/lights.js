var Lights = function() {
  //color, intensity, distance
  var dirLightIntensity = 2.0
  var dirLight = new THREE.DirectionalLight(0xff00ff, dirLightIntensity);
  dirLight.position.set(-1000, 1000, -hallLength/2);
  dirLight.castShadow = true;
  dirLight.shadowCameraVisible = true;


  scene.add(dirLight);
  dirLight.target.position.set(0, 0, -hallLength/2)
  var d = hallLength;

  dirLight.shadowCameraLeft = -d;
  dirLight.shadowCameraRight = d;
  dirLight.shadowCameraTop = d;
  dirLight.shadowCameraBottom = -d;
  dirLight.shadowCameraNear = 1;

  dirLight.shadowCameraFar = 2000;
  dirLight.shadowDarkness = 1.0;



  // var color = 0xffffff;
  // var intensity = 0.5;
  // var distance = 500;
  // var pointLight = new THREE.PointLight(color, 1, distance);
  // var pointMesh = new THREE.Mesh(new THREE.SphereGeometry(2, 2));
  // controlObject.add(pointLight);
  // pointLight.add(pointMesh);

  // pointLight.position.y = photoSize / 2 + photoHeight;

  this.update = function() {}
}