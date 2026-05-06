import { ChevronDown } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import ScrollReveal from '../components/ScrollReveal';
import { useState } from 'react';

const faqs = [
  {
    q: 'How fast do I see results?',
    a: 'Early improvements typically appear within 30 days. Full implementation is usually complete within 30 to 60 days.',
  },
  {
    q: 'What if I already have a marketing person?',
    a: 'That is often ideal. We work with your existing team to strengthen response speed, continuation, and conversion.',
  },
  {
    q: 'Is there an ongoing monthly option?',
    a: 'Yes. Foundation and Accelerator are one-time installs. Operator is the ongoing tier for businesses that want continued optimization and reporting.',
  },
  {
    q: 'What exactly is a revenue leak?',
    a: 'Any point in your intake process where demand is lost before it becomes a booked appointment.',
  },
  {
    q: 'Do I need to change my current marketing?',
    a: 'Usually not. We improve the systems around your existing marketing so more of it converts.',
  },
  {
    q: 'What happens if I stop working with you?',
    a: 'You keep everything we build. If you end Operator support, the systems remain active but optimization pauses.',
  },
  {
    q: 'How do you measure success?',
    a: 'Response speed, inquiry capture, booked appointments, conversion rate, and income recovered.',
  },
  {
    q: 'What is the typical ROI?',
    a: 'The objective is to recover more income than the investment costs by improving conversion from existing inquiries.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="questions" className="bg-background border-t border-[#1C1C1C]">
      <div className="max-w-[800px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 lg:py-32">
        <ScrollReveal className="text-center mb-12">
          <SectionLabel text="QUESTIONS" />
          <h2 className="text-[clamp(28px,4vw,40px)] font-semibold text-[#F5F0E8] leading-[1.2] tracking-[-0.01em]">
            What most people ask before booking.
          </h2>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={index} delay={index * 0.08}>
                <div className="bg-card border border-[#262626] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[rgba(201,169,98,0.02)] transition-colors"
                  >
                    <span className="text-base font-semibold text-[#F5F0E8]">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary flex-shrink-0 ml-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-200 ${
                      isOpen ? 'max-h-48 pb-5' : 'max-h-0'
                    }`}
                  >
                    <p className="text-[15px] text-[#A8A29E] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
