import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

export default function ContactsSection() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contacts" ref={sectionRef} className="py-24 bg-black/20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 section-reveal">
          <span className="font-body text-amber-400 text-sm tracking-widest uppercase mb-3 block">Свяжитесь с нами</span>
          <h2 className="font-display text-5xl md:text-6xl font-bold tracking-wide mb-4">
            НАЧНЁМ <span className="text-fire">ПРОЕКТ?</span>
          </h2>
          <div className="line-accent mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="section-reveal space-y-8">
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Оставьте заявку — наш менеджер свяжется с вами в течение 30 минут в рабочее время
              и поможет подобрать материал для вашего проекта.
            </p>

            {[
              { icon: 'Phone', label: 'Телефон', value: '+7 (800) 000-00-00', sub: 'Бесплатно по России' },
              { icon: 'Mail', label: 'Email', value: 'info@termodrev.ru', sub: 'Ответим в течение часа' },
              { icon: 'MapPin', label: 'Склад', value: 'Москва, ул. Производственная, 12', sub: 'Пн–Пт 9:00–18:00' },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <Icon name={c.icon} size={22} className="text-amber-400" fallback="Info" />
                </div>
                <div>
                  <div className="font-body text-xs text-amber-400/70 tracking-widest uppercase mb-1">{c.label}</div>
                  <div className="font-display text-lg font-semibold">{c.value}</div>
                  <div className="font-body text-sm text-muted-foreground">{c.sub}</div>
                </div>
              </div>
            ))}

            <div className="flex gap-4 pt-4">
              {[
                { icon: 'MessageCircle', label: 'WhatsApp' },
                { icon: 'Send', label: 'Telegram' },
                { icon: 'Phone', label: 'Позвонить' },
              ].map((s) => (
                <button
                  key={s.label}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 hover:border-amber-500/30 text-muted-foreground hover:text-amber-300 transition-all font-body text-sm"
                >
                  <Icon name={s.icon} size={16} fallback="ExternalLink" />
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="section-reveal">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="rounded-2xl border border-white/8 bg-card p-8 space-y-5">
                <h3 className="font-display text-2xl font-semibold tracking-wide mb-6">
                  ОСТАВИТЬ <span className="text-fire">ЗАЯВКУ</span>
                </h3>

                <div>
                  <label className="font-body text-xs text-amber-400/70 tracking-widest uppercase mb-2 block">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Иван Петров"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none font-body text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="font-body text-xs text-amber-400/70 tracking-widest uppercase mb-2 block">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none font-body text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="font-body text-xs text-amber-400/70 tracking-widest uppercase mb-2 block">
                    Расскажите о проекте
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Тип объекта, площадь, требуемый материал..."
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none font-body text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 fire-gradient text-black font-display text-base font-bold tracking-widest rounded-xl hover:opacity-90 transition-opacity"
                >
                  ОТПРАВИТЬ ЗАЯВКУ
                </button>

                <p className="font-body text-xs text-muted-foreground/60 text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            ) : (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-12 text-center animate-scale-in">
                <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
                  <Icon name="CheckCircle" size={40} className="text-amber-400" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">ЗАЯВКА ОТПРАВЛЕНА!</h3>
                <p className="font-body text-muted-foreground">
                  Мы перезвоним вам в ближайшее время. Обычно это занимает не более 30 минут.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
