# Atividade Prática — Expandindo o api.js
  
**Arquivo para editar:** `src/services/api.js`

---

## Contexto

Você acabou de aprender como o `api.js` funciona.

Ele centraliza todas as chamadas HTTP da aplicação em um único lugar,
organizado por grupos: `api.auth`, `api.filmes`, `api.reservas`, etc.

Agora o CineSenai vai ganhar uma nova funcionalidade: **lista de favoritos**.
Usuários poderão salvar filmes favoritos para acessar depois.

**Sua missão: adicionar o grupo `api.favoritos` ao arquivo `api.js`.**

---

## O que você precisa implementar

Adicione o seguinte bloco ao objeto `api`, logo após o grupo `avaliacoes`:

```js
favoritos: {
  listar:    // TODO
  adicionar: // TODO
  remover:   // TODO
},
```

---

## Especificação dos endpoints

| Método | Endpoint               | Parâmetros              | Descrição                          |
|--------|------------------------|-------------------------|------------------------------------|
| GET    | /api/favoritos         | nenhum                  | Lista os filmes favoritos do usuário |
| POST   | /api/favoritos         | body: `{ filmeId }`     | Adiciona um filme à lista          |
| DELETE | /api/favoritos/:id     | `filmeId` na URL        | Remove um filme da lista           |

> Todos os três endpoints exigem autenticação.
> Isso já está resolvido automaticamente pela função `getAuthHeaders()` — você não precisa fazer nada extra.

---

## Dicas

**Dica 1 — Olhe os padrões que já existem no arquivo.**

Um GET sem parâmetro segue este modelo:
```js
listar: () => request('/api/salas'),
```

Um POST com body segue este modelo:
```js
criar: (sala) => request('/api/salas', {
  method: 'POST',
  body: JSON.stringify(sala),
}),
```

Um DELETE com ID na URL segue este modelo:
```js
deletar: (id) => request(`/api/salas/${id}`, {
  method: 'DELETE',
}),
```

**Dica 2 — A diferença entre `'texto'` e `` `texto ${variavel}` ``.**

Quando a URL tem uma variável (como o ID do filme), use template literal com crases:
```js
`/api/favoritos/${filmeId}`
//               ^^^^^^^^^ o valor da variável entra aqui
```

**Dica 3 — O body sempre precisa de `JSON.stringify`.**

O servidor espera receber texto no formato JSON, não um objeto JavaScript.
`JSON.stringify({ filmeId })` converte `{ filmeId: 5 }` para `'{"filmeId":5}'`.

---

## Checklist — Como saber se está certo?

Antes de dizer que terminou, verifique:

- [ ] O grupo `favoritos` está dentro do objeto `api` (dentro das `{}`)
- [ ] Cada método termina com vírgula `,`
- [ ] `listar` usa `GET` (sem `method:` explícito — GET é o padrão do fetch)
- [ ] `adicionar` usa `method: 'POST'` e tem `body: JSON.stringify({ filmeId })`
- [ ] `remover` usa `method: 'DELETE'` e o `filmeId` está na URL com template literal
- [ ] Nenhum erro vermelho no terminal do Vite

---

## Desafio extra 

Adicione um quarto método ao grupo `favoritos`:

```js
verificar: // verifica se um filme específico já está nos favoritos
```

- Método: `GET`
- Endpoint: `/api/favoritos/verificar?filmeId=3`
- Dica: use template literal com query string → `` `/api/favoritos/verificar?filmeId=${filmeId}` ``