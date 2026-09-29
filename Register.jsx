import React, { useState } from 'react';
import { registerUser } from './api';
import { useNavigate } from 'react-router-dom'; 

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user || data)); // User data save kiya
      alert('Registration Successful! Welcome ' + (data.name || data.user?.name));
      navigate('/dashboard'); 
      
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.22),transparent_32%),linear-gradient(135deg,#020817_0%,#111827_35%,#312e81_100%)] p-4 sm:p-6">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(15,23,42,0.8)] backdrop-blur-xl">
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center bg-slate-950/30 p-6 sm:p-10 md:p-12">
            <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-violet-200">
              Get started
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Build your edge.
            </h1>
            <p className="mt-4 max-w-md text-base text-slate-300">
              Create your profile, upload your resume, and start preparing for the companies you want to crack.
            </p>

            <div className="mt-8 space-y-4 text-sm text-slate-200">
              {[
                'Personalized preparation based on your goals',
                'Interview simulations for coding and technical rounds',
                'Track performance and improve every week',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-3 py-3 backdrop-blur-sm">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-purple-500 text-xs font-bold text-slate-950">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center p-6 sm:p-8 md:p-10">
            <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-slate-900/50 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-8">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-white">Create account</h2>
                <p className="mt-2 text-sm text-slate-400">Start your interview prep journey</p>
              </div>

              {error && (
                <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
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
                    className="w-full rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
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
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-400">
                Already have an account?{' '}
                <span
                  onClick={() => navigate('/login')}
                  className="cursor-pointer font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  Sign in
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;