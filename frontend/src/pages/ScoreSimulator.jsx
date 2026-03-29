import { useMemo, useState } from 'react';

export default function ScoreSimulator() {
  const [spending, setSpending] = useState(0);
  const [savings, setSavings] = useState(0);

  const baseScore = 712;
  const score = useMemo(() => Math.min(900, Math.max(300, baseScore - spending + savings)), [spending, savings]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Score Simulator</h2>
      <div className="bg-card p-6 rounded-2xl shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <span>Projected Score</span>
          <span className="text-3xl font-bold text-neon">{score}</span>
        </div>

        <div className="space-y-6">
          <div>
            <label className="flex justify-between text-sm text-white/80">Spending change ({spending} pts)</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={spending}
              onChange={(e) => setSpending(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>
          <div>
            <label className="flex justify-between text-sm text-white/80">Savings change (+{savings} pts)</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={savings}
              onChange={(e) => setSavings(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
