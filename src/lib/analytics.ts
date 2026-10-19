import { createClient, type SupabaseClient } from '@supabase/supabase-js';

type PageViewEvent = {
  event_type: 'page_view';
  page_path: string;
  channel_slug: string | null;
  occurred_at: string;
};

const STORAGE_KEY = 'gdm:pending-analytics-events';
let client: SupabaseClient | null | undefined;

function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  client = url && key ? createClient(url, key) : null;
  return client;
}

function queueLocally(event: PageViewEvent): void {
  try {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as PageViewEvent[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, event].slice(-100)));
  } catch {
    // Storage may be unavailable in private browsing; don't block the redirect.
  }
}

export async function trackChannelPageView(pagePath: string, channelSlug: string): Promise<void> {
  const event: PageViewEvent = {
    event_type: 'page_view',
    page_path: pagePath,
    channel_slug: channelSlug,
    occurred_at: new Date().toISOString(),
  };

  const supabase = getSupabase();
  if (!supabase) {
    queueLocally(event);
    return;
  }

  try {
    const { error } = await supabase.from('analytics_events').insert({
      event_type: event.event_type,
      page_path: event.page_path,
      channel_slug: event.channel_slug,
      occurred_at: event.occurred_at,
    });
    if (error) throw error;
  } catch {
    // Keep the visit for a later integration/retry instead of silently discarding it.
    queueLocally(event);
  }
}
