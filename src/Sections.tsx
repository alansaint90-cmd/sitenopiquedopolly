import { eventConfig, eventDisplay } from './event-config';

export function Header() { return (
<header className="fixed inset-x-0 top-0 z-40 transition-all duration-300 py-3">
<div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
<a href="#" className="header-brand" aria-label="No Pique com Polly — início">
<img src="/assets/no-pique/logo-transparente.png" alt="No Pique com Polly" width="1254" height="1254" className="header-logo" />
</a>
<nav className="hidden gap-8 font-display text-lg italic uppercase md:flex">
<a href="#experiencia" className="transition-colors hover:text-accent">Experiência</a>
<a href="#kits" className="transition-colors hover:text-accent">Kits</a>
<a href="#info" className="transition-colors hover:text-accent">Informações</a>
<a href="#faq" className="transition-colors hover:text-accent">FAQ</a>
</nav>
<a href="#kits" className="btn-cta px-4 py-2 text-base">Inscreva-se</a>
</div>
</header>
); }

export function Hero() { return (
<section className="relative flex min-h-[100svh] items-end overflow-hidden bg-background pb-14 pt-28 md:items-center md:pb-0">
<img src="/assets/no-pique/hero.jpg" alt="Corredores em movimento com a marca No Pique com Polly" width="1022" height="1280" fetchPriority="high" className="animate-reveal-img absolute inset-0 h-full w-full object-cover object-[70%_center] md:left-[30%] md:w-[70%]"/>
<div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10 md:bg-gradient-to-r md:from-background md:via-background/85 md:to-transparent">
</div>
<div className="speed-lines pointer-events-none absolute inset-0 opacity-60">
</div>
<div className="relative mx-auto w-full max-w-7xl px-5 md:px-10">
<p className="animate-rise font-display text-lg text-accent md:text-xl" style={{animationDelay: '.1s'}}>{eventDisplay.fullDate} • {eventConfig.city}/{eventConfig.state}</p>
<h1 className="animate-rise mt-3 max-w-3xl text-6xl md:text-8xl lg:text-[8.5rem]" style={{animationDelay: '.25s'}}>Salvador vai entrar <span className="text-primary">no pique!</span>
</h1>
<p className="animate-rise mt-5 font-display text-2xl text-accent md:text-3xl" style={{animationDelay: '.4s'}}>Não é só correr. É viver essa energia.</p>
<p className="animate-rise mt-4 max-w-lg text-base text-muted-foreground md:text-lg" style={{animationDelay: '.55s'}}>Prepare-se para uma experiência que une esporte, música e a energia da Bahia. Vista sua camisa, escolha seu kit e faça parte da primeira edição do NO PIQUE COM POLLY.</p>
<div className="animate-rise mt-7 flex flex-wrap gap-x-3 gap-y-2 font-display text-xl sm:gap-x-8 sm:text-2xl md:text-3xl" style={{animationDelay: '.7s'}}>
<span>{eventDisplay.dottedDate}</span>
<span className="text-primary">/</span>
<span>{eventConfig.location}</span>
<span className="text-primary">/</span>
<span className="text-accent">{eventConfig.distanceKm} KM</span>
</div>
<div className="animate-rise mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6" style={{animationDelay: '.85s'}}>
<a href="#kits" className="btn-cta">Garantir minha inscrição <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right size-5" aria-hidden="true">
<path d="M5 12h14">
</path>
<path d="m12 5 7 7-7 7">
</path>
</svg>
</a>
<span className="text-sm text-muted-foreground">Kits a partir de <strong className="text-foreground">R$ {eventConfig.kits[0].price}</strong>
</span>
</div>
</div>
</section>
); }

