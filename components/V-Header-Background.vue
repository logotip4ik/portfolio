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

export default {
  props: {
    mousePos: {
      type: Object,
      required: true,
      default: () => new THREE.Vector2(),
    },
  },
  data: () => ({
    camera: null,
    scene: null,
    renderer: null,
    composer: null,
    object: null,
    clock: null,
  }),
  mounted() {
    const { canvas } = this.$refs

    // THREE: Scene
    this.scene = new THREE.Scene()

    // THREE: Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      stencil: false,
      depth: false,
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3))
    this.renderer.setClearColor(0x121212, 1)
    this.renderer.sortObjects = false
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = THREE.sRGBEncoding

    // THREE: Camera
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      100
    )

    this.camera.position.set(0, 0, 1)

    // THREE: Object
    const size = 1.4
    const geometry = new THREE.PlaneBufferGeometry(
      size * (window.innerWidth / window.innerHeight),
      size
    )

    const material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable',
      },
      uniforms: {
        time: { value: 0.0 },
        randomSeed: { value: Math.random() },
        objectOpacity: { value: 0.0 },
        resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      depthTest: false,
      depthWrite: false,
      transparent: true,
    })
    this.object = new THREE.Mesh(geometry, material)

    // THREE: Adding to scene
    this.scene.add(this.object)

    // THREE: Prep
    this.resize()

    this.clock = new THREE.Clock()

    this.$nuxt.$on('show-circle', () => {
      this.$gsap.to(this.object.material.uniforms.objectOpacity, {
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
      const canvas = this.renderer.domElement

      const width = canvas.clientWidth
      const height = canvas.clientHeight

      if (canvas.width !== width || canvas.height !== height) {
        this.renderer.setSize(width, height, false)
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
      }

      // NOTE: this will help for performance
      this.camera.matrixAutoUpdate = false
      this.camera.updateMatrix()

      this.object.matrixAutoUpdate = false
      this.object.updateMatrix()
    },
    render() {
      if (this.$scrollY() + 1 > window.innerHeight) return

      this.resize()

      this.object.material.uniforms.time.value = this.clock.getElapsedTime()

      this.renderer.render(this.scene, this.camera)
    },
  },
}
</script>

<style lang="scss">
.header-background {
  position: relative;

  &__canvas {
    display: block;

    width: 100vw;
    height: 100vh;

    filter: blur(2px);
  }

  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color: #000000, $alpha: 0.4);
  }
}
</style>
