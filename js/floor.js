var Floor = function() {
  var geometry = new THREE.PlaneGeometry(hallWidth+100, hallLength+100, 100, 100);


  for (var i = 0, l = geometry.vertices.length; i < l; i++) {

    var vertex = geometry.vertices[i];
    vertex.x += Math.random() * 20 - 10;
    vertex.y += Math.random() * 2;
    vertex.z += Math.random() * 11 - 10;

  }

  for (var i = 0, l = geometry.faces.length; i < l; i++) {

    var face = geometry.faces[i];
    face.vertexColors[0] = new THREE.Color(0x448ea9);
    face.vertexColors[1] = new THREE.Color(0x37d0c3);
    face.vertexColors[2] = new THREE.Color(0x5c294c);

  }

  var material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors
  });

  var mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI/2
  mesh.position.z -= hallLength/2;
  scene.add(mesh);

}