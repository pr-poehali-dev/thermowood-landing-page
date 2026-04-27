import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const advantages = [
  {
    icon: 'Droplets',
    title: 'Влагостойкость',
    desc: 'Поглощение влаги снижено на 50–90% по сравнению с обычной древесиной. Не коробится и не трескается.',
    color: 'from-blue-500/20 to-blue-800/5',
  },
  {
    icon: 'Bug',
    title: 'Биостойкость',
    desc: 'Класс стойкости I–II. Устойчива к грибку, плесени, насекомым-вредителям без химической пропитки.',
    color: 'from-green-500/20 to-green-800/5',
  },
  {
    icon: 'Thermometer',
    title: 'Теплоизоляция',
    desc: 'Теплопроводность снижена на 25–30%. Приятная на ощупь поверхность — не жгёт на солнце.',
    color: 'from-orange-500/20 to-orange-800/5',
  },
  {
    icon: 'Leaf',
    title: 'Экологичность',
    desc: 'Только вода и пар — никакой химии. Сертификат экологической безопасности. Подходит для детских комнат.',
    color: 'from-emerald-500/20 to-emerald-800/5',
  },
  {
    icon: 'Palette',
    title: 'Эстетика',
    desc: 'Равномерный насыщенный цвет по всему сечению. Благородный внешний вид, который сохраняется годами.',
    color: 'from-amber-500/20 to-amber-800/5',
  },
  {
    icon: 'Shield',
    title: 'Долговечность',
    desc: 'Срок службы 50+ лет при минимальном уходе. Гарантия на материал 10 лет от производителя.',
    color: 'from-purple-500/20 to-purple-800/5',
  },
];

export default function AdvantagesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.section-reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="advantages" ref={sectionRef} className="py-24 bg-black/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 section-reveal">
          <span className="font-body text-amber-400 text-sm tracking-widest uppercase mb-3 block">Почему термодревесина</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold tracking-wide mb-4">
            ПРЕВОСХОДИТ <span className="text-fire">ОБЫЧНОЕ</span> ДЕРЕВО
          </h2>
          <div className="line-accent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, i) => (
            <div
              key={adv.title}
              className={`section-reveal card-hover group p-8 rounded-xl border border-white/8 bg-gradient-to-br ${adv.color} backdrop-blur-sm cursor-default`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:bg-amber-500/25 transition-colors">
                <Icon name={adv.icon} size={26} className="text-amber-400" fallback="Star" />
              </div>
              <h3 className="font-display text-xl font-semibold tracking-wide mb-3">{adv.title}</h3>
              <p className="font-body text-muted-foreground leading-relaxed text-sm">{adv.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 section-reveal">
          {[
            { n: '500+', l: 'Реализованных проектов' },
            { n: '12', l: 'Лет на рынке' },
            { n: '98%', l: 'Довольных клиентов' },
            { n: '3', l: 'Склада в России' },
          ].map((s) => (
            <div key={s.n} className="text-center p-6 rounded-xl border border-white/8 bg-white/2">
              <div className="number-big">{s.n}</div>
              <div className="font-body text-sm text-muted-foreground mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
    </section>
  );
}
