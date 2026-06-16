import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, MapPin, DollarSign, Eye, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Verified Listings',
    description: 'Every property is personally inspected. Every roommate profile is identity-verified. No surprises.',
  },
  {
    icon: Zap,
    title: 'AI-Powered Matching',
    description: 'Our algorithms analyze lifestyle patterns, budgets, and preferences to find your perfect fit.',
  },
  {
    icon: MapPin,
    title: 'Campus Proximity',
    description: 'Walk-time calculations to every major university. Because in Nairobi, proximity matters.',
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'No hidden fees, no broker inflations. What you see is what you pay. Always.',
  },
  {
    icon: Eye,
    title: 'Virtual Tours',
    description: 'View properties from anywhere with 360° virtual walkthroughs before booking a visit.',
  },
  {
    icon: Smartphone,
    title: 'Digital-First Experience',
    description: 'From search to signing, everything happens online. Move-in ready in 48 hours.',
  },
];

export default function WhyMaelon() {
  return (
    <section id="why-maelon" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brass text-sm font-semibold tracking-widest uppercase"
            >
              Why Maelon
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl font-light text-foreground mt-3"
            >
              The Future of<br />
              <span className="italic text-brass">Property Discovery</span><br />
              in Kenya
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mt-6 text-lg leading-relaxed"
            >
              We're not just another listing site. Maelon is building an intelligent
              ecosystem where students, professionals, families, and investors find
              exactly what they need — faster, safer, and smarter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex items-center gap-6"
            >
              <div className="text-center">
                <p className="text-3xl font-heading font-semibold text-brass">15K+</p>
                <p className="text-muted-foreground text-sm">Happy Students</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-heading font-semibold text-brass">99%</p>
                <p className="text-muted-foreground text-sm">Verified</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-3xl font-heading font-semibold text-brass">48hr</p>
                <p className="text-muted-foreground text-sm">Move-In</p>
              </div>
            </motion.div>
          </div>

          {/* Right - Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-5 rounded-2xl bg-card border border-border hover:border-brass/30 hover:shadow-lg transition-all duration-400"
              >
                <div className="w-10 h-10 rounded-xl bg-brass/10 flex items-center justify-center mb-4 group-hover:bg-brass/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-brass" />
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}