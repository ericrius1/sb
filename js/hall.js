var Hall = function() {

  //because of rotation!
  var isSpraying;
  var hallGeo = new THREE.PlaneGeometry(hallLength, wallHeight);
  var intersections, intersectPoints;
  var canvasPoint = new THREE.Vector2();
  var imgTexture = THREE.ImageUtils.loadTexture('assets/wall.jpg');
  imgTexture.anisotropy = renderer.getMaxAnisotropy();
  var lineWidth = 10;
  var wallMaterial = new THREE.MeshPhongMaterial({
      map: imgTexture,
      bumpMap: imgTexture,
      bumpScale: 3,
      shininess: 80,
    })
    // var testMaterial = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, color: 0xf});
  var sideRightWall = new THREE.Mesh(hallGeo, wallMaterial);
  sideRightWall.rotation.y = -Math.PI / 2;
  sideRightWall.position.x = hallWidth / 2;
  sideRightWall.position.z -= hallLength / 2;
  sideRightWall.position.y += wallHeight / 2;
  sideRightWall.receiveShadow = true;
  scene.add(sideRightWall);

  //canvas for side wall
  var canvasRW = document.createElement('canvas');
  canvasRW.width = hallLength;
  canvasRW.height = wallHeight;
  var ctxRW = canvasRW.getContext('2d');
  ctxRW.fillStyle = rgbToFillStyle(100, 0, 100, 0.2);
  ctxRW.fillRect(0, 0, hallLength, wallHeight);
  ctxRW.lineWidth = lineWidth;
  ctxRW.strokeStyle =rgbToFillStyle(100, 0, 100, 0.2)
  ctxRW.lineJoin = ctxRW.lineCap = 'round';
  ctxRW.shadowBlur = 5;
  ctxRW.shadowColor = rgbToFillStyle(100, 0, 0);
  var canvasTexture = new THREE.Texture(canvasRW);
  var canvasMat = new THREE.MeshBasicMaterial({
    map: canvasTexture,
    transparent: true,
    opacity: 0.7
  })
  canvasTexture.needsUpdate = true;
  var sideRightWallCanvas = new THREE.Mesh(hallGeo, canvasMat)
  sideRightWallCanvas.rotation.y = -Math.PI / 2;
  sideRightWallCanvas.position.x = hallWidth / 2 - photoGap - 1;
  sideRightWallCanvas.position.z -= hallLength / 2;
  sideRightWallCanvas.position.y += wallHeight / 2;
  scene.add(sideRightWallCanvas)



  var sideLeftWall = new THREE.Mesh(hallGeo, wallMaterial);
  sideLeftWall.rotation.y = Math.PI / 2;
  sideLeftWall.position.x = -hallWidth / 2;
  sideLeftWall.position.z -= hallLength / 2;
  sideLeftWall.position.y += wallHeight / 2;
  sideLeftWall.receiveShadow = true;
  scene.add(sideLeftWall);

  var backWall = new THREE.Mesh(hallGeo, wallMaterial);
  backWall.position.y += wallHeight / 2;
  backWall.rotation.y = -Math.PI;
  scene.add(backWall)

  var frontWall = new THREE.Mesh(hallGeo, wallMaterial);
  frontWall.position.y += wallHeight / 2;
  frontWall.position.z -= hallLength;
  scene.add(frontWall)

  var uniforms = {
    time: {
      type: 'f',
      value: 0.0
    },
    resolution: {
      type: "v2",
      value: new THREE.Vector2(window.innerWidth, window.innerHeight)
    }
  }
  var ceilingMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shaders.vertexShaders.ceiling,
    fragmentShader: shaders.fragmentShaders.ceiling
  })

  var ceilingGeo = new THREE.PlaneGeometry(hallLength, hallLength)
  var ceiling = new THREE.Mesh(ceilingGeo, ceilingMaterial);
  ceiling.position.y += wallHeight;
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.z -= hallLength / 2;
  scene.add(ceiling);

  $(document).on('mousedown', function(){
    attemptSpray()
  })

  $(document).on('mouseup', function(){
    isSpraying = false;
  })
  $(document).on('mousemove', function(){
    sprayPaint(); 

  })

  function attemptSpray(){
    if(!fpsControls.enabled)return;
    raycaster.set(controlObject.position, fpsControls.getDirection());
    intersections = raycaster.intersectObject(sideRightWallCanvas)
    if(intersections.length){
      intersectPoint = intersections[0].point;
      ctxRW.beginPath()
      ctxRW.arc(hallLength + intersectPoint.z, wallHeight - intersectPoint.y, lineWidth/4, 0, Math.PI * 2)
      ctxRW.fill();
      ctxRW.closePath()
      ctxRW.moveTo(hallLength + intersectPoint.z, wallHeight - intersectPoint.y)
      isSpraying = true;
      canvasTexture.needsUpdate = true;
    }
  }

  function sprayPaint(){
    if(!isSpraying)return
    raycaster.set(controlObject.position, fpsControls.getDirection());
    intersections = raycaster.intersectObject(sideRightWallCanvas);
    if(intersections.length){
      intersectPoint = intersections[0].point
      ctxRW.lineTo(hallLength + intersectPoint.z, wallHeight - intersectPoint.y)
      ctxRW.stroke();

    }
    canvasTexture.needsUpdate = true;
    
  }



  this.update = function() {
    var uTime = time * .02;
    ceilingMaterial.uniforms.time.value = uTime;

  }

}