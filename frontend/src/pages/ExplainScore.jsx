const breakdown = [
  { label: 'Savings', value: 40, color: 'bg-neon' },
  { label: 'Bills', value: 20, color: 'bg-cyan-300' },
  { label: 'Overspending', value: 30, color: 'bg-warn' }
];

export default function ExplainScore() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Explain Score</h2>

      <div className="bg-card p-6 rounded-2xl shadow-lg">
        {breakdown.map((item) => (
          <div key={item.label} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{item.label}</span>
              <span>{item.value > 0 ? `+${item.value}` : item.value}</span>
            </div>
            <div className="h-3 rounded-full bg-white/10 overflow-hidden">
              <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
