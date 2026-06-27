import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const headerAnim: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }
};

const cardAnim: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 20, delay: i * 0.15 }
  })
};

const plans = [
  {
    subtitle: "Best for begginers",
    title: "Starter",
    price: "$19",
    features: [
      "1 live lesson per week",
      "Certified language teacher",
      "Personalized feedback",
      "All learning materials included",
      "Online, flexible scheduling"
    ]
  },
  {
    subtitle: "Best for fast progress",
    title: "Progress",
    price: "$39",
    features: [
      "2 live lessons per week",
      "Certified teachers",
      "Personalized feedback",
      "All learning materials included",
      "Online, flexible scheduling"
    ]
  },
  {
    subtitle: "Master real conversations",
    title: "Fluent",
    price: "$79",
    features: [
      "4 live lessons per week",
      "Certified expert teachers",
      "In-depth personalized feedback",
      "All learning materials included",
      "Priority scheduling"
    ]
  }
];

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-10%' });
  
  return (
    <section ref={ref} className="page-container text-center text-white py-24 font-sans">
      <motion.h2 variants={headerAnim} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
        Learning Plans
      </motion.h2>
      <motion.p variants={headerAnim} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-gray-300 text-lg mb-16">
        Personalized learning that adapts to you
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 text-left">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardAnim}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="bg-[#18181b] border border-white/5 rounded-3xl p-8 flex flex-col hover:border-white/10 transition-colors duration-300 shadow-xl"
          >
            <div className="text-sm text-gray-400 mb-2 font-medium">{plan.subtitle}</div>
            <h3 className="text-3xl font-bold text-white mb-4">{plan.title}</h3>
            
            <div className="text-3xl font-bold text-[#0ea5e9] mb-8">
              {plan.price} <span className="text-lg font-normal">/ Week</span>
            </div>
            
            <div className="text-sm font-semibold text-white mb-6">What's included</div>
            
            <ul className="flex-1 space-y-4 mb-10">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-gray-300 text-sm font-medium">
                  <Check size={18} className="text-white mr-3 shrink-0 mt-0.5" strokeWidth={3} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link 
              to="/payment" 
              className="w-full block bg-white text-black font-semibold text-center rounded-full py-3.5 hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
