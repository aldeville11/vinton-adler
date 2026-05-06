import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionLabel from '../components/SectionLabel';
import ContactModal from '../components/ContactModal';
import PreQualForm from '../components/PreQualForm';
import ExitIntentModal from '../components/ExitIntentModal';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface ServicesPageProps {
  openPreQual: () => void;
  preQualOpen: boolean;
  closePreQual: () => void;
  onQualified: () => void;
}

const creditRows = [
  {
    standalone: 'AI Voice Agent',
    upgradeTo: 'Accelerator',
    standalonePaid: '$2,200',
    packagePrice: '$9,500',
    youPay: '$7,300',
  },
  {
    standalone: 'GBP Domination',
    upgradeTo: 'Foundation',
    standalonePaid: '$900',
    packagePrice: '$5,500',
    youPay: '$4,600',
  },
  {
    standalone: 'Missed Call Text-Back',
    upgradeTo: 'Foundation',
    standalonePaid: '$500',
    packagePrice: '$5,500',
    youPay: '$5,000',
  },
  {
    standalone: 'Website Conversion Fix',
    upgradeTo: 'Foundation',
    standalonePaid: '$1,700',
    packagePrice: '$5,500',
    youPay: '$3,800',
  },
  {
    standalone: 'AI Voice Agent + GBP',
    upgradeTo: 'Accelerator',
    standalonePaid: '$3,100',
    packagePrice: '$9,500',
    youPay: '$6,400',
  },
  {
    standalone: 'GBP + Missed Call + Follow-Up',
    upgradeTo: 'Foundation',
    standalonePaid: '$2,250',
    packagePrice: '$5,500',
    youPay: '$3,250',
  },
  {
    standalone: 'Full standalone stack',
    upgradeTo: 'Accelerator',
    standalonePaid: '$7,350',
    packagePrice: '$9,500',
    youPay: '$2,150',
  },
];

