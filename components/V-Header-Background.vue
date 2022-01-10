<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import * as THREE from 'three'

import fragmentShader from '~/assets/shaders/fragment.glsl'
import vertexShader from '~/assets/shaders/vertex.glsl'
import { AberrationShader } from '~/assets/shaders/CustomPass.js'

let EffectComposer
let RenderPass
let UnrealBloomPass
let ShaderPass

// NOTE: This actually enables to turn on ssr in nuxt and don't even try to wrap it into client only component
// cuz it isn't fixing the issue. The component still is transpiled on a server which is causing the error
if (process.browser) {
  EffectComposer =
    require('three/examples/jsm/postprocessing/EffectComposer.js').EffectComposer
  RenderPass =
    require('three/examples/jsm/postprocessing/RenderPass.js').RenderPass
  UnrealBloomPass =
    require('three/examples/jsm/postprocessing/UnrealBloomPass').UnrealBloomPass
  ShaderPass =
    require('three/examples/jsm/postprocessing/ShaderPass.js').ShaderPass
}

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
  }),
  mounted() {
    const { canvas } = this.$refs

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
    const AberrationShaderPass = new ShaderPass(AberrationShader)
    AberrationShaderPass.renderToScreen = true

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(renderPass)
    this.composer.addPass(bloomPass)
    this.composer.addPass(AberrationShaderPass)

    // THREE: Object
    const geometry = new THREE.CircleBufferGeometry(
      // 1.25 / window.devicePixelRatio,
      (window.innerWidth / 1600) * (window.devicePixelRatio || 2),
      // window.innerWidth / 1500,
      128
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
        randomSeed: { value: Math.random() * 100 },
        mouseVector: { value: new THREE.Vector2(0, 0) },
        circleOpacity: { value: 0 },
        circleDistortion: { value: 0 },
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
    this.clock = new THREE.Clock()

    this.resize()
    window.addEventListener('resize', this.resize)

    this.$nuxt.$on('show-circle', () => {
      this.$gsap.to(this.circle.material.uniforms.circleOpacity, {
        value: 1,
        duration: 1.75,
        delay: 0.125,
      })
      this.$gsap.to(this.circle.material.uniforms.circleDistortion, {
        value: 1,
        duration: 2.5,
        delay: 1,
      })
    })

    // NOTE: try to use only one requestAnimationFrame
    // this will improve overall performance
    this.$gsap.ticker.add(this.render)
  },
  methods: {
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
      this.circle.material.uniforms.mouseVector.value.lerp(this.mousePos, 0.025)

      this.circle.material.uniforms.time.value = this.clock.getElapsedTime()
      this.composer.render()
    },
  },
}
</script>
