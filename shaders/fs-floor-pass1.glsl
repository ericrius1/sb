varying vec2 vUv;
uniform vec2 playerPosition;
uniform sampler2D state;

void main(){
  float w = exp2(-50. * distance(vUv, playerPosition));
  gl_FragColor = texture2D(state, vUv) + vec4(w, 0.0, 0.0, 0.0 );
}