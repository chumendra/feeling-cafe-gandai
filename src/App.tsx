/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SignatureSpecials } from './components/SignatureSpecials';
import { CombosSection } from './components/CombosSection';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { VisitingHours } from './components/VisitingHours';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppCartDrawer } from './components/WhatsAppCartDrawer';
import { TableBookingModal } from './components/TableBookingModal';
import { FloatingActionBar } from './components/FloatingActionBar';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FAF7F2] text-[#292524] flex flex-col font-sans selection:bg-[#D97706]/20 selection:text-[#3B2A1F]">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero />
          <AboutSection />
          <SignatureSpecials />
          <CombosSection />
          <MenuSection />
          <GallerySection />
          <ReviewsSection />
          <VisitingHours />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Drawers, Modals & Floating CTA */}
        <WhatsAppCartDrawer />
        <TableBookingModal />
        <FloatingActionBar />
      </div>
    </CartProvider>
  );
}
