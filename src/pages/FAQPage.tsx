import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import Tabs from '../components/ui/Tabs';
import Accordion from '../components/ui/Accordion';

const classFAQs = [
  {
    id: 'c1',
    title: 'Are the live classes recorded?',
    content: 'Yes! All live sessions are recorded and automatically uploaded to your Student Dashboard within 24 hours. You can watch them anytime.'
  },
  {
    id: 'c2',
    title: 'What happens if I miss a class?',
    content: 'Don\'t worry! You can watch the recording. If you have questions from the missed class, you can ask them in the community forum or during the doubt-clearing sessions.'
  },
  {
    id: 'c3',
    title: 'What platform do you use for live classes?',
    content: 'We use a proprietary WebRTC-based platform integrated directly into the website for seamless video conferencing without requiring external apps.'
  }
];

const materialFAQs = [
  {
    id: 'm1',
    title: 'Can I download the PDFs to my device?',
    content: 'Absolutely. All notes, worksheets, and chapter summaries are available as downloadable PDFs so you can study offline.'
  },
  {
    id: 'm2',
    title: 'Are the materials aligned with the latest syllabus?',
    content: 'Yes, our educators constantly update the repository to ensure all materials reflect the latest board guidelines and syllabus changes.'
  }
];

const paymentFAQs = [
  {
    id: 'p1',
    title: 'What payment methods do you accept?',
    content: 'We accept all major credit/debit cards, UPI, and popular digital wallets via our secure Stripe integration.'
  },
  {
    id: 'p2',
    title: 'Can I upgrade my plan later?',
    content: 'Yes, you can upgrade from a Monthly to an Annual plan at any time. The remaining balance from your current month will be prorated.'
  },
  {
    id: 'p3',
    title: 'Do you offer refunds?',
    content: 'We offer a 7-day money-back guarantee for our Annual plans if you are not satisfied with the content.'
  }
];

export default function FAQPage() {
  const tabs = [
    {
      id: 'classes',
      label: 'Live Classes',
      content: <div className="mt-4"><Accordion items={classFAQs} /></div>
    },
    {
      id: 'materials',
      label: 'Study Materials',
      content: <div className="mt-4"><Accordion items={materialFAQs} /></div>
    },
    {
      id: 'payments',
      label: 'Payments & Billing',
      content: <div className="mt-4"><Accordion items={paymentFAQs} /></div>
    }
  ];

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen bg-[#050505] bg-noise">
      <div className="max-w-4xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-[#00A699]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="text-[#00A699]" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Cinzel']">
            Frequently Asked <span className="text-[#00A699]">Questions</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Find answers to common questions about our platform, classes, and billing. Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs tabs={tabs} />
        </motion.div>

      </div>
    </div>
  );
}
