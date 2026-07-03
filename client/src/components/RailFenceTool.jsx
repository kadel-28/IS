import { useState } from 'react';
import { Lock, Unlock, Wand2 } from 'lucide-react';
import axios from 'axios';

const RailFenceTool = () => {
  const [mode, setMode] = useState('encrypt');
  const [plaintext, setPlaintext] = useState('SECURITY');
  const [ciphertext, setCiphertext] = useState('');
  const [rails, setRails] = useState(3);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const performAction = async () => {
    setLoading(true);
    try {
      const endpoint = mode === 'encrypt' ? '/api/crypto/rail-fence/encrypt' : '/api/crypto/rail-fence/decrypt';
      const payload = mode === 'encrypt'
        ? { plaintext, rails }
        : { ciphertext: plaintext, rails };
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, payload);
      setCiphertext(response.data.ciphertext || response.data.plaintext || '');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/70">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-cyan-300">Rail Fence Cipher</h2>
          <p className="mt-2 text-sm text-slate-400">Demonstrate a transposition cipher with a zig-zag rail layout.</p>
        </div>
        <div className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-xs text-slate-300">
          {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={() => setMode('encrypt')} className={`rounded-full px-4 py-2 text-sm ${mode === 'encrypt' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
          <span className="mr-2 inline-flex"><Lock size={16} /></span>Encrypt
        </button>
        <button onClick={() => setMode('decrypt')} className={`rounded-full px-4 py-2 text-sm ${mode === 'decrypt' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
          <span className="mr-2 inline-flex"><Unlock size={16} /></span>Decrypt
        </button>
      </div>

      <label className="mt-6 block text-sm text-slate-300">
        Input
        <textarea value={plaintext} onChange={(event) => setPlaintext(event.target.value)} className="mt-2 min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-100 outline-none" />
      </label>

      <label className="mt-4 block text-sm text-slate-300">
        Rails
        <input type="number" min="2" max="8" value={rails} onChange={(event) => setRails(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-100 outline-none" />
      </label>

      <button onClick={performAction} disabled={loading} className="mt-6 flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60">
        <Wand2 size={16} />
        {loading ? 'Working...' : mode === 'encrypt' ? 'Encrypt Message' : 'Decrypt Message'}
      </button>

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
        <p className="text-sm text-slate-400">Result</p>
        <p className="mt-2 break-all font-mono text-sm text-slate-100">{ciphertext || 'Awaiting transformation...'}</p>
      </div>
    </div>
  );
};

export default RailFenceTool;
