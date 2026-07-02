const NotesWindow = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/70">
        <h2 className="text-xl font-semibold text-cyan-300">Theory Notes</h2>
        <div className="mt-4 space-y-4 text-sm text-slate-300">
          <section>
            <h3 className="font-semibold text-white">Rail Fence Cipher</h3>
            <p>
              The Rail Fence Cipher is a transposition cipher. Instead of changing letters, it rearranges their order by writing them in a zig-zag pattern across several rails, then reading row by row.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-white">RSA Encryption</h3>
            <p>
              RSA is an asymmetric algorithm that uses a public key for encryption and a private key for decryption. This makes it suitable for secure key exchange and message confidentiality.
            </p>
          </section>
          <section>
            <h3 className="font-semibold text-white">Hashing and Password Storage</h3>
            <p>
              Hash functions are one-way transformations. Databases store hashes rather than plain text passwords because the hash cannot be easily reversed, making stolen credentials less useful.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NotesWindow;
