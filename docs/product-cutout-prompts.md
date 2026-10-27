# Recortes de mochila e shorts — 27/10/2026

Ferramenta: ImageGen integrada (sem CLI/API externa). Entrada: arte do Kit 3 enviada pelo usuário (`codex-clipboard-893afeee-e987-45c3-abf2-59ed580c2b26.jpg`).

Fluxo: extração individual dos produtos da arte, seguida de limpeza da transparência e ajuste do enquadramento. O segundo arquivo mantém os modelos masculino e feminino juntos. Os arquivos anteriores do site não foram substituídos.

## Mochila

Arquivo final: `public/assets/no-pique/mochila-recorte.png`, PNG RGBA de 1254 × 1254 px.

Prompt final de edição, aplicado ao primeiro recorte da mochila:

> Use case: background-extraction. EDIT TARGET: attached pink drawstring backpack image. Correct the existing cutout ONLY. Remove ALL surrounding pink light bloom, magenta gradient, black/gray background, halo and floor reflection. Outside the physical bag and black ropes must be completely transparent (alpha zero), with a crisp natural silhouette, including transparent gaps inside the rope loops. The fabric and black cords must remain fully opaque. Keep the exact bag, pink fabric, folds, lighting and cyan NO PIQUE com POLLY print unchanged. Do NOT add a replacement background, vignette, glow, shadow, poster, product stand or any other object. Fit the complete backpack and all cords inside a square transparent canvas with generous clear 12 percent padding on ALL four sides. No cropping. Genuine transparent PNG.

## Shorts

Arquivo final: `public/assets/no-pique/shorts-recorte.png`, PNG RGBA de 1774 × 887 px.

Prompt final de edição, aplicado ao primeiro recorte do par de shorts:

> Use case: background-extraction. EDIT TARGET: attached pair of blue shorts. Keep this exact product pair and correct framing ONLY: zoom out so both complete shorts have generous clear transparent padding on ALL four sides (at least 12 percent of canvas width). The left men's shorts outer seam and hem and right women's shorts must be wholly inside the image with no edge touching the canvas. Preserve exact royal-blue fabric, pink trim and logos, black drawstrings, texture, folds, stitching and separate male/female shapes. Do not redesign, add text, shadows or backgrounds. Keep real alpha transparency around and between products. Fully opaque fabric with clean natural edges, no blue/pink halo. The two shorts remain side by side in one PNG, centered together.

Os dois PNGs foram inspecionados visualmente e possuem canal alfa, áreas totalmente transparentes e os quatro cantos transparentes. São recortes tratados por IA; os arquivos da geração ficam preservados em `.codex/generated_images`.
