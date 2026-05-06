import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import TheLeak from '../sections/TheLeak';
import Services from '../sections/Services';
import Results from '../sections/Results';
import Clients from '../sections/Clients';
import FAQ from '../sections/FAQ';
import CTA from '../sections/CTA';
import UrgencyStatement from '../sections/UrgencyStatement';
import Footer from '../sections/Footer';
import StickyCTA from '../sections/StickyCTA';
import ContactModal from '../components/ContactModal';
import PreQualForm from '../components/PreQualForm';
import ExitIntentModal from '../components/ExitIntentModal';

interface HomePageProps {
  modalOpen: boolean;
  preQualOpen: boolean;
  openPreQual: () => void;
  closePreQual: () => void;
  closeModal: () => void;
  onQualified: () => void;
}

export default function HomePage({ modalOpen, preQualOpen, openPreQual, closePreQual, closeModal, onQualified }: HomePageProps) {
  return (
    <>
      <Navigation onBookCall={openPreQual} />
      <main>
        <Hero onBookCall={openPreQual} />
        <TheLeak />
        <Services onBookCall={openPreQual} />
        <Results />
        <Clients />
        <FAQ />
        <CTA onBookCall={openPreQual} />
        <UrgencyStatement />
      </main>
      <Footer onBookCall={openPreQual} />
      <StickyCTA onBookCall={openPreQual} />
      <PreQualForm isOpen={preQualOpen} onClose={closePreQual} onQualified={onQualified} />
      <ContactModal isOpen={modalOpen} onClose={closeModal} />
      <ExitIntentModal onBookCall={openPreQual} />
    </>
  );
}
