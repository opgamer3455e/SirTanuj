import { motion } from 'framer-motion';

const offerings = [
  {
    title: "Spoken English",
    description: "Speak Confidently in Every Situation",
    icon: "🗣️"
  },
  {
    title: "English Grammar",
    description: "Learn Grammar the Smart Way",
    icon: "📝"
  },
  {
    title: "IELTS Preparation",
    description: "Get High Band Score in IELTS",
    icon: "🎓"
  },
  {
    title: "CBSE Classes 9-12",
    description: "Complete English Syllabus Made Easy",
    icon: "📚"
  },
  {
    title: "ICSE/ISC Classes 9-12",
    description: "Detailed Notes & Exam Preparation",
    icon: "🏫"
  },
  {
    title: "Mock Tests",
    description: "Practice, Analyze and Improve",
    icon: "✅"
  }
];

export default function CoreOfferings() {
  return (
    <section className="px-4 bg-transparent relative z-10" style={{ paddingTop: '200px', paddingBottom: '150px' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center" style={{ marginBottom: '80px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#FF5A5F] font-['Cinzel']" style={{ marginBottom: '24px' }}
          >
            What You Will Learn Here
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 font-['Playfair_Display'] max-w-2xl mx-auto tracking-wide"
          >
            Master the English language with our comprehensive courses tailored for every goal.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[60px] gap-y-[100px]">
          {offerings.map((offering, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              <div className="text-5xl mb-8 group-hover:-translate-y-2 transition-transform duration-500 opacity-80">
                {offering.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-['Cinzel'] group-hover:text-[#FF5A5F] transition-colors tracking-wide">
                {offering.title}
              </h3>
              <p className="text-gray-500 font-['Playfair_Display'] text-base max-w-xs leading-loose">
                {offering.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
