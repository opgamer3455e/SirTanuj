import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, User, Loader2 } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import DotField from '../components/ui/DotField';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const { login } = useFirebaseAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin 
        ? { identifier: email, password }
        : { name, email, password };

      const response = await fetch(`http://localhost:5001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      login(data.user);
      
      if (data.user.role === 'TEACHER' || data.user.role === 'ADMIN') {
         navigate('/cms');
      } else {
         navigate('/dashboard');
      }
      
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setErrorMsg('');
    setLoading(true);
    
    try {
      const response = await fetch(`http://localhost:5001/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Google authentication failed');
      }

      console.log('Google Success:', data.user);
      login(data.user);
      
      if (data.user.role === 'TEACHER' || data.user.role === 'ADMIN') {
         navigate('/cms');
      } else {
         navigate('/dashboard');
      }
      
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

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

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm font-semibold text-center">
              {errorMsg}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent text-white outline-none transition-all placeholder:text-zinc-600 font-medium"
                />
              </div>
            )}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                type="text"
                placeholder={isLogin ? "Email or Username" : "Email Address"}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-white bg-[#FF5A5F] hover:bg-[#FC642D] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,90,95,0.3)] mt-6 group"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {!loading && (isLogin ? 'Sign In' : 'Create Account')}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setErrorMsg('Google Sign-In Failed')}
              theme="filled_black"
              shape="pill"
              text={isLogin ? 'signin_with' : 'signup_with'}
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-zinc-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrorMsg('');
                }}
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
