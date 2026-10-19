import { useEffect, useState } from 'react';
import { ChannelRedirect } from './pages/ChannelRedirect';

const CHANNEL_PATH = '/TaNaRedeEdit';

export default function App() {
  const [path] = useState(() => window.location.pathname.replace(/\/+$/, '') || '/');

  useEffect(() => {
    document.title = path === CHANNEL_PATH ? 'Redirecionando…' : 'Gafanhotos do Mercado';
  }, [path]);

  if (path.toLowerCase() === CHANNEL_PATH.toLowerCase()) {
    return <ChannelRedirect />;
  }

  return (
    <main className="page-shell">
      <section className="panel">
        <p className="eyebrow">PROJETO INICIAL</p>
        <h1>Gafanhotos do Mercado</h1>
        <p className="intro">
          Este é um scaffold independente. A página original e suas integrações ainda precisam
          ser adicionadas para que este projeto substitua o site publicado.
        </p>
        <div className="route-card">
          <span>URL de rastreamento preparada</span>
          <code>/TaNaRedeEdit</code>
        </div>
      </section>
    </main>
  );
}
