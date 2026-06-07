import React from 'react'
import Navbar from './components/Navbar/Navbar'
import HeroSection from './components/HeroSection/HeroSection'
import AboutSection from './components/AboutSection/AboutSection'
import HistorySection from './components/HistorySection/HistorySection'
import SolutionsSection from './components/SolutionsSection/SolutionsSection'
import ElosSpotlight from './components/ElosSpotlight/ElosSpotlight'
import StatsSection from './components/StatsSection/StatsSection'
import BenefitsSection from './components/BenefitsSection/BenefitsSection'
import ClientsSection from './components/ClientsSection/ClientsSection'
import ContactSection from './components/ContactSection/ContactSection'
import Footer from './components/Footer/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SolutionsSection />
        <ElosSpotlight />
        <StatsSection />
        <HistorySection />
        <BenefitsSection />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
