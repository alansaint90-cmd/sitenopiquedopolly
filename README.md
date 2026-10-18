# No Pique com Polly

Landing page reproduzida a partir do print, do HTML e do Prompt Master fornecidos. React, TypeScript, Vite e Tailwind CSS. As três fotografias originais estão em `public/assets/no-pique/`.

## Executar

```sh
pnpm install
pnpm dev
```

## Publicar

```sh
pnpm build
```

Publique a pasta `dist` em uma hospedagem estática. `pnpm preview` serve a versão de produção localmente.

## Dados e inscrições

Kits atualizados conforme áudio de 17/10/2026 e valores confirmados no chat: Bronze (R$ 150, camisa e número de peito), Prata (R$ 180, camisa, número de peito, garrafa e meia) e Ouro (R$ 230, camisa, número de peito, garrafa, short, meia e óculos).

Edite `src/event-config.ts` para atualizar preços, itens, informações e links. Para abrir vendas, configure `checkoutUrl` para cada kit e mude `registrationStatus` para `SALES_OPEN`. No estado atual, `PRE_LAUNCH`, selecionar um kit mostra uma mensagem verdadeira de pré-lançamento e não realiza cobrança.

Os estados `SALES_PAUSED` e `SALES_CLOSED` também possuem mensagens específicas. Os CTAs do restante da página levam à escolha dos kits.

## Mensuração

`src/analytics.ts` prepara eventos na `window.dataLayer`: `page_view`, `view_kits`, `select_kit` e `begin_checkout`. A seleção informa o identificador, nome e preço do kit. Os parâmetros UTM são preservados na sessão e encaminhados ao checkout. Nenhum serviço externo de analytics está ativo; não existem IDs inventados. A integração com GA4, Meta ou GTM depende da configuração dos IDs e das preferências de privacidade aplicáveis. A compra deve ser medida exclusivamente após confirmação real da plataforma de pagamentos.

## Antes de publicar

Configure o domínio definitivo, URLs absolutas de Open Graph, sitemap, regulamento, política de privacidade, contatos e plataforma de inscrição. Os campos pendentes aparecem como “a confirmar” ou “em breve”. Horário de largada, percurso exato e atrações não foram inventados.

## Referência visual

Mantidos a ordem das seções, tipografia Barlow Condensed e Manrope, paleta pink/ciano/preto, composições assimétricas e fotografias do material fornecido. Implementados navegação por âncoras, faixa com pausa, zoom dos produtos, FAQ com teclado, diálogos com foco e Escape, CTA móvel e respeito a movimento reduzido.
