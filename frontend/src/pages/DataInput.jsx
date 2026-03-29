import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const sampleTransactions = [
  { id: 1, date: '2026-03-20', category: 'Food', amount: 450, description: 'Grocery shopping' },
  { id: 2, date: '2026-03-22', category: 'Transport', amount: 180, description: 'Fuel recharge' },
  { id: 3, date: '2026-03-25', category: 'Bills', amount: 1200, description: 'Electricity bill' }
];

export default function DataInput() {
  const [fileName, setFileName] = useState('');
  const [isFileValid, setIsFileValid] = useState(false);
  const [form, setForm] = useState({ date: '', category: 'Food', amount: '', description: '' });
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setFileName('');
      setIsFileValid(false);
      setMessage('No file selected');
      return;
    }

    const isCsv = file.name.toLowerCase().endsWith('.csv');
    const nameLower = file.name.toLowerCase();
    const containsValidTag = nameLower.includes('bill') || nameLower.includes('upi') || nameLower.includes('transaction');

    setFileName(file.name);

    if (!isCsv) {
      setIsFileValid(false);
      setMessage('Invalid file type. Please upload a CSV file.');
      return;
    }

    if (!containsValidTag) {
      setIsFileValid(false);
      setMessage('Invalid CSV - must be bill/upi/transaction data');
      return;
    }

    setIsFileValid(true);
    setMessage('Valid file uploaded successfully.');
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.date || !form.amount || !form.category) {
      setMessage('Please complete all required fields');
      return;
    }

    const newTx = {
      id: Date.now(),
      date: form.date,
      category: form.category,
      amount: Number(form.amount),
      description: form.description
    };

    setTransactions((prev) => [newTx, ...prev]);
    setForm({ ...form, amount: '', description: '' });
    setMessage('Transaction added successfully');
  };

  const handleGenerate = () => {
    navigate('/credit-score');
  };

  const loadSample = () => {
    setTransactions(sampleTransactions);
    setMessage('Sample data loaded successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Data Input</h2>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-sm text-white/80 border border-white/10 px-3 py-2 rounded-lg hover:bg-white/10 transition"
        >
          <Home size={16} />
          Go to Dashboard
        </button>
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg space-y-4">
        <h3 className="text-lg font-semibold">Section 1: File Upload</h3>
        <input type="file" accept=".csv" onChange={handleUpload} className="text-sm w-full text-white" />
        {fileName && <p className="text-sm text-white/70">Loaded: {fileName}</p>}
        {message && (
          <p className={`text-sm ${isFileValid ? 'text-green-200' : 'text-red-400'}`}>{message}</p>
        )}
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-3">Section 2: Manual Entry Form</h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-white/80">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
              className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="text-sm text-white/80">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg"
            >
              <option>Food</option>
              <option>Transport</option>
              <option>Bills</option>
              <option>Recharge</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-white/80">Amount</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
              className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg"
              placeholder="₹"
              required
            />
          </div>

          <div>
            <label className="text-sm text-white/80">Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg"
              placeholder="Optional description"
            />
          </div>

          <div className="md:col-span-2 flex gap-2 items-center">
            <button type="submit" className="px-4 py-2 bg-neon text-black rounded-lg hover:bg-neon/80 transition">
              Add Transaction
            </button>
            <button type="button" onClick={loadSample} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition">
              Load Sample Data
            </button>
          </div>
        </form>
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold">Section 3: Transaction List</h3>
        {transactions.length === 0 ? (
          <p className="text-white/70">No transactions added yet.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-3 bg-gray-900 rounded-lg border border-white/10">
                <div className="flex justify-between text-sm text-white/80">
                  <span>{tx.date}</span>
                  <span>{tx.category}</span>
                  <span className="text-neon">₹{tx.amount}</span>
                </div>
                <p className="text-xs text-white/60 mt-1">{tx.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg flex items-center justify-between">
        <p className="text-sm text-green-200">{message}</p>
        <button onClick={handleGenerate} className="px-4 py-2 bg-neon text-black rounded-lg hover:bg-neon/80 transition">
          Analyze & Generate Score
        </button>
      </div>
    </div>
  );
}
