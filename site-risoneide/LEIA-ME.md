# Site — Risoneide Gomes Xavier, Psicóloga

Site estático (HTML, CSS e JS puros). Abra `index.html` no navegador ou publique
esta pasta (GitHub Pages, Netlify, Vercel).

- Conteúdo (serviços, preços, avaliações, dúvidas, endereço, WhatsApp): `dados.js`
- Foto: `img/foto.jpg`
- Assistente virtual (chat): `assistente.js` no site e `supabase/functions/assistente/index.ts` no servidor

Sem configurar nada, o site já funciona: as avaliações novas ficam salvas no aparelho
de quem avaliou e o assistente virtual responde com respostas prontas, montadas com
as informações do site. Os passos abaixo ligam o banco de avaliações e a IA de verdade.

## Parte 1 — Avaliações salvas para todos (Supabase, grátis)

1. Crie uma conta em https://supabase.com e um projeto novo (anote a senha do banco).
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

3. Em **Project Settings → API Keys**, copie a **Project URL** e a chave pública
   (**publishable**, começa com `sb_publishable_`, ou a antiga **anon public**).
4. Cole em `dados.js`, nos campos `supabaseUrl` e `supabaseChave`.

Para apagar uma avaliação indesejada: **Table Editor → avaliacoes**, selecione a linha e apague.

## Parte 2 — Assistente virtual com IA (Claude)

O assistente usa o modelo Claude, da Anthropic. Cada conversa tem um custo pequeno
cobrado na conta da Anthropic.

1. Crie uma conta em https://console.anthropic.com, adicione créditos em **Billing**
   e, se quiser, defina um limite de gasto mensal em **Limits**.
2. Em **API Keys**, crie uma chave (começa com `sk-ant-`). Não coloque essa chave no site.
3. No Supabase, abra **Edge Functions → Secrets** e crie o segredo
   `ANTHROPIC_API_KEY` com a chave do passo 2.
4. Em **Edge Functions → Deploy a new function → Via Editor**, dê o nome
   `assistente`, apague o código de exemplo, cole o conteúdo de
   `supabase/functions/assistente/index.ts` e clique em **Deploy**.
5. Nas configurações da função `assistente`, desligue **Enforce JWT verification**
   (o site chama a função sem login).

Pronto: com `supabaseUrl` e `supabaseChave` preenchidos (Parte 1), o chat passa a usar a IA.
Se a IA falhar ou ficar sem créditos, o chat volta sozinho para as respostas prontas.

As informações que a IA usa estão no texto `SISTEMA`, dentro de
`supabase/functions/assistente/index.ts`. Se mudar preços ou endereço em `dados.js`,
atualize também esse texto e faça o deploy de novo.
