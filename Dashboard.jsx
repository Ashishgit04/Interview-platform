import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const sessionTypes = ['Behavioral', 'Technical', 'HR', 'Leadership'];
const durations = ['5 min', '15 min', '30 min', '45 min'];
const feedback = [
  { label: 'Clarity', value: 82, color: 'bg-violet-500' },
  { label: 'Relevance', value: 76, color: 'bg-cyan-500' },
  { label: 'Confidence', value: 68, color: 'bg-amber-400' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = userData?.name || 'there';
  const [sessionType, setSessionType] = useState('Behavioral');
  const [duration, setDuration] = useState('15 min');
  const [isLive, setIsLive] = useState(false);

  return (
    <div className="min-h-[calc(100vh-2rem)] bg-[#f7f7f8] p-1 text-slate-800 md:p-3">
      <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">AI interview studio</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Practice room</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/history')} className="hidden rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-violet-300 hover:text-violet-600 sm:block">Past sessions</button>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-1.5 pr-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold text-white">{userName.charAt(0).toUpperCase()}</span>
            <span className="text-sm font-medium text-slate-700">{userName}</span>
          </div>
        </div>
      </header>

      <div className="grid gap-5 p-3 md:p-5 xl:grid-cols-[minmax(0,1.4fr)_360px]">
        <main className="space-y-5">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_15px_40px_rgba(15,23,42,0.06)] md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600"><span className="h-2 w-2 rounded-full bg-emerald-500" />{isLive ? 'Session in progress' : 'Ready to practice'}</div>
                <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Welcome back, {userName}</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Set up a focused session, speak naturally, and get instant feedback on the way you answer.</p>
              </div>
              <span className="rounded-xl bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">2 sessions recommended today</span>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr_0.8fr]">
              <label className="block"><span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Target role</span><select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"><option>UI/UX Designer</option><option>Frontend Engineer</option><option>Product Manager</option><option>Data Analyst</option></select></label>
              <div><span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Interview type</span><div className="grid grid-cols-2 gap-2">{sessionTypes.map((type) => <button key={type} onClick={() => setSessionType(type)} className={`rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition ${sessionType === type ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-violet-200'}`}>{type}</button>)}</div></div>
              <div><span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Duration</span><div className="grid grid-cols-2 gap-2">{durations.map((item) => <button key={item} onClick={() => setDuration(item)} className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${duration === item ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-violet-200'}`}>{item}</button>)}</div></div>
            </div>

            <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-violet-100 bg-violet-50/70 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-xl text-white">+</div><div><p className="text-sm font-semibold text-slate-800">Personalize with your resume</p><p className="text-xs text-slate-500">Get questions tailored to your experience.</p></div></div><button onClick={() => navigate('/resume')} className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm transition hover:bg-violet-600 hover:text-white">Upload resume</button></div>
          </section>

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.16)] md:p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">{sessionType} round</p><h2 className="mt-1 text-xl font-bold text-white">Speak your answer out loud</h2></div><div className="flex items-center gap-2 text-xs text-slate-400"><span className="h-2 w-2 rounded-full bg-emerald-400" />AI interviewer online</div></div>
            <div className="relative flex min-h-[290px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.3),transparent_42%),linear-gradient(135deg,#111827,#020617)] p-6"><div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" /><div className="relative flex flex-col items-center text-center"><div className={`mb-5 flex h-28 w-28 items-center justify-center rounded-full border border-violet-300/40 bg-violet-500/20 shadow-[0_0_80px_rgba(139,92,246,0.45)] ${isLive ? 'animate-pulse' : ''}`}><div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 text-3xl text-white">AI</div></div><p className="text-lg font-semibold text-white">{isLive ? 'Tell me about a project you are proud of.' : 'Your interviewer is ready'}</p><p className="mt-2 max-w-md text-sm leading-6 text-slate-400">{isLive ? 'Take a moment to think. Your answer will be analyzed for clarity, relevance, and confidence.' : `Start a ${duration} ${sessionType.toLowerCase()} session with voice coaching and adaptive follow-up questions.`}</p></div><div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/10 p-2 backdrop-blur-md"><button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white transition hover:bg-white/20">mic</button><button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white transition hover:bg-white/20">cam</button><button onClick={() => setIsLive(!isLive)} className={`flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-white transition ${isLive ? 'bg-rose-500' : 'bg-violet-600 hover:bg-violet-500'}`}>{isLive ? 'End session' : 'Start interview'}</button></div></div>
          </section>
        </main>

        <aside className="space-y-5">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_15px_40px_rgba(15,23,42,0.06)]"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Live feedback</p><h2 className="mt-1 text-xl font-bold text-slate-900">Your score</h2></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">Good start</span></div><div className="my-6 flex items-center gap-4 rounded-2xl bg-slate-50 p-4"><div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[conic-gradient(#7c3aed_0_78%,#e2e8f0_78%)]"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-bold text-violet-700">78</div></div><div><p className="text-sm font-semibold text-slate-800">Overall readiness</p><p className="mt-1 text-xs leading-5 text-slate-500">Keep your answers structured and specific.</p></div></div><div className="space-y-4">{feedback.map((item) => <div key={item.label}><div className="mb-1.5 flex justify-between text-xs font-medium text-slate-600"><span>{item.label}</span><span>{item.value}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} /></div></div>)}</div></section>
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_15px_40px_rgba(15,23,42,0.06)]"><div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Your progress</p><h2 className="mt-1 text-xl font-bold text-slate-900">Keep the streak alive</h2></div><span className="text-2xl">✦</span></div><div className="grid grid-cols-3 gap-2 text-center"><div className="rounded-2xl bg-violet-50 p-3"><p className="text-xl font-bold text-violet-700">12</p><p className="mt-1 text-[11px] text-slate-500">day streak</p></div><div className="rounded-2xl bg-cyan-50 p-3"><p className="text-xl font-bold text-cyan-700">24</p><p className="mt-1 text-[11px] text-slate-500">interviews</p></div><div className="rounded-2xl bg-amber-50 p-3"><p className="text-xl font-bold text-amber-700">88%</p><p className="mt-1 text-[11px] text-slate-500">avg score</p></div></div></section>
          <button onClick={() => navigate('/analytics')} className="flex w-full items-center justify-between rounded-3xl bg-slate-900 p-5 text-left text-white shadow-[0_15px_40px_rgba(15,23,42,0.14)] transition hover:bg-violet-700"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">Go deeper</p><p className="mt-1 font-semibold">View detailed analytics</p></div><span className="text-xl">-&gt;</span></button>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
