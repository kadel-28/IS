import { useState } from 'react';
import { KeyRound, ShieldCheck, Sparkles } from 'lucide-react';
import axios from 'axios';

const RsaTool = () => {
  const [message, setMessage] = useState('Secret message');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const [loading, setLoading] = useState(false);

  const generateKeys = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/crypto/rsa/generate');
      setPublicKey(response.data.publicKey);
      setPrivateKey(response.data.privateKey);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const encryptMessage = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/crypto/rsa/encrypt', { message, publicKey });
      setEncrypted(response.data.encrypted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const decryptMessage = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/crypto/rsa/decrypt', { encryptedMessage: encrypted, privateKey });
      setDecrypted(response.data.decrypted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 rounded-2xl border border-slate-700/80 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/70">
      <div className="flex items-center gap-3 text-cyan-300">
        <KeyRound size={22} />
        <div>
          <h2 className="text-xl font-semibold">RSA Demo</h2>
          <p className="text-sm text-slate-400">Generate keys, encrypt with the public key, and decrypt with the private key.</p>
        </div>
      </div>

      <button onClick={generateKeys} className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60" disabled={loading}>
        <span className="mr-2 inline-flex"><Sparkles size={16} /></span>{loading ? 'Generating...' : 'Generate RSA Keys'}
      </button>

      <label className="block text-sm text-slate-300">
        Plaintext message
        <textarea value={message} onChange={(event) => setMessage(event.target.value)} className="mt-2 min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-100 outline-none" />
      </label>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="block text-sm text-slate-300">
          Public key
          <textarea value={publicKey} onChange={(event) => setPublicKey(event.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-slate-700 bg-slate-950/80 p-3 font-mono text-xs text-slate-100 outline-none" />
        </label>
        <label className="block text-sm text-slate-300">
          Private key
          <textarea value={privateKey} onChange={(event) => setPrivateKey(event.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-slate-700 bg-slate-950/80 p-3 font-mono text-xs text-slate-100 outline-none" />
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={encryptMessage} disabled={loading || !publicKey} className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700 disabled:opacity-60">
          <span className="mr-2 inline-flex"><ShieldCheck size={16} /></span>Encrypt with Public Key
        </button>
        <button onClick={decryptMessage} disabled={loading || !privateKey || !encrypted} className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700 disabled:opacity-60">
          <span className="mr-2 inline-flex"><ShieldCheck size={16} /></span>Decrypt with Private Key
        </button>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
        <p className="text-sm text-slate-400">Encrypted output</p>
        <p className="mt-2 break-all font-mono text-xs text-slate-100">{encrypted || 'No ciphertext yet'}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
        <p className="text-sm text-slate-400">Decrypted output</p>
        <p className="mt-2 break-all font-mono text-sm text-slate-100">{decrypted || 'No plaintext yet'}</p>
      </div>
    </div>
  );
};

export default RsaTool;
