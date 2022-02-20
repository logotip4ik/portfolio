<template>
  <canvas ref="canvas" class="canvas" aria-label="landing background"></canvas>
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
const clock = new THREE.Clock()
let aspect = 16 / 9

export default {
  mounted() {
    const { canvas } = this.$refs

    prefersReducedMotion = this.$prefersReducedMotion()
    aspect = window.innerWidth / window.innerHeight

    // THREE: Scene
    scene = new THREE.Scene()

    // THREE: Renderer
    renderer = new THREE.WebGLRenderer({
      canvas,
      precision: 'highp',
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3))
    renderer.outputEncoding = THREE.sRGBEncoding

    // THREE: Camera
    camera = new THREE.PerspectiveCamera(70, aspect, 0.5, 2)
    camera.position.set(0, 0, 1)

    // THREE: Object
    const size = 2
    const geometry = new THREE.PlaneBufferGeometry(size * aspect, size)
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
      },
      depthTest: false,
    })
    object = new THREE.Mesh(geometry, material)

    // THREE: Adding to scene
    scene.add(object)

    // THREE: Prep
    // NOTE: this will help for performance
    camera.matrixAutoUpdate = false
    object.matrixAutoUpdate = false

    window.addEventListener('resize', this.resize)
    this.resize()

    this.$nuxt.$on('show-shader', () => {
      isShaderRunning = true

      this.$gsap.to(object.material.uniforms.objectOpacity, {
        value: 1,
        duration: 1.75,
        delay: 0.125,
      })
    })

    // NOTE: try to use only one requestAnimationFrame
    // this will improve overall performance
    this.$gsap.ticker.add(this.render)
  },
  methods: {
    resize() {
      const canvas = renderer.domElement

      const width = canvas.clientWidth
      const height = canvas.clientHeight

      if (canvas.width !== width || canvas.height !== height) {
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }

      camera.updateMatrix()
      object.updateMatrix()
    },

    render() {
      // NOTE: Wont render anything is scrolled past window height - 20 or
      // if overlay is hiding the canvas or if user prefers reduced motion
      if (
        this.$scrollY() - 20 > window.innerHeight ||
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
