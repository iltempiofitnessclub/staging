import type { SocioDb, KpiItem, StatusKind } from './types';

const MONTHS = [
  'GENNAIO','FEBBRAIO','MARZO','APRILE','MAGGIO','GIUGNO',
  'LUGLIO','AGOSTO','SETTEMBRE','OTTOBRE','NOVEMBRE','DICEMBRE',
] as const;

const norm = (v: any) => String(v ?? '').trim().toUpperCase();

function daysUntil(dateIso?: string | null) {
  if (!dateIso) return null;
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function endOfMonth(year: number, monthIndex0: number) {
  return new Date(year, monthIndex0 + 1, 0);
}

function daysUntilDate(d: Date) {
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function certKind(s: SocioDb): StatusKind {
  if (!s.certificato_valido) return 'bad';
  const left = daysUntil(s.certificato_scadenza);
  if (left !== null && left <= 30) return 'warn';
  return 'ok';
}

function mensileKindForPeriod(s: SocioDb, month: string, year: string): StatusKind | null {
  if (norm(s.quota_mese) !== norm(month) || norm(s.quota_anno) !== norm(year)) return null;

  if (s.mensile_pagato) return 'ok';

  const mi = MONTHS.indexOf(norm(month) as any);
  const y = Number(year);
  if (mi < 0 || !Number.isFinite(y)) return 'bad';

  const left = daysUntilDate(endOfMonth(y, mi));

  const WARN_DAYS = 7;

  if (left >= 0 && left <= WARN_DAYS) return 'warn';
  return 'bad';
}

function iscrizioneKind(s: SocioDb): StatusKind {
  if (s.iscrizione_attiva === false) return 'bad';

  const left = daysUntil(s.iscrizione_scadenza);
  if (left === null) return 'ok';
  if (left < 0) return 'bad';
  if (left <= 30) return 'warn';
  return 'ok';
}

export function buildKpisFromSoci(listAll: SocioDb[], month: string, year: string) {
  let mensili_ok = 0;
  let mensili_warn = 0;
  let mensili_bad = 0;

  for (const s of listAll) {
    const mk = mensileKindForPeriod(s, month, year);
    if (mk === null) continue;
    if (mk === 'ok') mensili_ok++;
    else if (mk === 'warn') mensili_warn++;
    else mensili_bad++;
  }

  let cert_ok = 0;
  let cert_warn = 0;
  let cert_bad = 0;

  let iscr_ok = 0;
  let iscr_warn = 0;
  let iscr_bad = 0;

  for (const s of listAll) {
    const ck = certKind(s);
    if (ck === 'ok') cert_ok++;
    else if (ck === 'warn') cert_warn++;
    else cert_bad++;

    const ik = iscrizioneKind(s);
    if (ik === 'ok') iscr_ok++;
    else if (ik === 'warn') iscr_warn++;
    else iscr_bad++;
  }

  const okItems: KpiItem[] = [
    { kind: 'ok', label: 'MENSILI PAGATI', value: mensili_ok },
    { kind: 'ok', label: 'CERTIFICATI MEDICI PRESENTI', value: cert_ok },
    { kind: 'ok', label: 'ISCRIZIONI VALIDE', value: iscr_ok },
  ];

  const warnItems: KpiItem[] = [
    { kind: 'warn', label: 'MENSILI IN SCADENZA', value: mensili_warn },
    { kind: 'warn', label: 'CERTIFICATI MEDICI IN SCADENZA', value: cert_warn },
    { kind: 'warn', label: 'ISCRIZIONI IN SCADENZA', value: iscr_warn },
  ];

  const badItems: KpiItem[] = [
    { kind: 'bad', label: 'MENSILI NON PAGATI', value: mensili_bad },
    { kind: 'bad', label: 'CERTIFICATI MEDICI NON PRESENTI', value: cert_bad },
    { kind: 'bad', label: 'ISCRIZIONI SCADUTE / NON ATTIVE', value: iscr_bad },
  ];

  return { okItems, warnItems, badItems };
}
