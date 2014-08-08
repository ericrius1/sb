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
  var imageData, partImageData, drawReady;
  //pd = part data
  var pd= {startX: 100, startY: 100, endX: 200, endY: 130 };
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
    partImageData = ctx.getImageData(pd.startX, pd.endY, pd.endX - pd.startX, pd.endY - pd.startY);
    drawReady = true;
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
    if(!drawReady)return;
    ctx.putImageData(partImageData, pd.startX, pd.endY);
    for (var x = pd.startX; x < pd.endX; x += 10) {
      for (var y = pd.startY; y < pd.endY; y += 10) {
        if(_.random(1, 100) === 1){
          // ctx.beginPath();
          // ctx.fillStyle = rgbToFillStyle(_.random(0, 100), 0, _.random(0, 100));
          // ctx.arc(x, y, 10, 0, Math.PI * 2);
          // ctx.fill();
          
        }
      }
    }
  }

  this.update = function(){
    drawHair();
    canvasTexture.needsUpdate = true;
  }


}