import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/forms/AuthForm';
import { useAuth } from '../context/AuthContext';
export default function Register() { const auth = useAuth(); const navigate = useNavigate(); return <div className="grid min-h-screen place-items-center p-6"><div><AuthForm mode="Register" onSubmit={async (v) => { await auth.register(v); navigate('/dashboard'); }} /><p className="mt-4 text-center"><Link to="/login">Already have an account?</Link></p></div></div>; }
