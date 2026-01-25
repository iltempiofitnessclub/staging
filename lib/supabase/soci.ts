import { supabase } from '@/lib/supabase/client';
import type { Socio } from '@/components/admin/soci/SocioForm';
import type { SocioDb } from '@/components/admin/soci/types';

export async function fetchSociAll(): Promise<SocioDb[]> {
  const { data, error } = await supabase
    .from('soci')
    .select('*')
    .order('created_at', { ascending: false });

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

export async function fetchSoci(args: FetchSociArgs): Promise<{ list: SocioDb[]; total: number }> {
  const { q = '', course = '', cert = '', dateIscrizione = '', page, pageSize } = args;

  const from = Math.max(0, (page - 1) * pageSize);
  const to = from + pageSize - 1;

  let query = supabase
    .from('soci')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  const qq = q.trim();
  if (qq) {
    const safe = qq.replaceAll(',', '');
    query = query.or(
      `nome.ilike.%${safe}%,cognome.ilike.%${safe}%,email.ilike.%${safe}%,codice_fiscale.ilike.%${safe}%`
    );
  }

  if (course && course !== 'FILTRA PER CORSO') {
    query = query.eq('corso', course);
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

  return {
    list: (data ?? []) as SocioDb[],
    total: count ?? 0,
  };
}

function toDbPayload(s: Socio) {
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

    quota_mese: s.quotaMese || null,
    quota_anno: s.quotaAnno || null,
    mensile_pagato: s.mensilePagato,

    telefono: s.telefono || null,
    email: s.email || null,

    corso: s.corso || null,
    note: s.note || null,
  };
}

function fromDbRow(r: any): Socio {
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
    note: r.note ?? '',
  };
}

export async function listSoci() {
  const { data, error } = await supabase
    .from('soci')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(fromDbRow);
}

export async function getSocioById(id: string) {
  const { data, error } = await supabase
    .from('soci')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return fromDbRow(data);
}

export async function createSocio(s: Socio) {
  const { data, error } = await supabase
    .from('soci')
    .insert(toDbPayload(s))
    .select('id')
    .single();

  if (error) throw error;
  return data.id as string;
}

export async function updateSocio(id: string, s: Socio) {
  const { error } = await supabase
    .from('soci')
    .update(toDbPayload(s))
    .eq('id', id);

  if (error) throw error;
}
