<template>
  <div class="sketchbook-root" ref="rootRef">
    <div class="wash-subtle" aria-hidden="true" />

    <div class="sb-wrap" ref="wrapRef" id="sbWrap">
      <svg width="0" height="0" style="position:absolute" aria-hidden="true">
        <filter id="sb-mblur-1"><feGaussianBlur stdDeviation="5 0"/></filter>
        <filter id="sb-mblur-2"><feGaussianBlur stdDeviation="14 0"/></filter>
      </svg>

      <div class="sb-stage" ref="stageRef" id="sbStage">
        <button class="sb-arrow left" @click="step('prev')" aria-label="previous page">
          <svg viewBox="0 0 14 44" width="14" height="44" fill="none" aria-hidden="true">
            <polyline points="11,3 3,22 11,41" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="sb-3d" ref="sb3dRef" id="sb3d">
          <div class="sb-tilt" ref="sbTiltRef" id="sbTilt">
            <div class="sb-cast ambient" aria-hidden="true" />
            <div class="sb-cast contact" aria-hidden="true" />
            <div class="sb-cast hair" aria-hidden="true" />
            <div class="sb-book" ref="bookRef" id="sbBook" />
          </div>
        </div>

        <button class="sb-arrow right" @click="step('next')" aria-label="next page">
          <svg viewBox="0 0 14 44" width="14" height="44" fill="none" aria-hidden="true">
            <polyline points="3,3 11,22 3,41" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const DIR = '/landing-pages/meng-to-sketchbook/'
const PAGES = [
  { file: 'marina-bay-sands.png',   title: 'Marina Bay Sands',          place: 'Bayfront' },
  { file: 'gardens-by-the-bay.png', title: 'Gardens by the Bay',        place: 'Supertree Grove' },
  { file: 'merlion.png',            title: 'The Merlion',               place: 'Merlion Park' },
  { file: 'buddha-tooth.png',       title: 'Buddha Tooth Relic Temple', place: 'Chinatown' },
  { file: 'joo-chiat.png',          title: 'Joo Chiat Shophouses',      place: 'Katong' },
  { file: 'lau-pa-sat.png',         title: 'Lau Pa Sat',                place: 'Raffles Quay' },
  { file: 'marina-bay-skyline.png', title: 'Marina Bay Skyline',        place: 'The Bay' },
  { file: 'singapore-river.png',    title: 'Singapore River',           place: 'Boat Quay' },
  { file: 'botanic-gardens.png',    title: 'Botanic Gardens',           place: 'Tanglin' }
]
PAGES.forEach(p => (p.url = DIR + p.file))
const M = PAGES.length
const LAND = 6

const rootRef = ref(null)
const wrapRef = ref(null)
const stageRef = ref(null)
const sb3dRef = ref(null)
const sbTiltRef = ref(null)
const bookRef = ref(null)
const capBoxRef = ref(null)
const hintGone = ref(false)

/* ── Geometry & turning leaf parameters ── */
const N = 18           /* strips for smooth curve */
const SPAN = 0.449     /* gutter -> outer edge fraction */
const BETA = 0.60      /* peak curl arc */

let idx = 0
let turn = null
let strips = []
let destroyed = false
let resizeObserver = null

function el(t, c) {
  const e = document.createElement(t)
  if (c) e.className = c
  return e
}

function imgEl(i, side) {
  const im = new Image()
  im.className = 'sb-half-img ' + side
  im.draggable = false
  im.alt = ''
  im.src = PAGES[i].url
  return im
}

function halfEl(pos, i) {
  const d = el('div', 'sb-half ' + pos)
  d.appendChild(imgEl(i, pos))
  d.appendChild(el('div', 'gutter-shade ' + pos))
  return d
}

