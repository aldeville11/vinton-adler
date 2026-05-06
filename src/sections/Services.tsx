import { Check } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import ScrollReveal from '../components/ScrollReveal';

interface ServicesProps {
  onBookCall: () => void;
}

const installOffers = [
  {
    name: 'Revenue Leak Diagnostic',
    price: 'Complimentary',
    priceNote: '',
    tagline: 'A focused 20-minute strategic review to identify where booked revenue is being lost across your intake, response, and conversion process.',
    features: [
      'Identify breakdowns in intake, response time, and continuation that reduce booked appointments',
      'Pinpoint the highest-impact sources of lost income',
      'Clear recommendation on what to fix first',
    ],
    cta: 'Run My Revenue Diagnostic',
    featured: false,
  },
  {
    name: 'Foundation',
    price: '$5,500',
    priceNote: 'one-time install',
    tagline: 'Fix the income leaks that drain your marketing spend. This infrastructure captures inquiries your business is already generating but currently losing to slow response, unanswered calls, and broken nurture.',
    description: 'Without this layer in place, a percentage of every marketing dollar leaks before it ever reaches your bottom line.',
    features: [
      'Includes:',
      'Capture missed calls before they become lost income',
      'Respond to inbound inquiries within minutes, not hours',
      'Rank where buyers search so you capture ready-to-act demand',
      'Convert more site visitors into qualified appointments',
      'Track sources so you stop funding what does not convert',
    ],
    cta: 'See What You\u2019re Losing',
    featured: false,
  },
  {
    name: 'Accelerator',
    price: '$9,500',
    priceNote: 'one-time install',
    tagline: 'Build the complete income-capture infrastructure. Intake, qualification, nurture, and conversion \u2014 all working together so more of the demand you already produce becomes closed deals.',
    description: 'Most businesses generate demand but lack the infrastructure to convert it consistently. This closes that gap.',
    features: [
      'Includes everything in Foundation, plus:',
      'Qualify and book inquiries automatically around the clock',
      'Nurture every prospect across SMS, email, and voicemail for 90 days',
      'Rebuild your site to convert visitors into booked appointments',
      'Organize every inquiry in a managed pipeline with clear next steps',
      'Optimize performance over 90 days with monthly reporting',
    ],
    cta: 'Build My Revenue System',
    featured: true,
  },
];

const retainerOffer = {
  name: 'Operator',
  price: '$3,000',
  priceNote: 'per month',
  tagline: 'Continuously operate and optimize your revenue infrastructure so it performs at maximum capacity month after month.',
  description:
    'Infrastructure that is not monitored decays. This keeps your system sharp, responsive, and improving over time.',
  features: [
    'Includes:',
    'Monthly strategy session to review performance and prioritize improvements',
    'Active monitoring to catch and fix issues before they cost income',
    'One significant infrastructure enhancement or campaign build each month',
    'Ongoing visibility management so you stay competitive in search',
    'Monthly performance report with clear income-impact indicators',
    'Direct access to your dedicated account lead',
  ],
  resultLine: 'Requires Foundation or Accelerator install.',
  cta: 'Optimize My Revenue System',
};

export default function Services({ onBookCall }: ServicesProps) {
  return (
    <section id="offers" className="bg-background border-t border-[#1C1C1C]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 lg:py-32">
        <ScrollReveal className="text-center max-w-[720px] mx-auto mb-16">
          <SectionLabel text="OFFERS" />
          <h2 className="text-[clamp(32px,4vw,48px)] font-semibold text-[#F5F0E8] leading-[1.2] tracking-[-0.01em]">
            Capture More Revenue From the Demand You Already Have
          </h2>
          <p className="text-base text-[#A8A29E] mt-4 leading-relaxed">
            Our process identifies where income is being lost, installs the infrastructure to fix it, and continues optimizing performance as your business grows.
          </p>
        </ScrollReveal>

        <div className="space-y-8">
          {installOffers.map((offer, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div
                id={offer.name === 'Revenue Leak Diagnostic' ? 'diagnostic' : undefined}
                className={`bg-card border rounded-xl p-8 md:p-10 ${
                  offer.featured ? 'border-primary border-2' : 'border-[#262626]'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="text-2xl font-semibold text-[#F5F0E8]">{offer.name}</h3>
                      <span className={`text-2xl font-bold ${offer.featured ? 'text-primary' : 'text-[#F5F0E8]'}`}>
                        {offer.price}
                      </span>
                      {offer.priceNote && (
                        <span className="text-sm text-[#6B6560]">{offer.priceNote}</span>
                      )}
                    </div>
                    <p className="text-[15px] text-[#A8A29E] mb-2">{offer.tagline}</p>
                    {'description' in offer && offer.description && (
                      <p className="text-[15px] text-[#A8A29E] leading-relaxed mb-5">{offer.description}</p>
                    )}
                    <ul className="space-y-2">
                      {offer.features.map((f, i) => (
                        <li key={i} className={`flex items-start gap-3 text-sm ${
                          f.includes('Includes') ? 'text-[#6B6560] font-medium' : 'text-[#A8A29E]'
                        }`}>
                          {!f.includes('Includes') && <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />}
                          <span className={f.includes('Includes') ? 'ml-7' : ''}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    {/* Monthly management discussed on call */}
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={onBookCall}
                      className={`text-sm font-semibold px-7 py-3 rounded-md transition-all duration-200 whitespace-nowrap ${
                        offer.featured
                          ? 'bg-primary text-background hover:bg-[#D4B978] hover:shadow-[0_0_30px_rgba(201,169,98,0.25)]'
                          : 'border border-[#262626] text-[#F5F0E8] hover:border-primary hover:text-primary'
                      }`}
                    >
                      {offer.cta}
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}

          {/* Operator */}
          <ScrollReveal delay={0.3}>
            <div className="bg-background border border-dashed border-[#404040] rounded-xl p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-2xl font-semibold text-[#F5F0E8]">{retainerOffer.name}</h3>
                    <span className="text-2xl font-bold text-[#F5F0E8]">
                      {retainerOffer.price}
                    </span>
                    <span className="text-sm text-[#6B6560]">{retainerOffer.priceNote}</span>
                  </div>
                  <p className="text-[15px] text-[#A8A29E] mb-2">{retainerOffer.tagline}</p>
                  <p className="text-[15px] text-[#A8A29E] mb-5 leading-relaxed">{retainerOffer.description}</p>
                  <ul className="space-y-2">
                    {retainerOffer.features.map((f, i) => (
                      <li key={i} className={`flex items-start gap-3 text-sm ${
                        f.includes('Includes') ? 'text-[#6B6560] font-medium' : 'text-[#A8A29E]'
                      }`}>
                        {!f.includes('Includes') && <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />}
                        <span className={f.includes('Includes') ? 'ml-7' : ''}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-primary font-medium mt-4">{retainerOffer.resultLine}</p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={onBookCall}
                    className="text-sm font-semibold border border-[#262626] text-[#F5F0E8] px-7 py-3 rounded-md hover:border-primary hover:text-primary transition-all duration-200 whitespace-nowrap"
                  >
                    {retainerOffer.cta}
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="text-center mt-12 space-y-3">
          <p className="text-xs text-[#6B6560]">
            Operator requires a Foundation or Accelerator install.
          </p>
          <p className="text-sm text-primary font-medium">
            Foundation and Accelerator include 30 to 90 days of implementation support. Ongoing optimization is available through Operator but is not required.
          </p>
          <p className="text-sm text-[#6B6560]">
            We limit each market to 2 to 3 clients so we can deliver focused attention and consistent results.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
