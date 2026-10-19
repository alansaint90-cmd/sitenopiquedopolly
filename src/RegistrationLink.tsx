import type { ComponentPropsWithoutRef } from 'react';
import { checkoutLink, track } from './analytics';
import { eventConfig, type Kit } from './event-config';

type Props = Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'onClick'> & { kit?: Kit };

export function RegistrationLink({ kit, children, ...props }: Props) {
  const salesOpen = eventConfig.registrationStatus === 'SALES_OPEN';
  const href = salesOpen ? checkoutLink(kit?.checkoutUrl || eventConfig.checkoutUrl) : '#kits';
  return <a {...props} href={href} onClick={() => {
    if (!salesOpen) return;
    const details = kit ? { kit: kit.id, kit_name: kit.name, value: kit.price, currency: 'BRL' } : {};
    if (kit) track('select_kit', details);
    track('begin_checkout', details);
  }}>{children}</a>;
}
