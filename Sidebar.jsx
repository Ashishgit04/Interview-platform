import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const primaryMenu = [
    { name: 'Dashboard', path: '/dashboard', icon: '▣' },
    { name: 'Interview', path: '/difficulty', icon: '◉' },
    { name: 'Insight', path: '/analytics', icon: '◌' },
    { name: 'Talent', path: '/profile', icon: '◍' },
  ];

  const generalMenu = [
    { name: 'FAQ', path: '/history', icon: '◐' },
    { name: 'Setting', path: '/resume', icon: '◔' },
  ];

  const handleNavigation = (path) => {
    if (path === '/login') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    navigate(path);
  };

  return (
    <aside className="fixed left-0 top-0 z-10 flex h-screen w-64 flex-col justify-between border-r border-[#2c2c32] bg-[#1a1d21] px-4 py-5 text-white">
      <div>
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#5a3dff] text-xs font-bold text-white shadow-[0_8px_20px_rgba(90,61,255,0.7)]">
            i
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white">InterviewAI</h1>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="mb-3 px-2 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Main Menu</p>
            <div className="space-y-1.5">
              {primaryMenu.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/')
                      ? 'bg-[#2a2f3c] text-white shadow-inner'
                      : 'text-slate-300 hover:bg-[#22262d] hover:text-white'
                  }`}
                >
                  <span className={`flex h-5 w-5 items-center justify-center text-[11px] ${location.pathname === item.path ? 'text-violet-300' : 'text-slate-400'}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 px-2 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">General</p>
            <div className="space-y-1.5">
              {generalMenu.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-300 transition hover:bg-[#22262d] hover:text-white"
                >
                  <span className="flex h-5 w-5 items-center justify-center text-[11px] text-slate-400">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => handleNavigation('/login')}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-200 transition hover:bg-white/10"
      >
        <span className="text-base">⎋</span>
        <span>Log Out</span>
      </button>
    </aside>
  );
};

export default Sidebar;