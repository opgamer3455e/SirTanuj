import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import LightRays from '../components/ui/LightRays';

export default function LoginSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const nextPath = location.state?.next || '/dashboard';

  // Optional: Auto-redirect after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(nextPath);
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate, nextPath]);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden">
      
      {/* LightRays Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <LightRays
          raysOrigin="top-center"
          raysColor="#FC642D"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.2}
          pulsating={true}
          saturation={1.2}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-black/40 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-[0_0_50px_rgba(252,100,45,0.15)] flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-white mb-3 tracking-tight"
          >
            Login Successful
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-zinc-400 mb-8 leading-relaxed"
          >
            Welcome back to Nexus. Your session is securely authenticated. You will be redirected shortly.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(nextPath)}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-[#FC642D] to-[#ff8c61] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#FC642D]/25 transition-all hover:shadow-[#FC642D]/40"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
