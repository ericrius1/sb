var Lights = function (){
  //color, intensity, distance

  var ambientLight = new THREE.AmbientLight(0xffffff);
  // scene.add(ambientLight);
  var color = 0xff00ff;
  var intensity = 2.5;
  var pointLight = new THREE.PointLight(color,1);
  var pointMesh = new THREE.Mesh(new THREE.SphereGeometry(2,2));
  controlObject.add(pointLight);
  pointLight.add(pointMesh);

  pointLight.position.y = photoSize/2 + photoHeight;

  this.update = function(){
  }
}