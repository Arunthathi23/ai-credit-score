import { NavLink } from 'react-router-dom';
import { Home, ShieldCheck, Lightbulb, Wallet, SlidersHorizontal, Cpu, FileText, Info, Target } from 'lucide-react';

const menu = [
  { path: '/dashboard', name: 'Dashboard', icon: Home },
  { path: '/credit-score', name: 'Credit Score', icon: ShieldCheck },
  { path: '/insights', name: 'Insights', icon: Lightbulb },
  { path: '/loan-eligibility', name: 'Loan Eligibility', icon: Wallet },
  { path: '/score-simulator', name: 'Score Simulator', icon: SlidersHorizontal },
  { path: '/input', name: 'Add Data', icon: FileText },
  { path: '/ai-coach', name: 'AI Coach', icon: Cpu },
  { path: '/report', name: 'Report', icon: FileText },
  { path: '/explain-score', name: 'Explain Score', icon: Info },
  { path: '/goals', name: 'Goals', icon: Target }
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-surface shadow-xl min-h-screen p-4 hidden sm:block">
      <div className="mb-6 text-center border-b border-white/10 pb-4">
        <h1 className="text-xl font-bold tracking-wider">AI Credit Score</h1>
        <p className="text-xs text-white/60">Platform</p>
      </div>
      <nav className="space-y-2 scrollbar-thin overflow-y-auto max-h-[85vh] pr-1">
        {menu.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg text-sm transition hover:bg-white/10 ${
                  isActive ? 'bg-neon/20 text-neon' : 'text-white/70'
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
