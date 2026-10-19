import { useLayoutEffect, useRef, useState } from 'react';

const products = [
  { id: 'camisa', name: 'Camisa oficial', src: '/assets/no-pique/camisa.jpg', width: 814, height: 1039 },
  { id: 'meia', name: 'Meia oficial', src: '/assets/no-pique/meia.jpg', width: 853, height: 1280 },
  { id: 'garrafa', name: 'Garrafa', src: '/assets/no-pique/garrafa.webp', width: 1122, height: 1402 },
  { id: 'short', name: 'Short', src: '/assets/no-pique/short.webp', width: 1122, height: 1402 },
  { id: 'oculos', name: 'Óculos', src: '/assets/no-pique/oculos.webp', width: 1122, height: 1402 },
];

type Controller = { go: (delta: number) => void; select: (index: number) => void };
type Drag = { id: number; x: number; y: number; dx: number; start: number; horizontal: boolean };
type Settle = { from: number; to: number; started: number };

function NavigationArrow({ previous = false }: { previous?: boolean }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={previous ? { transform: 'rotate(180deg)' } : undefined}><path d="M5 12h14m-7-7 7 7-7 7" /></svg>;
}

export function GallerySection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<Controller | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [announcement, setAnnouncement] = useState('');

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const cards = [...stage.querySelectorAll<HTMLElement>('.cf-card')];
    const total = cards.length;
    const mobile = matchMedia('(max-width: 600px)');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const autoDuration = 6500;
    const resumeDelay = 3500;
    let active = 0;
    let position = 0;
    let settling: Settle | null = null;
    let step = 220;
    let stageWidth = stage.clientWidth;
    let cardWidth = cards[0].offsetWidth;
    let drag: Drag | null = null;
    let inView = false;
    let lastFrame = 0;
    let frameId = 0;
    let resumeAt = performance.now() + 2500;
    let suppressClickUntil = 0;

    const modulo = (value: number) => ((value % total) + total) % total;
    const circularDistance = (value: number) => modulo(value + total / 2) - total / 2;
    const interpolate = (values: number[], distance: number) => {
      const position = Math.min(distance, 3);
      const lower = Math.floor(position);
      const upper = Math.min(lower + 1, 3);
      return values[lower] + (values[upper] - values[lower]) * (position - lower);
    };
    const render = () => {
      const nextActive = modulo(Math.round(position));
      if (nextActive !== active) { active = nextActive; setActiveIndex(active); }
      cards.forEach((card, index) => {
        // Wrap only at the invisible far edge, including during manual settling.
        const distance = circularDistance(index - position);
        const absolute = Math.abs(distance);
        const side = Math.sign(distance);
        const scale = interpolate([1, 0.82, 0.65, 0.5], absolute);
        const depth = interpolate([100, 0, -80, -150], absolute);
        const rotation = interpolate([0, 20, 32, 40], absolute) * (mobile.matches ? 0.6 : 1);
        const perspective = mobile.matches ? 1100 : 1400;
        const projection = perspective / (perspective - depth);
        const withinStage = absolute * step * projection < stageWidth / 2 + cardWidth * scale * projection / 2;
        const visible = absolute < total / 2 && withinStage;
        // Fade the outer card before its circular position wraps to the other side.
        const edgeFade = Math.min(1, Math.max(0, (total / 2 - absolute) * 2));
        const opacity = interpolate([1, 0.9, 0.65, 0.35], absolute) * edgeFade;
        card.style.transform = `translateX(calc(-50% + ${distance * step}px)) translateZ(${depth}px) rotateY(${-side * rotation}deg) scale(${scale})`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(10 - Math.round(absolute));
        card.style.pointerEvents = visible ? 'auto' : 'none';
        card.classList.toggle('is-active', absolute < 0.5);
        card.setAttribute('aria-hidden', String(!visible));
        card.inert = !visible;
        const image = card.querySelector('img');
        if (image) image.loading = absolute <= 2 ? 'eager' : 'lazy';
      });
    };
    const interact = () => {
      resumeAt = performance.now() + resumeDelay;
      stage.classList.remove('is-autoplaying');
    };
    const settleTo = (target: number, announce = true) => {
      interact();
      if (announce) {
        const index = modulo(Math.round(target));
        setAnnouncement(`${products[index].name}, ${index + 1} de ${total}`);
      }
      if (reducedMotion.matches || Math.abs(target - position) < 0.000001) {
        settling = null; position = target; render();
      } else settling = { from: position, to: target, started: performance.now() };
    };
    const select = (index: number) => settleTo(position + circularDistance(index - position));
    const go = (delta: number) => settleTo((settling?.to ?? Math.round(position)) + delta);
    controllerRef.current = { go, select };
    const measure = () => {
      stageWidth = stage.clientWidth;
      cardWidth = cards[0].offsetWidth;
      step = mobile.matches ? Math.min(stage.clientWidth * 0.59, 245) : Math.min(stage.clientWidth * 0.205, 255);
      render();
    };
    const animate = (now: number) => {
      const elapsed = lastFrame ? Math.min(now - lastFrame, 64) : 0;
      lastFrame = now;
      // Touch can leave a photo focused indefinitely. Only keyboard focus should
      // pause autoplay until focus leaves the carousel.
      const focused = stage.matches(':focus-visible') || !!stage.querySelector(':focus-visible');
      if (settling && !drag) {
        const progress = Math.min(1, Math.max(0, (now - settling.started) / 320));
        position = settling.from + (settling.to - settling.from) * (1 - (1 - progress) ** 3);
        if (progress === 1) { position = settling.to; settling = null; }
        render();
      } else if (inView && !document.hidden && !reducedMotion.matches && !drag && !focused && now >= resumeAt && !document.querySelector('dialog[open]')) {
        stage.classList.add('is-autoplaying');
        position += elapsed / autoDuration;
        render();
      } else stage.classList.remove('is-autoplaying');
      frameId = requestAnimationFrame(animate);
    };
    const pointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || event.isPrimary === false || drag) return;
      interact();
      settling = null;
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, start: position, horizontal: false };
    };
    const finish = (event: PointerEvent) => {
      if (!drag || drag.id !== event.pointerId) return;
      const current = drag;
      const cancelled = event.type !== 'pointerup';
      if (current.horizontal && !cancelled) {
        current.dx = event.clientX - current.x;
        position = current.start - current.dx / step;
      }
      drag = null;
      interact(); stage.classList.remove('is-dragging');
      if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
      if (current.horizontal) {
        suppressClickUntil = performance.now() + 400;
        const anchor = Math.round(current.start);
        let target = cancelled ? anchor : Math.round(position);
        // A short intentional swipe from a centered card still advances once.
        // During autoplay, settle to the card actually under the finger instead.
        if (!cancelled && target === anchor && Math.abs(current.start - anchor) < 0.15 && Math.abs(current.dx) > 35) {
          target += current.dx < 0 ? 1 : -1;
        }
        settleTo(target, !cancelled);
      }
    };
    const lostPointerCapture = (event: PointerEvent) => {
      // Touch starts with implicit capture on the photo. Its bubbling loss event
      // is expected when we capture the horizontal gesture on the stage.
      if (event.target === stage) finish(event);
    };
    const pointerMove = (event: PointerEvent) => {
      if (!drag || drag.id !== event.pointerId) return;
      drag.dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if (!drag.horizontal && Math.abs(dy) > Math.abs(drag.dx) && Math.abs(dy) > 12) { finish(event); return; }
      if (!drag.horizontal && Math.abs(drag.dx) > 8 && Math.abs(drag.dx) >= Math.abs(dy)) {
        drag.horizontal = true;
        stage.setPointerCapture(event.pointerId);
        stage.classList.add('is-dragging');
      }
      if (drag.horizontal) {
        if (event.cancelable) event.preventDefault();
        position = drag.start - drag.dx / step;
        render();
      }
    };
    const click = (event: MouseEvent) => {
      if (performance.now() < suppressClickUntil) { event.preventDefault(); event.stopPropagation(); return; }
      const card = (event.target as HTMLElement).closest<HTMLElement>('.cf-card');
      if (!card) return;
      const index = cards.indexOf(card);
      if (index >= 0) {
        const alreadyCentered = index === active;
        select(index);
        if (!alreadyCentered) { event.preventDefault(); event.stopPropagation(); }
      }
    };
    const keyDown = (event: KeyboardEvent) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Home') select(0);
      else if (event.key === 'End') select(total - 1);
      else go(event.key === 'ArrowRight' ? 1 : -1);
    };
    const dragStart = (event: Event) => event.preventDefault();
    const cancelGesture = () => {
      if (drag) finish({ type: 'pointercancel', pointerId: drag.id } as PointerEvent);
    };
    const motionChange = () => { cancelGesture(); settleTo(Math.round(position), false); };
    const intersection = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; }, { threshold: 0.15 });
    const resize = new ResizeObserver(measure);
    intersection.observe(stage); resize.observe(stage);
    stage.addEventListener('pointerdown', pointerDown);
    stage.addEventListener('pointermove', pointerMove);
    stage.addEventListener('lostpointercapture', lostPointerCapture);
    stage.addEventListener('click', click);
    stage.addEventListener('keydown', keyDown);
    stage.addEventListener('dragstart', dragStart);
    stage.addEventListener('focusin', interact);
    stage.addEventListener('focusout', interact);
    window.addEventListener('pointerup', finish);
    window.addEventListener('pointercancel', finish);
    window.addEventListener('blur', cancelGesture);
    mobile.addEventListener('change', measure);
    reducedMotion.addEventListener('change', motionChange);
    measure(); frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId); intersection.disconnect(); resize.disconnect();
      stage.removeEventListener('pointerdown', pointerDown);
      stage.removeEventListener('pointermove', pointerMove);
      stage.removeEventListener('lostpointercapture', lostPointerCapture);
      stage.removeEventListener('click', click);
      stage.removeEventListener('keydown', keyDown);
      stage.removeEventListener('dragstart', dragStart);
      stage.removeEventListener('focusin', interact);
      stage.removeEventListener('focusout', interact);
      window.removeEventListener('pointerup', finish);
      window.removeEventListener('pointercancel', finish);
      window.removeEventListener('blur', cancelGesture);
      mobile.removeEventListener('change', measure);
      reducedMotion.removeEventListener('change', motionChange);
      controllerRef.current = null;
      if (drag && stage.hasPointerCapture(drag.id)) stage.releasePointerCapture(drag.id);
      stage.classList.remove('is-autoplaying', 'is-dragging');
    };
  }, []);

  return <section id="galeria" className="bg-graphite py-24 md:py-32" aria-labelledby="gallery-title">
    <div className="mx-auto max-w-7xl px-5 md:px-10">
      <div className="gallery-heading">
        <h2 id="gallery-title" className="reveal text-5xl md:text-7xl">Produtos <span className="text-primary">oficiais.</span></h2>
        <div className="gallery-controls" aria-label="Navegação dos produtos">
          <button type="button" className="gallery-arrow" aria-label="Produtos anteriores" aria-controls="product-track" onClick={() => controllerRef.current?.go(-1)}><NavigationArrow previous /></button>
          <button type="button" className="gallery-arrow" aria-label="Próximos produtos" aria-controls="product-track" onClick={() => controllerRef.current?.go(1)}><NavigationArrow /></button>
        </div>
      </div>
      <div ref={stageRef} id="product-track" className="cf-carousel mt-8" role="region" tabIndex={0} aria-roledescription="carrossel" aria-label="Produtos — arraste para os lados ou use as setas do teclado">
        {products.map((product, index) => <article className="cf-card" role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${products.length}: ${product.name}`} key={product.id}>
          <button type="button" className="cf-photo" aria-label={`${activeIndex === index ? 'Ampliar' : 'Selecionar'} ${product.name}`}>
            <img src={product.src} alt={product.name} width={product.width} height={product.height} loading="lazy" decoding="async" draggable={false} />
            <span className="product-zoom" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" /></svg></span>
          </button>
          <h3>{product.name}</h3>
        </article>)}
      </div>
      <div className="gallery-footer">
        <p className="text-sm text-muted-foreground">Garrafa, short e óculos: imagens ilustrativas.</p>
        <div className="gallery-pagination">
          <div className="gallery-dots" aria-label="Selecionar produto">
            {products.map((product, index) => <button type="button" className="gallery-dot" key={product.id} aria-label={`Mostrar ${product.name}`} aria-current={activeIndex === index ? 'true' : undefined} aria-controls="product-track" onClick={() => controllerRef.current?.select(index)}><span /></button>)}
          </div>
          <p className="gallery-count text-sm text-muted-foreground">{activeIndex + 1} / {products.length}</p>
        </div>
      </div>
      <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
    </div>
  </section>;
}
