import Link from "next/link";

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="container rodape-inner">
        <div>
          <strong>Trabalho Final — Migração Next.js (SSG, ISR, CSR, SSR) + Análise Lighthouse</strong>
          <p className="texto-auxiliar">
            Frontend Desacoplado · App Router · Consumo de API REST + Rotas Dinâmicas
          </p>
        </div>
        <div className="rodape-links">
          <Link href="/">Home (SSG)</Link>
          <Link href="/consulta">Consulta (CSR)</Link>
          <Link href="/estatisticas">Indicadores (ISR)</Link>
          <Link href="/servidor/1">Ficha SSR (#1)</Link>
        </div>
        <div className="rodape-equipe">
          Equipe: <strong>Pedro Henrique Cardoso</strong> (<code>169618</code>) ·{" "}
          <strong>Carlos Mourão</strong> (<code>171075</code>) ·{" "}
          <strong>João Vitor</strong> (<code>171077</code>)
        </div>
      </div>
    </footer>
  );
}
