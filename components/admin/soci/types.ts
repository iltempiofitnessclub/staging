export type StatusKind = 'ok' | 'warn' | 'bad';

export type SocioRow = {
  id: string;
  nome: string;
  nascita: string; // stringa pronta da mostrare (es. 22-08-1999)
  dataIscrizione: string; // es. 01-01-2025 (da created_at)
  pagamentoMensile: { kind: StatusKind; label: string };
  dataPagamento: string; // per ora placeholder (non hai campo in tabella)
  certificato: { kind: StatusKind; label: string };
  scadenzaCertificato: string; // es. 22-08-2026
};

export type KpiItem = { kind: StatusKind; label: string; value: number };

export type SocioDb = {
  id: string;
  nome: string;
  cognome: string;
  sesso: string | null;
  data_nascita: string | null; // date -> string ISO
  luogo_nascita: string | null;
  codice_fiscale: string | null;
  indirizzo: string | null;

  genitore_nome: string | null;
  genitore_cognome: string | null;
  genitore_codice_fiscale: string | null;
  genitore_telefono: string | null;

  certificato_valido: boolean | null;
  certificato_scadenza: string | null;

  quota_mese: string | null;
  quota_anno: string | null;
  mensile_pagato: boolean | null;

  telefono: string | null;
  email: string | null;

  corso: string | null;
  note: string | null;

  created_at: string; // timestamptz
  updated_at: string; // timestamptz
};
