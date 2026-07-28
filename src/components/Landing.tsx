import { FormEvent, ReactNode, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { supabase } from '../lib/supabase';
import ConsentBanner from './ConsentBanner';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
const GOOGLE_ADS_SEND_TO = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_SEND_TO as string | undefined;
import {
  BadgeCheckIcon,
  ArrowRightIcon,
  SoFreshAdsLogo,
  GlassCoupeIcon,
  WineGlassIcon,
  SparkIcon,
  XIcon,
} from './Icons';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const spring = { type: 'spring' as const, stiffness: 120, damping: 14, mass: 0.9 };

function useReveal(delay = 0) {
  const prefers = useReducedMotion();
  return {
    initial: { opacity: 0, y: prefers ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { ...spring, delay },
  };
}

function Ornament({ className = '', width = 'w-56' }: { className?: string; width?: string }) {
  return (
    <motion.svg
      viewBox="0 0 320 20"
      className={`${width} ${className} ornament-rise`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      initial={{ opacity: 0, scaleX: 0.6 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <path d="M4 10h110" strokeLinecap="round" />
      <path d="M206 10h110" strokeLinecap="round" />
      <path d="M124 10l8-5 8 5-8 5-8-5z" fill="currentColor" fillOpacity="0.18" />
      <circle cx="150" cy="10" r="1.8" fill="currentColor" />
      <path d="M160 10l0-4" strokeLinecap="round" opacity="0.5" />
      <path d="M160 14l0 0" strokeLinecap="round" />
      <circle cx="160" cy="10" r="2.6" fill="none" />
      <circle cx="170" cy="10" r="1.8" fill="currentColor" />
      <path d="M180 10l8-5 8 5-8 5-8-5z" fill="currentColor" fillOpacity="0.18" />
    </motion.svg>
  );
}

function Flourish({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" className={className} fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M10 20 Q 50 4, 100 20 T 190 20" strokeLinecap="round" />
      <circle cx="100" cy="20" r="2" fill="currentColor" />
    </svg>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="inline-block rounded-full border border-ink/15 bg-white/50 backdrop-blur px-5 py-2 text-[10px] font-medium uppercase tracking-[0.3em] text-ink/80"
    >
      {children}
    </motion.span>
  );
}

function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative z-20"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-5 sm:py-6 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center shrink-0">
          <SoFreshAdsLogo className="text-[1.4rem] sm:text-[1.75rem]" />
        </a>
        <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.3em] text-slate600">
          <a href="#services" className="nav-link hover:text-ink">La Carte</a>
          <a href="#chiffres" className="nav-link hover:text-ink">Maison</a>
          <a href="#contact" className="nav-link hover:text-ink">Réservation</a>
        </nav>
        <a
          href="#contact"
          className="cta-liquid inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-ice text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-medium whitespace-nowrap"
        >
          Réserver
          <ArrowRightIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </a>
      </div>
    </motion.header>
  );
}

function Certifs() {
  return (
    <div className="flex items-center justify-center gap-8 sm:gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col items-center gap-3"
      >
        <div className="certif-badge w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white ring-1 ring-ink/10 flex items-center justify-center shadow-[0_12px_40px_-12px_rgba(26,20,16,0.15)]">
          <img src="/google-ads-certification.webp" alt="Google Ads Certified" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
        </div>
        <span className="font-serif-italic text-xs sm:text-sm text-slate600">Google Ads</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center gap-3"
      >
        <div className="certif-badge w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white ring-1 ring-ink/10 flex items-center justify-center shadow-[0_12px_40px_-12px_rgba(26,20,16,0.15)]">
          <img src="/Digital_Mar_Assoc_800.png" alt="Meta Digital Marketing Associate" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
        </div>
        <span className="font-serif-italic text-xs sm:text-sm text-slate600">Meta Business</span>
      </motion.div>
    </div>
  );
}

function GlassMotif() {
  const prefers = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: prefers ? 0 : [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.7 },
        scale: { duration: 0.7 },
        y: prefers ? { duration: 0 } : { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
      }}
      className="mx-auto mb-5 sm:mb-6 w-11 h-14 sm:w-14 sm:h-16 text-raspberry"
    >
      <GlassCoupeIcon className="w-full h-full" />
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-4 sm:pt-6 pb-16 sm:pb-24">
      <div className="blob bg-lime-soft w-[320px] h-[320px] md:w-[520px] md:h-[520px] -top-24 md:-top-32 -left-24 md:-left-32" />
      <div className="blob bg-raspberry-soft w-[280px] h-[280px] md:w-[420px] md:h-[420px] top-40 right-0 opacity-40" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="mb-6 sm:mb-8">
            <Pill>Maison fondée en 2024 — Saison 2026</Pill>
          </div>

          <GlassMotif />

          <Ornament className="mx-auto text-ink/40 mb-6 sm:mb-8" />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] md:leading-[1.02] text-ink"
          >
            Agence d'<em className="font-serif-italic grad-text">Acquisition</em>
            <span className="block font-serif-italic text-slate600 mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl lg:text-[2.4rem] tracking-normal leading-snug">
              L'<span className="font-display not-italic font-bold text-ink">Alchimie</span> au service
              <br className="hidden md:block" /> de votre <span className="font-display not-italic font-bold text-ink">ROAS</span>
            </span>
          </motion.h1>

          <div className="my-8 sm:my-10 mx-auto h-[2px] w-32 sm:w-40 rounded-full grad-underline" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-base sm:text-lg text-slate600 leading-[1.7] sm:leading-[1.8] max-w-2xl mx-auto font-light"
          >
            Extraction maximale de vos données pour un rendement pur. Nous distillons votre budget
            publicitaire pour servir un flux continu de clients qualifiés, avec un ciblage chirurgical
            et une transparence totale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 sm:mt-12 flex justify-center"
          >
            <a
              href="#contact"
              className="cta-liquid group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-9 py-3.5 sm:py-4 rounded-full text-ice font-medium shadow-cta text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] text-center"
              onClick={() => window.gtag?.('event', 'cta_hero_click')}
            >
              Commander mon Audit Gratuit
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
            </a>
          </motion.div>

          <div className="mt-10 sm:mt-14 flex items-center justify-center gap-2 text-sm text-slate600 font-serif-italic">
            <BadgeCheckIcon className="w-5 h-5 text-lime shrink-0" />
            Mixologues certifiés Google & Meta
          </div>

          <Ornament className="mx-auto text-ink/30 mt-10 sm:mt-12 mb-8 sm:mb-10" width="w-40" />

          <Certifs />
        </motion.div>
      </div>
    </section>
  );
}

