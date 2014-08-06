uniform sampler2D state[2]; //State Buffer
uniform vec2 playerPosition;
varying vec2 vUv;
void main(){
  float w = exp2(-0.05 * distance(vUv, playerPosition));
  vec3 paintColor = vec3(1.0, 0.0, 0.0);
  gl_FragCoord = texture2D(map, vUv) + vec4(paintColor, 1.0);

}