import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // first-time user should go to Data Input for onboarding
    navigate('/input');
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800/90 backdrop-blur rounded-3xl border border-white/10 shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-neon mb-2">AI Credit Score</h1>
        <p className="text-white/70 mb-6">Sign in to continue to your finance dashboard.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Email</label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon/60"
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Password</label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon/60"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-neon text-black font-semibold rounded-xl shadow-lg shadow-neon/30 hover:shadow-neon/60 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
