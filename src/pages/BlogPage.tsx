import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Grammar Hacks for Board Exams',
    excerpt: 'Mastering tenses and active/passive voice can be tricky, but these 10 simple rules will ensure you never lose marks in the grammar section.',
    author: 'Prof. Michael Chen',
    date: 'June 20, 2026',
    category: 'Exam Tips',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Analyzing Robert Frost: The Road Not Taken',
    excerpt: 'A deep dive into the symbolism and themes of one of the most misunderstood poems in the Class 9 curriculum.',
    author: 'Dr. Sarah Jenkins',
    date: 'June 15, 2026',
    category: 'Literature Insights',
    image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'How to Write a Perfect Analytical Paragraph',
    excerpt: 'Step-by-step guide on interpreting data, structuring your response, and using the right vocabulary for full marks.',
    author: 'Emma Roberts',
    date: 'June 10, 2026',
    category: 'Writing Hacks',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead27c8?auto=format&fit=crop&q=80&w=800'
  }
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Bricolage_Grotesque']"
          >
            Insights & <span className="text-[#FF5A5F]">Articles</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            Exam strategies, literary deep-dives, and study tips curated by our expert educators.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-[#121212] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 group flex flex-col h-full hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,255,255,0.05)]"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#FF5A5F] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <header className="mb-4">
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#FF5A5F] transition-colors">
                    <a href="#">{post.title}</a>
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
                    <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                  </div>
                </header>
                
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                
                <footer className="mt-auto pt-4 border-t border-white/5">
                  <a href="#" className="inline-flex items-center gap-2 text-[#00A699] text-sm font-semibold group/link">
                    Read Full Article
                    <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                  </a>
                </footer>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </div>
  );
}
