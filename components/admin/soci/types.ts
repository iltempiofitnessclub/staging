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
