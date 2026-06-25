import { FileText, Download, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResourceLibrary() {
  const resources = [
    {
      id: 1,
      title: "Physics Lab Manual Class 10",
      description: "Complete practicals, observations, and viva questions for the ICSE Physics syllabus.",
      type: "PDF",
      size: "23 MB",
      url: "/assets/Physics Lab Manual Class 10.pdf"
    },
    {
      id: 2,
      title: "Main Study File Class 10",
      description: "Core notes and important concepts compiled for quick revision.",
      type: "PDF",
      size: "3.3 MB",
      url: "/assets/Main File CLass 10-1.pdf"
    }
  ];

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };
  
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } }
  };

  return (
    <div className="page-container" style={{ paddingTop: '2rem' }}>
      <motion.header 
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="section-title">Resource Library</h1>
        <p className="section-subtitle">Access your digital manuals, study files, and core notes anywhere, anytime.</p>
      </motion.header>

      <motion.div 
        className="grid-2"
        initial="hidden" animate="visible" variants={staggerContainer}
      >
        {resources.map((res) => (
          <motion.div 
            key={res.id} 
            variants={fadeUp} 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="card resource-card flex flex-col h-full hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-glass rounded-lg text-accent">
                <FileText size={32} />
              </div>
              <div>
                <h3 className="text-xl m-0">{res.title}</h3>
                <span className="text-xs text-secondary uppercase tracking-wider">{res.type} · {res.size}</span>
              </div>
            </div>
            
            <p className="flex-1 mb-6">{res.description}</p>
            
            <div className="flex gap-4">
              <a href={res.url} target="_blank" rel="noreferrer" className="btn btn-primary flex-1 text-center">
                <Eye size={16} /> View
              </a>
              <a href={res.url} download className="btn btn-outline flex-1 text-center">
                <Download size={16} /> Download
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