function buildCurl(dir, from, to) {
  strips = []
  const c = el('div', 'curl ' + dir)
  c.style.setProperty('--n', String(N))
  c.style.setProperty('--span', String(SPAN))
  let host = c
  for (let i = 0; i < N; i++) {
    const s = el('div', 'strip')
    s.style.setProperty('--i', String(i))
    const gut = 'calc(var(--bw) * 0.5)'
    const sw = 'calc(var(--bw) * ' + SPAN + ' / ' + N + ')'
    const A = 'calc(-1 * (' + gut + ' + ' + i + ' * ' + sw + '))'
    const B = 'calc(' + (i + 1) + ' * ' + sw + ' - ' + gut + ')'
    const f = el('div', 'face front')
    const b = el('div', 'face back')
    const dress = (element, url, px) => {
      element.style.backgroundImage = 'url(' + url + ')'
      element.style.backgroundPositionX = px
    }
    dress(f, PAGES[from].url, dir === 'next' ? A : B)
    dress(b, PAGES[to].url, dir === 'next' ? B : A)
    f.appendChild(el('div', 'sh'))
    f.appendChild(el('div', 'gl'))
    b.appendChild(el('div', 'sh'))
    b.appendChild(el('div', 'gl'))
    s.appendChild(f)
    s.appendChild(b)
    if (i === N - 1) s.classList.add('edge')
    host.appendChild(s)
    host = s
    strips.push(s)
  }
  return c
}

function applyTurn(t) {
  if (!sb3dRef.value) return
  const th = Math.PI * t
  const beta = BETA * Math.sin(Math.PI * t)
  const D = 180 / Math.PI
  const tt = th + beta
  const td = (2 * beta) / N
  sb3dRef.value.style.setProperty('--tt', (tt * D).toFixed(2) + 'deg')
  sb3dRef.value.style.setProperty('--td', (td * D).toFixed(3) + 'deg')
  sb3dRef.value.style.setProperty('--shade', Math.sin(Math.PI * t).toFixed(3))
  fadeCaption(t)
  for (let i = 0; i < strips.length; i++) {
    const l1 = Math.abs(Math.cos(tt - i * td))
    const l2 = Math.abs(Math.cos(tt - (i + 1) * td))
    const st = strips[i].style
    st.setProperty('--lit', l1.toFixed(3))
    st.setProperty('--a1', ((1 - l1) * 0.62).toFixed(3))
    st.setProperty('--a2', ((1 - l2) * 0.62).toFixed(3))
  }
}

function paint() {
  const book = bookRef.value
  if (!book) return
  book.textContent = ''
  if (!turn) {
    const f = el('div', 'sb-full')
    const im = new Image()
    im.src = PAGES[idx].url
    im.alt = PAGES[idx].title
    im.draggable = false
    f.appendChild(im)
    book.appendChild(f)
    sb3dRef.value?.style.setProperty('--shade', '0')
  } else {
    const next = turn.dir === 'next'
    book.appendChild(halfEl('left', next ? turn.from : turn.to))
    book.appendChild(halfEl('right', next ? turn.to : turn.from))
    book.appendChild(buildCurl(turn.dir, turn.from, turn.to))
    applyTurn(turn.t)
  }
  const a = el('button', 'sb-zone sb-prev')
  const b = el('button', 'sb-zone sb-next')
  a.setAttribute('aria-label', 'previous page')
  b.setAttribute('aria-label', 'next page')
  book.appendChild(a)
  book.appendChild(b)
  layout()
}

function caption() {}
function fadeCaption() {}

function layout() {
  if (bookRef.value && sb3dRef.value) {
    sb3dRef.value.style.setProperty('--bw', bookRef.value.clientWidth + 'px')
  }
}

/* ── Spring loop ── */
let spring = null
let raf = null
let last = 0

function animateTo(target, onDone, stiff, damp) {
  spring = { kind: 'spring', v: 0, target: target, done: onDone, k: stiff || 150, c: damp || 22 }
  kick()
}

function tweenTo(target, dur, onDone) {
  spring = { kind: 'tween', from: turn ? turn.t : 0, target: target, dur: dur, e: 0, done: onDone }
  kick()
}

function tick(now) {
  raf = null
  if (destroyed) return
  const dt = Math.min(0.032, (now - last) / 1000 || 0.016)
  last = now
  if (spring && turn) {
    const s = spring
    if (s.kind === 'tween') {
      s.e += dt
      const k = Math.min(1, s.e / s.dur)
      turn.t = s.from + (s.target - s.from) * k
      applyTurn(turn.t)
      if (k >= 1) {
        spring = null
        const d = s.done
        d && d()
      }
    } else {
      const x = turn.t - s.target
      s.v += (-s.k * x - s.c * s.v) * dt
      turn.t += s.v * dt
      if (Math.abs(turn.t - s.target) < 0.002 && Math.abs(s.v) < 0.02) {
        turn.t = s.target
        spring = null
        applyTurn(turn.t)
        const d = s.done
        d && d()
      } else {
        applyTurn(turn.t)
      }
    }
  }
  viewSpring()
  if ((spring || viewActive) && raf === null) {
    raf = requestAnimationFrame(tick)
  }
}

