var Lights = function (){
  //color, intensity, distance
  var color = 0xffffff;
  var intensity = 2.5;
  var pointLight = new THREE.PointLight(color,1);
  var pointMesh = new THREE.Mesh(new THREE.SphereGeometry(2,2));
  scene.add(pointLight);
  pointLight.add(pointMesh);

  this.update = function(){
    pointLight.position.z = Math.sin(time) * 50;
  }
}