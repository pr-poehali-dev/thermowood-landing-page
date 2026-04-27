import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const images = [
  {
    src: 'https://cdn.poehali.dev/projects/55094b77-cc92-4972-838f-6f5eb56fa658/files/1276de24-228e-4f64-8df9-2d3b5dae28cc.jpg',
    title: 'Терраса и настил',
    cat: 'Террасы',
  },
  {
    src: 'https://cdn.poehali.dev/projects/55094b77-cc92-4972-838f-6f5eb56fa658/files/504c1bc6-8ecb-4206-80ad-b149187f2e05.jpg',
    title: 'Интерьерные панели',
    cat: 'Интерьер',
  },
  {
    src: 'https://cdn.poehali.dev/projects/55094b77-cc92-4972-838f-6f5eb56fa658/files/2d6d86e2-512f-4cb6-aff8-da2de5c2663e.jpg',
    title: 'Фасадное остекление',
    cat: 'Фасады',
  },
  {
    src: 'https://cdn.poehali.dev/projects/55094b77-cc92-4972-838f-6f5eb56fa658/files/2a17a793-e366-46b0-bf2b-92928553e877.jpg',
    title: 'Садовая мебель',
    cat: 'Мебель',
  },
  {
    src: 'https://cdn.poehali.dev/projects/55094b77-cc92-4972-838f-6f5eb56fa658/files/bea1f31e-0c4d-4a9f-b55d-e3a4c8e7117c.jpg',
    title: 'Производственный цех',
    cat: 'Производство',
  },
  {
    src: 'https://cdn.poehali.dev/projects/55094b77-cc92-4972-838f-6f5eb56fa658/files/1008b696-f170-43dc-976c-637335f043dd.jpg',
    title: 'Сауна и баня',
    cat: 'Сауна',
  },
];

const categories = ['Все', ...Array.from(new Set(images.map((i) => i.cat)))];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'Все' ? images : images.filter((i) => i.cat === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll('.section-reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight' && lightbox !== null) setLightbox((lightbox + 1) % filtered.length);
      if (e.key === 'ArrowLeft' && lightbox !== null) setLightbox((lightbox - 1 + filtered.length) % filtered.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, filtered.length]);

  return (
    <section id="gallery" ref={sectionRef} className="py-24 bg-black/20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 section-reveal">
          <span className="font-body text-amber-400 text-sm tracking-widest uppercase mb-3 block">Наши работы</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold tracking-wide mb-4">
            ГАЛЕРЕЯ <span className="text-fire">ПРОЕКТОВ</span>
          </h2>
          <div className="line-accent mx-auto mt-6" />
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-10 section-reveal">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-body text-sm tracking-wide transition-all duration-200 ${
                activeCategory === cat
                  ? 'fire-gradient text-black font-semibold'
                  : 'border border-white/15 text-muted-foreground hover:border-amber-500/40 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((img, i) => (
            <div
              key={img.src}
              className="section-reveal group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer hover-scale"
              style={{ transitionDelay: `${i * 0.06}s` }}
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="font-body text-xs text-amber-400 tracking-widest uppercase">{img.cat}</span>
                <h4 className="font-display text-lg font-semibold mt-1">{img.title}</h4>
              </div>
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="ZoomIn" size={16} className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
            <Icon name="X" size={32} />
          </button>
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length); }}
          >
            <Icon name="ChevronLeft" size={24} className="text-white" />
          </button>
          <div
            className="max-w-5xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].title}
              className="w-full h-full object-contain rounded-xl animate-scale-in"
            />
            <div className="text-center mt-4">
              <span className="font-body text-amber-400 text-sm tracking-widest uppercase">{filtered[lightbox].cat}</span>
              <p className="font-display text-xl mt-1">{filtered[lightbox].title}</p>
            </div>
          </div>
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length); }}
          >
            <Icon name="ChevronRight" size={24} className="text-white" />
          </button>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
    </section>
  );
}
