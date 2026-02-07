
import React, { useState, useEffect } from 'react';
import { ContentItem, ANNIVERSARY_DATE } from '../types';

interface DashboardProps {
  content: ContentItem[];
  onLogout: () => void;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<number[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [...prev.slice(-10), Date.now()]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      {hearts.map(h => (
        <div 
          key={h} 
          className="absolute animate-float text-2xl"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: '110%',
            animationDuration: `${10 + Math.random() * 20}s` 
          }}
        >
          {Math.random() > 0.5 ? '🌸' : '💗'}
        </div>
      ))}
      <style>{`
        @keyframes float { 
          0% { transform: translateY(0) rotate(0); }
          100% { transform: translateY(-120vh) rotate(360deg); }
        }
        .animate-float { animation: float linear forwards; }
      `}</style>
    </div>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      let next = new Date(now.getFullYear(), ANNIVERSARY_DATE.month, ANNIVERSARY_DATE.day);
      if (now > next) next = new Date(now.getFullYear() + 1, ANNIVERSARY_DATE.month, ANNIVERSARY_DATE.day);
      const diff = next.getTime() - now.getTime();
      
      const last = new Date(next.getFullYear() - 1, ANNIVERSARY_DATE.month, ANNIVERSARY_DATE.day);
      const total = next.getTime() - last.getTime();
      setProgress(((now.getTime() - last.getTime()) / total) * 100);

      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        mins: Math.floor((diff / 60000) % 60),
        secs: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const Unit = ({ val, label }: { val: number, label: string }) => (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-serif font-bold text-rose-800">{val.toString().padStart(2, '0')}</span>
      <span className="text-[8px] uppercase font-black text-rose-300 tracking-tighter">{label}</span>
    </div>
  );

  return (
    <div className="w-full bg-white/40 backdrop-blur-xl p-8 rounded-[3rem] border border-white/60 shadow-sm text-center">
      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-400 mb-8">June 18 • Anniversary</h4>
      <div className="flex justify-around mb-8">
        <Unit val={timeLeft.days} label="Days" />
        <Unit val={timeLeft.hours} label="Hours" />
        <Unit val={timeLeft.mins} label="Mins" />
        <Unit val={timeLeft.secs} label="Secs" />
      </div>
      <div className="h-1.5 w-full bg-rose-100/50 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-rose-300 to-pink-500 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export const GirlfriendDashboard: React.FC<DashboardProps> = ({ content, onLogout }) => {
  const [kisses, setKisses] = useState<{ id: number; x: number; y: number }[]>([]);
  const sortedContent = [...content].sort((a, b) => b.timestamp - a.timestamp);

  const spawnKiss = (e: React.MouseEvent) => {
    setKisses(prev => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }]);
    setTimeout(() => setKisses(prev => prev.slice(1)), 1500);
  };

  return (
    <div className="min-h-screen bg-[#fffafa] relative" onClick={(e) => { if ((e.target as HTMLElement).tagName === 'DIV') spawnKiss(e); }}>
      <FloatingHearts />
      
      {/* Kiss Particles */}
      <div className="fixed inset-0 pointer-events-none z-[1000]">
        {kisses.map(k => (
          <div key={k.id} className="absolute text-3xl animate-kiss-float" style={{ left: k.x - 15, top: k.y - 15 }}>💋</div>
        ))}
      </div>

      <nav className="fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-10 z-[100] bg-white/40 backdrop-blur-2xl border-b border-rose-50">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-pulse">🕊️</span>
          <span className="font-romantic text-3xl text-rose-800 font-bold">Us Forever</span>
        </div>
        <button onClick={onLogout} className="px-8 py-3 rounded-2xl bg-white/60 text-rose-800 font-black text-[10px] uppercase tracking-widest border border-rose-100 hover:bg-rose-50 transition-all">Lock Sanctuary</button>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        <aside className="lg:col-span-4 space-y-10">
          <div className="p-10 bg-white/60 backdrop-blur-xl rounded-[3.5rem] border border-white/80 shadow-[0_20px_50px_rgba(255,182,193,0.1)] text-center">
            <div className="w-40 h-40 mx-auto rounded-full p-1.5 bg-gradient-to-tr from-rose-300 to-pink-200 mb-8">
               <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-6xl shadow-inner">👸</div>
            </div>
            <h2 className="text-4xl font-romantic text-rose-800 mb-2">My Everything</h2>
            <p className="text-[10px] font-black text-rose-300 uppercase tracking-widest mb-10">Treasured Forever</p>
            <Countdown />
          </div>

          <div className="p-10 bg-rose-50/50 rounded-[3rem] border border-rose-100 text-center">
             <h3 className="text-rose-900 font-serif italic text-lg mb-6 leading-relaxed">"Every day with you is my new favorite day."</h3>
             <button onClick={(e) => spawnKiss(e)} className="bg-rose-500 text-white px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-200 hover:scale-110 active:scale-95 transition-all">Send a Kiss 💋</button>
          </div>
        </aside>

        <main className="lg:col-span-8">
          {content.length === 0 ? (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center p-20 bg-white/40 backdrop-blur-lg rounded-[4rem] border border-white/60">
               <span className="text-6xl mb-6 opacity-30">✨</span>
               <h3 className="text-2xl font-serif text-rose-900 mb-2">The Garden is Waiting</h3>
               <p className="text-rose-400 text-sm italic">New memories will appear here soon...</p>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 gap-10">
              {sortedContent.map((item) => (
                <div key={item.id} className="break-inside-avoid mb-10 bg-white rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(255,182,193,0.2)] overflow-hidden border border-white hover:-translate-y-3 transition-all duration-700 group">
                  {item.type === 'photo' && (
                    <div className="relative overflow-hidden">
                      <img src={item.content} alt={item.title} className="w-full h-auto group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  )}

                  <div className="p-10">
                    <div className="flex items-center justify-between mb-6">
                       <h3 className="text-xl font-bold text-rose-900 font-serif">{item.title}</h3>
                       <span className="text-[8px] font-black text-rose-300 uppercase tracking-widest px-3 py-1 bg-rose-50 rounded-full">{item.type}</span>
                    </div>

                    {item.type === 'voice' && (
                      <div className="text-center py-4">
                        <div className="w-14 h-14 bg-rose-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg">🔊</div>
                        <audio controls src={item.content} className="w-full h-10 accent-rose-500" />
                      </div>
                    )}

                    {(item.type === 'poem' || item.type === 'memory') && (
                      <div className="font-serif italic text-rose-800 leading-[1.8] text-lg whitespace-pre-wrap selection:bg-rose-200">
                        {item.content}
                      </div>
                    )}

                    <div className="mt-8 pt-8 border-t border-rose-50 flex justify-between items-center text-[9px] font-black text-rose-200 uppercase tracking-[0.2em]">
                       <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                       <span className="text-rose-400">❤ Forever</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes kiss-float { 
          0% { transform: translateY(0) scale(1) rotate(0); opacity: 1; }
          100% { transform: translateY(-100px) scale(2) rotate(15deg); opacity: 0; }
        }
        .animate-kiss-float { animation: kiss-float 1.2s ease-out forwards; }
      `}</style>
    </div>
  );
};
