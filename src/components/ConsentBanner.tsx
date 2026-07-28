import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ConsentState = {
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
};

const STORAGE_KEY = 'sfa_consent';

function apply(consent: ConsentState) {
  window.gtag?.('consent', 'update', consent);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    apply({
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
    setVisible(false);
  };

  const rejectAll = () => {
    apply({
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
    setVisible(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-50"
      >
        <div className="glass rounded-3xl p-6 shadow-[0_20px_60px_-20px_rgba(26,20,16,0.2)]">
          <p className="font-serif-italic text-ink text-lg mb-2">Un instant, cher visiteur</p>
          <p className="text-sm text-slate600 font-light leading-relaxed mb-4">
            Nous utilisons des cookies pour mesurer l'audience et améliorer nos campagnes publicitaires.
            Votre consentement nous aide à affiner nos recettes.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={acceptAll}
              className="cta-liquid px-5 py-2.5 rounded-full bg-ink text-ice text-[11px] uppercase tracking-[0.2em] font-medium"
            >
              Tout accepter
            </button>
            <button
              onClick={rejectAll}
              className="px-5 py-2.5 rounded-full border border-ink/20 text-ink text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-ink/5 transition-colors"
            >
              Tout refuser
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
