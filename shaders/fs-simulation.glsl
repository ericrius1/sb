uniform sampler2D tOrigins;
varying vec2 vUv;
void main(){
  vec3 pos = texture2D(tPositions, vUv);
  pos.xyz = texture2D(tOrigins, vUv).xyz;
  gl_FragColor = vec4(pos, 1.0);
}