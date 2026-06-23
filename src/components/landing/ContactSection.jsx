import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });

  const handleSubmit = () => {
    const text = `Hi Maelon Realty! 👋

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Interested in:* ${formData.interest}
*Message:* ${formData.message}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/254714462319?text=${encoded}`, '_blank');
  };

  const handleSchedule = () => {
    const text = encodeURIComponent(`Hi! I'd like to book a free consultation with Maelon Realty.`);
    window.open(`https://wa.me/254714462319?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-mist relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Info */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brass text-sm font-semibold tracking-widest uppercase"
            >
              Get In Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl font-light text-foreground mt-3"
            >
              Start Your <span className="italic text-brass">Journey</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mt-4 text-lg leading-relaxed"
            >
              Whether you're a student looking for housing, an investor seeking opportunities,
              or a family searching for your dream home — we're here to help.
            </motion.p>

            <div className="mt-10 space-y-6">
              {[
                { icon: Phone, label: '+254 714462319', sub: 'Mon-Fri, 8am-6pm EAT' },
                { icon: Mail, label: 'maelonrealty@gmail.com', sub: 'We reply within 2 hours' },
                { icon: MapPin, label: 'Ole Sangale Road, Nairobi', sub: 'Near Strathmore University' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brass/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-brass" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-muted-foreground text-sm">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 p-6 rounded-2xl bg-navy text-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-brass" />
                <h3 className="font-semibold">Book a Free Consultation</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Schedule a 30-minute virtual session with our property experts.
                Get personalized recommendations based on your needs and budget.
              </p>
              <Button
                onClick={handleSchedule}
                className="mt-4 bg-brass hover:bg-brass-light text-navy font-semibold rounded-full group"
              >
                Schedule on WhatsApp
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 border border-border shadow-lg"
          >
            <h3 className="font-heading text-2xl font-light text-foreground mb-6">
              Send us a message
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-xl h-12"
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-xl h-12"
                />
              </div>
              <Input
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="rounded-xl h-12"
              />
              <Select
                value={formData.interest}
                onValueChange={(val) => setFormData({ ...formData, interest: val })}
              >
                <SelectTrigger className="rounded-xl h-12">
                  <SelectValue placeholder="I'm interested in..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student-housing">Student Housing</SelectItem>
                  <SelectItem value="roommate">Roommate Matching</SelectItem>
                  <SelectItem value="premium-buy">Buying Premium Property</SelectItem>
                  <SelectItem value="premium-rent">Renting Premium Property</SelectItem>
                  <SelectItem value="investment">Property Investment</SelectItem>
                  <SelectItem value="management">Property Management</SelectItem>
                  <SelectItem value="advisory">Real Estate Advisory</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Tell us about what you're looking for..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="rounded-xl min-h-[120px] resize-none"
              />
              <Button
                onClick={handleSubmit}
                className="w-full bg-brass hover:bg-brass-light text-navy font-semibold h-12 rounded-xl group"
              >
                <Send className="w-4 h-4 mr-2" />
                Send via WhatsApp
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-muted-foreground text-xs text-center">
                By submitting, you agree to our privacy policy. We'll never share your information.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}