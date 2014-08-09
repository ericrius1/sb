var LinePhoto = function() {
  var x, y, r, g, b, a, radius, maxRadius;
  var numDotsPerFrame = 20;
  var canvas = document.createElement('canvas');
  var width = 556;
  var height = 417;
  canvas.width = width;
  canvas.height = height;
  var imageData = new Array();
  var canvasTexture = new THREE.Texture(canvas);
  var photoMat = new THREE.MeshBasicMaterial({
    map: canvasTexture,
    side: THREE.DoubleSide
  })
  var ctx = canvas.getContext('2d');
  var image = new Image();
  image.src = 'assets/sav.jpg';
  image.onload = function() {
    ctx.drawImage(image, 0, 0, width, height);
    imageData = ctx.getImageData(0, 0, width, height).data;
    canvasTexture.needsUpdate = true;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
  }
  var photoMesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), photoMat);
  photoMesh.scale.multiplyScalar(.35);
  photoMesh.position.set(hallLength / 2 - photoGap, photoHeight, -hallLength * 0.25);
  photoMesh.rotation.y = -Math.PI / 2;
  photoMesh.castShadow = true;
  scene.add(photoMesh);

  this.update = function() {
    maxRadius = 20 * Math.abs(Math.sin(time * .1));
    ctx.lineWidth = _.random(1,3);
    for(var i = 0; i < numDotsPerFrame; i++){

      // pick out pixel data from x, y coordinate
      x = _.random(0, width);
      y = _.random(0, height);
      r= imageData[((width * y) + x) * 4];
      g = imageData[((width * y) + x) * 4 + 1];
      b = imageData[((width * y) + x) * 4 + 2];
      a = imageData[((width * y) + x) * 4 + 3];
      ctx.beginPath();
      ctx.strokeStyle = rgbToFillStyle(r, g, b, a);
      ctx.moveTo(x, y);
      ctx.lineTo(x + _.random(-5, 0), y + _.random(0, 5));
      ctx.stroke();
    }
    canvasTexture.needsUpdate = true;
  }

}