function kick() {
  if (raf === null && !destroyed) {
    last = performance.now()
    raf = requestAnimationFrame(tick)
  }
}

/* ── Tilt + View ── */
const TILT_X = 4.5
const TILT_Y = 7
const view = { rx: 0, ry: 0, z: 1.12, trx: 0, try_: 0, tz: 1.12 }
let viewActive = false

function applyView() {
  if (!sb3dRef.value) return
  sb3dRef.value.style.setProperty('--rx', view.rx.toFixed(2) + 'deg')
  sb3dRef.value.style.setProperty('--ry', view.ry.toFixed(2) + 'deg')
  sb3dRef.value.style.setProperty('--zoom', view.z.toFixed(3))
}

function viewSpring() {
  const e = 0.14
  let moved = false
  for (const [k, t] of [
    ['rx', 'trx'],
    ['ry', 'try_'],
    ['z', 'tz']
  ]) {
    const d = view[t] - view[k]
    if (Math.abs(d) > 0.0006) {
      view[k] += d * e
      moved = true
    } else {
      view[k] = view[t]
    }
  }
  if (moved) applyView()
  viewActive = moved
  return moved
}

function setView(rx, ry, z) {
  view.trx = Math.max(-TILT_X, Math.min(TILT_X, rx))
  view.try_ = Math.max(-TILT_Y, Math.min(TILT_Y, ry))
  view.tz = Math.max(1.0, Math.min(1.35, z))
  viewActive = true
  kick()
}

function tiltTo(cx, cy) {
  if (drag || !bookRef.value) return
  const r = bookRef.value.getBoundingClientRect()
  if (!r.width) return
  const nx = Math.max(-1, Math.min(1, (cx - (r.left + r.width / 2)) / (r.width * 0.62)))
  const ny = Math.max(-1, Math.min(1, (cy - (r.top + r.height / 2)) / (r.height * 0.9)))
  setView(-ny * TILT_X, nx * TILT_Y, view.tz)
}

function onPointerMoveHost(e) {
  if (e.pointerType === 'touch') return
  tiltTo(e.clientX, e.clientY)
}

function onPointerLeaveHost() {
  setView(0, 0, view.tz)
}

/* ── Turn control ── */
function startTurn(dir, t) {
  spring = null
  if (turn) {
    idx = turn.to
    turn = null
  }
  const from = idx
  turn = {
    dir: dir,
    from: from,
    to: dir === 'next' ? (from + 1) % M : (from - 1 + M) % M,
    t: t || 0
  }
  paint()
}

function commit() {
  if (!turn) return
  animateTo(
    1,
    () => {
      idx = turn.to
      turn = null
      paint()
    },
    170,
    26
  )
  kick()
}

function cancel() {
  if (!turn) return
  animateTo(
    0,
    () => {
      turn = null
      paint()
    },
    150,
    24
  )
  kick()
}

function step(dir) {
  endIntro()
  if (turn) {
    idx = turn.to
    turn = null
  }
  startTurn(dir, 0)
  commit()
}

/* ── Pointer Drag Interactions ── */
let drag = null

function hideHint() {
  hintGone.value = true
}

function onPointerDown(e) {
  if (e.button !== 0) return
  const onBook = e.target.closest('.sb-zone')
  if (!onBook || introOn) return
  e.preventDefault()
  stageRef.value?.setPointerCapture(e.pointerId)
  hideHint()
  const r = bookRef.value.getBoundingClientRect()
  const dir = (e.clientX - r.left) / r.width > 0.5 ? 'next' : 'prev'
  startTurn(dir, 0)
  drag = { dir: dir, x0: e.clientX, w: r.width, moved: 0, vel: 0, tPrev: performance.now() }
}

