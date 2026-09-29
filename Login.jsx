import React, { useState } from 'react';
import { loginUser } from './api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await loginUser(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      
      alert('Login Successful! Welcome ' + data.name);
      console.log('User Data:', data);
      navigate('/dashboard');

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.22),transparent_30%),linear-gradient(135deg,#020817_0%,#111827_35%,#1e1b4b_100%)] p-4 sm:p-6">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(15,23,42,0.8)] backdrop-blur-xl">
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center bg-slate-950/30 p-6 sm:p-10 md:p-12">
            <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200">
              AI coaching
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Practice like you mean it.
            </h1>
            <p className="mt-4 max-w-md text-base text-slate-300">
              Sharpen your technical depth, structure your answers, and prepare for interviews with real-world mock rounds.
            </p>

            <div className="mt-8 space-y-4 text-sm text-slate-200">
              {[
                'Mock interviews tailored to your target role',
                'Live score feedback and improvement guidance',
                'Resume-aware questions and smarter prep',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-3 py-3 backdrop-blur-sm">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-xs font-bold text-slate-950">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center p-6 sm:p-8 md:p-10">
            <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-slate-900/50 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-8">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-white">Welcome back</h2>
                <p className="mt-2 text-sm text-slate-400">Sign in to continue your interview streak</p>
              </div>

              {error && (
                <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-400">
                Don’t have an account?{' '}
                <span
                  onClick={() => navigate('/register')}
                  className="cursor-pointer font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  Create one
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;    