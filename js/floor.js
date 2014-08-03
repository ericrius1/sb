var Floor = function() {
  var x, y, prev, prevY;
  var size = 5;
  var hue = 1;
  var canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 500;
  var canvasTexture = new THREE.Texture(canvas);
  canvasTexture.needsUpdate = true;
  canvasTexture.anisotrpy = renderer.getMaxAnisotropy();
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "rgba(255,0,0,0.95)";

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

    ctx.beginPath();
    ctx.strokeStyle = hslToFillStyle(hue++, 100, 50, 0.5);
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y)

    ctx.stroke();

    canvasTexture.needsUpdate = true;

  }
}

function hslToFillStyle(h, s, l, a) {
  if (a === undefined) {
    return ["hsl(", h, ",", s, "%,", l, "%)"].join('');
  } else {
    return ["hsla(", h, ",", s, "%,", l, "%,", a, ")"].join('');
  }
}