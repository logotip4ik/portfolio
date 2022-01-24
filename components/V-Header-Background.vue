<template>
  <div class="header-background">
    <canvas
      v-show="isVideoHidden"
      ref="canvas"
      class="header-background__canvas"
      aria-label="landing background"
    ></canvas>
    <video
      v-show="!isVideoHidden"
      ref="video"
      loop
      autoplay
      preload
      muted="muted"
      disablepictureinpicture
      tabindex="-1"
      class="header-background__video"
      aria-label="landing background"
      src="~/assets/img/circle-animation.mp4"
    ></video>
  </div>
</template>

<script>
import * as THREE from 'three'
import {
  RenderPass,
  UnrealBloomPass,
  ShaderPass,
  EffectComposer,
} from '~/helpers/three-exports.js'

import fragmentShader from '~/assets/shaders/fragment.glsl'
import vertexShader from '~/assets/shaders/vertex.glsl'
import { AberrationShader } from '~/assets/shaders/CustomPass.js'

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
    circle: null,
    clock: null,
    isVideoHidden: true,
  }),
  mounted() {
    const { canvas } = this.$refs

    if (window.innerWidth < 700) return this.setupVideo()

    // THREE: Scene
    this.scene = new THREE.Scene()

    // THREE: Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      stencil: false,
      depth: false,
    })
    this.renderer.setPixelRatio(window.devicePixelRatio || 2)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0x000000, 1)
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = THREE.sRGBEncoding

    // THREE: Camera
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      2
    )

    this.camera.position.set(0, 0, 2)

    // THREE: Composer
    const renderPass = new RenderPass(this.scene, this.camera)
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.75,
      0.5,
      0.125
    )
    const aberrationShaderPass = new ShaderPass(AberrationShader)
    aberrationShaderPass.renderToScreen = true

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(renderPass)
    this.composer.addPass(bloomPass)
    this.composer.addPass(aberrationShaderPass)

    // THREE: Object
    const geometry = new THREE.CircleBufferGeometry(
      // 1.25 / window.devicePixelRatio,
      (window.innerWidth / 1600) * (window.devicePixelRatio || 2),
      // window.innerWidth / 1500,
      64
    )

    const material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable',
      },
      uniforms: {
        time: { value: 0.0 },
        resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        randomSeed: { value: Math.random() },
        mouseVector: { value: new THREE.Vector2(0, 0) },
        circleOpacity: { value: 0 },
        circleDistortion: { value: 1 },
      },
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
    this.circle = new THREE.Mesh(geometry, material)

    // THREE: Adding to scene
    this.scene.add(this.circle)

    // THREE: Prep
    this.resize()

    this.clock = new THREE.Clock()

    window.addEventListener('resize', this.resize)

    this.$nuxt.$on('show-circle', () => {
      this.$gsap.to(this.circle.material.uniforms.circleOpacity, {
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
    setupVideo() {
      this.isVideoHidden = false

      this.$nuxt.$on('show-circle', () => {
        this.$gsap.to('video', {
          opacity: 1,
          duration: 1.75,
          delay: 0.125,
        })
      })

      window.addEventListener('resize', () => {
        if (window.innerWidth > 700) window.location = ''
      })
    },
    resize() {
      const width = window.innerWidth
      const height = window.innerHeight

      this.renderer.setSize(width, height)
      this.composer.setSize(width, height)
      this.camera.aspect = width / height

      this.camera.updateProjectionMatrix()

      // NOTE: this will help for performance
      this.camera.matrixAutoUpdate = false
      this.camera.updateMatrix()

      this.circle.matrixAutoUpdate = false
      this.circle.updateMatrix()
    },
    render() {
      if (this.$scrollY() + 1 > window.innerHeight) return

      this.circle.material.uniforms.mouseVector.value.lerp(this.mousePos, 0.025)
      this.circle.material.uniforms.time.value = this.clock.getElapsedTime()

      this.composer.render()
    },
  },
}
</script>

<style lang="scss">
.header-background {
  &__video {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 120%;
    height: 120%;

    opacity: 0;
    object-fit: cover;
    filter: blur(2px);

    transform: translate(-50%, -50%);
  }
}
</style>
