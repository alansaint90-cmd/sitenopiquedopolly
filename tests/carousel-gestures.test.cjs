const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

// Exercise the component's actual listeners with the touch capture sequence used
// by browsers: the photo loses its implicit capture when the stage takes over.
function mountCarousel({ keyboardFocus = false } = {}) {
  const listeners = new Map();
  const windowListeners = new Map();
  const classes = new Set();
  let now = 0;
  let frame;
  let selected = 0;
  let captured = false;
  const photo = { matches: () => false };
  const cards = Array.from({ length: 5 }, () => ({
    offsetWidth: 270, style: {}, classList: { toggle() {} },
    setAttribute() {}, querySelector: () => ({}),
  }));
  const stage = {
    clientWidth: 350,
    querySelectorAll: () => cards,
    querySelector: () => null,
    matches: () => keyboardFocus,
    contains: node => node === photo,
    classList: { add: x => classes.add(x), remove: (...xs) => xs.forEach(x => classes.delete(x)) },
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener: name => listeners.delete(name),
    setPointerCapture: () => { captured = true; },
    hasPointerCapture: () => captured,
    releasePointerCapture: () => { captured = false; },
  };
  const observer = class { observe() {} disconnect() {} };
  let effect;
  let ref = 0;
  let state = 0;
  const module = { exports: {} };
  const source = ts.transpileModule(fs.readFileSync('src/CoverflowCarousel.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  vm.runInNewContext(source, {
    module, exports: module.exports,
    require: name => name === 'react' ? {
      useLayoutEffect: callback => { effect = callback; },
      useRef: () => ({ current: ref++ === 0 ? stage : null }),
      useState: initial => { const index = state++; return [initial, value => { if (index === 0) selected = value; }]; },
    } : { jsx() {}, jsxs() {} },
    matchMedia: query => ({ matches: query.includes('max-width'), addEventListener() {}, removeEventListener() {} }),
    performance: { now: () => now },
    document: { hidden: false, activeElement: photo, querySelector: () => null },
    window: { addEventListener: (name, handler) => windowListeners.set(name, handler), removeEventListener: name => windowListeners.delete(name) },
    IntersectionObserver: class extends observer { constructor(callback) { super(); callback([{ isIntersecting: true }]); } },
    ResizeObserver: observer,
    requestAnimationFrame: callback => { frame = callback; return 1; },
    cancelAnimationFrame() {},
  });
  module.exports.GallerySection();
  const cleanup = effect();
  const event = (type, x, y = 100, target = stage) => ({ type, target, pointerId: 1, pointerType: 'touch', button: 0, clientX: x, clientY: y });
  return {
    selected: () => selected,
    transform: () => cards[0].style.transform,
    dragging: () => classes.has('is-dragging'),
    down: x => listeners.get('pointerdown')(event('pointerdown', x)),
    move: (x, y) => listeners.get('pointermove')(event('pointermove', x, y)),
    release: x => windowListeners.get('pointerup')(event('pointerup', x)),
    cancel: x => windowListeners.get('pointercancel')(event('pointercancel', x)),
    transferCapture: () => listeners.get('lostpointercapture')(event('lostpointercapture', 190, 100, photo)),
    click: () => { let blocked = false; listeners.get('click')({ preventDefault() { blocked = true; }, stopPropagation() {}, target: { closest: () => null } }); return blocked; },
    tick: time => { now = time; frame(time); },
    autoplaying: () => classes.has('is-autoplaying'),
    cleanup,
  };
}

test('touch swipe survives transfer from photo to stage and advances one product', () => {
  const carousel = mountCarousel();
  carousel.down(200);
  carousel.move(185);
  carousel.transferCapture();
  assert.equal(carousel.dragging(), true);
  const before = carousel.transform();
  carousel.move(100);
  assert.notEqual(carousel.transform(), before);
  carousel.release(100);
  assert.equal(carousel.selected(), 1);
  assert.equal(carousel.dragging(), false);
  assert.equal(carousel.click(), true, 'swiping must not open photo zoom');
  carousel.down(100);
  carousel.move(200);
  carousel.release(200);
  assert.equal(carousel.selected(), 0, 'swiping right returns to previous product');
  carousel.cleanup();
});

test('vertical movement and cancelled touches leave the carousel usable', () => {
  const carousel = mountCarousel();
  carousel.down(200);
  carousel.move(203, 160);
  carousel.release(203);
  assert.equal(carousel.selected(), 0);
  carousel.down(200);
  carousel.move(100);
  carousel.cancel(100);
  assert.equal(carousel.selected(), 0);
  carousel.down(200);
  carousel.move(100);
  carousel.release(100);
  assert.equal(carousel.selected(), 1);
  carousel.cleanup();
});

test('autoplay resumes after touch even if the photo retains focus', () => {
  const carousel = mountCarousel();
  carousel.down(200);
  carousel.move(100);
  carousel.release(100);
  carousel.tick(1000);
  assert.equal(carousel.autoplaying(), false);
  carousel.tick(4000);
  assert.equal(carousel.autoplaying(), true);
  carousel.cleanup();
});

test('keyboard focus still pauses autoplay for accessible navigation', () => {
  const carousel = mountCarousel({ keyboardFocus: true });
  carousel.tick(4000);
  assert.equal(carousel.autoplaying(), false);
  carousel.cleanup();
});

test('a short touch keeps tap and photo zoom available', () => {
  const carousel = mountCarousel();
  carousel.down(200);
  carousel.move(203);
  carousel.release(203);
  assert.equal(carousel.selected(), 0);
  assert.equal(carousel.click(), false);
  carousel.cleanup();
});
