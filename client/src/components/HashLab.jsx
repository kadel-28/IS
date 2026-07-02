import { useMemo, useState } from 'react';
import { Hash, Sparkles, ShieldCheck } from 'lucide-react';
import MD5 from 'crypto-js/md5';
import SHA256 from 'crypto-js/sha256';

const md5Hash = (value) => MD5(value).toString();
const sha256Hash = (value) => SHA256(value).toString();

const HashLab = () => {
  const [input, setInput] = useState('InstructorDemo123');

  const hashes = useMemo(() => ({
    md5: md5Hash(input),
    sha256: sha256Hash(input),
  }), [input]);

  const alteredInput = useMemo(() => {
    if (!input) return '';
    return input.endsWith('3') ? `${input.slice(0, -1)}4` : `${input}4`;
  }, [input]);

  const alteredHashes = useMemo(() => ({
    md5: md5Hash(alteredInput),
    sha256: sha256Hash(alteredInput),
  }), [alteredInput]);

  const byteLength = useMemo(() => new TextEncoder().encode(input).length, [input]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/70">
        <div className="flex items-center gap-3 text-cyan-300">
          <Hash size={22} />
          <h2 className="text-xl font-semibold">Live Hashing Visualizer</h2>
        </div>
        <p className="mt-2 text-sm text-slate-400">
          Type in the field to watch the digest change instantly. Small changes trigger very different output values.
        </p>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="mt-4 min-h-28 w-full rounded-xl border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-100 outline-none ring-0"
          placeholder="Enter text to hash"
        />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="flex items-center gap-2 text-amber-300">
              <Sparkles size={18} />
              <span className="text-sm font-medium">MD5</span>
            </div>
            <p className="mt-3 break-all font-mono text-sm text-slate-200">{hashes.md5}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="flex items-center gap-2 text-emerald-300">
              <ShieldCheck size={18} />
              <span className="text-sm font-medium">SHA-256</span>
            </div>
            <p className="mt-3 break-all font-mono text-sm text-slate-200">{hashes.sha256}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/70">
        <h3 className="text-lg font-semibold text-cyan-300">How the hashing process works</h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p className="font-medium text-white">Step-by-step view</p>
            <ol className="mt-3 space-y-2 text-slate-400">
              <li>1. The text is converted into bytes.</li>
              <li>2. The algorithm processes the message in fixed-size blocks.</li>
              <li>3. Each block is mixed with constants and bitwise operations.</li>
              <li>4. The final digest is produced as a fixed-length output.</li>
            </ol>
            <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/70 p-3 text-xs text-slate-400">
              <p>Current input: <span className="font-mono text-slate-200">{input}</span></p>
              <p>Byte length: <span className="font-mono text-slate-200">{byteLength}</span></p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
            <p className="font-medium text-white">Avalanche effect demo</p>
            <p className="mt-2 text-slate-400">
              Changing even one character causes the digest to change completely.
            </p>
            <div className="mt-3 space-y-2 text-xs">
              <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-2">
                <p className="text-slate-400">Original</p>
                <p className="mt-1 break-all font-mono text-slate-200">{input}</p>
                <p className="mt-1 break-all font-mono text-cyan-300">{hashes.sha256}</p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-2">
                <p className="text-slate-400">Changed</p>
                <p className="mt-1 break-all font-mono text-slate-200">{alteredInput}</p>
                <p className="mt-1 break-all font-mono text-cyan-300">{alteredHashes.sha256}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/70 shadow-xl shadow-slate-950/70">
        <div className="border-b border-slate-800 px-4 py-3 text-sm font-medium text-slate-300">
          Comparison matrix
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
            <thead className="bg-slate-950/80 text-slate-300">
              <tr>
                <th className="px-4 py-3">Feature</th>
                <th className="px-4 py-3">MD5</th>
                <th className="px-4 py-3">SHA-256</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-400">
              <tr>
                <td className="px-4 py-3">Output length</td>
                <td className="px-4 py-3">128-bit (32 hex chars)</td>
                <td className="px-4 py-3">256-bit (64 hex chars)</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Security status</td>
                <td className="px-4 py-3 text-rose-300">Outdated and broken for security</td>
                <td className="px-4 py-3 text-emerald-300">Strong and standard for modern use</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Real-world use</td>
                <td className="px-4 py-3">Used only for demo and legacy checks</td>
                <td className="px-4 py-3">Used for password hashing, file integrity, and certificates</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HashLab;
