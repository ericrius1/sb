uniform float time;
varying vec2 vUv;


// window.map = function(value, min1, max1, min2, max2){
//   return min2 + (max2 - min2) * ((value - min1) / (max1 - min1))
// }
float map(float value, float min1, float max1, float min2, float max2){
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}
void main() {
  float px = map(sin(time * 5.0), -1.0, 1.0, 0.43, 0.47);
  float py = abs(sin(time));
  vec2 point = vec2(py, px);
  float dist = pow(distance(vUv, point), .1);
  float intensity =  smoothstep(1.0, 0.0, dist);
  vec3 color = vec3(intensity, 0.0, intensity + .1);

  px+= .05;
  py = abs(sin( (time + 100.) * 0.4));
  point = vec2(py, px);
  dist = pow(distance(vUv, point), .1);
  intensity = smoothstep(1.0, 0.0, dist);
  color.rg += intensity;

  px+= .05;
  py = abs(sin( (time + 200.) * .7));
  point = vec2(py, px);
  dist = pow(distance(vUv, point), .1);
  intensity = smoothstep(1.0, 0.0, dist);
  color.gb += intensity;

  gl_FragColor = vec4(color, 1.0);
}