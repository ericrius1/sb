var Lights = function() {
  //color, intensity, distance
  var dirLightIntensity = 2.2
  var d = hallLength * 2;
  var darkness = 0.5


  //left to right
  var dirLight = new THREE.DirectionalLight(0xffffff, dirLightIntensity);
  dirLight.position.set(-hallWidth/2, 500, -hallLength/2);
  dirLight.target.position.set(hallWidth/2, 0, -hallLength/2 + 1000)
  dirLight.shadowCameraLeft = -d;
  dirLight.shadowCameraRight = d;
  dirLight.shadowCameraTop = d;
  dirLight.shadowCameraBottom = -d;
  dirLight.shadowCameraNear = 1;
  dirLight.shadowCameraFar = 2000;
  dirLight.shadowDarkness = darkness;
  dirLight.castShadow = true;
  // dirLight.shadowCameraVisible = true;
  dirLight.shadowMapWidth = 2048;
  dirLight.shadowMapHeight = 2048;
  scene.add(dirLight);

  //right to left
  dirLight = new THREE.DirectionalLight(0xffffff, dirLightIntensity);
  dirLight.position.set(hallWidth/2, 500, -hallLength/2);
  dirLight.target.position.set(-hallWidth/2, 0, -hallLength / 2 - 1000)
  dirLight.shadowCameraLeft = -d;
  dirLight.shadowCameraRight = d;
  dirLight.shadowCameraTop = d;
  dirLight.shadowCameraBottom = -d;
  dirLight.shadowCameraNear = 1;
  dirLight.shadowCameraFar = 2000;
  dirLight.shadowDarkness = darkness;
  dirLight.shadowMapWidth = 2048;
  dirLight.shadowMapHeight = 2048;
  dirLight.castShadow = true;
  // dirLight.shadowCameraVisible = true;
  scene.add(dirLight);





  this.update = function() {


  }
}