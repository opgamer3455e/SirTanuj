import { motion } from 'framer-motion';

const features = [
  {
    title: "10+ Years Experience",
    description: "Learn from a seasoned expert with over a decade of teaching excellence.",
    icon: "⭐"
  },
  {
    title: "Simple Language",
    description: "Complex concepts broken down into easy-to-understand, everyday language.",
    icon: "💡"
  },
  {
    title: "Exam-Oriented Strategy",
    description: "Laser-focused practice designed specifically to maximize your scores.",
    icon: "🎯"
  },
  {
    title: "Free Notes & PDFs",
    description: "Get comprehensive study materials, mock tests, and worksheets for free.",
    icon: "📄"
  },
  {
    title: "Regular Live Classes",
    description: "Weekly interactive sessions to clear doubts and stay on track.",
    icon: "🔴"
  },
  {
    title: "Personalized Guidance",
    description: "1-on-1 support and mentorship to help you achieve your unique goals.",
    icon: "🤝"
  }
];

export default function FeaturesSection() {
  return (
    <section className="px-4 bg-transparent relative z-10" style={{ paddingTop: '200px', paddingBottom: '200px' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center" style={{ marginBottom: '80px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white font-['Cinzel']" style={{ marginBottom: '24px' }}
          >
            Why Learn with Tanuj Sir?
          </motion.h2>
          <div className="w-24 h-1 bg-[#FF5A5F] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[60px] gap-y-[100px]">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="text-4xl mb-8 opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-4 font-['Cinzel'] tracking-widest uppercase">
                {feature.title}
              </h3>
              <p className="text-gray-500 font-['Playfair_Display'] max-w-sm leading-loose text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
