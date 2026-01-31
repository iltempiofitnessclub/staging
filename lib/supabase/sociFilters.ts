import { supabase } from '@/lib/supabase/client';

export type CourseOption = { code: string; title: string; kind: string | null };

export async function fetchCourseOptions(): Promise<CourseOption[]> {
  const { data, error } = await supabase
    .from('corsi')
    .select('code,title,kind')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('title', { ascending: true });

  if (error) throw error;
  return (data ?? []) as CourseOption[];
}
