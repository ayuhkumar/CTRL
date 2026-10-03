'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createJob, getTrends, type BriefSpec, type TrendItem } from '@/lib/api';
import { COMMUNITY_OPTIONS, TONE_OPTIONS, LANGUAGE_OPTIONS, DURATION_OPTIONS, STYLE_OPTIONS } from '@/lib/types';

export default function HomePage() {
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [community, setCommunity] = useState('general');
  const [tone, setTone] = useState('energetic');
  const [language, setLanguage] = useState('en');
  const [duration, setDuration] = useState(30);
  const [style, setStyle] = useState('cinematic');
  const [isLoading, setIsLoading] = useState(false);
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    getTrends('all').then(setTrends).catch(console.error);
  }, []);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);

    try {
      const brief: BriefSpec = {
        topic: topic.trim(),
        community,
        tone: tone as any,
        language: language as any,
        duration_sec: duration as any,
        visual_style: style,
      };
      const result = await createJob(brief);
      router.push(`/jobs/${result.id}`);
    } catch (error) {
      console.error('Failed to create job:', error);
      alert('Failed to create job. Make sure the backend is running on port 8000.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center pt-20 pb-20 px-4">
      
      {/* ── Hero Section ────────────────────────────────────────── */}
      <div className="text-center max-w-4xl mx-auto mb-14 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest mb-8 border border-blue-100 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          Enterprise Video Engine
        </div>
        
        <h1 className="text-5xl md:text-[5rem] font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
          Forge content at <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            internet scale.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Automatically transform trending topics into publish-ready vertical videos with zero cost. The ultimate 12-stage pipeline for Qoneqt.
        </p>
      </div>

      {/* ── Input Card ──────────────────────────────────────────── */}
      <div className="w-full max-w-3xl mx-auto z-10 relative animate-fade-in-up delay-100">
        <div className="card-premium p-2">
          
          <div className="flex flex-col md:flex-row gap-2 relative z-10">
            <div className="relative flex-1 flex items-center group">
              <svg className="absolute left-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="What do you want to create a video about?"
                className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border-2 border-transparent focus:border-blue-500 rounded-xl outline-none pl-14 pr-4 py-4 text-base text-slate-900 placeholder:text-slate-400 font-medium transition-all shadow-inner focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={isLoading || !topic.trim()}
              className="btn-primary px-8 py-4 whitespace-nowrap md:w-auto w-full text-base shadow-lg shadow-blue-500/30"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                'Generate Video'
              )}
            </button>
          </div>

          <div className="flex justify-between items-center px-4 pt-4 pb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Press Enter to forge</span>
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1.5 uppercase tracking-wider bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-200 hover:bg-blue-50"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              {showOptions ? 'Hide Config' : 'Configuration'}
            </button>
          </div>

          {/* Configuration Drawer */}
          {showOptions && (
            <div className="p-5 mt-2 border-t border-slate-100 bg-slate-50/50 rounded-b-xl grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: 'Community Target', value: community, setter: setCommunity, options: COMMUNITY_OPTIONS },
                { label: 'Narrative Tone', value: tone, setter: setTone, options: TONE_OPTIONS },
                { label: 'Language', value: language, setter: setLanguage, options: LANGUAGE_OPTIONS },
                { label: 'Target Duration', value: String(duration), setter: (v: string) => setDuration(Number(v)), options: DURATION_OPTIONS.map(o => ({ value: String(o.value), label: o.label })) },
                { label: 'Visual Style', value: style, setter: setStyle, options: STYLE_OPTIONS },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-xs font-bold text-slate-500 mb-2 block uppercase tracking-wider">
                    {field.label}
                  </label>
                  <select
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    className="input-premium font-medium text-slate-700 shadow-sm"
                  >
                    {field.options.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Trending Section ────────────────────────────────────── */}
      {trends.length > 0 && (
        <div className="w-full max-w-4xl mx-auto mt-20 pt-10 animate-fade-in-up delay-200 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-200 rounded-full" />
          
          <div className="flex flex-col items-center text-center mb-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">Live Trending Topics</h3>
            <p className="text-sm font-medium text-slate-500">Sourced in real-time from HackerNews and Reddit</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {trends.slice(0, 10).map((trend, i) => (
              <button
                key={i}
                onClick={() => setTopic(trend.title)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-md flex items-center gap-2 group active:scale-95"
                title={`Source: ${trend.source}`}
              >
                <div className="w-5 h-5 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-blue-600">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                {trend.title.length > 45 ? trend.title.slice(0, 45) + '…' : trend.title}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* ── Feature Grid ────────────────────────────────────────── */}
      <div className="w-full max-w-5xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up delay-300">
        {[
          {
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="18" height="18" x="3" y="3" rx="4"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
            title: "Multi-Agent AI",
            desc: "12 distinct stages of processing, including deep research, dynamic scripting, and a self-critiquing quality gate."
          },
          {
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/></svg>,
            title: "Zero Failure Design",
            desc: "Built with a triple-fallback mechanism on every provider layer to ensure the pipeline never halts."
          },
          {
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
            title: "Cost Efficient",
            desc: "Operates entirely on optimized free tiers, effectively resulting in zero cost per generated video asset."
          }
        ].map((f, i) => (
          <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 mb-6 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors duration-300 shadow-sm">
              {f.icon}
            </div>
            <h3 className="font-bold text-lg text-slate-900 mb-3">{f.title}</h3>
            <p className="text-base text-slate-500 font-medium leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
}
