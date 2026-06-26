import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', class: 'Class 9', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Mock submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', class: 'Class 9', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Bricolage_Grotesque']">
            Get in <span className="text-[#FF5A5F]">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            Have questions about our courses or need support? We're here to help you every step of the way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 text-[#FF5A5F] border border-white/5">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Email Us</div>
                    <a href="mailto:support@educationplatform.com" className="text-zinc-400 hover:text-white transition-colors">support@educationplatform.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 text-[#00A699] border border-white/5">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Call Us</div>
                    <a href="tel:+18001234567" className="text-zinc-400 hover:text-white transition-colors">+1 (800) 123-4567</a>
                    <div className="text-xs text-zinc-500 mt-1">Mon-Fri, 9am to 6pm EST</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 text-[#FC642D] border border-white/5">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">Headquarters</div>
                    <address className="text-zinc-400 not-italic">123 Learning Lane, EdTech District<br />New York, NY 10001</address>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#121212] p-8 rounded-3xl border border-white/5">
              <h3 className="text-lg font-bold text-white mb-4">Instant Support</h3>
              <p className="text-zinc-400 text-sm mb-6">Need a quicker response? Chat with our academic counselors on WhatsApp.</p>
              <button className="w-full py-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-semibold rounded-xl border border-[#25D366]/30 transition-colors flex items-center justify-center gap-2">
                <MessageCircle size={18} /> Chat on WhatsApp
              </button>
            </div>
          </motion.div>

          {/* Quick Inquiry Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="bg-[#121212] p-8 md:p-10 rounded-3xl border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-8">Send an Inquiry</h2>
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#FF5A5F] transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#FF5A5F] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="class" className="block text-sm font-medium text-zinc-400 mb-2">Interested Class</label>
                  <select 
                    id="class"
                    value={formData.class}
                    onChange={(e) => setFormData({...formData, class: e.target.value})}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#FF5A5F] transition-colors appearance-none"
                  >
                    <option value="Class 9">Class 9 English</option>
                    <option value="Class 10">Class 10 English</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#FF5A5F] transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className={`w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                    status === 'success' 
                    ? 'bg-[#00A699]' 
                    : 'bg-[#FF5A5F] hover:bg-[#ff4046]'
                  } disabled:opacity-70`}
                >
                  {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent!' : <><Send size={18} /> Send Message</>}
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
