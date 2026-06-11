import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
export default function Interviews(){const [items,setItems]=useState([]);useEffect(()=>{api.get('/interviews').then(r=>setItems(r.data.interviews));},[]);return <div className="space-y-6"><div className="flex justify-between"><h1 className="text-4xl font-bold">Interviews</h1><Link className="btn" to="/interviews/new">New</Link></div>{items.map(i=><Link className="card block" to={`/interviews/${i._id}`} key={i._id}><h2 className="text-xl font-bold">{i.title}</h2><p>{i.role} · {i.difficulty} · {i.status}</p></Link>)}</div>}
