import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('token')));
  useEffect(() => {
    if (!localStorage.getItem('token')) return;
    api.get('/auth/me').then(({ data }) => setUser(data.user)).finally(() => setLoading(false));
  }, []);
  const value = useMemo(() => ({
    user, loading,
    login: async (payload) => { const { data } = await api.post('/auth/login', payload); localStorage.setItem('token', data.token); setUser(data.user); },
    register: async (payload) => { const { data } = await api.post('/auth/register', payload); localStorage.setItem('token', data.token); setUser(data.user); },
    logout: () => { localStorage.removeItem('token'); setUser(null); },
    setUser
  }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
