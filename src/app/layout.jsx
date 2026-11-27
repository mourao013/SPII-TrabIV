import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default: "Servidores do Poder Executivo Federal · Next.js",
    template: "%s | Servidores Federais · Next.js",
  },
  description:
    "Sistema de consulta e análise de servidores ativos e aposentados do Poder Executivo Federal (dados.gov.br) migrado para Next.js com SSG, CSR, ISR e SSR.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" data-tema="claro">
      <body>
        <Header />
        <main id="conteudo-principal" className="container workspace">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