function onPointerMove(e) {
  if (!drag) return
  const dx = e.clientX - drag.x0
  drag.moved = Math.max(drag.moved, Math.abs(dx))
  const raw = (drag.dir === 'next' ? -dx : dx) / (drag.w * 0.62)
  const t = Math.max(0, Math.min(1, raw))
  const now = performance.now()
  drag.vel = (t - (turn ? turn.t : 0)) / Math.max(0.001, (now - drag.tPrev) / 1000)
  drag.tPrev = now
  if (turn) {
    turn.t = t
    applyTurn(t)
  }
}

function onPointerUp() {
  if (!drag) return
  const d = drag
  drag = null
  if (!turn) return
  if (d.moved < 6) {
    commit()
    return
  }
  const go = turn.t > 0.42 || d.vel > 1.1
  if (go) commit()
  else cancel()
}

/* ── Riffle Intro ── */
let riffle = null
let riffleAt = 0
let introOn = false

function endIntro() {
  introOn = false
  wrapRef.value?.classList.remove('intro', 'b2')
}

function riffleStep() {
  if (!introOn || !riffle || riffleAt >= riffle.length) {
    endIntro()
    paint()
    return
  }
  const s = riffle[riffleAt]
  wrapRef.value?.classList.toggle('b2', s.bell > 0.55)
  startTurn('next', 0)
  tweenTo(1, s.dur, () => {
    idx = turn.to
    turn = null
    riffleAt++
    if (introOn && riffleAt < riffle.length) {
      paint()
      riffleStep()
    } else {
      endIntro()
      paint()
    }
  })
}

function startIntro() {
  const coarse = window.matchMedia('(max-width: 640px), (pointer: coarse)').matches
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (coarse || reduced) {
    idx = LAND
    paint()
    return
  }
  const steps = M + LAND
  riffle = []
  for (let r = 0; r < steps; r++) {
    const bell = Math.sin(Math.PI * (r / (steps - 1)))
    riffle.push({ bell: bell, dur: 0.26 - 0.19 * bell })
  }
  riffleAt = 0
  introOn = true
  wrapRef.value?.classList.add('intro')
  riffleStep()
}

/* ── Lifecycle ── */
onMounted(async () => {
  paint()
  applyView()

  const stage = stageRef.value
  if (stage) {
    stage.addEventListener('pointerdown', onPointerDown)
    stage.addEventListener('pointermove', onPointerMove)
    stage.addEventListener('pointerup', onPointerUp)
    stage.addEventListener('pointercancel', onPointerUp)
  }

  const root = rootRef.value
  if (root) {
    root.addEventListener('pointermove', onPointerMoveHost, { passive: true })
    root.addEventListener('pointerleave', onPointerLeaveHost)
  }

  resizeObserver = new ResizeObserver(() => {
    layout()
  })
  if (rootRef.value) resizeObserver.observe(rootRef.value)

  /* Preload images */
  await Promise.all(
    PAGES.map(
      p =>
        new Promise(resolve => {
          const im = new Image()
          im.src = p.url
          if (im.decode) {
            im.decode().then(resolve).catch(resolve)
          } else {
            im.onload = im.onerror = resolve
          }
        })
    )
  )

  layout()
  setTimeout(startIntro, 350)
})

onUnmounted(() => {
  destroyed = true
  cancelAnimationFrame(raf)
  resizeObserver?.disconnect()
  const stage = stageRef.value
  if (stage) {
    stage.removeEventListener('pointerdown', onPointerDown)
    stage.removeEventListener('pointermove', onPointerMove)
    stage.removeEventListener('pointerup', onPointerUp)
    stage.removeEventListener('pointercancel', onPointerUp)
  }
  const root = rootRef.value
  if (root) {
    root.removeEventListener('pointermove', onPointerMoveHost)
    root.removeEventListener('pointerleave', onPointerLeaveHost)
  }
})
</script>

<style scoped>
@font-face {
  font-family: 'Instrument Serif';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/landing-pages/meng-to-sketchbook/instrument-serif.woff2') format('woff2');
}

.sketchbook-root {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  background: radial-gradient(circle at 50% 45%, #f4ede1 0%, #ece5d6 60%, #e1d8c4 100%);
  border-radius: inherit;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
}

.wash-subtle {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: url('/landing-pages/meng-to-sketchbook/bg-wash.jpg') center top / cover no-repeat;
  opacity: 0.35;
  mix-blend-mode: multiply;
}

.sb-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  position: relative;
  z-index: 2;
}

