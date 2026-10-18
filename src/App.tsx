import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { eventConfig, eventDisplay, type Kit } from './event-config';
import { checkoutLink, track } from './analytics';
import { Header, Hero, Marquee, ExperienceSection, StorySection, GallerySection, EventInformation, ConversionCTA, Footer } from './Sections';

function Arrow() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>;
}

function KitCard({ kit, index, onSelect }: { kit: Kit; index: number; onSelect: (kit: Kit) => void }) {
  const complete = index === eventConfig.kits.length - 1;
  const items = kit.items;
  return <article className={`kit-card reveal relative flex flex-col p-8 lg:p-6 xl:p-10 ${complete ? 'bg-primary shadow-[0_16px_60px_-20px_#f50082]' : 'bg-graphite'}`}>
    {complete && <span className="absolute -top-4 right-5 bg-accent px-4 py-2 font-display text-lg text-background">Kit mais completo</span>}
    <h3 className="font-display text-2xl">{kit.name}</h3>
    <p className="mt-3 flex items-start gap-1 font-display italic leading-none"><span className="mt-2 text-3xl">R$</span><span className="text-8xl font-black">{kit.price}</span></p>
    <ul className={`mt-6 flex-1 space-y-3 ${complete ? 'text-background' : ''}`}>
      {items.map(item => <li key={item} className="flex items-center gap-3 text-lg"><svg className={`size-5 shrink-0 ${complete ? 'text-background' : 'text-accent'}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>{item}</li>)}
    </ul>
    <button id={kit.id} onClick={() => onSelect(kit)} className={`mt-8 justify-center ${complete ? 'btn-ghost border-foreground text-foreground' : 'btn-cta'}`}>Quero o {kit.name} <Arrow /></button>
  </article>;
}

function KitsSection({ onSelect }: { onSelect: (kit: Kit) => void }) {
  return <section id="kits" className="bg-background py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-5 md:px-10">
      <div className="reveal text-center"><p className="font-display text-lg text-accent">Kits oficiais</p><h2 className="mt-2 text-5xl md:text-7xl">Escolha seu kit.</h2></div>
      <div className={`mt-16 grid gap-6 ${eventConfig.kits.length > 2 ? 'lg:grid-cols-3' : 'md:grid-cols-2'}`}>{eventConfig.kits.map((kit, index) => <KitCard key={kit.id} kit={kit} index={index} onSelect={onSelect} />)}</div>
      <p className="mt-6 text-center text-sm text-muted-foreground">Plataforma de inscrições a confirmar.</p>
    </div>
  </section>;
}

const faqItems = [
  ['Quando acontece a corrida?', `${eventDisplay.weekday}, ${eventDisplay.fullDate}. ${eventConfig.startTime ? `Largada às ${eventConfig.startTime}.` : 'O horário de largada será confirmado pela organização.'}`],
  ['Onde será?', `${eventConfig.location}, Bahia. O ponto exato de largada será divulgado em breve.`],
  ['Qual a distância?', `O percurso terá ${eventConfig.distanceKm} km pela Orla de Salvador.`],
  ['Quanto custam os kits?', eventConfig.kits.map(kit => `${kit.name}: R$ ${kit.price}`).join('. ') + '.'],
  ['Qual a diferença entre os kits?', eventConfig.kits.map(kit => `${kit.name}: ${kit.items.join(', ').toLowerCase()}`).join('. ') + '.'],
  ['Quando retiro meu kit?', `A retirada está prevista para ${eventDisplay.pickupDate}. Local e horário a confirmar.`],
  ['Vai ter show?', 'A programação artística está a confirmar. Nenhum show ou participação artística está confirmado.'],
  ['Onde está o regulamento?', 'O regulamento oficial será disponibilizado aqui assim que for publicado pela organização.'],
  ['Como faço minha inscrição?', 'Escolha seu kit nesta página. As inscrições estão em preparação, e a plataforma oficial será divulgada em breve.'],
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return <section id="faq" className="bg-graphite py-24 md:py-32"><div className="mx-auto max-w-3xl px-5 md:px-10">
    <h2 className="reveal text-5xl md:text-7xl">Perguntas frequentes.</h2>
    <div className="reveal mt-10">{faqItems.map(([question, answer], i) => <div className="faq-item border-b border-border" key={question}>
      <h3><button className="flex min-h-14 w-full items-center justify-between gap-6 py-4 text-left font-display text-2xl hover:text-accent" aria-expanded={open === i} aria-controls={`answer-${i}`} id={`question-${i}`} onClick={() => setOpen(open === i ? null : i)}>{question}<svg className={`size-4 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></button></h3>
      <div id={`answer-${i}`} role="region" aria-labelledby={`question-${i}`} className="faq-answer" inert={open !== i} data-open={open === i}><div><p className="pb-5 text-base leading-relaxed text-muted-foreground">{answer}</p></div></div>
    </div>)}</div>
  </div></section>;
}

type Overlay = { type: 'kit'; kit: Kit } | { type: 'image'; src: string; alt: string };

export default function App() {
  const [overlay, setOverlay] = useState<Overlay | null>(null);
  const [marqueePaused, setMarqueePaused] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    track('page_view');
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
    let viewedKits = false;
    const kitObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting && !viewedKits) { track('view_kits'); viewedKits = true; }
    }), { threshold: 0.2 });
    const kits = document.getElementById('kits');
    if (kits) kitObserver.observe(kits);
    const onScroll = () => {
      document.documentElement.classList.toggle('has-scrolled', window.scrollY > 60);
      const footer = document.querySelector('footer');
      setShowSticky(window.scrollY > window.innerHeight * 0.7 && (!footer || footer.getBoundingClientRect().top > window.innerHeight));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { revealObserver.disconnect(); kitObserver.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (overlay && dialog) {
      lastFocused.current = document.activeElement as HTMLElement;
      dialog.showModal();
      const oldOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { dialog.close(); document.body.style.overflow = oldOverflow; lastFocused.current?.focus(); };
    }
  }, [overlay]);

  const selectKit = (kit: Kit) => {
    track('select_kit', { kit: kit.id, kit_name: kit.name, value: kit.price, currency: 'BRL' });
    if (eventConfig.registrationStatus === 'SALES_OPEN' && kit.checkoutUrl) {
      try {
        const url = checkoutLink(kit.checkoutUrl);
        track('begin_checkout', { kit: kit.id, value: kit.price, currency: 'BRL' });
        window.location.assign(url);
        return;
      } catch { /* A misconfigured checkout must never simulate a registration. */ }
    }
    setOverlay({ type: 'kit', kit });
  };

  const onGalleryClick = (event: MouseEvent<HTMLDivElement>) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[aria-label^="Ampliar"]');
    const image = button?.querySelector('img');
    if (image) setOverlay({ type: 'image', src: image.src, alt: image.alt });
  };

  const statusText = eventConfig.registrationStatus === 'SALES_PAUSED'
    ? ['Inscrições pausadas.', 'As inscrições estão temporariamente pausadas. Aguarde novas informações da organização.']
    : eventConfig.registrationStatus === 'SALES_CLOSED'
      ? ['Inscrições encerradas.', 'As inscrições para esta edição foram encerradas.']
      : eventConfig.registrationStatus === 'SALES_OPEN'
        ? ['Inscrições em preparação.', 'O link oficial deste kit ainda não está disponível. Aguarde a atualização da organização.']
        : ['Seu pique está chegando.', 'As inscrições estão em preparação. Em breve, a organização divulgará a plataforma oficial para garantir seu kit.'];

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <Header />
    <main id="conteudo" className="overflow-x-hidden">
      <Hero />
      <div className={`marquee-shell ${marqueePaused ? 'is-paused' : ''}`}><Marquee /><button className="marquee-pause" onClick={() => setMarqueePaused(!marqueePaused)} aria-label={marqueePaused ? 'Retomar faixa animada' : 'Pausar faixa animada'} aria-pressed={marqueePaused}>{marqueePaused ? '▶' : 'Ⅱ'}</button></div>
      <ExperienceSection />
      <StorySection />
      <KitsSection onSelect={selectKit} />
      <div onClick={onGalleryClick}><GallerySection /></div>
      <EventInformation />
      <ConversionCTA />
      <FAQ />
    </main>
    <Footer />
    <a className={`mobile-sticky ${showSticky ? 'is-shown' : ''}`} href="#kits" aria-hidden={!showSticky} tabIndex={showSticky ? 0 : -1}><span className="font-display text-xl">Escolher meu kit <Arrow /></span><span className="text-xs">A partir de R$ {eventConfig.kits[0].price}</span></a>
    <dialog ref={dialogRef} className={`overlay-dialog ${overlay?.type === 'image' ? 'image-dialog' : ''}`} aria-labelledby="dialog-title" onCancel={() => setOverlay(null)} onClick={event => { if (event.target === event.currentTarget) setOverlay(null); }}>
      {overlay && <div className="dialog-content"><button autoFocus className="dialog-close" aria-label="Fechar" onClick={() => setOverlay(null)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
        {overlay.type === 'image' ? <><h2 id="dialog-title" className="sr-only">{overlay.alt}</h2><img src={overlay.src} alt={overlay.alt} /></> : <>
          <p className="font-display text-lg text-accent">No Pique com Polly • 2027</p><h2 id="dialog-title" className="mt-3 text-5xl">{statusText[0]}</h2>
          <div className="my-6 border-l-4 border-primary bg-background p-5"><h3 className="font-display text-2xl">{overlay.kit.name}</h3><p className="font-display text-4xl text-primary">R$ {overlay.kit.price}</p></div>
          <p className="leading-relaxed text-muted-foreground">{statusText[1]}</p><p className="mt-3 text-sm text-muted-foreground">Nenhuma inscrição ou cobrança foi realizada.</p><button className="btn-cta mt-8" onClick={() => setOverlay(null)}>Voltar aos kits <Arrow /></button>
        </>}
      </div>}
    </dialog>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SportsEvent', name: eventConfig.name, description: 'Primeira edição da corrida de 5 km na Orla de Salvador.', startDate: eventConfig.date, eventStatus: 'https://schema.org/EventScheduled', eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode', location: { '@type': 'Place', name: eventConfig.location, address: { '@type': 'PostalAddress', addressLocality: eventConfig.city, addressRegion: eventConfig.state, addressCountry: 'BR' } } }) }} />
  </>;
}
