import { useForm } from 'react-hook-form';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
export default function Profile(){const {user,setUser}=useAuth();const {register,handleSubmit}=useForm({defaultValues:user});return <form className="card mx-auto max-w-2xl space-y-4" onSubmit={handleSubmit(async(v)=>{const {data}=await api.patch('/auth/profile',v);setUser(data.user);})}><h1 className="text-3xl font-bold">Profile</h1><input className="input" {...register('name')} /><input className="input" {...register('targetRole')} placeholder="Target role"/><textarea className="input" {...register('bio')} placeholder="Bio"/><button className="btn">Save</button></form>}
