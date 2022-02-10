<template>
  <div class="header-background">
    <canvas
      ref="canvas"
      class="header-background__canvas"
      aria-label="landing background"
    ></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'

import fragmentShader from '~/assets/shaders/fragment.glsl'
import vertexShader from '~/assets/shaders/vertex.glsl'

// NOTE: Probably asking why ?
// This will increase performance just a bit
// cuz vue wont check if dom needs update
let hasRunOnce = false
let isShaderRunning = false
let prefersReducedMotion = false
let camera = null
let scene = null
let renderer = null
let object = null
let clock = null

export default {
  mounted() {
    const { canvas } = this.$refs

    prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // THREE: Scene
    scene = new THREE.Scene()

    // THREE: Renderer
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      stencil: false,
      depth: false,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3))
    renderer.setClearColor(0x121212, 1)
    renderer.sortObjects = false
    renderer.physicallyCorrectLights = true
    renderer.outputEncoding = THREE.sRGBEncoding

    // THREE: Camera
    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      100
    )

    camera.position.set(0, 0, 1)

    // THREE: Object
    const size = 1.4
    const geometry = new THREE.PlaneBufferGeometry(size, size)

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
        noise: { value: prefersReducedMotion ? 1.0 : 0.0 },
        resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      depthTest: false,
      depthWrite: false,
      transparent: true,
    })
    object = new THREE.Mesh(geometry, material)

    // THREE: Adding to scene
    scene.add(object)

    // THREE: Prep
    const resizeObserver = new ResizeObserver(this.resize)
    resizeObserver.observe(renderer.domElement, { box: 'border-box' })
    this.resize(true)

    clock = new THREE.Clock()

    this.$nuxt.$on('show-shader', () => {
      isShaderRunning = true

      this.$gsap.to(object.material.uniforms.objectOpacity, {
        value: 1,
        duration: 1.75,
        delay: 0.125,
      })
      this.$gsap.to(object.material.uniforms.noise, {
        value: 1,
        duration: 4,
        ease: 'power3.out',
        delay: 0.1,
      })
    })

    // NOTE: try to use only one requestAnimationFrame
    // this will improve overall performance
    this.$gsap.ticker.add(this.render)
  },
  methods: {
    resize(forceResize = false) {
      const canvas = renderer.domElement

      const width = canvas.clientWidth
      const height = canvas.clientHeight

      if (canvas.width !== width || canvas.height !== height || forceResize) {
        renderer.setSize(width, height, false)

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        // NOTE: this will help for performance
        camera.matrixAutoUpdate = false
        camera.updateMatrix()

        object.matrixAutoUpdate = false
        object.updateMatrix()

        // NOTE: not perfect, at least it will cover all the viewport
        object.scale.x = 1.4 * (width / height)
      }
    },
    render() {
      if (
        this.$scrollY() - 10 > window.innerHeight ||
        !isShaderRunning ||
        (prefersReducedMotion && hasRunOnce)
      )
        return

      if (prefersReducedMotion) hasRunOnce = true

      object.material.uniforms.time.value = clock.getElapsedTime()

      renderer.render(scene, camera)
    },
  },
}
</script>

<style lang="scss">
.header-background {
  overflow: hidden;

  &__canvas {
    display: block;

    width: 100vw;
    height: 100vh;

    filter: blur(2.5px);
  }

  &::after {
    content: '';

    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(3, 3, 3, 0.75);

    pointer-events: none;
  }

  &::before {
    content: '';

    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 25%;
    min-height: 2rem;
    max-height: 11rem;

    background: linear-gradient(
      to top,
      var(--black-color) 0%,
      var(--black-color) 25%,
      rgba(3, 3, 3, 0)
    );
  }
}
</style>
