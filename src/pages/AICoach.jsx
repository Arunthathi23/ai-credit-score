export default function AICoach() {
  const messages = [
    { from: 'user', text: 'How to improve score?' },
    { from: 'bot', text: 'Increase savings and reduce unnecessary expenses.' },
    { from: 'user', text: 'What should I focus on first?' },
    { from: 'bot', text: 'Focus on timely payments and lower credit utilization.' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">AI Coach</h2>
      <div className="bg-card rounded-2xl p-6 shadow-lg space-y-3 h-[70vh] overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-lg p-3 rounded-xl ${
              msg.from === 'bot' ? 'bg-white/10 self-start text-white' : 'bg-neon/20 self-end text-neon'
            }`}
          >
            <span className="block text-sm">{msg.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
