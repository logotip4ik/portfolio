<template>
  <header class="header">
    <canvas ref="canvas" class="header__canvas"></canvas>
    <div class="header__container">
      <h1 class="header__container__title">
        Bogdan<br /><span class="ml-responsive serif">Kostyuk</span>
      </h1>
      <p class="header__container__subtitle">Front End Developer</p>
    </div>
  </header>
</template>

<script>
import * as THREE from 'three'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

import fragmentShader from '~/assets/shaders/fragment.glsl'
import vertexShader from '~/assets/shaders/vertex.glsl'
import { AberrationShader } from '~/assets/shaders/CustomPass.js'

export default {
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
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio || 2)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0x000000, 1)
    this.renderer.physicallyCorrectLights = true
    this.renderer.outputEncoding = THREE.sRGBEncoding

    // THREE: Camera
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
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

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(renderPass)
    this.composer.addPass(bloomPass)
    this.composer.addPass(AberrationShaderPass)

    // THREE: Object
    const geometry = new THREE.CircleBufferGeometry(
      // 1.25 / window.devicePixelRatio,
      (window.innerWidth / 1500) * (window.devicePixelRatio || 2),
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
        time: { value: 0.0, type: 'f' },
        resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
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
    // NOTE: try to use one requestAnimationFrame
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
      this.circle.material.uniforms.time.value = this.clock.getElapsedTime()
      this.composer.render()
    },
  },
}
</script>

<style lang="scss">
.header {
  position: relative;
  isolation: isolate;

  width: 100%;
  min-height: 100vh;

  &__canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    width: 100%;
    height: 100%;
  }

  &__container {
    position: absolute;
    top: 50%;
    left: 50%;

    color: white;
    mix-blend-mode: difference;

    transform: translate(-50%, -50%);

    &__title {
      margin-bottom: 1rem;
    }
    &__subtitle {
      text-align: center;
    }
  }
}
</style>
