import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onBookCall: () => void;
}

export default function Hero({ onBookCall }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const elements = contentRef.current.children;
    gsap.set(elements, { opacity: 0, y: 30 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reset',
      },
    });
    tl.to(elements[0], { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      .to(elements[1], { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.25')
      .to(elements[2], { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.35')
      .to(elements[3], { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to(elements[4], { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.25')
      .to(elements[5], { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
      .to(elements[6], { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');
    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(201, 169, 98, 0.06) 0%, transparent 60%), #0A0A0A',
      }}
    >
      <div className="absolute inset-0 opacity-30">
        <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
      </div>
      <div ref={contentRef} className="relative z-10 max-w-[800px] mx-auto px-6 text-center pt-20">
        <p className="text-sm font-medium uppercase tracking-widest text-primary mb-5">
          REVENUE LEAK DIAGNOSTIC
        </p>

        <h1 className="text-[clamp(36px,6vw,72px)] font-bold text-[#F5F0E8] leading-[1.1] tracking-[-0.02em]">
          Most businesses lose 10 to 30 percent of inbound revenue before it becomes a booked job.
        </h1>

        <p className="text-lg md:text-xl text-[#A8A29E] max-w-[680px] mx-auto mt-6 leading-relaxed">
          The loss happens after the inquiry arrives. Missed calls, slow replies, and weak follow-up send ready buyers to competitors who respond faster.
        </p>

        <p className="text-base text-[#6B6560] max-w-[600px] mx-auto mt-4 leading-relaxed">
          We identify exactly where booked revenue is being lost and what to fix first.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 mb-6">
          <button
            onClick={onBookCall}
            className="text-base font-semibold bg-primary text-background px-10 py-4.5 rounded-md hover:bg-[#D4B978] hover:shadow-[0_0_30px_rgba(201,169,98,0.25)] hover:-translate-y-px transition-all duration-200"
          >
            Run My Revenue Diagnostic
          </button>
          <a
            href="#how-it-works"
            className="text-base font-semibold border border-[#262626] text-[#F5F0E8] px-10 py-4.5 rounded-md hover:border-primary hover:text-primary transition-all duration-200"
          >
            See How It Works
          </a>
        </div>

        <p className="text-sm text-[#6B6560] max-w-[640px] mx-auto leading-relaxed mb-8">
          Built for growth-focused real estate teams and service businesses that need faster intake, stronger nurture, and more closed deals.
        </p>

        <ul className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-[#A8A29E]">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            Pinpoint where inquiries are dropping off
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            Find the breakdowns in continuation and conversion
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            Clear plan to fix the highest-impact gaps in 30 to 60 days
          </li>
        </ul>
      </div>
    </section>
  );
}
