


var Photos = function() {
  var root = 'assets/'
  //key is url root and value is resolution and scale data
  var photosData = [
    {name: 'doug.jpg', res:[566, 496], scale: .35},
    {name: 'mike.jpg', res: [1837, 1144], scale: .16},
    {name: 'cjkiakyle.jpg', res: [605, 466], scale: .26},
    {name: 'relkendra.jpg', res: [960, 720], scale: .21},
    {name: 'brian.jpg', res: [880, 960], scale: .15},
  ]
  var photoMeshes = [];
  loadPhotos();
  placePhotos();

  function loadPhotos(){
    var texture, photoGeo, photoMat, photoMesh;
    _.each(photosData, function(data){
      texture = THREE.ImageUtils.loadTexture(root + data.name );
      photoGeo = new THREE.PlaneGeometry(data.res[0], data.res[1]);
      photoMat = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
      photoMesh = new THREE.Mesh(photoGeo, photoMat);
      photoMesh.scale.multiplyScalar(data.scale);
      photoMesh.castShadow = true;
      scene.add(photoMesh);
      photoMeshes.push(photoMesh);
    });
  }

  function placePhotos(){
    //shuffled photos indices
    var spi = _.shuffle(_.range(photoMeshes.length));
    var curIndex = 0;
    
    //back
    var photo = photoMeshes[spi[curIndex++]];
    photo.position.set(0, photoHeight, 0-photoGap);

    photo = photoMeshes[spi[curIndex++]];
    photo.position.set(hallWidth/2 * 0.66, photoHeight, 0-photoGap);
    
    //Front
    photo = photoMeshes[spi[curIndex++]];
    photo.position.set(0, photoHeight, -hallLength + photoGap)

    photo = photoMeshes[spi[curIndex++]];
    photo.position.set( hallWidth * .33, photoHeight, -hallLength + photoGap)

    //Left side
    photo = photoMeshes[spi[curIndex++]];
    photo.position.set(-hallWidth/2 + photoGap, photoHeight, -hallLength/2)
    photo.rotation.y = Math.PI/2;
  }

}