<script setup>
import * as THREE from 'three';

import fragmentShader from '~/assets/shaders/fragment.glsl';
import vertexShader from '~/assets/shaders/vertex.glsl';

import { WhitePinkGreen as pallet } from '~/assets/shaders/colors';

const { gsap } = useGsap();
const { $smoothScroll, $isDarkMode, $onColorSchemeChange } = useNuxtApp();

const canvas = ref(null);

let hasRunOnce = false;
let isShaderRunning = false;
let prefersReducedMotion = false;
let camera = null;
let scene = null;
let renderer = null;
let object = null;
const clock = new THREE.Clock();
let aspect = 16 / 9;

const MAX_DPR = 2.3;

function resize() {
  const canvas = renderer.domElement;

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if (canvas.width !== width || canvas.height !== height) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  camera.updateMatrix();
  object.updateMatrix();

  object.material.uniforms.resolution.value.set(
    window.innerWidth,
    window.innerHeight
  );
}

function render() {
  if (
    $smoothScroll.scrollY() + 20 > window.innerHeight ||
    !isShaderRunning ||
    (prefersReducedMotion && hasRunOnce)
  )
    return;

  if (prefersReducedMotion) hasRunOnce = true;

  object.material.uniforms.time.value = clock.getElapsedTime();

  renderer.render(scene, camera);
}

onMounted(() => {
  // prefersReducedMotion = this.$prefersReducedMotion()

  const isDarkMode = $isDarkMode();
  prefersReducedMotion = false;
  aspect = window.innerWidth / window.innerHeight;

  // THREE: Scene
  scene = new THREE.Scene();

  // THREE: Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    precision: 'highp',
    powerPreference: 'high-performance',
  });
  // NOTE: after 2.3 devices start to struggle a lot with the shader
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_DPR));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.autoClearColor = isDarkMode
    ? new THREE.Color(3, 3, 3)
    : new THREE.Color(235, 235, 235);
  renderer.failIfMajorPerformanceCaveat = true;

  // THREE: Camera
  camera = new THREE.PerspectiveCamera(70, aspect, 0.5, 2);
  camera.position.set(0, 0, 1);

  // THREE: Object
  const size = 2;
  const geometry = new THREE.PlaneBufferGeometry(size * aspect, size);
  const material = new THREE.ShaderMaterial({
    fragmentShader,
    vertexShader,
    extensions: {
      derivatives: '#extension GL_OES_standard_derivatives : enable',
    },
    uniforms: {
      time: { value: 0.0 },
      randomSeed: { value: Math.random() },
      objectOpacity: { value: prefersReducedMotion ? 1.0 : 0.0 },
      noisePower: { value: 1.0 },
      pixelRatio: { value: window.devicePixelRatio },
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      color1: {
        value: isDarkMode
          ? new THREE.Vector3(...Object.values(pallet.color1.dark))
          : new THREE.Vector3(...Object.values(pallet.color1.light)),
      },
      color2: {
        value: isDarkMode
          ? new THREE.Vector3(...Object.values(pallet.color2.dark))
          : new THREE.Vector3(...Object.values(pallet.color2.light)),
      },
      color3: {
        value: isDarkMode
          ? new THREE.Vector3(...Object.values(pallet.color3.dark))
          : new THREE.Vector3(...Object.values(pallet.color3.light)),
      },
    },
    depthTest: false,
  });
  object = new THREE.Mesh(geometry, material);

  // THREE: Adding to scene
  scene.add(object);

  // THREE: Prep
  // NOTE: this will help for performance
  camera.matrixAutoUpdate = false;
  object.matrixAutoUpdate = false;

  window.addEventListener('resize', resize);
  resize();

  setTimeout(() => {
    isShaderRunning = true;

    gsap.to(object.material.uniforms.objectOpacity, {
      value: 1,
      duration: 1.75,
      delay: 0.125,
    });
  }, 500);

  $onColorSchemeChange((media) => {
    const switchTo = media.matches ? 'light' : 'dark';

    const tl = gsap.timeline({ paused: true });

    tl.to(object.material.uniforms.color1.value, pallet.color1[switchTo], 0);
    tl.to(object.material.uniforms.color2.value, pallet.color2[switchTo], 0);
    tl.to(object.material.uniforms.color3.value, pallet.color3[switchTo], 0);

    tl.play();
  });

  // NOTE: try to use only one requestAnimationFrame
  // this will improve overall performance
  gsap.ticker.add(render);
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
