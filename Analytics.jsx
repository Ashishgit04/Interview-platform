import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { getInterviewStats } from './api';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalInterviews: 0, averageScore: 0, bestScore: 0 });

  const performanceData = [
    { name: 'Interview 1', score: 65 },
    { name: 'Interview 2', score: 72 },
    { name: 'Interview 3', score: 68 },
    { name: 'Interview 4', score: 85 },
    { name: 'Interview 5', score: 90 },
    { name: 'Interview 6', score: 88 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getInterviewStats();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="mb-8">
        <h2 className="mb-2 text-3xl font-bold text-white">📊 Performance Analytics</h2>
        <p className="text-slate-400">Track your interview progress and score improvements over time.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { icon: '🏆', title: 'Best Score', value: loading ? '...' : `${stats.bestScore || 90}/100`, color: 'text-emerald-300', bg: 'from-emerald-500/15 to-emerald-500/5' },
          { icon: '🎯', title: 'Total Interviews', value: loading ? '...' : stats.totalInterviews || 6, color: 'text-cyan-300', bg: 'from-cyan-500/15 to-cyan-500/5' },
          { icon: '📈', title: 'Average Score', value: loading ? '...' : `${stats.averageScore || 78}%`, color: 'text-violet-300', bg: 'from-violet-500/15 to-violet-500/5' },
        ].map((card) => (
          <div key={card.title} className={`rounded-[28px] border border-white/10 bg-gradient-to-br ${card.bg} p-6 shadow-[0_20px_40px_rgba(15,23,42,0.35)] backdrop-blur-xl`}>
            <div className="mb-3 text-3xl">{card.icon}</div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">{card.title}</h3>
            <p className={`mt-3 text-3xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[28px] border border-white/10 bg-slate-900/55 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-bold text-white">📈 Score Progression Trend</h3>
          <span className="w-fit rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">Last 6 Interviews</span>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" style={{ fontSize: '13px' }} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '13px' }} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid rgba(148, 163, 184, 0.35)',
                  borderRadius: '16px',
                  boxShadow: '0 14px 30px rgba(15, 23, 42, 0.5)',
                }}
                labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                itemStyle={{ color: '#c4b5fd' }}
              />
              <Area type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-[28px] border border-blue-500/20 bg-blue-500/10 p-6 text-slate-200 shadow-[0_20px_40px_rgba(37,99,235,0.12)] backdrop-blur-xl">
        <div className="flex items-start gap-4">
          <span className="text-3xl">💡</span>
          <div>
            <h4 className="mb-1 text-lg font-semibold text-cyan-200">Pro Tip for Improvement</h4>
            <p className="text-sm leading-relaxed text-slate-200">
              Your scores show a consistent upward trend! 🚀 Focus on explaining your thought process clearly during complex questions and keep practicing structured answers to increase consistency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;