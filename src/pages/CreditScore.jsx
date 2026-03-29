import { RadialBarChart, RadialBar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ShieldCheck } from 'lucide-react';

const scoreData = [{ name: 'score', value: 79, fill: '#39ff14' }];
const trendData = [
  { month: 'Jan', score: 690 },
  { month: 'Feb', score: 702 },
  { month: 'Mar', score: 705 },
  { month: 'Apr', score: 710 },
  { month: 'May', score: 712 },
  { month: 'Jun', score: 716 }
];

export default function CreditScore() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Credit Score</h2>
        <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" /> Low Risk
        </span>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-2xl p-5 shadow-lg flex flex-col items-center justify-center">
          <h3 className="text-white/70 uppercase tracking-wide text-xs">Current Score</h3>
          <p className="text-5xl font-bold text-neon mt-2">712</p>
          <p className="text-xs text-white/60 mt-1">712 / 900</p>
          <div className="w-full h-52 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={scoreData} startAngle={180} endAngle={0}>
                <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={12} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-lg">
          <h3 className="text-lg font-semibold mb-3">Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3b4a66" />
                <XAxis dataKey="month" stroke="#9aa4bd" />
                <YAxis stroke="#9aa4bd" domain={[680, 730]} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1225', borderColor: '#33415a' }} />
                <Line type="monotone" dataKey="score" stroke="#39ff14" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
