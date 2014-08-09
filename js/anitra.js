var Anitra = function() {
  var canvas = document.createElement('canvas');
  var width = canvas.width = 1080;
  var height = canvas.height = 1468;
  var ctx = canvas.getContext('2d');
  var image = new Image();
  var scale = 0.35

  var canvasTexture = new THREE.Texture(canvas);
  var photoMat = new THREE.MeshBasicMaterial({
    map: canvasTexture,
    side: THREE.DoubleSide
  })
  image.src = 'assets/anitra.jpg';
  image.onload = function() {
    ctx.drawImage(image, 0, 0, width, height);
    canvasTexture.needsUpdate = true;
  }
  var photoMesh = new THREE.Mesh(new THREE.PlaneGeometry(540, 734), photoMat);
  photoMesh.scale.multiplyScalar(scale);
  photoMesh.rotation.y = Math.PI / 2;
  photoMesh.position.set(-hallWidth / 2 + photoGap, photoHeight + 30, -hallLength * 0.25)
  photoMesh.castShadow = true;
  scene.add(photoMesh);

  var stars = new Stars(ctx);

  this.update = function() {
    ctx.drawImage(image, 0, 0, width, height);
    stars.draw();
    canvasTexture.needsUpdate = true;
  }
}

var Stars = function(context) {
  var radius;
  var ctx = context;
  var width = ctx.canvas.width
  var height = ctx.canvas.height
  var numStars = 111;
  var stars = [];

  createStars();

  function createStars() {
    for (var i = 0; i < numStars; i++) {
      var star = {};
      star.radius = _.random(1, 5);
      star.startingTime = randFloat(0, Math.PI * 2);
      star.x = _.random(0, width);
      star.y = _.random(0, 300);
      star.color = new THREE.Vector3(_.random(200, 255), _.random(150, 220), _.random(200, 255));
      stars.push(star);
    }
  }

  this.draw = function() {
    _.each(stars, function(star) {
      radius = Math.abs(Math.sin((time + star.startingTime) * 2.0)) * star.radius;
      if (radius < .1) {
        star.x = _.random(0, width);
        if(star.x > 320){
          star.y = _.random(0, 440)
        }
        else{
          star.y = _.random(0, 300);
        }
        star.radius = _.random(1,6);
      }
      ctx.fillStyle = rgbToFillStyle(star.color.x, star.color.y, star.color.z, 0.8);
      ctx.beginPath();
      ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

  }


}