export default function ServicesPage({ openPreQual, preQualOpen, closePreQual, onQualified }: ServicesPageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      const rows = tableRef.current.querySelectorAll('.credit-row');
      gsap.fromTo(
        rows,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/92 backdrop-blur-xl border-b border-[#1C1C1C]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="text-base font-semibold text-[#F5F0E8]">
            Vinton Adler & Co.
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-[#A8A29E] hover:text-[#F5F0E8] transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <button
              onClick={openPreQual}
              className="text-sm font-semibold bg-primary text-background px-6 py-2.5 rounded-md hover:bg-[#D4B978] hover:shadow-[0_0_30px_rgba(201,169,98,0.25)] transition-all duration-200"
            >
              Run My Revenue Diagnostic
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16 md:h-20" />

      {/* Header */}
      <section className="bg-background">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-8">
          <ScrollReveal className="text-center max-w-[720px] mx-auto">
            <SectionLabel text="STANDALONE SERVICES" />
            <h1 className="text-[clamp(36px,5vw,56px)] font-semibold text-[#F5F0E8] leading-[1.15] tracking-[-0.01em]">
              Individual Systems. Full Credit Toward Your Package.
            </h1>
            <p className="text-lg text-[#A8A29E] mt-6 leading-relaxed">
              Buy any system standalone. When you are ready to upgrade to Foundation or Accelerator, every dollar you paid gets credited. You never pay twice for the same work.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Credit Policy Table */}
      <section className="bg-background pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          <ScrollReveal className="mb-10">
            <h2 className="text-2xl font-semibold text-[#F5F0E8] text-center">
              Credit Policy
            </h2>
            <p className="text-sm text-[#6B6560] text-center mt-2">
              Every standalone purchase counts toward your upgrade. Here is how the math works.
            </p>
          </ScrollReveal>

          {/* Desktop Table */}
          <div ref={tableRef} className="hidden md:block">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 pb-4 border-b border-[#262626]">
              <div className="text-xs font-medium uppercase tracking-wider text-[#6B6560]">Standalone</div>
              <div className="text-xs font-medium uppercase tracking-wider text-[#6B6560]">Upgrade To</div>
              <div className="text-xs font-medium uppercase tracking-wider text-[#6B6560] text-right">Standalone Paid</div>
              <div className="text-xs font-medium uppercase tracking-wider text-[#6B6560] text-right">Package Price</div>
              <div className="text-xs font-medium uppercase tracking-wider text-primary text-right">You Pay</div>
            </div>

            {/* Table Rows */}
            {creditRows.map((row, index) => (
              <div
                key={index}
                className={`credit-row grid grid-cols-5 gap-4 py-5 border-b ${
                  index === creditRows.length - 1 ? 'border-[#404040]' : 'border-[#1C1C1C]'
                }`}
              >
                <div className="text-sm text-[#F5F0E8] font-medium">{row.standalone}</div>
                <div className="text-sm text-[#A8A29E]">{row.upgradeTo}</div>
                <div className="text-sm text-[#A8A29E] text-right">{row.standalonePaid}</div>
                <div className="text-sm text-[#6B6560] text-right line-through">{row.packagePrice}</div>
                <div className="text-sm font-semibold text-primary text-right">{row.youPay}</div>
              </div>
            ))}
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {creditRows.map((row, index) => (
              <div
                key={index}
                className="credit-row bg-card border border-[#262626] rounded-xl p-5 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-[#6B6560] uppercase tracking-wider">Standalone</p>
                    <p className="text-sm text-[#F5F0E8] font-medium mt-0.5">{row.standalone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#6B6560] uppercase tracking-wider">Upgrade To</p>
                    <p className="text-sm text-[#A8A29E] mt-0.5">{row.upgradeTo}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-[#1C1C1C]">
                  <div>
                    <p className="text-xs text-[#6B6560]">Paid: <span className="text-[#A8A29E]">{row.standalonePaid}</span></p>
                    <p className="text-xs text-[#6B6560] line-through">{row.packagePrice}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#6B6560] uppercase tracking-wider">You Pay</p>
                    <p className="text-lg font-semibold text-primary">{row.youPay}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Note */}
          <ScrollReveal className="mt-10 text-center">
            <p className="text-sm text-[#6B6560]">
              The more you build standalone, the less your upgrade costs. Full stack standalone buyers pay only $2,150 to upgrade to Accelerator.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-card border-t border-[#262626]">
        <div className="max-w-[720px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 text-center">
          <ScrollReveal>
            <h2 className="text-[clamp(28px,3vw,40px)] font-semibold text-[#F5F0E8] leading-[1.2]">
              Start with one system. Upgrade when you are ready.
            </h2>
            <p className="text-[#A8A29E] mt-4 leading-relaxed">
              Every standalone purchase is an investment, not an expense. It all counts toward your package.
            </p>
            <button
              onClick={openPreQual}
              className="mt-8 text-sm font-semibold bg-primary text-background px-8 py-3.5 rounded-md hover:bg-[#D4B978] hover:shadow-[0_0_30px_rgba(201,169,98,0.25)] transition-all duration-200"
            >
              Book Your Free Diagnostic
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-[#1C1C1C]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-[#6B6560]">
              &copy; {new Date().getFullYear()} Vinton Adler & Co. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-sm text-[#6B6560] hover:text-[#A8A29E] transition-colors">Home</Link>
              <Link to="/services" className="text-sm text-[#A8A29E]">Services</Link>
              <a href="mailto:contact@vintonadler.com" className="text-sm text-[#6B6560] hover:text-[#A8A29E] transition-colors">contact@vintonadler.com</a>
            </div>
          </div>
        </div>
      </footer>

      <PreQualForm isOpen={preQualOpen} onClose={closePreQual} onQualified={onQualified} />
      <ContactModal isOpen={modalOpen} onClose={closeModal} />
      <ExitIntentModal onBookCall={openPreQual} />
    </>
  );
}
