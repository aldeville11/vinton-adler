import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router';

interface NavigationProps {
  onBookCall: () => void;
}

export default function Navigation({ onBookCall }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    }
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0A0A]/92 backdrop-blur-xl border-b border-[#1C1C1C]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="text-base font-semibold text-[#F5F0E8]">
            Vinton Adler & Co.
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('#offers')} className="text-sm font-medium text-[#A8A29E] hover:text-[#F5F0E8] transition-colors duration-200">
              Offers
            </button>
            <button onClick={() => scrollTo('#how-it-works')} className="text-sm font-medium text-[#A8A29E] hover:text-[#F5F0E8] transition-colors duration-200">
              How It Works
            </button>
            <button onClick={() => scrollTo('#who-we-work-with')} className="text-sm font-medium text-[#A8A29E] hover:text-[#F5F0E8] transition-colors duration-200">
              Who We Work With
            </button>
            <button onClick={() => scrollTo('#questions')} className="text-sm font-medium text-[#A8A29E] hover:text-[#F5F0E8] transition-colors duration-200">
              Questions
            </button>
            <button onClick={() => scrollTo('#contact')} className="text-sm font-medium text-[#A8A29E] hover:text-[#F5F0E8] transition-colors duration-200">
              Book Diagnostic
            </button>
            <button
              onClick={onBookCall}
              className="text-sm font-semibold bg-primary text-background px-6 py-2.5 rounded-md hover:bg-[#D4B978] hover:shadow-[0_0_30px_rgba(201,169,98,0.25)] transition-all duration-200"
            >
              Run My Revenue Diagnostic
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-[#F5F0E8]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
          <button onClick={() => scrollTo('#offers')} className="text-xl font-medium text-[#A8A29E] hover:text-[#F5F0E8] transition-colors">Offers</button>
          <button onClick={() => scrollTo('#how-it-works')} className="text-xl font-medium text-[#A8A29E] hover:text-[#F5F0E8] transition-colors">How It Works</button>
          <button onClick={() => scrollTo('#who-we-work-with')} className="text-xl font-medium text-[#A8A29E] hover:text-[#F5F0E8] transition-colors">Who We Work With</button>
          <button onClick={() => scrollTo('#questions')} className="text-xl font-medium text-[#A8A29E] hover:text-[#F5F0E8] transition-colors">Questions</button>
          <button onClick={() => scrollTo('#contact')} className="text-xl font-medium text-[#A8A29E] hover:text-[#F5F0E8] transition-colors">Book Diagnostic</button>
          <button onClick={onBookCall} className="text-base font-semibold bg-primary text-background px-8 py-3 rounded-md">
            Run My Revenue Diagnostic
          </button>
        </div>
      )}
    </>
  );
}
