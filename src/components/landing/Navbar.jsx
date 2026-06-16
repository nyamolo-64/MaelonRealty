import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
{ label: '⬡ Maelon OS™', href: '/maelon-os', highlight: true },
{ label: '✦ Find My Match', href: '/living-match', highlight: true },
{ label: '◈ Intelligence', href: '/intelligence', highlight: true },
{ label: '⬡ Landlord Portal', href: '/landlord', highlight: true },
{ label: '⟳ Virtual Tours', href: '/virtual-tours', highlight: true },
{ label: '$ Budget Planner', href: '/budget-planner', highlight: true },
{ label: '★ Reviews', href: '/reputation', highlight: true },
{ label: 'Student Housing', href: '#student-housing' },
{ label: 'Premium Properties', href: '#premium' },
{ label: 'Roommate Matching', href: '#roommates' },
{ label: 'Neighborhoods', href: '#neighborhoods' },
{ label: 'About', href: '#why-maelon' }];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ?
        'glass-panel-dark shadow-2xl py-3' :
        'bg-transparent py-5'}`
        }>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-brass flex items-center justify-center">
              <span className="text-navy font-heading text-xl font-semibold">M</span>
            </div>
            <span className="font-heading text-2xl font-light text-white tracking-wide">
              Maelon<span className="text-brass">.</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) =>
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
              link.highlight ?
              'px-4 py-1.5 rounded-full bg-brass/20 border border-brass/40 text-brass hover:bg-brass/30' :
              'text-white/70 hover:text-brass'}`
              }>
              
                {link.label}
              </a>
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="#contact" className="text-white/70 hover:text-white text-sm font-medium transition-colors"> Contact

            </a>
            <Button className="bg-brass hover:bg-brass-light text-navy font-semibold px-6 rounded-full">
              Book Consultation
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2">
            
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen &&
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-navy pt-24 px-6">
          
            <div className="flex flex-col gap-6">
              {navLinks.map((link) =>
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/80 hover:text-brass text-xl font-heading font-light tracking-wide transition-colors">
              
                  {link.label}
                </a>
            )}
              <hr className="border-white/10 my-4" />
              <a href="#contact" onClick={() => setMobileOpen(false)} className="text-white/60 text-lg">Contact</a>
              <Button className="bg-brass hover:bg-brass-light text-navy font-semibold py-4 rounded-full mt-4 w-full">
                Book Consultation
              </Button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}