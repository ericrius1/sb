var Prize = function(){
  //SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
  var sphereGeo = new THREE.SphereGeometry(50, 10, 10, 0, Math.PI * 2, 0, Math.PI/2 );
  var sphereMat = new THREE.MeshBasicMaterial({color: 0xa6a6a6});
  var sphere = new THREE.Mesh(sphereGeo, sphereMat);
  sphere.position.z = -500;
  sphere.position.y -= 5;
  scene.add(sphere);

  var color = 0xffffff;
  var intensity = 2.5;
  var distance = 500;
  var pointLight = new THREE.PointLight(color,1, distance);
  var pointMesh = new THREE.Mesh(new THREE.SphereGeometry(2,2));
  scene.add(pointLight);
  pointLight.position.set(0, 20, -500);
  pointLight.add(pointMesh);

  this.update = function(){
    sphere.position.y += 0.5;

  }
}