var randFloat = THREE.Math.randFloat;
var Floor = function() {
  PERLIN.noise.seed(Math.random());
  var x, y, prev, prevY;
  var hue = 1;
  var radius = 50;
  var theta = 0;
  var canvas = document.createElement('canvas');
  canvas.width = 2000;
  canvas.height = 2000;
  var canvasTexture = new THREE.Texture(canvas);
  canvasTexture.needsUpdate = true;
  var ctx = canvas.getContext('2d');

  x = map(controlObject.position.x, -hallWidth / 2, hallWidth / 2, 0, canvas.width);
  y = map(controlObject.position.z, -hallLength, 0, 0, canvas.height);
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
    prevX = x;
    prevY = y;
    x = map(controlObject.position.x, -hallWidth / 2, hallWidth / 2, 0, canvas.width);
    y = map(controlObject.position.z, -hallLength, 0, 0, canvas.height);

    hue+=.1

    ctx.beginPath();
    ctx.strokeStyle = hslToFillStyle(hue, 70, 30);
    ctx.lineWidth = 10;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y)

    ctx.stroke();

    canvasTexture.needsUpdate = true;

  }
}
