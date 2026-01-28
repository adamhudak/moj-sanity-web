"use client";
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.ok) setStatus('success');
    else setStatus('error');
  }

  if (status === 'success') return <div className="p-4 bg-green-50 text-green-700 rounded-lg">Správa bola úspešne odoslaná!</div>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    {/* Meno */}
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700 ml-1">Meno a priezvisko</label>
      <input 
        name="name" 
        placeholder="Janko Hraško" 
        required 
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400" 
      />
    </div>

    {/* Email */}
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700 ml-1">E-mailová adresa</label>
      <input 
        name="email" 
        type="email" 
        placeholder="janko@priklad.sk" 
        required 
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400" 
      />
    </div>
  </div>

  {/* Správa */}
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-slate-700 ml-1">Vaša správa</label>
    <textarea 
      name="message" 
      placeholder="Napíšte nám, s čím vám môžeme pomôcť..." 
      rows={5} 
      required
      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400 resize-none" 
    />
  </div>

  {/* Tlačidlo */}
  <button 
    disabled={status === 'sending'}
    className="group relative flex items-center justify-center w-full md:w-max md:min-w-[200px] px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed overflow-hidden"
  >
    <span className={`transition-all ${status === 'sending' ? 'opacity-0' : 'opacity-100'}`}>
      Odoslať správu
    </span>
    
    {/* Animácia načítavania (zobrazí sa len pri sending) */}
    {status === 'sending' && (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    )}
  </button>
</form>
  );
}