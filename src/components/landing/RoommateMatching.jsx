import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Moon, BookOpen, Music, Coffee, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const profiles = [
{
  id: 1,
  name: 'Amina K.',
  university: 'Strathmore University',
  year: '3rd Year',
  budget: 'KES 15-20K',
  compatibility: 92,
  traits: ['Early Riser', 'Neat', 'Studious'],
  avatar: 'A',
  color: 'from-brass to-brass-dark'
},
{
  id: 2,
  name: "Cliff Chumo",
  university: 'University of Nairobi',
  year: '2nd Year',
  budget: 'KES 10-15K',
  compatibility: 87,
  traits: ['Social', 'Night Owl', 'Music Lover'],
  avatar: 'J',
  color: 'from-blue-400 to-blue-600'
},
{
  id: 3,
  name: "Wanjala\xA0",
  university: 'USIU-Africa',
  year: '4th Year',
  budget: 'KES 20-25K',
  compatibility: 95,
  traits: ['Quiet', 'Clean', 'Foodie'],
  avatar: 'W',
  color: 'from-emerald-400 to-emerald-600'
},
{
  id: 4,
  name: "David O.",
  university: 'Kenyatta University',
  year: '1st Year',
  budget: 'KES 8-12K',
  compatibility: 78,
  traits: ['Active', 'Early Riser', 'Social'],
  avatar: 'B',
  color: 'from-purple-400 to-purple-600'
}];


const traitIcons = {
  'Early Riser': Coffee,
  'Night Owl': Moon,
  'Studious': BookOpen,
  'Social': Users,
  'Music Lover': Music,
  'Neat': Sparkles,
  'Clean': Sparkles,
  'Quiet': Moon,
  'Foodie': Coffee,
  'Active': Users
};

function CompatibilityRing({ score }) {
  const circumference = 2 * Math.PI * 42;
  const progress = score / 100 * circumference;

  return (
    <svg width="96" height="96" viewBox="0 0 96 96" className="synergetic-ring">
      <circle cx="48" cy="48" r="42" fill="none" stroke="rgba(197,160,89,0.1)" strokeWidth="3" />
      <circle
        cx="48" cy="48" r="42" fill="none"
        stroke="#C5A059" strokeWidth="3"
        strokeDasharray={`${progress} ${circumference}`}
        strokeLinecap="round"
        transform="rotate(-90 48 48)" />
      
    </svg>);

}

export default function RoommateMatching() {
  return (
    <section id="roommates" className="py-24 bg-mist relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brass text-sm font-semibold tracking-widest uppercase">
            
            Roommate Matching
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mt-3">
            
            Your <span className="italic text-brass">Ideal</span> Roommate Awaits
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-4 max-w-lg mx-auto text-lg leading-relaxed">
            
            AI-powered compatibility matching based on lifestyle, study habits,
            budget, and personality. Every profile is verified.
          </motion.p>
        </div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profiles.map((profile, i) =>
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-card rounded-2xl p-6 border border-border hover:border-brass/30 hover:shadow-xl transition-all duration-500 text-center">
            
              {/* Avatar with Ring */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                <CompatibilityRing score={profile.compatibility} />
                <div className={`absolute inset-0 m-auto w-16 h-16 rounded-full bg-gradient-to-br ${profile.color} flex items-center justify-center`}>
                  <span className="text-white text-xl font-semibold">{profile.avatar}</span>
                </div>
              </div>

              {/* Compatibility Score */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brass/10 text-brass rounded-full text-sm font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                {profile.compatibility}% Match
              </div>

              <h3 className="font-semibold text-foreground text-lg">{profile.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{profile.university}</p>
              <p className="text-muted-foreground text-xs">{profile.year} • {profile.budget}</p>

              {/* Verified Badge */}
              <div className="flex items-center justify-center gap-1 mt-3 text-emerald-600 text-xs font-medium">
                <Shield className="w-3.5 h-3.5" />
                Verified Profile
              </div>

              {/* Traits */}
              <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                {profile.traits.map((trait) => {
                const Icon = traitIcons[trait] || Sparkles;
                return (
                  <span
                    key={trait}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                    
                      <Icon className="w-3 h-3" />
                      {trait}
                    </span>);

              })}
              </div>

              <Button
              variant="outline"
              size="sm"
              className="mt-5 w-full rounded-full border-brass/20 text-foreground hover:bg-brass/10 hover:border-brass">
              
                View Profile
              </Button>
            </motion.div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center">
          
          <div className="glass-panel-light inline-flex flex-col sm:flex-row items-center gap-4 rounded-2xl p-6 sm:p-8">
            <div className="text-left">
              <h3 className="font-heading text-2xl font-light text-foreground">
                Ready to find your <span className="italic text-brass">perfect</span> roommate?
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                Create your profile and let our AI match you with compatible living partners.
              </p>
            </div>
            <Link to="/roommate-questionnaire">
              <Button className="bg-brass hover:bg-brass-light text-navy font-semibold px-8 rounded-full flex-shrink-0 group">
                Get Matched
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>);

}