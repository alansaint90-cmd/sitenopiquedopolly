export type RegistrationStatus = 'PRE_LAUNCH' | 'SALES_OPEN' | 'SALES_PAUSED' | 'SALES_CLOSED';
export type Kit = { id: string; name: string; price: number; items: string[]; checkoutUrl: string | null };

export const eventConfig = {
  name: 'NO PIQUE COM POLLY',
  edition: 1,
  date: '2027-01-10',
  city: 'Salvador',
  state: 'BA',
  location: 'Orla de Salvador',
  distanceKm: 5,
  startTime: null as string | null,
  exactStartLocation: null as string | null,
  kitPickup: { date: '2027-01-08', location: null, startTime: null, endTime: null },
  registrationStatus: 'PRE_LAUNCH' as RegistrationStatus,
  kits: [
    { id: 'kit-bronze', name: 'Kit Bronze', price: 150, items: ['Camisa oficial', 'Número de peito'], checkoutUrl: null },
    { id: 'kit-prata', name: 'Kit Prata', price: 180, items: ['Camisa oficial', 'Número de peito', 'Garrafa', 'Meia oficial'], checkoutUrl: null },
    { id: 'kit-ouro', name: 'Kit Ouro', price: 230, items: ['Camisa oficial', 'Número de peito', 'Garrafa', 'Short', 'Meia oficial', 'Óculos'], checkoutUrl: null },
  ] as Kit[],
  artisticProgram: null,
  regulationUrl: null as string | null,
  organizerContact: null,
  instagramUrl: null,
};

const dateAtNoon = (date: string) => new Date(`${date}T12:00:00`);
const shortDate = (date: string) => dateAtNoon(date).toLocaleDateString('pt-BR');
export const eventDisplay = {
  date: shortDate(eventConfig.date),
  dottedDate: shortDate(eventConfig.date).replaceAll('/', '.'),
  fullDate: dateAtNoon(eventConfig.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
  weekday: dateAtNoon(eventConfig.date).toLocaleDateString('pt-BR', { weekday: 'long' }),
  pickupDate: shortDate(eventConfig.kitPickup.date),
};
