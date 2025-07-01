import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Features from '../components/Features';
import Personas from '../components/Personas';
import UseCases from '../components/UseCases';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="font-sans">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Features />
        <Personas />
        <UseCases />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;