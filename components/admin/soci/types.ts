export type StatusKind = 'ok' | 'warn' | 'bad';

export type SocioRow = {
  id: number;
  nome: string;
  nascita: string;
  dataIscrizione: string;
  pagamentoMensile: { kind: StatusKind; label: string };
  dataPagamento: string;
  certificato: { kind: StatusKind; label: string };
  scadenzaCertificato: string;
};

export type KpiItem = {
  kind: StatusKind;
  label: string;
  value: number;
};

export type Socio = {
  id: string;
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
  note: string;
};
