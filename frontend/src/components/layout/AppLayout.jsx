import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const nav = ['dashboard', 'resumes', 'interviews', 'profile'];
  return <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
    <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/dashboard" className="flex items-center gap-2 text-xl font-bold"><BrainCircuit className="text-brand-500" /> AI Interview</Link>
        <nav className="hidden gap-4 md:flex">{nav.map((n) => <NavLink key={n} to={`/${n}`} className={({ isActive }) => isActive ? 'text-brand-500' : 'text-slate-300'}>{n}</NavLink>)}{user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}</nav>
        <button className="btn" onClick={() => { logout(); navigate('/login'); }}>Logout</button>
      </div>
    </header>
    <main className="mx-auto max-w-7xl px-6 py-8"><Outlet /></main>
  </div>;
}
