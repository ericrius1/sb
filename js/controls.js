var playerStartZ = -100;
var controlObject;
var Controls = function() {
  var blocker = document.getElementById('blocker');
  var instructions = document.getElementById('instructions');
  var fpsControls = new THREE.PointerLockControls(camera);
  controlObject = fpsControls.getObject();
  controlObject.position.z = -100;
  scene.add(fpsControls.getObject());
  var clipPadding = 20;

  function teleport(point) {
    controlObject.position.set(point);
  }

  var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

  if (havePointerLock) {

    var element = document.body;

    var pointerlockchange = function(event) {

      if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {

        fpsControls.enabled = true;
        blocker.style.display = 'none';


      } else {

        fpsControls.enabled = false;

        blocker.style.display = '-webkit-box';
        blocker.style.display = '-moz-box';
        blocker.style.display = 'box';

        instructions.style.display = '';

      }

    }

    var pointerlockerror = function(event) {


    }

    // Hook pointer lock state change events
    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('mozpointerlockchange', pointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

    document.addEventListener('pointerlockerror', pointerlockerror, false);
    document.addEventListener('mozpointerlockerror', pointerlockerror, false);
    document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

    document.addEventListener('click', function(event) {


      // Ask the browser to lock the pointer
      element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

      if (/Firefox/i.test(navigator.userAgent)) {

        var fullscreenchange = function(event) {

          if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {

            document.removeEventListener('fullscreenchange', fullscreenchange);
            document.removeEventListener('mozfullscreenchange', fullscreenchange);

            element.requestPointerLock();
          }

        }

        document.addEventListener('fullscreenchange', fullscreenchange, false);
        documents.addEventListener('mozfullscreenchange', fullscreenchange, false);

        element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

        element.requestFullscreen();

      } else {
        element.requestPointerLock();

      }

    }, false);

  }

  this.update = function() {

    fpsControls.update();
    if (controlObject.position.x > hallWidth / 2 - clipPadding) {
      controlObject.position.x = hallWidth / 2 - clipPadding;
    }
    if (controlObject.position.x < -hallWidth / 2 + clipPadding) {
      controlObject.position.x = -hallWidth / 2 + clipPadding;
    }
    if (controlObject.position.z > 0 - clipPadding) {
      controlObject.position.z = 0 - clipPadding;
    }
    if (controlObject.position.z < -hallLength + clipPadding) {
      controlObject.position.z = -hallLength + clipPadding;
    }

  }
}