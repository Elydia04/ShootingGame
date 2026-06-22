import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

const DamageShader = {
  uniforms: {
    tDiffuse: { value: null },
    uIntensity: { value: 0 },
    uTime: { value: 0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uIntensity;
    uniform float uTime;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;
      vec4 color = texture2D(tDiffuse, uv);

      // Vignette — darkens edges based on damage intensity
      vec2 center = uv - 0.5;
      float dist = length(center);
      float vig = smoothstep(0.5 - uIntensity * 0.15, 0.5 - uIntensity * 0.35, dist);
      color.rgb *= 1.0 - vig * uIntensity * 0.6;

      // Grain
      float grain = hash(uv + fract(uTime) * 113.0) - 0.5;
      color.rgb += grain * uIntensity * 0.04;

      // Red tint at high damage
      if (uIntensity > 0.5) {
        float tint = (uIntensity - 0.5) * 2.0;
        color.rgb = mix(color.rgb, vec3(color.r * 1.4, color.g * 0.6, color.b * 0.4), tint * 0.3);
      }

      gl_FragColor = color;
    }
  `
};

export class PostProcessor {
  constructor(renderer, scene, camera) {
    this.composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    this.composer.addPass(renderPass);

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2),
      0.3, 0.5, 0.85
    );
    this.composer.addPass(this.bloomPass);

    this.composer.addPass(new OutputPass());

    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
    this.composer.addPass(fxaaPass);

    this.damagePass = new ShaderPass(DamageShader);
    this.composer.addPass(this.damagePass);

    this._damageIntensity = 0;
    this._damageDecay = 2;
  }

  setDamage(intensity) {
    this._damageIntensity = Math.min(1, this._damageIntensity + intensity);
  }

  update(deltaTime) {
    if (this._damageIntensity > 0) {
      this._damageIntensity -= deltaTime * this._damageDecay;
      if (this._damageIntensity < 0) this._damageIntensity = 0;
    }
    this.damagePass.uniforms.uIntensity.value = this._damageIntensity;
    this.damagePass.uniforms.uTime.value = performance.now() / 1000;
  }

  render() {
    this.composer.render();
  }

  setSize(width, height) {
    this.composer.setSize(width, height);
    this.bloomPass.resolution.set(width / 2, height / 2);
  }
}
