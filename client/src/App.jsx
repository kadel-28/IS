import { useMemo, useState } from 'react';
import { BookOpen, KeyRound, Lock, LogOut, ShieldCheck, Sparkles, UserRound } from 'lucide-react';
import axios from 'axios';
import RailFenceTool from './components/RailFenceTool';
import RsaTool from './components/RsaTool';
import HashLab from './components/HashLab';
import NotesWindow from './components/NotesWindow';

const tabs = [
  { id: 'rail', label: 'Rail Fence', icon: Lock },
  { id: 'rsa', label: 'RSA', icon: KeyRound },
  { id: 'hash', label: 'Hash Lab', icon: ShieldCheck },
  { id: 'notes', label: 'Theory', icon: BookOpen },
];

function App() {
  const [activeTab, setActiveTab] = useState('rail');
  const [authMode, setAuthMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const content = useMemo(() => {
    switch (activeTab) {
      case 'rsa':
        return <RsaTool />;
      case 'hash':
        return <HashLab />;
      case 'notes':
        return <NotesWindow />;
      default:
        return <RailFenceTool />;
    }
  }, [activeTab]);

  const handleAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(`http://localhost:5000${endpoint}`, { username, password });
      if (response.data.success) {
        setIsLoggedIn(true);
        setMessage(`${authMode === 'login' ? 'Welcome back' : 'Account created'} ${username}`);
      } else {
        setMessage(response.data.message || 'Authentication failed');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('rail');
    setUsername('');
    setPassword('');
    setMessage('You have been logged out.');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_30%),linear-gradient(135deg,#020617_0%,#111827_60%,#0f172a_100%)] p-4 text-slate-100 sm:p-6 lg:p-8">
      {!isLoggedIn ? (
        <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-5xl items-center justify-center">
          <div className="w-full overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/70 shadow-2xl shadow-slate-950/70 lg:grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 bg-gradient-to-br from-cyan-500/20 via-slate-900 to-slate-950 p-8">
              <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
                <Sparkles className="mr-2" size={16} /> Secure Crypto Demonstration
              </div>
              <div>
                <h1 className="text-3xl font-semibold sm:text-4xl">Information Security Lab</h1>
                <p className="mt-3 max-w-lg text-sm leading-7 text-slate-300">
                  Explore Rail Fence, RSA, hashing, and theory through a polished instructor-focused experience.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
                <p className="font-medium text-cyan-300">Demo highlights</p>
                <ul className="mt-2 space-y-2 text-slate-400">
                  <li>• Secure sign-up and login using SHA-256 password hashing</li>
                  <li>• Live hashing visualizer with MD5 and SHA-256 comparison</li>
                  <li>• Interactive RSA and Rail Fence tools with real-time results</li>
                </ul>
              </div>
            </div>
            <div className="p-8">
              <div className="flex rounded-full bg-slate-800/80 p-1">
                <button onClick={() => setAuthMode('login')} className={`flex-1 rounded-full px-3 py-2 text-sm font-medium ${authMode === 'login' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'}`}>Login</button>
                <button onClick={() => setAuthMode('register')} className={`flex-1 rounded-full px-3 py-2 text-sm font-medium ${authMode === 'register' ? 'bg-cyan-500 text-slate-950' : 'text-slate-300'}`}>Create account</button>
              </div>
              <form onSubmit={handleAuth} className="mt-6 space-y-4">
                <label className="block text-sm text-slate-300">
                  Username
                  <input value={username} onChange={(event) => setUsername(event.target.value)} required className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/80 p-3 text-slate-100 outline-none" placeholder="Enter username" />
                </label>
                <label className="block text-sm text-slate-300">
                  Password
                  <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/80 p-3 text-slate-100 outline-none" placeholder="Enter password" />
                </label>
                <button type="submit" disabled={loading} className="w-full rounded-full bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60">
                  {loading ? 'Working...' : authMode === 'login' ? 'Login' : 'Create account'}
                </button>
              </form>
              {message ? <p className="mt-4 text-sm text-cyan-200">{message}</p> : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-700/80 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/70 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Instructor dashboard</p>
              <h1 className="text-2xl font-semibold text-white">Crypto Concepts Playground</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 rounded-full border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-300">
                <UserRound size={16} />
                <span>{username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
            <aside className="rounded-3xl border border-slate-700/80 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/70">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Navigation</p>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${activeTab === tab.id ? 'bg-cyan-500/15 text-cyan-200' : 'text-slate-300 hover:bg-slate-800'}`}>
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </aside>
            <main>{content}</main>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
