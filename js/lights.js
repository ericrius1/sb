var Lights = function (){
  //color, intensity, distance
  var dirLightIntensity = 0.7
  var directionalLight = new THREE.DirectionalLight( 0xffffff, dirLightIntensity );
  directionalLight.position.set( 1, 0, 0 );
  scene.add( directionalLight );

  directionalLight = new THREE.DirectionalLight( 0xffffff, dirLightIntensity);
  directionalLight.position.set( -1, 0, 0 );
  scene.add( directionalLight );

  directionalLight = new THREE.DirectionalLight( 0xffffff, dirLightIntensity);
  directionalLight.position.set( 0, 0, 1 );
  scene.add( directionalLight );

  var color = 0xffffff;
  var intensity = 0.5;
  var distance = 500;
  var pointLight = new THREE.PointLight(color,1, distance);
  var pointMesh = new THREE.Mesh(new THREE.SphereGeometry(2,2));
  controlObject.add(pointLight);
  pointLight.add(pointMesh);

  pointLight.position.y = photoSize/2 + photoHeight;

  this.update = function(){
  }
}