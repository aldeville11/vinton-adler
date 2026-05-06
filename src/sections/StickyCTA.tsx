import { useEffect, useState } from 'react';

interface StickyCTAProps {
  onBookCall: () => void;
}

export default function StickyCTA({ onBookCall }: StickyCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroBottom = document.getElementById('hero')?.getBoundingClientRect().bottom || 0;
      const footerTop = document.getElementById('footer')?.getBoundingClientRect().top || window.innerHeight;
      setVisible(heroBottom < 0 && footerTop > window.innerHeight + 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-[#262626] transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium text-[#F5F0E8]">Revenue Leak Diagnostic</span>
        <button
          onClick={onBookCall}
          className="text-sm font-semibold bg-primary text-background px-5 py-2 rounded-md hover:bg-[#D4B978] transition-all duration-200"
        >
          Run My Revenue Diagnostic
        </button>
      </div>
    </div>
  );
}
