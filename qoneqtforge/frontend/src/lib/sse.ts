/* ── QoneqtForge SSE Client ─────────────────────────────────── */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api` : 'http://127.0.0.1:8000/api';

export interface SSEEvent {
  type: string;
  timestamp: string;
  data: Record<string, unknown>;
}

export function subscribeToJob(
  jobId: string,
  onEvent: (event: SSEEvent) => void,
): () => void {
  const url = `${API_BASE}/jobs/${jobId}/events`;
  const eventSource = new EventSource(url);

  eventSource.onmessage = (msg) => {
    try {
      const parsed: SSEEvent = JSON.parse(msg.data);
      onEvent(parsed);
    } catch {
      // If not JSON, wrap it
      onEvent({
        type: 'log',
        timestamp: new Date().toISOString(),
        data: { message: msg.data, level: 'info', stage: 'unknown' },
      });
    }
  };

  eventSource.onerror = () => {
    // EventSource will auto-reconnect natively.
    // We emit a special reconnect event so the UI can refetch state.
    onEvent({
      type: 'reconnect',
      timestamp: new Date().toISOString(),
      data: {},
    });
  };

  // Return cleanup function
  return () => {
    eventSource.close();
  };
}
