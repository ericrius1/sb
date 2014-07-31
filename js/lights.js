var Lights = function (){
  //color, intensity, distance
  var color = 0xff0000;
  var intensity = 2.5;
  var pointLight = new THREE.PointLight(color,1, 80);
  var pointMesh = new THREE.Mesh(new THREE.SphereGeometry(2,2));
  pointMesh.position.z = -22;
  scene.add(pointLight);
  pointLight.add(pointMesh);

  this.update = function(){
    pointLight.position.x = Math.sin(time) * 20;
  }
}