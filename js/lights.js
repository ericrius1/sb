var Lights = function() {
  //color, intensity, distance
  var dirLightIntensity = 2.0
  var d = hallLength * 2;

  var dirLight = new THREE.DirectionalLight(0xffffff, dirLightIntensity);
  dirLight.position.set(-1000, 1000, -hallLength * 2);
  dirLight.target.position.set(0, 0, -hallLength / 2)
  dirLight.shadowCameraLeft = -d;
  dirLight.shadowCameraRight = d;
  dirLight.shadowCameraTop = d;
  dirLight.shadowCameraBottom = -d;
  dirLight.shadowCameraNear = 1;
  dirLight.shadowCameraFar = 20000;
  dirLight.shadowDarkness = 1.0;
  dirLight.castShadow = true;
  // dirLight.shadowCameraVisible = true;
  scene.add(dirLight);

  var dirLight = new THREE.DirectionalLight(0xffffff, dirLightIntensity);
  dirLight.position.set(1000, 1000, -hallLength * 2);
  dirLight.target.position.set(0, 0, -hallLength / 2)
  dirLight.shadowCameraLeft = -d;
  dirLight.shadowCameraRight = d;
  dirLight.shadowCameraTop = d;
  dirLight.shadowCameraBottom = -d;
  dirLight.shadowCameraNear = 1;
  dirLight.shadowCameraFar = 20000;
  dirLight.shadowDarkness = 1.0;
  dirLight.castShadow = true;
  // dirLight.shadowCameraVisible = true;
  scene.add(dirLight);



  this.update = function() {}
}