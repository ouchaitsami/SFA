import { motion } from 'framer-motion';

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function LemonZestIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <path d="M12 34c0-10 10-20 24-20 6 0 10 2 14 5-4 18-16 30-30 30-4 0-7-1-9-3 0-4 1-8 1-12z" />
      <path d="M20 30c4-2 10-4 16-4M18 38c6-1 14-2 22-2M22 46c6 0 12-1 18-2" />
      <path d="M48 14l4-4M44 10l2-4M52 18l4-2" />
    </svg>
  );
}

export function DropletIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <path d="M32 8c-10 14-18 22-18 32a18 18 0 0036 0c0-10-8-18-18-32z" />
      <path d="M22 38a10 10 0 007 9" />
      <circle cx="46" cy="14" r="2.5" />
    </svg>
  );
}

export function ShakerIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <path d="M22 10h20M24 16h16M20 20h24l-4 34a4 4 0 01-4 4H28a4 4 0 01-4-4L20 20z" />
      <path d="M22 30h20M24 44h16" />
    </svg>
  );
}

export function JiggerIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <path d="M16 12h32l-6 18H22L16 12z" />
      <path d="M22 30l4 8h12l4-8" />
      <path d="M30 38v14M22 52h20" />
      <path d="M22 18h20M25 24h14" />
    </svg>
  );
}

export function BadgeCheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 2l2.4 2 3.1-.3 1 2.9 2.7 1.6-1 3 1 3-2.7 1.6-1 2.9-3.1-.3L12 22l-2.4-2-3.1.3-1-2.9L2.8 15.8l1-3-1-3L5.5 8.2l1-2.9 3.1.3L12 2z" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  );
}

export function SparkIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />
    </svg>
  );
}

export function ArrowRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </svg>
  );
}

export function GlassMartiniIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} {...base} strokeWidth={0.9}>
      <path d="M18 22h84l-42 50L18 22z" />
      <path d="M60 72v48" />
      <path d="M42 120h36" />
      <circle cx="48" cy="34" r="3" />
      <path d="M84 14l2-6M90 20l6-2" />
      <path d="M30 36c4 2 10 2 14 0" />
    </svg>
  );
}

export function GlassCoupeIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} {...base} strokeWidth={0.9}>
      <path d="M18 32c0 22 18 40 42 40s42-18 42-40" />
      <path d="M14 32h92" />
      <path d="M60 72v48M42 120h36" />
      <path d="M88 18a6 6 0 01-6 6M76 14v6M70 22h12" />
      <circle cx="34" cy="42" r="2" />
      <circle cx="86" cy="44" r="2" />
    </svg>
  );
}

export function GlassTumblerIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} {...base} strokeWidth={0.9}>
      <path d="M24 22h72l-6 98a4 4 0 01-4 4H34a4 4 0 01-4-4L24 22z" />
      <path d="M28 38h64M28 58h64" />
      <path d="M44 74l8 8 8-8 8 8 8-8" />
      <path d="M90 10l4-4M98 14l6-2" />
    </svg>
  );
}

export function GlassHighballIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} {...base} strokeWidth={0.9}>
      <path d="M30 18h60l-4 106a4 4 0 01-4 4H38a4 4 0 01-4-4L30 18z" />
      <path d="M34 42h52" />
      <path d="M60 18v-8M60 10l-6-4M60 10l6-4" />
      <path d="M44 56c4 3 10 3 16 0s12 3 16 0" />
      <path d="M44 78c4 3 10 3 16 0s12 3 16 0" />
    </svg>
  );
}

export function WineGlassIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} {...base} strokeWidth={0.9}>
      <path d="M38 18c-6 20-6 34 2 46 6 9 14 12 20 12s14-3 20-12c8-12 8-26 2-46" />
      <path d="M38 18h44" />
      <path d="M60 76v40M42 116h36" />
      <circle cx="30" cy="10" r="2" />
      <circle cx="90" cy="8" r="1.6" />
    </svg>
  );
}

export function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function SoFreshAdsLogo({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`inline-flex items-baseline gap-[0.12em] leading-none ${className}`}
      style={{
        fontFamily: '"Playfair Display", serif',
        fontWeight: 700,
        letterSpacing: '-0.02em',
      }}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 16 }}
    >
      <span style={{ color: '#1E7268', fontStyle: 'italic', fontWeight: 500 }}>So</span>
      <span style={{ color: '#1A1410' }}>Fresh</span>
      <span style={{ color: '#A61D5A', fontStyle: 'italic', fontWeight: 500 }}>Ads</span>
      <span
        className="inline-block rounded-full"
        style={{
          width: '0.22em',
          height: '0.22em',
          background: 'linear-gradient(90deg, #1E7268 0%, #A61D5A 100%)',
          alignSelf: 'flex-end',
          marginBottom: '0.14em',
          marginLeft: '0.06em',
        }}
      />
    </motion.div>
  );
}
