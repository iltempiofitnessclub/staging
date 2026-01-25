import type { SocioDb, KpiItem, StatusKind } from './types';

function daysUntil(dateIso?: string | null) {
  if (!dateIso) return null;
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return null;
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

function mensileKind(s: SocioDb): StatusKind {
  return s.mensile_pagato ? 'ok' : 'bad';
}

// Filtra i soci in base al mese/anno selezionato (quota_mese + quota_anno)
export function filterByQuotaPeriod(list: SocioDb[], month: string, year: string) {
  return list.filter((s) => (s.quota_mese ?? '') === month && (s.quota_anno ?? '') === year);
}

export function buildKpisFromSoci(list: SocioDb[]) {
  let mensili_ok = 0;
  let mensili_bad = 0;
  let mensili_warn = 0; // per ora 0 (quando avrai una data scadenza pagamento)

  let cert_ok = 0;
  let cert_warn = 0;
  let cert_bad = 0;

  // iscrizioni: per ora “valide = count”
  const iscrizioni_valide = list.length;
  const iscrizioni_warn = 0;
  const iscrizioni_scadute = 0;

  for (const s of list) {
    const mk = mensileKind(s);
    if (mk === 'ok') mensili_ok++;
    else if (mk === 'warn') mensili_warn++;
    else mensili_bad++;

    const ck = certKind(s);
    if (ck === 'ok') cert_ok++;
    else if (ck === 'warn') cert_warn++;
    else cert_bad++;
  }

  const okItems: KpiItem[] = [
    { kind: 'ok', label: 'MENSILI PAGATI', value: mensili_ok },
    { kind: 'ok', label: 'CERTIFICATI MEDICI PRESENTI', value: cert_ok },
    { kind: 'ok', label: 'ISCRIZIONI VALIDE', value: iscrizioni_valide },
  ];

  const warnItems: KpiItem[] = [
    { kind: 'warn', label: 'MENSILI IN SCADENZA', value: mensili_warn },
    { kind: 'warn', label: 'CERTIFICATI MEDICI IN SCADENZA', value: cert_warn },
    { kind: 'warn', label: 'ISCRIZIONI IN SCADENZA', value: iscrizioni_warn },
  ];

  const badItems: KpiItem[] = [
    { kind: 'bad', label: 'MENSILI NON PAGATI', value: mensili_bad },
    { kind: 'bad', label: 'CERTIFICATI MEDICI NON PRESENTI', value: cert_bad },
    { kind: 'bad', label: 'ISCRIZIONI SCADUTE', value: iscrizioni_scadute },
  ];

  return { okItems, warnItems, badItems };
}
