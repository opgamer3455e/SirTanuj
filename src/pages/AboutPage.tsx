import { motion } from 'framer-motion';
import { Target, Lightbulb, Heart, Award } from 'lucide-react';

const Tutors = [
  {
    id: 1,
    name: 'Dr. Sarah Jenkins',
    role: 'Head of Literature',
    qualifications: 'Ph.D. in English Literature',
    experience: '15+ Years Experience',
    bio: 'Passionate about bringing classic literature to life for modern students.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    role: 'Grammar Specialist',
    qualifications: 'M.A. Applied Linguistics',
    experience: '10+ Years Experience',
    bio: 'Makes complex grammar rules simple, intuitive, and easy to remember.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    id: 3,
    name: 'Emma Roberts',
    role: 'Creative Writing Lead',
    qualifications: 'MFA Creative Writing',
    experience: '8+ Years Experience',
    bio: 'Helps students find their unique voice and craft compelling narratives.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300&h=300'
  }
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Bricolage_Grotesque']">
            Our <span className="text-[#FF5A5F]">Story</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            Empowering students with world-class education, blending traditional wisdom with modern pedagogical approaches.
          </p>
        </motion.div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#121212] p-8 rounded-3xl border border-white/5"
          >
            <div className="w-14 h-14 bg-[#FF5A5F]/10 rounded-2xl flex items-center justify-center mb-6">
              <Target className="text-[#FF5A5F]" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-zinc-400 leading-relaxed">
              To democratize access to premium education and help every student achieve their highest academic potential through personalized learning.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#121212] p-8 rounded-3xl border border-white/5"
          >
            <div className="w-14 h-14 bg-[#00A699]/10 rounded-2xl flex items-center justify-center mb-6">
              <Lightbulb className="text-[#00A699]" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-zinc-400 leading-relaxed">
              To be the global leader in digital education, innovating how students interact with complex subjects and transforming learning into a joyful experience.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-[#121212] p-8 rounded-3xl border border-white/5"
          >
            <div className="w-14 h-14 bg-[#FC642D]/10 rounded-2xl flex items-center justify-center mb-6">
              <Heart className="text-[#FC642D]" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Teaching Philosophy</h3>
            <p className="text-zinc-400 leading-relaxed">
              We believe in fostering curiosity over memorization. Our approach centers on critical thinking, active engagement, and real-world application.
            </p>
          </motion.div>
        </div>

        {/* Tutors Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-['Bricolage_Grotesque']">
            Meet Your <span className="text-[#00A699]">Mentors</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Learn from industry experts and passionate educators dedicated to your success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Tutors.map((tutor, index) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative bg-[#121212] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,166,153,0.1)]"
            >
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={tutor.image} 
                  alt={tutor.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />
              </div>
              <div className="p-8 relative z-10 -mt-12">
                <div className="bg-[#0A0A0A] inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#00A699] mb-4 border border-white/10">
                  {tutor.role}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{tutor.name}</h3>
                <div className="flex items-center gap-2 text-zinc-500 text-sm mb-4">
                  <Award size={16} />
                  <span>{tutor.qualifications}</span>
                </div>
                <p className="text-zinc-400 text-sm mb-6">{tutor.bio}</p>
                <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  {tutor.experience}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
