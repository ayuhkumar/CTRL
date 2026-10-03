/* ── QoneqtForge Shared Types & Constants ──────────────────── */

export type StageName =
  | 'ingest'
  | 'research'
  | 'script'
  | 'scenes'
  | 'critic'
  | 'visuals'
  | 'voice'
  | 'captions'
  | 'music'
  | 'compose'
  | 'qa'
  | 'export';

export const STAGE_NAMES: StageName[] = [
  'ingest',
  'research',
  'script',
  'scenes',
  'critic',
  'visuals',
  'voice',
  'captions',
  'music',
  'compose',
  'qa',
  'export',
];

export const STAGE_LABELS: Record<string, string> = {
  ingest: '📥 Ingest Topic',
  research: '🔍 Research & Facts',
  script: '✍️ Script Generation',
  scenes: '🎬 Scene Planning',
  critic: '🧠 AI Critic Review',
  visuals: '🖼️ Visual Generation',
  voice: '🎙️ Voice Synthesis',
  captions: '💬 Caption Rendering',
  music: '🎵 Background Music',
  compose: '🎞️ Video Composition',
  qa: '✅ Quality Assurance',
  export: '📦 Export & Package',
};

export const STAGE_ICONS: Record<string, string> = {
  ingest: '📥',
  research: '🔍',
  script: '✍️',
  scenes: '🎬',
  critic: '🧠',
  visuals: '🖼️',
  voice: '🎙️',
  captions: '💬',
  music: '🎵',
  compose: '🎞️',
  qa: '✅',
  export: '📦',
};

export const COMMUNITY_OPTIONS = [
  { value: 'general', label: 'General' },
  { value: 'tech', label: 'Technology' },
  { value: 'finance', label: 'Finance & Business' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'education', label: 'Education' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'sports', label: 'Sports' },
];

export const TONE_OPTIONS = [
  { value: 'energetic', label: 'Energetic' },
  { value: 'calm', label: 'Calm & Thoughtful' },
  { value: 'funny', label: 'Funny' },
  { value: 'inspiring', label: 'Inspiring' },
  { value: 'explainer', label: 'Explainer' },
];

export const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hindi' },
  { value: 'gu', label: 'Gujarati' },
];

export const DURATION_OPTIONS = [
  { value: 20, label: '20 seconds' },
  { value: 30, label: '30 seconds' },
  { value: 45, label: '45 seconds' },
  { value: 60, label: '60 seconds' },
];

export const STYLE_OPTIONS = [
  { value: 'cinematic', label: 'Cinematic' },
  { value: 'illustration', label: 'Illustration' },
  { value: 'flat-vector', label: 'Flat Vector' },
  { value: 'photoreal', label: 'Photorealistic' },
];
