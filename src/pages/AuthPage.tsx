import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';
import DotField from '../components/ui/DotField';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050505] flex items-center justify-center p-4">
      {/* Background Interactive DotField */}
      <div className="absolute inset-0 z-0">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(255, 90, 95, 0.4)" // Coral Red
          gradientTo="rgba(0, 166, 153, 0.3)" // Teal
          glowColor="#1a0a0a"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 font-['Cinzel']">
              {isLogin ? 'Welcome Back' : 'Join Nexus'}
            </h1>
            <p className="text-zinc-400 font-['Playfair_Display']">
              {isLogin ? 'Sign in to access your student dashboard' : 'Start your journey to English mastery'}
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent text-white outline-none transition-all placeholder:text-zinc-600 font-medium"
                />
              </div>
            )}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent text-white outline-none transition-all placeholder:text-zinc-600 font-medium"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent text-white outline-none transition-all placeholder:text-zinc-600 font-medium"
              />
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-sm text-[#FF5A5F] hover:text-white transition-colors font-medium">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-semibold text-white bg-[#FF5A5F] hover:bg-[#FC642D] transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,90,95,0.3)] mt-6 group"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-zinc-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#FF5A5F] hover:text-white transition-colors font-semibold"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
