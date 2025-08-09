'use client';
import React, { useMemo, useState } from 'react';
import '../styles/globals.css';

// ----- Placeholder Data (replace with real DB/API later) -----
const productionData = [
  {
    id: 'azimut-78-fly',
    brand: 'Azimut',
    model: '78 Fly',
    type: 'Flybridge',
    loa_m: 23.77,
    beam_m: 5.75,
    draft_m: 1.77,
    guests: 8,
    cabins: 4,
    crew: 2,
    cruise_kn: 26,
    max_kn: 31,
    range_nm: 340,
    year_from: 2019,
    units_built: '~',
    images: [
      'https://images.unsplash.com/photo-1505150892987-424388e07288?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?q=80&w=1600&auto=format&fit=crop',
    ],
    layouts: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    id: 'princess-y85',
    brand: 'Princess',
    model: 'Y85',
    type: 'Flybridge',
    loa_m: 26.2,
    beam_m: 6.3,
    draft_m: 1.77,
    guests: 8,
    cabins: 4,
    crew: 3,
    cruise_kn: 24,
    max_kn: 33,
    range_nm: 300,
    year_from: 2019,
    units_built: '~',
    images: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop',
    ],
    layouts: [
      'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?q=80&w=1600&auto=format&fit=crop',
    ],
  },
  {
    id: 'sunseeker-76-yacht',
    brand: 'Sunseeker',
    model: '76 Yacht',
    type: 'Flybridge',
    loa_m: 23.6,
    beam_m: 5.95,
    draft_m: 1.7,
    guests: 8,
    cabins: 4,
    crew: 2,
    cruise_kn: 25,
    max_kn: 32,
    range_nm: 330,
    year_from: 2018,
    units_built: '~',
    images: [
      'https://images.unsplash.com/photo-1501621667575-af81f1f0bacc?q=80&w=1600&auto=format&fit=crop',
    ],
    layouts: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1600&auto=format&fit=crop',
    ],
  },
];

const semiCustomData = [
  {
    id: 'heesen-50-steel',
    brand: 'Heesen',
    series: '50 Steel',
    loa_m: 49.98,
    beam_m: 9.0,
    gt: 499,
    hull: 'Steel',
    superstructure: 'Aluminium',
    range_nm: 3800,
    max_kn: 15.5,
    guests: 12,
    cabins: 6,
    images: [
      'https://images.unsplash.com/photo-1520975922299-48b6b0d0b225?q=80&w=1600&auto=format&fit=crop',
    ],
    layouts: [
      'https://images.unsplash.com/photo-1520974735194-6a46b55395a4?q=80&w=1600&auto=format&fit=crop',
    ],
    pros: ['Proven platform', 'Efficient range', 'Shorter delivery'],
    cons: ['Fixed volume', 'Limited customization vs. full custom'],
  },
  {
    id: 'amels-60',
    brand: 'Amels',
    series: '60',
    loa_m: 60.0,
    beam_m: 10.4,
    gt: 830,
    hull: 'Steel',
    superstructure: 'Aluminium',
    range_nm: 4500,
    max_kn: 15.5,
    guests: 12,
    cabins: 6,
    images: [
      'https://images.unsplash.com/photo-1499117901949-e34ef1b2444a?q=80&w=1600&auto=format&fit=crop',
    ],
    layouts: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600&auto=format&fit=crop',
    ],
    pros: ['Large volume for size', 'Renowned build quality'],
    cons: ['High demand', 'Slot availability'],
  },
  {
    id: 'baglietto-52-tline',
    brand: 'Baglietto',
    series: '52 T-Line',
    loa_m: 52.0,
    beam_m: 9.2,
    gt: 499,
    hull: 'Steel',
    superstructure: 'Aluminium',
    range_nm: 4500,
    max_kn: 16,
    guests: 12,
    cabins: 6,
    images: [
      'https://images.unsplash.com/photo-1520975941111-9b5d6a61c3bd?q=80&w=1600&auto=format&fit=crop',
    ],
    layouts: [
      'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1600&auto=format&fit=crop',
    ],
    pros: ['Italian design', 'Flexible layouts'],
    cons: ['Longer lead times'],
  },
  {
    id: 'riva-50-m',
    brand: 'Riva',
    series: '50 m',
    loa_m: 50.0,
    beam_m: 9.0,
    gt: 499,
    hull: 'Steel',
    superstructure: 'Aluminium',
    range_nm: 4000,
    max_kn: 15,
    guests: 12,
    cabins: 5,
    images: [
      'https://images.unsplash.com/photo-1515165562835-c3b8a4b1a2d4?q=80&w=1600&auto=format&fit=crop',
    ],
    layouts: [
      'https://images.unsplash.com/photo-1555041469-3f24f0c47d49?q=80&w=1600&auto=format&fit=crop',
    ],
    pros: ['Iconic brand appeal'],
    cons: ['Limited availability'],
  },
];

