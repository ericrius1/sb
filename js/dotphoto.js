var DotPhoto = function() {
  var x, y, r, g, b, a, radius, maxRadius;
  var numDotsPerFrame = 25;
  var canvas = document.createElement('canvas');
  var width = 720;
  var height = 668;
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
  image.src = 'assets/nate.jpg';
  image.onload = function() {
    ctx.drawImage(image, 0, 0, width, height);
    imageData = ctx.getImageData(0, 0, width, height).data;
    canvasTexture.needsUpdate = true;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
  }
  var photoMesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), photoMat);
  photoMesh.scale.multiplyScalar(.35);
  photoMesh.position.set(-hallLength / 2 + photoGap, photoHeight, -hallLength * 0.75);
  photoMesh.rotation.y = Math.PI / 2;
  photoMesh.castShadow = true;
  scene.add(photoMesh);

  this.update = function() {
    maxRadius = 20 * Math.abs(Math.sin(time * .1));
    for(var i = 0; i < numDotsPerFrame; i++){

      // pick out pixel data from x, y coordinate
      x = _.random(0, width);
      y = _.random(0, height);
      r= imageData[((width * y) + x) * 4];
      g = imageData[((width * y) + x) * 4 + 1];
      b = imageData[((width * y) + x) * 4 + 2];
      a = imageData[((width * y) + x) * 4 + 3];
      radius = _.random(1, maxRadius);
      ctx.beginPath();
      ctx.fillStyle = rgbToFillStyle(r, g, b, a);
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    canvasTexture.needsUpdate = true;
  }

}