uniform float time;
varying vec2 vUv;
void main() {
  vec2 rPoint = vec2(sin(time)+ 0.5, 0.5 );
  float rDist = distance(rPoint, vUv);

  vec2 bPoint = vec2(sin(time) - .5, 0.5);
  float bDist = distance(bPoint, vUv);

  float r = pow(smoothstep(1.0, 0.0, rDist), 2.0);
  float b = pow(smoothstep(1.0, 0.0, bDist), 2.0);
  vec3 color = vec3(r, 0.1, b);
  gl_FragColor = vec4(color, 1.0);
}