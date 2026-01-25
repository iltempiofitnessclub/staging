import { supabase } from '@/lib/supabase/client';

export async function fetchDistinctCourses(): Promise<string[]> {
  const { data, error } = await supabase
    .from('soci')
    .select('corso')
    .not('corso', 'is', null);

  if (error) throw error;

  const unique = new Set<string>();

  for (const row of data ?? []) {
    const v = String((row as any).corso ?? '').trim();
    if (v) unique.add(v);
  }

  return Array.from(unique).sort((a, b) => a.localeCompare(b));
}
