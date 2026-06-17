# Atividade Prática — Expandindo o api.js (Perfil do usuário)

**Arquivo para editar:** `src/services/api.js`

---

## Contexto

Até agora, todos os grupos do `api.js` usaram apenas três métodos HTTP:
`GET` (listar/buscar), `POST` (criar) e `DELETE` (remover).

Mas existem outros dois métodos muito usados:

- **PUT** — substitui um registro inteiro (ex: `filmes.atualizar`)
- **PATCH** — atualiza só uma parte do registro (ex: `admin.promoverUsuario`)

Agora o CineSenai vai ganhar uma tela de **Perfil do usuário**, onde cada
pessoa logada pode ver seus dados, atualizar nome/email e trocar a senha.

**Sua missão: adicionar o grupo `api.usuario` ao arquivo `api.js`.**

---

## O que você precisa implementar

Adicione o seguinte bloco ao objeto `api`, logo após o grupo `avaliacoes`:

```js
usuario: {
  buscarPerfil:   // TODO
  atualizarPerfil:// TODO
  trocarSenha:    // TODO
},
```

---

## Especificação dos endpoints

| Método | Endpoint              | Parâmetros                                  | Descrição                          |
|--------|------------------------|----------------------------------------------|-------------------------------------|
| GET    | /api/usuario/perfil    | nenhum                                        | Retorna os dados do usuário logado |
| PUT    | /api/usuario/perfil    | body: `{ nome, email }`                       | Substitui nome e email do usuário  |
| PATCH  | /api/usuario/senha     | body: `{ senhaAtual, novaSenha }`             | Troca apenas a senha               |

> Todos os três endpoints exigem autenticação.
> Isso já está resolvido automaticamente pela função `getAuthHeaders()` — você não precisa fazer nada extra.


## Desafio extra

Adicione um quarto método ao grupo `usuario`:

```js
excluirConta: // exclui a conta do usuário logado (sem volta!)
```

- Método: `DELETE`
- Endpoint: `/api/usuario/perfil`
- Pense: depois de excluir a conta, o token salvo no `localStorage` ainda
  faz sentido? (Resposta: não — quem for usar esse endpoint na tela
  precisaria chamar `logout()` do `AuthContext` em seguida.)
