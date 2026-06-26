import { motion } from 'framer-motion';
import { Check, ShieldCheck, CreditCard } from 'lucide-react';

const plans = [
  {
    id: 'monthly',
    name: 'Monthly Pro',
    price: '$29',
    period: '/month',
    description: 'Perfect for short-term revision and crash courses.',
    features: ['Access to all live classes', 'Basic study materials', '24/7 forum support', 'Monthly progress reports'],
    color: '#00A699',
    popular: false
  },
  {
    id: 'yearly',
    name: 'Annual Mastery',
    price: '$199',
    period: '/year',
    description: 'Our most popular plan for comprehensive exam prep.',
    features: ['Everything in Monthly', '1-on-1 Mentorship session', 'Premium Video Vault', 'Advanced mock tests', 'Parent portal access'],
    color: '#FF5A5F',
    popular: true
  },
  {
    id: 'course',
    name: 'Per-Course',
    price: '$49',
    period: '/course',
    description: 'Targeted learning for specific syllabus modules.',
    features: ['Lifetime access to course', 'Course-specific PDFs', 'Doubt clearing sessions', 'Certificate of completion'],
    color: '#FC642D',
    popular: false
  }
];

export default function PaymentPage() {
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
            Invest in Your <span className="text-[#FF5A5F]">Future</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            Choose a plan that fits your learning style. Secure, transparent, and flexible pricing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-center">
          {plans.map((plan, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              key={plan.id}
              className={`relative bg-[#121212] rounded-3xl p-8 border transition-all duration-300 ${
                plan.popular 
                ? `border-[${plan.color}] shadow-[0_0_40px_rgba(255,90,95,0.15)] md:-translate-y-4` 
                : 'border-white/5 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF5A5F] text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-zinc-400 text-sm mb-6 h-10">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-5xl font-bold text-white font-['Bricolage_Grotesque']">{plan.price}</span>
                <span className="text-zinc-500 font-medium">{plan.period}</span>
              </div>

              <button 
                className={`w-full py-4 rounded-xl font-semibold mb-8 transition-colors ${
                  plan.popular 
                  ? 'bg-[#FF5A5F] hover:bg-[#e04f54] text-white shadow-lg' 
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                Choose {plan.name}
              </button>

              <div className="space-y-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-[#00A699]" />
                    </div>
                    <span className="text-zinc-300 text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secure Payment Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-[#121212] rounded-2xl border border-white/5 p-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
        >
          <div className="flex items-center gap-3 text-zinc-400">
            <ShieldCheck className="text-[#00A699]" size={24} />
            <span className="font-medium">SSL Secured Checkout</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-400">
            <CreditCard className="text-[#FC642D]" size={24} />
            <span className="font-medium">Accepts UPI, Cards, and Wallets</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