export function Marquee() { return (
<div className="mt-16 overflow-hidden bg-primary py-4 text-background md:mt-24" aria-label="NO PIQUE COM POLLY — Salvador em movimento">
<div className="animate-marquee flex w-max whitespace-nowrap font-display text-3xl font-black italic md:text-4xl" aria-hidden="true">
<span className="pr-4">NO PIQUE COM POLLY ✦ SALVADOR EM MOVIMENTO ✦ 5 KM DE ENERGIA ✦ A BAHIA NO PIQUE ✦ CORRA ESSA EXPERIÊNCIA ✦ NO PIQUE COM POLLY ✦ SALVADOR EM MOVIMENTO ✦ 5 KM DE ENERGIA ✦ A BAHIA NO PIQUE ✦ CORRA ESSA EXPERIÊNCIA ✦ NO PIQUE COM POLLY ✦ SALVADOR EM MOVIMENTO ✦ 5 KM DE ENERGIA ✦ A BAHIA NO PIQUE ✦ CORRA ESSA EXPERIÊNCIA ✦ </span>
<span className="pr-4">NO PIQUE COM POLLY ✦ SALVADOR EM MOVIMENTO ✦ 5 KM DE ENERGIA ✦ A BAHIA NO PIQUE ✦ CORRA ESSA EXPERIÊNCIA ✦ NO PIQUE COM POLLY ✦ SALVADOR EM MOVIMENTO ✦ 5 KM DE ENERGIA ✦ A BAHIA NO PIQUE ✦ CORRA ESSA EXPERIÊNCIA ✦ NO PIQUE COM POLLY ✦ SALVADOR EM MOVIMENTO ✦ 5 KM DE ENERGIA ✦ A BAHIA NO PIQUE ✦ CORRA ESSA EXPERIÊNCIA ✦ </span>
</div>
</div>
); }

export function ExperienceSection() { return (
<section id="experiencia" className="bg-background py-24 md:py-32">
<div className="mx-auto max-w-7xl px-5 md:px-10">
<div className="reveal">
<h2 className="text-5xl md:text-7xl">Muito mais que uma corrida.</h2>
<p className="mt-4 font-display text-2xl text-primary md:text-3xl">Uma experiência que tem a energia da Bahia.</p>
</div>
<div className="mt-16 grid gap-6 md:grid-cols-12">
<figure className="reveal relative min-h-0 overflow-hidden md:col-span-7 md:row-span-2 lg:col-span-8 lg:aspect-[1672/941] lg:self-start">
<img src="/assets/no-pique/experiencia-polly.png" alt="Arte No Pique com Polly com camisa, óculos, medalha e participante usando a camisa oficial" width="1672" height="941" loading="lazy" className="h-full w-full object-cover object-center md:absolute md:inset-0 lg:object-contain"/>
</figure>
<div className="experience-pillar reveal flex flex-col justify-end p-8 md:p-10 md:col-span-5 lg:col-span-4 bg-graphite">
<span className="font-display text-6xl italic opacity-40">01</span>
<h3 className="mt-2 text-4xl md:text-5xl">Movimento</h3>
<p className="mt-3 max-w-md text-base opacity-85">5 km pela Orla de Salvador para tirar a cidade do lugar e celebrar hábitos saudáveis — no seu ritmo.</p>
</div>
<div className="experience-pillar reveal flex flex-col justify-end p-8 md:p-10 md:col-span-5 lg:col-span-4 bg-primary">
<span className="font-display text-6xl italic opacity-40">02</span>
<h3 className="mt-2 text-4xl md:text-5xl">Cultura</h3>
<p className="mt-3 max-w-md text-base opacity-85">Esporte e entretenimento no mesmo ambiente, valorizando a criatividade e a energia baiana.</p>
</div>
<div className="reveal flex flex-col justify-end p-8 md:p-10 md:col-span-12 bg-graphite border-l-4 border-accent">
<span className="font-display text-6xl italic opacity-40">03</span>
<h3 className="mt-2 text-4xl md:text-5xl">Conexão</h3>
<p className="mt-3 max-w-md text-base opacity-85">Gente que corre, gente que torce, gente que vibra. Um encontro de superação e energia compartilhada.</p>
</div>
</div>
</div>
</section>
); }

