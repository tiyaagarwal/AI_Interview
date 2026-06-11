import { useForm } from 'react-hook-form';
export default function AuthForm({ mode, onSubmit }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  return <form onSubmit={handleSubmit(onSubmit)} className="card mx-auto max-w-md space-y-4">
    <h1 className="text-3xl font-bold">{mode}</h1>
    {mode === 'Register' && <input className="input" placeholder="Name" {...register('name', { required: true })} />}
    <input className="input" placeholder="Email" type="email" {...register('email', { required: true })} />
    {mode !== 'Forgot Password' && <input className="input" placeholder="Password" type="password" {...register('password', { required: true })} />}
    <button className="btn w-full" disabled={isSubmitting}>{isSubmitting ? 'Please wait...' : mode}</button>
  </form>;
}
