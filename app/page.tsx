'use client';
import React, { useMemo, useState } from 'react';

type Yacht = {
  id: string;
  brand?: string;
  yard?: string;
  model?: string;
  series?: string;
  name?: string;
  type?: string;
  loa_m?: number;
  beam_m?: number;
  draft_m?: number;
  guests?: number;
  cabins?: number;
  crew?: number;
  cruise_kn?: number;
  max_kn?: number;
  range_nm?: number;
  year_from?: number;
  units_built?: string;
  images?: string[];
  layouts?: string[];
  pros?: string[];
  cons?: string[];
  gt?: number;
  hull?: string;
  superstructure?: string;
  designers?: string[];
  suppliers?: string[];
};

const productionData: Yacht[] = [
  { id: 'azimut-78-fly', brand: 'Azimut', model: '78 Fly', type: 'Flybridge', loa_m: 23.77, beam_m: 5.75, draft_m: 1.77, guests: 8, cabins: 4, crew: 2, cruise_kn: 26, max_kn: 31, range_nm: 340, year_from: 2019, units_built: '~', images: ['https://images.unsplash.com/photo-1505150892987-424388e07288?q=80&w=1600&auto=format&fit=crop'] },
  { id: 'princess-y85', brand: 'Princess', model: 'Y85', type: 'Flybridge', loa_m: 26.2, beam_m: 6.3, draft_m: 1.77, guests: 8, cabins: 4, crew: 3, cruise_kn: 24, max_kn: 33, range_nm: 300, year_from: 2019, units_built: '~', images: ['https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop'] },
  { id: 'sunseeker-76-yacht', brand: 'Sunseeker', model: '76 Yacht', type: 'Flybridge', loa_m: 23.6, beam_m: 5.95, draft_m: 1.7, guests: 8, cabins: 4, crew: 2, cruise_kn: 25, max_kn: 32, range_nm: 330, year_from: 2018, units_built: '~', images: ['https://images.unsplash.com/photo-1501621667575-af81f1f0bacc?q=80&w=1600&auto=format&fit=crop'] },
];

const semiCustomData: Yacht[] = [
  { id: 'heesen-50-steel', brand: 'Heesen', series: '50 Steel', loa_m: 49.98, beam_m: 9.0, gt: 499, hull: 'Steel', superstructure: 'Aluminium', range_nm: 3800, max_kn: 15.5, guests: 12, cabins: 6, images: ['https://images.unsplash.com/photo-1520975922299-48b6b0d0b225?q=80&w=1600&auto=format&fit=crop'], pros: ['Proven platform', 'Efficient range', 'Shorter delivery'], cons: ['Fixed volume', 'Limited customization vs. full custom'] },
  { id: 'amels-60', brand: 'Amels', series: '60', loa_m: 60.0, beam_m: 10.4, gt: 830, hull: 'Steel', superstructure: 'Aluminium', range_nm: 4500, max_kn: 15.5, guests: 12, cabins: 6, images: ['https://images.unsplash.com/photo-1499117901949-e34ef1b2444a?q=80&w=1600&auto=format&fit=crop'], pros: ['Large volume for size', 'Renowned build quality'], cons: ['High demand', 'Slot availability'] },
  { id: 'baglietto-52-tline', brand: 'Baglietto', series: '52 T-Line', loa_m: 52.0, beam_m: 9.2, gt: 499, hull: 'Steel', superstructure: 'Aluminium', range_nm: 4500, max_kn: 16, guests: 12, cabins: 6, images: ['https://images.unsplash.com/photo-1520975941111-9b5d6a61c3bd?q=80&w=1600&auto=format&fit=crop'], pros: ['Italian design', 'Flexible layouts'], cons: ['Longer lead times'] },
  { id: 'riva-50-m', brand: 'Riva', series: '50 m', loa_m: 50.0, beam_m: 9.0, gt: 499, hull: 'Steel', superstructure: 'Aluminium', range_nm: 4000, max_kn: 15, guests: 12, cabins: 5, images: ['https://images.unsplash.com/photo-1515165562835-c3b8a4b1a2d4?q=80&w=1600&auto=format&fit=crop'], pros: ['Iconic brand appeal'], cons: ['Limited availability'] },
];

