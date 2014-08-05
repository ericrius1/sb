var Painting = function() {
  var canvas = document.createElement('canvas');
  var width = 2000;
  var height = 1500;
  var hue = 1;
  var x, y, prev, prevY;
  x = map(controlObject.position.x, -hallWidth / 2, hallWidth / 2, 0, canvas.width);
  y = map(controlObject.position.z, -hallLength, 0, 0, canvas.height);
  canvas.width = width;
  canvas.height = height;
  var canvasTexture = new THREE.Texture(canvas);
  var ctx = canvas.getContext('2d');
  canvasTexture.needsUpdate = true;

  //downsample canvas for better res
  var paintingGeo = new THREE.PlaneGeometry(width / 10, height / 10);
  var paintingMat = new THREE.MeshBasicMaterial({
    map: canvasTexture,
    side: THREE.DoubleSide
  });
  var painting = new THREE.Mesh(paintingGeo, paintingMat);
  painting.castShadow = true;

  //left back side
  painting.position.set(-hallWidth / 2 + photoGap, photoHeight, -hallLength * .8);
  painting.rotation.y = Math.PI / 2;

  scene.add(painting);

  this.update = function() {
    //we need to map our player position in 3d space to where he is n the canvas
    prevX = x;
    prevY = y;
    x = map(controlObject.position.x, -hallWidth / 2, hallWidth / 2, 0, canvas.width);
    y = map(controlObject.position.z, -hallLength, 0, 0, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = hslToFillStyle(hue, 70, 30, 0.2);
    lineWidth = 5 +Math.sin(time) * 100;
    ctx.lineWidth = lineWidth;
    hue+=.1;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y)
    ctx.stroke();
    canvasTexture.needsUpdate = true;
  }
}