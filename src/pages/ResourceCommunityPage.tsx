import { motion } from 'framer-motion';

export default function ResourceCommunityPage() {
  const resources = [
    "Chapter-wise Notes (PDF)",
    "Grammar Rules & Worksheets",
    "Vocabulary Lists",
    "Mock Tests & Quizzes",
    "Previous Year Papers"
  ];

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-4 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#FF5A5F] font-['Cinzel'] mb-4">
            Resources & Community
          </h1>
          <p className="text-xl text-gray-400 font-['Playfair_Display']">
            Everything you need to excel, all in one place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column: Free Resources */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-md"
          >
            <h2 className="text-3xl font-bold text-white mb-8 font-['Cinzel']">
              Free Resources for You!
            </h2>
            <ul className="space-y-6 mb-10">
              {resources.map((res, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50 text-green-400 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xl text-gray-300 font-['Playfair_Display']">{res}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-4 bg-[#FF5A5F] text-white font-bold text-lg rounded-xl hover:bg-[#FC642D] transition-colors flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,90,95,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Free Now
            </button>
          </motion.div>

          {/* Right Column: Community */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6 font-['Cinzel']">
              Join Our Community
            </h2>
            <p className="text-gray-400 text-lg mb-8 font-['Playfair_Display']">
              Subscribe to our newsletter for weekly tips, or join us on social media to learn with thousands of other students.
            </p>

            <form className="mb-12 relative">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00A699] transition-colors"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-2 bottom-2 px-6 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Subscribe
              </button>
            </form>

            <div>
              <p className="text-gray-400 mb-6 uppercase tracking-wider text-sm font-bold">Connect With Us</p>
              <div className="flex gap-4">
                {['YouTube', 'Telegram', 'Instagram', 'Facebook'].map((platform, idx) => (
                  <a key={idx} href="#" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#FF5A5F] hover:text-white hover:border-[#FF5A5F] transition-all group">
                    <span className="text-sm font-bold opacity-0 group-hover:opacity-100 absolute -top-8 bg-white text-black px-2 py-1 rounded text-xs pointer-events-none transition-opacity">
                      {platform}
                    </span>
                    <span className="text-2xl">{platform[0]}</span>
                  </a>
                ))}
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
