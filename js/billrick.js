var BillRick = function() {
  var data = {
    name: 'billrick.jpg',
    res: [1024, 576],
    scale: .30
  };
  var canvas = document.createElement('canvas');
  var width = data.res[0];
  var height = data.res[1];
  canvas.width = width;
  canvas.height = height;
  var imageData;
  var ctx = canvas.getContext('2d');
  var image = new Image();
  image.src = 'assets/billrick.jpg';
  var canvasTexture = new THREE.Texture(canvas);
  var photoMat = new THREE.MeshBasicMaterial({
    map: canvasTexture,
    side: THREE.DoubleSide
  })
  image.onload = function() {
    ctx.drawImage(image, 0, 0, width, height);
    imageData = ctx.getImageData(0, 0, width, height).data;
    drawHair();
    canvasTexture.needsUpdate = true;
  }

  var photoMesh = new THREE.Mesh(new THREE.PlaneGeometry(data.res[0], data.res[1]), photoMat);
  photoMesh.castShadow = true;
  photoMesh.position.set(hallWidth / 2 - photoGap, photoHeight, -hallLength / 2)
  photoMesh.scale.multiplyScalar(data.scale);
  photoMesh.rotation.y = -Math.PI / 2;
  scene.add(photoMesh);

  function drawHair() {
    for (x = 101; x < 202; x += 10) {
      for (y = 95; y < 131; y += 10) {
        ctx.beginPath();
        ctx.fillStyle = rgbToFillStyle(100, 0, 100);
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }


}