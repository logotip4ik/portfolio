uniform float time;
uniform float randomSeed;
uniform float circleDistortion;
uniform vec2 mouseVector;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}