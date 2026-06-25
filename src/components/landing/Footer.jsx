import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const footerLinks = {
  "Student Living": [
    { label: "Find Housing", to: "/smart-marketplace" },
    { label: "Roommate Matching", to: "/roommate-questionnaire" },
    { label: "Budget Calculator", to: "/budget-planner" },
    { label: "Campus Intelligence", to: "/campus-intelligence" },
    { label: "Book a Viewing", to: "/book-viewing" },
  ],
  "Platform": [
    { label: "Student Dashboard", to: "/dashboard" },
    { label: "AI Concierge", to: "/ai-concierge" },
    { label: "Living Match", to: "/living-match" },
    { label: "Reputation Network", to: "/reputation" },
    { label: "Tenant Passport", to: "/tenant-passport" },
  ],
  "Landlords": [
    { label: "List a Property", to: "/landlord" },
    { label: "Landlord Portal", to: "/landlord" },
    { label: "Smart Marketplace", to: "/smart-marketplace" },
    { label: "Book a Consultation", href: "https://wa.me/254714462319" },
  ],
  "Support": [
    { label: "Contact Us", to: "/#contact" },
    { label: "WhatsApp Us", href: "https://wa.me/254714462319" },
    { label: "Email Us", href: "mailto:maelonrealty@gmail.com" },
  ],
};

export default function Footer() {
  const handleSubscribe = () => {
    window.open("https://wa.me/254714462319?text=Hi! I want to subscribe to Maelon Realty updates.", "_blank");
  };

  return (
    React.createElement("footer", { className: "bg-navy relative overflow-hidden pt-20 pb-8" },
      React.createElement("div", { className: "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 font-heading text-[180px] font-bold text-white/[0.015] select-none pointer-events-none whitespace-nowrap tracking-wider" }, "MAELON"),
      React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" },
        React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16" },
          Object.entries(footerLinks).map(([category, links]) =>
            React.createElement("div", { key: category },
              React.createElement("h4", { className: "text-brass font-semibold text-sm tracking-wider uppercase mb-4" }, category),
              React.createElement("ul", { className: "space-y-3" },
                links.map((link) =>
                  React.createElement("li", { key: link.label },
                    link.href
                      ? React.createElement("a", { href: link.href, target: "_blank", rel: "noopener noreferrer", className: "text-white/40 hover:text-white text-sm transition-colors duration-300" }, link.label)
                      : React.createElement(Link, { to: link.to, className: "text-white/40 hover:text-white text-sm transition-colors duration-300" }, link.label)
                  )
                )
              )
            )
          )
        ),
        React.createElement("div", { className: "border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" },
          React.createElement("div", { className: "flex items-center gap-3" },
            React.createElement("div", { className: "w-8 h-8 rounded-lg bg-brass flex items-center justify-center" },
              React.createElement("span", { className: "text-navy font-heading text-lg font-semibold" }, "M")
            ),
            React.createElement("span", { className: "font-heading text-xl text-white/80" }, "Maelon", React.createElement("span", { className: "text-brass" }, "."))
          ),
          React.createElement("p", { className: "text-white/30 text-sm" }, "© 2026 Maelon Realty. All rights reserved. Nairobi, Kenya."),
          React.createElement("div", { className: "flex items-center gap-4" },
            React.createElement("a", { href: "https://wa.me/254714462319", target: "_blank", rel: "noopener noreferrer", className: "w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white/40 hover:text-brass text-xs font-semibold transition-colors" }, "WA"),
            React.createElement("a", { href: "https://instagram.com/maelonrealty", target: "_blank", rel: "noopener noreferrer", className: "w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white/40 hover:text-brass text-xs font-semibold transition-colors" }, "IG"),
            React.createElement("a", { href: "mailto:maelonrealty@gmail.com", className: "w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white/40 hover:text-brass text-xs font-semibold transition-colors" }, "@")
          )
        )
      )
    )
  );
}
