export default function Goals() {
  const progress = 62;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Goals</h2>
      <div className="bg-card p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold">Weekly goal</h3>
        <p className="text-white/80 mb-4">Save ₹1000</p>
        <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-neon" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-sm text-white/70 mt-2">Progress: {progress}%</p>
        <p className="mt-4 text-green-300">Great job! You’re on track to exceed your weekly target.</p>
      </div>
    </div>
  );
}
