import { useEffect, useRef } from 'react';

const steps = [
  {
    num: '01',
    title: 'Отбор сырья',
    desc: 'Отбираем сертифицированную древесину хвойных и лиственных пород. Сушим до влажности 10–12% в камерных сушилках.',
  },
  {
    num: '02',
    title: 'Загрузка в камеру',
    desc: 'Штабель укладывается в герметичную камеру термообработки объёмом до 120 м³. Доступа кислорода нет.',
  },
  {
    num: '03',
    title: 'Нагрев паром',
    desc: 'Температура повышается поэтапно до 180–230°C при насыщенном паре. Процесс длится 24–48 часов.',
  },
  {
    num: '04',
    title: 'Охлаждение',
    desc: 'Контролируемое охлаждение с увлажнением. Снижаем внутренние напряжения для стабильности материала.',
  },
  {
    num: '05',
    title: 'Контроль качества',
    desc: 'Каждая партия проходит испытания: влажность, прочность, цвет. Выдаём паспорт качества на материал.',
  },
];

export default function TechnologySection() {
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
    <section id="technology" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background: factory image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://cdn.poehali.dev/projects/55094b77-cc92-4972-838f-6f5eb56fa658/files/7f722eeb-0951-4147-aeb7-4241408299c7.jpg"
          alt=""
          className="w-full h-full object-cover object-center opacity-10"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, rgba(10,7,4,0.0) 0%, rgba(10,7,4,0.85) 40%, rgba(10,7,4,1) 100%)'
        }} />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-reveal">
              <span className="font-body text-amber-400 text-sm tracking-widest uppercase mb-3 block">Как это делается</span>
              <h2 className="font-display text-5xl md:text-6xl font-bold tracking-wide mb-4">
                ТЕХНОЛОГИЯ<br /><span className="text-fire">ТЕРМО</span>ОБРАБОТКИ
              </h2>
              <div className="line-accent mt-6 mb-8" />
              <p className="font-body text-muted-foreground leading-relaxed text-base mb-8">
                Термообработка — это воздействие высокой температурой и паром на древесину без использования
                каких-либо химических веществ. В результате изменяется молекулярная структура дерева:
                клетки, отвечающие за поглощение влаги, разрушаются.
              </p>
            </div>

            <div className="section-reveal rounded-xl overflow-hidden border border-amber-500/20 relative group">
              <img
                src="https://cdn.poehali.dev/projects/55094b77-cc92-4972-838f-6f5eb56fa658/files/7f722eeb-0951-4147-aeb7-4241408299c7.jpg"
                alt="Деревообрабатывающее производство"
                className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-body text-sm text-amber-300/90">
                  Современное деревообрабатывающее производство — термокамеры объёмом до 120 м³
                </p>
              </div>
            </div>

            <div className="section-reveal grid grid-cols-2 gap-3 mt-4">
              <div className="rounded-xl overflow-hidden border border-amber-500/15 relative group">
                <img
                  src="https://cdn.poehali.dev/projects/55094b77-cc92-4972-838f-6f5eb56fa658/files/bea1f31e-0c4d-4a9f-b55d-e3a4c8e7117c.jpg"
                  alt="Термокамера"
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <span className="font-body text-xs text-amber-300/80">Термокамера 200°C</span>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-amber-500/15 relative group">
                <img
                  src="https://cdn.poehali.dev/projects/55094b77-cc92-4972-838f-6f5eb56fa658/files/eae72ef7-698e-4525-8805-9eefc6c8be67.jpg"
                  alt="Готовая терраса"
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <span className="font-body text-xs text-amber-300/80">Готовая терраса</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="section-reveal flex gap-6 group"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-amber-500/40 bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:border-amber-500 group-hover:bg-amber-500/20 transition-all">
                    <span className="font-display text-sm font-bold text-amber-400">{step.num}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-amber-500/30 to-transparent my-2 min-h-[40px]" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-display text-lg font-semibold tracking-wide mb-2 group-hover:text-fire transition-colors">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}