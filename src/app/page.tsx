import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[140vh] bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] dark:from-slate-900 dark:to-slate-800 -skew-y-6 transform origin-top-left -z-10"></div>
        
        <Hero />

        <div className="relative z-10 mt-[-10vh]">
          <Services />
        </div>
      </div>

      <div className="bg-[rgba(var(--section-alt-bg))] py-32">
        <Work />
      </div>

      <div className="relative">
        <div className="absolute bottom-0 left-0 w-full h-[140vh] bg-gradient-to-tr from-[#f8fafc] to-[#e2e8f0] dark:from-slate-900 dark:to-slate-800 -skew-y-6 transform origin-bottom-right -z-10"></div>
        
        <div className="relative z-10 mb-[-10vh]">
          <Contact />
        </div>
      </div>
      
      <Footer />
      
      {/* Floating Chat Widget */}
      <ChatWidget />
    </main>
  );
} 