export function StorySection() { return (
<section className="relative overflow-hidden bg-graphite py-28 md:py-40">
<div className="speed-lines absolute inset-0 opacity-50">
</div>
<div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:px-10">
<div className="reveal">
<h2 className="text-6xl md:text-8xl">A corrida é <span className="text-accent">só o começo.</span>
</h2>
<p className="mt-8 max-w-md text-lg text-muted-foreground">Imagine a energia de Salvador, a vibração do esporte e a cultura baiana se encontrando em uma experiência que vai além da linha de chegada.</p>
<p className="mt-4 max-w-md text-sm text-muted-foreground">Um evento que nasce da conexão do universo artístico de Oh Polêmico com o público. Programação artística a confirmar.</p>
</div>
<div className="reveal relative">
<div className="absolute -inset-3 -rotate-3 bg-primary">
</div>
<img src="/assets/no-pique/camisa.jpg" alt="Camisa oficial pink com logo ciano" width="814" height="1039" loading="lazy" className="relative h-auto w-full rotate-2 object-cover"/>
</div>
</div>
</section>
); }

export function GallerySection() { return (
<section id="galeria" className="bg-graphite py-24 md:py-32">
<div className="mx-auto max-w-7xl px-5 md:px-10">
<h2 className="reveal text-5xl md:text-7xl">Produtos <span className="text-primary">oficiais.</span>
</h2>
<div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible">
<button className="reveal group relative w-[82%] shrink-0 snap-center overflow-hidden bg-background md:w-auto md:col-span-3" aria-label="Ampliar Camisa oficial">
<img src="/assets/no-pique/camisa.jpg" alt="Camisa oficial" width="814" height="1039" loading="lazy" className="h-[460px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[600px]"/>
<span className="absolute bottom-0 left-0 bg-background px-4 py-2 font-display text-2xl italic">Camisa oficial</span>
</button>
<button className="reveal group relative w-[82%] shrink-0 snap-center overflow-hidden bg-background md:w-auto md:col-span-2" aria-label="Ampliar Meia oficial">
<img src="/assets/no-pique/meia.jpg" alt="Meia oficial" width="853" height="1280" loading="lazy" className="h-[460px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[600px]"/>
<span className="absolute bottom-0 left-0 bg-background px-4 py-2 font-display text-2xl italic">Meia oficial</span>
</button>
</div>
<p className="mt-4 text-sm text-muted-foreground">Fotos de garrafa, short e óculos em breve.</p>
</div>
</section>
); }

export function EventInformation() { return (
<section id="info" className="bg-background py-24 md:py-32">
<div className="mx-auto max-w-7xl px-5 md:px-10">
<h2 className="reveal text-5xl md:text-7xl">Tudo o que você <span className="text-accent">precisa saber.</span>
</h2>
<dl className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
<div className="reveal bg-background p-8">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar size-7 text-primary" aria-hidden="true">
<path d="M8 2v4">
</path>
<path d="M16 2v4">
</path>
<rect width="18" height="18" x="3" y="4" rx="2">
</rect>
<path d="M3 10h18">
</path>
</svg>
<dt className="mt-4 font-display text-lg italic text-muted-foreground">Data</dt>
<dd className="mt-1 font-display text-3xl italic">{eventDisplay.weekday}, {eventDisplay.date}</dd>
</div>
<div className="reveal bg-background p-8">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin size-7 text-primary" aria-hidden="true">
<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0">
</path>
<circle cx="12" cy="10" r="3">
</circle>
</svg>
<dt className="mt-4 font-display text-lg italic text-muted-foreground">Local</dt>
<dd className="mt-1 font-display text-3xl italic">{eventConfig.exactStartLocation || `${eventConfig.location}, ${eventConfig.state === 'BA' ? 'Bahia' : eventConfig.state}`}</dd>
</div>
<div className="reveal bg-background p-8">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-route size-7 text-primary" aria-hidden="true">
<circle cx="6" cy="19" r="3">
</circle>
<path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15">
</path>
<circle cx="18" cy="5" r="3">
</circle>
</svg>
<dt className="mt-4 font-display text-lg italic text-muted-foreground">Percurso</dt>
<dd className="mt-1 font-display text-3xl italic">{eventConfig.distanceKm} km</dd>
</div>
<div className="reveal bg-background p-8">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package size-7 text-primary" aria-hidden="true">
<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z">
</path>
<path d="M12 22V12">
</path>
<polyline points="3.29 7 12 12 20.71 7">
</polyline>
<path d="m7.5 4.27 9 5.15">
</path>
</svg>
<dt className="mt-4 font-display text-lg italic text-muted-foreground">Retirada dos kits</dt>
<dd className="mt-1 font-display text-3xl italic">{eventDisplay.pickupDate} • {eventConfig.kitPickup.location || 'local e horário a confirmar'}</dd>
</div>
<div className="reveal bg-background p-8">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock size-7 text-primary" aria-hidden="true">
<circle cx="12" cy="12" r="10">
</circle>
<path d="M12 6v6l4 2">
</path>
</svg>
<dt className="mt-4 font-display text-lg italic text-muted-foreground">Largada</dt>
<dd className="mt-1 font-display text-3xl italic">{eventConfig.startTime || 'A confirmar'}</dd>
</div>
<div className="reveal bg-background p-8">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text size-7 text-primary" aria-hidden="true">
<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z">
</path>
<path d="M14 2v5a1 1 0 0 0 1 1h5">
</path>
<path d="M10 9H8">
</path>
<path d="M16 13H8">
</path>
<path d="M16 17H8">
</path>
</svg>
<dt className="mt-4 font-display text-lg italic text-muted-foreground">Regulamento</dt>
<dd className="mt-1 font-display text-3xl italic">{eventConfig.regulationUrl ? <a className="text-accent underline" href={eventConfig.regulationUrl}>Ler regulamento</a> : 'A confirmar'}</dd>
</div>
</dl>
</div>
</section>
); }

