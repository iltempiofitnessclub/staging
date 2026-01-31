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
  status: boolean;
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

  certificato_valido: boolean;
  certificato_scadenza: string | null;

  quota_mese: string | null;
  quota_anno: string | null;
  mensile_pagato: boolean;

  data_pagamento_mensile: string | null;

  telefono: string | null;
  email: string | null;
  corso: string | null;
  note: string | null;

  data_iscrizione: string | null;
  iscrizione_scadenza: string | null;
  iscrizione_attiva: boolean;

  created_at: string;
  updated_at: string;
  status: boolean;
};

export type SocioKpiDb = Pick<
  SocioDb,
  | 'quota_mese'
  | 'quota_anno'
  | 'mensile_pagato'
  | 'certificato_valido'
  | 'certificato_scadenza'
  | 'iscrizione_attiva'
  | 'iscrizione_scadenza'
> & {
  corso?: string | null;
};

export type Socio = {
  id?: string;

  nome: string;
  cognome: string;
  sesso: '' | 'M' | 'F' | 'ALTRO';

  dataNascita: string;
  luogoNascita: string;
  codiceFiscale: string;
  indirizzo: string;

  genitoreNome: string;
  genitoreCognome: string;
  genitoreCodiceFiscale: string;
  genitoreTelefono: string;

  certificatoValido: boolean;
  certificatoScadenza: string;

  quotaMese: string;
  quotaAnno: string;
  mensilePagato: boolean;

  telefono: string;
  email: string;

  corso: string;
  corsi: string[];

  note: string;
  status: boolean;
};
