export type StatusKind = 'ok' | 'warn' | 'bad';

export type SocioRow = {
  id: string;
  nome: string;
  nascita: string;
  dataIscrizione: string;
  pagamentoMensile: { kind: StatusKind; label: string };
  dataPagamento: string;
  certificato: { kind: StatusKind; label: string };
  scadenzaCertificato: string;
};

export type KpiItem = { kind: StatusKind; label: string; value: number };

export type SocioDb = {
  id: string;
  nome: string;
  cognome: string;
  sesso: string | null;
  data_nascita: string | null;
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

  created_at: string;
  updated_at: string;
};
