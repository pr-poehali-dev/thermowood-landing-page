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
    <section id="hero" className="relative min-h-screen hero-bg flex items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(245,158,11,0.05) 60px, rgba(245,158,11,0.05) 61px)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center">
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
          <div className="relative w-full aspect-square max-w-lg mx-auto animate-float">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/55094b77-cc92-4972-838f-6f5eb56fa658/files/1276de24-228e-4f64-8df9-2d3b5dae28cc.jpg"
                alt="Терраса из термодревесины"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-xl overflow-hidden border-2 border-amber-500/30">
              <img
                src="https://cdn.poehali.dev/projects/55094b77-cc92-4972-838f-6f5eb56fa658/files/1008b696-f170-43dc-976c-637335f043dd.jpg"
                alt="Сауна из термодревесины"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-28 h-28 rounded-xl overflow-hidden border-2 border-amber-500/30">
              <img
                src="https://cdn.poehali.dev/projects/55094b77-cc92-4972-838f-6f5eb56fa658/files/504c1bc6-8ecb-4206-80ad-b149187f2e05.jpg"
                alt="Интерьер из термодревесины"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={28} className="text-amber-500/60" />
      </div>
    </section>
  );
}
