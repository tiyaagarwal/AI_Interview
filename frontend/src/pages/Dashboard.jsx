import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { TopicChart, TrendChart } from '../components/charts/ScoreCharts';
export default function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => { api.get('/dashboard/me').then((r) => setData(r.data)); }, []);
  if (!data) return 'Loading dashboard...';
  return <div className="space-y-6"><div className="flex items-center justify-between"><h1 className="text-4xl font-bold">Performance Dashboard</h1><Link className="btn" to="/interviews/new">New Interview</Link></div>
    <div className="grid gap-4 md:grid-cols-3">{Object.entries(data.stats).map(([k, v]) => <div className="card" key={k}><p className="text-slate-400">{k}</p><p className="text-3xl font-bold">{v}</p></div>)}</div>
    <div className="grid gap-6 lg:grid-cols-2"><section className="card"><h2 className="mb-4 text-xl font-bold">Improvement Trend</h2><TrendChart data={data.trend} /></section><section className="card"><h2 className="mb-4 text-xl font-bold">Topic Performance</h2><TopicChart data={data.topicPerformance} /></section></div>
    <section className="card"><h2 className="mb-4 text-xl font-bold">Interview History</h2>{data.history.map((i) => <Link className="block border-t border-white/10 py-3" to={`/interviews/${i._id}`} key={i._id}>{i.title} · {i.status}</Link>)}</section>
  </div>;
}
