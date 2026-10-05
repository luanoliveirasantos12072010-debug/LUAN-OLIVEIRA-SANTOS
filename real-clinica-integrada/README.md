# Real Clínica Integrada — site

Site estático (HTML, CSS e JS puro), sem etapa de build.

- `index.html` — site principal
- `assistente.html` — página própria do Assistente Virtual
- `assets/js/assistente.js` — base de informações do assistente (objeto `CLINICA` e lista `INTENTS`). Para atualizar horário, atendimentos etc., edite só esse arquivo.
- `assets/js/main.js` — animações (preloader, scroll cinematográfico, galeria horizontal, partículas, cursor, botões magnéticos)
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
