uniform float time;
uniform vec2 resolution;
varying vec2 vUv;


// window.map = function(value, min1, max1, min2, max2){
//   return min2 + (max2 - min2) * ((value - min1) / (max1 - min1))
// }
float map(float value, float min1, float max1, float min2, float max2){
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}

float field(in vec3 p) {
  float strength = 4. + .03 ;
  float accum = 0.;
  float prev = 0.;
  float tw = 0.;
  for (int i = 0; i < 17; ++i) {
    float mag = dot(p, p);
    p = abs(p) / mag + vec3(-.2, -.5, -1.445);
    float w = exp(-float(i) / 7.);
    accum += w * exp(-strength * pow(abs(mag - prev), 1.3));
    tw += w;
    prev =mix(mag,prev,0.5*(1.+sin(time*0.21)));
  }
  return max(0., 5. * accum / tw - 0.7);
}

void main(){
  vec2 uvs = vUv.xy * resolution.xy / max(resolution.x, resolution.y);
  vec3 p = vec3(uvs /4., 0) + vec3(1., -1.3, 0.);
  p += vec3(vec2(.2,.2),cos(time*-.1));
  float t = field(p);
  gl_FragColor =  vec4( vec3(0.15) + vec3(4.8*t* t * t * t, 0.9 * t * t, t) , 1.0);
}