const customData: Yacht[] = [
  { id: 'lurssen-90m', yard: 'Lürssen', name: 'Project Atlas (placeholder)', loa_m: 90, beam_m: 14.8, gt: 3000, designers: ['Exterior: TBD', 'Interior: TBD'], suppliers: ['Engines: MTU (example)', 'Stabilizers: Quantum (example)'] },
  { id: 'feadship-75m', yard: 'Feadship', name: 'Project Sapphire (placeholder)', loa_m: 75, beam_m: 12.5, gt: 1800, designers: ['Exterior: De Voogt (example)', 'Interior: TBD'], suppliers: ['Generators: Kohler (example)'] },
  { id: 'oceanco-105m', yard: 'Oceanco', name: 'Project Orion (placeholder)', loa_m: 105, beam_m: 16, gt: 4200, designers: ['Exterior: TBD'], suppliers: ['Propulsion: ABB (example)'] },
];

const i18n = {
  en: {
    appTitle: 'MMG Yachts — Yacht Intelligence',
    tabs: { production: 'Production Yachts', semi: 'Semi-Custom / Series Superyachts', custom: 'Custom Yachts' },
    searchPlaceholder: 'Search brand or model…',
    filters: { minLen: 'Min length (m)', maxLen: 'Max length (m)', brand: 'Brand' },
    compare: 'Compare', compareNow: 'Compare Now', comparing: 'Comparing', clear: 'Clear',
    ctaTitle: 'Interested in this yacht?', ctaBody: 'Ask us for availability, pricing, delivery slots, and the best alternatives.',
    phone: 'Call', email: 'Email', visitMain: 'Visit our main database', language: 'Language',
  },
  es: {
    appTitle: 'MMG Yachts — Inteligencia Náutica',
    tabs: { production: 'Yates de Producción', semi: 'Semi-Custom / Superyates de Serie', custom: 'Yates a Medida' },
    searchPlaceholder: 'Busca marca o modelo…',
    filters: { minLen: 'Eslora mínima (m)', maxLen: 'Eslora máxima (m)', brand: 'Marca' },
    compare: 'Comparar', compareNow: 'Comparar ahora', comparing: 'Comparando', clear: 'Limpiar',
    ctaTitle: '¿Interesado en este yate?', ctaBody: 'Consúltanos por disponibilidad, precio, fechas de entrega y alternativas.',
    phone: 'Llamar', email: 'Email', visitMain: 'Visitar nuestra base principal', language: 'Idioma',
  },
} as const;

function meters(n?: number) { return n == null ? '–' : `${n.toFixed(2)} m`; }
function knots(n?: number) { return n == null ? '–' : `${n} kn`; }
function nm(n?: number) { return n == null ? '–' : `${n.toLocaleString()} nm`; }

function Section({ children }: { children: React.ReactNode }) { return <section className="mx-auto max-w-6xl px-4">{children}</section>; }

