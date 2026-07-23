# VZNN Portfolio

Portfólio autoral em React + Vite, com painel administrativo próprio e backend em Express. O projeto não depende de construtores de site, serviços proprietários ou SDKs de terceiros para armazenar o conteúdo.

## O que já funciona

- Home responsiva com identidade roxa/preta.
- Imagem principal editável e sempre visível no celular.
- Portfólio dinâmico com categorias, filtros, formatos e modal de detalhes.
- Painel `/admin` para adicionar, editar, ocultar, destacar, ordenar e excluir trabalhos.
- Upload local de imagens para o servidor.
- Configurações editáveis: nome, descrição, métricas, contatos, imagem principal e rodapé.
- Login administrativo por e-mail e senha definidos no `.env`.

## Instalação

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

No Prompt de Comando tradicional, copie o arquivo manualmente ou use:

```bat
copy .env.example .env
```

Abra:

- Site: `http://localhost:5173`
- Admin: `http://localhost:5173/admin`

Use o e-mail e a senha definidos em `ADMIN_EMAIL` e `ADMIN_PASSWORD`.

## Produção

```bash
npm run build
npm start
```

O servidor Express entrega a pasta `dist`, a API e os uploads. O host precisa permitir escrita persistente na pasta `server/data` e em `server/uploads`. GitHub Pages sozinho não executa o backend; para publicar com o painel funcionando, use um host Node com disco persistente.

## Segurança

- Nunca envie o arquivo `.env` para o GitHub.
- Troque `JWT_SECRET`, `ADMIN_EMAIL` e `ADMIN_PASSWORD` antes de publicar.
- As artes ficam em `server/uploads` e os dados em `server/data`.

## Estrutura principal

```text
src/components/portfolio   interface pública
src/components/admin       painel administrativo
src/hooks                  leitura dos dados
src/lib/api.js              cliente da API
server/index.js             backend e autenticação
server/data                 conteúdo persistente
server/uploads              imagens enviadas
```

## Direitos

Código e identidade visual destinados ao portfólio pessoal VZNN. Artes e marca não estão licenciadas para reutilização por terceiros.
