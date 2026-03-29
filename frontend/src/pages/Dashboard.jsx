import { useEffect, useState } from 'react';
import { CreditCard, ShieldCheck, Bolt } from 'lucide-react';

const cards = [
  { title: 'Credit Score', value: '712', icon: CreditCard, color: 'text-neon' },
  { title: 'Risk Level', value: 'Low Risk', icon: ShieldCheck, color: 'text-green-300' },
  { title: 'Quick insights', value: '2 alerts available', icon: Bolt, color: 'text-amber-300' }
];

export default function Dashboard() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <span className="text-sm text-white/70">AI Credit Score Platform</span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-card rounded-2xl p-5 shadow-lg hover:shadow-2xl transition">
              <div className="flex items-center gap-3">
                <Icon className="w-6 h-6" />
                <h3 className="text-sm text-white/80">{card.title}</h3>
              </div>
              <div className="mt-4 text-3xl font-bold tracking-tight">
                {loaded ? card.value : <span className="animate-pulse bg-white/10 rounded w-28 h-8 inline-block" />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card p-5 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Latest Insights</h3>
        <p className="leading-relaxed text-white/80">Your credit score is stable with consistent payments. Keep the utilization low &amp; maintain savings for upgrades.</p>
      </div>
    </div>
  );
}
