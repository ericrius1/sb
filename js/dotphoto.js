var DotPhoto = function(){
  var canvas = document.createElement('canvas');
  var width = 720;
  var height = 668;
  canvas.width = width;
  canvas.height = height;
  var canvasTexture = new THREE.Texture(canvas);
  var photoMat = new THREE.MeshBasicMaterial({map: canvasTexture, side: THREE.DoubleSide})
  var ctx = canvas.getContext('2d');
  var image = new Image();
  image.src = 'assets/nate.jpg';
  image.onload = function(){
    ctx.drawImage(image, 0, 0, width, height);
    canvasTexture.needsUpdate = true;
  }
  var photoMesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), photoMat);
  photoMesh.scale.multiplyScalar(.3);
  photoMesh.position.set(-hallLength/2 + photoGap, photoHeight, -hallLength * 0.25);
  photoMesh.rotation.y = Math.PI/2;
  photoMesh.castShadow = true;
  scene.add(photoMesh);

  this.update = function(){
    // canvasTexture.needsUpdate = true;
  }

}