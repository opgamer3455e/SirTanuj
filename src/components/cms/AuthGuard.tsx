import { Navigate, Outlet } from 'react-router-dom';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  requiredRole?: 'STUDENT' | 'TEACHER';
}

export default function AuthGuard({ requiredRole }: AuthGuardProps) {
  const { appUser, isLoading, sessionError } = useFirebaseAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#FC642D] animate-spin mb-4" />
        <p className="text-zinc-500 font-['Cinzel'] tracking-widest uppercase text-sm">Verifying Secure Session...</p>
      </div>
    );
  }

  // Handle Device Revocation / Piracy Protection
  if (sessionError && !appUser) {
    return (
      <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-2xl max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4 font-['Cinzel']">Session Terminated</h2>
          <p className="text-zinc-300">
            {sessionError || "Your session was invalidated. This usually happens if you log in from another device."}
          </p>
          <a href="/auth" className="inline-block mt-6 px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold">
            Return to Login
          </a>
        </div>
      </div>
    );
  }

  if (!appUser) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && appUser.role !== requiredRole) {
    return (
       <div className="h-screen w-full bg-[#050505] flex flex-col items-center justify-center">
        <div className="bg-orange-500/10 border border-orange-500/30 p-8 rounded-2xl max-w-md text-center">
          <h2 className="text-2xl font-bold text-orange-500 mb-4 font-['Cinzel']">Access Denied</h2>
          <p className="text-zinc-300">
            You do not have the required permissions to view this secure area.
          </p>
          <a href="/" className="inline-block mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
