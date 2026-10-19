import { useEffect, useState } from 'react';
import { trackChannelPageView } from '../lib/analytics';

const CHANNEL_NAME = 'TaNaRedeEdit';
const CHANNEL_SLUG = 'tanaredeedit';
const PAGE_PATH = '/TaNaRedeEdit';
const REDIRECT_PATH = (import.meta.env.VITE_CHANNEL_REDIRECT_PATH as string | undefined) || '/';

export function ChannelRedirect() {
  const [status, setStatus] = useState('Registrando acesso…');

  useEffect(() => {
    let active = true;
    const redirect = async () => {
      await trackChannelPageView(PAGE_PATH, CHANNEL_SLUG);
      if (!active) return;
      setStatus('Acesso registrado. Redirecionando…');
      window.location.replace(REDIRECT_PATH);
    };
    void redirect();
    return () => { active = false; };
  }, []);

  return (
    <main className="page-shell">
      <section className="panel redirect-panel" aria-live="polite">
        <p className="eyebrow">CANAL {CHANNEL_NAME}</p>
        <h1>{status}</h1>
        <p className="intro">Você será encaminhado em instantes.</p>
        <a href={REDIRECT_PATH}>Continuar agora</a>
      </section>
    </main>
  );
}
