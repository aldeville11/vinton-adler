import { Link } from 'react-router';

interface FooterProps {
  onBookCall?: () => void;
}

export default function Footer({ onBookCall }: FooterProps) {
  const scrollTo = (href: string) => {
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
    <footer id="footer" className="bg-card border-t border-[#262626]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p className="text-base font-semibold text-[#F5F0E8]">Vinton Adler & Co.</p>
            <p className="text-sm text-[#A8A29E] mt-3 leading-relaxed">
              Most businesses are not losing leads. They are losing the income those leads should have become.
            </p>
            <p className="text-sm text-[#A8A29E] mt-2 leading-relaxed">
              If your intake is active but your schedule is not filling, there is a gap in how your infrastructure captures, responds, and converts demand.
            </p>
            <button
              onClick={onBookCall}
              className="mt-6 text-sm font-semibold bg-primary text-background px-6 py-2.5 rounded-md hover:bg-[#D4B978] hover:shadow-[0_0_30px_rgba(201,169,98,0.25)] transition-all duration-200"
            >
              Run My Revenue Diagnostic
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#6B6560] mb-4">Quick Links</p>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollTo('#offers')}
                  className="text-sm text-[#A8A29E] hover:text-[#F5F0E8] transition-colors duration-200"
                >
                  Offers
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#how-it-works')}
                  className="text-sm text-[#A8A29E] hover:text-[#F5F0E8] transition-colors duration-200"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#who-we-work-with')}
                  className="text-sm text-[#A8A29E] hover:text-[#F5F0E8] transition-colors duration-200"
                >
                  Who We Work With
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#questions')}
                  className="text-sm text-[#A8A29E] hover:text-[#F5F0E8] transition-colors duration-200"
                >
                  Questions
                </button>
              </li>
              <li>
                <button
                  onClick={onBookCall}
                  className="text-sm text-[#A8A29E] hover:text-[#F5F0E8] transition-colors duration-200"
                >
                  Book Diagnostic
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#6B6560] mb-4">Contact</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@vintonadler.com"
                  className="text-sm text-[#A8A29E] hover:text-primary transition-colors duration-200"
                >
                  contact@vintonadler.com
                </a>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-[#A8A29E] hover:text-[#F5F0E8] transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-[#A8A29E] hover:text-[#F5F0E8] transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#262626]">
          <p className="text-sm text-[#6B6560] text-center">
            © 2026 Vinton Adler & Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
