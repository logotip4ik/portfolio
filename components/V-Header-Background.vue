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

const mouse = new Vec2(0, 0);

function resize() {
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
  object.program.uniforms.mouse.value.lerp(mouse, 0.1);

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
      mouse: { value: new Vec2(0, 0) },
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

  resize();
  window.addEventListener('resize', resize, false);

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

    window.removeEventListener('resize', resize);
  });
}

function mountDeviceOrientationHandler() {
  const doe = DeviceOrientationEvent;
  if (
    doe &&
    doe.requestPermission &&
    typeof doe.requestPermission === 'function'
  ) {
    // after ios13
    doe
      .requestPermission()
      .then((response) => {
        if (response === 'granted')
          window.addEventListener('deviceorientation', handleDeviceOrientation);
      })
      .catch(console.error);
  } else {
    // another
    window.addEventListener('deviceorientation', handleDeviceOrientation);
  }

  onBeforeUnmount(() =>
    window.removeEventListener('deviceorientation', handleDeviceOrientation)
  );
}

let updateOffsetAngle = false;
let prevOrientation;
function handleDeviceOrientation(e) {
  let angle;
  let offsetAngle;

  /** @see https://github.com/nemutas/sp-sensor2/blob/main/src/scripts/entry.ts */
  const [alpha, beta, gamma] = [e.alpha ?? 0, e.beta ?? 0, e.gamma ?? 0];
  const orientation = screen.orientation
    ? screen.orientation.angle
    : window.orientation;

  if (!updateOffsetAngle) {
    updateOffsetAngle = orientation !== prevOrientation;
  }

  if (orientation === 0) {
    updateOffsetAngle && (offsetAngle = { x: beta, y: gamma, z: alpha });
    angle = { x: beta, y: gamma, z: alpha };
  } else if (orientation === 90) {
    updateOffsetAngle && (offsetAngle = { x: gamma, y: alpha, z: beta });
    angle = { x: gamma, y: alpha, z: beta };
  } else if (orientation === -90 || orientation === 270) {
    updateOffsetAngle && (offsetAngle = { x: gamma, y: alpha, z: beta });
    angle = { x: gamma, y: alpha, z: beta };
  }

  if (offsetAngle) {
    angle.x -= offsetAngle.x;
    angle.y -= offsetAngle.y;
    angle.z -= offsetAngle.z;
  }

  updateOffsetAngle = false;
  prevOrientation = orientation;

  mouse.y = gsap.utils.mapRange(-90, 90, 0, 2, angle.y) + 2.5;
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

  mountDeviceOrientationHandler();
});
</script>

<template>
  <canvas ref="canvas" />
</template>
