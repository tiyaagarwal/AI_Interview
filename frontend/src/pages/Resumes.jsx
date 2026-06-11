import { useEffect, useState } from 'react';
import { api } from '../api/client';
export default function Resumes() {
  const [resumes, setResumes] = useState([]); const [file, setFile] = useState(null); const [loading, setLoading] = useState(false);
  const load = () => api.get('/resumes').then((r) => setResumes(r.data.resumes));
  useEffect(() => { load(); }, []);
  async function upload(e) { e.preventDefault(); const fd = new FormData(); fd.append('resume', file); setLoading(true); await api.post('/resumes', fd); setLoading(false); setFile(null); load(); }
  return <div className="space-y-6"><h1 className="text-4xl font-bold">Resumes</h1><form className="card flex flex-col gap-4 md:flex-row" onSubmit={upload}><input className="input" type="file" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files[0])} /><button className="btn" disabled={!file || loading}>{loading ? 'Analyzing...' : 'Upload & Analyze'}</button></form><div className="grid gap-4">{resumes.map((r) => <article className="card" key={r._id}><a className="text-xl font-bold text-brand-500" href={r.fileUrl}>{r.originalName}</a><p className="mt-2 text-slate-300">{r.analysis?.summary}</p><p className="mt-2 text-sm">Skills: {r.analysis?.skills?.join(', ')}</p></article>)}</div></div>;
}
