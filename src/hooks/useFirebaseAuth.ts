import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config';

interface AppUser {
  id: string;
  email: string;
  name: string;
  username?: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
}

export function useFirebaseAuth() {
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          credentials: 'include', // send cookies
        });

        if (response.ok) {
          const data = await response.json();
          setAppUser(data.user);
          setSessionError(null);
        } else {
          setAppUser(null);
          // If token expired, backend sends 401
        }
      } catch (err) {
        setAppUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
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
