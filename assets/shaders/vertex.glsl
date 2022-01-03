uniform float time;

varying vec2 vUv;
varying vec3 vPosition;

// const float PI = 3.141592653589793238462643383279502884197; 

void main() {
  vUv = uv;
  vPosition = position;

  vec4 newPos = modelViewMatrix * vec4( position, 1.0 );

  newPos.xy += vec2(sin(time * 2. + newPos.y * 3.) / 50.);

  gl_Position = projectionMatrix * newPos;
}