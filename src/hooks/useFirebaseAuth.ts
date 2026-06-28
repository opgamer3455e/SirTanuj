// Legacy compatibility wrapper — all components that import useFirebaseAuth
// now get the same shared auth state from AuthContext.
export { useAuth as useFirebaseAuth } from '@/context/AuthContext';