const customData = [
  {
    id: 'lurssen-90m',
    yard: 'Lürssen',
    name: 'Project Atlas (placeholder)',
    loa_m: 90,
    beam_m: 14.8,
    gt: 3000,
    designers: ['Exterior: TBD', 'Interior: TBD'],
    suppliers: ['Engines: MTU (example)', 'Stabilizers: Quantum (example)'],
  },
  {
    id: 'feadship-75m',
    yard: 'Feadship',
    name: 'Project Sapphire (placeholder)',
    loa_m: 75,
    beam_m: 12.5,
    gt: 1800,
    designers: ['Exterior: De Voogt (example)', 'Interior: TBD'],
    suppliers: ['Generators: Kohler (example)'],
  },
  {
    id: 'oceanco-105m',
    yard: 'Oceanco',
    name: 'Project Orion (placeholder)',
    loa_m: 105,
    beam_m: 16,
    gt: 4200,
    designers: ['Exterior: TBD'],
    suppliers: ['Propulsion: ABB (example)'],
  },
];

const i18n = {
  en: {
    appTitle: 'MMG Yachts — Yacht Intelligence',
    tabs: {
      production: 'Production Yachts',
      semi: 'Semi‑Custom / Series Superyachts',
      custom: 'Custom Yachts',
    },
    searchPlaceholder: 'Search brand or model…',
    filters: { minLen: 'Min length (m)', maxLen: 'Max length (m)' },
    compare: 'Compare',
    compareNow: 'Compare Now',
    comparing: 'Comparing',
    clear: 'Clear',
    specs: 'Specifications',
    pros: 'Pros',
    cons: 'Cons',
    layouts: 'Layouts / GA',
    images: 'Images',
    ctaTitle: 'Interested in this yacht?',
    ctaBody: 'Ask us for availability, pricing, delivery slots, and the best alternatives.',
    contactUs: 'Contact Us',
    phone: 'Call',
    email: 'Email',
    visitMain: 'Visit our main database',
    customIntro:
      'For full custom yachts (50m+), the process is complex and highly rewarding. Our team navigates you through yard selection, designers, specs, and negotiation.',
    language: 'Language',
  },
  es: {
    appTitle: 'MMG Yachts — Inteligencia Náutica',
    tabs: {
      production: 'Yates de Producción',
      semi: 'Semi‑Custom / Superyates de Serie',
      custom: 'Yates a Medida',
    },
    searchPlaceholder: 'Busca marca o modelo…',
    filters: { minLen: 'Eslora mínima (m)', maxLen: 'Eslora máxima (m)' },
    compare: 'Comparar',
    compareNow: 'Comparar ahora',
    comparing: 'Comparando',
    clear: 'Limpiar',
    specs: 'Especificaciones',
    pros: 'Pros',
    cons: 'Contras',
    layouts: 'Planos / GA',
    images: 'Imágenes',
    ctaTitle: '¿Interesado en este yate?',
    ctaBody: 'Consúltanos por disponibilidad, precio, fechas de entrega y alternativas.',
    contactUs: 'Contáctanos',
    phone: 'Llamar',
    email: 'Email',
    visitMain: 'Visitar nuestra base principal',
    customIntro:
      'Para yates totalmente a medida (50m+), el proceso es complejo y muy gratificante. Te guiamos en la selección del astillero, diseñadores, especificaciones y negociación.',
    language: 'Idioma',
  },
} as const;

function meters(n?: number) {
  if (n == null) return '–';
  return `${n.toFixed(2)} m`;
}
function knots(n?: number) {
  if (n == null) return '–';
  return `${n} kn`;
}
function nm(n?: number) {
  if (n == null) return '–';
  return `${n.toLocaleString()} nm`;
}

