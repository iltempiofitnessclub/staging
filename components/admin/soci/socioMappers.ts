import type { SocioDb, SocioRow, StatusKind, KpiItem } from './types';

function formatDateIT(iso?: string | null) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear());
  return `${dd}-${mm}-${yy}`;
}

function daysUntil(dateIso?: string | null) {
  if (!dateIso) return null;
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function formatQuotaLabel(mese?: string | null, anno?: string | null) {
  const m = String(mese ?? '').trim().toUpperCase();
  const y = String(anno ?? '').trim();
  return m && y ? `${m} ${y}` : '-';
}

export function certKindAndLabel(s: SocioDb): { kind: StatusKind; label: string } {
  const valido = !!s.certificato_valido;
  if (!valido) return { kind: 'bad', label: 'CERTIFICATO MANCANTE' };

  const left = daysUntil(s.certificato_scadenza);
  if (left !== null && left <= 30) return { kind: 'warn', label: 'CERTIFICATO IN SCADENZA' };

  return { kind: 'ok', label: 'CERTIFICATO PRESENTE' };
}

export function pagamentoKindAndLabel(s: SocioDb): { kind: StatusKind; label: string } {
  const pagato = !!s.mensile_pagato;
  return pagato
    ? { kind: 'ok', label: 'MENSILE PAGATO' }
    : { kind: 'bad', label: 'MENSILE NON PAGATO' };
}

export function toSocioRow(s: SocioDb): SocioRow {
  const cert = certKindAndLabel(s);
  const pag = pagamentoKindAndLabel(s);

  const quotaLabel = formatQuotaLabel(s.quota_mese, s.quota_anno);

  return {
    id: s.id,
    nome: `${s.nome} ${s.cognome}`.trim(),
    nascita: s.data_nascita ? `Nato/a il ${formatDateIT(s.data_nascita)}` : 'Data di nascita',
    dataIscrizione: formatDateIT(s.created_at),
    pagamentoMensile: pag,
    dataPagamento: quotaLabel,
    certificato: cert,
    scadenzaCertificato: formatDateIT(s.certificato_scadenza),
    status: !!s.status,
  };
}

const MONTHS = [
  'GENNAIO','FEBBRAIO','MARZO','APRILE','MAGGIO','GIUGNO',
  'LUGLIO','AGOSTO','SETTEMBRE','OTTOBRE','NOVEMBRE','DICEMBRE',
] as const;

const norm = (v: any) => String(v ?? '').trim().toUpperCase();

function endOfMonth(year: number, monthIndex0: number) {
  return new Date(year, monthIndex0 + 1, 0);
}

function daysUntilDate(d: Date) {
  const now = new Date();
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function filterByQuotaPeriod(list: SocioDb[], month: string, year: string) {
  const m = norm(month);
  const y = norm(year);
  return list.filter((s) => norm(s.quota_mese) === m && norm(s.quota_anno) === y);
}

export function buildKpis(
  listAll: SocioDb[],
  month: string,
  year: string
): { okItems: KpiItem[]; warnItems: KpiItem[]; badItems: KpiItem[] } {
  const listPeriodo = filterByQuotaPeriod(listAll, month, year);

  let mensili_ok = 0;
  let mensili_warn = 0;
  let mensili_bad = 0;

  const mi = MONTHS.indexOf(norm(month) as any);
  const y = Number(year);

  for (const s of listPeriodo) {
    if (!!s.mensile_pagato) {
      mensili_ok++;
    } else if (mi >= 0 && Number.isFinite(y)) {
      const due = endOfMonth(y, mi);
      const left = daysUntilDate(due);

      if (left >= 0 && left <= 7) mensili_warn++;
      else mensili_bad++;
    } else {
      mensili_bad++;
    }
  }

  let cert_ok = 0;
  let cert_warn = 0;
  let cert_bad = 0;

  for (const s of listAll) {
    const valido = !!s.certificato_valido;
    if (!valido) {
      cert_bad++;
      continue;
    }
    const left = daysUntil(s.certificato_scadenza);
    if (left !== null && left <= 30) cert_warn++;
    else cert_ok++;
  }

  let iscr_ok = 0;
  let iscr_warn = 0;
  let iscr_bad = 0;

  for (const s of listAll) {
    if (s.iscrizione_attiva === false) {
      iscr_bad++;
      continue;
    }
    const left = daysUntil(s.iscrizione_scadenza);
    if (left === null) {
      iscr_ok++;
    } else if (left < 0) {
      iscr_bad++;
    } else if (left <= 30) {
      iscr_warn++;
    } else {
      iscr_ok++;
    }
  }

  return {
    okItems: [
      { kind: 'ok', label: 'MENSILI PAGATI', value: mensili_ok },
      { kind: 'ok', label: 'CERTIFICATI MEDICI PRESENTI', value: cert_ok },
      { kind: 'ok', label: 'ISCRIZIONI VALIDE', value: iscr_ok },
    ],
    warnItems: [
      { kind: 'warn', label: 'MENSILI IN SCADENZA', value: mensili_warn },
      { kind: 'warn', label: 'CERTIFICATI MEDICI IN SCADENZA', value: cert_warn },
      { kind: 'warn', label: 'ISCRIZIONI IN SCADENZA', value: iscr_warn },
    ],
    badItems: [
      { kind: 'bad', label: 'MENSILI NON PAGATI', value: mensili_bad },
      { kind: 'bad', label: 'CERTIFICATI MEDICI NON PRESENTI', value: cert_bad },
      { kind: 'bad', label: 'ISCRIZIONI SCADUTE', value: iscr_bad },
    ],
  };
}
