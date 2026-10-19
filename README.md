# Site-Teste

Projeto inicial para implementar a rota rastreável `/TaNaRedeEdit`.

## Como executar

1. Instale Node.js LTS.
2. Execute `npm install`.
3. Copie `.env.example` para `.env` e configure as variáveis do Supabase, se disponíveis.
4. Execute `npm run dev`.

## Rastreamento

A rota `/TaNaRedeEdit` registra `event_type: page_view` e `page_path: /TaNaRedeEdit`, tenta enviar o evento ao Supabase (quando configurado) e redireciona para `/`. Sem credenciais e uma tabela compatível, o evento fica em uma fila local no navegador; isso não é um substituto para armazenamento centralizado.

## Importante

Este é um scaffold independente, pois o repositório original estava vazio. Ele não contém o site anterior, painel administrativo, checkout, Mercado Pago ou outros canais e não publica automaticamente alterações em `gafanhotosdomercado.lovable.app`. Para integrar sem perder essas funções, será necessário conectar este projeto ao código real e à implantação do Lovable.