function YachtCard({ item, lang, onToggleCompare, isCompared }: any) {
  const t = i18n[lang];
  const title = item.model ? `${item.brand} ${item.model}` : `${item.brand ?? item.yard} ${item.series ?? item.name ?? ''}`;
  const img = item.images?.[0];
  return (
    <div className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {img && (
        <div className="relative aspect-[16/9] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt={title} className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <button
            onClick={() => onToggleCompare(item)}
            className={`text-sm rounded-full px-3 py-1 border transition ${
              isCompared ? 'bg-black text-white border-black' : 'border-neutral-300 hover:bg-neutral-50'
            }`}
            aria-label={t.compare}
          >
            {isCompared ? t.comparing : t.compare}
          </button>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {item.loa_m && (<><dt className="text-neutral-500">LOA</dt><dd className="font-medium">{meters(item.loa_m)}</dd></>)}
          {item.beam_m && (<><dt className="text-neutral-500">Beam</dt><dd className="font-medium">{meters(item.beam_m)}</dd></>)}
          {item.draft_m && (<><dt className="text-neutral-500">Draft</dt><dd className="font-medium">{meters(item.draft_m)}</dd></>)}
          {item.max_kn && (<><dt className="text-neutral-500">Max</dt><dd className="font-medium">{knots(item.max_kn)}</dd></>)}
          {item.range_nm && (<><dt className="text-neutral-500">Range</dt><dd className="font-medium">{nm(item.range_nm)}</dd></>)}
        </dl>
      </div>
    </div>
  );
}

function CompareDrawer({ items, lang, onClear }: any) {
  const t = i18n[lang];
  if (!items.length) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 z-30">
      <div className="mx-auto max-w-6xl rounded-2xl border bg-white/90 dark:bg-neutral-900/90 backdrop-blur border-neutral-200 dark:border-neutral-800 shadow-xl p-4 flex flex-col md:flex-row items-center gap-3">
        <div className="text-sm text-neutral-600 dark:text-neutral-300">
          {items.length} / 4 — {t.comparing}
        </div>
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-2">
            {items.map((it: any) => (
              <span key={it.id} className="text-xs rounded-full border border-neutral-300 px-3 py-1 whitespace-nowrap">
                {it.brand ?? it.yard} {it.model || it.series || it.name}
              </span>
            ))}
          </div>
        </div>
        <a href="#comparison" className="rounded-full px-4 py-2 text-sm font-semibold bg-black text-white hover:opacity-90">
          {t.compareNow}
        </a>
        <button onClick={onClear} className="text-sm underline opacity-70 hover:opacity-100">
          {t.clear}
        </button>
      </div>
    </div>
  );
}

function ComparisonTable({ items, lang }: any) {
  const t = i18n[lang];
  if (!items.length) return null;
  const columns = [
    { key: 'title', label: 'Model' },
    { key: 'loa_m', label: 'LOA' },
    { key: 'beam_m', label: 'Beam' },
    { key: 'draft_m', label: 'Draft' },
    { key: 'guests', label: 'Guests' },
    { key: 'cabins', label: 'Cabins' },
    { key: 'crew', label: 'Crew' },
    { key: 'max_kn', label: 'Max' },
    { key: 'cruise_kn', label: 'Cruise' },
    { key: 'range_nm', label: 'Range' },
    { key: 'units_built', label: 'Units' },
  ];
  return (
    <section id="comparison" className="mt-10">
      <h3 className="text-xl font-semibold mb-4">{t.compare}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky left-0 bg-white dark:bg-neutral-900 text-left p-3 border-b">Spec</th>
              {items.map((it: any) => (
                <th key={it.id} className="p-3 text-left border-b min-w-[200px] align-bottom">
                  <div className="font-semibold">{(it.brand ?? it.yard)} {it.model || it.series || it.name}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {columns.map((c) => (
              <tr key={c.key} className="odd:bg-neutral-50/60 dark:odd:bg-neutral-800/30">
                <th className="sticky left-0 bg-inherit text-left p-3 font-medium">{c.label}</th>
                {items.map((it: any) => {
                  const value = (() => {
                    if (c.key === 'title') return `${(it.brand ?? it.yard) ?? ''} ${it.model || it.series || it.name || ''}`;
                    if (c.key === 'loa_m') return meters(it.loa_m);
                    if (c.key === 'beam_m') return meters(it.beam_m);
                    if (c.key === 'draft_m') return meters(it.draft_m);
                    if (c.key === 'max_kn') return knots(it.max_kn);
                    if (c.key === 'cruise_kn') return knots(it.cruise_kn);
                    if (c.key === 'range_nm') return nm(it.range_nm);
                    return it[c.key] ?? '–';
                  })();
                  return <td key={it.id + String(c.key)} className="p-3">{value}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function Page() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [tab, setTab] = useState<'production' | 'semi' | 'custom'>('production');
  const [query, setQuery] = useState('');
  const [minLen, setMinLen] = useState<string>('');
  const [maxLen, setMaxLen] = useState<string>('');
  const [compare, setCompare] = useState<any[]>([]);

  const t = i18n[lang];

  const dataset = useMemo(() => {
    if (tab === 'production') return productionData;
    if (tab === 'semi') return semiCustomData;
    return customData;
  }, [tab]);

  const filtered = useMemo(() => {
    let rows = dataset;
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((r: any) =>
        `${r.brand ?? r.yard} ${r.model ?? r.series ?? r.name ?? ''}`.toLowerCase().includes(q)
      );
    }
    const min = parseFloat(minLen);
    const max = parseFloat(maxLen);
    if (!Number.isNaN(min)) rows = rows.filter((r: any) => !r.loa_m || r.loa_m >= min);
    if (!Number.isNaN(max)) rows = rows.filter((r: any) => !r.loa_m || r.loa_m <= max);
    return rows;
  }, [dataset, query, minLen, maxLen]);

  const toggleCompare = (item: any) => {
    setCompare((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) return prev.filter((p) => p.id !== item.id);
      if (prev.length >= 4) return prev;
      return [...prev, item];
    });
  };

  const clearCompare = () => setCompare([]);

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/70 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-4">
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">{t.appTitle}</h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">Search · Compare · Inquire</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="opacity-70">{t.language}:</span>
            <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full border ${lang === 'en' ? 'bg-black text-white border-black' : 'border-neutral-300'}`}>EN</button>
            <button onClick={() => setLang('es')} className={`px-3 py-1 rounded-full border ${lang === 'es' ? 'bg-black text-white border-black' : 'border-neutral-300'}`}>ES</button>
          </div>
        </div>
        <nav className="mx-auto max-w-6xl px-4 pb-3">
          <div className="inline-flex rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 p-1">
            {[
              { id: 'production', label: t.tabs.production },
              { id: 'semi', label: t.tabs.semi },
              { id: 'custom', label: t.tabs.custom },
            ].map((tb) => (
              <button key={tb.id} onClick={() => setTab(tb.id as any)}
                className={`px-4 py-2 rounded-xl text-sm md:text-base transition ${tab === tb.id ? 'bg-white dark:bg-neutral-800 shadow' : 'hover:bg-white/70 dark:hover:bg-neutral-800/70'}`}>
                {tb.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <input type="search" placeholder={t.searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 outline-none focus:ring-2 focus:ring-black/10" />
          <input type="number" inputMode="decimal" min="0" step="0.1" placeholder={t.filters.minLen} value={minLen} onChange={(e) => setMinLen(e.target.value)} className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3" />
          <input type="number" inputMode="decimal" min="0" step="0.1" placeholder={t.filters.maxLen} value={maxLen} onChange={(e) => setMaxLen(e.target.value)} className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3" />
          <div className="flex items-center gap-2">
            <a href="#comparison" className="w-full rounded-xl border px-4 py-3 text-center hover:bg-neutral-100 dark:hover:bg-neutral-800">{t.compareNow}</a>
            <button onClick={clearCompare} className="rounded-xl border px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800">{t.clear}</button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item: any) => (
            <YachtCard key={item.id} item={item} lang={lang} onToggleCompare={toggleCompare} isCompared={!!compare.find((c) => c.id === item.id)} />
          ))}
          {!filtered.length && (<div className="col-span-full text-center text-neutral-500 py-20">No results.</div>)}
        </div>

        <ComparisonTable items={compare} lang={lang} />

        <section className="mt-16 border-t pt-8">
          <h3 className="text-xl font-semibold">{t.ctaTitle}</h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-3xl">{t.ctaBody}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a href="tel:+1-000-000-0000" className="rounded-full border px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">{t.phone}: +1 (000) 000‑0000</a>
            <a href="mailto:info@mmgyachts.com" className="rounded-full border px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">{t.email}: info@mmgyachts.com</a>
            <a href="https://www.mmgyachts.com" target="_blank" rel="noreferrer" className="rounded-full border px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">{t.visitMain}</a>
          </div>
        </section>
      </section>

      <CompareDrawer items={compare} lang={lang} onClear={clearCompare} />

      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 mt-10">
        <div className="mx-auto max-w-6xl px-4 text-sm text-neutral-500">
          © {new Date().getFullYear()} MMG Yachts · All rights reserved.
        </div>
      </footer>
    </main>
  );
}
