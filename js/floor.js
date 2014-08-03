var Floor = function() {
  var xPos = 100;
  var size = 100;
  var canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 1000;
  var canvasTexture = new THREE.Texture(canvas);
  canvasTexture.needsUpdate = true;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "rgba(255,0,0,0.95)";
  ctx.fillRect(xPos, canvas.width, size, size)


  var floorMaterial = new THREE.MeshBasicMaterial({
    map: canvasTexture,
    side: THREE.DoubleSide
  });

  var floorGeo = new THREE.PlaneGeometry(hallLength, hallLength)
  var floor = new THREE.Mesh(floorGeo, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.z -= hallLength / 2;
  scene.add(floor);

  this.update = function() {
    //we need to map our player position in 3d space to where he is n the canvas
    var xPos = map(controlObject.position.x, -hallWidth/2, hallWidth/2, 0, canvas.width);
    var yPos = map(controlObject.position.z, -hallLength, 0,  0, canvas.height);
    var pos =[xPos, yPos];

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    //xPos, yPos, zSize, ySize
    xPos += 1;
    ctx.fillRect(pos[0], pos[1], size, size);
    canvasTexture.needsUpdate = true;

  }
}