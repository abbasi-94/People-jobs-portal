import { useState, useEffect, useCallback } from 'react';
import { getTheme, setTheme as setThemeData, loginUser, setSession, registerUser, clearSession, updateUser } from './data';

export function useTheme() {
  const [theme, setThemeState] = useState<'light' | 'dark'>(getTheme());
  const toggle = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light';
    setThemeState(next);
    setThemeData(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  }, [theme]);
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); }, [theme]);
  return { theme, toggle };
}

export function useToast() {
  const [toasts, setToasts] = useState<{ id: number; msg: string; type: 'success' | 'error' | 'info' }[]>([]);
  const show = useCallback((msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);
  return { toasts, show };
}

export function useAuth() {
  const [user, setUser] = useState(() => {
    try { const d = localStorage.getItem('jb_session'); return d ? JSON.parse(d) : null; } catch { return null; }
  });
  const login = useCallback((email: string, password: string) => {
    const u = loginUser(email, password);
    setSession(u);
    setUser(u);
    return u;
  }, []);
  const register = useCallback((data: any) => {
    const u = registerUser(data);
    setSession(u);
    setUser(u);
    return u;
  }, []);
  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);
  const update = useCallback((u: any) => {
    updateUser(u);
    setUser(u);
  }, []);
  return { user, login, register, logout, update, setUser };
}
