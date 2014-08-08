var Sunset = function(){

  var photoMat = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('assets/sunset.jpg'), side: THREE.DoubleSide});
  var photoMesh = new THREE.Mesh(new THREE.PlaneGeometry(297, 171), photoMat);
  photoMesh.castShadow = true;
  photoMesh.rotation.y = Math.PI/2
  photoMesh.position.set(-hallWidth/2 + photoGap, photoHeight, -hallLength * 0.8);
  scene.add(photoMesh);

  var canvas = document.createElement('canvas');
  var width = canvas.width = 297;
  var height = canvas.height = 40;
  var canvasTexture = new THREE.Texture(canvas);
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = rgbToFillStyle(100, 10, 140);
  ctx.fillRect(0, 0, width, height);
  var canvasMat = new THREE.MeshBasicMaterial({map: canvasTexture});
  var canvasMesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), canvasMat)
  canvasMesh.rotation.y = Math.PI/2;
  canvasMesh.position.set(-hallWidth/2 + photoGap+1, photoHeight - height * 1.63, -hallLength * 0.8);
  scene.add(canvasMesh);
  canvasTexture.needsUpdate = true;

}