function Chiffres() {
  const items = [
    {
      k: '100%',
      label: 'Transparence',
      desc: 'Accès direct à vos comptes et vos datas. Vous voyez chaque ingrédient de votre succès, sans filtre.',
      tone: 'lime',
    },
    {
      k: '24h',
      label: 'Service express',
      desc: 'Un audit livré en 24h et une première itération mise en ligne dans la foulée, sans attendre.',
      tone: 'raspberry',
    },
    {
      k: '50+',
      label: 'Clients qui trinquent',
      desc: 'Une cave de marques e-commerce et SaaS qui renouvellent leur contrat saison après saison.',
      tone: 'lime',
    },
  ];
  return (
    <section id="chiffres" className="relative py-8 sm:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={spring}
          className="glass rounded-[1.25rem] sm:rounded-[2rem] px-5 py-7 sm:px-10 sm:py-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-ink/10"
        >
          {items.map((it, i) => (
            <motion.div
              key={it.k}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center px-4 md:px-6"
            >
              <span className={`font-display text-4xl md:text-5xl ${it.tone === 'lime' ? 'text-lime' : 'text-raspberry'} leading-none`}>
                {it.k}
              </span>
              <span className="mt-3 text-[11px] uppercase tracking-[0.3em] text-ink font-medium">
                {it.label}
              </span>
              <p className="mt-3 text-sm text-slate600 leading-relaxed font-light max-w-[26ch]">
                {it.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const ACRONYM_HINTS: Record<string, string> = {
  ROAS: 'Retour sur dépense publicitaire',
  CPM: 'Coût pour 1000 impressions',
  VTR: 'Taux de vue complète',
  CPA: 'Coût par acquisition',
  CTR: 'Taux de clic',
  CVR: 'Taux de conversion',
  ROI: 'Retour sur investissement',
  LTV: 'Valeur vie client',
};

type MenuItem = { name: string; price: string };
type MenuCategory = {
  title: string;
  tone: 'lime' | 'rasp';
  items: MenuItem[];
};

function MenuBlock({ title, tone, items, index, tagline }: MenuCategory & { index: number; tagline?: string }) {
  const accent = tone === 'lime' ? 'text-lime' : 'text-raspberry';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...spring, delay: index * 0.08 }}
      className="w-full"
    >
      <h3 className={`font-display text-2xl sm:text-3xl md:text-[2.1rem] tracking-wide uppercase leading-[1.1] ${accent}`}>
        {title}
      </h3>
      <div className="mt-3 mb-4 h-px w-full bg-gradient-to-r from-transparent via-ink/40 to-transparent" />
      {tagline && (
        <p className="text-[13px] sm:text-sm text-slate600 mb-4 sm:mb-5 leading-relaxed font-light">
          {tagline}
        </p>
      )}
      <ul className="space-y-3">
        {items.map((it, i) => (
          <motion.li
            key={it.name}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.08 + 0.15 + i * 0.05, duration: 0.5 }}
            className="service-card group flex items-baseline gap-3"
          >
            <span className="font-serif-italic text-[13px] uppercase tracking-[0.2em] text-ink whitespace-nowrap">
              {it.name}
            </span>
            <span className="service-dot-line flex-1 h-[6px] translate-y-[-2px] min-w-[24px]" />
            <span
              className={`service-price font-serif-italic text-[13px] uppercase tracking-[0.22em] transition-all duration-500 ${accent} whitespace-nowrap ${ACRONYM_HINTS[it.price] ? 'cursor-help underline decoration-dotted underline-offset-4' : ''}`}
              title={ACRONYM_HINTS[it.price]}
            >
              {it.price}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function Services() {
  const reveal = useReveal();

  const categories: (MenuCategory & { tagline: string })[] = [
    {
      title: 'Google Citronnade',
      tagline: 'Un mélange de précision pour capturer l\'intention et faire pétiller vos conversions.',
      tone: 'lime',
      items: [
        { name: 'Search', price: 'ROAS' },
        { name: 'Display', price: 'CPM' },
        { name: 'YouTube', price: 'VTR' },
      ],
    },
    {
      title: 'Meta Smoothie',
      tagline: 'Une recette visuelle magnétique et un ciblage granulaire qui fluidifie votre tunnel de vente.',
      tone: 'rasp',
      items: [
        { name: 'Facebook Ads', price: 'CPA' },
        { name: 'Instagram Ads', price: 'CTR' },
        { name: 'Advantage+', price: 'ROAS' },
      ],
    },
    {
      title: 'Creative Fresh Boost',
      tagline: 'Notre ingrédient secret pour dynamiser votre ROI et maintenir une performance constante.',
      tone: 'lime',
      items: [
        { name: 'A/B Testing', price: 'CVR' },
        { name: 'Créatives', price: 'CTR' },
        { name: 'Optimisation', price: 'ROI' },
      ],
    },
    {
      title: 'Data Shot',
      tagline: 'Un concentré de données brutes pour réveiller vos performances et piloter votre croissance à l\'instinct.',
      tone: 'rasp',
      items: [
        { name: 'Tracking GA4', price: 'Setup' },
        { name: 'Analyses', price: 'Insights' },
        { name: 'Attribution', price: 'LTV' },
      ],
    },
  ];

  return (
    <section id="services" className="relative py-16 sm:py-28">
      <div className="blob bg-raspberry-soft w-[320px] h-[320px] md:w-[500px] md:h-[500px] right-[-80px] md:right-[-100px] top-20 opacity-30" />
      <div className="blob bg-lime-soft w-[280px] h-[280px] md:w-[420px] md:h-[420px] left-[-60px] md:left-[-80px] bottom-20 opacity-30" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div {...reveal} className="menu-card rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 md:p-16">
          <div className="menu-paper-texture" />
          <span className="menu-corner tl" />
          <span className="menu-corner tr" />
          <span className="menu-corner bl" />
          <span className="menu-corner br" />

          <div className="relative text-center mb-10 sm:mb-14">
            <p className="font-serif-italic text-slate600 text-[10px] sm:text-[11px] tracking-[0.28em] sm:tracking-[0.32em] uppercase mb-3 sm:mb-4">
              La Maison SoFreshAds
            </p>
            <h2 className="font-display text-[1.6rem] sm:text-4xl md:text-6xl text-ink leading-[1.05] sm:leading-[1] tracking-tight uppercase break-words">
              Nos
              <span className="font-serif-italic normal-case grad-text mx-2 sm:mx-3">Cocktails</span>
              Signature
            </h2>
            <Ornament className="mx-auto text-ink/35 mt-5 sm:mt-6" width="w-32 sm:w-40" />
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-20 gap-y-10 sm:gap-y-12">
            {categories.map((cat, i) => (
              <MenuBlock key={cat.title} {...cat} index={i} />
            ))}
          </div>

          <div className="relative mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-ink/15 flex items-center justify-center gap-3 sm:gap-6 text-ink/35">
            <span className="text-ink/25">◆</span>
            <Flourish className="w-40 sm:w-56 h-6" />
            <span className="text-ink/25">◆</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CheersModal({ onClose }: { onClose: () => void }) {
  const prefers = useReducedMotion();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const glassLeft = prefers
    ? { initial: { opacity: 0 }, animate: { opacity: 1, x: -6, rotate: -12 } }
    : {
        initial: { x: -46, rotate: -30, opacity: 0 },
        animate: { x: -6, rotate: -12, opacity: 1 },
      };
  const glassRight = prefers
    ? { initial: { opacity: 0 }, animate: { opacity: 1, x: 6, rotate: 12 } }
    : {
        initial: { x: 46, rotate: 30, opacity: 0 },
        animate: { x: 6, rotate: 12, opacity: 1 },
      };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Confirmation d'envoi"
    >
      <motion.div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className="glass relative rounded-[2rem] p-8 sm:p-10 max-w-sm w-full text-center"
      >
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-ink/40 hover:text-ink hover:bg-ink/5 transition-colors"
        >
          <XIcon className="w-4 h-4" />
        </button>

        <div className="relative flex items-center justify-center h-24 mb-5">
          <motion.div
            className="absolute w-12 h-16 sm:w-14 sm:h-[4.5rem] text-raspberry"
            initial={glassLeft.initial}
            animate={glassLeft.animate}
            transition={prefers ? { duration: 0.3 } : { type: 'spring', stiffness: 170, damping: 13, delay: 0.15 }}
          >
            <WineGlassIcon className="w-full h-full" />
          </motion.div>
          <motion.div
            className="absolute w-12 h-16 sm:w-14 sm:h-[4.5rem] text-lime"
            style={{ transform: 'scaleX(-1)' }}
            initial={glassRight.initial}
            animate={glassRight.animate}
            transition={prefers ? { duration: 0.3 } : { type: 'spring', stiffness: 170, damping: 13, delay: 0.15 }}
          >
            <WineGlassIcon className="w-full h-full" />
          </motion.div>
          {!prefers && (
            <motion.div
              className="absolute text-raspberry-soft"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 1, 0], scale: [0.3, 1.4, 1] }}
              transition={{ delay: 0.55, duration: 0.55, ease: 'easeOut' }}
            >
              <SparkIcon className="w-7 h-7" />
            </motion.div>
          )}
        </div>

        <h3 className="font-display text-2xl sm:text-[1.7rem] text-ink mb-2">Santé !</h3>
        <p className="font-serif-italic text-slate600 text-[15px] sm:text-base leading-relaxed">
          Votre demande est en cave. Nous revenons vers vous sous 24h.
        </p>
      </motion.div>
    </motion.div>
  );
}

function ContactForm() {
  const reveal = useReveal();
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [form, setForm] = useState({ full_name: '', email: '', website: '', budget: '' });
  const { executeRecaptcha } = useGoogleReCaptcha();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState('loading');

    let captchaToken: string | null = null;
    if (RECAPTCHA_SITE_KEY && executeRecaptcha) {
      try {
        captchaToken = await executeRecaptcha('contact_form');
      } catch {
        setState('error');
        return;
      }
      if (!captchaToken) {
        setState('error');
        return;
      }
    }

    const { error } = await supabase.from('leads').insert({
      full_name: form.full_name,
      email: form.email,
      website: form.website,
      budget: form.budget,
      captcha_token: captchaToken,
    });
    if (error) {
      setState('error');
      return;
    }

    supabase.functions.invoke('send-lead-confirmation', {
      body: { full_name: form.full_name, email: form.email, website: form.website, budget: form.budget },
    }).catch(() => {});

    window.gtag?.('event', 'generate_lead', {
      event_category: 'engagement',
      event_label: 'contact_form',
      value: 1,
    });
    if (GOOGLE_ADS_SEND_TO) {
      window.gtag?.('event', 'conversion', { send_to: GOOGLE_ADS_SEND_TO });
    }
    setState('done');
    setForm({ full_name: '', email: '', website: '', budget: '' });
  }

  return (
    <section id="contact" className="relative py-16 sm:py-28">
      <div className="blob bg-lime-soft w-[320px] h-[320px] md:w-[500px] md:h-[500px] left-[-80px] md:left-[-100px] top-10 opacity-40" />
      <div className="blob bg-raspberry-soft w-[240px] h-[240px] md:w-[360px] md:h-[360px] right-[-40px] md:right-[-60px] bottom-0 opacity-30" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14" {...reveal}>
          <p className="font-serif-italic text-slate600 text-base sm:text-lg mb-2">Service à la commande</p>
          <Ornament className="mx-auto text-ink/35 my-4" width="w-32 sm:w-44" />
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-ink leading-[1.1]">
            Analysez le potentiel de vos <em className="grad-text font-serif-italic">campagnes</em>
          </h2>
          <p className="mt-4 sm:mt-5 font-serif-italic text-slate600 text-base sm:text-lg">
            Nos alchimistes vous préparent un audit sur-mesure en moins de 24h.
          </p>
        </motion.div>

        <motion.form
          {...reveal}
          onSubmit={onSubmit}
          className="glass rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-14"
        >
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 sm:gap-y-7">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.28em] text-slate600 mb-2 font-medium">
                Nom complet
              </label>
              <input
                required
                className="input-line"
                placeholder="Votre nom"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.28em] text-slate600 mb-2 font-medium">
                Email professionnel
              </label>
              <input
                required
                type="email"
                className="input-line"
                placeholder="vous@entreprise.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.28em] text-slate600 mb-2 font-medium">
                Site web
              </label>
              <input
                required
                className="input-line"
                placeholder="https://votresite.com"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.28em] text-slate600 mb-2 font-medium">
                Budget mensuel alloué
              </label>
              <select
                required
                className="input-line bg-transparent"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
              >
                <option value="">Choisir une gamme</option>
                <option value="500-2000">500€ – 2 000€</option>
                <option value="2000-5000">2 000€ – 5 000€</option>
                <option value="5000-10000">5 000€ – 10 000€</option>
                <option value="10000+">+ 10 000€</option>
              </select>
            </div>
          </div>

          <div className="my-10 text-center text-ink/25">
            <Flourish className="w-32 h-4 mx-auto" />
          </div>

          <div className="flex flex-col items-center gap-4">
            <motion.button
              type="submit"
              disabled={state === 'loading'}
              whileHover={{ scale: state === 'loading' ? 1 : 1.02 }}
              whileTap={{ scale: state === 'loading' ? 1 : 0.98 }}
              className="cta-liquid inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3.5 sm:py-4 rounded-full text-ice font-medium shadow-cta disabled:opacity-60 text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] text-center"
            >
              {state === 'loading' ? 'Distillation en cours…' : 'Recevoir mon audit gratuit'}
              {state !== 'loading' && <ArrowRightIcon className="w-4 h-4" />}
            </motion.button>
            <p className="text-xs sm:text-sm text-slate600 text-center leading-relaxed">
              Analyse sur mesure <span className="mx-2 text-ink/20">◆</span> Sans engagement
              <span className="mx-2 text-ink/20">◆</span> Données sécurisées
            </p>
            {RECAPTCHA_SITE_KEY && (
              <p className="text-[10px] text-slate600/70 font-light max-w-md text-center">
                Ce site est protégé par reCAPTCHA. Les{' '}
                <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noreferrer">règles de confidentialité</a>{' '}
                et les{' '}
                <a href="https://policies.google.com/terms" className="underline" target="_blank" rel="noreferrer">conditions d'utilisation</a>{' '}
                de Google s'appliquent.
              </p>
            )}
            {state === 'done' && (
              <AnimatePresence>
                <CheersModal onClose={() => setState('idle')} />
              </AnimatePresence>
            )}
            {state === 'error' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-serif-italic text-raspberry mt-2"
              >
                Un petit grain dans la mécanique. Merci de réessayer dans un instant.
              </motion.p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-ink/10 py-8 sm:py-10 mt-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-4 text-sm text-slate600">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center">
          <SoFreshAdsLogo className="text-xl" />
          <span className="text-ink/20 hidden sm:inline">◆</span>
          <span className="font-serif-italic text-xs sm:text-sm">Cocktails de campagnes publicitaires</span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-7 uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[10px] sm:text-[11px]">
          <a href="#services" className="nav-link hover:text-ink">Carte</a>
          <a href="#contact" className="nav-link hover:text-ink">Réservation</a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

function LandingContent() {
  return (
    <div className="relative min-h-screen bg-ice overflow-x-hidden">
      <div className="glow-teal" />
      <div className="glow-plum" />
      <Nav />
      <Hero />
      <Chiffres />
      <Services />
      <ContactForm />
      <Footer />
      <ConsentBanner />
    </div>
  );
}

export default function Landing() {
  if (!RECAPTCHA_SITE_KEY) {
    return <LandingContent />;
  }
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={RECAPTCHA_SITE_KEY}
      scriptProps={{ async: true, defer: true, appendTo: 'head' }}
    >
      <LandingContent />
    </GoogleReCaptchaProvider>
  );
}
