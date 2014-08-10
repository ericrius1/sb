var Hall = function() {

  var ceilingMaterial;
  var isSpraying;
  var canvasOpacity = 0.95
  var strokeOpacity = 0.2
  var hallGeo = new THREE.PlaneGeometry(hallLength, wallHeight);
  var canvasRW, canvasLW, canvasBW, canvasFW, canvases, curCtx, hitData, mappedPointX;
  var prevCanvasPoint = new THREE.Vector2();
  var ctxRW, ctxLW, ctxBW, ctxFW;
  var canvasTextureRW, canvasTextureLW, canvasTextureBW, canvasTextureFW;
  var intersections, intersectPoints;
  var canvasPoint = new THREE.Vector2();
  var imgTexture = THREE.ImageUtils.loadTexture('assets/wall.jpg');
  imgTexture.anisotropy = renderer.getMaxAnisotropy();
  var lineWidth = 10;
  var canvasPoint = new THREE.Vector2();
  var hue = 10;

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
    if (getHitPoint()) {
      // curCtx.beginPath()
      // curCtx.arc(canvasPoint.x, canvasPoint.y, lineWidth / 4, 0, Math.PI * 2)
      // curCtx.fill();
      // curCtx.closePath()
      prevCanvasPoint.set(canvasPoint.x, canvasPoint.y)
      isSpraying = true;
      hitData.object.material.map.needsUpdate = true;

    }
  }

  function sprayPaint() {
    if (!isSpraying) return
    raycaster.set(controlObject.position, fpsControls.getDirection());
    intersections = raycaster.intersectObjects(canvases);
    if (getHitPoint()) {
      curCtx.beginPath();
      curCtx.moveTo(prevCanvasPoint.x, prevCanvasPoint.y)
      curCtx.lineTo(canvasPoint.x, canvasPoint.y)
      curCtx.stroke();
      curCtx.closePath();
      prevCanvasPoint.set(canvasPoint.x, canvasPoint.y);
      hitData.object.material.map.needsUpdate = true;
      hue += .1
    }
  }

  function getHitPoint() {
    raycaster.set(controlObject.position, fpsControls.getDirection());
    intersections = raycaster.intersectObjects(canvases)
    if (intersections.length) {
      hitData = intersections[0];
      intersectPoint = hitData.point;
      curCtx = hitData.object.ctx;
      curTexture = hitData.object.material.map;
      if (curCtx.name === 'rw') {

        canvasPoint.set(hallLength + intersectPoint.z, wallHeight - intersectPoint.y);
      }
      if (curCtx.name === 'lw') {
        canvasPoint.set(-intersectPoint.z, wallHeight - intersectPoint.y);
      }
      if (curCtx.name === 'bw') {
        mappedPointX = map(intersectPoint.x, -hallLength / 2, hallLength / 2, hallLength, 0);
        canvasPoint.set(mappedPointX, wallHeight - intersectPoint.y);

      }
      if (curCtx.name === 'fw') {
        console.log('hit')
        mappedPointX = map(intersectPoint.x, -hallLength / 2, hallLength / 2, 0, hallLength);
        canvasPoint.set(mappedPointX, wallHeight - intersectPoint.y);

      }
      return true;
    }
    return false;
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
    ctxRW.name = 'rw';
    setUpContext(ctxRW);
    canvasTextureRW = new THREE.Texture(canvasRW);
    var canvasMat = new THREE.MeshBasicMaterial({
      map: canvasTextureRW,
      transparent: true,
      opacity: canvasOpacity
    })
    canvasTextureRW.needsUpdate = true;
    canvasRW = new THREE.Mesh(hallGeo, canvasMat)
    canvasRW.rotation.y = -Math.PI / 2;
    canvasRW.position.x = hallWidth / 2 - photoGap - 1;
    canvasRW.position.z -= hallLength / 2;
    canvasRW.position.y += wallHeight / 2;
    scene.add(canvasRW)
    canvasRW.ctx = ctxRW;

    //LEFT WALL
    canvasLW = document.createElement('canvas');
    canvasLW.width = hallLength;
    canvasLW.height = wallHeight;
    ctxLW = canvasLW.getContext('2d');
    ctxLW.name = 'lw';
    setUpContext(ctxLW);
    canvasTextureLW = new THREE.Texture(canvasLW);
    var canvasMat = new THREE.MeshBasicMaterial({
      map: canvasTextureLW,
      transparent: true,
      opacity: canvasOpacity
    })
    canvasTextureLW.needsUpdate = true;
    canvasLW = new THREE.Mesh(hallGeo, canvasMat)
    canvasLW.rotation.y = Math.PI / 2;
    canvasLW.position.x = -hallWidth / 2 + photoGap + 1;
    canvasLW.position.z -= hallLength / 2;
    canvasLW.position.y += wallHeight / 2;
    scene.add(canvasLW)
    canvasLW.ctx = ctxLW;

    //BACK WALL
    canvasBW = document.createElement('canvas');
    canvasBW.width = hallLength;
    canvasBW.height = wallHeight;
    ctxBW = canvasBW.getContext('2d');
    ctxBW.name = 'bw';
    setUpContext(ctxBW);
    canvasTextureBW = new THREE.Texture(canvasBW);
    var canvasMat = new THREE.MeshBasicMaterial({
      map: canvasTextureBW,
      transparent: true,
      opacity: canvasOpacity
    })
    canvasTextureBW.needsUpdate = true;
    canvasBW = new THREE.Mesh(hallGeo, canvasMat)
    canvasBW.position.y += wallHeight / 2;
    canvasBW.rotation.y = Math.PI;
    canvasBW.position.z -= photoGap - 1;
    scene.add(canvasBW)
    canvasBW.ctx = ctxBW;

    //FRONT WALL
    canvasFW = document.createElement('canvas');
    canvasFW.width = hallLength;
    canvasFW.height = wallHeight;
    ctxFW = canvasFW.getContext('2d');
    ctxFW.name = 'fw';
    setUpContext(ctxFW);
    canvasTextureFW = new THREE.Texture(canvasFW);
    var canvasMat = new THREE.MeshBasicMaterial({
      map: canvasTextureFW,
      transparent: true,
      opacity: canvasOpacity
    })
    canvasTextureFW.needsUpdate = true;
    canvasFW = new THREE.Mesh(hallGeo, canvasMat)
    canvasFW.position.y += wallHeight / 2;
    canvasFW.position.z =  -hallLength + photoGap + 1;
    scene.add(canvasFW)
    canvasFW.ctx = ctxFW;

    canvases = [canvasFW, canvasBW, canvasLW, canvasRW];


    function setUpContext(ctx) {
      ctx.fillStyle = rgbToFillStyle(100, 0, 100, 0);
      ctx.fillRect(0, 0, hallLength, wallHeight);
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = hslToFillStyle(hue, 0, 100, strokeOpacity)
      ctx.strokeStyle = hslToFillStyle(hue, 0, 100, strokeOpacity)
      ctx.lineJoin = ctx.lineCap = 'round';
      ctx.shadowBlur = 7;
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