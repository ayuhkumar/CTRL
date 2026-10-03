'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { getJob, getVideoUrl, getExportUrl, type JobResponse, type StageInfo } from '@/lib/api';
import { subscribeToJob, type SSEEvent } from '@/lib/sse';
import { STAGE_NAMES, STAGE_LABELS } from '@/lib/types';

export default function JobPage() {
  const { id } = useParams() as { id: string };
  const [job, setJob] = useState<JobResponse | null>(null);
  const [logs, setLogs] = useState<{ id: number; timestamp: string; level: string; stage: string; message: string }[]>([]);
  const [isLive, setIsLive] = useState(true);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getJob(id)
      .then(data => {
        setJob(data);
        if (data.status === 'completed' || data.status === 'failed') setIsLive(false);
      })
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!isLive) return;
    let logId = 0;
    const cleanup = subscribeToJob(id, (event: SSEEvent) => {
      if (event.type === 'log') {
        setLogs(prev => [...prev, { id: logId++, ...event.data, timestamp: event.timestamp }]);
      } else if (['stage_start', 'stage_complete', 'stage_failed', 'job_complete', 'job_failed'].includes(event.type)) {
        getJob(id).then(setJob).catch(console.error);
        if (event.type === 'job_complete' || event.type === 'job_failed') setIsLive(false);
      }
    });
    return cleanup;
  }, [id, isLive]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-fade-in-up">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
          <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div className="text-slate-500 text-sm font-bold tracking-widest uppercase animate-pulse">Initializing Telemetry...</div>
      </div>
    );
  }

  const getStageStatus = (stageName: string): StageInfo['status'] => {
    const stage = job.stages.find(s => s.name === stageName);
    if (stage) return stage.status;
    if (job.current_stage === stageName) return 'running';
    return 'pending';
  };

  const getStageDuration = (stageName: string): string => {
    const stage = job.stages.find(s => s.name === stageName);
    if (stage && stage.duration_ms) return `${(stage.duration_ms / 1000).toFixed(1)}s`;
    return '';
  };

  const progressPercent = Math.max(5, Math.min(100, (STAGE_NAMES.findIndex(s => s === job.current_stage) + 1) / STAGE_NAMES.length * 100));

  return (
    <div className="w-full max-w-7xl mx-auto pt-8 pb-16 px-4 animate-fade-in-up">
      
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              {job.brief.topic}
            </h1>
            <span className={`px-3 py-1 text-[11px] uppercase font-bold tracking-widest rounded-lg border shadow-sm ${
              job.status === 'completed' ? 'border-emerald-200 text-emerald-700 bg-emerald-50' :
              job.status === 'failed' ? 'border-red-200 text-red-700 bg-red-50' :
              'border-blue-200 text-blue-700 bg-blue-50'
            }`}>
              {job.status}
            </span>
          </div>
          <p className="text-sm font-bold text-slate-400 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
            Job ID: <span className="font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">{job.id}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Pipeline Progress */}
          <div className="card-premium p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-700 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                Telemetry Pipeline
              </h2>
              {job.status === 'processing' && (
                <span className="text-xs font-bold text-blue-600 flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  PROCESSING
                </span>
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-8 border border-slate-200 shadow-inner">
              <div 
                className={`h-full rounded-full transition-all duration-700 ease-out shadow-sm ${job.status === 'failed' ? 'bg-red-500' : 'bg-blue-600'}`}
                style={{ width: `${job.status === 'completed' ? 100 : progressPercent}%` }}
              />
            </div>

            {/* Stage List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              {STAGE_NAMES.map((stageName, idx) => {
                const status = getStageStatus(stageName);
                const duration = getStageDuration(stageName);
                
                return (
                  <div key={stageName} className={`flex items-center p-3 rounded-2xl transition-all border ${
                    status === 'running' ? 'bg-white border-blue-200 shadow-md shadow-blue-500/10' : 
                    status === 'completed' ? 'bg-slate-50 border-slate-200 shadow-sm' :
                    'border-transparent'
                  }`}>
                    <div className="w-10 flex justify-center mr-2">
                      {status === 'completed' ? (
                        <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-sm">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                      ) : status === 'failed' ? (
                        <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center border border-red-200 shadow-sm">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </div>
                      ) : status === 'running' ? (
                        <div className="w-6 h-6 border-[3px] border-blue-100 border-t-blue-600 rounded-full animate-spin shadow-sm" />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs border border-slate-200">
                          {idx + 1}
                        </div>
                      )}
                    </div>

                    <div className={`flex-1 text-sm font-bold ${
                      status === 'pending' ? 'text-slate-400' : 
                      status === 'running' ? 'text-blue-700' :
                      'text-slate-700'
                    }`}>
                      {STAGE_LABELS[stageName]}
                    </div>

                    {duration && (
                      <div className="text-[10px] font-bold font-mono text-slate-500 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                        {duration}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Logs */}
          <div className="card-premium overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                Console Output
              </h2>
            </div>
            <div className="bg-[#0f172a] p-6 h-80 overflow-y-auto font-mono text-[12px] leading-relaxed shadow-inner">
              {logs.length === 0 ? (
                <div className="text-slate-500 italic flex items-center gap-2 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-600 animate-pulse" /> Awaiting data stream...
                </div>
              ) : (
                logs.map(log => (
                  <div key={log.id} className={`py-0.5 ${
                    log.level === 'error' ? 'text-red-400' : 
                    log.level === 'warning' ? 'text-amber-400' : 
                    'text-slate-300'
                  }`}>
                    <span className="text-slate-600 mr-3">[{new Date(log.timestamp).toLocaleTimeString([], {hour12: false})}]</span>
                    <span className="text-blue-400 mr-3 font-semibold">[{log.stage}]</span>
                    {log.message}
                  </div>
                ))
              )}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1">
          <div className="card-premium p-6 sticky top-24">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 text-center">
              Result Preview
            </h2>
            
            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-[9/16] rounded-[2rem] overflow-hidden bg-slate-900 border-[8px] border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] mb-8">
                {job.status === 'completed' && job.video_url ? (
                  <video 
                    src={getVideoUrl(job.id)} 
                    controls 
                    autoPlay 
                    loop
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : job.status === 'failed' ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-red-50">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4 border border-red-200">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    </div>
                    <span className="text-red-600 font-bold text-sm uppercase tracking-wider">Pipeline Error</span>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
                    <div className="relative w-20 h-20 flex items-center justify-center mb-6">
                      <div className="absolute inset-0 border-4 border-blue-50 rounded-full" />
                      <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin shadow-sm" />
                      <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Forging Asset</p>
                  </div>
                )}
              </div>

              {job.status === 'completed' && (
                <div className="w-full">
                  <a 
                    href={getExportUrl(job.id)}
                    download
                    className="btn-primary w-full py-4 mb-4 flex items-center justify-center gap-3 text-base shadow-lg shadow-blue-500/20"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download Master Pack
                  </a>
                  <p className="text-[12px] text-center text-slate-500 font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
                    ZIP includes MP4, thumbnail, raw subtitles (.ass), and metadata.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
