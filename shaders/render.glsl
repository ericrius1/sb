uniform sampler2D map; //State Buffer
uniform vec2 playerPosition;
varying vec2 vUv;
void main(){
  gl_FragCoord = texture2D(map, vUv);

}