// NOTE: This is needed cuz nuxt can't transpile this modules

// eslint-disable-next-line
let RenderPass
// eslint-disable-next-line
let UnrealBloomPass
// eslint-disable-next-line
let ShaderPass
// eslint-disable-next-line
let EffectComposer

export { RenderPass, UnrealBloomPass, ShaderPass, EffectComposer }

if (process.browser) {
  RenderPass =
    require('three/examples/jsm/postprocessing/RenderPass.js').RenderPass
  UnrealBloomPass =
    require('three/examples/jsm/postprocessing/UnrealBloomPass.js').UnrealBloomPass
  ShaderPass =
    require('three/examples/jsm/postprocessing/ShaderPass.js').ShaderPass
  EffectComposer =
    require('three/examples/jsm/postprocessing/EffectComposer.js').EffectComposer
}