.sb-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  touch-action: pan-y;
}

.sb-arrow {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  border: 0;
  background: transparent;
  color: rgba(43, 39, 33, 0.4);
  cursor: pointer;
  transition: color 0.2s, transform 0.2s;
  z-index: 8;
}

.sb-arrow:hover {
  color: #2b2721;
  transform: scale(1.15);
}

.sb-3d {
  position: relative;
  flex: 1 1;
  min-width: 0;
  width: 100%;
  max-width: 650px;
  perspective: 1600px;
  perspective-origin: 50% 46%;
}

.sb-tilt {
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--zoom, 1));
  will-change: transform;
}

.sb-book {
  position: relative;
  width: 100%;
  aspect-ratio: 1760/1240;
  transform-style: preserve-3d;
  z-index: 1;
}

/* Shadows */
.sb-cast {
  position: absolute;
  pointer-events: none;
  z-index: 0;
}

.sb-cast.ambient {
  left: 5%;
  right: 5%;
  top: 27%;
  bottom: 2%;
  background: radial-gradient(
    50% 50% at 50% 58%,
    rgba(58, 44, 26, 0.34) 0%,
    rgba(58, 44, 26, 0.19) 40%,
    rgba(58, 44, 26, 0) 74%
  );
  filter: blur(20px);
  opacity: calc(1 - var(--shade, 0) * 0.42);
}

.sb-cast.contact {
  left: 9%;
  right: 9%;
  top: 62%;
  bottom: 10%;
  background: radial-gradient(
    50% 44% at 50% 42%,
    rgba(44, 32, 14, 0.4) 0%,
    rgba(44, 32, 14, 0.17) 48%,
    rgba(44, 32, 14, 0) 78%
  );
  filter: blur(9px);
  opacity: calc(1 - var(--shade, 0) * 0.5);
}

.sb-cast.hair {
  left: 12%;
  right: 12%;
  top: 70%;
  bottom: 17%;
  background: radial-gradient(50% 52% at 50% 40%, rgba(40, 28, 10, 0.34) 0%, rgba(40, 28, 10, 0) 76%);
  filter: blur(4px);
  opacity: calc(1 - var(--shade, 0) * 0.62);
}

/* Deep full, half and curled leaf rules */
:deep(.sb-full) {
  position: absolute;
  inset: 0;
}

:deep(.sb-full img) {
  width: 100%;
  height: auto;
  display: block;
}

:deep(.sb-half) {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  overflow-x: clip;
  overflow-y: visible;
}

:deep(.sb-half.left) {
  left: 0;
}

:deep(.sb-half.right) {
  left: 50%;
}

:deep(.sb-half-img) {
  width: 200%;
  max-width: none;
  height: auto;
  display: block;
}

:deep(.sb-half-img.right) {
  margin-left: -100%;
}

