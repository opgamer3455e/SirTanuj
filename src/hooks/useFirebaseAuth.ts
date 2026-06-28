import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config';

interface AppUser {
  id: string;
  email: string;
  name: string;
  username?: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
}

let globalAuthPromise: Promise<any> | null = null;

export function useFirebaseAuth() {
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        if (!globalAuthPromise) {
          globalAuthPromise = fetch(`${API_BASE_URL}/api/auth/me`, {
            credentials: 'include',
          }).then(res => {
            if (!res.ok) throw res;
            return res.json();
          });
        }

        const data = await globalAuthPromise;
        if (isMounted) {
          setAppUser(data.user);
          setSessionError(null);
        }
      } catch (err) {
        if (isMounted) {
          setAppUser(null);
        }
        // Clear promise after a short delay so user can try logging in again later
        setTimeout(() => { globalAuthPromise = null; }, 1000);
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
    } catch(e) {}
    setAppUser(null);
  };

  // Helper method to make API calls with cookies
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
         setAppUser(null); // Force local logout
      }
      throw new Error(err.error);
    }
    
    return res;
  };

  return { appUser, isLoading, sessionError, login, logout, secureFetch };
}
