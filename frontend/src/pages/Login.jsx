import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/forms/AuthForm';
import { useAuth } from '../context/AuthContext';
export default function Login() { const auth = useAuth(); const navigate = useNavigate(); return <div className="grid min-h-screen place-items-center p-6"><div><AuthForm mode="Login" onSubmit={async (v) => { await auth.login(v); navigate('/dashboard'); }} /><p className="mt-4 text-center"><Link to="/register">Create account</Link> · <Link to="/forgot-password">Forgot password?</Link></p></div></div>; }
