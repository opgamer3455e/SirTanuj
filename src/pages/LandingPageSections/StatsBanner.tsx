import { motion } from 'framer-motion';

const stats = [
  { value: "5000+", label: "Students Trained" },
  { value: "1000+", label: "Free Videos" },
  { value: "500+", label: "Study Materials" },
  { value: "95%", label: "Success Rate" }
];

export default function StatsBanner() {
  return (
    <section className="relative z-10 bg-transparent overflow-hidden" style={{ paddingTop: '200px', paddingBottom: '200px' }}>
      
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-[#FF5A5F]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '60px', marginBottom: '120px' }}>
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <h3 className="text-3xl md:text-5xl font-light text-[#FF5A5F] font-['Cinzel'] mb-4 tracking-wider">
                {stat.value}
              </h3>
              <p className="text-gray-500 font-['Playfair_Display'] text-sm md:text-base uppercase tracking-[0.2em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center max-w-4xl mx-auto"
        >
          <p className="text-xl md:text-2xl text-gray-400 italic font-['Playfair_Display'] leading-loose font-light tracking-wide">
            "Education is not the learning of facts, but the training of the mind to think."
          </p>
          <p className="mt-8 text-gray-600 font-['Cinzel'] text-sm uppercase tracking-widest">
            — Albert Einstein
          </p>
        </motion.div>
      </div>
    </section>
  );
}
