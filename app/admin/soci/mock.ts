import type { Socio } from '../../../components/admin/soci/types';

export const SOCI: Socio[] = [
  {
    id: '1',
    nome: 'Socio',
    cognome: 'Uno',
    sesso: 'M',
    dataNascita: '1995-01-10',
    luogoNascita: 'Bari',
    codiceFiscale: 'RSSMRA95A10A662X',
    indirizzo: 'Via Roma 1, Bari',

    genitoreNome: '',
    genitoreCognome: '',
    genitoreCodiceFiscale: '',
    genitoreTelefono: '',

    certificatoValido: true,
    certificatoScadenza: '2026-08-22',

    quotaMese: 'DICEMBRE',
    quotaAnno: '2026',
    mensilePagato: true,

    telefono: '3331234567',
    email: 'socio1@email.com',

    corso: 'Boxe',
    note: '---'
  }
];

export function getSocioById(id: string) {
  return SOCI.find((s) => s.id === id) ?? null;
}
