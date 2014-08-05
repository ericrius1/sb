uniform sampler2D map;
varying vec2 vUv;
varying vec3 vPosition;
void main(void) {
  vec2 uv = position.xy;
  vec4 data = texture2D(map, uv);

  vPosition = data.xyz;
  gl_PointSize = 10.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
}