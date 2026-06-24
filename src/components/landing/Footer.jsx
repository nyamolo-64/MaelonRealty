import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const footerLinks = {
  'Student Living': [
    { label: 'Find Housing', to: '/smart-marketplace' },
    { label: 'Roommate Matching', to: '/roommate-questionnaire' },
    { label: 'Budget Calculator', to: '/budget-planner' },
    { label: 'Campus Intelligence', to: '/campus-intelligence' },
    { label: 'Book a Viewing', to: '/book-viewing' },
  ],
  'Platform': [
    { label: 'Student Dashboard', to: '/dashboard' },
    { label: 'AI Concierge', to: '/ai-concierge' },
    { label: 'Living Match', to: '/living-match' },
    { label: 'Reputation Network', to: '/reputation' },
    { label: 'Tenant Passport', to: '/tenant-passport' },
  ],
  'Landlords': [
    { label: 'List a Property', to: '/landlord' },
    { label: 'Landlord Portal', to: '/landlord' },
    { label: 'Smart Marketplace', to: '/smart-marketplace' },
    { label: 'Book a Consultation', href: 'https://wa.me/254714462319' },
  ],
  'Support': [
    { label: 'Contact Us', to: '/#contact' },
    { label: 'WhatsApp Us', href: 'https://wa.me/254714462319' },
    { label: 'Email Us', href: 'mailto:maelonrealty@gmail.com' },
  ],
};

export default function Footer() {
  const handleSubscribe = () => {
    window.open('https://wa.me/254714462319?text=Hi! I want to subscribe to Maelon Realty updates.', '_blank');
  };

  return (
    <footer className="bg-navy relative overflow-hidden pt-20 pb-8">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 font-heading text-[180px] sm:text-[300px] lg:text-[400px] font-bold text-white/[0.015] select-none pointer-events-none whitespace-nowrap tracking-wider">
        MAELON
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-2xl p-8 sm:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div>
            <h3 className="font-heading text-3xl font-light text-white">
              Stay ahead of the <span className="italic text-brass">market</span>
            </h3>
            <p className="text-white/50 mt-2 max-w-md">
              Get weekly insights on Nairobi's student housing market, new listings, and exclusive deals.
            </p>
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <Input
              placeholder="Your email address"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-full h-12 min-w-[240px]"
            />
            <Button
              onClick={handleSubscribe}
              className="bg-brass hover:bg-brass-light text-navy font-semibold px-6 rounded-full h-12 flex-shrink-0"
            >
              Subscribe
            </Button>
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-brass font-semibold text-sm tracking-wider uppercase mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-white text-sm transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-white/40 hover:text-white text-sm transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brass flex items-center justify-center">
              <span className="text-navy font-heading text-lg font-semibold">M</span>
            </div>
            <span className="font-heading text-xl text-white/80">
              Maelon<span className="text-brass">.</span>
            </span>
          </div>

          <p className="text-white/30 text-sm">
            © 2026 Maelon Realty. All rights reserved. Nairobi, Kenya.
          </p>

          <div className="flex items-center gap-4">
            <a href="https://wa.me/254714462319" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white/40 hover:text-brass text-xs font-semibold transition-colors">
              WA
            </a>
            <a href="https://instagram.com/maelonrealty" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white/40 hover:text-brass text-xs font-semibold transition-colors">
              IG
            </a>
            <a href="https://tiktok.com/@maelonrealty" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white/40 hover:text-brass text-xs font-semibold transition-colors">
              TK
            </a>
            <a href="mailto:maelonrealty@gmail.com"
              className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white/40 hover:text-brass text-xs font-semibold transition-colors">
              @
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}