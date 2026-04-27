export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 fire-gradient rounded-sm flex items-center justify-center">
            <span className="text-black font-display font-bold text-xs">Т</span>
          </div>
          <span className="font-display text-base font-semibold tracking-wider">
            ТЕРМО<span className="text-fire">ДРЕВО</span>
          </span>
        </div>
        <p className="font-body text-xs text-muted-foreground text-center">
          © 2024 ТермоДрево. Все права защищены. Премиальная термодревесина для фасадов, террас и интерьеров.
        </p>
        <div className="flex gap-6">
          {['Политика', 'Доставка', 'Гарантия'].map((l) => (
            <button key={l} className="font-body text-xs text-muted-foreground hover:text-fire transition-colors">
              {l}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
