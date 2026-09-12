<template>
  <!-- Three.js rotating gallery cylinder — real event images from Unsplash -->
  <div
    ref="hostRef"
    class="threeui-background gallery"
    role="img"
    aria-label="Gallery 3D ảnh sự kiện EventAZ"
  >
    <canvas ref="canvasRef" class="gallery__canvas" aria-hidden="true" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const props = defineProps({
  speed:      { type: Number, default: 1 },
  scale:      { type: Number, default: 1 },
  opacity:    { type: Number, default: 1 },
})

const hostRef   = ref(null)
const canvasRef = ref(null)

/* ── Real event images (Unsplash, CORS-enabled) ── */
const IMAGE_URLS = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=512&q=72&auto=format&fit=crop',   // conference stage
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=512&q=72&auto=format&fit=crop',   // concert crowd
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=512&q=72&auto=format&fit=crop',   // festival lights
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=512&q=72&auto=format&fit=crop',   // networking event
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=512&q=72&auto=format&fit=crop',   // music festival
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=512&q=72&auto=format&fit=crop',   // live music
  'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=512&q=72&auto=format&fit=crop',   // DJ performance
  'https://images.unsplash.com/photo-1526328828355-69b01701ca6a?w=512&q=72&auto=format&fit=crop',   // audience
]

const FALLBACK_COLORS = [
  '#a9eff1', '#70c5df', '#bef1eb', '#f4c6c4',
  '#dffbfc', '#f1edff', '#ffe993', '#ffd0c7',
]

/* ── Renderer state ── */
let renderer, scene, camera, galleryGroup
let frameId = 0
let elapsed = 0
let prevTime = 0
let disposed = false
let resizeObserver = null

function buildFallbackTexture(color) {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(128, 128, 10, 128, 128, 200)
  g.addColorStop(0, '#ffffff')
  g.addColorStop(1, color)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function loadTextures() {
  const loader = new THREE.TextureLoader()
  loader.crossOrigin = 'anonymous'
  return IMAGE_URLS.map((url, i) =>
    new Promise(resolve => {
      loader.load(
        url,
        tex => {
          tex.colorSpace = THREE.SRGBColorSpace
          resolve(tex)
        },
        undefined,
        () => resolve(buildFallbackTexture(FALLBACK_COLORS[i % FALLBACK_COLORS.length]))
      )
    })
  )
}

async function initScene() {
  const host   = hostRef.value
  const canvas = canvasRef.value
  if (!host || !canvas) return

  /* Renderer */
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace

  /* Scene / Camera */
  scene  = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
  camera.position.z = 18

  /* Load real images while scene is already running (progressive) */
  const texPromises = loadTextures()

  /* Gallery group */
  galleryGroup = new THREE.Group()
  scene.add(galleryGroup)

  const geometry = new THREE.CylinderGeometry(5, 5, 1.8, 64, 1, true, 0, Math.PI * 0.4)
  const textures  = FALLBACK_COLORS.map(buildFallbackTexture)   // start with fallbacks
  const materials = Array.from({ length: 16 }, (_, i) =>
    new THREE.MeshBasicMaterial({
      map: textures[i % textures.length],
      opacity: 0.92,
      side: THREE.DoubleSide,
      transparent: true,
      toneMapped: false,
    })
  )

  materials.forEach((mat, i) => {
    const panel = new THREE.Mesh(geometry, mat)
    panel.position.y = (i - 8) * 2.4
    panel.rotation.y = (i / 16) * Math.PI * 4
    galleryGroup.add(panel)
  })

  /* Swap in real textures as they load */
  texPromises.forEach((promise, texIdx) => {
    promise.then(tex => {
      if (disposed) { tex.dispose(); return }
      textures[texIdx] = tex
      // Update panels that use this texture slot
      materials.forEach((mat, i) => {
        if (i % IMAGE_URLS.length === texIdx) {
          mat.map = tex
          mat.needsUpdate = true
        }
      })
    })
  })

  renderer._disposeFn = () => {
    geometry.dispose()
    materials.forEach(m => m.dispose())
    textures.forEach(t => t.dispose())
  }

  /* Resize */
  const resize = () => {
    const { width, height } = host.getBoundingClientRect()
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(Math.max(1, width), Math.max(1, height), false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderFrame()
  }
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(host)
  resize()

  /* Animation loop */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    renderFrame()
  } else {
    frameId = requestAnimationFrame(tick)
  }
}

function renderFrame(time = performance.now()) {
  if (prevTime) {
    const dt = Math.min((time - prevTime) / 1000, 0.05)
    elapsed += dt * Math.min(Math.max(props.speed, 0), 3)
  }
  prevTime = time
  if (galleryGroup) {
    galleryGroup.rotation.y = elapsed * 0.18
    galleryGroup.position.y = Math.sin(elapsed) * 1.5
    galleryGroup.scale.setScalar(Math.min(Math.max(props.scale, 0.7), 1.35))
  }
  if (renderer && scene && camera) renderer.render(scene, camera)
}

function tick(time) {
  if (disposed) return
  renderFrame(time)
  frameId = requestAnimationFrame(tick)
}

function disposeScene() {
  disposed = true
  cancelAnimationFrame(frameId)
  resizeObserver?.disconnect()
  resizeObserver = null
  if (renderer) {
    renderer._disposeFn?.()
    galleryGroup?.clear()
    renderer.dispose()
    renderer = null
  }
}

onMounted(initScene)
onUnmounted(disposeScene)
</script>

<style scoped>
.threeui-background {
  width: 100%;
  height: 100%;
}
.gallery__canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
