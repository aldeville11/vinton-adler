import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

interface CTAProps {
  onBookCall: () => void;
}

export default function CTA({ onBookCall }: CTAProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const elements = sectionRef.current.querySelectorAll('.cta-animate');
    gsap.set(elements, { opacity: 0, y: 30 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
      },
    });
    tl.to(elements[0], { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      .to(elements[1], { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
      .to(elements[2], { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to(elements[3], { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.2')
      .to(elements[4], { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');
    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-background border-t border-[#1C1C1C] relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(201, 169, 98, 0.04) 0%, transparent 70%), #0A0A0A',
      }}
    >
      <div className="max-w-[800px] mx-auto px-6 text-center pt-32 md:pt-40 pb-12">
        <div className="cta-animate">
          <SectionLabel text="BOOK YOUR REVENUE LEAK DIAGNOSTIC" />
        </div>
        <h2 className="cta-animate text-[clamp(32px,5vw,52px)] font-bold text-[#F5F0E8] leading-[1.15] mt-4">
          If your schedule has gaps while your phone keeps ringing, that is where the leak is.
        </h2>
        <p className="cta-animate text-lg text-[#A8A29E] max-w-[600px] mx-auto mt-6 leading-relaxed">
          In this 20 minute session, we map where your pipeline is weakest, what that gap is costing you, and the highest-impact steps to close it.
        </p>
        <button
          onClick={onBookCall}
          className="cta-animate mt-10 mb-3 text-base font-semibold bg-primary text-background px-10 py-4.5 rounded-md hover:bg-[#D4B978] hover:shadow-[0_0_30px_rgba(201,169,98,0.25)] hover:-translate-y-px transition-all duration-200"
        >
          Run My Revenue Diagnostic
        </button>
        <p className="cta-animate text-sm text-[#6B6560] mt-8">
          Takes 2 minutes to book. 20 minutes to uncover the gaps.
        </p>
      </div>
    </section>
  );
}
