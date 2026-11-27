"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS_NAVEGACAO = [
  { href: "/", rotulo: "Início", tag: "SSG", titulo: "Static Site Generation" },
  { href: "/consulta", rotulo: "Consulta Interativa", tag: "CSR", titulo: "Client-Side Rendering" },
  { href: "/estatisticas", rotulo: "Painel & Indicadores", tag: "ISR", titulo: "Incremental Static Regeneration (revalidate: 60s)" },
  { href: "/servidor/1", rotulo: "Ficha Funcional", tag: "SSR", titulo: "Server-Side Rendering + Rota Dinâmica [id]" },
];

export default function Header() {
  const pathname = usePathname();
  const [tema, setTema] = useState("claro");

  useEffect(() => {
    const salvo = localStorage.getItem("tema_servidores_next");
    const inicial = salvo === "escuro" ? "escuro" : "claro";
    setTema(inicial);
    document.documentElement.setAttribute("data-tema", inicial);
  }, []);

  function alternarTema() {
    const novo = tema === "escuro" ? "claro" : "escuro";
    setTema(novo);
    document.documentElement.setAttribute("data-tema", novo);
    localStorage.setItem("tema_servidores_next", novo);
  }

  return (
    <>
      <a className="pular-link" href="#conteudo-principal">
        Pular para o conteúdo principal
      </a>

      <div className="barra-gov" role="region" aria-label="Identificação institucional">
        <div className="container barra-gov-inner">
          <div className="barra-gov-esq">
            <span className="selo-br" aria-hidden="true">BR</span>
            <span>
              Poder Executivo Federal · Portal Brasileiro de Dados Abertos (<code>dados.gov.br</code>)
            </span>
          </div>
          <div className="barra-gov-dir">
            <span>Arquitetura Next.js App Router · SSG · CSR · ISR · SSR</span>
          </div>
        </div>
      </div>

      <header className="cabecalho">
        <div className="container cabecalho-inner">
          <Link href="/" className="identidade-link">
            <div className="emblema" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18" />
                <path d="M3 10h18" />
                <path d="M5 6l7-3 7 3" />
                <path d="M4 10v11" />
                <path d="M20 10v11" />
                <path d="M8 14v3" />
                <path d="M12 14v3" />
                <path d="M16 14v3" />
              </svg>
            </div>
            <div>
              <div className="migalha">SIAPE · Transparência Pública · Next.js 14</div>
              <span className="titulo-marca">Servidores do Executivo Federal</span>
            </div>
          </Link>

          <nav className="nav-principal" aria-label="Navegação principal entre estratégias de renderização">
            {LINKS_NAVEGACAO.map((item) => {
              const ativo =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href.split("/").slice(0, 2).join("/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${ativo ? "ativo" : ""}`}
                  title={item.titulo}
                >
                  <span>{item.rotulo}</span>
                  <span className={`badge-render ${item.tag.toLowerCase()}`}>{item.tag}</span>
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={alternarTema}
            className="btn-icone"
            aria-label="Alternar entre tema claro e escuro"
          >
            <span>{tema === "escuro" ? "☀️ Tema claro" : "🌙 Tema escuro"}</span>
          </button>
        </div>
      </header>
    </>
  );
}
