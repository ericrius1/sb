varying vec2 vUv;
uniform sampler 2D tOrig


// window.map = function(value, min1, max1, min2, max2){
//   return min2 + (max2 - min2) * ((value - min1) / (max1 - min1))
// }
float map(float value, float min1, float max1, float min2, float max2){
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}
void main() {
  float dist = pow(distance(vUv, playerPos), .1);
  float intensity =  smoothstep(1.0, 0.0, dist);
  vec3 color = vec3(intensity, 0.0, intensity + .1);



  gl_FragColor = vec4(color, 1.0);
}