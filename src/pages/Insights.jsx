import { Sparkles, CalendarCheck, ShoppingBag } from 'lucide-react';

const insights = [
  { title: 'Strong savings habit', description: 'You are building a solid emergency fund.', icon: Sparkles, status: 'positive' },
  { title: 'Consistent bill payments', description: 'No late payments for past 8 months.', icon: CalendarCheck, status: 'positive' },
  { title: 'High spending on food', description: 'Consider reducing dining out to improve score.', icon: ShoppingBag, status: 'warning' }
];

export default function Insights() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="bg-card rounded-2xl p-5 shadow-lg hover:shadow-2xl transition">
              <div className="flex items-center gap-3 mb-4">
                <span className={`p-2 rounded-lg ${item.status === 'positive' ? 'bg-green-500/20 text-neon' : 'bg-warn/20 text-warn'}`}>
                  <Icon size={20} />
                </span>
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <p className="text-sm text-white/70">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
