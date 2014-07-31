var Lights = function (){
  //color, intensity, distance

  var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.2 );
  directionalLight.position.set( 1, 0, 0 );
  scene.add( directionalLight );

  directionalLight = new THREE.DirectionalLight( 0xffffff, 0.2 );
  directionalLight.position.set( -1, 1, 0 );
  scene.add( directionalLight );

  var color = 0xffffff;
  var intensity = 2.5;
  var distance = 500;
  var pointLight = new THREE.PointLight(color,1, distance);
  var pointMesh = new THREE.Mesh(new THREE.SphereGeometry(2,2));
  controlObject.add(pointLight);
  pointLight.add(pointMesh);

  pointLight.position.y = photoSize/2 + photoHeight;

  this.update = function(){
  }
}