# Real Clínica Integrada — site

Site estático (HTML, CSS e JS puro), sem etapa de build.

- `index.html` — site principal
- `assistente.html` — página própria do Assistente Virtual
- `assets/js/assistente.js` — base de informações do assistente (objeto `CLINICA` e lista `INTENTS`). Para atualizar horário, atendimentos etc., edite só esse arquivo.
- `assets/js/main.js` — interações (preloader, faixa automática, galeria, partículas no topo, menu, chat flutuante, formulário de avaliações)
- `assets/css/style.css` — identidade visual (cores da logo: azul-petróleo, turquesa e laranja)

## Rodar localmente

```bash
cd real-clinica-integrada
python3 -m http.server 8000
# abra http://localhost:8000
```

Para publicar, basta enviar a pasta inteira para qualquer hospedagem estática (Netlify, Vercel, GitHub Pages, Hostinger…).

## Regras do conteúdo

Todas as informações vêm do cliente: endereço, telefone/WhatsApp, Instagram, nota 4,9 com 7 avaliações no Google, horário "abre às 06:00" e os atendimentos do material "Atendemos". As avaliações foram reproduzidas dos prints do Google. O assistente responde só com esses dados e encaminha o resto para o WhatsApp.

## Avaliações enviadas pelo site

O formulário "Deixe sua avaliação" (nome, estrelas, comentário opcional e foto opcional) publica a avaliação na hora.

- Na versão publicada como Artifact no claude.ai, as avaliações ficam salvas num banco compartilhado e aparecem para todo mundo.
- Hospedado como site estático comum, sem servidor, o formulário guarda as avaliações só no navegador de quem enviou. Para que apareçam para todos os visitantes é preciso ligar o formulário a um banco de dados (por exemplo, Firebase ou Supabase).
