var Painting = function() {
  var canvas = document.createElement('canvas');
  var width = 2000;
  var height = 1500;
  var hue = 1;
  var xPos, yPos, prevX, prevY;
  canvas.width = width;
  canvas.height = height;
  var canvasTexture = new THREE.Texture(canvas);
  var ctx = canvas.getContext('2d');
  canvasTexture.needsUpdate = true;
  xPos = map(controlObject.position.x, -hallWidth / 2, hallWidth / 2, 0, canvas.width);
  yPos = map(controlObject.position.z, -hallLength, 0, 0, canvas.height);

  //downsample canvas for better res
  var paintingGeo = new THREE.PlaneGeometry(width / 10, height / 10);
  var paintingMat = new THREE.MeshBasicMaterial({
    map: canvasTexture,
    side: THREE.DoubleSide
  });
  var painting = new THREE.Mesh(paintingGeo, paintingMat);
  painting.castShadow = true;

  //front right side
  painting.position.set(-hallWidth * .33, photoHeight, -hallLength + photoGap);

  scene.add(painting);

  this.update = function() {
    //we need to map our player position in 3d space to where he is n the canvas
    prevX = xPos;
    prevY = yPos;
    xPos = map(controlObject.position.x, -hallWidth / 2, hallWidth / 2, 0, canvas.width);
    yPos = map(controlObject.position.z, -hallLength, 0, 0, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = hslToFillStyle(hue, 70, 30, 0.2);
    lineWidth = 10 + Math.abs(Math.sin(time)) * 40;
    ctx.lineWidth = lineWidth;
    hue += .1;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(xPos, yPos)
    ctx.stroke();
    canvasTexture.needsUpdate = true;
  }
}