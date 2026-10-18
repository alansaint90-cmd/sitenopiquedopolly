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

Kits atualizados conforme áudio de 17/10/2026 e valores confirmados no chat: Bronze (R$ 150, camisa e número de peito), Prata (R$ 180, camisa, número de peito, garrafa e meia) e Ouro (R$ 230, camisa, número de peito, garrafa, short, meia e óculos).

Edite `src/event-config.ts` para atualizar preços, itens, informações e links. Para abrir vendas, configure `checkoutUrl` para cada kit e mude `registrationStatus` para `SALES_OPEN`. No estado atual, `PRE_LAUNCH`, selecionar um kit mostra uma mensagem verdadeira de pré-lançamento e não realiza cobrança.

Os estados `SALES_PAUSED` e `SALES_CLOSED` também possuem mensagens específicas. Os CTAs do restante da página levam à escolha dos kits.

## Mensuração

`src/analytics.ts` prepara eventos na `window.dataLayer`: `page_view`, `view_kits`, `select_kit` e `begin_checkout`. A seleção informa o identificador, nome e preço do kit. Os parâmetros UTM são preservados na sessão e encaminhados ao checkout. Nenhum serviço externo de analytics está ativo; não existem IDs inventados. A integração com GA4, Meta ou GTM depende da configuração dos IDs e das preferências de privacidade aplicáveis. A compra deve ser medida exclusivamente após confirmação real da plataforma de pagamentos.

## Antes de publicar

Configure o domínio definitivo, URLs absolutas de Open Graph, sitemap, regulamento, política de privacidade, contatos e plataforma de inscrição. Os campos pendentes aparecem como “a confirmar” ou “em breve”. Horário de largada, percurso exato e atrações não foram inventados.

## Referência visual

A seção Produtos oficiais apresenta camisa, meia, garrafa, short e óculos em carrossel 3D coverflow, adaptado do código de referência fornecido: produto central em destaque, laterais inclinados, navegação circular e movimento automático suave (6,5 segundos por produto). A navegação funciona por arraste com mouse ou toque, setas, indicadores e teclado (setas, Home e End). O primeiro clique em um produto lateral o centraliza; clicar no produto central amplia a foto. A rolagem vertical do celular continua livre, e arrastar não abre a ampliação. O movimento respeita a preferência de movimento reduzido e fica suspenso quando a seção está fora da tela, a página está oculta, o usuário está arrastando, há foco no carrossel ou um diálogo está aberto. Garrafa, short e óculos foram criados com ImageGen como imagens ilustrativas, usando a camisa e a campanha como referências. Os prompts estão em `docs/product-image-prompts.json`, e as imagens otimizadas estão em `public/assets/no-pique/`.

Mantidos a ordem das seções, tipografia Barlow Condensed e Manrope, paleta pink/ciano/preto, composições assimétricas e fotografias do material fornecido. Implementados navegação por âncoras, faixa animada contínua, zoom dos produtos, FAQ com teclado, diálogos com foco e Escape, CTA móvel e respeito a movimento reduzido.
