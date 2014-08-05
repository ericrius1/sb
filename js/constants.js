//Hall
var wallHeight = 300;
var hallWidth = 2000;
var hallLength = 2000;

//control
var playerStartZ = -100;
var controlObject;
var clipPadding = 50;

//paintings
var photoHeight = 100;
var photoGap = 10


var randFloat = THREE.Math.randFloat;

function randomPointsInGeometry(geometry, n) {

  var face, i,
    faces = geometry.faces,
    vertices = geometry.vertices,
    il = faces.length,
    totalArea = 0,
    cumulativeAreas = [],
    vA, vB, vC, vD;

  // precompute face areas

  for (i = 0; i < il; i++) {

    face = faces[i];

    vA = vertices[face.a];
    vB = vertices[face.b];
    vC = vertices[face.c];

    face._area = THREE.GeometryUtils.triangleArea(vA, vB, vC);

    totalArea += face._area;

    cumulativeAreas[i] = totalArea;

  }