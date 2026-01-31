import { supabase } from '@/lib/supabase/client';
import type { SocioDb, SocioKpiDb, Socio } from '@/components/admin/soci/types';

export async function fetchSociAll(): Promise<SocioDb[]> {
  const { data, error } = await supabase.from('soci').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as SocioDb[];
}

type FetchSociArgs = {
  q?: string;
  course?: string;
  cert?: string;
  dateIscrizione?: string;
  page: number;
  pageSize: number;
};

type FetchSociKpisArgs = {
  q?: string;
  course?: string;
  cert?: string;
  dateIscrizione?: string;
};

export async function fetchSoci(args: FetchSociArgs): Promise<{ list: SocioDb[]; total: number }> {
  const { q = '', course = '', cert = '', dateIscrizione = '', page, pageSize } = args;

  const from = Math.max(0, (page - 1) * pageSize);
  const to = from + pageSize - 1;

  let query = supabase.from('soci').select('*', { count: 'exact' }).order('created_at', { ascending: false });

  const qq = q.trim();
  if (qq) {
    const safe = qq.replaceAll(',', '');
    query = query.or(
      `nome.ilike.%${safe}%,cognome.ilike.%${safe}%,email.ilike.%${safe}%,codice_fiscale.ilike.%${safe}%`
    );
  }

  if (course && course !== 'FILTRA PER CORSO') {
    query = query.contains('corsi', [course]);
  }

  if (cert && cert !== 'FILTRA PER STATO CERTIFICATO') {
    if (cert === 'PRESENTE') query = query.eq('certificato_valido', true);
    if (cert === 'MANCANTE') query = query.eq('certificato_valido', false);
    if (cert === 'IN SCADENZA') {
      const d = new Date();
      d.setDate(d.getDate() + 30);
      const iso = d.toISOString().slice(0, 10);
      query = query.eq('certificato_valido', true).lte('certificato_scadenza', iso);
    }
  }

  if (dateIscrizione) {
    const start = new Date(`${dateIscrizione}T00:00:00.000Z`);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);
    query = query.gte('created_at', start.toISOString()).lt('created_at', end.toISOString());
  }

  const { data, error, count } = await query.range(from, to);
  if (error) throw error;

  return { list: (data ?? []) as SocioDb[], total: count ?? 0 };
}

const MONTHS = [
  'GENNAIO','FEBBRAIO','MARZO','APRILE','MAGGIO','GIUGNO',
  'LUGLIO','AGOSTO','SETTEMBRE','OTTOBRE','NOVEMBRE','DICEMBRE',
] as const;

function quotaToPaymentDateIso(quotaMese: string, quotaAnno: string): string | null {
  const m = String(quotaMese ?? '').trim().toUpperCase();
  const y = Number(quotaAnno);
  const idx = MONTHS.indexOf(m as any);
  if (idx < 0) return null;
  if (!Number.isFinite(y) || y < 1900) return null;
  const mm = String(idx + 1).padStart(2, '0');
  return `${y}-${mm}-01`;
}

const LEGACY_COURSE_SEP = '|';

function normalizeCourses(list: any): string[] {
  const arr = Array.isArray(list) ? list : [];
  const cleaned = arr.map((x) => String(x ?? '').trim()).filter(Boolean);
  return Array.from(new Set(cleaned));
}

function parseLegacyCourses(v: any): string[] {
  const s = String(v ?? '').trim();
  if (!s) return [];
  return s.split(LEGACY_COURSE_SEP).map((x) => x.trim()).filter(Boolean);
}

function toDbPayload(s: Socio) {
  const quotaMese = (s.quotaMese || '').trim().toUpperCase();
  const quotaAnno = (s.quotaAnno || '').trim();
  const corsi = normalizeCourses(s.corsi);

  return {
    nome: s.nome,
    cognome: s.cognome,
    sesso: s.sesso,

    data_nascita: s.dataNascita || null,
    luogo_nascita: s.luogoNascita || null,
    codice_fiscale: s.codiceFiscale || null,
    indirizzo: s.indirizzo || null,

    genitore_nome: s.genitoreNome || null,
    genitore_cognome: s.genitoreCognome || null,
    genitore_codice_fiscale: s.genitoreCodiceFiscale || null,
    genitore_telefono: s.genitoreTelefono || null,

    certificato_valido: s.certificatoValido,
    certificato_scadenza: s.certificatoScadenza || null,

    quota_mese: quotaMese || null,
    quota_anno: quotaAnno || null,
    mensile_pagato: s.mensilePagato,

    data_pagamento_mensile: s.mensilePagato ? quotaToPaymentDateIso(quotaMese, quotaAnno) : null,

    telefono: s.telefono || null,
    email: s.email || null,

    corsi,
    corso: null,

    note: s.note || null,
    status: s.status,
  };
}