:deep(.gutter-shade) {
  position: absolute;
  top: var(--pg, 21.8%);
  bottom: var(--pg, 21.8%);
  width: 46%;
  pointer-events: none;
  opacity: calc(var(--shade, 0) * 0.62);
  -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 5.2%, #000 94.8%, transparent 100%);
  mask-image: linear-gradient(180deg, transparent 0, #000 5.2%, #000 94.8%, transparent 100%);
}

:deep(.gutter-shade.left) {
  right: 0;
  background: linear-gradient(270deg, rgba(52, 38, 20, 0.3), rgba(52, 38, 20, 0) 82%);
}

:deep(.gutter-shade.right) {
  left: 0;
  background: linear-gradient(90deg, rgba(52, 38, 20, 0.24), rgba(52, 38, 20, 0) 82%);
}

/* Curled leaf */
:deep(.curl) {
  position: absolute;
  top: 0;
  height: 100%;
  width: calc(var(--bw, 0px) * var(--span));
  transform-style: preserve-3d;
  z-index: 6;
}

:deep(.curl.next) {
  left: 50%;
  transform-origin: left center;
  transform: rotateY(calc(-1 * var(--tt, 0deg)));
}

:deep(.curl.prev) {
  right: 50%;
  transform-origin: right center;
  transform: rotateY(var(--tt, 0deg));
}

:deep(.strip) {
  position: absolute;
  top: 0;
  height: 100%;
  width: calc(var(--bw, 0px) * var(--span) / var(--n));
  transform-style: preserve-3d;
}

:deep(.curl.next .strip) {
  transform-origin: left center;
}

:deep(.curl.prev .strip) {
  transform-origin: right center;
}

:deep(.curl.next > .strip) {
  left: 0;
}

:deep(.curl.prev > .strip) {
  right: 0;
  left: auto;
}

:deep(.curl.next .strip .strip) {
  left: 100%;
  transform: rotateY(var(--td, 0deg));
}

:deep(.curl.prev .strip .strip) {
  right: 100%;
  transform: rotateY(calc(-1 * var(--td, 0deg)));
}

:deep(.face) {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: -1.1px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background-repeat: no-repeat;
  background-size: var(--bw, 0px) auto;
}

:deep(.face.back) {
  transform: rotateY(180deg);
}

:deep(.face .sh),
:deep(.face .gl) {
  -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 5.2%, #000 94.8%, transparent 100%);
  mask-image: linear-gradient(180deg, transparent 0, #000 5.2%, #000 94.8%, transparent 100%);
}

:deep(.strip.edge .face .sh),
:deep(.strip.edge .face .gl) {
  -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 9%, #000 91%, transparent 100%), var(--hf);
  mask-image: linear-gradient(180deg, transparent 0, #000 9%, #000 91%, transparent 100%), var(--hf);
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}

:deep(.curl.next .strip.edge .face.front),
:deep(.curl.prev .strip.edge .face.back) {
  --hf: linear-gradient(90deg, #000 0 22%, transparent 96%);
}

:deep(.curl.next .strip.edge .face.back),
:deep(.curl.prev .strip.edge .face.front) {
  --hf: linear-gradient(270deg, #000 0 22%, transparent 96%);
}

:deep(.face .sh) {
  position: absolute;
  left: 0;
  right: 0;
  top: var(--pg, 21.8%);
  bottom: var(--pg, 21.8%);
  pointer-events: none;
}

:deep(.curl.next .face.front .sh),
:deep(.curl.prev .face.back .sh) {
  background: linear-gradient(90deg, rgba(58, 43, 20, var(--a1, 0)), rgba(58, 43, 20, var(--a2, 0)));
}

:deep(.curl.next .face.back .sh),
:deep(.curl.prev .face.front .sh) {
  background: linear-gradient(90deg, rgba(58, 43, 20, var(--a2, 0)), rgba(58, 43, 20, var(--a1, 0)));
}

:deep(.face .gl) {
  position: absolute;
  left: 0;
  right: 0;
  top: var(--pg, 21.8%);
  bottom: var(--pg, 21.8%);
  pointer-events: none;
  background: #fffaf0;
  opacity: calc(var(--shade, 0) * var(--lit, 1) * var(--lit, 1) * 0.2);
}

/* Touch interactive zones */
:deep(.sb-zone) {
  position: absolute;
  top: 0;
  bottom: 0;
  border: 0;
  background: transparent;
  cursor: grab;
  z-index: 60;
  -webkit-tap-highlight-color: transparent;
}

:deep(.sb-zone:active) {
  cursor: grabbing;
}

:deep(.sb-prev) {
  left: 0;
  width: 50%;
}

:deep(.sb-next) {
  right: 0;
  width: 50%;
}

/* Captions */
.sb-captions {
  display: grid;
  justify-items: center;
  min-height: 20px;
}

:deep(.sb-captions > *) {
  grid-area: 1/1;
  margin: 0;
}

:deep(.sb-caption) {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 16px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2b2721;
  animation: sb-cap-in 0.5s ease both;
}

:deep(.sb-caption.live) {
  animation: none;
}

@keyframes sb-cap-in {
  0% {
    opacity: 0;
  }
}

.sb-hint {
  margin: 0;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(43, 39, 33, 0.45);
  transition: opacity 0.4s ease;
}

.sb-hint.gone {
  opacity: 0;
}

/* Riffle blur */
:deep(.sb-wrap.intro .sb-full img),
:deep(.sb-wrap.intro .sb-half-img) {
  filter: url(#sb-mblur-1);
}

:deep(.sb-wrap.intro.b2 .sb-full img),
:deep(.sb-wrap.intro.b2 .sb-half-img) {
  filter: url(#sb-mblur-2);
}
</style>
