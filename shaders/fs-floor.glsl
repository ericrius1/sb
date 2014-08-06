varying vec2 vUv;
uniform sampler2D map;
uniform vec2 playerPosition;

void main(){
  gl_FragColor = texture2D(map, vUv);
}