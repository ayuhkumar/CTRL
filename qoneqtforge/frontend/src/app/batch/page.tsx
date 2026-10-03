'use client';

import { useState } from 'react';
import { createBatch } from '@/lib/api';
import { COMMUNITY_OPTIONS, TONE_OPTIONS, LANGUAGE_OPTIONS, DURATION_OPTIONS, STYLE_OPTIONS } from '@/lib/types';

export default function BatchPage() {
  const [topicsInput, setTopicsInput] = useState('');
  const [community, setCommunity] = useState('general');
  const [tone, setTone] = useState('energetic');
  const [language, setLanguage] = useState('en');
  const [duration, setDuration] = useState(30);
  const [style, setStyle] = useState('cinematic');
  const [isLoading, setIsLoading] = useState(false);
  const [batchResult, setBatchResult] = useState<{ job_ids: string[]; count: number } | null>(null);

  const topicsList = topicsInput
    .split('\n')
    .map(t => t.trim())
    .filter(t => t.length > 0);

  const handleGenerateBatch = async () => {
    if (topicsList.length === 0) return;
    setIsLoading(true);

    try {
      const result = await createBatch(topicsList, {
        community,
        tone: tone as any,
        language: language as any,
        duration_sec: duration as any,
        visual_style: style,
      });
      setBatchResult(result);
    } catch (error) {
      console.error('Failed to create batch:', error);
      alert('Failed to create batch jobs.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pt-10 px-4 animate-fade-in-up">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">Batch Processing</h1>
        <p className="text-lg font-medium text-slate-500 max-w-2xl">Queue multiple topics at once. The orchestrator will automatically provision workers and process them in parallel.</p>
      </div>

      {!batchResult ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Topics Input */}
          <div className="lg:col-span-2">
            <div className="card-premium overflow-hidden">
              <div className="p-8">
                <h2 className="text-lg font-bold text-slate-900 mb-2">Topic Queue</h2>
                <p className="text-sm font-medium text-slate-500 mb-6">Enter one topic per line. We recommend a maximum of 10 concurrent topics for optimal generation speed.</p>
                
                <textarea
                  value={topicsInput}
                  onChange={(e) => setTopicsInput(e.target.value)}
                  placeholder="The history of artificial intelligence&#10;How black holes work&#10;Top startup hubs in 2026..."
                  className="w-full h-80 p-5 text-sm font-mono resize-none border-2 border-slate-200 rounded-2xl bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-400 shadow-inner"
                  disabled={isLoading}
                />
              </div>
              
              <div className="flex items-center justify-between p-6 bg-slate-50 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-slate-700">
                    {topicsList.length} topic{topicsList.length !== 1 ? 's' : ''} detected
                  </span>
                </div>
                <button
                  onClick={handleGenerateBatch}
                  disabled={isLoading || topicsList.length === 0}
                  className="btn-primary px-8 py-3 text-base"
                >
                  {isLoading ? 'Queueing jobs...' : `Queue ${topicsList.length} Videos`}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Settings */}
          <div>
            <div className="card-premium p-8 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                </div>
                Global Settings
              </h2>
              
              <div className="space-y-6">
                {[
                  { label: 'Community', value: community, setter: setCommunity, options: COMMUNITY_OPTIONS },
                  { label: 'Tone', value: tone, setter: setTone, options: TONE_OPTIONS },
                  { label: 'Language', value: language, setter: setLanguage, options: LANGUAGE_OPTIONS },
                  { label: 'Duration', value: String(duration), setter: (v: string) => setDuration(Number(v)), options: DURATION_OPTIONS.map(o => ({ value: String(o.value), label: o.label })) },
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
            </div>
          </div>
        </div>
      ) : (
        /* Success State */
        <div className="card-premium p-12 text-center max-w-2xl mx-auto shadow-lg animate-fade-in-up">
          <div className="w-20 h-20 bg-emerald-100 border-4 border-white shadow-md text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Batch Queued Successfully</h2>
          <p className="text-lg font-medium text-slate-500 mb-10">
            {batchResult.count} videos have been dispatched to the pipeline orchestrator.
          </p>
          
          <div className="space-y-4 mb-10 text-left max-w-md mx-auto">
            {batchResult.job_ids.map((id, index) => (
              <a 
                key={id}
                href={`/jobs/${id}`}
                target="_blank"
                rel="noreferrer"
                className="flex justify-between items-center p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-blue-300 transition-all shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-600 font-bold text-sm shadow-sm transition-colors">
                    {index + 1}
                  </div>
                  <span className="font-bold text-slate-700 group-hover:text-slate-900">Pipeline Job</span>
                </div>
                <span className="text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 group-hover:border-blue-200">
                  Track
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </span>
              </a>
            ))}
          </div>
          
          <button 
            onClick={() => {
              setBatchResult(null);
              setTopicsInput('');
            }}
            className="btn-secondary px-8 py-3"
          >
            Queue Another Batch
          </button>
        </div>
      )}
    </div>
  );
}
