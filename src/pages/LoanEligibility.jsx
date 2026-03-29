import { Award, Percent, CreditCard } from 'lucide-react';

export default function LoanEligibility() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Loan Eligibility</h2>
      <div className="bg-card rounded-2xl p-5 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border border-white/10 rounded-xl">
          <div className="flex items-center gap-2 text-neon"><Award size={18} /> Eligible amount</div>
          <p className="mt-2 text-3xl font-bold">$50,000</p>
        </div>
        <div className="p-4 border border-white/10 rounded-xl">
          <div className="flex items-center gap-2 text-amber-300"><Percent size={18} /> Interest range</div>
          <p className="mt-2 text-3xl font-bold">8–12%</p>
        </div>
        <div className="p-4 border border-white/10 rounded-xl">
          <div className="flex items-center gap-2 text-cyan-300"><CreditCard size={18} /> Loan type</div>
          <p className="mt-2 text-3xl font-bold">Personal Loan</p>
        </div>
      </div>
    </div>
  );
}
