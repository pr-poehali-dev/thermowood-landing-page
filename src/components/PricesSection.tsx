import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const plans = [
  {
    name: 'СТАНДАРТ',
    subtitle: 'Для частного строительства',
    price: 'от 3 200',
    unit: 'руб/м²',
    features: [
      'Термососна / Термолиственница',
      'Класс обработки ThermoS',
      'Толщина 20–45 мм',
      'Влажность ≤ 6%',
      'Доставка от 5 м³',
      'Гарантия 5 лет',
    ],
    cta: 'ЗАКАЗАТЬ',
    featured: false,
  },
  {
    name: 'ПРЕМИУМ',
    subtitle: 'Лучший выбор для фасадов',
    price: 'от 5 800',
    unit: 'руб/м²',
    features: [
      'Термоясень / Термобереза',
      'Класс обработки ThermoD',
      'Толщина 20–70 мм',
      'Влажность ≤ 5%',
      'Бесплатная доставка',
      'Гарантия 10 лет',
      'Персональный менеджер',
    ],
    cta: 'ЗАКАЗАТЬ',
    featured: true,
  },
  {
    name: 'ПРОЕКТ',
    subtitle: 'Для застройщиков и дизайнеров',
    price: 'По запросу',
    unit: 'индивидуально',
    features: [
      'Любая порода под заказ',
      'Эксклюзивные профили',
      'Нестандартные размеры',
      'Объём от 50 м³',
      'Доставка по всей России',
      'Гарантия 15 лет',
      'BIM-модели и спецификации',
    ],
    cta: 'ОБСУДИТЬ',
    featured: false,
  },
];

export default function PricesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const scrollToContacts = () => {
    document.querySelector('#contacts')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="prices" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-4"
        style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 section-reveal">
          <span className="font-body text-amber-400 text-sm tracking-widest uppercase mb-3 block">Стоимость</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold tracking-wide mb-4">
            ЦЕНЫ НА <span className="text-fire">МАТЕРИАЛ</span>
          </h2>
          <div className="line-accent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`section-reveal card-hover rounded-2xl border p-8 relative ${
                plan.featured
                  ? 'price-card-featured border-amber-500/40'
                  : 'border-white/8 bg-card'
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 fire-gradient rounded-full font-display text-xs font-bold text-black tracking-widest uppercase">
                  ПОПУЛЯРНЫЙ
                </div>
              )}

              <div className="mb-6">
                <span className="font-body text-amber-400/70 text-xs tracking-widest uppercase">{plan.subtitle}</span>
                <h3 className="font-display text-2xl font-bold tracking-wider mt-1">{plan.name}</h3>
              </div>

              <div className="mb-8">
                <div className="font-display text-4xl font-bold text-fire">{plan.price}</div>
                <div className="font-body text-sm text-muted-foreground mt-1">{plan.unit}</div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-body text-sm text-foreground/80">
                    <Icon name="Check" size={16} className="text-amber-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContacts}
                className={`w-full py-3.5 rounded-xl font-display text-sm font-semibold tracking-widest transition-all duration-200 ${
                  plan.featured
                    ? 'fire-gradient text-black hover:opacity-90'
                    : 'border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 hover:border-amber-500/60'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-xl border border-amber-500/20 bg-amber-500/5 flex flex-col md:flex-row items-center gap-4 section-reveal">
          <Icon name="Info" size={24} className="text-amber-400 shrink-0" />
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Цены указаны без учёта доставки для партий менее 5 м³. Возможен подбор объёма под ваш проект.
            Скидки от 10% при заказе от 20 м³. Принимаем оплату от юридических лиц по счёту.
          </p>
          <button
            onClick={scrollToContacts}
            className="shrink-0 px-6 py-2.5 fire-gradient text-black font-display text-sm font-semibold tracking-wider rounded-lg hover:opacity-90"
          >
            РАССЧИТАТЬ
          </button>
        </div>
      </div>
    </section>
  );
}