export function ConversionCTA() { return (
<section className="relative overflow-hidden py-28 md:py-40">
<img src="/assets/no-pique/hero.jpg" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40"/>
<div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40">
</div>
<div className="speed-lines absolute inset-0">
</div>
<div className="relative mx-auto max-w-7xl px-5 md:px-10">
<h2 className="reveal max-w-4xl text-6xl md:text-9xl">O pique já começou. <span className="text-primary">Falta você!</span>
</h2>
<div className="reveal mt-10 flex flex-wrap items-center gap-6 font-display text-3xl italic">
{eventConfig.kits.map((kit, index) => <span key={kit.id}>{kit.name} <span className={index === eventConfig.kits.length - 1 ? 'text-primary' : 'text-accent'}>R$ {kit.price}</span></span>)}
</div>
<a href="#kits" className="reveal btn-cta mt-8">Escolher meu kit <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right size-5" aria-hidden="true">
<path d="M5 12h14">
</path>
<path d="m12 5 7 7-7 7">
</path>
</svg>
</a>
</div>
</section>
); }

export function Footer() { return (
<footer className="border-t bg-background py-14">
<div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3 md:px-10">
<div>
<p className="font-display text-4xl font-black italic leading-none">
<span className="text-primary">NO PIQUE</span>
<br/>
<span className="text-accent">COM POLLY</span>
</p>
<p className="mt-4 text-sm text-muted-foreground">10.01.2027 • Orla de Salvador/BA • 5 km</p>
</div>
<nav className="flex flex-col gap-2 text-sm text-muted-foreground">
<a href="#experiencia" className="hover:text-foreground">Experiência</a>
<a href="#kits" className="hover:text-foreground">Kits</a>
<a href="#info" className="hover:text-foreground">Informações</a>
<a href="#faq" className="hover:text-foreground">Perguntas frequentes</a>
<span>Regulamento — em breve</span>
<span>Política de Privacidade — em breve</span>
</nav>
<div>
<p className="font-display text-lg italic text-muted-foreground">Patrocinadores e apoiadores</p>
<p className="mt-2 text-sm text-muted-foreground">Em breve.</p>
</div>
</div>
<p className="mx-auto mt-12 max-w-7xl px-5 text-xs text-muted-foreground md:px-10">© 2027 No Pique com Polly. Primeira edição.</p>
</footer>
); }

