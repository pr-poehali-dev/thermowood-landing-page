import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const navLinks = [
  { label: 'Главная', href: '#hero' },
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Технология', href: '#technology' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Цены', href: '#prices' },
  { label: 'Контакты', href: '#contacts' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-blur border-b border-white/5' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 fire-gradient rounded-sm flex items-center justify-center">
            <span className="text-black font-display font-bold text-sm">Т</span>
          </div>
          <span className="font-display text-xl font-semibold tracking-wider text-foreground">
            ТЕРМО<span className="text-fire">ДРЕВО</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLink(link.href)}
              className="font-body text-sm text-muted-foreground hover:text-fire transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleLink('#contacts')}
          className="hidden md:block px-5 py-2 fire-gradient text-black font-display text-sm font-semibold tracking-wider rounded hover:opacity-90 transition-opacity"
        >
          ПОЛУЧИТЬ ПРАЙС
        </button>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Icon name={mobileOpen ? 'X' : 'Menu'} size={24} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden navbar-blur border-t border-white/5 px-6 py-4 flex flex-col gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleLink(link.href)}
              className="text-left font-body text-base text-muted-foreground hover:text-fire transition-colors py-2 border-b border-white/5"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleLink('#contacts')}
            className="mt-2 px-5 py-3 fire-gradient text-black font-display text-sm font-semibold tracking-wider rounded"
          >
            ПОЛУЧИТЬ ПРАЙС
          </button>
        </div>
      )}
    </nav>
  );
}
