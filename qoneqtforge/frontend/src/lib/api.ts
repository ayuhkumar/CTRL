/* ── QoneqtForge API Client ──────────────────────────────────── */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api` : 'http://127.0.0.1:8000/api';

/* ── Types ──────────────────────────────────────────────────── */

export interface BriefSpec {
  topic: string;
  source_type?: string;
  community: string;
  tone: string;
  language: string;
  duration_sec: number;
  voice?: string | null;
  visual_style: string;
}

export interface StageInfo {
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  started_at: string | null;
  completed_at: string | null;
  duration_ms: number | null;
  error: string | null;
}

export interface JobResponse {
  id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  brief: BriefSpec;
  stages: StageInfo[];
  current_stage: string | null;
  created_at: string;
  updated_at: string | null;
  error: string | null;
  video_url: string | null;
}

export interface TrendItem {
  title: string;
  source: string;
  url: string | null;
  score: number | null;
}

/* ── API Functions ──────────────────────────────────────────── */

export async function createJob(brief: BriefSpec): Promise<{ id: string; status: string }> {
  const res = await fetch(`${API_BASE}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ brief }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => 'Unknown error');
    throw new Error(`Failed to create job: ${detail}`);
  }
  return res.json();
}

export async function getJob(jobId: string): Promise<JobResponse> {
  const res = await fetch(`${API_BASE}/jobs/${jobId}`);
  if (!res.ok) throw new Error(`Failed to get job: ${res.statusText}`);
  return res.json();
}

export async function getTrends(source: string = 'all'): Promise<TrendItem[]> {
  try {
    const res = await fetch(`${API_BASE}/trends?source=${source}`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export function getVideoUrl(jobId: string): string {
  return `${API_BASE}/jobs/${jobId}/video`;
}

export function getExportUrl(jobId: string): string {
  return `${API_BASE}/jobs/${jobId}/export`;
}

export async function createBatch(topics: string[], settings: Partial<BriefSpec>): Promise<{ job_ids: string[]; count: number }> {
  const res = await fetch(`${API_BASE}/batch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topics, ...settings }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => 'Unknown error');
    throw new Error(`Failed to create batch: ${detail}`);
  }
  return res.json();
}
