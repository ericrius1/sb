var Floor = function() {
  var geometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);


  for (var i = 0, l = geometry.vertices.length; i < l; i++) {

    var vertex = geometry.vertices[i];
    vertex.x += Math.random() * 20 - 10;
    vertex.y += Math.random() * 2;
    vertex.z += Math.random() * 11 - 10;

  }

  for (var i = 0, l = geometry.faces.length; i < l; i++) {

    var face = geometry.faces[i];
    face.vertexColors[0] = new THREE.Color().setHSL(randFloat(0.7, 0.9), 0.75, Math.random() * 0.11 + 0.75);
    face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.1 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    face.vertexColors[2] = new THREE.Color().setHSL(0.3, .5, .5);

  }

  var material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors
  });

  var mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI/2
  mesh.position.z -= hallLength/2;
  scene.add(mesh);

}