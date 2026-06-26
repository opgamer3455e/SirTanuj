import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Grammar Hacks for Board Exams',
    excerpt: 'Mastering tenses and active/passive voice can be tricky, but these 10 simple rules will ensure you never lose marks in the grammar section. Learn how to identify common traps set by examiners.',
    author: 'Prof. Michael Chen',
    date: 'June 20, 2026',
    category: 'Exam Tips',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200'
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
  },
  {
    id: 4,
    title: 'The Art of Letter Writing in the Digital Age',
    excerpt: 'Why formal letters still matter in board exams and how to format them flawlessly without sounding archaic.',
    author: 'Prof. Michael Chen',
    date: 'June 5, 2026',
    category: 'Writing Hacks',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800'
  }
];

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const secondaryPosts = blogPosts.slice(1);

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-[#050505] bg-noise relative overflow-hidden">
      
      {/* Deep Atmospheric Background */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none" style={{
        background: 'radial-gradient(circle at 80% 20%, rgba(201, 168, 76, 0.08), transparent 40%), radial-gradient(circle at 20% 80%, rgba(255, 90, 95, 0.05), transparent 40%)'
      }} />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Editorial Header */}
        <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/10 pb-12">
          <div>
            <div className="flex items-center gap-3 text-[#C9A84C] mb-4">
              <BookOpen size={20} />
              <span className="text-sm font-bold uppercase tracking-[0.2em] font-['Cinzel']">The Journal</span>
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-bold text-white font-['Cinzel'] leading-tight"
            >
              Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] to-[#E8D08A] italic">Insights</span>
            </motion.h1>
          </div>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-zinc-400 font-['Playfair_Display'] italic max-w-sm border-l-2 border-[#C9A84C]/30 pl-4"
          >
            Exam strategies, literary deep-dives, and study protocols curated by our expert faculty.
          </motion.p>
        </header>

        {/* Featured Editorial Piece */}
        <motion.article 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mb-32 group cursor-pointer"
        >
          <div className="relative h-[60vh] min-h-[500px] rounded-3xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-700" />
            <img 
              src={featuredPost.image} 
              alt={featuredPost.title}
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
            
            <div className="absolute top-8 left-8 z-20">
              <span className="bg-black/60 backdrop-blur-md text-[#C9A84C] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-[#C9A84C]/30">
                {featuredPost.category}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 lg:col-span-9">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Cinzel'] leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
                {featuredPost.title}
              </h2>
              <p className="text-xl text-zinc-400 font-['Playfair_Display'] leading-relaxed max-w-3xl">
                {featuredPost.excerpt}
              </p>
            </div>
            
            <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-6 md:border-l border-white/10 md:pl-8">
              <div>
                <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Author</span>
                <span className="text-white font-['Cinzel'] text-lg">{featuredPost.author}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Published</span>
                <span className="text-zinc-400 font-['Playfair_Display']">{featuredPost.date}</span>
              </div>
              <div className="pt-4 mt-auto">
                <span className="inline-flex items-center gap-2 text-[#C9A84C] font-['Cinzel'] font-bold text-sm tracking-wider uppercase group-hover:gap-4 transition-all">
                  Read Article <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Secondary Articles - Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {secondaryPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="flex flex-col group cursor-pointer"
            >
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-700" />
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/20">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col flex-1">
                <header className="mb-4">
                  <h2 className="text-2xl font-bold text-white mb-4 font-['Cinzel'] leading-snug group-hover:text-[#00A699] transition-colors line-clamp-3">
                    {post.title}
                  </h2>
                </header>
                
                <p className="text-zinc-400 font-['Playfair_Display'] text-lg leading-relaxed mb-8 flex-1">
                  {post.excerpt}
                </p>
                
                <footer className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="flex flex-col">
                    <span className="text-white font-['Cinzel'] text-sm">{post.author}</span>
                    <span className="text-zinc-500 font-['Playfair_Display'] text-xs">{post.date}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#00A699] group-hover:border-[#00A699] transition-all">
                    <ArrowRight size={16} className="text-zinc-400 group-hover:text-white group-hover:-rotate-45 transition-all" />
                  </div>
                </footer>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </div>
  );
}
