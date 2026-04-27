import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];
    const colors = ['#F59E0B', '#D97706', '#92400E', '#FCD34D'];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2,
        size: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.001;

        if (p.y < 0 || p.alpha <= 0) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
          p.alpha = Math.random() * 0.5 + 0.1;
        }
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-screen background image */}
      <div className="absolute inset-0">
        <img
          src="https://cdn.poehali.dev/projects/55094b77-cc92-4972-838f-6f5eb56fa658/files/ee9b7876-4999-492a-9159-ee7b020b8ae0.jpg"
          alt="Фасад дома из термодревесины"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(105deg, rgba(10,7,4,0.92) 0%, rgba(10,7,4,0.75) 45%, rgba(10,7,4,0.35) 100%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(10,7,4,0.7) 0%, transparent 40%)'
        }} />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      <div className="absolute inset-0 z-10 opacity-8"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(245,158,11,0.04) 60px, rgba(245,158,11,0.04) 61px)`,
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 mb-6 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-body text-sm text-amber-300 tracking-widest uppercase">Натуральный материал XXI века</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-none tracking-wide mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}>
            ТЕПЛО<br />
            <span className="text-fire">ПРИРОДЫ.</span><br />
            СИЛА<br />
            <span className="text-fire">ТЕХНОЛОГИЙ.</span>
          </h1>

          <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10 max-w-md animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}>
            Термодревесина — дерево, прошедшее термическую обработку при температуре 180–230°C.
            Долговечность 50+ лет, стойкость к влаге, грибку и гниению.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => scrollToSection('#gallery')}
              className="px-8 py-4 fire-gradient text-black font-display text-base font-semibold tracking-wider rounded hover:opacity-90 transition-all duration-200 animate-pulse-glow"
            >
              СМОТРЕТЬ ГАЛЕРЕЮ
            </button>
            <button
              onClick={() => scrollToSection('#contacts')}
              className="px-8 py-4 border border-amber-500/40 text-amber-300 font-display text-base font-semibold tracking-wider rounded hover:bg-amber-500/10 transition-all duration-200"
            >
              ПОЛУЧИТЬ ПРАЙС
            </button>
          </div>

          <div className="flex gap-10 mt-14 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {[
              { num: '50+', label: 'лет срок службы' },
              { num: '200°C', label: 'температура обработки' },
              { num: '100%', label: 'натуральный продукт' },
            ].map((s) => (
              <div key={s.num}>
                <div className="font-display text-3xl font-bold text-fire">{s.num}</div>
                <div className="font-body text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative animate-float">
            {/* Main terrace image */}
            <div className="rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl"
              style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(245,158,11,0.08)' }}>
              <img
                src="https://cdn.poehali.dev/projects/55094b77-cc92-4972-838f-6f5eb56fa658/files/eae72ef7-698e-4525-8805-9eefc6c8be67.jpg"
                alt="Терраса из термодревесины"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <div className="font-body text-xs text-amber-300/80 tracking-widest uppercase">Реализованный проект</div>
                  <div className="font-display text-base font-semibold">Терраса 180 м² · Подмосковье</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                  <span className="text-amber-400 text-xs font-display font-bold">→</span>
                </div>
              </div>
            </div>

            {/* Factory badge */}
            <div className="absolute -bottom-5 -left-6 w-44 rounded-xl overflow-hidden border-2 border-amber-500/30 shadow-xl">
              <img
                src="https://cdn.poehali.dev/projects/55094b77-cc92-4972-838f-6f5eb56fa658/files/7f722eeb-0951-4147-aeb7-4241408299c7.jpg"
                alt="Производство термодревесины"
                className="w-full h-28 object-cover"
              />
              <div className="bg-black/80 px-3 py-2">
                <div className="font-body text-xs text-amber-400/80 tracking-wider">Наше производство</div>
              </div>
            </div>

            {/* Facade small */}
            <div className="absolute -top-5 -right-5 w-36 rounded-xl overflow-hidden border-2 border-amber-500/30 shadow-xl">
              <img
                src="https://cdn.poehali.dev/projects/55094b77-cc92-4972-838f-6f5eb56fa658/files/2d6d86e2-512f-4cb6-aff8-da2de5c2663e.jpg"
                alt="Фасад из термодревесины"
                className="w-full h-28 object-cover"
              />
              <div className="bg-black/80 px-3 py-2">
                <div className="font-body text-xs text-amber-400/80 tracking-wider">Фасады</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <Icon name="ChevronDown" size={28} className="text-amber-500/60" />
      </div>
    </section>
  );
}