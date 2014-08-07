var DotPhoto = function() {
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
  }
  var photoMesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), photoMat);
  photoMesh.scale.multiplyScalar(.3);
  photoMesh.position.set(-hallLength / 2 + photoGap, photoHeight, -hallLength * 0.25);
  photoMesh.rotation.y = Math.PI / 2;
  photoMesh.castShadow = true;
  scene.add(photoMesh);

  this.update = function() {
    // pick out pixel data from x, y coordinate
    var x = 400;
    var y = 400;
    var r= imageData[((width * y) + x) * 4];
    var g = imageData[((width * y) + x) * 4 + 1];
    var b = imageData[((width * y) + x) * 4 + 2];
    var a = imageData[((width * y) + x) * 4 + 3];
    
    var radius = 50;
    ctx.beginPath();
    ctx.fillStyle = rgbToFillStyle(r, g, b, a);
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    canvasTexture.needsUpdate = true;
  }

}