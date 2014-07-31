var Lights = function (){
  //color, intensity, distance
  var color = 0xffffff;
  var intensity = 2.5;
  var pointLight = new THREE.PointLight(color,1);
  var pointMesh = new THREE.Mesh(new THREE.SphereGeometry(2,2));
  controlObject.add(pointLight);
  pointLight.add(pointMesh);

  pointLight.position.y = photoSize/2 + photoHeight;

  this.update = function(){
  }
}