export type RegistrationStatus = 'PRE_LAUNCH' | 'SALES_OPEN' | 'SALES_PAUSED' | 'SALES_CLOSED';
export type Kit = { id: string; name: string; price: number; serviceFee: number; items: string[]; bonus?: string; checkoutUrl: string };

const ticketmakerUrl = 'https://vendas.ticketmaker.com.br/evento/no-pique-com-polly/29634-1202';

export const eventConfig = {
  name: 'NO PIQUE COM POLLY',
  edition: 1,
  date: '2027-01-10',
  city: 'Salvador',
  state: 'BA',
  location: 'Orla de Salvador',
  distanceKm: 5,
  startTime: '06:00',
  endTime: '12:00',
  minimumAge: 18,
  shirtSizes: ['P', 'M', 'G', 'GG'],
  exactStartLocation: null as string | null,
  kitPickup: { date: '2027-01-08', location: null, startTime: null, endTime: null },
  registrationStatus: 'SALES_OPEN' as RegistrationStatus,
  checkoutUrl: ticketmakerUrl,
  kits: [
    { id: 'kit-1', name: 'Kit 1', price: 120, serviceFee: 12, items: ['Camisa oficial', 'Medalha do evento', 'Mochila personalizada'], bonus: 'Óculos para as primeiras 100 pessoas, conforme anúncio. Consulte a disponibilidade na Ticketmaker.', checkoutUrl: ticketmakerUrl },
    { id: 'kit-2', name: 'Kit 2', price: 150, serviceFee: 15, items: ['Camisa oficial', 'Short', 'Óculos exclusivo', 'Mochila personalizada'], checkoutUrl: ticketmakerUrl },
    { id: 'kit-3', name: 'Kit 3', price: 199, serviceFee: 19.9, items: ['Camisa oficial', 'Short', 'Óculos exclusivo', 'Meia', 'Garrafa', 'Mochila personalizada'], checkoutUrl: ticketmakerUrl },
  ] as Kit[],
  artisticProgram: 'Polly no comando do after',
  regulationUrl: null as string | null,
  supportUrl: 'https://ticketmaker.com.br/central-de-ajuda/',
  supportEmail: 'atendimento@ticketmaker.com.br',
  refundPolicyUrl: 'https://vendas.ticketmaker.com.br/TermosPoliticas/Reembolso',
  checkoutPrivacyUrl: 'https://vendas.ticketmaker.com.br/TermosPoliticas/Privacidade',
  instagramUrl: 'https://www.instagram.com/nopiquecompolly',
};

const dateAtNoon = (date: string) => new Date(`${date}T12:00:00`);
const shortDate = (date: string) => dateAtNoon(date).toLocaleDateString('pt-BR');
export const eventDisplay = {
  date: shortDate(eventConfig.date),
  dottedDate: shortDate(eventConfig.date).replaceAll('/', '.'),
  fullDate: dateAtNoon(eventConfig.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
  weekday: dateAtNoon(eventConfig.date).toLocaleDateString('pt-BR', { weekday: 'long' }),
  pickupDate: shortDate(eventConfig.kitPickup.date),
  schedule: `${eventConfig.startTime.replace(':', 'h')} às ${eventConfig.endTime.replace(':', 'h')}`,
};

export const formatMoney = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
