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

## EasyPanel / Docker

O `Dockerfile` na raiz compila o site com Node.js 24 e pnpm 11.25.0, e serve os arquivos estáticos com Nginx na porta interna **8080**.

No EasyPanel, mantenha a fonte Git no repositório `https://github.com/alansaint90-cmd/sitenopiquedopolly.git`, branch `master` e caminho de build `/`. Em Build, use Dockerfile com caminho `Dockerfile`. Na configuração do domínio, defina protocolo HTTP e porta de destino `8080`. Depois salve e implante.

Para executar com Docker localmente:

```sh
docker build -t no-pique-com-polly .
docker run --rm -p 8080:8080 no-pique-com-polly
```

## Dados e inscrições

Dados atualizados em 19/10/2026 a partir da página oficial da Ticketmaker, conforme solicitação do usuário. Os kits agora seguem a nomenclatura e os itens da plataforma: Kit 1 (R$ 120 + R$ 12 de taxa), Kit 2 (R$ 150 + R$ 15) e Kit 3 (R$ 199 + R$ 19,90). A evidência consultada está em `docs/ticketmaker-2026-10-19.md`.

Edite `src/event-config.ts` para atualizar preços, itens, informações e links. O estado atual é `SALES_OPEN`. Todos os CTAs de inscrição são links reais para a seleção de kit e tamanho na Ticketmaker; a escolha do tamanho, o carrinho, a identificação e o pagamento acontecem na plataforma oficial. Não há parâmetros de pré-seleção de kit inventados.

`RegistrationLink` centraliza o destino dos CTAs e a mensuração. Se o status deixar de ser `SALES_OPEN`, os links retornam à seção de kits. Os links de navegação “Kits” permanecem como âncoras internas.

## Mensuração

`src/analytics.ts` prepara eventos na `window.dataLayer`: `page_view`, `view_kits`, `select_kit` e `begin_checkout`. A seleção informa o identificador, nome e preço do kit. Os parâmetros UTM são preservados na sessão e encaminhados ao checkout. Nenhum serviço externo de analytics está ativo; não existem IDs inventados. A integração com GA4, Meta ou GTM depende da configuração dos IDs e das preferências de privacidade aplicáveis. A compra deve ser medida exclusivamente após confirmação real da plataforma de pagamentos.

## Antes de publicar

Configure o domínio definitivo, URLs absolutas de Open Graph, sitemap, regulamento e política de privacidade do site. Os links de privacidade, reembolso e suporte da compra apontam para a Ticketmaker e são identificados como tal. O horário de 6h às 12h é o horário do evento, não uma confirmação de largada. Ponto exato de largada, local/horário da retirada e regulamento continuam pendentes. A data prevista de retirada (08/01/2027) veio do material anterior e não está confirmada na página consultada.

## Referência visual

A seção Produtos oficiais apresenta camisa, meia, garrafa, shorts masculino e feminino, mochila e óculos em carrossel 3D coverflow, adaptado do código de referência fornecido: produto central em destaque, laterais inclinados, navegação circular e movimento automático suave (6,5 segundos por produto). A navegação funciona por arraste com mouse ou toque, setas, indicadores e teclado (setas, Home e End). O primeiro clique em um produto lateral o centraliza; clicar no produto central amplia a foto. A rolagem vertical do celular continua livre, e arrastar não abre a ampliação. O movimento respeita a preferência de movimento reduzido e fica suspenso quando a seção está fora da tela, a página está oculta, o usuário está arrastando, há foco no carrossel ou um diálogo está aberto. Garrafa e óculos foram criados com ImageGen como imagens ilustrativas. O card de shorts foi substituído pelo recorte azul dos modelos masculino e feminino, e o card de mochila usa o recorte da arte do Kit 3 enviada pelo usuário em 27/10/2026. Ambos usam enquadramento completo, sem cortar os produtos. Os prompts estão em `docs/product-image-prompts.json` e `docs/product-cutout-prompts.md`; os arquivos estão em `public/assets/no-pique/`.

Mantidos a ordem das seções, tipografia Barlow Condensed e Manrope, paleta pink/ciano/preto, composições assimétricas e fotografias do material fornecido. Implementados navegação por âncoras, faixa animada contínua, zoom dos produtos, FAQ com teclado, diálogos com foco e Escape, CTA móvel e respeito a movimento reduzido.
