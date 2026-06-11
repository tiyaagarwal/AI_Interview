import { useEffect, useState } from 'react';
import { api } from '../api/client';
export default function AdminDashboard(){const [stats,setStats]=useState(null);useEffect(()=>{api.get('/dashboard/admin').then(r=>setStats(r.data.stats));},[]);if(!stats)return 'Loading admin...';return <div><h1 className="mb-6 text-4xl font-bold">Admin Dashboard</h1><div className="grid gap-4 md:grid-cols-4">{Object.entries(stats).map(([k,v])=><div className="card" key={k}><p className="text-slate-400">{k}</p><p className="text-2xl font-bold">{typeof v==='object'?JSON.stringify(v):v}</p></div>)}</div></div>}