function Hero({ lang }:{ lang:'en'|'es' }) {
  const t = i18n[lang];
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-25" style={{backgroundImage:"url('https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=2400&auto=format&fit=crop')", backgroundSize:'cover', backgroundPosition:'center'}} />
      <div className="relative">
        <Section>
          <div className="py-12 md:py-16">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-4xl font-semibold text-brand-navy">MMG Yachts — Yacht Intelligence</h1>
                <p className="mt-2 text-neutral-700 max-w-xl">Search, compare, and inquire across production yachts, semi-custom series superyachts, and full custom builds.</p>
              </div>
              <a href="mailto:info@mmgyachts.com" className="btn btn-brand">Contact</a>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Toolbar({ lang, query, setQuery, minLen, setMinLen, maxLen, setMaxLen, brand, setBrand, brands }:
  { lang: 'en' | 'es'; query: string; setQuery: any; minLen: string; setMinLen: any; maxLen: string; setMaxLen: any; brand: string; setBrand: any; brands: string[] }) {
  const t = i18n[lang];
  return (
    <Section>
      <div className="-mt-6 md:-mt-10 bg-white/90 dark:bg-neutral-900/90 backdrop-blur card p-4 md:p-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <input className="input" type="search" placeholder={t.searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} />
          <input className="input" type="number" inputMode="decimal" placeholder={t.filters.minLen} value={minLen} onChange={(e) => setMinLen(e.target.value)} />
          <input className="input" type="number" inputMode="decimal" placeholder={t.filters.maxLen} value={maxLen} onChange={(e) => setMaxLen(e.target.value)} />
          <select className="input" value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">{t.filters.brand}</option>
            {brands.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <div className="flex items-center gap-2">
            <a href="#comparison" className="btn btn-dark w-full text-center">{i18n[lang].compareNow}</a>
          </div>
        </div>
      </div>
    </Section>
  );
}

function YachtCard({ item, onToggleCompare, isCompared }:{ item: Yacht; onToggleCompare: (y: Yacht) => void; isCompared: boolean }) {
  const title = item.model ? `${item.brand} ${item.model}` : `${item.brand ?? item.yard} ${item.series ?? item.name ?? ''}`;
  const img = item.images?.[0];
  return (
    <div className="card overflow-hidden group">
      {img && <img src={img} alt={title} className="h-48 w-full object-cover group-hover:scale-[1.01] transition-transform" />}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <button onClick={() => onToggleCompare(item)} className={`text-sm rounded-full px-3 py-1 border transition ${isCompared ? 'bg-black text-white border-black' : 'border-neutral-300 hover:bg-neutral-50'}`}>
            {isCompared ? 'Comparing' : 'Compare'}
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

function CompareDrawer({ items, onClear }:{ items: Yacht[]; onClear: () => void }) {
  if (!items.length) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 z-30">
      <div className="mx-auto max-w-6xl card p-4 flex flex-col md:flex-row items-center gap-3">
        <div className="text-sm text-neutral-600 dark:text-neutral-300">{items.length} / 4 — Comparing</div>
        <div className="flex-1 overflow-x-auto"><div className="flex gap-2">{items.map((it) => (<span key={it.id} className="badge">{it.brand ?? it.yard} {it.model || it.series || it.name}</span>))}</div></div>
        <a href="#comparison" className="btn btn-dark">Compare Now</a>
        <button onClick={onClear} className="text-sm underline opacity-70 hover:opacity-100">Clear</button>
      </div>
    </div>
  );
}

function ComparisonTable({ items }:{ items: Yacht[] }) {
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
  ] as const;
  return (
    <Section>
      <section id="comparison" className="mt-10">
        <h3 className="text-xl font-semibold">Compare</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 card">
            <thead>
              <tr>
                <th className="sticky left-0 bg-white dark:bg-neutral-900 text-left p-3 border-b">Spec</th>
                {items.map((it) => (<th key={it.id} className="p-3 text-left border-b min-w-[220px] align-bottom"><div className="font-semibold">{(it.brand ?? it.yard)} {it.model || it.series || it.name}</div></th>))}
              </tr>
            </thead>
            <tbody>
              {columns.map((c) => (
                <tr key={c.key} className="odd:bg-neutral-50/60 dark:odd:bg-neutral-800/30">
                  <th className="sticky left-0 bg-inherit text-left p-3 font-medium">{c.label}</th>
                  {items.map((it) => {
                    const value = (() => {
                      if (c.key === 'title') return `${(it.brand ?? it.yard) ?? ''} ${it.model || it.series || it.name || ''}`;
                      if (c.key === 'loa_m') return meters(it.loa_m);
                      if (c.key === 'beam_m') return meters(it.beam_m);
                      if (c.key === 'draft_m') return meters(it.draft_m);
                      if (c.key === 'max_kn') return knots(it.max_kn);
                      if (c.key === 'cruise_kn') return knots(it.cruise_kn);
                      if (c.key === 'range_nm') return nm(it.range_nm);
                      return (it as any)[c.key] ?? '–';
                    })();
                    return <td key={it.id + String(c.key)} className="p-3">{value}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Section>
  );
}

export default function Page() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [tab, setTab] = useState<'production' | 'semi' | 'custom'>('production');
  const [query, setQuery] = useState('');
  const [minLen, setMinLen] = useState<string>('');
  const [maxLen, setMaxLen] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [compare, setCompare] = useState<Yacht[]>([]);

  const t = i18n[lang];

  const dataset = useMemo<Yacht[]>(() => {
    if (tab === 'production') return productionData;
    if (tab === 'semi') return semiCustomData;
    return customData;
  }, [tab]);

  const brands = useMemo(() => {
    const set = new Set<string>();
    dataset.forEach(d => { if (d.brand || d.yard) set.add((d.brand ?? d.yard) as string); });
    return Array.from(set).sort();
  }, [dataset]);

  const filtered = useMemo(() => {
    let rows: Yacht[] = dataset;
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((r: any) => `${r.brand ?? r.yard} ${r.model ?? r.series ?? r.name ?? ''}`.toLowerCase().includes(q));
    }
    if (brand) rows = rows.filter(r => (r.brand ?? r.yard) === brand);
    const min = parseFloat(minLen);
    const max = parseFloat(maxLen);
    if (!Number.isNaN(min)) rows = rows.filter((r) => !r.loa_m || r.loa_m >= min);
    if (!Number.isNaN(max)) rows = rows.filter((r) => !r.loa_m || r.loa_m <= max);
    return rows;
  }, [dataset, query, minLen, maxLen, brand]);

  const toggleCompare = (item: Yacht) => {
    setCompare((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) return prev.filter((p) => p.id !== item.id);
      if (prev.length >= 4) return prev;
      return [...prev, item];
    });
  };
  const clearCompare = () => setCompare([]);

  return (
    <main className="min-h-screen text-neutral-900 dark:text-neutral-50">
      <div className="header text-white">
        <Section>
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://mmgyachts.com/wp-content/uploads/2023/12/thumbnail_256_logo-300x300.webp" alt="MMG Yachts" className="h-8 w-8 rounded-sm" />
              <span className="font-semibold tracking-wide">MMG YACHTS</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <button onClick={() => setLang('en')} className={`btn ${lang==='en'?'btn-brand':'btn-ghost text-white border-white/40'}`}>EN</button>
              <button onClick={() => setLang('es')} className={`btn ${lang==='es'?'btn-brand':'btn-ghost text-white border-white/40'}`}>ES</button>
            </div>
          </div>
        </Section>
      </div>

      <Hero lang={lang} />

      <Section>
        <nav className="mt-6">
          <div className="tabs">
            {[
              { id: 'production', label: t.tabs.production },
              { id: 'semi', label: t.tabs.semi },
              { id: 'custom', label: t.tabs.custom },
            ].map((tb) => (
              <button key={tb.id} onClick={() => setTab(tb.id as any)} className={`tab ${tab===tb.id?'tab-active':'tab-inactive'}`}>
                {tb.label}
              </button>
            ))}
          </div>
        </nav>
      </Section>

      <Toolbar lang={lang} query={query} setQuery={setQuery} minLen={minLen} setMinLen={setMinLen} maxLen={maxLen} setMaxLen={setMaxLen} brand={brand} setBrand={setBrand} brands={brands} />

      <Section>
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <YachtCard key={item.id} item={item} onToggleCompare={toggleCompare} isCompared={!!compare.find((c) => c.id === item.id)} />
          ))}
          {!filtered.length && (<div className="col-span-full text-center text-neutral-500 py-20">No results.</div>)}
        </div>
      </Section>

      <ComparisonTable items={compare} />

      <Section>
        <section className="mt-16 card p-6 md:p-8">
          <h3 className="text-xl font-semibold">{t.ctaTitle}</h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-3xl">{t.ctaBody}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a href="tel:+13057481402" className="btn btn-ghost">Call: +1 (305) 748-1402</a>
            <a href="mailto:info@mmgyachts.com" className="btn btn-ghost">Email: info@mmgyachts.com</a>
            <a href="https://www.mmgyachts.com" target="_blank" rel="noreferrer" className="btn btn-dark">Visit our main database</a>
          </div>
        </section>
      </Section>

      <CompareDrawer items={compare} onClear={clearCompare} />

      <div className="mt-16 footer text-white/80">
        <Section>
          <div className="py-8 text-sm">© {new Date().getFullYear()} MMG Yachts · 3850 Bird Road, Suite 1001E, Coral Gables, FL 33146</div>
        </Section>
      </div>
    </main>
  );
}
