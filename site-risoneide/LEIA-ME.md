# Site — Risoneide Gomes Xavier, Psicóloga

Site estático (HTML, CSS e JS puros). Abra `index.html` no navegador ou publique
esta pasta (GitHub Pages, Netlify, Vercel).

## Como editar
Todo o conteúdo (serviços, preços, avaliações, dúvidas, endereço) fica em `dados.js`.

- `whatsapp`: número com DDI e DDD, só números (ex.: `5587999999999`). Os formulários
  de agendamento enviam a mensagem para esse WhatsApp.
- A foto fica em `img/foto.jpg`.

## Avaliações salvas para todos (Supabase, grátis)
Sem isso, cada avaliação nova fica salva só no aparelho de quem avaliou.

1. Crie uma conta em https://supabase.com e um projeto novo.
2. No projeto, abra **SQL Editor**, cole o código abaixo e clique em **Run**:

```sql
create table avaliacoes (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  autor text not null check (char_length(autor) between 2 and 60),
  nota int not null check (nota between 1 and 5),
  servico text not null check (char_length(servico) <= 80),
  texto text not null check (char_length(texto) between 10 and 1000)
);
alter table avaliacoes enable row level security;
create policy "todos podem ler" on avaliacoes for select using (true);
create policy "todos podem avaliar" on avaliacoes for insert with check (true);
```

3. Vá em **Project Settings → API** e copie a **Project URL** e a chave **anon public**.
4. Cole em `dados.js`, nos campos `supabaseUrl` e `supabaseChave`.

Para apagar uma avaliação indesejada: no Supabase, **Table Editor → avaliacoes**,
selecione a linha e apague.
