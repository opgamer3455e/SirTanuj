import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { API_BASE_URL } from '@/config';

interface AppUser {
  id: string;
  email: string;
  name: string;
  username?: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
}

interface AuthContextType {
  appUser: AppUser | null;
  isLoading: boolean;
  sessionError: string | null;
  login: (user: AppUser) => void;
  logout: () => Promise<void>;
  secureFetch: (url: string, options?: RequestInit) => Promise<Response>;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setAppUser(data.user);
            setSessionError(null);
          }
        } else {
          if (isMounted) setAppUser(null);
        }
      } catch (err) {
        if (isMounted) setAppUser(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchUser();
    return () => { isMounted = false; };
  }, []);

  const login = (user: AppUser) => {
    setAppUser(user);
    setSessionError(null);
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    } catch (e) { /* ignore */ }
    setAppUser(null);
  };

  const refreshAuth = () => {
    setIsLoading(true);
    fetch(`${API_BASE_URL}/api/auth/me`, { credentials: 'include' })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => { setAppUser(data.user); setSessionError(null); })
      .catch(() => setAppUser(null))
      .finally(() => setIsLoading(false));
  };

  const secureFetch = async (url: string, options: RequestInit = {}) => {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      credentials: 'include',
      headers: {
        ...options.headers,
        'Content-Type': 'application/json'
      }
    });

    if (res.status === 401 || res.status === 403) {
      const err = await res.json();
      setSessionError(err.error);
      if (err.code === 'DEVICE_CONFLICT' || err.code === 'SESSION_EXPIRED') {
        setAppUser(null);
      }
      throw new Error(err.error);
    }

    return res;
  };

  return (
    <AuthContext.Provider value={{ appUser, isLoading, sessionError, login, logout, secureFetch, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
