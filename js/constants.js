//Hall
var wallHeight = 300;
var hallWidth = 2000;
var hallLength = 2000;

//control
var playerStartZ = -100;
var controlObject;
var clipPadding = 50;

//paintings
var photoHeight = 130;
var photoGap = 10


var randFloat = THREE.Math.randFloat;

function map(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}

function hslToFillStyle(h, s, l, a) {
  if (a === undefined) {
    return ["hsl(", h, ",", s, "%,", l, "%)"].join('');
  } else {
    return ["hsla(", h, ",", s, "%,", l, "%,", a, ")"].join('');
  }
}

function rgbToFillStyle(r, g, b, a) {
  if (a === undefined) {
    return ["rgb(", r, ",", g, ",", b, ")"].join('');
  } else {
    return ["rgba(", r, ",", g, ",", b, ",", a, ")"].join('');
  }
}