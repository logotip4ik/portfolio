<script setup>
// prettier-ignore
import { Renderer, Transform, Camera, Plane, Program, Vec2, Color, Mesh } from 'ogl';

import fragmentShader from '~/assets/shaders/fragment.glsl';
import vertexShader from '~/assets/shaders/vertex.glsl';

import { WhitePinkGreen as pallet } from '~/assets/shaders/colors';
import { MAX_DPR } from '~/lib/constants';

const { $smoothScroll } = useNuxtApp();
const { gsap } = useGsap();
const emitter = useEmitter();
const isDarkMode = useDarkMode();
const prefersReducedMotion = useReducedMotion();

const canvas = ref(null);

let isShaderRunning = false;
let camera = null;
let scene = null;
let renderer = null;
let gl = null;
let object = null;
let aspect = 16 / 9;

function resize() {
  console.log('resize');

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });

  object.program.uniforms.resolution.value.set(
    window.innerWidth,
    window.innerHeight
  );

  object.updateMatrix();
  camera.updateMatrix();
}

function render() {
  if ($smoothScroll.scrollY() + 20 > window.innerHeight || !isShaderRunning)
    return;

  const nextTime = prefersReducedMotion.value ? 0 : 0.0085;
  object.program.uniforms.time.value += nextTime;

  renderer.render({ scene, camera });
}

function createBackground() {
  aspect = window.innerWidth / window.innerHeight;

  const clearColor = (isDarkMode.value ? [3, 3, 3] : [235, 235, 235]).map(
    (number) => number / 255
  );

  renderer = new Renderer({
    canvas: canvas.value,
    dpr: Math.min(window.devicePixelRatio, MAX_DPR),
    alpha: false,
    depth: false,
    width: window.innerWidth,
    height: window.innerHeight,
    powerPreference: 'high-performance',
  });

  gl = renderer.gl;

  gl.clearColor(...clearColor, 1);

  camera = new Camera(gl, { fov: 70, aspect, near: 0.5, far: 1.5 });
  camera.position.set(0, 0, 1);

  scene = new Transform();

  const objectSize = 2;
  const objectGeometry = new Plane(gl, {
    width: objectSize * aspect,
    height: objectSize,
  });
  const objectMaterial = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    transparent: false,
    depthTest: false,
    depthWrite: false,
    cullFace: false,
    uniforms: {
      time: { value: 0.0 },
      randomSeed: { value: Math.random() },
      objectOpacity: { value: 0.0 },
      noisePower: { value: 1.0 },
      pixelRatio: { value: window.devicePixelRatio },
      resolution: {
        value: new Vec2(window.innerWidth, window.innerHeight),
      },
      color1: {
        value: isDarkMode.value
          ? new Color(pallet.color1.dark)
          : new Color(pallet.color1.light),
      },
      color2: {
        value: isDarkMode.value
          ? new Color(pallet.color2.dark)
          : new Color(pallet.color2.light),
      },
      color3: {
        value: isDarkMode.value
          ? new Color(pallet.color3.dark)
          : new Color(pallet.color3.light),
      },
    },
  });

  object = new Mesh(gl, {
    geometry: objectGeometry,
    program: objectMaterial,
  });
  object.setParent(scene);

  isShaderRunning = true;

  object.matrixAutoUpdate = false;
  camera.matrixAutoUpdate = false;

  const observer = new ResizeObserver(resize);
  observer.observe(canvas.value.parentElement);

  // NOTE: try to use only one requestAnimationFrame
  // this will improve overall performance
  const callbackTicker = gsap.ticker.add(render);

  gsap.to(object.program.uniforms.objectOpacity, {
    value: 1,
    duration: 1,
    delay: 0.4,
    onComplete: () => emitter.emit('shader:running'),
  });

  onBeforeUnmount(() => {
    gsap.ticker.remove(callbackTicker);

    observer.disconnect()
  });
}

watch(isDarkMode, (value) => {
  if (!object) return;

  const switchTo = value ? 'dark' : 'light';

  const tl = gsap.timeline();

  tl.to(object.program.uniforms.color1.value, pallet.color1[switchTo], 0);
  tl.to(object.program.uniforms.color2.value, pallet.color2[switchTo], 0);
  tl.to(object.program.uniforms.color3.value, pallet.color3[switchTo], 0);
});

onMounted(() => {
  createBackground();
});
</script>

<template>
  <canvas ref="canvas" />
</template>
