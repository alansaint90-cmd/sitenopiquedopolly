import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

const products = [
  { id: 'camisa', name: 'Camisa oficial', src: '/assets/no-pique/camisa.jpg', width: 814, height: 1039 },
  { id: 'meia', name: 'Meia oficial', src: '/assets/no-pique/meia.jpg', width: 853, height: 1280 },
  { id: 'garrafa', name: 'Garrafa', src: '/assets/no-pique/garrafa.webp', width: 1122, height: 1402 },
  { id: 'short', name: 'Short', src: '/assets/no-pique/short.webp', width: 1122, height: 1402 },
  { id: 'oculos', name: 'Óculos', src: '/assets/no-pique/oculos.webp', width: 1122, height: 1402 },
];

function NavigationArrow({ previous = false }: { previous?: boolean }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={previous ? { transform: 'rotate(180deg)' } : undefined}><path d="M5 12h14m-7-7 7 7-7 7" /></svg>;
}

export function GallerySection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [firstIndex, setFirstIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const maxIndex = Math.max(0, products.length - visibleCount);

  const updatePosition = () => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = card.getBoundingClientRect().width + gap;
    const count = Math.max(1, Math.floor((track.clientWidth + gap + 1) / step));
    const max = Math.max(0, products.length - count);
    setVisibleCount(count);
    setFirstIndex(Math.min(max, Math.max(0, Math.round(track.scrollLeft / step))));
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(updatePosition);
    observer.observe(track);
    updatePosition();
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollTo({
      left: Math.max(0, Math.min(index, maxIndex)) * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(firstIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(firstIndex + 1); }
    if (event.key === 'Home') { event.preventDefault(); goTo(0); }
    if (event.key === 'End') { event.preventDefault(); goTo(maxIndex); }
  };

  return <section id="galeria" className="bg-graphite py-24 md:py-32" aria-labelledby="gallery-title" aria-roledescription="carrossel">
    <div className="mx-auto max-w-7xl px-5 md:px-10">
      <div className="gallery-heading">
        <h2 id="gallery-title" className="reveal text-5xl md:text-7xl">Produtos <span className="text-primary">oficiais.</span></h2>
        <div className="gallery-controls" aria-label="Navegação dos produtos">
          <button type="button" className="gallery-arrow" aria-label="Produtos anteriores" aria-controls="product-track" disabled={firstIndex === 0} onClick={() => goTo(firstIndex - 1)}><NavigationArrow previous /></button>
          <button type="button" className="gallery-arrow" aria-label="Próximos produtos" aria-controls="product-track" disabled={firstIndex >= maxIndex} onClick={() => goTo(firstIndex + 1)}><NavigationArrow /></button>
        </div>
      </div>
      <div ref={trackRef} id="product-track" className="product-track mt-12" role="list" tabIndex={0} aria-label="Galeria de produtos. Use as setas do teclado para navegar." onKeyDown={onKeyDown} onScroll={updatePosition}>
        {products.map(product => <div className="product-slide" role="listitem" key={product.id}>
          <button type="button" className="product-card group" aria-label={`Ampliar ${product.name}`}>
            <img src={product.src} alt={product.name} width={product.width} height={product.height} loading="lazy" className="product-photo" />
            <span className="product-label font-display text-2xl">{product.name}</span>
            <span className="product-zoom" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" /></svg></span>
          </button>
        </div>)}
      </div>
      <div className="gallery-footer">
        <p className="text-sm text-muted-foreground">Garrafa, short e óculos: imagens ilustrativas.</p>
        <div className="gallery-pagination">
          <div className="gallery-dots" aria-label="Posições do carrossel">
            {Array.from({ length: maxIndex + 1 }, (_, index) => <button type="button" className="gallery-dot" key={index} aria-label={`Ver produtos a partir de ${products[index].name}`} aria-current={firstIndex === index ? 'true' : undefined} aria-controls="product-track" onClick={() => goTo(index)}><span /></button>)}
          </div>
          <p className="gallery-count text-sm text-muted-foreground" role="status" aria-live="polite">{firstIndex + 1}–{Math.min(products.length, firstIndex + visibleCount)} / {products.length}</p>
        </div>
      </div>
    </div>
  </section>;
}
