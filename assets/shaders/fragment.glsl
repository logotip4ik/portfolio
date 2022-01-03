varying vec2 vUv;
varying vec3 vPosition;

// varying float vColorRandom;

uniform vec2 uResolution;
uniform float time;
// uniform vec3 uColor2;
// uniform vec3 uColor3;

void main() {
  float radius = 0.5;
  float borderWidth = 0.08;
  
  float dist = length(vUv - vec2(0.5));
  float alpha = 1.0 - smoothstep(0.0125, borderWidth, abs(radius-dist));

  gl_FragColor = vec4(1., 0.9, 0.93, alpha);
  // gl_FragColor = vec4(1., 0.9, 0.93, 1);
}