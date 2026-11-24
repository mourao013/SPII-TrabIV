# SPII TrabIV — Migração para Next.js (SSG, CSR, ISR, SSR) + Análise Lighthouse

Projeto de evolução e migração do **Sistema de Consulta de Servidores do Poder Executivo Federal** (`dados.gov.br`) de HTML/CSS/JS para **Next.js 14 (App Router)**.

---

## Equipe de Desenvolvimento

| Integrante | Matrícula | Papel no Projeto |
| :--- | :---: | :--- |
| **Carlos Mourão** | `169618` | Camada de Dados, Busca por Trigramas, API Routes e Rota Dinâmica SSR (`/servidor/[id]`) |
| **Pedro Henrique Cardoso** | `171075` | Arquitetura Next.js App Router, Página Inicial em SSG (`/`) e Painel de Indicadores em ISR (`/estatisticas`) |
| **João Vitor** | `171077` | Design System Institucional, Página de Consulta Interativa em CSR (`/consulta`) e Análise Lighthouse |

---

## Etapa 1 — Planejamento da Migração e Estratégias de Renderização

| Página Planejada | Estratégia | Justificativa Técnica (2–4 linhas) |
| :--- | :---: | :--- |
| **1. Portal & Catálogo** (`/`) | **SSG** | Dados institucionais e tabelas de domínio (27 UFs, cargos e órgãos) são estáticos. O SSG pré-renderiza o HTML no build e o serve via CDN com LCP < 0,8s e SEO máximo. |
| **2. Consulta Interativa** (`/consulta`) | **CSR** | Filtros altamente variáveis digitados pelo usuário em tempo real (nome exato, similaridade `%`, cargo, UF, órgão e paginação) exigem atualização assíncrona no cliente sem recarregar a página. |
| **3. Painel de Indicadores** (`/estatisticas`) | **ISR** (`revalidate: 60`) | Consolidações estatísticas por UF e órgão são servidas instantaneamente do cache estático e regeneradas em background a cada 60 segundos (*Stale-While-Revalidate*). |
| **4. Ficha Funcional** (`/servidor/[id]`) | **SSR** *(Opcional + Bônus)* | Rota dinâmica renderizada no servidor a cada requisição (`force-dynamic`), garantindo dados íntegros em tempo real e metadados SEO específicos por servidor. |