export async function listSoci(): Promise<Socio[]> {
  const { data, error } = await supabase.from('soci').select('*').order('created_at', { ascending: false });
  if (error) throw error;

  const rows = (data ?? []) as any[];
  return rows.map((r) => {
    const corsi = Array.isArray(r?.corsi) ? normalizeCourses(r.corsi) : parseLegacyCourses(r?.corso);

    return {
      id: r.id,
      nome: r.nome ?? '',
      cognome: r.cognome ?? '',
      sesso: r.sesso ?? '',
      dataNascita: r.data_nascita ?? '',
      luogoNascita: r.luogo_nascita ?? '',
      codiceFiscale: r.codice_fiscale ?? '',
      indirizzo: r.indirizzo ?? '',
      genitoreNome: r.genitore_nome ?? '',
      genitoreCognome: r.genitore_cognome ?? '',
      genitoreCodiceFiscale: r.genitore_codice_fiscale ?? '',
      genitoreTelefono: r.genitore_telefono ?? '',
      certificatoValido: !!r.certificato_valido,
      certificatoScadenza: r.certificato_scadenza ?? '',
      quotaMese: r.quota_mese ?? 'DICEMBRE',
      quotaAnno: r.quota_anno ?? String(new Date().getFullYear()),
      mensilePagato: !!r.mensile_pagato,
      telefono: r.telefono ?? '',
      email: r.email ?? '',
      corso: r.corso ?? '',
      corsi,
      note: r.note ?? '',
      status: !!r.status,
    } as Socio;
  });
}

export async function getSocioById(id: string): Promise<Socio> {
  const { data, error } = await supabase.from('soci').select('*').eq('id', id).single();
  if (error) throw error;

  const r: any = data;
  const corsi = Array.isArray(r?.corsi) ? normalizeCourses(r.corsi) : parseLegacyCourses(r?.corso);

  return {
    id: r.id,
    nome: r.nome ?? '',
    cognome: r.cognome ?? '',
    sesso: r.sesso ?? '',
    dataNascita: r.data_nascita ?? '',
    luogoNascita: r.luogo_nascita ?? '',
    codiceFiscale: r.codice_fiscale ?? '',
    indirizzo: r.indirizzo ?? '',
    genitoreNome: r.genitore_nome ?? '',
    genitoreCognome: r.genitore_cognome ?? '',
    genitoreCodiceFiscale: r.genitore_codice_fiscale ?? '',
    genitoreTelefono: r.genitore_telefono ?? '',
    certificatoValido: !!r.certificato_valido,
    certificatoScadenza: r.certificato_scadenza ?? '',
    quotaMese: r.quota_mese ?? 'DICEMBRE',
    quotaAnno: r.quota_anno ?? String(new Date().getFullYear()),
    mensilePagato: !!r.mensile_pagato,
    telefono: r.telefono ?? '',
    email: r.email ?? '',
    corso: r.corso ?? '',
    corsi,
    note: r.note ?? '',
    status: !!r.status,
  };
}

export async function createSocio(s: Socio) {
  const { data, error } = await supabase.from('soci').insert(toDbPayload(s)).select('id').single();
  if (error) throw error;
  return data.id as string;
}

export async function updateSocio(id: string, s: Socio) {
  const { error } = await supabase.from('soci').update(toDbPayload(s)).eq('id', id);
  if (error) throw error;
}

export async function fetchSociKpis(args: FetchSociKpisArgs): Promise<SocioKpiDb[]> {
  const { q = '', course = '', cert = '', dateIscrizione = '' } = args;

  let query = supabase
    .from('soci')
    .select('quota_mese,quota_anno,mensile_pagato,certificato_valido,certificato_scadenza,iscrizione_attiva,iscrizione_scadenza,corso');

  const qq = q.trim();
  if (qq) {
    const safe = qq.replaceAll(',', '');
    query = query.or(
      `nome.ilike.%${safe}%,cognome.ilike.%${safe}%,email.ilike.%${safe}%,codice_fiscale.ilike.%${safe}%`
    );
  }

  if (course && course !== 'FILTRA PER CORSO') {
    query = query.contains('corsi', [course]);
  }

  if (cert && cert !== 'FILTRA PER STATO CERTIFICATO') {
    if (cert === 'PRESENTE') query = query.eq('certificato_valido', true);
    if (cert === 'MANCANTE') query = query.eq('certificato_valido', false);
    if (cert === 'IN SCADENZA') {
      const d = new Date();
      d.setDate(d.getDate() + 30);
      const iso = d.toISOString().slice(0, 10);
      query = query.eq('certificato_valido', true).lte('certificato_scadenza', iso);
    }
  }

  if (dateIscrizione) {
    const start = new Date(`${dateIscrizione}T00:00:00.000Z`);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);
    query = query.gte('created_at', start.toISOString()).lt('created_at', end.toISOString());
  }

  const { data, error } = await query;
  if (error) throw error;

  return (data ?? []) as SocioKpiDb[];
}
