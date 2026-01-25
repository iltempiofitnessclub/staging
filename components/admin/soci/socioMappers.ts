import type { SocioDb, SocioRow, StatusKind, KpiItem } from './types';

function formatDateIT(iso?: string | null) {
  if (!iso) return '';
  // iso può essere '2026-08-22' oppure timestamptz
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

export function certKindAndLabel(s: SocioDb): { kind: StatusKind; label: string } {
  // regole:
  // - se certificato_valido=false -> bad
  // - se scadenza entro 30 gg -> warn
  // - altrimenti ok
  const valido = !!s.certificato_valido;
  if (!valido) return { kind: 'bad', label: 'CERTIFICATO MANCANTE' };

  const left = daysUntil(s.certificato_scadenza);
  if (left !== null && left <= 30) return { kind: 'warn', label: 'CERTIFICATO IN SCADENZA' };

  return { kind: 'ok', label: 'CERTIFICATO PRESENTE' };
}

export function pagamentoKindAndLabel(s: SocioDb): { kind: StatusKind; label: string } {
  // per ora: mensile_pagato true => ok, false => bad
  // (quando aggiungerai “data pagamento / scadenza”, mettiamo il warn)
  const pagato = !!s.mensile_pagato;
  return pagato
    ? { kind: 'ok', label: 'MENSILE PAGATO' }
    : { kind: 'bad', label: 'MENSILE NON PAGATO' };
}

export function toSocioRow(s: SocioDb): SocioRow {
  const cert = certKindAndLabel(s);
  const pag = pagamentoKindAndLabel(s);

  return {
    id: s.id,
    nome: `${s.nome} ${s.cognome}`.trim(),
    nascita: s.data_nascita ? `Nato/a il ${formatDateIT(s.data_nascita)}` : 'Data di nascita',
    dataIscrizione: formatDateIT(s.created_at),
    pagamentoMensile: pag,
    dataPagamento: '-', // non hai un campo: se lo aggiungi, lo mappiamo qui
    certificato: cert,
    scadenzaCertificato: formatDateIT(s.certificato_scadenza),
  };
}

export function buildKpis(list: SocioDb[]): {
  okItems: KpiItem[];
  warnItems: KpiItem[];
  badItems: KpiItem[];
} {
  let mensili_ok = 0;
  let mensili_bad = 0;

  let cert_ok = 0;
  let cert_warn = 0;
  let cert_bad = 0;

  // iscrizioni: non hai “scadenza iscrizione” nel db, quindi per ora:
  // tutte valide = count, in futuro ci mettiamo scadenza_iscrizione.
  const iscrizioni_valide = list.length;
  const iscrizioni_warn = 0;
  const iscrizioni_scadute = 0;

  for (const s of list) {
    if (!!s.mensile_pagato) mensili_ok++;
    else mensili_bad++;

    const c = certKindAndLabel(s).kind;
    if (c === 'ok') cert_ok++;
    if (c === 'warn') cert_warn++;
    if (c === 'bad') cert_bad++;
  }

  return {
    okItems: [
      { kind: 'ok', label: 'MENSILI PAGATI', value: mensili_ok },
      { kind: 'ok', label: 'CERTIFICATI MEDICI PRESENTI', value: cert_ok },
      { kind: 'ok', label: 'ISCRIZIONI VALIDE', value: iscrizioni_valide },
    ],
    warnItems: [
      { kind: 'warn', label: 'MENSILI IN SCADENZA', value: 0 }, // quando hai scadenza mensile lo calcoliamo
      { kind: 'warn', label: 'CERTIFICATI MEDICI IN SCADENZA', value: cert_warn },
      { kind: 'warn', label: 'ISCRIZIONI IN SCADENZA', value: iscrizioni_warn },
    ],
    badItems: [
      { kind: 'bad', label: 'MENSILI NON PAGATI', value: mensili_bad },
      { kind: 'bad', label: 'CERTIFICATI MEDICI NON PRESENTI', value: cert_bad },
      { kind: 'bad', label: 'ISCRIZIONI SCADUTE', value: iscrizioni_scadute },
    ],
  };
}
