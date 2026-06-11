import { api } from '../api/client';
import AuthForm from '../components/forms/AuthForm';
export default function ForgotPassword() { return <div className="grid min-h-screen place-items-center p-6"><AuthForm mode="Forgot Password" onSubmit={async (v) => { await api.post('/auth/forgot-password', v); alert('If the account exists, reset instructions were generated.'); }} /></div>; }
