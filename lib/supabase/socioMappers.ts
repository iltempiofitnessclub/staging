import type { SocioDb } from '../../components/admin/soci/types';

function daysUntil(dateIso?: string | null) {
  if (!dateIso) return null;
  const d = new Date(dateIso);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getAvailableCertStates(list: SocioDb[]) {
  const states = new Set<string>();

  for (const s of list) {
    if (!s.certificato_valido) {
      states.add('MANCANTE');
      continue;
    }

    const left = daysUntil(s.certificato_scadenza);
    if (left !== null && left <= 30) states.add('IN SCADENZA');
    else states.add('PRESENTE');
  }

  const order = ['PRESENTE', 'IN SCADENZA', 'MANCANTE'];
  return order.filter((x) => states.has(x));
}
