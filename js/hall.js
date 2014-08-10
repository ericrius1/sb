var Hall = function() {

  var ceilingMaterial;
  var isSpraying;
  var hallGeo = new THREE.PlaneGeometry(hallLength, wallHeight);
  var canvasRW, canvasLW, canvasBW, canvasFW;
  var ctxRW, ctxLW, ctxBW, ctxFW;
  var canvasTextureRW, canvasTextureLW, canvasTextureBW, canvasTextureFW;
  var intersections, intersectPoints;
  var canvasPoint = new THREE.Vector2();
  var imgTexture = THREE.ImageUtils.loadTexture('assets/wall.jpg');
  imgTexture.anisotropy = renderer.getMaxAnisotropy();
  var lineWidth = 10;
  var canvasPoint = new THREE.Vector2();

  setUpWalls();
  setUpCanvases();

  $(document).on('mousedown', function() {
    attemptSpray()
  })

  $(document).on('mouseup', function() {
    isSpraying = false;
  })
  $(document).on('mousemove', function() {
    sprayPaint();
  })


  function attemptSpray() {
    if (!fpsControls.enabled) return;
    raycaster.set(controlObject.position, fpsControls.getDirection());
    intersections = raycaster.intersectObject(canvasRW)
    if (intersections.length) {
      intersectPoint = intersections[0].point;
      ctxRW.beginPath()
      canvasPoint.set(hallLength + intersectPoint.z, wallHeight - intersectPoint.y)
      ctxRW.arc(canvasPoint.x, canvasPoint.y, lineWidth / 4, 0, Math.PI * 2)
      ctxRW.fill();
      ctxRW.closePath()
      ctxRW.moveTo(hallLength + intersectPoint.z, wallHeight - intersectPoint.y)
      isSpraying = true;
      canvasTextureRW.needsUpdate = true;
    }
  }

  function sprayPaint() {
    if (!isSpraying) return
    raycaster.set(controlObject.position, fpsControls.getDirection());
    intersections = raycaster.intersectObject(canvasRW);
    if (intersections.length) {
      intersectPoint = intersections[0].point
      canvasPoint.set(hallLength + intersectPoint.z, wallHeight - intersectPoint.y)
      ctxRW.lineTo(canvasPoint.x, canvasPoint.y)
      ctxRW.stroke();

    }
    canvasTextureRW.needsUpdate = true;

  }

  this.update = function() {
    var uTime = time * .02;
    ceilingMaterial.uniforms.time.value = uTime;

  }


  function setUpCanvases() {

    //RIGHT WALL
    canvasRW = document.createElement('canvas');
    canvasRW.width = hallLength;
    canvasRW.height = wallHeight;
    ctxRW = canvasRW.getContext('2d');
    setUpContext(ctxRW);
    canvasTextureRW = new THREE.Texture(canvasRW);
    var canvasMat = new THREE.MeshBasicMaterial({
      map: canvasTextureRW,
      transparent: true,
      opacity: 0.7
    })
    canvasTextureRW.needsUpdate = true;
    canvasRW = new THREE.Mesh(hallGeo, canvasMat)
    canvasRW.rotation.y = -Math.PI / 2;
    canvasRW.position.x = hallWidth / 2 - photoGap - 1;
    canvasRW.position.z -= hallLength / 2;
    canvasRW.position.y += wallHeight / 2;
    scene.add(canvasRW)

    //LEFT WALL
    canvasLW = document.createElement('canvas');
    canvasLW.width = hallLength;
    canvasLW.height = wallHeight;
    ctxLW = canvasLW.getContext('2d');
    setUpContext(ctxLW);
    canvasTextureLW = new THREE.Texture(canvasLW);
    var canvasMat = new THREE.MeshBasicMaterial({
      map: canvasTextureLW,
      transparent: true,
      opacity: 0.7
    })
    canvasTextureLW.needsUpdate = true;
    canvasLW = new THREE.Mesh(hallGeo, canvasMat)
    canvasLW.rotation.y = Math.PI / 2;
    canvasLW.position.x = -hallWidth / 2 + photoGap + 1;
    canvasLW.position.z -= hallLength / 2;
    canvasLW.position.y += wallHeight / 2;
    scene.add(canvasLW)

    //BACK WALL
    canvasBW = document.createElement('canvas');
    canvasBW.width = hallLength;
    canvasBW.height = wallHeight;
    ctxBW = canvasBW.getContext('2d');
    setUpContext(ctxBW);
    canvasTextureBW = new THREE.Texture(canvasBW);
    var canvasMat = new THREE.MeshBasicMaterial({
      map: canvasTextureBW,
      transparent: true,
      opacity: 0.7
    })
    canvasTextureBW.needsUpdate = true;
    canvasBW = new THREE.Mesh(hallGeo, canvasMat)
    canvasBW.position.z -= hallLength;
    canvasBW.position.y += wallHeight / 2;
    scene.add(canvasBW)

    //FRONT WALL
    canvasFW = document.createElement('canvas');
    canvasFW.width = hallLength;
    canvasFW.height = wallHeight;
    ctxFW = canvasFW.getContext('2d');
    setUpContext(ctxFW);
    canvasTextureFW = new THREE.Texture(canvasFW);
    var canvasMat = new THREE.MeshBasicMaterial({
      map: canvasTextureFW,
      transparent: true,
      opacity: 0.7
    })
    canvasTextureFW.needsUpdate = true;
    canvasFW = new THREE.Mesh(hallGeo, canvasMat)
    canvasFW.position.y += wallHeight / 2;
    canvasFW.rotation.y = Math.PI;
    scene.add(canvasFW)


    function setUpContext(ctx) {
      ctx.fillStyle = rgbToFillStyle(100, 0, 100, 1);
      ctx.fillRect(0, 0, hallLength, wallHeight);
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = rgbToFillStyle(100, 0, 100, 0.2)
      ctx.lineJoin = ctx.lineCap = 'round';
      ctx.shadowBlur = 5;
      ctx.shadowColor = rgbToFillStyle(100, 0, 0);
    }
  }

  function setUpWalls() {
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
    ceilingMaterial = new THREE.ShaderMaterial({
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


  }

}