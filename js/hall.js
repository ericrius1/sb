var Hall = function(){
  var hallGeo = new THREE.BoxGeometry(100, 100, 100);
  var hallMat = new THREE.MeshBasicMaterial({color: 0xa7a7a7, side: THREE.DoubleSide});
  var hallMesh =new THREE.Mesh(hallGeo, hallMat);
  scene.add(hallMesh);

}