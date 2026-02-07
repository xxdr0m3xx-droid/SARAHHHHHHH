import React, { useState } from 'react';

interface AccessGateProps {
  onAccess: (key: string) => void;
  onAdminRequest: () => void;
}

export const AccessGate: React.FC<AccessGateProps> = ({ onAccess, onAdminRequest }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === '51825') {
      onAccess(key);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdf8f8] px-4 relative overflow-hidden">
      {/* Visual Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-rose-200/30 rounded-full blur-[120px] bg-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-pink-100/30 rounded-full blur-[120px] bg-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="z-10 w-full max-w-md text-center">
        <div className="mb-12 relative inline-block group cursor-pointer transition-transform duration-700 hover:scale-110">
           <div className="absolute inset-0 bg-pink-400 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
           <span className="text-9xl relative block animate-bounce" style={{ animationDuration: '4s' }}>💝</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-romantic text-rose-800 mb-6 drop-shadow-sm select-none">The Sanctuary</h1>
        <p className="text-rose-400 font-bold tracking-[0.4em] text-[10px] uppercase mb-12 select-none opacity-80">A Private World Built for You</p>

        <div className="bg-white/90 backdrop-blur-2xl rounded-[3.5rem] p-12 shadow-[0_30px_70px_rgba(255,182,193,0.3)] border border-white/60">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="relative">
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className={`w-full bg-rose-50/40 border-2 ${error ? 'border-red-300 animate-shake' : 'border-rose-100'} focus:border-rose-300 outline-none rounded-2xl px-6 py-6 text-center text-4xl tracking-[0.5em] transition-all font-serif text-rose-700 placeholder:text-rose-200`}
                placeholder="•••••"
                maxLength={5}
                autoFocus
              />
              {error && <span className="absolute -bottom-7 left-0 right-0 text-red-400 text-[11px] font-black uppercase tracking-widest">Access Denied, My Love</span>}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black py-6 rounded-2xl shadow-2xl shadow-rose-200 hover:shadow-rose-400 hover:-translate-y-1 active:scale-95 transition-all text-[11px] uppercase tracking-[0.3em]"
            >
              Unlock Memories
            </button>
          </form>

          <div className="mt-14 flex justify-between items-center text-[10px] text-rose-300 uppercase tracking-[0.2em] font-black">
            <button onClick={onAdminRequest} className="hover:text-rose-600 transition-colors py-2 opacity-60 hover:opacity-100">Owner Access</button>
            <span className="opacity-20">Secure • Encrypted</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 text-center opacity-40 px-8 max-w-lg">
        <p className="font-serif italic text-rose-900 leading-relaxed text-sm">"In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."</p>
      </div>

      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.2s ease-in-out 3; }
      `}</style>
    </div>
  );
};